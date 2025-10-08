import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';

export const SalaryGuideDownload = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetchActiveGuides();
  }, []);

  const fetchActiveGuides = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('td_salary_guides')
        .select('*')
        .eq('status', 'Active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGuides(data || []);
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadClick = (guide) => {
    setSelectedGuide(guide);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      // Track the download
      const { error } = await supabase
        .from('td_salary_guide_downloads')
        .insert([{
          salary_guide_id: selectedGuide.id,
          name: formData.name,
          email: formData.email
        }]);

      if (error) throw error;

      // Trigger download
      const link = document.createElement('a');
      link.href = selectedGuide.file_url;
      link.download = selectedGuide.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset form
      setFormData({ name: '', email: '' });
      setShowForm(false);
      setSelectedGuide(null);
      
      // Show success message
      alert('Download started! Thank you for your interest.');
    } catch (error) {
      console.error('Error tracking download:', error);
      alert('There was an error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-12 mb-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white">Loading salary guides...</p>
        </div>
      </div>
    );
  }

  if (guides.length === 0) {
    return null; // Don't show section if no guides available
  }

  return (
    <>
      <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 md:p-10 text-white shadow-2xl border border-orange-400/20 mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Download Our Salary Guide
          </h3>
          <p className="text-sm text-orange-100 max-w-2xl mx-auto">
            Get comprehensive salary insights and market trends for your industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">{guide.title}</h4>
                  {guide.description && (
                    <p className="text-sm text-orange-100 mb-3 line-clamp-2">
                      {guide.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-orange-200 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{formatFileSize(guide.file_size)}</span>
                  </div>
                  <button
                    onClick={() => handleDownloadClick(guide)}
                    className="w-full px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-all font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Form Modal */}
      {showForm && selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Download Salary Guide
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedGuide.title}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <p className="text-xs text-gray-500">
                  By downloading, you agree to receive occasional updates from us. You can unsubscribe at any time.
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedGuide(null);
                    setFormData({ name: '', email: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {submitting ? 'Downloading...' : 'Download'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SalaryGuideDownload;