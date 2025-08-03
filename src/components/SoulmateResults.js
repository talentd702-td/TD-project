import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { generateSoulmateAnalysis, generateSoulmateImagePrompt, generateSoulmateImage } from '../lib/gemini';

export default function SoulmateResults({ user, userData, onBack }) {
  const [analysis, setAnalysis] = useState('');
  const [soulmateImage, setSoulmateImage] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState('');
  const [imageError, setImageError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Load existing soulmate data when component mounts
  useEffect(() => {
    const loadExistingSoulmateData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            
            // Load existing analysis
            if (userData.soulmateReading?.analysis) {
              setAnalysis(userData.soulmateReading.analysis);
            }
            
            // Load existing portrait
            if (userData.soulmatePortrait?.imageUrl) {
              setSoulmateImage({
                url: userData.soulmatePortrait.imageUrl,
                prompt: userData.soulmatePortrait.prompt,
                seed: userData.soulmatePortrait.seed
              });
            }
          }
        } catch (error) {
          console.error('Error loading existing soulmate data:', error);
        }
      }
    };

    loadExistingSoulmateData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const saveSoulmateReading = async (readingText) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        soulmateReading: {
          analysis: readingText,
          generatedAt: new Date().toISOString(),
        },
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving soulmate reading:', error);
      throw new Error('Failed to save reading');
    }
  };

  const saveSoulmatePortrait = async (portraitData) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        soulmatePortrait: {
          imageUrl: portraitData.imageUrl,
          prompt: portraitData.prompt,
          seed: portraitData.seed,
          generatedAt: new Date().toISOString(),
        },
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving soulmate portrait:', error);
      throw new Error('Failed to save portrait');
    }
  };

  const handleGenerateAnalysis = async () => {
    if (analysis) {
      setActiveTab('analysis');
      return;
    }

    setAnalysisLoading(true);
    setAnalysisError('');
    setAnalysis('');

    try {
      const result = await generateSoulmateAnalysis(userData);
      setAnalysis(result);
      await saveSoulmateReading(result);
      setActiveTab('analysis');
    } catch (err) {
      setAnalysisError(err.message);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (soulmateImage) {
      setActiveTab('portrait');
      return;
    }

    setImageLoading(true);
    setImageError('');

    try {
      const imagePrompt = await generateSoulmateImagePrompt(userData);
      const imageResult = await generateSoulmateImage(imagePrompt);
      
      const portraitData = {
        url: imageResult.imageUrl,
        prompt: imagePrompt,
        seed: imageResult.seed
      };
      
      setSoulmateImage(portraitData);
      
      await saveSoulmatePortrait({
        imageUrl: imageResult.imageUrl,
        prompt: imagePrompt,
        seed: imageResult.seed
      });
      
      setActiveTab('portrait');
    } catch (err) {
      setImageError(err.message);
    } finally {
      setImageLoading(false);
    }
  };

  const parseAnalysisIntoSections = (text) => {
    if (!text) return {};
    
    const sections = {};
    const sectionHeaders = ['APPEARANCE', 'PERSONALITY', 'COMPATIBILITY', 'TIMELINE', 'RECOGNITION SIGNS'];
    
    sectionHeaders.forEach(header => {
      const regex = new RegExp(`${header}\\s*\\n([\\s\\S]*?)(?=\\n(?:[A-Z][A-Z\\s]+)\\n|$)`, 'i');
      const match = text.match(regex);
      
      if (match) {
        const content = match[1].trim();
        const items = {};
        
        const lines = content.split('\n').filter(line => line.trim());
        lines.forEach(line => {
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            items[key] = value;
          }
        });
        
        sections[header] = items;
      }
    });
    
    return sections;
  };

  const getSectionConfig = (sectionName) => {
    const configs = {
      'APPEARANCE': {
        title: 'Physical Appearance',
        icon: '👤',
        gradient: 'from-emerald-500 to-teal-500',
        bgGradient: 'from-emerald-50 to-teal-50',
        description: 'How your soulmate will look'
      },
      'PERSONALITY': {
        title: 'Personality Traits',
        icon: '🧠',
        gradient: 'from-blue-500 to-indigo-500',
        bgGradient: 'from-blue-50 to-indigo-50',
        description: 'Their character and nature'
      },
      'COMPATIBILITY': {
        title: 'Cosmic Compatibility',
        icon: '💕',
        gradient: 'from-rose-500 to-pink-500',
        bgGradient: 'from-rose-50 to-pink-50',
        description: 'Why you\'re perfect together'
      },
      'TIMELINE': {
        title: 'Relationship Timeline',
        icon: '⏰',
        gradient: 'from-amber-500 to-orange-500',
        bgGradient: 'from-amber-50 to-orange-50',
        description: 'When and how you\'ll meet'
      },
      'RECOGNITION SIGNS': {
        title: 'Recognition Signs',
        icon: '🎯',
        gradient: 'from-purple-500 to-violet-500',
        bgGradient: 'from-purple-50 to-violet-50',
        description: 'How to recognize them'
      }
    };
    
    return configs[sectionName] || {
      title: sectionName,
      icon: '✨',
      gradient: 'from-gray-500 to-slate-500',
      bgGradient: 'from-gray-50 to-slate-50',
      description: 'Cosmic insights'
    };
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '🌟' },
    { id: 'analysis', name: 'Reading', icon: '📖' },
    { id: 'portrait', name: 'Portrait', icon: '🎨' }
  ];

  const analysisData = parseAnalysisIntoSections(analysis);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-purple-900 text-white">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-purple-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="text-xl sm:text-2xl">✨</div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Lunatica
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-3 bg-purple-900/30 px-3 sm:px-4 py-2 rounded-full">
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full ring-2 ring-purple-400"
                />
                <span className="text-xs sm:text-sm font-medium text-white">Hi, {userData?.name?.split(' ')[0]}!</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400 text-xs sm:text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-purple-900/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-xl sm:shadow-2xl border border-purple-700 w-full max-w-lg">
            <div className="flex space-x-1 sm:space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-3 text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg sm:shadow-xl transform scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-purple-800/50 hover:scale-105'
                  }`}
                >
                  <span className="text-base sm:text-xl">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="text-5xl sm:text-6xl lg:text-8xl mb-4 sm:mb-6 animate-bounce">🔮</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
                Your Cosmic Reading Awaits
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                Discover everything about your destined life partner through ancient wisdom and cosmic insights
              </p>
            </div>

            {/* Enhanced Profile Card */}
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl sm:shadow-2xl border border-purple-700/50 mb-8 sm:mb-12 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full -mr-16 sm:-mr-20 -mt-16 sm:-mt-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-pink-600/20 to-purple-600/20 rounded-full -ml-12 sm:-ml-16 -mb-12 sm:-mb-16"></div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center flex items-center justify-center space-x-2 sm:space-x-3 relative z-10">
                <span>🌟</span>
                <span>Your Cosmic Profile</span>
                <span>🌟</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 relative z-10">
                {[
                  { icon: '👤', label: 'Name', value: userData?.name, gradient: 'from-blue-500 to-blue-600' },
                  { icon: '📅', label: 'Birth Date', value: userData?.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '', gradient: 'from-green-500 to-green-600' },
                  { icon: '⏰', label: 'Birth Time', value: userData?.timeOfBirth, gradient: 'from-purple-500 to-purple-600' },
                  { icon: '📍', label: 'Birth Place', value: userData?.birthPlace, gradient: 'from-pink-500 to-pink-600' }
                ].map((item, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-700/30">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${item.gradient} rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-lg flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">{item.label}</div>
                        <div className="text-base sm:text-lg font-bold text-white mt-1 break-words">{item.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Action Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              {/* Analysis Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-purple-900/60 to-pink-900/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-purple-600/50 hover:border-purple-500 transition-all duration-300 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl lg:text-7xl mb-4 sm:mb-6 animate-pulse">📖</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                      Detailed Soulmate Reading
                    </h3>
                    <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                      Discover their appearance, personality, and cosmic compatibility through structured insights
                    </p>
                    
                    {!analysis ? (
                      <button
                        onClick={handleGenerateAnalysis}
                        disabled={analysisLoading}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2 sm:space-x-3"
                      >
                        {analysisLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                            <span>Reading Your Stars...</span>
                          </>
                        ) : (
                          <>
                            <span>Generate Reading</span>
                            <span className="text-lg sm:text-xl">✨</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-green-400 font-bold flex items-center justify-center space-x-2 text-base sm:text-lg">
                          <span className="text-lg sm:text-xl">✓</span>
                          <span>Your Cosmic Reading</span>
                        </div>
                        <button
                          onClick={() => setActiveTab('analysis')}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                        >
                          View Your Reading
                        </button>
                      </div>
                    )}
                    
                    {analysisError && (
                      <div className="mt-4 sm:mt-6 text-red-400 text-sm bg-red-900/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-700/50">
                        {analysisError}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Portrait Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-pink-900/60 to-purple-900/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-pink-600/50 hover:border-pink-500 transition-all duration-300 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl lg:text-7xl mb-4 sm:mb-6 animate-pulse">🎨</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                      AI-Generated Portrait
                    </h3>
                    <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                      See a realistic representation of your soulmate based on cosmic alignment
                    </p>
                    
                    {!soulmateImage ? (
                      <button
                        onClick={handleGenerateImage}
                        disabled={imageLoading}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2 sm:space-x-3"
                      >
                        {imageLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                            <span>Creating Portrait...</span>
                          </>
                        ) : (
                          <>
                            <span>Generate Portrait</span>
                            <span className="text-lg sm:text-xl">🎨</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-green-400 font-bold flex items-center justify-center space-x-2 text-base sm:text-lg">
                          <span className="text-lg sm:text-xl">✓</span>
                          <span>Your Soulmate's Portrait</span>
                        </div>
                        <button
                          onClick={() => setActiveTab('portrait')}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                        >
                          View Portrait
                        </button>
                      </div>
                    )}
                    
                    {imageError && (
                      <div className="mt-4 sm:mt-6 text-red-400 text-sm bg-red-900/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-700/50">
                        {imageError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="max-w-7xl mx-auto">
            {Object.keys(analysisData).length > 0 ? (
              <div>
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🔮</div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
                    Your Soulmate Reading
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-300 px-4">Cosmic insights about your destined partner</p>
                </div>

                {/* Analysis Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  {Object.entries(analysisData).map(([sectionName, sectionData], index) => {
                    const config = getSectionConfig(sectionName);
                    
                    return (
                      <div key={index} className="group relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                        <div className="relative bg-purple-900/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-purple-600/30 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[350px] sm:min-h-[400px]">
                          {/* Card Header */}
                          <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${config.gradient} rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl shadow-lg flex-shrink-0`}>
                              {config.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight mb-1 sm:mb-2">{config.title}</h3>
                              <p className="text-gray-300 text-sm sm:text-base">{config.description}</p>
                              <div className={`h-1 w-16 sm:w-20 bg-gradient-to-r ${config.gradient} rounded-full mt-2 sm:mt-3`}></div>
                            </div>
                          </div>
                          
                          {/* Card Content */}
                          <div className="space-y-3 sm:space-y-4">
                            {Object.entries(sectionData).map(([key, value], itemIndex) => (
                              <div key={itemIndex} className="bg-black/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 backdrop-blur-sm border border-purple-700/20">
                                <div className="flex items-start space-x-3">
                                  <div className={`w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r ${config.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs sm:text-sm font-semibold text-gray-400 mb-1">{key}</div>
                                    <div className="text-sm sm:text-base text-white font-medium break-words">{value}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Special Compatibility Highlight */}
                {analysisData['COMPATIBILITY'] && (
                  <div className="relative mb-8 sm:mb-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur-2xl opacity-40"></div>
                    <div className="relative bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white text-center shadow-2xl">
                      <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 animate-pulse">💕</div>
                      <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Cosmic Connection Detected!</h3>
                      <p className="text-pink-100 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto px-2">
                        The stars have aligned perfectly for your love story. Your energies create a harmonious balance destined for lasting happiness.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-6 sm:mt-8">
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold">98%</div>
                          <div className="text-pink-200 text-sm">Soul Match</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold">9.7/10</div>
                          <div className="text-pink-200 text-sm">Cosmic Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold">∞</div>
                          <div className="text-pink-200 text-sm">Love Potential</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="bg-purple-900/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-purple-600/30 text-center">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✨</div>
                  <p className="text-purple-300 italic text-base sm:text-lg leading-relaxed px-2">
                    This reading combines ancient wisdom with AI insights. Trust your heart and intuition on your journey to love!
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center bg-purple-900/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl sm:shadow-2xl border border-purple-600/30">
                <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">📖</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  No Reading Generated Yet
                </h3>
                <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
                  Generate your detailed soulmate reading to see cosmic insights about your destined partner.
                </p>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Go to Overview
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'portrait' && (
          <div className="max-w-4xl mx-auto">
            {soulmateImage ? (
              <div className="bg-purple-900/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl sm:shadow-2xl border border-purple-600/30">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🎨</div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
                    Your Soulmate's Portrait
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-300 px-2">AI-generated realistic portrait based on cosmic analysis</p>
                </div>
                
                <div className="text-center">
                  {/* Enhanced Image Display */}
                  <div className="relative inline-block mb-6 sm:mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur-2xl opacity-30"></div>
                    <img 
                      src={soulmateImage.url} 
                      alt="Your Soulmate's Portrait" 
                      className="relative w-64 h-64 sm:w-80 sm:h-80 lg:max-w-md mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-purple-500 hover:scale-105 transition-transform duration-300 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        setImageError('Failed to load generated image. Please try regenerating.');
                      }}
                    />
                  </div>
                  
                  {/* Image Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-600/30">
                      <div className="text-xl sm:text-2xl mb-2">🌍</div>
                      <div className="text-xs sm:text-sm text-purple-300 font-medium">Regional Match</div>
                      <div className="text-base sm:text-lg font-bold text-white">Culturally Aligned</div>
                    </div>
                    <div className="bg-pink-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-600/30">
                      <div className="text-xl sm:text-2xl mb-2">🎨</div>
                      <div className="text-xs sm:text-sm text-pink-300 font-medium">Art Style</div>
                      <div className="text-base sm:text-lg font-bold text-white">Realistic Portrait</div>
                    </div>
                    <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-600/30">
                      <div className="text-xl sm:text-2xl mb-2">⭐</div>
                      <div className="text-xs sm:text-sm text-purple-300 font-medium">Compatibility</div>
                      <div className="text-base sm:text-lg font-bold text-white">Astrologically Matched</div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-900/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-purple-600/30">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✨</div>
                    <p className="text-purple-300 italic text-base sm:text-lg leading-relaxed px-2">
                      This realistic portrait is generated using astrological compatibility and regional characteristics from your birth location. The image represents the authentic essence and natural beauty of your cosmically aligned partner.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center bg-purple-900/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl sm:shadow-2xl border border-purple-600/30">
                <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">🎨</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  No Portrait Generated Yet
                </h3>
                <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
                  Generate your soulmate's AI portrait to see their cosmic appearance.
                </p>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Go to Overview
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}