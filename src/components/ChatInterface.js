import { useState, useEffect, useRef } from 'react';
import { generateChatResponse } from '../lib/gemini';

export default function ChatInterface({ category, user, userData, onBack }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const categoryConfig = {
    'ask-anything': {
      title: 'Ask me anything',
      icon: '🎱',
      welcomeMessage: "Hi! I'm your cosmic guide. Ask me anything about your life, relationships, career, or future!",
      suggestions: [
        "What does my future hold?",
        "How can I improve my relationships?",
        "What career path is best for me?",
        "When will I find love?",
        "What are my hidden talents?",
        "How can I overcome my challenges?"
      ]
    },
    'daily-horoscope': {
      title: 'Daily horoscope',
      icon: '🔮',
      welcomeMessage: "Welcome to your personalized daily horoscope! Let me know what you'd like to explore today.",
      suggestions: [
        "What's my horoscope for today?",
        "How are the planets affecting me?",
        "What should I focus on today?",
        "Any lucky opportunities today?",
        "How is Mercury retrograde affecting me?",
        "What's my love forecast for today?"
      ]
    },
    'romantic-compatibility': {
      title: 'Romantic compatibility',
      icon: '🌹',
      welcomeMessage: "Let's explore your romantic compatibility! I can help you understand relationships and love connections.",
      suggestions: [
        "Am I compatible with a Scorpio?",
        "What's my ideal partner like?",
        "How can I improve my relationship?",
        "When will I meet my soulmate?",
        "What signs am I most compatible with?",
        "How do I know if someone likes me?"
      ]
    },
    'friend-compatibility': {
      title: 'Friend compatibility',
      icon: '🤝',
      welcomeMessage: "Let's talk about friendships! I can help you understand your social connections and compatibility.",
      suggestions: [
        "How can I make better friends?",
        "Why do I clash with certain people?",
        "What makes a good friendship for me?",
        "How can I resolve friend conflicts?",
        "What type of people should I avoid?",
        "How to be a better friend?"
      ]
    },
    'dream-interpreter': {
      title: 'Dream interpreter',
      icon: '☁️',
      welcomeMessage: "Tell me about your dreams and I'll help you understand their cosmic meaning!",
      suggestions: [
        "I dreamed about flying, what does it mean?",
        "What does dreaming of water signify?",
        "I had a dream about my ex, meaning?",
        "Dreaming of animals - interpretation?",
        "What do recurring dreams mean?",
        "I dreamed about death, should I worry?"
      ]
    },
    'astrological-events': {
      title: 'Astrological events',
      icon: '⭐',
      welcomeMessage: "Let's explore current astrological events and how they affect you personally!",
      suggestions: [
        "How does the full moon affect me?",
        "What's happening astrologically this month?",
        "How do eclipses impact my life?",
        "When is the next Mercury retrograde?",
        "What planetary transits affect me?",
        "Best times for new beginnings?"
      ]
    },
    'tarot-interpreter': {
      title: 'Tarot card interpreter',
      icon: '☀️',
      welcomeMessage: "I can help interpret tarot cards and provide cosmic guidance through the cards!",
      suggestions: [
        "What does The Fool card mean?",
        "Interpret a 3-card spread for me",
        "What's my card of the day?",
        "Meaning of The Tower card?",
        "How to read tarot for love?",
        "What do court cards represent?"
      ]
    }
  };

  const config = categoryConfig[category] || categoryConfig['ask-anything'];

  // Helper function to get zodiac sign
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

  // Track initial viewport height
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    
    return () => window.removeEventListener('resize', updateViewportHeight);
  }, []);

  // Keyboard visibility detection
  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = viewportHeight - currentHeight;
      
      // If height decreased by more than 150px, assume keyboard is visible
      if (heightDifference > 150) {
        setIsKeyboardVisible(true);
      } else {
        setIsKeyboardVisible(false);
      }
    };

    const handleFocus = () => {
      setIsKeyboardVisible(true);
      // Small delay to ensure keyboard is fully shown before scrolling
      setTimeout(() => {
        scrollToBottom();
      }, 300);
    };

    const handleBlur = () => {
      setIsKeyboardVisible(false);
    };

    window.addEventListener('resize', handleResize);
    if (inputRef.current) {
      inputRef.current.addEventListener('focus', handleFocus);
      inputRef.current.addEventListener('blur', handleBlur);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (inputRef.current) {
        inputRef.current.removeEventListener('focus', handleFocus);
        inputRef.current.removeEventListener('blur', handleBlur);
      }
    };
  }, [viewportHeight]);

  useEffect(() => {
    // Load any existing conversation for this category
    const conversationKey = `lunatica_chat_${category}_${user.uid}`;
    const savedConversation = sessionStorage.getItem(conversationKey);
    
    if (savedConversation) {
      const parsed = JSON.parse(savedConversation);
      setMessages(parsed);
      // Only hide suggestions if there are user messages (actual conversation)
      const hasUserMessages = parsed.some(msg => msg.type === 'user');
      if (!hasUserMessages) {
        setSuggestions(config.suggestions);
      }
    } else {
      // Add welcome message for new conversation
      const welcomeMessage = {
        sender: "Lunatica",
        content: config.welcomeMessage,
        type: 'bot',
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
      setSuggestions(config.suggestions);
      
      // Save the initial message
      sessionStorage.setItem(conversationKey, JSON.stringify([welcomeMessage]));
    }
  }, [category, user.uid]);

  useEffect(() => {
    scrollToBottom();
    
    // Save conversation to sessionStorage whenever messages change
    if (messages.length > 0) {
      const conversationKey = `lunatica_chat_${category}_${user.uid}`;
      sessionStorage.setItem(conversationKey, JSON.stringify(messages));
    }
  }, [messages, category, user.uid]);

  // Auto-scroll when new messages are added
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100); // Small delay to ensure DOM is updated

    return () => clearTimeout(timer);
  }, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  };

  const addMessage = (sender, content, type = 'user') => {
    const newMessage = { sender, content, type, timestamp: Date.now() };
    setMessages(prev => [...prev, newMessage]);
    
    // Force scroll after state update
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  const generateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    try {
      // Get conversation history (excluding the current user message)
      const conversationHistory = messages.filter(msg => msg.type !== 'welcome').map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Call the actual Gemini API with full context
      const response = await generateChatResponse({
        category,
        userMessage,
        userData,
        conversationHistory
      });
      
      addMessage("Lunatica", response, 'bot');
      
    } catch (err) {
      console.error('Error generating AI response:', err);
      addMessage("Lunatica", "I'm having trouble connecting to the cosmic realm right now. Please try asking again in a moment! ✨", 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage("You", userMessage, 'user');
    setInputValue('');
    // Don't clear suggestions - keep them visible

    // Scroll after user message
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    await generateAIResponse(userMessage);
    
    // Scroll after AI response
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const handleSuggestionClick = (suggestion) => {
    addMessage("You", suggestion, 'user');
    // Don't clear suggestions - keep them available for more questions
    
    // Scroll after suggestion click
    setTimeout(() => {
      scrollToBottom();
      generateAIResponse(suggestion);
    }, 100);
  };

  const clearConversation = () => {
    const conversationKey = `lunatica_chat_${category}_${user.uid}`;
    sessionStorage.removeItem(conversationKey);
    
    // Reset to welcome message
    const welcomeMessage = {
      sender: "Lunatica",
      content: config.welcomeMessage,
      type: 'bot',
      timestamp: Date.now()
    };
    setMessages([welcomeMessage]);
    setSuggestions(config.suggestions); // Show suggestions again
    sessionStorage.setItem(conversationKey, JSON.stringify([welcomeMessage]));
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Header - Enhanced for mobile */}
      <div className="border-b border-gray-800 p-3 sm:p-4 flex-shrink-0 safe-area-top">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button 
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 touch-manipulation active:scale-95 rounded-lg hover:bg-gray-800"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center space-x-2 min-w-0 flex-1 justify-center">
            <span className="text-lg sm:text-xl">{config.icon}</span>
            <h1 className="text-base sm:text-lg font-semibold truncate">{config.title}</h1>
          </div>
          <button
            onClick={clearConversation}
            className="text-gray-400 hover:text-white transition-colors p-2 -mr-2 touch-manipulation active:scale-95 rounded-lg hover:bg-gray-800"
            title="Clear conversation"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages - Enhanced mobile layout */}
      <div 
        className={`flex-1 p-3 sm:p-4 max-w-lg mx-auto w-full overflow-y-auto scroll-smooth ${isKeyboardVisible ? 'pb-2' : 'pb-4'}`} 
        style={{ 
          WebkitOverflowScrolling: 'touch',
          height: isKeyboardVisible ? 'calc(100vh - 140px)' : 'auto'
        }}
      >
        {/* Personalization indicator - Mobile optimized */}
        {userData?.name && (
          <div className="mb-3 sm:mb-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-purple-900/30 border border-purple-700/50 rounded-full px-3 py-1.5 text-xs text-purple-300">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="truncate max-w-48">Personalized for {userData.name} • {userData.dateOfBirth ? getZodiacSign(userData.dateOfBirth) : 'Unknown sign'}</span>
            </div>
          </div>
        )}
        
        <div className="space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
              <div className={`max-w-[85%] sm:max-w-[280px] px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl whitespace-pre-line ${
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
              <div className="bg-gray-800 text-white max-w-[85%] sm:max-w-[280px] px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl">
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
        <div ref={messagesEndRef} className="h-2 sm:h-4" />
      </div>

      {/* Suggestions - Enhanced mobile scrolling - Hide when keyboard is visible */}
      {suggestions && suggestions.length > 0 && !isKeyboardVisible && (
        <div className="bg-black/40 backdrop-blur-sm border-t border-gray-700/30 py-2.5 sm:py-3 flex-shrink-0">
          <div className="w-full">
            <div className="relative px-3 sm:px-4">
              <div 
                className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-3 sm:-mx-4 px-3 sm:px-4"
                style={{
                  scrollBehavior: 'smooth',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex-shrink-0 w-44 sm:w-48 text-left p-2.5 sm:p-3 bg-gray-800/70 hover:bg-purple-800/80 active:bg-purple-700/80 backdrop-blur-sm rounded-xl border border-gray-600/50 hover:border-purple-400/70 active:border-purple-300/70 transition-all duration-200 text-xs sm:text-sm text-gray-200 hover:text-white active:text-white shadow-lg touch-manipulation active:scale-95"
                  >
                    <div className="truncate font-medium leading-tight" title={suggestion}>
                      {suggestion}
                    </div>
                  </button>
                ))}
                {/* Add extra spacing at the end */}
                <div className="flex-shrink-0 w-3 sm:w-4"></div>
              </div>
              {/* Scroll indicator - Enhanced for mobile */}
              {suggestions.length > 2 && (
                <div className="absolute right-3 sm:right-4 top-0 bottom-2 w-6 sm:w-8 bg-gradient-to-l from-black/40 via-black/20 to-transparent pointer-events-none flex items-center justify-end pr-1 sm:pr-2">
                  <div className="text-purple-400/80 text-xs sm:text-sm font-bold animate-pulse">→</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Input Area - Enhanced for mobile browsers */}
      <div className="bg-black border-t border-gray-800 flex-shrink-0 safe-area-bottom">
        <div className="p-3 sm:p-4 pb-safe">
          <div className="max-w-lg mx-auto">
            <div className="flex space-x-2 sm:space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-800 text-white rounded-full px-4 py-3 sm:py-3.5 border border-gray-700 focus:border-purple-600 focus:outline-none disabled:opacity-50 text-sm sm:text-base touch-manipulation"
                disabled={isTyping}
                autoComplete="off"
                autoCapitalize="sentences"
                autoCorrect="on"
                spellCheck="true"
              />
              <button
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isTyping}
                className="bg-white text-black px-4 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 touch-manipulation active:scale-95 min-w-[52px] flex items-center justify-center"
              >
                {isTyping ? (
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black"></div>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}