import React, { useState } from 'react';
import { NavBar } from '../../components/common/NavBar';
import { HomePage } from './HomePage';
import { AboutPage } from './AboutPage';
import { ServicesPage } from './ServicesPage';
import { SectorsPage } from './SectorsPage';
import { JobsPage } from './JobsPage';
import { InsightsPage } from './InsightsPage';
import { ContactPage } from './ContactPage';
import { Home, User, Briefcase, LayoutGrid, Search, FileText, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Award } from 'lucide-react';

export const LandingPage = ({ setIsSignedIn }) => {
  const [activePage, setActivePage] = useState('home');

  const navItems = [
    { name: 'Home', id: 'home', url: '#', icon: Home },
    { name: 'About', id: 'about', url: '#', icon: User },
    { name: 'Services', id: 'services', url: '#', icon: Briefcase },
    { name: 'Sectors', id: 'sectors', url: '#', icon: LayoutGrid },
    { name: 'Jobs', id: 'jobs', url: '#', icon: Search },
    { name: 'Insights', id: 'insights', url: '#', icon: FileText },
    { name: 'Contact', id: 'contact', url: '#', icon: Mail }
  ];

  const handleNavClick = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 cursor-pointer">
            <div className="h-8 flex items-center bg-white rounded-lg px-2 py-1">
              <img src="/logo.png" alt="Talent Discovery" className="h-6 w-auto" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
              Talent Discoveri
            </span>
          </button>
          <button
            onClick={() => setIsSignedIn(true)}
            className="bg-white hover:bg-gray-100 text-black px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105 text-sm font-medium"
          >
            Sign In
          </button>
        </div>
      </header>

      <NavBar items={navItems} onNavItemClick={handleNavClick} activePage={activePage} />

      {activePage === 'home' && <HomePage onNavigate={handleNavClick} />}
      {activePage === 'about' && <AboutPage />}
      {activePage === 'services' && <ServicesPage onNavigate={handleNavClick} />}
      {activePage === 'sectors' && <SectorsPage onNavigate={handleNavClick} />}
      {activePage === 'jobs' && <JobsPage />}
      {activePage === 'insights' && <InsightsPage />}
      {activePage === 'contact' && <ContactPage />}

      {/* Enhanced Footer */}
      <footer className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #001122 0%, #003566 50%, #001122 100%)' }}></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 flex items-center bg-white rounded-lg px-3 py-2">
                  <img src="/logo.png" alt="Talent Discovery" className="h-7 w-auto" />
                </div>
              </div>
              <h3 className="text-white font-bold text-xl">Talent Discoveri</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                India's first women-led BFSI recruitment firm, connecting exceptional talent with visionary organizations.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-5 h-5" style={{ color: '#FF4500' }} />
                <span className="text-gray-300">Women-Led Excellence</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group text-left text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-500 transition-colors duration-200" style={{ backgroundColor: activePage === item.id ? '#FF4500' : undefined }}></span>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-lg">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#FF4500' }} />
                  <span>Mumbai, Maharashtra, India</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#FF4500' }} />
                  <span>+91 (XXX) XXX-XXXX</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#FF4500' }} />
                  <a href="mailto:info@talentdiscoveri.com" className="hover:text-white transition-colors duration-200">
                    info@talentdiscoveri.com
                  </a>
                </li>
              </ul>

              {/* Social Links */}
              <div className="pt-4">
                <h4 className="text-white font-semibold text-sm mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/talentdiscoveri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 transform hover:scale-110 group"
                  >
                    <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a
                    href="https://x.com/TalentDiscoveri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 transform hover:scale-110 group"
                  >
                    <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-200" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/talent-discoveri-consulting-india-pvt-ltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 transform hover:scale-110 group"
                  >
                    <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10"></div>

          {/* Bottom Bar */}
          <div className="py-6 flex justify-center">
            <p className="text-gray-400 text-sm text-center">
              © 2025 Talent Discoveri. All rights reserved.
            </p>
          </div>

          {/* Badge */}
          <div className="pb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Award className="w-4 h-4" style={{ color: '#FF4500' }} />
              <span className="text-gray-300 text-xs font-medium">
                Pioneering Women-Led BFSI Recruitment Excellence
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;