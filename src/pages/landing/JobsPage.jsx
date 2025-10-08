import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { JobApplicationModal } from '../../components/landing/JobApplicationModal';
import { JobDetailsModal } from '../../components/landing/JobDetailsModal';

export const JobsPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch jobs from database
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('td_jobs')
        .select(`
          *,
          td_client (
            id,
            client_name,
            city,
            state
          )
        `)
        .eq('status', 'Open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllJobs(data || []);
      setFilteredJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setAllJobs([]);
      setFilteredJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on search criteria
  useEffect(() => {
    let filtered = allJobs;

    if (searchKeyword) {
      filtered = filtered.filter(job =>
        job.job_title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.skills_required?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.job_description?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter(job =>
        job.city?.toLowerCase() === location.toLowerCase() ||
        job.state?.toLowerCase() === location.toLowerCase()
      );
    }

    setFilteredJobs(filtered);
  }, [searchKeyword, location, allJobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect above
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowDetailsModal(true);
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const getBadgeColor = (type) => {
    const colors = {
      'Full-time': 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      'Part-time': 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      'Contract': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      'Freelance': 'bg-green-500/20 text-green-300 border-green-400/30',
      'Internship': 'bg-pink-500/20 text-pink-300 border-pink-400/30',
      'Remote': 'bg-green-500/20 text-green-300 border-green-400/30',
      'On-site': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      'Hybrid': 'bg-green-500/20 text-green-300 border-green-400/30'
    };
    return colors[type] || 'bg-gray-500/20 text-gray-300 border-gray-400/30';
  };

  // Get unique locations from jobs for dropdown
  const uniqueLocations = [...new Set(allJobs.flatMap(job => 
    [job.city, job.state].filter(Boolean)
  ))].sort();

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
              Explore {allJobs.length} exciting career opportunities
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/10 mb-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Job title, skills, or keyword"
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/70 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
              />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none cursor-pointer transition-all"
              >
                <option value="" className="bg-gray-900">All Locations</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc} className="bg-gray-900">{loc}</option>
                ))}
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

          {/* Loading State */}
          {loading ? (
            <div className="space-y-4 mb-10">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10 animate-pulse"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-white/10 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-white/10 rounded w-2/3 mb-2"></div>
                      <div className="h-4 bg-white/10 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-white/10 rounded w-20"></div>
                    <div className="h-6 bg-white/10 rounded w-20"></div>
                    <div className="h-6 bg-white/10 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            /* Empty State */
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-12 text-center border border-white/10 mb-10">
              <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {searchKeyword || location ? 'No Jobs Found' : 'No Open Positions'}
              </h3>
              <p className="text-gray-300 mb-6">
                {searchKeyword || location 
                  ? 'Try adjusting your search filters to find more opportunities'
                  : 'Check back soon for new job postings'
                }
              </p>
              {(searchKeyword || location) && (
                <button
                  onClick={() => {
                    setSearchKeyword('');
                    setLocation('');
                  }}
                  className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium text-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            /* Job Listings */
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
                            {job.job_title}
                          </h3>
                          <p className="text-sm text-gray-300 flex items-center gap-2 flex-wrap">
                            {job.td_client && (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {job.td_client.client_name}
                              </>
                            )}
                            {(job.city || job.state) && (
                              <>
                                <span className="text-gray-400">•</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {[job.city, job.state].filter(Boolean).join(', ')}
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Job Description Preview */}
                      {job.job_description && (
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                          {job.job_description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {job.employment_type && (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(job.employment_type)}`}>
                            {job.employment_type}
                          </span>
                        )}
                        {job.experience_required && (
                          <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-400/30">
                            {job.experience_required}
                          </span>
                        )}
                        {job.salary_range && (
                          <span className="px-2.5 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold border border-green-400/30">
                            {job.salary_range}
                          </span>
                        )}
                      </div>

                      {/* Skills */}
                      {job.skills_required && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {job.skills_required.split(',').slice(0, 5).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-xs border border-blue-400/20"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                          {job.skills_required.split(',').length > 5 && (
                            <span className="px-2 py-1 bg-gray-500/10 text-gray-300 rounded text-xs border border-gray-400/20">
                              +{job.skills_required.split(',').length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button 
                        onClick={() => handleViewDetails(job)}
                        className="px-5 py-2.5 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all font-medium text-sm hover:scale-105"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleApply(job)}
                        className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium text-sm hover:scale-105 shadow-lg hover:shadow-orange-500/30"
                      >
                        Quick Apply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results Count */}
          {!loading && filteredJobs.length > 0 && (
            <div className="text-center mb-8">
              <p className="text-gray-300 text-sm">
                Showing <span className="font-semibold text-white">{filteredJobs.length}</span> of{' '}
                <span className="font-semibold text-white">{allJobs.length}</span> open positions
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal 
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedJob(null);
        }}
        job={selectedJob || {}}
        onApply={handleApply}
      />

      {/* Application Modal */}
      <JobApplicationModal 
        isOpen={showApplicationModal}
        onClose={() => {
          setShowApplicationModal(false);
          setSelectedJob(null);
        }}
        job={selectedJob || {}}
      />
    </div>
  );
};

export default JobsPage;