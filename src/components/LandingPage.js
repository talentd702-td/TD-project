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

  const testimonials = [
    {
      name: "Sarah M.",
      location: "California, USA",
      text: "I met my husband 3 months after getting my soulmate reading! The description was so accurate it gave me chills.",
      rating: 5,
      image: "👩‍🦰"
    },
    {
      name: "Raj K.",
      location: "Mumbai, India",
      text: "The AI-generated portrait looked exactly like my girlfriend I met 6 months later. This app is magical!",
      rating: 5,
      image: "👨‍💼"
    },
    {
      name: "Emma L.",
      location: "London, UK",
      text: "Finally found love after understanding what to look for. The timing predictions were spot on!",
      rating: 5,
      image: "👩‍🎨"
    }
  ];

  const features = [
    {
      icon: "🔮",
      title: "Ancient Vedic Wisdom",
      description: "Based on 5000+ years of astrological knowledge combined with modern AI"
    },
    {
      icon: "🎨",
      title: "Visual Soulmate Portrait",
      description: "See exactly how your life partner will look with our AI-generated sketch"
    },
    {
      icon: "📅",
      title: "Perfect Timing",
      description: "Know when and where you'll meet your destined partner"
    },
    {
      icon: "💝",
      title: "Personality Match",
      description: "Understand their traits, compatibility, and how you complement each other"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">✨</div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                SoulMate AI
              </h1>
            </div>
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? 'Signing In...' : 'Get Started Free'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-yellow-100/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full px-6 py-2">
              <span className="text-orange-600 font-medium">✨ Over 50,000+ soulmates found</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Your 
              <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent"> Destined </span>
              Life Partner
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Using ancient Vedic astrology and cutting-edge AI, we reveal exactly what your soulmate looks like, 
              their personality, and when you'll meet them. Join thousands who found love through cosmic guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="group bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>{isLoading ? 'Connecting...' : 'Start Your Journey'}</span>
              </button>
              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <span>🔒 100% Free & Secure</span>
                <span>•</span>
                <span>⚡ Results in 2 minutes</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white text-xs">S</div>
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white text-xs">R</div>
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white text-xs">E</div>
                </div>
                <span>Join 50,000+ happy souls</span>
              </div>
              <div className="flex items-center space-x-1">
                {'⭐'.repeat(5)}
                <span>4.9/5 rating (2,847 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ancient wisdom meets modern technology in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Your Birth Details</h3>
              <p className="text-gray-600">Provide your name, birth date, time, and location for precise astrological calculations</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl">🔮</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Analyzes Your Stars</h3>
              <p className="text-gray-600">Our advanced AI combines Vedic astrology with cosmic patterns to reveal your soulmate</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-3xl">💕</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Meet Your Destiny</h3>
              <p className="text-gray-600">Get detailed insights, visual portrait, and timing predictions for your perfect match</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-orange-50/50 to-yellow-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You'll Discover
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive insights about your destined life partner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-orange-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Love Stories That Started Here
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real people who found their soulmates through cosmic guidance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-b from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100">
                <div className="flex items-center mb-4">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Your Soulmate is Waiting
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't let destiny wait. Discover your perfect match today and start your love story.
          </p>
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="bg-white text-orange-600 hover:text-orange-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center space-x-2"
          >
            <span>{isLoading ? 'Getting Started...' : 'Find My Soulmate Now'}</span>
            <span>→</span>
          </button>
          <div className="mt-4 text-white/80 text-sm">
            Free • No credit card required • Instant results
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-2xl">✨</div>
              <h3 className="text-xl font-bold">SoulMate AI</h3>
            </div>
            <p className="text-gray-400 mb-6">Connecting hearts through cosmic wisdom</p>
            <div className="text-sm text-gray-500">
              © 2024 SoulMate AI. Made with 💫 for love seekers worldwide.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}