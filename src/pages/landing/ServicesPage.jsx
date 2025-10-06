import React, { useState } from 'react';
import { Search, Users, MapPin, TrendingUp, Briefcase, Target, Award, Shield, CheckCircle, LineChart, Brain, Zap } from 'lucide-react';

export const ServicesPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const coreServices = [
    {
      id: 'executive-search',
      icon: Search,
      title: 'Executive Search',
      description: 'Strategic leadership acquisition for C-suite and senior management positions. We identify transformational leaders who drive organizational excellence and long-term value creation.',
      features: [
        'Confidential search methodology',
        'Comprehensive market mapping',
        'Leadership competency assessment',
        'Cultural alignment evaluation'
      ],
      gradient: 'from-blue-600 to-blue-700',
      bgColor: '#003566'
    },
    {
      id: 'recruitment-solutions',
      icon: Users,
      title: 'Recruitment Solutions',
      description: 'End-to-end talent acquisition across all organizational levels. From niche specialists to mid-management, we deliver candidates who excel in their domains.',
      features: [
        'Full-cycle recruitment process',
        'Technical & behavioral evaluation',
        'Compensation negotiation support',
        'Onboarding facilitation'
      ],
      gradient: 'from-orange-500 to-orange-600',
      bgColor: '#FF4500'
    },
    {
      id: 'talent-mapping',
      icon: MapPin,
      title: 'Talent Mapping & Intelligence',
      description: 'Strategic market intelligence and competitive talent landscape analysis. Understand where top talent resides and how to attract them to your organization.',
      features: [
        'Competitive talent analysis',
        'Market availability assessment',
        'Organization benchmarking',
        'Succession planning support'
      ],
      gradient: 'from-blue-600 to-blue-700',
      bgColor: '#003566'
    },
    {
      id: 'retained-search',
      icon: Target,
      title: 'Retained Search Mandates',
      description: 'Exclusive partnerships for critical leadership positions. Dedicated focus and discretion for your most strategic hiring needs with guaranteed delivery timelines.',
      features: [
        'Exclusive engagement model',
        'Dedicated search consultant',
        'Guaranteed replacement clause',
        'Regular progress reporting'
      ],
      gradient: 'from-orange-500 to-orange-600',
      bgColor: '#FF4500'
    }
  ];

  const advisoryServices = [
    {
      id: 'workforce-insights',
      icon: Brain,
      title: 'Workforce Intelligence',
      description: 'Data-driven insights on talent availability, hiring trends, and market dynamics to inform your recruitment and retention strategies.',
      features: [
        'Industry hiring trends',
        'Talent availability reports',
        'Competitive intelligence',
        'Emerging skills analysis'
      ]
    },
    {
      id: 'compensation-benchmarking',
      icon: LineChart,
      title: 'Compensation Benchmarking',
      description: 'Comprehensive salary and benefits analysis to ensure your compensation packages remain competitive and attract top-tier talent.',
      features: [
        'Role-specific salary bands',
        'Benefits benchmarking',
        'Incentive structure guidance',
        'Geographic variations'
      ]
    },
    {
      id: 'talent-strategy',
      icon: Zap,
      title: 'Talent Strategy Consulting',
      description: 'Strategic guidance on workforce planning, organizational design, and talent development to build high-performing teams.',
      features: [
        'Workforce planning',
        'Organization design',
        'Skills gap analysis',
        'Talent development roadmaps'
      ]
    },
    {
      id: 'employer-branding',
      icon: Award,
      title: 'Employer Brand Advisory',
      description: 'Enhance your employer value proposition to attract and retain exceptional talent in competitive insurance and financial services markets.',
      features: [
        'EVP development',
        'Brand perception research',
        'Talent attraction strategies',
        'Retention program design'
      ]
    }
  ];

  const differentiators = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Rigorous screening and evaluation ensures only exceptional candidates reach your consideration'
    },
    {
      icon: Zap,
      title: 'Speed & Efficiency',
      description: 'Streamlined processes that reduce time-to-hire without compromising on quality'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Expert consultants providing personalized guidance throughout your engagement'
    },
    {
      icon: CheckCircle,
      title: 'Proven Results',
      description: 'Track record of successful placements and long-term client partnerships'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 sm:w-96 sm:h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              Our <span style={{ color: '#FF4500' }}>Services</span>
            </h1>
            <div className="w-20 sm:w-24 h-1 mx-auto mb-6 sm:mb-8" style={{ backgroundColor: '#FF4500' }}></div>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed px-4">
              Comprehensive talent solutions designed exclusively for the insurance and financial services sector
            </p>
          </div>

          {/* Core Recruitment Services */}
          <div className="mb-16 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Core <span style={{ color: '#FF4500' }}>Recruitment Services</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
                Specialized hiring solutions that connect exceptional talent with visionary organizations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {coreServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    style={{
                      borderColor: hoveredCard === service.id ? service.bgColor : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: hoveredCard === service.id ? `0 20px 60px -10px ${service.bgColor}60` : 'none'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                          style={{ background: `linear-gradient(135deg, ${service.bgColor} 0%, ${service.bgColor}dd 100%)` }}
                        >
                          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-300">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0" style={{ backgroundColor: '#FF4500' }}></span>
                              <span className="group-hover:text-white transition-colors">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advisory & Consulting Services */}
          <div className="mb-16 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Advisory & <span style={{ color: '#FF4500' }}>Consulting Services</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
                Strategic intelligence and guidance to optimize your talent acquisition strategy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {advisoryServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                          <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: '#FF4500' }} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-300">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0" style={{ backgroundColor: '#FF4500' }}></span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Choose Our Services */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Why Choose <span style={{ color: '#FF4500' }}>Our Services</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
                Excellence in every aspect of our engagement with you
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {differentiators.map((diff, index) => {
                const IconComponent = diff.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl mb-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: '#FF4500' }} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{diff.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{diff.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-blue-600/20 to-orange-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Partner with Talent Discoveri to access specialized insurance talent expertise, comprehensive market intelligence, and dedicated support that drives lasting success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Schedule Consultation
              </button>
              <button 
                className="border-2 hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105"
                style={{ borderColor: '#FF4500', color: '#FF4500' }}
              >
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};