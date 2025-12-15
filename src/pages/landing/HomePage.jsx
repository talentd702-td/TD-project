import React, { useState } from 'react';
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

  {/* UPDATED: Overlay for grid-dot effect ONLY */}
  <div
    className="absolute inset-0 z-5"
    style={{
      // This creates the grid-like dot effect without any blur or color tint.
      // The dots are slightly more opaque for better visibility.
      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0)',
      backgroundSize: '25px 25px',
    }}
  />

  {/* Hero content */}
  <div className="relative z-10 text-center w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen py-12 sm:py-16">
    <div className="mb-6 sm:mb-8">
      {/* Assuming TrustElements is a valid component */}
      {/* <TrustElements /> */}
    </div>

    <h1 className="w-full text-white leading-tight tracking-tight mb-4 sm:mb-6 px-2 sm:px-4 text-center">
      <span className="block font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="text-[#003566]">Talent</span>{' '}
        <span className="text-[#FF4500]">Discovered</span>
      </span>
      <span
        className="block font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 sm:mt-4"
        style={{ color: '#FFFFFF' }}
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
        className="border-2 border-white bg-white/10 hover:bg-white text-white hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
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
            <p className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2">Successful Placements</p>
            <p className="text-white text-sm opacity-75">Niche specialists & senior leadership</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
              <Briefcase className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#FF4500' }} />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Well-established Insurance</h3>
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
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Experts-led</h3>
            <p className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2">Insurance Firm</p>
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
                    Over 20 years of specialized recruitment across Insurance and allied sectors.
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
                    Preferred recruitment ally for leading Insurance institutions.
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
    {/* Leadership Team Section */}
    {/* Meet Our Leadership Section - Completely Reimagined */}
   {/* Meet Our Leadership Section - United Presentation */}
   <section className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #000814 0%, #001d3d 50%, #003566 100%)' }}></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, #FF4500 0%, transparent 70%)' }}></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, #003566 0%, transparent 70%)', animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Grand Header */}
        <div className="text-center mb-16 sm:mb-20">
          {/* Pre-title badge */}
         
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight px-2">
            Meet the Leaders Behind <br />
            <span style={{ color: '#FF4500' }}>Talent Discoveri</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-500"></div>
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-orange-500"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto px-2 leading-relaxed font-light">
            Two extraordinary leaders united by a singular vision: transforming careers, 
            building institutions, and redefining excellence in talent consulting
          </p>
        </div>

        {/* Unified Leadership Cards - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          
          {/* Abhishek Sharma */}
          <div className="relative group">
            {/* Card Container */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/20">
              
              {/* Decorative gradient top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600"></div>

              {/* Content */}
              <div className="p-8 sm:p-10">
                
                {/* Photo Section */}
                <div className="relative mb-8">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
                    {/* Gradient ring */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                    
                    {/* Photo */}
                    <div className="relative bg-gray-900 rounded-full overflow-hidden w-full h-full shadow-2xl">
                      <img 
                        src="./abhi.png" 
                        alt="Abhishek Sharma"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    
                  </div>
                </div>

                {/* Name & Title */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                    Abhishek Sharma
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-orange-500" />
                    <p>PGDIRM • B.Com (H), Delhi University</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-transparent mx-auto mb-6"></div>

                {/* Bio */}
                <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Abhishek brings a mature and multidimensional view to human-capital consulting, built on deep experience across the people spectrum. His expertise extends far beyond recruitment—allowing him to evaluate leadership capability, organisational alignment, and long-term talent strategy with clarity and precision.
                  </p>
                  
                  <p>
                    While senior leadership hiring remains a defining strength, his exposure to talent management, compensation and benefits, and training and development equips him with a 360° understanding of how organisations build, develop, and sustain high-performing teams. Abhishek's approach is holistic, insight-driven, and rooted in long-term impact, enabling him to support clients in shaping talent structures that drive enduring organisational success.
                  </p>

                  {/* Quote */}
                  <div className="relative pl-4 border-l-3 border-orange-500 bg-orange-500/5 rounded-r-lg py-3 pr-4 mt-6">
                    <p className="text-white font-semibold italic text-sm">
                      "Uniting vision with integrity—transforming human potential into lasting organisational success."
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <span>Leadership Hiring</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <span>Strategic Advisory</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <span>Human-Capital Consulting</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <span>Risk Management</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <span>Industry Expertise</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Krunal B. Kumar */}
          <div className="relative group">
            {/* Card Container */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl hover:shadow-blue-500/20">
              
              {/* Decorative gradient top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700"></div>

              {/* Content */}
              <div className="p-8 sm:p-10">
                
                {/* Photo Section */}
                <div className="relative mb-8">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
                    {/* Gradient ring */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    
                    {/* Photo */}
                    <div className="relative bg-gray-900 rounded-full overflow-hidden w-full h-full shadow-2xl">
                      <img 
                        src="./krunal.png" 
                        alt="Krunal B. Kumar"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    
                  </div>
                </div>

                {/* Name & Title */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                    Krunal B. Kumar
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <p>Virginia Tech • NMIMS</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-transparent mx-auto mb-6"></div>

                {/* Bio */}
                <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Krunal brings a globally informed and strategically grounded approach to people transformation. Her expertise spans talent architecture, culture building, and organisational evolution—enabling companies to translate ambition into reality through their people.
                  </p>
                  
                  <p>
                    With a strong blend of analytical insight and human-centric leadership, she designs people systems that unlock capability, strengthen culture, and drive sustainable performance. Her exposure across diverse environments gives her a nuanced understanding of how organisations adapt, grow, and maintain long-term impact.
                  </p>

                  {/* Quote */}
                  <div className="relative pl-4 border-l-3 border-blue-600 bg-blue-600/5 rounded-r-lg py-3 pr-4 mt-6">
                    <p className="text-white font-semibold italic text-sm">
                      "Discovering talent, elevating people, and enabling organisations to evolve with purpose and clarity."
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      <span>Talent Architecture</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      <span>Culture Transformation</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      <span>People Strategy</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      <span>Global Expertise</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      <span>Strategic Leadership</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Partnership Statement - Connecting Element */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 w-px h-12 bg-gradient-to-b from-transparent to-orange-500 hidden lg:block"></div>
          
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-purple-600/10 to-blue-600/20"></div>
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>

           
          </div>
        </div>

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
