import React, { useState } from 'react';
import { TestimonialsWithNavigation } from '../../components/landing/TestimonialsWithNavigation';
import { testimonials } from '../../data/testimonials';
import { Shield, CheckCircle, TrendingUp, Target, Award, Users } from 'lucide-react';

export const AboutPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const values = [
    {
      id: 'discretion',
      icon: Shield,
      title: 'Discretion & Integrity',
      description: 'We safeguard your ambitions with the highest standards of confidentiality and candor.',
      gradient: 'from-blue-600 to-blue-700',
      borderColor: '#003566'
    },
    {
      id: 'counsel',
      icon: CheckCircle,
      title: 'End-to-End Counsel',
      description: 'From meticulous interview preparation to nuanced offer negotiation, we are your constant ally.',
      gradient: 'from-orange-500 to-orange-600',
      borderColor: '#FF4500'
    },
    {
      id: 'intelligence',
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Our insights into industry trends, compensation landscapes, and leadership pathways empower informed career decisions.',
      gradient: 'from-orange-500 to-orange-600',
      borderColor: '#FF4500'
    },
    {
      id: 'alliances',
      icon: Target,
      title: 'Enduring Alliances',
      description: 'We cultivate relationships anchored in trust, extending far beyond a single placement.',
      gradient: 'from-blue-600 to-blue-700',
      borderColor: '#003566'
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              About <span style={{ color: '#FF4500' }}>Talent Discoveri</span>
            </h1>
            <div className="w-20 sm:w-24 h-1 mx-auto mb-6 sm:mb-8" style={{ backgroundColor: '#FF4500' }}></div>
          </div>

          {/* Main About Content */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10 mb-12 sm:mb-16 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8">
                Talent Discoveri Consulting is a premier recruitment and executive search enterprise, distinguished for its ability to align exceptional human capital with visionary organizations.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8">
                Our mandate transcends conventional hiring — we delve deeply into aspirations, competencies, and long-term ambitions, curating opportunities where professionals can truly flourish and lead. Through strategic partnerships with marquee institutions across industries, we provide privileged access to roles that are both intellectually rigorous and professionally rewarding.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                At Talent Discoveri, we believe the right mandate can redefine a career, and the right leader can recalibrate an enterprise.
              </p>
            </div>
          </div>

          {/* Pioneer Badge */}
          <div className="bg-gradient-to-r from-orange-500/20 to-blue-600/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 mb-12 sm:mb-16 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #FF4500 0%, #FF6A33 100%)' }}>
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  First Women-Led BFSI Firm in India
                </h3>
                <p className="text-base sm:text-lg text-white/90">
                  We are proud to be the first women-led, homegrown firm in India to specialize in the BFSI sector, a distinction that underscores both our pioneering ethos and enduring influence.
                </p>
              </div>
            </div>
          </div>

          {/* Our Value Proposition */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Our Value <span style={{ color: '#FF4500' }}>Proposition</span>
              </h2>
              <div className="w-16 sm:w-20 h-1 mx-auto" style={{ backgroundColor: '#FF4500' }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {values.map((value) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={value.id}
                    onMouseEnter={() => setHoveredCard(value.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    style={{ 
                      borderColor: hoveredCard === value.id ? value.borderColor : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: hoveredCard === value.id ? `0 20px 60px -10px ${value.borderColor}40` : 'none'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      <div className="flex-shrink-0">
                        <div 
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                          style={{ background: `linear-gradient(135deg, ${value.borderColor} 0%, ${value.borderColor}dd 100%)` }}
                        >
                          <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-orange-300 transition-colors">
                          {value.title}
                        </h3>
                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                <Users className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#FF4500' }} />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">1000+</h3>
              <p className="text-base sm:text-lg text-white/90 font-semibold">Successful Placements</p>
              <p className="text-sm text-white/70 mt-2">Niche specialists & leadership roles</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                <Target className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#FF4500' }} />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">100%</h3>
              <p className="text-base sm:text-lg text-white/90 font-semibold">BFSI Focus</p>
              <p className="text-sm text-white/70 mt-2">Insurance & Financial Services</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                <Award className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#FF4500' }} />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">First</h3>
              <p className="text-base sm:text-lg text-white/90 font-semibold">Women-Led Firm</p>
              <p className="text-sm text-white/70 mt-2">Pioneering in BFSI sector</p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Meet Our <span style={{ color: '#FF4500' }}>Team</span>
              </h2>
              <div className="w-16 sm:w-20 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#FF4500' }}></div>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
                Dedicated professionals driving success in talent acquisition and HR excellence
              </p>
            </div>

            <TestimonialsWithNavigation testimonials={testimonials} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
