import React, { useState } from 'react';
import { Shield, Users, Briefcase, Target, Award, CheckCircle, Brain, Globe, Zap } from 'lucide-react';

export const SectorsPage = ({ onNavigate }) => {
  const [selectedExpertise, setSelectedExpertise] = useState('underwriting');

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const expertiseAreas = [
    {
      id: 'underwriting',
      name: 'Underwriting Excellence',
      description: 'Comprehensive talent solutions across all underwriting domains',
      details: [
        'Chief Underwriting Officers and Underwriting Heads',
        'Motor, Health, Property, Marine, Aviation & Specialty Lines experts',
        'Reinsurance Treaty and Facultative professionals',
        'Risk Assessment and Pricing Specialists',
        'Underwriting Operations and Portfolio Management teams'
      ],
      icon: Shield,
      gradient: 'from-blue-600 to-blue-700',
      bgColor: '#FF4500'
    },
    {
      id: 'claims',
      name: 'Claims & Operations',
      description: 'Specialists who streamline processes and enhance customer satisfaction',
      details: [
        'Chief Claims Officers and Claims Leadership',
        'Motor, Health, Property & Casualty Claims Managers',
        'Fraud Detection and Investigation experts',
        'Claims Operations and Service Delivery teams',
        'Third Party Administrators (TPA) professionals'
      ],
      icon: CheckCircle,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: '#FF4500'
    },
    {
      id: 'actuarial',
      name: 'Actuarial & Risk',
      description: 'Top-tier professionals who drive financial stability and innovation',
      details: [
        'Appointed Actuaries and Chief Actuarial Officers',
        'Pricing Actuaries for Life, Health & General Insurance',
        'Valuation and Reserving experts',
        'Risk Management and ERM professionals'
       ],
      icon: Brain,
      gradient: 'from-blue-600 to-blue-700',
      bgColor: '#FF4500'
    },
    {
      id: 'distribution',
      name: 'Distribution & Broking',
      description: 'Revenue-generating talent across traditional and emerging channels',
      details: [
        'Chief Distribution Officers and Sales Leadership',
        'Agency, Bancassurance & Corporate Partnerships heads',
        'Direct and Digital Channel experts',
        'Insurance Broking professionals across Retail & Corporate',
        'Reinsurance Broking specialists'
      ],
      icon: Users,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: '#FF4500'
    },
    {
      id: 'technology',
      name: 'Technology & Innovation',
      description: 'Forward-thinking leaders transforming insurance through digital capabilities',
      details: [
        'Chief Technology Officers and IT Leadership',
        'Core Insurance Platform Implementation experts',
        'Data Science, AI/ML and Analytics professionals',
        'Digital Transformation and Innovation leaders',
        'Product Development and InsurTech specialists'
      ],
      icon: Zap,
      gradient: 'from-blue-600 to-blue-700',
      bgColor: '#FF4500'
    },
    {
      id: 'leadership',
      name: 'Executive Leadership',
      description: 'C-suite and board-level talent driving organizational transformation',
      details: [
        'CEOs, Managing Directors & Country Heads',
        'Chief Financial Officers and Finance Leadership',
        'Chief Risk Officers and Compliance Heads',
        'Chief Marketing Officers and Brand Leaders',
        'Board Members and Independent Directors'
      ],
      icon: Award,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: '#FF4500'
    }
  ];

  const differentiators = [
    {
      icon: Target,
      title: 'Niche Focus',
      description: 'Exclusive dedication to insurance and financial services talent acquisition'
    },
    {
      icon: Globe,
      title: 'Deep Industry Network',
      description: 'Direct access to exceptional professionals across the entire ecosystem'
    },
    {
      icon: CheckCircle,
      title: 'Market Intelligence',
      description: 'Strategic insights on compensation trends, competitor movements, and emerging roles'
    },
    {
      icon: Zap,
      title: 'Speed with Accuracy',
      description: 'Customized search methodology that delivers optimal candidates efficiently'
    },
    {
      icon: Shield,
      title: 'Trusted Partnership',
      description: 'Preferred advisor to leading insurers, brokers, and reinsurers across India and beyond'
    }
  ];

  const selectedArea = expertiseAreas.find(area => area.id === selectedExpertise);

  return (
    <>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll-fast {
          animation: scroll 8s linear infinite;
        }
        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Mission Statement - Updated */}
          <div className="mb-16 relative overflow-hidden rounded-2xl">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-gray-900/60 to-blue-950/40 backdrop-blur-sm"></div>
            
            {/* Optional: Add your custom background image here */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            
            {/* Decorative overlay pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 69, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 53, 102, 0.1) 0%, transparent 50%)'
            }}></div>
            
            <div className="max-w-5xl mx-auto relative z-10 py-16 px-8">
              {/* Decorative top line */}
              <div className="flex items-center justify-center mb-8">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-500"></div>
                <div className="w-2 h-2 rounded-full bg-orange-500 mx-3"></div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-orange-500"></div>
              </div>

              <div className="text-center space-y-6">
                <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide uppercase">
                  Not Generalist Recruiters
                </p>
                
                <div className="relative py-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    We are a{' '}
                    <span style={{ color: '#FF4500' }}>
                      boutique talent consulting partner
                    </span>
                  </h1>
                </div>
                
                <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300 italic font-light leading-relaxed pt-2">
                  Dedicated exclusively to the BFSI and insurance sector
                </p>
              </div>

              {/* Decorative bottom line */}
              <div className="flex items-center justify-center mt-8">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 mx-3"></div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-500"></div>
              </div>
            </div>
          </div>

          {/* Core Expertise - New Layout Matching Reference Image */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Our <span style={{ color: '#FF4500' }}>Core Expertise</span>
              </h2>
              <div className="w-20 h-0.5 bg-orange-400 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
              {/* Left Side - Expertise List */}
              <div className="lg:col-span-5 space-y-3">
                {expertiseAreas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedExpertise(area.id)}
                    className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 ${
                      selectedExpertise === area.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-xl shadow-orange-500/30'
                        : 'bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-orange-400/50'
                    }`}
                  >
                    <div className="text-lg">
                      {area.name}
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Side - Selected Expertise Description */}
              <div className="lg:col-span-7">
                {selectedArea && (
                  <div className="bg-gradient-to-br from-blue-600/20 to-orange-500/20 backdrop-blur-xl rounded-xl p-8 border border-white/20 shadow-2xl h-full">
                    <div className="flex flex-col h-full">
                      <div
                        className="w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${selectedArea.bgColor} 0%, ${selectedArea.bgColor}dd 100%)` }}
                      >
                        {React.createElement(selectedArea.icon, { className: 'w-10 h-10 text-white' })}
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {selectedArea.name}
                      </h3>
                      
                      <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        {selectedArea.description}
                      </p>
                      
                      {/* Detailed content */}
                      <div className="space-y-3 flex-grow">
                        {selectedArea.details.map((detail, index) => (
                          <div key={index} className="flex items-start gap-3 group">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-orange-500 group-hover:scale-125 transition-transform duration-300"></div>
                            <p className="text-base text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Differentiators */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                What Sets Us <span style={{ color: '#FF4500' }}>Apart</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300">
                Five pillars that define our approach to insurance talent acquisition
              </p>
            </div>

            {/* Scrolling container with enhanced design */}
            <div className="relative overflow-hidden py-8">
              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
              
              {/* Scrolling content - Fast */}
              <div className="flex animate-scroll-fast gap-6">
                {/* First set of items */}
                {differentiators.map((diff, index) => {
                  const IconComponent = diff.icon;
                  return (
                    <div
                      key={`first-${index}`}
                      className="flex-shrink-0"
                    >
                      <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl px-10 py-5 rounded-full border-2 border-white/20 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-500 flex items-center gap-4 whitespace-nowrap overflow-hidden">
                        {/* Animated background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                        
                        <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full shadow-xl group-hover:scale-110 transition-transform duration-300" style={{ 
                          background: 'linear-gradient(135deg, #FF4500 0%, #FF6347 100%)',
                          boxShadow: '0 4px 20px rgba(255, 69, 0, 0.3)'
                        }}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white relative z-10 group-hover:text-orange-300 transition-colors duration-300">{diff.title}</span>
                      </div>
                    </div>
                  );
                })}
                {/* Second set for seamless loop */}
                {differentiators.map((diff, index) => {
                  const IconComponent = diff.icon;
                  return (
                    <div
                      key={`second-${index}`}
                      className="flex-shrink-0"
                    >
                      <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl px-10 py-5 rounded-full border-2 border-white/20 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-500 flex items-center gap-4 whitespace-nowrap overflow-hidden">
                        {/* Animated background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                        
                        <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full shadow-xl group-hover:scale-110 transition-transform duration-300" style={{ 
                          background: 'linear-gradient(135deg, #FF4500 0%, #FF6347 100%)',
                          boxShadow: '0 4px 20px rgba(255, 69, 0, 0.3)'
                        }}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white relative z-10 group-hover:text-orange-300 transition-colors duration-300">{diff.title}</span>
                      </div>
                    </div>
                  );
                })}
                {/* Third set for extra smooth infinite loop */}
                {differentiators.map((diff, index) => {
                  const IconComponent = diff.icon;
                  return (
                    <div
                      key={`third-${index}`}
                      className="flex-shrink-0"
                    >
                      <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl px-10 py-5 rounded-full border-2 border-white/20 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-500 flex items-center gap-4 whitespace-nowrap overflow-hidden">
                        {/* Animated background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                        
                        <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full shadow-xl group-hover:scale-110 transition-transform duration-300" style={{ 
                          background: 'linear-gradient(135deg, #FF4500 0%, #FF6347 100%)',
                          boxShadow: '0 4px 20px rgba(255, 69, 0, 0.3)'
                        }}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white relative z-10 group-hover:text-orange-300 transition-colors duration-300">{diff.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Track Record */}
          <div className="bg-gradient-to-br from-blue-600/20 to-orange-500/20 backdrop-blur-xl rounded-xl p-8 border border-white/20 shadow-2xl mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Proven <span style={{ color: '#FF4500' }}>Track Record</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300">
                Success stories that define our expertise
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <CheckCircle className="w-8 h-8 mb-4" style={{ color: '#FF4500' }} />
                <p className="text-base text-white font-semibold mb-2">Appointed Actuaries</p>
                <p className="text-sm text-gray-300">Successfully placed with leading global insurers</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <CheckCircle className="w-8 h-8 mb-4" style={{ color: '#FF4500' }} />
                <p className="text-base text-white font-semibold mb-2">Complete Team Builds</p>
                <p className="text-sm text-gray-300">Built underwriting and claims teams for emerging insurers</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <CheckCircle className="w-8 h-8 mb-4" style={{ color: '#FF4500' }} />
                <p className="text-base text-white font-semibold mb-2">Leadership Placements</p>
                <p className="text-sm text-gray-300">Supported brokers and reinsurers with C-suite appointments</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <CheckCircle className="w-8 h-8 mb-4" style={{ color: '#FF4500' }} />
                <p className="text-base text-white font-semibold mb-2">InsurTech Scaling</p>
                <p className="text-sm text-gray-300">Helped innovation teams scale technology and product capabilities</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/5 backdrop-blur-xl rounded-xl p-10 border border-white/10 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Partner With Us
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
              In a talent market as specialized as insurance, the wrong hire can be costly. With Talent Discoveri as your search partner, you gain access to <span className="font-semibold" style={{ color: '#FF4500' }}>specialized expertise, deep networks, and strategic insights</span>—ensuring you hire not just for today's needs, but for tomorrow's growth.
            </p>
            <button 
              onClick={() => handleNavigation('contact')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Search
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default SectorsPage;