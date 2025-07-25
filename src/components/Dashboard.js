import { useState, useEffect, useRef } from 'react';
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
  
  // Location autocomplete states
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const locationInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Popular cities database for autocomplete
  const popularCities = [
    // Major Indian Metropolitan Cities
    "Mumbai, India", "Delhi, India", "Bangalore, India", "Hyderabad, India", 
    "Chennai, India", "Kolkata, India", "Pune, India", "Ahmedabad, India",
    
    // State Capitals & Major Cities
    "Jaipur, India", "Lucknow, India", "Kanpur, India", "Nagpur, India",
    "Indore, India", "Thane, India", "Bhopal, India", "Visakhapatnam, India",
    "Vadodara, India", "Ludhiana, India", "Rajkot, India", "Agra, India", 
    "Nashik, India", "Faridabad, India", "Meerut, India", "Varanasi, India", 
    "Srinagar, India", "Dhanbad, India", "Jodhpur, India", "Amritsar, India", 
    "Raipur, India", "Allahabad, India", "Coimbatore, India", "Jabalpur, India", 
    "Gwalior, India", "Vijayawada, India", "Madurai, India", "Guwahati, India", 
    "Chandigarh, India", "Ranchi, India", "Jalandhar, India", "Tiruchirappalli, India", 
    "Bhubaneswar, India",
    
    // Additional Popular Indian Cities
    "Ajmer, India", "Udaipur, India", "Kota, India", "Bikaner, India", "Alwar, India",
    "Mathura, India", "Vrindavan, India", "Haridwar, India", "Rishikesh, India", "Dehradun, India",
    "Mussoorie, India", "Shimla, India", "Manali, India", "Dharamshala, India", "Amritsar, India",
    "Jammu, India", "Leh, India", "Goa, India", "Panaji, India", "Vasco da Gama, India",
    "Mysore, India", "Mangalore, India", "Hubli, India", "Belgaum, India", "Gulbarga, India",
    "Kochi, India", "Thiruvananthapuram, India", "Kozhikode, India", "Thrissur, India", "Kollam, India",
    "Vellore, India", "Salem, India", "Tirunelveli, India", "Erode, India", "Tirupur, India",
    "Guntur, India", "Nellore, India", "Warangal, India", "Karimnagar, India", "Nizamabad, India",
    "Cuttack, India", "Rourkela, India", "Sambalpur, India", "Berhampur, India", "Puri, India",
    "Siliguri, India", "Asansol, India", "Durgapur, India", "Howrah, India", "Malda, India",
    "Patna, India", "Gaya, India", "Bhagalpur, India", "Muzaffarpur, India", "Darbhanga, India",
    "Gorakhpur, India", "Bareilly, India", "Aligarh, India", "Moradabad, India", "Saharanpur, India",
    "Firozabad, India", "Jhansi, India", "Muzaffarnagar, India", "Mathura, India", "Rampur, India",
    "Shahjahanpur, India", "Farrukhabad, India", "Mau, India", "Hapur, India", "Etawah, India",
    "Mirzapur, India", "Bulandshahr, India", "Sambhal, India", "Amroha, India", "Hardoi, India",
    "Fatehpur, India", "Raebareli, India", "Orai, India", "Sitapur, India", "Bahraich, India",
    "Modinagar, India", "Unnao, India", "Jaunpur, India", "Lakhimpur, India", "Hathras, India",
    "Banda, India", "Pilibhit, India", "Barabanki, India", "Khurja, India", "Ghaziabad, India",
    "Noida, India", "Greater Noida, India", "Gurgaon, India", "Faridabad, India", "Panipat, India",
    "Ambala, India", "Yamunanagar, India", "Rohtak, India", "Hisar, India", "Karnal, India",
    "Sonipat, India", "Panchkula, India", "Bahadurgarh, India", "Jind, India", "Thanesar, India",
    "Kaithal, India", "Rewari, India", "Narnaul, India",
    
    // Major International Cities
    "New York, USA", "Los Angeles, USA", "Chicago, USA", "Houston, USA",
    "Phoenix, USA", "Philadelphia, USA", "San Antonio, USA", "San Diego, USA",
    "Dallas, USA", "San Jose, USA", "Austin, USA", "Jacksonville, USA",
    "London, UK", "Birmingham, UK", "Manchester, UK", "Glasgow, UK",
    "Liverpool, UK", "Newcastle, UK", "Sheffield, UK", "Bristol, UK",
    "Toronto, Canada", "Montreal, Canada", "Vancouver, Canada", "Calgary, Canada",
    "Edmonton, Canada", "Ottawa, Canada", "Winnipeg, Canada", "Quebec City, Canada",
    "Sydney, Australia", "Melbourne, Australia", "Brisbane, Australia", "Perth, Australia",
    "Adelaide, Australia", "Gold Coast, Australia", "Newcastle, Australia", "Canberra, Australia",
    "Dubai, UAE", "Abu Dhabi, UAE", "Sharjah, UAE", "Ajman, UAE",
    "Singapore, Singapore", "Kuala Lumpur, Malaysia", "Bangkok, Thailand", "Manila, Philippines",
    "Jakarta, Indonesia", "Ho Chi Minh City, Vietnam", "Hanoi, Vietnam", "Yangon, Myanmar",
    "Dhaka, Bangladesh", "Karachi, Pakistan", "Lahore, Pakistan", "Islamabad, Pakistan",
    "Colombo, Sri Lanka", "Kathmandu, Nepal", "Male, Maldives", "Thimphu, Bhutan"
  ];

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

  // Location autocomplete functions
  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    setFormData({...formData, birthPlace: value});
    
    if (value.length > 0) {
      const filtered = popularCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10); // Increased to 10 suggestions for better coverage
      
      setLocationSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
      setLocationSuggestions([]);
    }
  };

  const handleLocationKeyDown = (e) => {
    if (!showSuggestions || locationSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < locationSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : locationSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          selectLocation(locationSuggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const selectLocation = (location) => {
    setFormData({...formData, birthPlace: location});
    setShowSuggestions(false);
    setLocationSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async () => {
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
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <div className="text-xl sm:text-2xl">✨</div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                AstroJaano
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                />
                <span className="text-xs sm:text-sm text-gray-700">Hi, {user.displayName?.split(' ')[0]}!</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center overflow-x-auto pb-4">
            <div className="flex items-center min-w-max px-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'mr-4 sm:mr-6 lg:mr-8' : ''}`}>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-semibold mb-2 transition-all duration-200 text-sm sm:text-base ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {currentStep > step.number ? '✓' : step.number}
                    </div>
                    <div className="text-center">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{step.title}</div>
                      <div className="text-xs text-gray-500 hidden sm:block">{step.desc}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 sm:w-12 lg:w-16 h-0.5 mx-2 sm:mx-3 lg:mx-4 mb-6 sm:mb-8 transition-all duration-200 ${
                      currentStep > step.number ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 1 && (
            <div className="text-center bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-orange-100">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">🌟</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Welcome to Your Cosmic Journey
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
                You're about to discover the secrets of your destined life partner. 
                Our ancient wisdom combined with AI will reveal everything about your soulmate.
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">What you'll get:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base text-gray-700">
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
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Begin My Reading
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-100">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">👋</div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Let's Get to Know You
                </h2>
                <p className="text-gray-600 text-sm sm:text-base px-2">
                  This helps us personalize your soulmate reading
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's your full name?
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's your gender?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['male', 'female', 'other'].map((gender) => (
                      <div key={gender} className="relative cursor-pointer" onClick={() => handleChange({target: {name: 'gender', value: gender}})}>
                        <div className={`p-3 sm:p-4 text-center rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
                          formData.gender === gender
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="text-xl sm:text-2xl mb-1">
                            {gender === 'male' ? '👨' : gender === 'female' ? '👩' : '🧑'}
                          </div>
                          <div className="font-medium capitalize text-sm sm:text-base">{gender}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={handleNext}
                    disabled={!formData.name || !formData.gender}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-100">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌙</div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Your Birth Details
                </h2>
                <p className="text-gray-600 text-sm sm:text-base px-2">
                  Precise timing creates the most accurate cosmic reading
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time of Birth
                    <span className="text-xs text-gray-500 ml-1 sm:ml-2 block sm:inline">(If unknown, use 12:00 PM)</span>
                  </label>
                  <input
                    type="time"
                    name="timeOfBirth"
                    value={formData.timeOfBirth}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Place
                  </label>
                  <div className="relative">
                    <input
                      ref={locationInputRef}
                      type="text"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleLocationInputChange}
                      onKeyDown={handleLocationKeyDown}
                      onFocus={() => {
                        if (formData.birthPlace && locationSuggestions.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      onBlur={() => {
                        // Delay hiding suggestions to allow for click events
                        setTimeout(() => setShowSuggestions(false), 150);
                      }}
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="Start typing your city... (e.g., Mumbai, Kanpur, Ajmer)"
                      required
                      autoComplete="off"
                    />
                    
                    {/* Location Suggestions Dropdown */}
                    {showSuggestions && locationSuggestions.length > 0 && (
                      <div 
                        ref={suggestionsRef}
                        className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg sm:rounded-xl shadow-lg max-h-48 overflow-y-auto"
                      >
                        {locationSuggestions.map((location, index) => (
                          <div
                            key={location}
                            className={`px-3 sm:px-4 py-2 cursor-pointer text-sm sm:text-base transition-colors ${
                              index === selectedSuggestionIndex
                                ? 'bg-orange-50 text-orange-700'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={() => selectLocation(location)}
                            onMouseEnter={() => setSelectedSuggestionIndex(index)}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400">📍</span>
                              <span>{location}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    💡 Start typing to see location suggestions
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-yellow-600 text-lg sm:text-xl flex-shrink-0">🔒</div>
                    <div className="text-xs sm:text-sm text-yellow-800">
                      <div className="font-medium mb-1">Your Privacy is Sacred</div>
                      <div>We use military-grade encryption to protect your personal information. Your data is never shared with third parties.</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.dateOfBirth || !formData.timeOfBirth || !formData.birthPlace}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-300 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}