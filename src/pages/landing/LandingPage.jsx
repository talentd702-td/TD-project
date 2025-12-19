"use client";
export const dynamic = "force-dynamic";

import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { NavBar } from "../../components/common/NavBar";
import { HomePage } from "./HomePage";
import { AboutPage } from "./AboutPage";
import { ServicesPage } from "./ServicesPage";
import { SectorsPage } from "./SectorsPage";
import { JobsPage } from "./JobsPage";
import { InsightsPage } from "./InsightsPage";
import { ContactPage } from "./ContactPage";
import {
  Home,
  User,
  Briefcase,
  LayoutGrid,
  Search,
  FileText,
  Mail,
  MapPin,
  Linkedin,
  Award,
  Instagram,
} from "lucide-react";

export default function LandingPage() {
  // ✅ If we're on the server (build or SSR), render nothing
  if (typeof window === "undefined") {
    return null;
  }

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", id: "home", url: "/home", icon: Home },
    { name: "About", id: "about", url: "/about", icon: User },
    { name: "Services", id: "services", url: "/services", icon: Briefcase },
    { name: "Core", id: "sectors", url: "/sectors", icon: LayoutGrid },
    { name: "Jobs", id: "jobs", url: "/jobs", icon: Search },
    { name: "Insights", id: "insights", url: "/insights", icon: FileText },
    { name: "Contact", id: "contact", url: "/contact", icon: Mail },
  ];

  const handleNavClick = (page) => {
    navigate(`/${page}`);
    window.scrollTo(0, 0);
  };

  const getActivePage = () => {
    const path = location.pathname.slice(1) || "home";
    return path;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="h-8 flex items-center bg-white rounded-lg px-2 py-1">
              <img
                src="/logo.png"
                alt="Talent Discovery"
                className="h-6 w-auto"
              />
            </div>
            <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
              Talent Discoveri
            </span>
          </button>
        </div>
      </header>

      <NavBar
        items={navItems}
        onNavItemClick={handleNavClick}
        activePage={getActivePage()}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage onNavigate={handleNavClick} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/services"
          element={<ServicesPage onNavigate={handleNavClick} />}
        />
        <Route
          path="/sectors"
          element={<SectorsPage onNavigate={handleNavClick} />}
        />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <footer className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #001122 0%, #003566 50%, #001122 100%)",
          }}
        ></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 flex items-center bg-white rounded-lg px-3 py-2">
                  <img
                    src="/logo.png"
                    alt="Talent Discovery"
                    className="h-7 w-auto"
                  />
                </div>
              </div>
              <h3 className="text-white font-bold text-xl">Talent Discoveri</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                India's Insurance recruitment firm, connecting
                exceptional talent with visionary organizations.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-5 h-5" style={{ color: "#FF4500" }} />
                <span className="text-gray-300"></span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group text-left text-sm"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-orange-500 transition-colors duration-200"
                      style={{
                        backgroundColor:
                          getActivePage() === item.id ? "#FF4500" : undefined,
                      }}
                    ></span>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-white font-bold text-lg">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <MapPin
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#FF4500" }}
                  />
                  <span>
                    WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra
                    Kurla Complex, Bandra East, Mumbai, Maharashtra 400051
                  </span>
                </li>

                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <Mail
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#FF4500" }}
                  />
                  <a
                    href="mailto:enquiries@talentdiscoveri.com"
                    className="hover:text-white transition-colors duration-200"
                  >
                    enquiries@talentdiscoveri.com
                  </a>
                </li>
              </ul>

              <div className="pt-4">
                <h4 className="text-white font-semibold text-sm mb-3">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/talentdiscoveri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 transform hover:scale-110 group"
                  >
                    <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-200" />
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

          <div className="border-t border-white/10"></div>

          <div className="py-6 flex justify-center">
            <p className="text-gray-400 text-sm text-center">
              © 2025 Talent Discoveri. All rights reserved.
            </p>
          </div>

          <div className="pb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Award className="w-4 h-4" style={{ color: "#FF4500" }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
