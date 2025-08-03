import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import SoulmateResults from './SoulmateResults';
import ConversationalOnboarding from './ConversationalOnboarding';
import TrialSignup from './TrialSignup';
import ChatInterface from './ChatInterface';
import SoulmateGenerator from './SoulmateGenerator';

export default function Dashboard({ user }) {
  const [currentScreen, setCurrentScreen] = useState('loading'); // loading, onboarding, trial, dashboard, results, chat, soulmate-generator
  const [currentChatCategory, setCurrentChatCategory] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dashboardFeatures = [
    {
      icon: "🎱",
      title: "Ask me anything",
      description: "Get cosmic guidance on any question",
      gradient: "from-purple-500 to-indigo-500",
      category: "ask-anything"
    },
    {
      icon: "🔮",
      title: "Daily horoscope", 
      description: "Your personalized daily cosmic forecast",
      gradient: "from-green-500 to-teal-500",
      category: "daily-horoscope"
    },
    {
      icon: "🌹",
      title: "Romantic compatibility",
      description: "Discover your perfect cosmic match",
      gradient: "from-pink-500 to-rose-500",
      category: "romantic-compatibility"
    },
    {
      icon: "🔗",
      title: "Your soulmate",
      description: "Find your destined life partner",
      gradient: "from-red-500 to-orange-500",
      category: "soulmate-generator"
    },
    {
      icon: "🤝",
      title: "Friend compatibility",
      description: "Understand your friendships better",
      gradient: "from-cyan-500 to-blue-500",
      category: "friend-compatibility"
    },
    {
      icon: "☁️",
      title: "Dream interpreter",
      description: "Unlock the secrets of your dreams",
      gradient: "from-orange-500 to-yellow-500",
      category: "dream-interpreter"
    },
    {
      icon: "⭐",
      title: "Astrological events",
      description: "Important cosmic happenings",
      gradient: "from-blue-500 to-indigo-500",
      category: "astrological-events"
    },
    {
      icon: "☀️",
      title: "Tarot card interpreter",
      description: "Divine insights through tarot",
      gradient: "from-purple-500 to-pink-500",
      category: "tarot-interpreter"
    },
    {
      icon: "🪁",
      title: "Personal growth",
      description: "Develop your highest potential",
      gradient: "from-green-500 to-blue-500",
      category: "personal-growth"
    }
  ];

  useEffect(() => {
    checkExistingProfile();
  }, [user]);

  const checkExistingProfile = async () => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          
          if (data.name && data.dateOfBirth) {
            // User has completed profile
            if (data.hasAcceptedTrial) {
              setCurrentScreen('dashboard');
            } else {
              setCurrentScreen('trial');
            }
          } else {
            // User needs to complete onboarding
            setCurrentScreen('onboarding');
          }
        } else {
          // New user - start onboarding
          setCurrentScreen('onboarding');
        }
      } catch (error) {
        console.error('Error checking profile:', error);
        setCurrentScreen('onboarding');
      }
    }
    setLoading(false);
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('trial');
  };

  const handleTrialAccept = async (notifyPreference) => {
    try {
      // Update user profile with trial acceptance
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        hasAcceptedTrial: true,
        notifyBeforeTrialEnd: notifyPreference,
        trialStartDate: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // Refresh user data
      await checkExistingProfile();
    } catch (error) {
      console.error('Error accepting trial:', error);
      setCurrentScreen('dashboard');
    }
  };

  const handleTrialSkip = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSoulmateClick = () => {
    setCurrentScreen('soulmate-generator');
  };

  const handleFeatureClick = (feature) => {
    if (feature.category === 'soulmate-generator') {
      setCurrentScreen('soulmate-generator');
    } else if (feature.category === 'personal-growth') {
      // For personal growth, we can use a special chat interface or separate component
      setCurrentChatCategory('ask-anything'); // For now, treat as general chat
      setCurrentScreen('chat');
    } else {
      // All other features open chat interface with specific category
      setCurrentChatCategory(feature.category);
      setCurrentScreen('chat');
    }
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setCurrentChatCategory(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">✨</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Lunatica...</p>
        </div>
      </div>
    );
  }

  if (currentScreen === 'onboarding') {
    return <ConversationalOnboarding user={user} onComplete={handleOnboardingComplete} />;
  }

  if (currentScreen === 'trial') {
    return <TrialSignup onAccept={handleTrialAccept} onSkip={handleTrialSkip} />;
  }

  if (currentScreen === 'results') {
    return (
      <SoulmateResults 
        user={user} 
        userData={userData} 
        onBack={() => setCurrentScreen('dashboard')} 
      />
    );
  }

  if (currentScreen === 'chat') {
    return (
      <ChatInterface
        category={currentChatCategory}
        user={user}
        userData={userData}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentScreen === 'soulmate-generator') {
    return (
      <SoulmateGenerator
        user={user}
        userData={userData}
        onBack={handleBackToDashboard}
      />
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-2">
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-8 h-8 rounded-full ring-2 ring-purple-500"
            />
            <span className="text-sm font-medium">
              Hi, {userData?.name || user.displayName?.split(' ')[0]}!
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2"
          >
            <svg className="w-6 h-6 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="p-4 max-w-md mx-auto">
        <div className="space-y-3">
          {dashboardFeatures.map((feature, index) => (
            <button
              key={index}
              onClick={() => handleFeatureClick(feature)}
              className="w-full bg-gray-900 hover:bg-gray-800 rounded-2xl p-4 transition-all duration-300 border border-gray-800 hover:border-gray-700 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
        <div className="flex justify-center max-w-md mx-auto">
          <div className="flex items-center space-x-8">
            <button className="p-3 bg-white rounded-full">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            
            <button className="p-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Add bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}