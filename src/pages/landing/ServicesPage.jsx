import React, { useState } from 'react';
import { Search, Users, MapPin, Briefcase, Target, Award, Shield, CheckCircle, Brain, Zap } from 'lucide-react';

export const ServicesPage = ({ onNavigate }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const coreServices = [
    {
      id: 'executive-search',
      icon: Search,
      title: 'Executive Search',
      description: 'Strategic leadership acquisition for C-suite and senior management positions. We identify transformational leaders who drive organizational excellence.',
      bgColor: '#FF4500'
    },
    {
      id: 'recruitment-solutions',
      icon: Users,
      title: 'Recruitment Solutions',
      description: 'End-to-end talent acquisition across all organizational levels. From niche specialists to mid-management, we deliver candidates who excel.',
      bgColor: '#FF4500'
    },
    {
      id: 'talent-mapping',
      icon: MapPin,
      title: 'Talent Mapping & Intelligence',
      description: 'Strategic market intelligence and competitive talent landscape analysis. Understand where top talent resides and how to attract them.',
      bgColor: '#FF4500'
    },
    {
      id: 'retained-search',
      icon: Target,
      title: 'Retained Search Mandates',
      description: 'Exclusive partnerships for critical leadership positions. Dedicated focus and discretion for your most strategic hiring needs.',
      bgColor: '#FF4500'
    }
  ];

  const advisoryServices = [
    {
      id: 'workforce-insights',
      icon: Brain,
      title: 'Workforce Intelligence',
      description: 'Data-driven insights on talent availability, hiring trends, and market dynamics to inform your recruitment strategies.',
      badge: 'Advisory'
    },
    {
      id: 'compensation-benchmarking',
      icon: Briefcase,
      title: 'Compensation Benchmarking',
      description: 'Comprehensive salary and benefits analysis to ensure your compensation packages remain competitive.',
      badge: 'Consulting'
    },
    {
      id: 'talent-strategy',
      icon: Zap,
      title: 'Talent Strategy Consulting',
      description: 'Strategic guidance on workforce planning, organizational design, and talent development to build high-performing teams.',
      badge: 'Strategy'
    },
    {
      id: 'employer-branding',
      icon: Award,
      title: 'Employer Brand Advisory',
      description: 'Enhance your employer value proposition to attract and retain exceptional talent in competitive markets.',
      badge: 'Branding'
    }
  ];

  const differentiators = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Rigorous screening ensures only exceptional candidates reach your consideration'
    },
    {
      icon: Zap,
      title: 'Speed & Efficiency',
      description: 'Streamlined processes that reduce time-to-hire without compromising quality'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Expert consultants providing personalized guidance throughout'
    },
    {
      icon: CheckCircle,
      title: 'Proven Results',
      description: 'Track record of successful placements and long-term partnerships'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Our <span style={{ color: '#FF4500' }}>Services</span>
            </h2>
            <div className="w-20 h-0.5 bg-orange-400 mx-auto mb-3"></div>
            <p className="text-base md:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive talent solutions designed exclusively for the insurance and financial services sector
            </p>
          </div>

          {/* Core Recruitment Services */}
          <div className="mb-12">
            <div className="text-center mb-8">
              
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {coreServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="flash-card group bg-white/5 backdrop-blur-xl rounded-xl border-2 border-white/10 overflow-hidden hover:border-blue-400/70 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-500"
                  >
                    <div className="flash-overlay"></div>
                    <div className="relative z-10 p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(255,69,0,0.4)] group-hover:shadow-[0_0_35px_rgba(255,69,0,0.7)] transition-all duration-500"
                          style={{ background: `linear-gradient(135deg, ${service.bgColor} 0%, ${service.bgColor}dd 100%)` }}
                        >
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advisory & Consulting Services */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Advisory & <span style={{ color: '#FF4500' }}>Consulting Services</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300">
                Strategic intelligence and guidance to optimize your talent acquisition strategy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {advisoryServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="flash-card group bg-white/5 backdrop-blur-xl rounded-xl border-2 border-white/10 overflow-hidden hover:border-purple-400/70 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-500"
                  >
                    <div className="flash-overlay"></div>
                    <div className="relative z-10 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,69,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,69,0,0.6)] transition-all duration-500" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                          <IconComponent className="w-7 h-7" style={{ color: '#FF4500' }} />
                        </div>
                        <span className="px-2.5 py-1 bg-orange-500/30 backdrop-blur-sm text-orange-100 rounded-full text-xs font-semibold border border-orange-300/30 group-hover:bg-orange-500/50 group-hover:shadow-[0_0_15px_rgba(255,69,0,0.4)] transition-all duration-500">
                          {service.badge}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Choose Our Services */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Why Choose <span style={{ color: '#FF4500' }}>Our Services</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300">
                Excellence in every aspect of our engagement with you
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {differentiators.map((diff, index) => {
                const IconComponent = diff.icon;
                return (
                  <div
                    key={index}
                    className="flash-card bg-white/5 backdrop-blur-xl p-6 rounded-xl border-2 border-white/10 hover:border-blue-400/70 hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] transition-all duration-500 text-center overflow-hidden"
                  >
                    <div className="flash-overlay"></div>
                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 shadow-[0_0_20px_rgba(255,69,0,0.3)] hover:shadow-[0_0_30px_rgba(255,69,0,0.6)] transition-all duration-500" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                        <IconComponent className="w-7 h-7" style={{ color: '#FF4500' }} />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{diff.title}</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">{diff.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-blue-600/20 to-orange-500/20 backdrop-blur-xl rounded-xl p-10 border border-white/20 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
              Partner with Talent Discoveri to access specialized insurance talent expertise, comprehensive market intelligence, and dedicated support that drives lasting success.
            </p>
            <button 
              onClick={() => handleNavigation('contact')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              Schedule Consultation
            </button>
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
            rgba(255, 255, 255, 0.3) 40%,
            rgba(255, 255, 255, 0.6) 50%, 
            rgba(255, 255, 255, 0.3) 60%,
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
    </div>
  );
};

export default ServicesPage;