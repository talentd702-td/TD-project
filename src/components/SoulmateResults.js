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

  const formatAnalysis = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '🌟' },
    { id: 'analysis', name: 'Reading', icon: '📖' },
    { id: 'portrait', name: 'Portrait', icon: '🎨' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-yellow-50/30">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">✨</div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                SoulMate AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700">Hi, {userData.name?.split(' ')[0]}!</span>
              </div>
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-orange-100">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="max-w-4xl mx-auto">
            {/* Welcome Message */}
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🔮</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Cosmic Reading Awaits
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Based on your birth details, we'll reveal everything about your destined life partner
              </p>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Your Cosmic Profile</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                      <span>👤</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="font-medium">{userData.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                      <span>📅</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Birth Date</div>
                      <div className="font-medium">{new Date(userData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                      <span>⏰</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Birth Time</div>
                      <div className="font-medium">{userData.timeOfBirth}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                      <span>📍</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Birth Place</div>
                      <div className="font-medium">{userData.birthPlace}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Analysis Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                <div className="text-center">
                  <div className="text-5xl mb-4">📖</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Detailed Soulmate Reading
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discover their personality, when you'll meet, and how perfect you are together
                  </p>
                  {!analysis ? (
                    <button
                      onClick={handleGenerateAnalysis}
                      disabled={analysisLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2"
                    >
                      {analysisLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Reading Your Stars...</span>
                        </>
                      ) : (
                        <>
                          <span>Generate Reading</span>
                          <span>✨</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-green-600 font-medium flex items-center justify-center space-x-2">
                        <span>✓</span>
                        <span>Reading Complete</span>
                      </div>
                      <button
                        onClick={() => setActiveTab('analysis')}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        View Reading
                      </button>
                    </div>
                  )}
                  {analysisError && (
                    <div className="mt-4 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      {analysisError}
                    </div>
                  )}
                </div>
              </div>

              {/* Portrait Card */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 border border-orange-100">
                <div className="text-center">
                  <div className="text-5xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    AI-Generated Portrait
                  </h3>
                  <p className="text-gray-600 mb-6">
                    See exactly what your soulmate looks like with our advanced AI artist
                  </p>
                  {!soulmateImage ? (
                    <button
                      onClick={handleGenerateImage}
                      disabled={imageLoading}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2"
                    >
                      {imageLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Creating Portrait...</span>
                        </>
                      ) : (
                        <>
                          <span>Generate Portrait</span>
                          <span>🎨</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-green-600 font-medium flex items-center justify-center space-x-2">
                        <span>✓</span>
                        <span>Portrait Complete</span>
                      </div>
                      <button
                        onClick={() => setActiveTab('portrait')}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        View Portrait
                      </button>
                    </div>
                  )}
                  {imageError && (
                    <div className="mt-4 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      {imageError}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="max-w-4xl mx-auto">
            {analysis ? (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Soulmate Reading</h2>
                    <p className="text-gray-600">Cosmic insights about your destined partner</p>
                  </div>
                  <button
                    onClick={handleGenerateAnalysis}
                    disabled={analysisLoading}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>🔄</span>
                    <span>Regenerate</span>
                  </button>
                </div>
                
                <div 
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: `<p>${formatAnalysis(analysis)}</p>` 
                  }}
                />
                
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <p className="text-sm text-purple-700 italic text-center">
                    ✨ This reading is generated using ancient astrological wisdom and AI. 
                    Trust your intuition and heart in matters of love! ✨
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
                <div className="text-5xl mb-4">📖</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No Reading Generated Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Go back to the Overview tab to generate your detailed soulmate reading.
                </p>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
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
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Soulmate's Portrait</h2>
                    <p className="text-gray-600">AI-generated image based on cosmic analysis</p>
                  </div>
                  <button
                    onClick={handleGenerateImage}
                    disabled={imageLoading}
                    className="bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 text-orange-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>🔄</span>
                    <span>Regenerate</span>
                  </button>
                </div>
                
                <div className="text-center">
                  <img 
                    src={soulmateImage.url} 
                    alt="Your Soulmate's Portrait" 
                    className="max-w-md mx-auto rounded-2xl shadow-2xl mb-6"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      setImageError('Failed to load generated image. Please try regenerating.');
                    }}
                  />
                  
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                    <p className="text-sm text-orange-700 italic text-center">
                      ✨ This artistic interpretation is created using advanced AI based on your astrological compatibility. 
                      Your actual soulmate may have variations while maintaining the core essence shown here. ✨
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No Portrait Generated Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Go back to the Overview tab to generate your soulmate's AI portrait.
                </p>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
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