import React, { useState } from 'react';

export const InsightsPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">Insights & Resources</h2>
            <div className="w-20 h-0.5 bg-orange-400 mx-auto mb-3"></div>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              Stay informed with our latest industry insights and reports
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Blog Card */}
            <div className="group bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 bg-blue-500/30 backdrop-blur-sm text-blue-100 rounded-full text-xs font-semibold border border-blue-300/30">
                    Blog
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-400 mb-2">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>5 min read</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  Top Hiring Trends for 2025
                </h3>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  Explore the emerging trends shaping the recruitment landscape in the coming year.
                </p>
                <a href="#" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Read More 
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Report Card */}
            <div className="group bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="h-40 bg-gradient-to-br from-purple-500 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 bg-purple-500/30 backdrop-blur-sm text-purple-100 rounded-full text-xs font-semibold border border-purple-300/30">
                    Report
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-400 mb-2">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  Salary Guide 2025
                </h3>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  Comprehensive compensation benchmarks across industries and roles.
                </p>
                <button className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Download Guide
                  <svg className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Webinar Card */}
            <div className="group bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="h-40 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 bg-orange-500/30 backdrop-blur-sm text-orange-100 rounded-full text-xs font-semibold border border-orange-300/30">
                    Webinar
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-400 mb-2">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>45 minutes</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                  Building High-Performance Teams
                </h3>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  Expert insights on creating and scaling exceptional teams in modern organizations.
                </p>
                <a href="#" className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                  Watch Now
                  <svg className="w-4 h-4 ml-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 md:p-10 text-center text-white shadow-2xl border border-blue-400/20">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Get Exclusive Insights Delivered to Your Inbox
            </h3>
            <p className="text-sm text-blue-100 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter for the latest trends, reports, and expert advice in talent acquisition.
            </p>
            
            {subscribed ? (
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-200 px-6 py-3 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Successfully subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-5 py-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all font-semibold text-sm disabled:opacity-50 hover:scale-105 transform"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
