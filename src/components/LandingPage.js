import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useState } from 'react';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const services = [
    {
      icon: "💕",
      title: "Romantic compatibility",
      description: "Discover your perfect match through cosmic alignment",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      icon: "☁️",
      title: "Dream interpreter",
      description: "Unlock the hidden meanings in your dreams",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "📚",
      title: "Career help",
      description: "Find your true calling and professional path",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: "⚡",
      title: "Conflict advice",
      description: "Navigate life's challenges with cosmic wisdom",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-300 opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white rounded-full animate-pulse delay-700 opacity-50"></div>
        <div className="absolute bottom-60 right-10 w-1 h-1 bg-white rounded-full animate-pulse delay-1000 opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-500 opacity-40"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-200 opacity-60"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Spacer */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-8 sm:mb-12">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-light tracking-wider mb-4 sm:mb-6">
                Lunatica
              </h1>
              <div className="flex justify-center space-x-2 mb-6 sm:mb-8">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-black rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 hover:bg-gray-800 transition-all duration-300 border border-gray-800 hover:border-gray-700">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-lg sm:text-xl">{service.icon}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none flex items-center space-x-2 sm:space-x-3 mx-auto mb-4 sm:mb-6"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black"></div>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue</span>
                </>
              )}
            </button>

            {/* Terms */}
            <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              By clicking "Continue" you agree to our{' '}
              <span className="text-gray-400 underline cursor-pointer">Terms of Service</span>
              {' '}and{' '}
              <span className="text-gray-400 underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>

        {/* Bottom Section - No longer absolute */}
        <div className="px-4 pb-8 sm:pb-12">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
              Lunatica is designed to change your life.
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Turn on notifications to enable the most full app experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}