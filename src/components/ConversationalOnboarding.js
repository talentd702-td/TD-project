import { useState, useEffect, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { generateChatResponse } from '../lib/gemini';

export default function ConversationalOnboarding({ user, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    birthPlace: ''
  });
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  
  // Date picker state
  const [selectedDay, setSelectedDay] = useState('01');
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [selectedYear, setSelectedYear] = useState('1994');
  
  // Time picker state
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  
  const messagesEndRef = useRef(null);

  const steps = [
    {
      question: "Welcome to Lunatica! ✨ I'm here to create your cosmic profile. Let's start with something simple - what's your first name?",
      field: 'name',
      type: 'text'
    },
    {
      question: "what a beautiful name! ✨\n\nNow, when were you born? I'll need your exact birth date to read your stars accurately.",
      field: 'dateOfBirth', 
      type: 'date'
    },
    {
      question: "Perfect! Now, do you know the exact time you were born? This helps me understand your rising sign and moon placement. 🌙",
      field: 'timeOfBirth',
      type: 'time'
    },
    {
      question: "Almost done! What city were you born in? I need this to calculate your precise astrological chart. 🌍",
      field: 'birthPlace',
      type: 'location'
    }
  ];

  // Popular cities for suggestions
  const popularCities = [
    "Mumbai, India", "Delhi, India", "Bangalore, India", "London, UK", "New York, USA",
    "Los Angeles, USA", "Tokyo, Japan", "Paris, France", "Berlin, Germany", "Sydney, Australia",
    "Toronto, Canada", "Dubai, UAE", "Singapore", "Rome, Italy", "Madrid, Spain",
    "Amsterdam, Netherlands", "Stockholm, Sweden", "Copenhagen, Denmark", "Oslo, Norway",
    "Zurich, Switzerland", "Vienna, Austria", "Prague, Czech Republic", "Warsaw, Poland",
    "Budapest, Hungary", "Athens, Greece", "Istanbul, Turkey", "Cairo, Egypt",
    "Cape Town, South Africa", "São Paulo, Brazil", "Mexico City, Mexico", "Buenos Aires, Argentina"
  ];

  useEffect(() => {
    // Add initial message with delay for natural feel
    setTimeout(() => {
      addMessage("Lunatica", steps[0].question, 'lunatica');
    }, 500);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (sender, content, type = 'user') => {
    setMessages(prev => [...prev, { sender, content, type, timestamp: Date.now() }]);
  };

  const simulateTyping = async (response) => {
    setIsTyping(true);
    // Simulate realistic typing speed
    const typingDelay = Math.min(response.length * 30, 2000);
    await new Promise(resolve => setTimeout(resolve, typingDelay));
    setIsTyping(false);
    addMessage("Lunatica", response, 'lunatica');
  };

  const validateWithAI = async (field, value) => {
    try {
      const prompts = {
        name: `Is "${value}" a valid human name? Respond with just "VALID" or "SUGGEST: [corrected name]"`,
        birthPlace: `Is "${value}" a valid city/location name? If not, suggest the most likely correct spelling. Respond with just "VALID" or "SUGGEST: [corrected location]" - only provide the corrected city name, nothing else.`
      };

      if (!prompts[field]) return { valid: true, suggestion: null };

      const response = await generateChatResponse({
        category: 'ask-anything',
        userMessage: prompts[field],
        userData: formData,
        conversationHistory: []
      });

      if (response.includes('SUGGEST:')) {
        const suggestion = response.replace('SUGGEST:', '').trim();
        // Extract just the location name, remove any extra text
        const locationMatch = suggestion.match(/([A-Za-z\s,]+?)(?:\s|$|[🌟✨⭐🌠💫])/);
        const cleanLocation = locationMatch ? locationMatch[1].trim() : suggestion;
        
        return {
          valid: false,
          suggestion: cleanLocation
        };
      }

      return { valid: true, suggestion: null };
    } catch (error) {
      console.error('AI validation error:', error);
      return { valid: true, suggestion: null };
    }
  };

  const getAISuggestions = async (input) => {
    try {
      if (input.length < 2) return [];
      
      const response = await generateChatResponse({
        category: 'ask-anything',
        userMessage: `Suggest 5 cities that start with or sound like "${input}". Respond with just the city names separated by commas, in format: "City, Country". No extra text.`,
        userData: formData,
        conversationHistory: []
      });

      // Parse AI response and combine with popular cities
      const aiSuggestions = response.split(',').map(s => s.trim()).filter(s => s.length > 0).slice(0, 3);
      
      // Also get popular cities that match
      const popularMatches = popularCities.filter(city => 
        city.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 3);

      // Combine and deduplicate
      const allSuggestions = [...new Set([...aiSuggestions, ...popularMatches])];
      return allSuggestions.slice(0, 5);
    } catch (error) {
      console.error('AI suggestions error:', error);
      // Fallback to popular cities only
      return popularCities.filter(city => 
        city.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 5);
    }
  };

  const getZodiacSign = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
    return '';
  };

  const handleLocationInput = async (value) => {
    setInputValue(value);
    
    if (value.length > 1) {
      // Show loading state
      setLocationSuggestions(['🔮 Finding cosmic locations...']);
      setShowLocationSuggestions(true);
      
      // Get AI-powered suggestions
      const suggestions = await getAISuggestions(value);
      setLocationSuggestions(suggestions);
      setShowLocationSuggestions(suggestions.length > 0);
    } else {
      setShowLocationSuggestions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Handle different input types
    if (currentStep === 1 && !showDatePicker) {
      setShowDatePicker(true);
      return;
    }
    
    if (currentStep === 2 && !showTimePicker) {
      setShowTimePicker(true);
      return;
    }

    let value = inputValue.trim();
    
    // Get values from pickers
    if (currentStep === 1 && showDatePicker) {
      value = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    }
    
    if (currentStep === 2 && showTimePicker) {
      value = `${selectedHour}:${selectedMinute}`;
    }

    if (!value && steps[currentStep].field !== 'timeOfBirth') return;

    // Add user message
    addMessage("You", currentStep === 1 ? `${selectedDay}/${selectedMonth}/${selectedYear}` : value, 'user');
    setInputValue('');
    setShowLocationSuggestions(false);

    // Validate with AI for name and location
    if (currentStep === 0 || currentStep === 3) {
      const validation = await validateWithAI(steps[currentStep].field, value);
      
      if (!validation.valid && validation.suggestion) {
        await simulateTyping(`I think you might mean "${validation.suggestion}". Let me use that instead! ✨`);
        value = validation.suggestion;
      }
    }

    // Update form data
    const updatedFormData = {
      ...formData,
      [steps[currentStep].field]: value
    };
    setFormData(updatedFormData);

    if (currentStep < steps.length - 1) {
      // Move to next step
      const nextStep = currentStep + 1;
      let nextQuestion = steps[nextStep].question;
      
      // Personalize responses
      if (nextStep === 1 && updatedFormData.name) {
        nextQuestion = `${updatedFormData.name}, ${nextQuestion}`;
      }
      
      if (nextStep === 2 && updatedFormData.dateOfBirth) {
        const zodiac = getZodiacSign(updatedFormData.dateOfBirth);
        if (zodiac) {
          nextQuestion = `Ah, a ${zodiac}! How wonderful! ♨️\n\n${nextQuestion}`;
        }
      }
      
      setTimeout(() => {
        simulateTyping(nextQuestion);
      }, 500);
      
      setCurrentStep(nextStep);
      setShowDatePicker(false);
      setShowTimePicker(false);
    } else {
      // Complete onboarding
      const zodiac = getZodiacSign(updatedFormData.dateOfBirth);
      await simulateTyping(`Perfect! I now have everything I need to create your cosmic profile, ${updatedFormData.name}! ✨\n\nArchiving this chat and preparing your personalized experience...`);
      
      setTimeout(async () => {
        await saveProfile(updatedFormData);
        onComplete();
      }, 2500);
    }
  };

  const saveProfile = async (data) => {
    try {
      const dataToSave = {
        ...data,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', user.uid), dataToSave);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    }
  };

  const confirmDate = () => {
    handleSubmit({ preventDefault: () => {} });
  };

  const confirmTime = () => {
    handleSubmit({ preventDefault: () => {} });
  };

  const skipTime = () => {
    setFormData({...formData, timeOfBirth: '12:00'});
    addMessage("You", "I don't know my exact birth time", 'user');
    
    setTimeout(() => {
      simulateTyping("No worries! I'll use noon as a default. Your sun sign is still perfectly accurate! ☀️\n\n" + steps[3].question);
    }, 500);
    
    setCurrentStep(3);
    setShowTimePicker(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-center max-w-md mx-auto">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">✨</div>
            <h1 className="text-lg font-semibold">Get set up</h1>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 pb-32 max-w-md mx-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
              <div className={`max-w-[280px] px-4 py-3 rounded-2xl whitespace-pre-line ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-white'
              }`}>
                <div className="text-xs text-gray-400 mb-1">{message.sender}:</div>
                <div className="text-sm leading-relaxed">{message.content}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-gray-800 text-white max-w-[280px] px-4 py-3 rounded-2xl">
                <div className="text-xs text-gray-400 mb-1">Lunatica:</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Consulting the cosmos</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black border border-purple-600 rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold mb-6 text-center text-purple-300">Select your birth date</h3>
            
            <div className="flex justify-center space-x-4 mb-8">
              {/* Day */}
              <div className="text-center">
                <label className="text-sm text-gray-400 block mb-2">Day</label>
                <select 
                  value={selectedDay} 
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="bg-gray-800 text-white rounded-lg px-3 py-2 text-xl font-mono border border-gray-700 focus:border-purple-500"
                >
                  {Array.from({length: 31}, (_, i) => {
                    const day = String(i + 1).padStart(2, '0');
                    return <option key={day} value={day}>{day}</option>;
                  })}
                </select>
              </div>

              {/* Month */}
              <div className="text-center">
                <label className="text-sm text-gray-400 block mb-2">Month</label>
                <select 
                  value={selectedMonth} 
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-gray-800 text-white rounded-lg px-3 py-2 text-xl font-mono border border-gray-700 focus:border-purple-500"
                >
                  {[
                    '01', '02', '03', '04', '05', '06',
                    '07', '08', '09', '10', '11', '12'
                  ].map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div className="text-center">
                <label className="text-sm text-gray-400 block mb-2">Year</label>
                <select 
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-gray-800 text-white rounded-lg px-3 py-2 text-xl font-mono border border-gray-700 focus:border-purple-500"
                >
                  {Array.from({length: 80}, (_, i) => {
                    const year = String(2010 - i);
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
            </div>

            <button
              onClick={confirmDate}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-full transition-all duration-300"
            >
              Confirm Date ✨
            </button>
          </div>
        </div>
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black border border-purple-600 rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold mb-6 text-center text-purple-300">Select your birth time</h3>
            
            <div className="flex justify-center space-x-6 mb-8">
              {/* Hour */}
              <div className="text-center">
                <label className="text-sm text-gray-400 block mb-2">Hour</label>
                <select 
                  value={selectedHour} 
                  onChange={(e) => setSelectedHour(e.target.value)}
                  className="bg-gray-800 text-white rounded-lg px-3 py-2 text-2xl font-mono border border-gray-700 focus:border-purple-500"
                >
                  {Array.from({length: 24}, (_, i) => {
                    const hour = String(i).padStart(2, '0');
                    return <option key={hour} value={hour}>{hour}</option>;
                  })}
                </select>
              </div>

              {/* Minute */}
              <div className="text-center">
                <label className="text-sm text-gray-400 block mb-2">Minute</label>
                <select 
                  value={selectedMinute} 
                  onChange={(e) => setSelectedMinute(e.target.value)}
                  className="bg-gray-800 text-white rounded-lg px-3 py-2 text-2xl font-mono border border-gray-700 focus:border-purple-500"
                >
                  {Array.from({length: 60}, (_, i) => {
                    const minute = String(i).padStart(2, '0');
                    return <option key={minute} value={minute}>{minute}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={confirmTime}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-full transition-all duration-300"
              >
                Confirm Time 🌙
              </button>
              <button
                onClick={skipTime}
                className="w-full text-gray-400 font-medium py-2 hover:text-white transition-colors"
              >
                I don't know my exact birth time
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Suggestions */}
      {showLocationSuggestions && (
        <div className="fixed bottom-24 left-4 right-4 z-50">
          <div className="max-w-md mx-auto bg-gray-800 rounded-xl border border-gray-700 shadow-2xl">
            <div className="p-3 border-b border-gray-700">
              <div className="text-xs text-gray-400 text-center">🌍 Suggested locations:</div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {locationSuggestions.map((location, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!location.includes('🔮')) {
                      setInputValue(location);
                      setShowLocationSuggestions(false);
                    }
                  }}
                  disabled={location.includes('🔮')}
                  className={`w-full text-left px-4 py-3 transition-colors border-b border-gray-700 last:border-b-0 ${
                    location.includes('🔮') 
                      ? 'text-purple-400 cursor-wait animate-pulse' 
                      : 'hover:bg-gray-700 text-white cursor-pointer'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">
                      {location.includes('🔮') ? '🔮' : '📍'}
                    </span>
                    <span>{location}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      {!showDatePicker && !showTimePicker && currentStep < steps.length && (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => currentStep === 3 ? handleLocationInput(e.target.value) : setInputValue(e.target.value)}
                onClick={() => {
                  if (currentStep === 1) {
                    setShowDatePicker(true);
                  } else if (currentStep === 2) {
                    setShowTimePicker(true);
                  }
                }}
                placeholder={
                  currentStep === 0 ? 'Type your name...' :
                  currentStep === 1 ? 'Tap here to select date' :
                  currentStep === 2 ? 'Tap here to select time' :
                  'Start typing your city...'
                }
                className="flex-1 bg-gray-800 text-white rounded-full px-4 py-3 border border-gray-700 focus:border-purple-600 focus:outline-none cursor-pointer"
                autoFocus={currentStep === 0 || currentStep === 3}
                required={currentStep !== 2}
                readOnly={currentStep === 1 || currentStep === 2}
              />
              <button
                type="submit"
                disabled={(!inputValue.trim() && currentStep !== 1 && currentStep !== 2) || isTyping}
                className="bg-white text-black px-6 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}