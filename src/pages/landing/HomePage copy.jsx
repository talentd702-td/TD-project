import React, { useState } from 'react';
import { TrustElements } from '../../components/landing/TrustElements';
import { GradientBars } from '../../components/landing/GradientBars';
import { TestimonialsWithNavigation } from '../../components/landing/TestimonialsWithNavigation';
import { testimonials } from '../../data/testimonials';
import { 
  Users, 
  Briefcase, 
  Globe, 
  Target, 
  Shield, 
  TrendingUp, 
  Award,
  CheckCircle,
  Play 
} from 'lucide-react';

export const HomePage = ({ onNavigate }) => {
  const [isVideo1Playing, setIsVideo1Playing] = useState(false);
  const [isVideo2Playing, setIsVideo2Playing] = useState(false);

  return (
  <>
    {/* Hero Section */}
<section className="relative min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-12 overflow-hidden">

{/* Background video */}
<video
  className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
  src="/bg_video5.mp4"
  autoPlay
  muted
  loop
  playsInline
/>



{/* Hero content */}
<div className="relative z-10 text-center w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen py-12 sm:py-16">
  <div className="mb-6 sm:mb-8">
    <TrustElements />
  </div>

  <h1 className="w-full text-white leading-tight tracking-tight mb-4 sm:mb-6 px-2 sm:px-4">
    <span className="block font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
      Talent Discovered.
    </span>
    <span
      className="block font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 sm:mt-4"
      style={{ color: '#FF4500' }}
    >
      Where potential meets opportunity.
    </span>
  </h1>

  
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2 sm:px-4 w-full sm:w-auto">
    <button
      onClick={() => onNavigate('jobs')}
      className="bg-white hover:bg-gray-100 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
    >
      Search Jobs
    </button>
    <button
      onClick={() => onNavigate('contact')}
      className="border-2 border-white hover:bg-white text-white hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
      style={{ borderColor: '#FF4500', color: '#FF4500' }}
    >
      Partner With Us
    </button>
  </div>
</div>
</section>

    {/* Stats Section */}
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #001122 0%, #003566 50%, #001122 100%)' }}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FF4500 0%, transparent 70%)' }}></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FF4500 0%, transparent 70%)' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Building Trust Through <span style={{ color: '#FF4500' }}>Transparency & Impact</span>
          </h2>
         
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
              <Users className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#FF4500' }} />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">1000+</h3>
            <p className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2">Candidates in Network</p>
            <p className="text-white text-sm opacity-75">Niche specialists & senior leadership</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
              <Briefcase className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#FF4500' }} />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Diverse</h3>
            <p className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2">Client Portfolio</p>
            <p className="text-white text-sm opacity-75">Insurance & financial services leaders</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
              <Globe className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#FF4500' }} />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">International</h3>
            <p className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2">Mandate Experience</p>
            <p className="text-white text-sm opacity-75">Cross-border talent solutions</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
              <Award className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#FF4500' }} />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Woman-led</h3>
            <p className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2">BFSI Firm</p>
            <p className="text-white text-sm opacity-75">Pioneering ethos in India</p>
          </div>
        </div>
      </div>
    </section>

    {/* Why Work With Us Video Section */}
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #003566 0%, transparent 70%)' }}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-5 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #FF4500 0%, transparent 70%)' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2" style={{ color: '#003566' }}>
          The Spirit of <span style={{ color: '#FF4500' }}>Talent Discoveri</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#FF4500' }}></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2 leading-relaxed">
            Discover what sets us apart and why leading organizations trust Talent Discoveri for their most critical hiring needs
          </p>
        </div>

        {/* Video Container */}
        <div className="relative group">
          {/* Decorative frame */}
          <div className="absolute -inset-4 rounded-3xl opacity-50 blur-xl transition-all duration-300 group-hover:opacity-75" style={{ background: 'linear-gradient(135deg, #003566 0%, #FF4500 100%)' }}></div>
          
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            {/* 16:9 Aspect Ratio Container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <video 
                className="absolute top-0 left-0 w-full h-full object-cover"
                controls
                preload="metadata"
                onPlay={() => setIsVideo1Playing(true)}
                onPause={() => setIsVideo1Playing(false)}
                onEnded={() => setIsVideo1Playing(false)}
              >
                <source src="./work.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play button overlay (shown only when video is not playing) */}
              {!isVideo1Playing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 69, 0, 0.9)' }}>
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 rounded-tl-2xl" style={{ borderColor: '#003566' }}></div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 rounded-br-2xl" style={{ borderColor: '#FF4500' }}></div>
        </div>

        {/* Supporting text */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 leading-relaxed">
            Hear directly from our team about our commitment to excellence, integrity, and building lasting partnerships that drive success
          </p>
        </div>
      </div>
    </section>


    {/* Why Choose Talent Discoveri - Merged Section */}
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}></div>
      
      {/* Decorative gradient background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full" style={{ background: 'radial-gradient(circle, #003566 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full" style={{ background: 'radial-gradient(circle, #FF4500 0%, transparent 70%)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2 text-white">
            Why Choose <span style={{ color: '#FF4500' }}>Talent Discoveri</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#FF4500' }}></div>
          <p className="text-base sm:text-lg md:text-xl text-white opacity-90 max-w-3xl mx-auto px-2 leading-relaxed">
            We believe the right mandate can redefine a career, and the right leader can recalibrate an enterprise.
          </p>
        </div>

        {/* Top Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Card 1: Proven Expertise */}
          <div className="flash-card group relative bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border-2 border-white border-opacity-20 hover:bg-opacity-20 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="flash-overlay"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #003566 0%, #004080 100%)' }}>
                    <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">
                    Proven Expertise
                  </h3>
                  <p className="text-white text-base sm:text-lg leading-relaxed opacity-90">
                    Over 20 years of specialized recruitment across Insurance, BFSI, and allied sectors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Wide Network */}
          <div className="flash-card group relative bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border-2 border-white border-opacity-20 hover:bg-opacity-20 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="flash-overlay"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #FF4500 0%, #FF6A33 100%)' }}>
                    <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#FF4500' }}>
                    Wide Network
                  </h3>
                  <p className="text-white text-base sm:text-lg leading-relaxed opacity-90">
                    Pan-India reach with a strong and growing talent pool.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Meaningful Impact */}
          <div className="flash-card group relative bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border-2 border-white border-opacity-20 hover:bg-opacity-20 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="flash-overlay"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #003566 0%, #004080 100%)' }}>
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">
                    Meaningful Impact
                  </h3>
                  <p className="text-white text-base sm:text-lg leading-relaxed opacity-90">
                    Thousands of placements that have shaped careers and organizations alike.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - 2 Cards Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Card 4: Insight-Driven */}
          <div className="flash-card group relative bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border-2 border-white border-opacity-20 hover:bg-opacity-20 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="flash-overlay"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #FF4500 0%, #FF6A33 100%)' }}>
                    <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#FF4500' }}>
                    Insight-Driven
                  </h3>
                  <p className="text-white text-base sm:text-lg leading-relaxed opacity-90">
                    Domain knowledge and consultative hiring ensure the perfect match.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Trusted Partner */}
          <div className="flash-card group relative bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border-2 border-white border-opacity-20 hover:bg-opacity-20 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="flash-overlay"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #003566 0%, #004080 100%)' }}>
                    <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">
                    Trusted Partner
                  </h3>
                  <p className="text-white text-base sm:text-lg leading-relaxed opacity-90">
                    Preferred recruitment ally for leading BFSI institutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Animation CSS */}
      <style>{`
        .flash-card {
          position: relative;
        }
        
        .flash-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.6) 50%, 
            transparent 100%
          );
          transition: left 0.6s ease;
          pointer-events: none;
          z-index: 1;
        }
        
        .flash-card:hover .flash-overlay {
          left: 100%;
        }
      `}</style>
    </section>

    {/* Meet Our Team Section */}
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}></div>
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2 text-white">
            Meet Our <span style={{ color: '#FF4500' }}>Team</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#FF4500' }}></div>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-2">
            Dedicated professionals driving success in talent acquisition and HR excellence
          </p>
        </div>

        <TestimonialsWithNavigation testimonials={testimonials} />
      </div>
    </section>

    
    {/* Specialization Banner */}
    <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
          100% Focus on Insurance & Financial Services
        </h2>
        <p className="text-base sm:text-lg text-white opacity-90 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
          We are not generalist recruiters. We are a niche search and talent consulting partner 
          dedicated to the insurance sector—across life, health, general, and reinsurance.
        </p>
        <button 
          onClick={() => onNavigate('services')}
          className="bg-white hover:bg-gray-100 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          Explore Our Services
        </button>
      </div>
    </section>
  </>
);
};

export default HomePage;