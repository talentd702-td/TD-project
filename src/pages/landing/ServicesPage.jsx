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
      features: [
        'Confidential search methodology',
        'Comprehensive market mapping',
        'Leadership competency assessment',
        'Cultural alignment evaluation'
      ],
      bgColor: '#003566'
    },
    {
      id: 'recruitment-solutions',
      icon: Users,
      title: 'Recruitment Solutions',
      description: 'End-to-end talent acquisition across all organizational levels. From niche specialists to mid-management, we deliver candidates who excel.',
      features: [
        'Full-cycle recruitment process',
        'Technical & behavioral evaluation',
        'Compensation negotiation support',
        'Onboarding facilitation'
      ],
      bgColor: '#FF4500'
    },
    {
      id: 'talent-mapping',
      icon: MapPin,
      title: 'Talent Mapping & Intelligence',
      description: 'Strategic market intelligence and competitive talent landscape analysis. Understand where top talent resides and how to attract them.',
      features: [
        'Competitive talent analysis',
        'Market availability assessment',
        'Organization benchmarking',
        'Succession planning support'
      ],
      bgColor: '#003566'
    },
    {
      id: 'retained-search',
      icon: Target,
      title: 'Retained Search Mandates',
      description: 'Exclusive partnerships for critical leadership positions. Dedicated focus and discretion for your most strategic hiring needs.',
      features: [
        'Exclusive engagement model',
        'Dedicated search consultant',
        'Guaranteed replacement clause',
        'Regular progress reporting'
      ],
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
        <div className="absolute top-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Core <span style={{ color: '#FF4500' }}>Recruitment Services</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300">
                Specialized hiring solutions that connect exceptional talent with visionary organizations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {coreServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300"
                          style={{ background: `linear-gradient(135deg, ${service.bgColor} 0%, ${service.bgColor}dd 100%)` }}
                        >
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-2 border-t border-white/10 pt-4">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-xs text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0" style={{ backgroundColor: '#FF4500' }}></span>
                            <span className="group-hover:text-white transition-colors">{feature}</span>
                          </li>
                        ))}
                      </ul>
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
                    className="group bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                          <IconComponent className="w-7 h-7" style={{ color: '#FF4500' }} />
                        </div>
                        <span className="px-2.5 py-1 bg-orange-500/30 backdrop-blur-sm text-orange-100 rounded-full text-xs font-semibold border border-orange-300/30">
                          {service.badge}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm text-gray-300 leading-relaxed">
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
                    className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] text-center"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                      <IconComponent className="w-7 h-7" style={{ color: '#FF4500' }} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{diff.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{diff.description}</p>
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
              onClick={() => onNavigate('contact')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;