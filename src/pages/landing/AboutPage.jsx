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
      borderColor: '#003566'
    },
    {
      id: 'counsel',
      icon: CheckCircle,
      title: 'End-to-End Counsel',
      description: 'From meticulous interview preparation to nuanced offer negotiation, we are your constant ally.',
      borderColor: '#FF4500'
    },
    {
      id: 'intelligence',
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Our insights into industry trends, compensation landscapes, and leadership pathways empower informed career decisions.',
      borderColor: '#FF4500'
    },
    {
      id: 'alliances',
      icon: Target,
      title: 'Enduring Alliances',
      description: 'We cultivate relationships anchored in trust, extending far beyond a single placement.',
      borderColor: '#003566'
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
              About <span style={{ color: '#FF4500' }}>Talent Discoveri</span>
            </h2>
            <div className="w-20 h-0.5 bg-orange-400 mx-auto mb-3"></div>
          </div>

          {/* Main About Content */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10 mb-12 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6">
                Talent Discoveri Consulting is a premier recruitment and executive search enterprise, distinguished for its ability to align exceptional human capital with visionary organizations.
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6">
                Our mandate transcends conventional hiring — we delve deeply into aspirations, competencies, and long-term ambitions, curating opportunities where professionals can truly flourish and lead. Through strategic partnerships with marquee institutions across industries, we provide privileged access to roles that are both intellectually rigorous and professionally rewarding.
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                At Talent Discoveri, we believe the right mandate can redefine a career, and the right leader can recalibrate an enterprise.
              </p>
            </div>
          </div>

          {/* Pioneer Badge */}
          <div className="bg-gradient-to-r from-orange-500/20 to-blue-600/20 backdrop-blur-xl rounded-xl p-8 border border-white/20 mb-12 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-6 max-w-4xl mx-auto">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #FF4500 0%, #FF6A33 100%)' }}>
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  First Women-Led BFSI Firm in India
                </h3>
                <p className="text-sm md:text-base text-gray-300">
                  We are proud to be the first women-led, homegrown firm in India to specialize in the BFSI sector, a distinction that underscores both our pioneering ethos and enduring influence.
                </p>
              </div>
            </div>
          </div>

          {/* Our Value Proposition */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Our Value <span style={{ color: '#FF4500' }}>Proposition</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300">
                Core principles that guide our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {values.map((value) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={value.id}
                    onMouseEnter={() => setHoveredCard(value.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300"
                          style={{ background: `linear-gradient(135deg, ${value.borderColor} 0%, ${value.borderColor}dd 100%)` }}
                        >
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                            {value.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Our <span style={{ color: '#FF4500' }}>Impact</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300">
                Measurable excellence in talent acquisition
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]">
                <div className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                    <Users className="w-7 h-7" style={{ color: '#FF4500' }} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">1000+</h3>
                  <p className="text-base text-white font-semibold mb-1">Successful Placements</p>
                  <p className="text-sm text-gray-300">Niche specialists & leadership roles</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02]">
                <div className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                    <Target className="w-7 h-7" style={{ color: '#FF4500' }} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
                  <p className="text-base text-white font-semibold mb-1">BFSI Focus</p>
                  <p className="text-sm text-gray-300">Insurance & Financial Services</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]">
                <div className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)', border: '2px solid #FF4500' }}>
                    <Award className="w-7 h-7" style={{ color: '#FF4500' }} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">First</h3>
                  <p className="text-base text-white font-semibold mb-1">Women-Led Firm</p>
                  <p className="text-sm text-gray-300">Pioneering in BFSI sector</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Meet Our <span style={{ color: '#FF4500' }}>Team</span>
              </h2>
              <div className="w-20 h-0.5 bg-orange-400 mx-auto mb-3"></div>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
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