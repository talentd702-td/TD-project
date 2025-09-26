"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabaseUrl = 'https://llzardxjsqypkkslhrbr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsemFyZHhqc3F5cGtrc2xocmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NjI4MjcsImV4cCI6MjA0NzUzODgyN30.HjLHbeDu9IbriOH2-7vW0b-WblpVQjWjABcudG-93KU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Professional icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5v14M16 5v14" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2h2a2 2 0 002-2V8a2 2 0 00-2-2h-2zM8 6H6a2 2 0 00-2 2v8a2 2 0 002 2h2m0-12v12" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const TeamIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TalentDiscoveryApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample data
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Insurance Underwriter",
      company: "Star Health Insurance",
      location: "Mumbai, Maharashtra",
      salary: "₹12-18 LPA",
      experience: "5-8 years",
      recruiter: {
        name: "Priyanka Ramteke",
        photo: "./priyanka.png",
        phone: "+91 98765 43210",
        email: "priyanka@talentdiscovery.com",
        linkedin: "https://linkedin.com/in/priyanka-ramteke"
      }
    },
    {
      id: 2,
      title: "VP - Talent Acquisition",
      company: "HDFC Life",
      location: "Bengaluru, Karnataka",
      salary: "₹25-35 LPA",
      experience: "10-15 years",
      recruiter: {
        name: "Sheetal Bharatwal",
        photo: "./sheetal.png",
        phone: "+91 98765 43211",
        email: "sheetal@talentdiscovery.com",
        linkedin: "https://linkedin.com/in/sheetal-bharatwal"
      }
    },
    {
      id: 3,
      title: "Chief Risk Officer",
      company: "Bajaj Allianz",
      location: "Pune, Maharashtra",
      salary: "₹40-60 LPA",
      experience: "15+ years",
      recruiter: {
        name: "Neha Mendon",
        photo: "./neha.png",
        phone: "+91 98765 43212",
        email: "neha@talentdiscovery.com",
        linkedin: "https://linkedin.com/in/neha-mendon"
      }
    }
  ];

  const services = [
    {
      title: "Executive Search",
      description: "Finding C-suite and senior leadership talent for BFSI organizations",
      icon: UsersIcon
    },
    {
      title: "Retained Search",
      description: "Comprehensive recruitment solutions for critical business roles",
      icon: SearchIcon
    },
    {
      title: "Talent Mapping",
      description: "Strategic talent intelligence and market mapping services",
      icon: LocationIcon
    },
    {
      title: "Succession Planning",
      description: "Building robust leadership pipelines for organizational continuity",
      icon: TeamIcon
    }
  ];

  const sectors = [
    {
      name: "Banking",
      subsectors: ["Retail Banking", "Corporate Banking", "Investment Banking", "Digital Banking"],
      color: "#003566"
    },
    {
      name: "Insurance",
      subsectors: ["Life Insurance", "General Insurance", "Health Insurance", "Reinsurance"],
      color: "#FF4500"
    },
    {
      name: "Financial Services",
      subsectors: ["Asset Management", "Wealth Management", "Fintech", "NBFC"],
      color: "#003566"
    },
    {
      name: "Capital Markets",
      subsectors: ["Equity Markets", "Debt Markets", "Derivatives", "Commodities"],
      color: "#FF4500"
    }
  ];

  // Navigation component
  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="h-8 flex items-center bg-white rounded-lg px-2 py-1">
              <img src="/logo.png" alt="Talent Discovery" className="h-6 w-auto" />
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-900">Talent Discovery</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`transition-colors duration-300 ${currentPage === 'home' ? 'text-orange-500 font-medium' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className={`transition-colors duration-300 ${currentPage === 'about' ? 'text-orange-500 font-medium' : 'text-gray-700 hover:text-orange-500'}`}
            >
              About Us
            </button>
            <button 
              onClick={() => setCurrentPage('services')}
              className={`transition-colors duration-300 ${currentPage === 'services' ? 'text-orange-500 font-medium' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Services
            </button>
            <button 
              onClick={() => setCurrentPage('sectors')}
              className={`transition-colors duration-300 ${currentPage === 'sectors' ? 'text-orange-500 font-medium' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Sectors
            </button>
            <button 
              onClick={() => setCurrentPage('jobs')}
              className={`transition-colors duration-300 ${currentPage === 'jobs' ? 'text-orange-500 font-medium' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Jobs
            </button>
            <button 
              onClick={() => setCurrentPage('insights')}
              className={`transition-colors duration-300 ${currentPage === 'insights' ? 'text-orange-500 font-medium' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Insights
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`transition-colors duration-300 ${currentPage === 'contact' ? 'text-orange-500 font-medium' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Contact
            </button>
            <button
              onClick={() => setIsSignedIn(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full transition-colors duration-300"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Gradient Bars Component
  const GradientBars = ({ opacity = 0.1 }) => {
    const scaleValues = [0.3, 0.5, 0.2, 0.7, 0.4, 0.6, 0.35, 0.45, 0.25, 0.55];
    
    return (
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ opacity }}>
        <div className="flex h-full w-full">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className="animate-pulse"
              style={{
                width: '10%',
                height: '100%',
                background: 'linear-gradient(to top, #FF4500, transparent)',
                transform: `scaleY(${scaleValues[index]})`,
                transformOrigin: 'bottom',
                animationDelay: `${index * 200}ms`,
                animationDuration: '4s',
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center px-6 sm:px-8 md:px-12 overflow-hidden pt-20">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}></div>
        <GradientBars />
        
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen py-16">
          <h1 className="w-full text-white leading-tight tracking-tight mb-8 px-4">
            <span className="block font-bold text-4xl sm:text-6xl md:text-7xl">
              Connecting Top Talent
            </span>
            <span className="block font-light text-4xl sm:text-6xl md:text-7xl mt-4" style={{ color: '#FF4500' }}>
              with Visionary Companies
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl">
            Specialized executive search for BFSI sector leaders and emerging talent
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-300">
              Hire Leaders
            </button>
            <button 
              onClick={() => setCurrentPage('jobs')}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-300"
            >
              Explore Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Stats & Trust Signals */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#FF4500' }}>500+</div>
              <div className="text-gray-600 font-medium">Successful Placements</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#FF4500' }}>150+</div>
              <div className="text-gray-600 font-medium">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#FF4500' }}>10+</div>
              <div className="text-gray-600 font-medium">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#FF4500' }}>95%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sectors & Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized recruitment solutions across key financial services sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with top-tier positions in leading BFSI organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-orange-500 font-medium mb-4">{job.company}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <LocationIcon className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BriefcaseIcon className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.experience}</span>
                    </div>
                    <div className="text-green-600 font-semibold">{job.salary}</div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={job.recruiter.photo}
                          alt={job.recruiter.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{job.recruiter.name}</p>
                          <p className="text-xs text-gray-600">Recruiter</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a href={`tel:${job.recruiter.phone}`} className="text-gray-400 hover:text-gray-600">
                          <PhoneIcon className="w-4 h-4" />
                        </a>
                        <a href={`mailto:${job.recruiter.email}`} className="text-gray-400 hover:text-gray-600">
                          <MailIcon className="w-4 h-4" />
                        </a>
                        <a href={job.recruiter.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                          <LinkedInIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('jobs')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Insights Promo */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              BFSI Salary Guide 2024
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get comprehensive salary benchmarks and market insights for BFSI professionals across India
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center">
              <DownloadIcon className="w-5 h-5 mr-2" />
              Download Free Guide
            </button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with our expert recruiters and discover opportunities that align with your aspirations
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );

  // About Us Page
  const AboutPage = () => (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Talent Discovery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A women-led recruitment boutique firm specializing in BFSI and non-life insurance talent acquisition
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Legacy</h2>
            <p className="text-gray-600 mb-6">
              Founded with a vision to transform the recruitment landscape in the financial services sector, Talent Discovery has emerged as a trusted partner for both organizations and professionals seeking excellence.
            </p>
            <p className="text-gray-600 mb-6">
              Our journey began with a simple belief: the right talent can transform organizations, and the right opportunities can transform careers. Today, we stand as a testament to this philosophy, having successfully placed over 500 professionals in leadership roles across India's top BFSI companies.
            </p>
            <p className="text-gray-600">
              As a women-led organization, we bring a unique perspective to recruitment, emphasizing diversity, inclusion, and sustainable growth in every partnership we forge.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Milestones</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-1 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">2014: Foundation</h4>
                  <p className="text-gray-600">Established as a boutique recruitment firm</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-1 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">2017: BFSI Focus</h4>
                  <p className="text-gray-600">Specialized in financial services recruitment</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-1 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">2020: Digital Transformation</h4>
                  <p className="text-gray-600">Embraced technology-driven recruitment</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-1 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">2024: Industry Leadership</h4>
                  <p className="text-gray-600">Recognized as a top recruitment partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Services Page
  const ServicesPage = () => (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive recruitment solutions tailored for the BFSI sector
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <button className="text-orange-500 hover:text-orange-600 font-medium">
                  Learn More →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Sectors Page
  const SectorsPage = () => (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Industry Sectors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep expertise across key financial services verticals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((sector, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: sector.color }}>
                {sector.name}
              </h3>
              <div className="space-y-2">
                {sector.subsectors.map((subsector, subIndex) => (
                  <div key={subIndex} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: sector.color }}></div>
                    <span className="text-gray-600">{subsector}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Jobs Page
  const JobsPage = () => (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Current Opportunities</h1>
            <p className="text-xl text-gray-600">Discover your next career move in the BFSI sector</p>
          </div>
          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
              <FilterIcon className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-orange-500 font-medium mb-4">{job.company}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600">
                    <LocationIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BriefcaseIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.experience}</span>
                  </div>
                  <div className="text-green-600 font-semibold">{job.salary}</div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={job.recruiter.photo}
                        alt={job.recruiter.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{job.recruiter.name}</p>
                        <p className="text-xs text-gray-600">Recruiter</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a href={`tel:${job.recruiter.phone}`} className="text-gray-400 hover:text-gray-600">
                        <PhoneIcon className="w-4 h-4" />
                      </a>
                      <a href={`mailto:${job.recruiter.email}`} className="text-gray-400 hover:text-gray-600">
                        <MailIcon className="w-4 h-4" />
                      </a>
                      <a href={job.recruiter.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                        <LinkedInIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-300">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Insights Page
  const InsightsPage = () => (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Industry Insights</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Market intelligence and thought leadership for BFSI professionals
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-12 text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            BFSI Salary Guide 2024
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Comprehensive salary benchmarks, market trends, and career insights
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center">
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download Guide
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={`https://images.unsplash.com/photo-${
                  [
                    '1551434678-e076c223a692', // business
                    '1557804506-669a67965ba0', // team
                    '1600880292089-90a7e086ee0c', // success
                    '1521791136064-963d91ecbb73', // meeting
                    '1553877522-43269d4ea984', // discussion
                    '1507003211169-0a1dd7228f2d' // professional
                  ][i-1]
                }?w=400&h=250&fit=crop&auto=format`}
                alt={`Insight ${i}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Industry Insight Title {i}
                </h3>
                <p className="text-gray-600 mb-4">
                  Brief description of the insight or article content goes here...
                </p>
                <button className="text-orange-500 hover:text-orange-600 font-medium">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your career or find the perfect talent? Let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enquiry Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>General Enquiry</option>
                  <option>Hiring Requirements</option>
                  <option>Career Opportunities</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors duration-300">
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <PhoneIcon className="w-6 h-6 text-orange-500 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start">
                <MailIcon className="w-6 h-6 text-orange-500 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@talentdiscovery.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <LocationIcon className="w-6 h-6 text-orange-500 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    Mumbai, Maharashtra<br />
                    India 400001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 flex items-center bg-white rounded-lg px-2 py-1">
                <img src="/logo.png" alt="Talent Discovery" className="h-6 w-auto" />
              </div>
              <span className="ml-3 text-xl font-semibold">Talent Discovery</span>
            </div>
            <p className="text-gray-400 mb-4">
              Women-led recruitment boutique specializing in BFSI talent acquisition.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => setCurrentPage('services')} className="text-gray-400 hover:text-white transition-colors">Services</button></li>
              <li><button onClick={() => setCurrentPage('sectors')} className="text-gray-400 hover:text-white transition-colors">Sectors</button></li>
              <li><button onClick={() => setCurrentPage('jobs')} className="text-gray-400 hover:text-white transition-colors">Jobs</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('insights')} className="text-gray-400 hover:text-white transition-colors">Insights</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Salary Guide</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <LinkedInIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            © 2025 Talent Discovery. All rights reserved. | Women-led recruitment boutique firm.
          </p>
        </div>
      </div>
    </footer>
  );

  // Admin Dashboard (existing functionality)
  if (isSignedIn) {
    return <div>Admin Dashboard - Existing functionality here</div>;
  }

  // Main Website
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'sectors' && <SectorsPage />}
      {currentPage === 'jobs' && <JobsPage />}
      {currentPage === 'insights' && <InsightsPage />}
      {currentPage === 'contact' && <ContactPage />}
      
      <Footer />
    </div>
  );
};

export default TalentDiscoveryApp;