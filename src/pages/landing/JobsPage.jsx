import React, { useState } from 'react';

export const JobsPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Leading Technology Firm',
      location: 'Bangalore',
      type: 'Full-time',
      mode: 'Remote',
      experience: '8-12 Years',
      industry: 'Technology'
    },
    {
      id: 2,
      title: 'Financial Analyst',
      company: 'Global Investment Bank',
      location: 'Mumbai',
      type: 'Full-time',
      mode: 'On-site',
      experience: '4-6 Years',
      industry: 'Financial Services'
    },
    {
      id: 3,
      title: 'HR Business Partner',
      company: 'Fortune 500 Company',
      location: 'Delhi NCR',
      type: 'Full-time',
      mode: 'Hybrid',
      experience: '6-10 Years',
      industry: 'Technology'
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching:', { searchKeyword, industry, location });
  };

  const getBadgeColor = (type) => {
    const colors = {
      'Full-time': 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      'Remote': 'bg-green-500/20 text-green-300 border-green-400/30',
      'On-site': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      'Hybrid': 'bg-green-500/20 text-green-300 border-green-400/30'
    };
    return colors[type] || 'bg-purple-500/20 text-purple-300 border-purple-400/30';
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">Current Openings</h2>
            <div className="w-20 h-0.5 bg-orange-400 mx-auto mb-3"></div>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              Explore exciting career opportunities across industries
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/10 mb-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Job title or keyword"
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/70 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
              />
              <select 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none cursor-pointer transition-all"
              >
                <option value="" className="bg-gray-900">All Industries</option>
                <option value="financial" className="bg-gray-900">Financial Services</option>
                <option value="technology" className="bg-gray-900">Technology</option>
                <option value="life-sciences" className="bg-gray-900">Life Sciences</option>
                <option value="retail" className="bg-gray-900">Retail & E-commerce</option>
              </select>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none cursor-pointer transition-all"
              >
                <option value="" className="bg-gray-900">All Locations</option>
                <option value="mumbai" className="bg-gray-900">Mumbai</option>
                <option value="delhi" className="bg-gray-900">Delhi NCR</option>
                <option value="bangalore" className="bg-gray-900">Bangalore</option>
                <option value="pune" className="bg-gray-900">Pune</option>
              </select>
              <button 
                type="submit"
                className="text-white px-6 py-2.5 rounded-lg hover:scale-[1.02] transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/30" 
                style={{ backgroundColor: '#FF4500' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Jobs
              </button>
            </div>
          </form>

          {/* Job Listings */}
          <div className="space-y-4 mb-10">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="group bg-white/5 backdrop-blur-xl p-5 md:p-6 rounded-xl border border-white/10 hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-300 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {job.company}
                          <span className="text-gray-400">•</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(job.type)}`}>
                        {job.type}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(job.mode)}`}>
                        {job.mode}
                      </span>
                      <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-400/30">
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="px-5 py-2.5 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all font-medium text-sm hover:scale-105">
                      View Details
                    </button>
                    <button className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium text-sm hover:scale-105 shadow-lg hover:shadow-orange-500/30">
                      Quick Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl p-8 text-center border border-white/10 shadow-2xl">
            <svg className="w-16 h-16 mx-auto mb-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">
              Don't See the Right Opportunity?
            </h3>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm">
              Submit your profile for future openings and we'll match you with the perfect role.
            </p>
            <button className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all font-semibold text-sm hover:scale-105 shadow-xl">
              Submit Confidential Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
