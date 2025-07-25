import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { generateSoulmateAnalysis, generateSoulmateImagePrompt, generateSoulmateImage } from '../lib/gemini';

export default function SoulmateResults({ user, userData, onBack }) {
  const [analysis, setAnalysis] = useState('');
  const [soulmateImage, setSoulmateImage] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState('');
  const [imageError, setImageError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleGenerateAnalysis = async () => {
    setAnalysisLoading(true);
    setAnalysisError('');
    setAnalysis('');

    try {
      const result = await generateSoulmateAnalysis(userData);
      setAnalysis(result);
      setActiveTab('analysis');
    } catch (err) {
      setAnalysisError(err.message);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    setImageLoading(true);
    setImageError('');

    try {
      const imagePrompt = await generateSoulmateImagePrompt(userData);
      const imageResult = await generateSoulmateImage(imagePrompt);
      setSoulmateImage({
        url: imageResult.imageUrl,
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
        
        // Parse key:value pairs
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">✨</div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                AstroJaano
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-yellow-50 px-4 py-2 rounded-full">
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full ring-2 ring-orange-200"
                />
                <span className="text-sm font-medium text-gray-700">Hi, {userData.name?.split(' ')[0]}!</span>
              </div>
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-orange-600 text-sm font-medium transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-3 shadow-2xl border border-orange-100">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-xl transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-105'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="text-8xl mb-6 animate-bounce">🔮</div>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-6">
                Your Cosmic Reading Awaits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover everything about your destined life partner through ancient wisdom and cosmic insights
              </p>
            </div>

            {/* Enhanced Profile Card */}
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl p-10 shadow-2xl border border-orange-100 mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full -mr-20 -mt-20 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-100 to-orange-100 rounded-full -ml-16 -mb-16 opacity-50"></div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-3">
                <span>🌟</span>
                <span>Your Cosmic Profile</span>
                <span>🌟</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                {[
                  { icon: '👤', label: 'Name', value: userData.name, gradient: 'from-blue-500 to-blue-600' },
                  { icon: '📅', label: 'Birth Date', value: new Date(userData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), gradient: 'from-green-500 to-green-600' },
                  { icon: '⏰', label: 'Birth Time', value: userData.timeOfBirth, gradient: 'from-purple-500 to-purple-600' },
                  { icon: '📍', label: 'Birth Place', value: userData.birthPlace, gradient: 'from-pink-500 to-pink-600' }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{item.label}</div>
                        <div className="text-lg font-bold text-gray-900 mt-1">{item.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Action Cards */}
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Analysis Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-10 border border-orange-200 hover:border-orange-300 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-7xl mb-6 animate-pulse">📖</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Detailed Soulmate Reading
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                      Discover their appearance, personality, and cosmic compatibility through structured insights
                    </p>
                    
                    {!analysis ? (
                      <button
                        onClick={handleGenerateAnalysis}
                        disabled={analysisLoading}
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-3"
                      >
                        {analysisLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            <span>Reading Your Stars...</span>
                          </>
                        ) : (
                          <>
                            <span>Generate Reading</span>
                            <span className="text-xl">✨</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-green-600 font-bold flex items-center justify-center space-x-2 text-lg">
                          <span className="text-xl">✓</span>
                          <span>Reading Complete</span>
                        </div>
                        <button
                          onClick={() => setActiveTab('analysis')}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                        >
                          View Reading
                        </button>
                      </div>
                    )}
                    
                    {analysisError && (
                      <div className="mt-6 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-200">
                        {analysisError}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Portrait Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-10 border border-yellow-200 hover:border-yellow-300 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-7xl mb-6 animate-pulse">🎨</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      AI-Generated Portrait
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                      See a realistic representation of your soulmate based on your birth location and astrological compatibility
                    </p>
                    
                    {!soulmateImage ? (
                      <button
                        onClick={handleGenerateImage}
                        disabled={imageLoading}
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-3"
                      >
                        {imageLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            <span>Creating Portrait...</span>
                          </>
                        ) : (
                          <>
                            <span>Generate Portrait</span>
                            <span className="text-xl">🎨</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-green-600 font-bold flex items-center justify-center space-x-2 text-lg">
                          <span className="text-xl">✓</span>
                          <span>Portrait Complete</span>
                        </div>
                        <button
                          onClick={() => setActiveTab('portrait')}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                        >
                          View Portrait
                        </button>
                      </div>
                    )}
                    
                    {imageError && (
                      <div className="mt-6 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-200">
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
                <div className="text-center mb-12">
                  <div className="text-6xl mb-4">🔮</div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                    Your Soulmate Reading
                  </h2>
                  <p className="text-xl text-gray-600">Cosmic insights about your destined partner</p>
                </div>

                {/* Analysis Sections Grid */}
                <div className="grid xl:grid-cols-2 gap-8 mb-12">
                  {Object.entries(analysisData).map(([sectionName, sectionData], index) => {
                    const config = getSectionConfig(sectionName);
                    
                    return (
                      <div key={index} className="group relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                        <div className={`relative bg-gradient-to-br ${config.bgGradient} rounded-3xl p-8 border border-opacity-20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[400px]`}>
                          {/* Card Header */}
                          <div className="flex items-start space-x-4 mb-6">
                            <div className={`w-16 h-16 bg-gradient-to-r ${config.gradient} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0`}>
                              {config.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{config.title}</h3>
                              <p className="text-gray-600 text-sm">{config.description}</p>
                              <div className={`h-1 w-20 bg-gradient-to-r ${config.gradient} rounded-full mt-3`}></div>
                            </div>
                          </div>
                          
                          {/* Card Content */}
                          <div className="space-y-4">
                            {Object.entries(sectionData).map(([key, value], itemIndex) => (
                              <div key={itemIndex} className="bg-white/60 rounded-2xl p-4 backdrop-blur-sm">
                                <div className="flex items-start space-x-3">
                                  <div className={`w-3 h-3 bg-gradient-to-r ${config.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                                  <div className="flex-1">
                                    <div className="text-sm font-semibold text-gray-700 mb-1">{key}</div>
                                    <div className="text-gray-800 font-medium">{value}</div>
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
                  <div className="relative mb-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 rounded-3xl blur-2xl opacity-40"></div>
                    <div className="relative bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-3xl p-10 text-white text-center shadow-2xl">
                      <div className="text-6xl mb-6 animate-pulse">💕</div>
                      <h3 className="text-3xl font-bold mb-4">Cosmic Connection Detected!</h3>
                      <p className="text-pink-100 text-xl leading-relaxed max-w-2xl mx-auto">
                        The stars have aligned perfectly for your love story. Your energies create a harmonious balance destined for lasting happiness.
                      </p>
                      <div className="flex justify-center space-x-8 mt-8">
                        <div className="text-center">
                          <div className="text-3xl font-bold">98%</div>
                          <div className="text-pink-200 text-sm">Soul Match</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold">9.7/10</div>
                          <div className="text-pink-200 text-sm">Cosmic Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold">∞</div>
                          <div className="text-pink-200 text-sm">Love Potential</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-8 border border-orange-200 text-center">
                  <div className="text-4xl mb-4">✨</div>
                  <p className="text-orange-700 italic text-lg leading-relaxed">
                    This reading combines ancient wisdom with AI insights. Trust your heart and intuition on your journey to love!
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center bg-white rounded-3xl p-16 shadow-2xl border border-gray-100">
                <div className="text-8xl mb-6">📖</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  No Reading Generated Yet
                </h3>
                <p className="text-xl text-gray-600 mb-8">
                  Generate your detailed soulmate reading to see cosmic insights about your destined partner.
                </p>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
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
              <div className="bg-white rounded-3xl p-10 shadow-2xl border border-orange-100">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎨</div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                    Your Soulmate's Portrait
                  </h2>
                  <p className="text-xl text-gray-600">AI-generated realistic portrait based on cosmic analysis</p>
                </div>
                
                <div className="text-center">
                  {/* Enhanced Image Display */}
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl blur-2xl opacity-30"></div>
                    <img 
                      src={soulmateImage.url} 
                      alt="Your Soulmate's Portrait" 
                      className="relative max-w-md mx-auto rounded-3xl shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        setImageError('Failed to load generated image. Please try regenerating.');
                      }}
                    />
                  </div>
                  
                  {/* Image Stats */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
                      <div className="text-2xl mb-2">🌍</div>
                      <div className="text-sm text-orange-600 font-medium">Regional Match</div>
                      <div className="text-lg font-bold text-gray-900">Culturally Aligned</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                      <div className="text-2xl mb-2">🎨</div>
                      <div className="text-sm text-yellow-600 font-medium">Art Style</div>
                      <div className="text-lg font-bold text-gray-900">Realistic Portrait</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
                      <div className="text-2xl mb-2">⭐</div>
                      <div className="text-sm text-orange-600 font-medium">Compatibility</div>
                      <div className="text-lg font-bold text-gray-900">Astrologically Matched</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-8 border border-orange-200">
                    <div className="text-4xl mb-4">✨</div>
                    <p className="text-orange-700 italic text-lg leading-relaxed">
                      This realistic portrait is generated using astrological compatibility and regional characteristics from your birth location. The image represents the authentic essence and natural beauty of your cosmically aligned partner.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center bg-white rounded-3xl p-16 shadow-2xl border border-gray-100">
                <div className="text-8xl mb-6">🎨</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  No Portrait Generated Yet
                </h3>
                <p className="text-xl text-gray-600 mb-8">
                  Generate your soulmate's AI portrait to see their cosmic appearance.
                </p>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
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