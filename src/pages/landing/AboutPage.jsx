import React, { useState } from 'react';
import { TestimonialsWithNavigation } from '../../components/landing/TestimonialsWithNavigation';
import { Timeline3D } from './Timeline3d';
import { testimonials } from '../../data/testimonials';
import { Shield, CheckCircle, TrendingUp, Target, Award, Users, Briefcase, Building, Globe, Heart, Lightbulb, Sparkles } from 'lucide-react';

export const AboutPage = () => {
  const [hoveredValue, setHoveredValue] = useState(null);

  const values = [
    {
      id: 'discretion',
      icon: Shield,
      title: 'Discretion & Integrity',
      description: 'We safeguard your ambitions with the highest standards of confidentiality and candor.',
      color: '#003566'
    },
    {
      id: 'counsel',
      icon: Heart,
      title: 'End-to-End Counsel',
      description: 'From meticulous interview preparation to nuanced offer negotiation, we are your constant ally.',
      color: '#FF4500'
    },
    {
      id: 'intelligence',
      icon: Lightbulb,
      title: 'Market Intelligence',
      description: 'Our insights into industry trends, compensation landscapes, and leadership pathways empower informed career decisions.',
      color: '#003566'
    },
    {
      id: 'alliances',
      icon: Sparkles,
      title: 'Enduring Alliances',
      description: 'We cultivate relationships anchored in trust, extending far beyond a single placement.',
      color: '#FF4500'
    }
  ];

  const timelineEvents = [
    {
      id: '1',
      date: '2008–2011',
      title: 'The Foundation Years',
      description: 'Born from passion and personal savings, Talent Discoveri took shape in 2008. Within three years, we moved from dreamers to doers — setting up our first office, hiring our first team member, and launching our debut website long before digital presence became mainstream.',
      icon: <Briefcase className="w-5 h-5 text-white" />,
      category: 'Inception',
      color: 'orange'
    },
    {
      id: '2',
      date: '2012–2014',
      title: 'Building Connections & Expanding Horizons',
      description: 'We began connecting people beyond recruitment — hosting Connecting Threads, our first industry seminar, and launching the Talent Discoveri Cricket Cup to bring insurers and brokers together. Around the same time, our footprint expanded internationally across the Middle East and Far East.',
      icon: <Globe className="w-5 h-5 text-white" />,
      category: 'Expansion',
      color: 'blue'
    },
    {
      id: '3',
      date: '2015–2017',
      title: 'Recognition & Growth',
      description: 'These were defining years. We helped set up a multinational insurance broking firm in India, earned recognition from one of the world\'s largest insurers, grew into a dynamic 15-member team, and launched iTalent, our learning and development arm. Our efforts were crowned when we were honored as the Outstanding Executive Search Company of the Year.',
      icon: <Award className="w-5 h-5 text-white" />,
      category: 'Recognition',
      color: 'orange'
    },
    {
      id: '4',
      date: '2018–2022',
      title: 'Adapting & Evolving',
      description: 'As India\'s insurance sector opened its doors to global players, we partnered with many to build their leadership teams. Even through the pandemic, we adapted swiftly — scaling IT hiring, strengthening international recruitment, and laying the groundwork for a tech-driven future.',
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      category: 'Transformation',
      color: 'blue'
    },
    {
      id: '5',
      date: '2023–2025',
      title: 'Reinvention & The Road Ahead',
      description: 'With over 17 years behind us, we\'re now in our reinvention phase — expanding into fintech and IT leadership, embracing AI-powered recruitment intelligence, and reimagining what talent discovery means for the future.',
      icon: <Target className="w-5 h-5 text-white" />,
      category: 'Innovation',
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section - Powerful Opening */}
          <div className="mb-20">
            <div className="relative overflow-hidden rounded-3xl">
              {/* Background with overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900/70 to-orange-900/50 backdrop-blur-sm"></div>
              
              {/* Background image */}
              <div 
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              
              {/* Decorative overlay */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255, 69, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 53, 102, 0.15) 0%, transparent 50%)'
              }}></div>

              <div className="relative z-10 py-20 px-8 md:px-16">
                <div className="max-w-5xl mx-auto text-center">
                  {/* Decorative top line */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-500"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-500 mx-3"></div>
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-orange-500"></div>
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                    Where Ambition Meets <span style={{ color: '#FF4500' }}>Opportunity</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8 max-w-4xl mx-auto">
                    For over 17 years, we've been the trusted bridge connecting exceptional talent with transformative careers in BFSI
                  </p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                      <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#FF4500' }}>17+</div>
                      <div className="text-sm text-gray-300">Years of Excellence</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
                      <div className="text-sm text-gray-300">Lives Transformed</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                      <div className="text-sm text-gray-300">BFSI Focused</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                      <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#FF4500' }}>#1</div>
                      <div className="text-sm text-gray-300">Women-Led Firm</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Origin Story - Redesigned with split layout */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left - Image/Visual */}
              <div className="relative overflow-hidden rounded-2xl h-full min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-blue-900/90"></div>
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">
                  <Award className="w-16 h-16 text-white mb-6" />
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    A Pioneer's Journey
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed mb-6">
                    India's women-led, homegrown recruitment firm specializing exclusively in BFSI
                  </p>
                  <div className="pt-4 border-t border-white/30">
                    <p className="text-sm text-white/80 italic">
                      "Born from passion, built with purpose, sustained by excellence"
                    </p>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Our <span style={{ color: '#FF4500' }}>Story</span>
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-transparent mb-6"></div>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">
                  Talent Discoveri Consulting is a <span className="font-semibold text-white">premier recruitment and executive search enterprise</span>, distinguished for its ability to align exceptional human capital with visionary organizations.
                </p>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our mandate transcends conventional hiring — we delve deeply into aspirations, competencies, and long-term ambitions, curating opportunities where professionals can truly flourish and lead.
                </p>

                <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                  <p className="text-xl text-white font-semibold italic leading-relaxed">
                    "The right mandate can redefine a career, and the right leader can recalibrate an enterprise."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values - Redesigned horizontal cards */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                What Drives <span style={{ color: '#FF4500' }}>Us</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Four pillars that define every partnership we forge
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={value.id}
                    onMouseEnter={() => setHoveredValue(value.id)}
                    onMouseLeave={() => setHoveredValue(null)}
                    className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500"
                  >
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 p-8">
                      <div className="flex items-start gap-6">
                        <div 
                          className="w-16 h-16 flex-shrink-0 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                          style={{ background: `linear-gradient(135deg, ${value.color} 0%, ${value.color}dd 100%)` }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                            {value.title}
                          </h3>
                          <p className="text-base text-gray-300 leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline - Animated with Rich Visual Theme */}
          <div className="mb-24">
            {/* Grand Introduction */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-blue-600/20 backdrop-blur-xl px-6 py-3 rounded-full border border-orange-500/30">
                  <Award className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-semibold text-white uppercase tracking-wider">17 Years of Excellence</span>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                The Journey from <span style={{ color: '#FF4500' }}>Dream</span> to <span style={{ color: '#FF4500' }}>Distinction</span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4">
                Every great company has a story. Ours is one of resilience, innovation, and unwavering commitment 
                to connecting exceptional talent with transformative opportunities.
              </p>
              
              <p className="text-lg text-gray-400 max-w-3xl mx-auto italic">
                Five defining chapters that shaped India's premier BFSI talent consultancy
              </p>
            </div>

            {/* Timeline Container - Dark theme to blend with page */}
            <div className="relative overflow-hidden rounded-3xl">
              {/* Dark background to blend with page */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-slate-900/50 to-gray-900/50"></div>
              
              {/* Subtle glow effects */}
              <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
              
              {/* Timeline Component */}
              <div className="relative z-10 p-8 md:p-12">
                <Timeline3D 
                  events={timelineEvents}
                  backgroundColor="bg-transparent"
                  primaryColor="bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700"
                  secondaryColor="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950"
                  textColor="text-white"
                  accentColor="bg-orange-400"
                  showImages={false}
                  className="timeline-section"
                />
              </div>
            </div>

            {/* Journey Complete - Powerful Closing */}
            <div className="mt-16 text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-600/20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl px-12 py-8 border border-white/20">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
                    <span className="text-2xl font-bold text-white">The Journey Continues</span>
                    <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  <p className="text-gray-300 text-lg">
                    With innovation as our compass and excellence as our destination
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section - Redesigned */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Meet the <span style={{ color: '#FF4500' }}>Minds</span> Behind the Mission
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mb-6"></div>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Driven by expertise, united by purpose — our team brings decades of combined experience in BFSI talent acquisition
              </p>
            </div>

            <TestimonialsWithNavigation testimonials={testimonials} />
          </div>

          {/* Closing Statement */}
          <div className="bg-gradient-to-br from-orange-500/20 to-blue-600/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20 text-center">
            <Users className="w-16 h-16 mx-auto mb-6" style={{ color: '#FF4500' }} />
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Your Success is Our Legacy
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Whether you're a professional seeking your next career milestone or an organization building tomorrow's leadership team, 
              we're here to make that vision a reality.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500"></div>
              <p className="text-orange-400 font-semibold">Let's write your success story together</p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-500"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;