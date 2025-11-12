import React, { useState } from 'react';
import { Shield, Users, Briefcase, Target, Award, CheckCircle, Brain, Globe, Zap } from 'lucide-react';
import SyntheticHero from '../../components/landing/synthetic-hero';

export const SectorsPage = ({ onNavigate }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

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
      icon: Shield,
      gradient: 'from-blue-600 to-blue-700',
      bgColor: '#003566'
    },
    {
      id: 'claims',
      name: 'Claims & Operations',
      description: 'Specialists who streamline processes and enhance customer satisfaction',
      icon: CheckCircle,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: '#FF4500'
    },
    {
      id: 'actuarial',
      name: 'Actuarial & Risk',
      description: 'Top-tier professionals who drive financial stability and innovation',
      icon: Brain,
      gradient: 'from-blue-600 to-blue-700',
      bgColor: '#003566'
    },
    {
      id: 'distribution',
      name: 'Distribution & Broking',
      description: 'Revenue-generating talent across traditional and emerging channels',
      icon: Users,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: '#FF4500'
    },
    {
      id: 'technology',
      name: 'Technology & Innovation',
      description: 'Forward-thinking leaders transforming insurance through digital capabilities',
      icon: Zap,
      gradient: 'from-blue-600 to-blue-700',
      bgColor: '#003566'
    },
    {
      id: 'leadership',
      name: 'Executive Leadership',
      description: 'C-suite and board-level talent driving organizational transformation',
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

  const valueAdditions = [
    {
      title: 'Talent Strategy Consulting',
      description: 'Strategic guidance on workforce planning and organizational design for evolving insurance needs'
    },
    {
      title: 'Compensation Intelligence',
      description: 'Data-driven benchmarking to maintain competitive positioning in talent attraction and retention'
    },
    {
      title: 'Succession Planning',
      description: 'Identifying and nurturing future leaders to ensure organizational continuity and growth'
    },
    {
      title: 'Market Insights',
      description: 'Regular intelligence on sectoral hiring dynamics, talent availability, and competitive landscape'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with Synthetic Hero */}
      <div className="relative">
        <SyntheticHero
          title="Specialized Hiring for Insurance & Financial Services"
          description="We are a niche search and talent consulting partner dedicated exclusively to the insurance sector—spanning life, health, general, and reinsurance."
          badgeText="Talent Discoveri"
          badgeLabel="Expertise"
          ctaButtons={[
            { text: "Start Your Search", primary: true },
            { text: "Learn More" }
          ]}
          microDetails={[
            "100% Insurance Focus",
            "Deep Industry Network",
            "Proven Track Record"
          ]}
        />
      </div>

      {/* Rest of the page content */}
      <div className="relative" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 pt-16 pb-16 px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-orange-500/20 to-blue-600/20 backdrop-blur-xl rounded-xl p-8 border border-white/20 mb-12 shadow-2xl">
              <div className="text-center">
                <p className="text-lg md:text-xl text-white font-semibold mb-4">
                  We are not generalist recruiters.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  We are a <span className="font-bold" style={{ color: '#FF4500' }}>niche search and talent consulting partner</span> dedicated exclusively to the insurance sector—spanning <span className="font-semibold">life, health, general, and reinsurance</span>.
                </p>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                  Our <span style={{ color: '#FF4500' }}>Expertise Areas</span>
                </h2>
                <p className="text-base md:text-lg text-gray-300">
                  Comprehensive talent solutions across the entire insurance value chain
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {expertiseAreas.map((area) => {
                  const IconComponent = area.icon;
                  return (
                    <div
                      key={area.id}
                      onMouseEnter={() => setHoveredCard(area.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="group bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div
                            className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-all duration-300"
                            style={{ background: `linear-gradient(135deg, ${area.bgColor} 0%, ${area.bgColor}dd 100%)` }}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                            {area.name}
                          </h3>
                          
                          <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-2">
                            {area.description}
                          </p>
                          
                          <div className="pt-4 border-t border-white/20 w-full">
                            <p className="text-xs text-white/80 leading-relaxed">
                              {area.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Differentiators */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                  What Sets Us <span style={{ color: '#FF4500' }}>Apart</span>
                </h2>
                <p className="text-base md:text-lg text-gray-300">
                  Five pillars that define our approach to insurance talent acquisition
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
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

            {/* Value Beyond Hiring */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                  Value Beyond <span style={{ color: '#FF4500' }}>Hiring</span>
                </h2>
                <p className="text-base md:text-lg text-gray-300">
                  Strategic advisory services that extend far beyond candidate placement
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {valueAdditions.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#FF4500' }}></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">
                            {value.title}
                          </h3>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
    </div>
  );
};

export default SectorsPage;