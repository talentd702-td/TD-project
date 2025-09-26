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

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1V4m7 3H4" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const TalentDiscoveryApp = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Team data for Talent Discovery
  const testimonials = [
    {
      quote: "A skilled professional with expertise in HR, marketing, and operations. Experienced in managing social media, recruitment, and data systems. Passionate about leveraging technology and creativity to enhance business processes and drive organizational growth.",
      name: "Akiti Yadav",
      designation: "Sr. Associate - Delivery and Marketing",
      src: "./akiti.png"
    },
    {
      quote: "Experienced Human Resource professional with a demonstrated history in logistics and supply chain industry. Strong expertise in Talent Management, Client Relations, and Senior Hiring. Holds an MBA focused in HRM with proven skills in team leadership.",
      name: "Sheetal Bharatwal",
      designation: "Assistant Vice President",
      src: "./sheetal.png"
    },
    {
      quote: "Dedicated talent acquisition specialist with expertise in financial services recruitment. Proven track record in building strategic partnerships and delivering exceptional results. Committed to connecting top talent with visionary organizations.",
      name: "Divya Kabadi",
      designation: "Senior Manager-Talent Acquisition",
      src: "./divya.png"
    },
    {
      quote: "Passionate HR professional with Masters in dual specialization in HR and Finance. Focuses on work-life balance and believes in scheduling priorities effectively. Thrives in collaborative environments with bright employees and thoughtful leadership.",
      name: "Rashi Bhasin",
      designation: "Senior Associate",
      src: "./rashi.png"
    },
    {
      quote: "Dedicated Human Resource Professional with Bachelor's of Commerce from Mumbai University. Extensive experience in managing complete spectrum of HR Operations and Backend systems. Committed to excellence in human resource management.",
      name: "Neha Mendon",
      designation: "Asst Vice President-Support and Marketing",
      src: "./neha.png"
    },
    {
      quote: "Experienced Human Resource Professional with Bachelor's of Science from Mumbai University. 7+ years expertise in recruitment operations and talent management. Believes in positive thinking, hard work, and dedication to achieve excellence.",
      name: "Priyanka Ramteke",
      designation: "Principal Consultant",
      src: "./priyanka.png"
    }
  ];

  // Form state
  const [formData, setFormData] = useState({
    client_name: '',
    street: '',
    area: '',
    country: 'India',
    state: '',
    city: '',
    pin: '',
    contact_number: '',
    email_address: '',
    website: '',
    profile: '',
    status: 'Active Client'
  });

  // Indian states
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'my-account', label: 'My Account', icon: UserIcon },
    { id: 'client', label: 'Clients', icon: UsersIcon },
    { id: 'jobs', label: 'Jobs', icon: BriefcaseIcon },
    { id: 'candidate', label: 'Candidates', icon: UserIcon },
    { id: 'interviews', label: 'Interviews', icon: CalendarIcon },
    { id: 'testimonials', label: 'Testimonials', icon: StarIcon },
    { id: 'team', label: 'Team', icon: TeamIcon },
    { id: 'articles', label: 'Articles', icon: DocumentIcon },
    { id: 'enquiries', label: 'Enquiries', icon: MailIcon },
    { id: 'salary-guide', label: 'Salary Guide', icon: ChartIcon },
  ];

  // Trust Elements Component
  const TrustElements = () => {
    const avatars = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    ];

    return (
      <div className="inline-flex items-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-full py-2 px-4 text-sm">
        <div className="flex -space-x-3">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-lg"
            >
              <img 
                src={avatar} 
                alt="HR Leader" 
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <p className="text-white whitespace-nowrap">
          <span className="text-white font-semibold">500+</span> successful placements
        </p>
      </div>
    );
  };

  // Contact Form Component
  const ContactForm = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email || !email.includes('@')) return;

      setIsSubmitting(true);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setEmail('');
        
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }, 1500);
    };

    return (
      <div className="relative z-10 w-full">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="flex-1 px-8 py-4 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-white outline-none text-white text-base placeholder-white placeholder-opacity-70 backdrop-blur-sm transition-all duration-300"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-base font-medium ${
                isSubmitting 
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-100 text-black'
              }`}
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
              ) : (
                'Get In Touch'
              )}
            </button>
          </form>
        ) : (
          <div className="bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 text-green-300 rounded-full px-8 py-4 text-center text-base">
            Thanks! We'll be in touch soon.
          </div>
        )}
      </div>
    );
  };

  // Simple Gradient Bars Component
  const GradientBars = () => {
    const bars = Array.from({ length: 15 }, (_, index) => {
      const position = index / 14;
      const center = 0.5;
      const distanceFromCenter = Math.abs(position - center);
      const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
      const height = 30 + (100 - 30) * heightPercentage;
      
      return (
        <div
          key={index}
          className="animate-pulse"
          style={{
            width: '6.67%',
            height: '100%',
            background: 'linear-gradient(to top, #FF4500, transparent)',
            transform: `scaleY(${height / 100})`,
            transformOrigin: 'bottom',
            animationDelay: `${index * 100}ms`,
            animationDuration: '2s',
          }}
        />
      );
    });

    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="flex h-full w-full">
          {bars}
        </div>
      </div>
    );
  };

  // Hero Navbar Component
  const HeroNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 flex items-center bg-white rounded-lg px-2 py-1">
                <img src="/logo.png" alt="Talent Discovery" className="h-6 w-auto" />
              </div>
              <span className="ml-3 text-white font-bold text-xl tracking-tight">
                Talent Discovery
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">
                Services
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">
                About
              </a>
              <a href="#careers" className="text-gray-300 hover:text-white transition-colors duration-300">
                Careers
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                Contact
              </a>
              <button 
                onClick={() => setIsSignedIn(true)}
                className="bg-white hover:bg-gray-100 text-black px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-gray-900 bg-opacity-95 backdrop-blur-sm rounded-lg p-4">
              <div className="flex flex-col space-y-4">
                <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300 py-2">
                  Services
                </a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300 py-2">
                  About
                </a>
                <a href="#careers" className="text-gray-300 hover:text-white transition-colors duration-300 py-2">
                  Careers
                </a>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300 py-2">
                  Contact
                </a>
                <button 
                  onClick={() => setIsSignedIn(true)}
                  className="bg-white hover:bg-gray-100 text-black px-5 py-2 rounded-full transition-all duration-300 w-full"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  // Animated Testimonials Component
  const AnimatedTestimonials = ({ testimonials, autoplay = true }) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
      setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
      setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
      if (autoplay) {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
      }
    }, [autoplay]);

    const getRotation = (index) => {
      const rotations = [3, -2, 5, -4, 2];
      return rotations[index % rotations.length];
    };

    return (
      <div className="max-w-sm md:max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-20">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <div className="relative h-80 w-full">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.src}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === active 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-70 scale-95'
                  }`}
                  style={{
                    transform: `rotate(${index === active ? 0 : getRotation(index)}deg) translateY(${
                      index === active ? 0 : 20
                    }px)`,
                    zIndex: index === active ? 999 : testimonials.length + 2 - index
                  }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-2xl"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between flex-col py-4">
            <div
              key={active}
              className="transition-all duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-gray-600 mb-8">
                {testimonials[active].designation}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                "{testimonials[active].quote}"
              </p>
            </div>
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center group transition-all duration-200"
              >
                <ArrowLeftIcon className="text-gray-600 group-hover:text-gray-800 group-hover:scale-110 transition-all duration-200" />
              </button>
              <button
                onClick={handleNext}
                className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center group transition-all duration-200"
              >
                <ArrowRightIcon className="text-gray-600 group-hover:text-gray-800 group-hover:scale-110 transition-all duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fetch clients
  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('td_client')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchClients();
    }
  }, [isSignedIn]);

  // Filter clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact_number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.client_name.trim()) {
      alert('Client name is required');
      return;
    }

    setLoading(true);

    try {
      if (editingClient) {
        const { error } = await supabase
          .from('td_client')
          .update(formData)
          .eq('id', editingClient.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('td_client')
          .insert([formData]);
        if (error) throw error;
      }

      resetForm();
      fetchClients();
    } catch (error) {
      console.error('Error saving client:', error);
      alert('Error saving client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      client_name: '',
      street: '',
      area: '',
      country: 'India',
      state: '',
      city: '',
      pin: '',
      contact_number: '',
      email_address: '',
      website: '',
      profile: '',
      status: 'Active Client'
    });
    setShowAddClient(false);
    setEditingClient(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        const { error } = await supabase
          .from('td_client')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  // Handle edit
  const handleEdit = (client) => {
    setFormData(client);
    setEditingClient(client);
    setShowAddClient(true);
  };

  // Dark Theme Testimonials Component with Working Navigation
  const TestimonialsWithNavigation = ({ testimonials }) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
      setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
      setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }, []);

    const getRotation = (index) => {
      const rotations = [3, -2, 5, -4, 2, 4];
      return rotations[index % rotations.length];
    };

    return (
      <div className="max-w-sm md:max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center md:justify-end">
            <div className="relative w-56 h-56 md:w-64 md:h-64">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.src}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === active 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-70 scale-95'
                  }`}
                  style={{
                    transform: `rotate(${index === active ? 0 : getRotation(index)}deg) translateY(${
                      index === active ? 0 : 20
                    }px)`,
                    zIndex: index === active ? 999 : testimonials.length + 2 - index
                  }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="w-full h-full object-cover object-center rounded-full shadow-xl border-4 border-white"
                    style={{ 
                      objectPosition: 'center center',
                      transform: 'scale(1.2)'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-center space-y-6 md:pl-6">
            <div
              key={active}
              className="transition-all duration-300 ease-in-out"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {testimonials[active].name}
              </h3>
              <p className="text-base text-blue-300 mb-6 font-medium">
                {testimonials[active].designation}
              </p>
              <div className="max-h-48 md:max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-thumb-opacity-20">
                <p className="text-base md:text-lg text-gray-100 leading-relaxed">
                  {testimonials[active].quote}
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <button
                onClick={handlePrev}
                className="h-12 w-12 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm flex items-center justify-center group transition-all duration-200 border border-white border-opacity-20"
              >
                <ArrowLeftIcon className="text-white group-hover:scale-110 transition-all duration-200" />
              </button>
              <button
                onClick={handleNext}
                className="h-12 w-12 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm flex items-center justify-center group transition-all duration-200 border border-white border-opacity-20"
              >
                <ArrowRightIcon className="text-white group-hover:scale-110 transition-all duration-200" />
              </button>
              <div className="ml-4 flex space-x-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === active ? 'bg-white' : 'bg-white bg-opacity-30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Landing Page with New Hero Section
  const LandingPage = () => (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-screen flex flex-col items-center px-6 sm:px-8 md:px-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}></div>
        <GradientBars />
        <HeroNavbar />
        
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen py-16">
          <div className="mb-8">
            <TrustElements />
          </div>
          
          <h1 className="w-full text-white leading-tight tracking-tight mb-8 px-4">
            <span className="block font-bold text-4xl sm:text-6xl md:text-7xl whitespace-nowrap">
              Connecting Top Talent
            </span>
            <span className="block font-light text-4xl sm:text-6xl md:text-7xl mt-4" style={{ color: '#FF4500' }}>
              with Visionary Companies
            </span>
          </h1>
          
          <div className="w-full max-w-2xl mb-8 px-4">
            <ContactForm />
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.741-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <main className="relative">
        {/* Testimonials Section with Dark Theme */}
        <section className="relative min-h-screen flex flex-col items-center px-6 sm:px-8 md:px-12 py-24">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #001122 0%, #003566 50%, #001122 100%)' }}></div>
          <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
            <div className="flex h-full w-full">
              {Array.from({ length: 12 }, (_, index) => (
                <div
                  key={index}
                  className="animate-pulse"
                  style={{
                    width: '8.33%',
                    height: '100%',
                    background: 'linear-gradient(to top, #FF4500, transparent)',
                    transform: `scaleY(${0.3 + Math.sin(index * 0.5) * 0.4})`,
                    transformOrigin: 'bottom',
                    animationDelay: `${index * 150}ms`,
                    animationDuration: '3s',
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Dedicated professionals driving success in talent acquisition and HR excellence
              </p>
            </div>
            
            <TestimonialsWithNavigation testimonials={testimonials} />
          </div>
        </section>

        {/* Features Bento Grid Section */}
        <section className="relative py-24 px-6 sm:px-8 md:px-12">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #003566 0%, #001a33 50%, #003566 100%)' }}></div>
          <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
            <div className="flex h-full w-full">
              {Array.from({ length: 10 }, (_, index) => {
                // Fixed scale values to avoid hydration mismatch
                const scaleValues = [0.3, 0.5, 0.2, 0.7, 0.4, 0.6, 0.35, 0.45, 0.25, 0.55];
                return (
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
                );
              })}
            </div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose Talent Discovery
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Discover our story, expertise, and the events that shape our success in talent acquisition
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 border border-white border-opacity-20 rounded-xl overflow-hidden backdrop-blur-sm">
              {/* Why Work With Us Video - Large */}
              <div className="col-span-1 md:col-span-4 p-6 md:p-8 border-b md:border-r border-white border-opacity-20 bg-white bg-opacity-5">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Why Work With Us
                </h3>
                <p className="text-sm md:text-base text-gray-300 mb-4 max-w-sm">
                  Discover what sets Talent Discovery apart in the recruitment industry
                </p>
                <div className="h-64 md:h-80 bg-black bg-opacity-30 rounded-lg relative overflow-hidden border border-white border-opacity-10">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    style={{ backgroundColor: '#003566' }}
                  >
                    <source src="./work.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Industry Events Gallery */}
              <div className="col-span-1 md:col-span-2 p-6 md:p-8 border-b border-white border-opacity-20 bg-white bg-opacity-5">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Industry Events
                </h3>
                <p className="text-sm md:text-base text-gray-300 mb-4">
                  Leading discussions at major HR and recruitment conferences
                </p>
                <div className="grid grid-cols-2 gap-2 h-64 md:h-80">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={`relative overflow-hidden rounded-lg border border-white border-opacity-20 ${i <= 2 ? 'row-span-2' : ''}`}>
                      <img
                        src={`https://images.unsplash.com/photo-${
                          [
                            '1591115765373-5707e3c65dc', // conference
                            '1540575467063-178a50c2df87', // business meeting
                            '1552664730-d307ca884978', // presentation
                            '1559136555-f0a6dc0cbb75', // networking
                            '1543269664-647a35bb5c5', // conference hall
                            '1582213782179-d3b4d2a27328' // business event
                          ][i-1]
                        }?w=400&h=300&fit=crop&auto=format`}
                        alt={`Industry Event ${i}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Journey Video */}
              <div className="col-span-1 md:col-span-3 p-6 md:p-8 border-b md:border-r md:border-b-0 border-white border-opacity-20 bg-white bg-opacity-5">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Our Journey Through Time
                </h3>
                <p className="text-sm md:text-base text-gray-300 mb-4 max-w-sm">
                  From startup to industry leader - the Talent Discovery story
                </p>
                <div className="h-56 md:h-64 bg-black bg-opacity-30 rounded-lg relative overflow-hidden border border-white border-opacity-10">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    style={{ backgroundColor: '#003566' }}
                  >
                    <source src="./story.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Client Success Events */}
              <div className="col-span-1 md:col-span-3 p-6 md:p-8 bg-white bg-opacity-5">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Client Success Stories
                </h3>
                <p className="text-sm md:text-base text-gray-300 mb-4">
                  Celebrating milestones and achievements with our valued clients
                </p>
                <div className="space-y-2 h-56 md:h-64 overflow-hidden">
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="relative flex-1 h-24 md:h-28 overflow-hidden rounded-lg transform hover:scale-105 transition-transform duration-300 border border-white border-opacity-20" style={{ transform: `rotate(${(i-2) * 2}deg)` }}>
                        <img
                          src={`https://images.unsplash.com/photo-${
                            [
                              '1551434678-e076c223a692', // handshake
                              '1557804506-669a67965ba0', // team success
                              '1600880292089-90a7e086ee0c' // business celebration
                            ][i-1]
                          }?w=400&h=200&fit=crop&auto=format`}
                          alt={`Success Story ${i}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2 -ml-4">
                    {[4, 5, 6].map((i) => (
                      <div key={i} className="relative flex-1 h-24 md:h-28 overflow-hidden rounded-lg transform hover:scale-105 transition-transform duration-300 border border-white border-opacity-20" style={{ transform: `rotate(${(i-5) * -2}deg)` }}>
                        <img
                          src={`https://images.unsplash.com/photo-${
                            [
                              '1521791136064-963d91ecbb73', // office meeting
                              '1553877522-43269d4ea984', // professional discussion
                              '1507003211169-0a1dd7228f2d' // business professional
                            ][i-4]
                          }?w=400&h=200&fit=crop&auto=format`}
                          alt={`Success Story ${i}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2025 Talent Discovery. All rights reserved. | Women-led recruitment boutique firm.
          </p>
        </div>
      </footer>
    </div>
  );

  // Dashboard Components
  const Dashboard = () => (
    <div className="space-y-8">
      <div className="rounded-xl p-8 text-white" style={{ background: 'linear-gradient(135deg, #003566 0%, #00203D 100%)' }}>
        <h1 className="text-3xl font-bold mb-2">Welcome to Talent Discovery</h1>
        <p className="text-lg opacity-90">
          Connecting top talent with visionary companies for unstoppable growth together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#CCE6FF' }}>
              <UsersIcon style={{ color: '#003566' }} />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
              <p className="text-sm text-gray-500">Total Clients</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFDACC' }}>
              <UserIcon style={{ color: '#FF4500' }} />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {clients.filter(c => c.status === 'Active Client').length}
              </p>
              <p className="text-sm text-gray-500">Active Clients</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-lg">
              <BriefcaseIcon className="text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">Open Jobs</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <UserIcon className="text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">Candidates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Clients</h3>
          </div>
          <div className="p-6">
            {clients.slice(0, 5).map((client) => (
              <div key={client.id} className="flex items-center py-4 border-b border-gray-100 last:border-b-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: '#003566' }}>
                  {client.client_name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 ml-4">
                  <p className="font-medium text-gray-900">{client.client_name}</p>
                  <p className="text-sm text-gray-500">{client.email_address}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  client.status === 'Active Client' ? 'bg-green-400' : 'bg-gray-300'
                }`}></div>
              </div>
            ))}
            {clients.length === 0 && (
              <div className="text-center py-12">
                <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No clients yet</p>
                <p className="text-sm text-gray-400 mb-4">Add your first client to get started</p>
                <button
                  onClick={() => {
                    setActiveTab('client');
                    setShowAddClient(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Your First Client
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-4">
            <button
              onClick={() => {
                setActiveTab('client');
                setShowAddClient(true);
              }}
              className="w-full text-white p-4 rounded-lg flex items-center space-x-3 hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#FF4500' }}
            >
              <PlusIcon />
              <span className="font-medium">Add New Client</span>
            </button>
            
            <button className="w-full bg-gray-50 text-gray-700 p-4 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors border border-gray-200">
              <BriefcaseIcon />
              <span className="font-medium">Post New Job</span>
            </button>
            
            <button className="w-full bg-gray-50 text-gray-700 p-4 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors border border-gray-200">
              <CalendarIcon />
              <span className="font-medium">Schedule Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ClientsView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your client relationships</p>
        </div>
        <button
          onClick={() => setShowAddClient(true)}
          className="mt-4 sm:mt-0 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors flex items-center font-medium"
          style={{ backgroundColor: '#FF4500' }}
        >
          <PlusIcon className="mr-2" />
          Add Client
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name, email, or phone..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Active Client">Active</option>
              <option value="In - Active Client">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse">
              <div className="w-14 h-14 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <UsersIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || statusFilter !== 'all' ? 'No clients found' : 'No clients yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Get started by adding your first client'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button
              onClick={() => setShowAddClient(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Your First Client
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {client.client_name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(client)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-lg">{client.client_name}</h3>
                {client.email_address && (
                  <p className="text-sm text-gray-600 flex items-center">
                    <MailIcon className="w-4 h-4 mr-2 opacity-60" />
                    {client.email_address}
                  </p>
                )}
                {client.contact_number && (
                  <p className="text-sm text-gray-600 flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2 opacity-60" />
                    {client.contact_number}
                  </p>
                )}
                {(client.city || client.state) && (
                  <p className="text-sm text-gray-600 flex items-center">
                    <LocationIcon className="w-4 h-4 mr-2 opacity-60" />
                    {[client.city, client.state].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  client.status === 'Active Client' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {client.status === 'Active Client' ? 'Active' : 'Inactive'}
                </span>
                {client.website && (
                  <a 
                    href={`http://${client.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const ComingSoon = (title) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">⏳</span>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title} Coming Soon</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        This feature is currently under development. We're working hard to bring you the best experience.
      </p>
    </div>
  );

  // Main App Layout
  const AppLayout = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 mr-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="h-8 flex items-center">
                <img src="/logo.png" alt="Talent Discovery" className="h-6 w-auto" />
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900">Talent Discovery</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5 5-5-5h5z" />
                </svg>
              </button>
              <button
                onClick={() => setIsSignedIn(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className={`${sidebarOpen ? 'w-64' : 'w-16'} lg:w-64 bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed lg:static z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'text-white border-r-2'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      style={isActive ? {
                        backgroundColor: '#003566',
                        borderRightColor: '#FF4500'
                      } : {}}
                    >
                      <Icon className="flex-shrink-0" />
                      <span className={`ml-3 font-medium ${!sidebarOpen && 'lg:inline hidden'}`}>
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 p-4 lg:p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'client' && <ClientsView />}
          {activeTab === 'my-account' && ComingSoon('My Account')}
          {activeTab === 'jobs' && ComingSoon('Jobs')}
          {activeTab === 'candidate' && ComingSoon('Candidates')}
          {activeTab === 'interviews' && ComingSoon('Interviews')}
          {activeTab === 'testimonials' && ComingSoon('Testimonials')}
          {activeTab === 'team' && ComingSoon('Team')}
          {activeTab === 'articles' && ComingSoon('Articles')}
          {activeTab === 'enquiries' && ComingSoon('Enquiries')}
          {activeTab === 'salary-guide' && ComingSoon('Salary Guide')}
        </main>
      </div>

      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {editingClient ? 'Edit Client' : 'Add New Client'}
                  </h3>
                  <p className="text-blue-100 mt-1">
                    {editingClient ? 'Update client information' : 'Fill in the details to add a new client'}
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="text-white text-opacity-80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900">
                  <UserIcon className="mr-3 text-blue-600" />
                  Basic Information
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    value={formData.client_name}
                    onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                    placeholder="Enter client's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900">
                    <LocationIcon className="mr-3 text-blue-600" />
                    Address Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        value={formData.street}
                        onChange={(e) => setFormData({...formData, street: e.target.value})}
                        placeholder="Enter street address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        value={formData.area}
                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                        placeholder="Enter area"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                      >
                        <option value="">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PIN</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          value={formData.pin}
                          onChange={(e) => setFormData({...formData, pin: e.target.value})}
                          placeholder="PIN"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900">
                    <PhoneIcon className="mr-3 text-blue-600" />
                    Contact Details
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        value={formData.contact_number}
                        onChange={(e) => setFormData({...formData, contact_number: e.target.value})}
                        placeholder="Enter contact number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        value={formData.email_address}
                        onChange={(e) => setFormData({...formData, email_address: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                        <span className="inline-flex items-center px-4 text-gray-500 bg-gray-100 text-sm font-medium">
                          http://
                        </span>
                        <input
                          type="text"
                          className="flex-1 px-4 py-3 focus:outline-none bg-white"
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          placeholder="example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900">
                  <DocumentIcon className="mr-3 text-blue-600" />
                  Additional Information
                </h4>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Client Profile</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white"
                      value={formData.profile}
                      onChange={(e) => setFormData({...formData, profile: e.target.value})}
                      placeholder="Brief description about the client..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Client Status</label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="Active Client"
                          checked={formData.status === 'Active Client'}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="mr-3 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700 font-medium">Active</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="In - Active Client"
                          checked={formData.status === 'In - Active Client'}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="mr-3 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700 font-medium">Inactive</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 rounded-b-xl">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-6 py-3 text-white rounded-lg font-medium transition-colors ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Saving...' : editingClient ? 'Update Client' : 'Add Client'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (!isSignedIn) {
    return <LandingPage />;
  }

  return <AppLayout />;
};

export default TalentDiscoveryApp;