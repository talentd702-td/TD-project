import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import SoulmateResults from './SoulmateResults';

export default function Dashboard({ user }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dateOfBirth: '',
    timeOfBirth: '',
    birthPlace: ''
  });
  const [loading, setLoading] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    // Check if user already has a profile
    const checkExistingProfile = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFormData({
            name: userData.name || '',
            gender: userData.gender || '',
            dateOfBirth: userData.dateOfBirth || '',
            timeOfBirth: userData.timeOfBirth || '',
            birthPlace: userData.birthPlace || ''
          });
          if (userData.name && userData.gender && userData.dateOfBirth) {
            setHasProfile(true);
            setCurrentStep(4); // Go to results page
          }
        }
      }
    };

    checkExistingProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', user.uid), dataToSave);
      setHasProfile(true);
      setCurrentStep(4);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Welcome", desc: "Let's get started" },
    { number: 2, title: "Basic Info", desc: "Tell us about yourself" },
    { number: 3, title: "Birth Details", desc: "For accurate readings" },
    { number: 4, title: "Discover", desc: "Your soulmate awaits" }
  ];

  if (currentStep === 4 && hasProfile) {
    return <SoulmateResults user={user} userData={formData} onBack={() => setCurrentStep(3)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-yellow-50/30">
      {/* Header */}
      <header className="bg-white border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <span className="text-sm text-gray-700">Hi, {user.displayName?.split(' ')[0]}!</span>
              </div>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'mr-8' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold mb-2 transition-all duration-200 ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.desc}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 mb-8 transition-all duration-200 ${
                    currentStep > step.number ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 1 && (
            <div className="text-center bg-white rounded-3xl p-12 shadow-xl border border-orange-100">
              <div className="text-6xl mb-6">🌟</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Your Cosmic Journey
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                You're about to discover the secrets of your destined life partner. 
                Our ancient wisdom combined with AI will reveal everything about your soulmate.
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">What you'll get:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <span>🎨</span>
                    <span>AI-generated portrait</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📖</span>
                    <span>Detailed personality analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📅</span>
                    <span>When you'll meet</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>💕</span>
                    <span>Compatibility insights</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Begin My Reading
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">👋</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Let's Get to Know You
                </h2>
                <p className="text-gray-600">
                  This helps us personalize your soulmate reading
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's your full name?
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's your gender?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['male', 'female', 'other'].map((gender) => (
                      <label key={gender} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={formData.gender === gender}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`p-4 text-center rounded-xl border-2 transition-all duration-200 ${
                          formData.gender === gender
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="text-2xl mb-1">
                            {gender === 'male' ? '👨' : gender === 'female' ? '👩' : '🧑'}
                          </div>
                          <div className="font-medium capitalize">{gender}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.name || !formData.gender}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🌙</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Birth Details
                </h2>
                <p className="text-gray-600">
                  Precise timing creates the most accurate cosmic reading
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time of Birth
                    <span className="text-xs text-gray-500 ml-2">(If unknown, use 12:00 PM)</span>
                  </label>
                  <input
                    type="time"
                    name="timeOfBirth"
                    value={formData.timeOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Place
                  </label>
                  <input
                    type="text"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="City, Country (e.g., Mumbai, India)"
                    required
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-yellow-600">🔒</div>
                    <div className="text-sm text-yellow-800">
                      <div className="font-medium mb-1">Your Privacy is Sacred</div>
                      <div>We use military-grade encryption to protect your personal information. Your data is never shared with third parties.</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || !formData.dateOfBirth || !formData.timeOfBirth || !formData.birthPlace}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Creating Your Profile...</span>
                      </>
                    ) : (
                      <>
                        <span>Reveal My Soulmate</span>
                        <span>✨</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}