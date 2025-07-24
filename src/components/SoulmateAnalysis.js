import { useState, useEffect } from 'react';
import { generateSoulmateAnalysis, generateSoulmateImagePrompt, generateSoulmateImage } from '../lib/gemini';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function SoulmateAnalysis({ userData, user }) {
  const [analysis, setAnalysis] = useState('');
  const [soulmateImage, setSoulmateImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');
  const [currentUserData, setCurrentUserData] = useState(userData);

  // If userData is not passed, try to fetch it from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      console.log('SoulmateAnalysis - userData:', userData); // Debug log
      console.log('SoulmateAnalysis - user:', user?.uid); // Debug log
      
      if (!userData && user) {
        console.log('Fetching user data from Firebase...'); // Debug log
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log('Fetched data from Firebase:', data); // Debug log
            setCurrentUserData(data);
          } else {
            console.log('No document found in Firebase'); // Debug log
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else if (userData) {
        console.log('Using passed userData:', userData); // Debug log
        setCurrentUserData(userData);
      }
    };

    fetchUserData();
  }, [userData, user]);

  const handleGenerateImage = async () => {
    if (!currentUserData || !currentUserData.name || !currentUserData.gender || !currentUserData.dateOfBirth) {
      setImageError('Please complete your profile first to generate soulmate image.');
      return;
    }

    setImageLoading(true);
    setImageError('');

    try {
      // First, generate the image prompt using Gemini AI
      const imagePrompt = await generateSoulmateImagePrompt(currentUserData);
      console.log('Generated image prompt:', imagePrompt);
      
      // Then generate the actual image using FLUX
      const imageResult = await generateSoulmateImage(imagePrompt);
      setSoulmateImage({
        url: imageResult.imageUrl,
        prompt: imagePrompt,
        seed: imageResult.seed
      });
    } catch (err) {
      console.error('Error generating soulmate image:', err);
      setImageError(err.message);
    } finally {
      setImageLoading(false);
    }
  };

  const handleGenerateAnalysis = async () => {
    if (!currentUserData || !currentUserData.name || !currentUserData.gender || !currentUserData.dateOfBirth) {
      setError('Please complete your profile first to generate analysis.');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const result = await generateSoulmateAnalysis(currentUserData);
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatAnalysis = (text) => {
    // Convert markdown-like formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  };

  // Show message if no user data available
  if (!currentUserData || !currentUserData.name) {
    const handleRefreshData = async () => {
      if (user) {
        console.log('Manually refreshing user data...'); // Debug log
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log('Manually fetched data:', data); // Debug log
            setCurrentUserData(data);
          } else {
            console.log('No document found during manual refresh'); // Debug log
          }
        } catch (error) {
          console.error('Error during manual refresh:', error);
        }
      }
    };

    return (
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Complete Your Profile First</h3>
            <p className="mb-4">Fill out your birth details above to unlock your soulmate analysis!</p>
            
            {/* Manual refresh button for debugging */}
            <button
              onClick={handleRefreshData}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
            >
              🔄 Refresh Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          ✨ Discover Your Soulmate
        </h3>
        <p className="text-gray-600">
          Get AI-powered insights about your life partner based on your birth details
        </p>
      </div>

      {/* Show current user data for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-50 p-3 rounded mb-4 text-sm">
          <strong>Debug - Current Data:</strong><br/>
          Name: {currentUserData?.name}<br/>
          Gender: {currentUserData?.gender}<br/>
          DOB: {currentUserData?.dateOfBirth}<br/>
          Time: {currentUserData?.timeOfBirth}<br/>
          Place: {currentUserData?.birthPlace}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {!analysis && !loading && (
          <button
            onClick={handleGenerateAnalysis}
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Generate Soulmate Analysis
          </button>
        )}

        {!soulmateImage && !imageLoading && (
          <button
            onClick={handleGenerateImage}
            disabled={imageLoading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Generate Soulmate Portrait
          </button>
        )}
      </div>

      {/* Loading States */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">Analyzing your cosmic connections...</p>
        </div>
      )}

      {imageLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          <p className="mt-4 text-gray-600">Creating your soulmate's portrait...</p>
        </div>
      )}

      {/* Error States */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <p className="font-medium">Analysis Error:</p>
          <p>{error}</p>
          <button
            onClick={handleGenerateAnalysis}
            className="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
          >
            Try Again
          </button>
        </div>
      )}

      {imageError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <p className="font-medium">Image Generation Error:</p>
          <p>{imageError}</p>
          <button
            onClick={handleGenerateImage}
            className="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soulmate Portrait */}
        {soulmateImage && (
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-bold text-pink-800">Your Soulmate's Portrait</h4>
              <button
                onClick={handleGenerateImage}
                disabled={imageLoading}
                className="text-sm bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-1 rounded transition duration-200"
              >
                🔄 Regenerate
              </button>
            </div>
            
            <div className="text-center">
              <img 
                src={soulmateImage.url} 
                alt="Your Soulmate's Portrait" 
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg mb-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                  setImageError('Failed to load generated image. Please try regenerating.');
                }}
              />
              <p className="text-sm text-pink-600 italic">
                ✨ AI-generated pencil sketch based on your cosmic compatibility ✨
              </p>
            </div>
          </div>
        )}

        {/* Text Analysis */}
        {analysis && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-bold text-purple-800">Your Soulmate Analysis</h4>
              <button
                onClick={handleGenerateAnalysis}
                disabled={loading}
                className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded transition duration-200"
              >
                🔄 Regenerate
              </button>
            </div>
            
            <div 
              className="prose prose-purple max-w-none text-gray-700 leading-relaxed text-sm"
              dangerouslySetInnerHTML={{ 
                __html: `<p>${formatAnalysis(analysis)}</p>` 
              }}
            />
          </div>
        )}
      </div>

      {/* Disclaimer */}
      {(analysis || soulmateImage) && (
        <div className="mt-6 p-4 bg-white bg-opacity-50 rounded-lg border border-purple-100">
          <p className="text-sm text-purple-600 italic text-center">
            ✨ This analysis and portrait are generated using AI and should be taken as entertainment. 
            Trust your heart and intuition in matters of love! ✨
          </p>
        </div>
      )}
    </div>
  );
}