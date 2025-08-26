import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useState } from 'react';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

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
      title: "Romantic Compatibility",
      description: "Discover your perfect match through cosmic alignment and deep soul connection",
      premium: "Advanced Matching"
    },
    {
      icon: "☁️",
      title: "Dream Interpreter",
      description: "Unlock the hidden meanings in your subconscious mind's nightly journeys",
      premium: "Deep Dream Analysis"
    },
    {
      icon: "📚",
      title: "Career Guidance",
      description: "Navigate your professional destiny with personalized cosmic insights",
      premium: "Executive Coaching"
    },
    {
      icon: "⚡",
      title: "Life Consulting",
      description: "Transform challenges into opportunities with ancient wisdom and modern understanding",
      premium: "24/7 Premium Support"
    }
  ];

  const StarLogo = ({ className = "w-8 h-8" }) => (
    <img 
      src="/assets/ask-logo.png" 
      alt="Ask the Stars Logo" 
      className={`${className} object-contain`}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden">
      {/* Premium Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-red-500/10 via-orange-500/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-orange-500/8 via-red-500/4 to-transparent blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-radial from-orange-400/6 to-transparent blur-3xl"></div>
      </div>

      {/* Floating Premium Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-float shadow-lg shadow-orange-500/50`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 flex justify-center items-center px-6 sm:px-12 py-6">
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 sm:px-12 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <div className="mb-8">
              {/* Large Logo */}
              <div className="flex justify-center mb-8">
                <StarLogo className="w-40 h-40 sm:w-56 sm:h-56" />
              </div>
              
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extralight tracking-tight mb-6">
                <span className="bg-gradient-to-r from-orange-200 via-red-300 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
                  Ask the Stars
                </span>
              </h1>
              <div className="flex justify-center items-center space-x-4 mb-8">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-orange-500"></div>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-orange-500"></div>
              </div>
            </div>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed mb-4 max-w-4xl mx-auto">
              Where Ancient Celestial Wisdom Meets
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent mb-12">
              Modern Insight
            </p>
            
            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-gray-400 text-lg leading-relaxed">
                Discover personalized cosmic guidance that speaks directly to your soul. 
                Transform your life journey with insights that bridge thousands of years of stellar wisdom and intuitive understanding.
              </p>
            </div>
          </div>

          {/* Premium Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
                <div className="relative bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 cursor-pointer group-hover:transform group-hover:scale-[1.02] shadow-xl hover:shadow-2xl hover:shadow-orange-500/10">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300">
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium CTA Section */}
          <div className="text-center">
            <div className="mb-8">
              <p className="text-gray-400 mb-4">Ready to unlock your celestial potential?</p>
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-white bg-gradient-to-r from-red-500 via-orange-500 to-red-600 hover:from-red-400 hover:via-orange-400 hover:to-red-500 rounded-2xl transition-all duration-500 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:transform-none min-w-[280px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative flex items-center space-x-3">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Connecting to the Stars...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Begin Your Stellar Journey</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </div>


          </div>
        </div>
      </div>

      {/* Footer Tagline */}
      <footer className="relative z-10 text-center pb-12">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-light mb-4">
            <span className="bg-gradient-to-r from-orange-300 via-red-400 to-orange-500 bg-clip-text text-transparent">
              Ask the Stars
            </span>
            <span className="text-gray-300"> is designed to change your destiny.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Join thousands who've aligned their lives with the cosmos.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}