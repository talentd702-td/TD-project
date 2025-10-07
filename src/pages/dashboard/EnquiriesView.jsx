import React, { useState } from 'react';
import {
  SearchIcon,
  MailIcon,
  PhoneIcon,
  DeleteIcon,
  DocumentIcon,
} from '../../components/common/Icons';

export const EnquiriesView = ({
  enquiries = [],
  filteredEnquiries = [],
  loading = false,
  searchTerm = '',
  setSearchTerm = () => {},
  statusFilter = 'all',
  setStatusFilter = () => {},
  typeFilter = 'all',
  setTypeFilter = () => {},
  updateEnquiryStatus = () => {},
  updateEnquiryNotes = () => {},
  handleDelete = () => {},
}) => {
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [notes, setNotes] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEnquiryTypeLabel = (type) => {
    const labels = {
      'hiring': 'Hiring Services',
      'job': 'Job Opportunity',
      'partnership': 'Partnership',
      'media': 'Media Enquiry',
      'general': 'General Question'
    };
    return labels[type] || type;
  };

  const handleViewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setNotes(enquiry.notes || '');
  };

  const handleSaveNotes = async () => {
    if (selectedEnquiry) {
      await updateEnquiryNotes(selectedEnquiry.id, notes);
      setSelectedEnquiry(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and respond to customer enquiries</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-2xl font-bold text-gray-900">{enquiries.length}</span>
          <span className="text-sm text-gray-500 ml-2">Total Enquiries</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, company, or message..."
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
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="hiring">Hiring Services</option>
              <option value="job">Job Opportunity</option>
              <option value="partnership">Partnership</option>
              <option value="media">Media Enquiry</option>
              <option value="general">General Question</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        // Skeleton loading
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (filteredEnquiries?.length ?? 0) === 0 ? (
        // Empty state
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MailIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' ? 'No enquiries found' : 'No enquiries yet'}
          </h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Enquiries from your contact form will appear here'}
          </p>
        </div>
      ) : (
        // Enquiry cards
        <div className="space-y-4">
          {filteredEnquiries?.map((enquiry) => (
            <div
              key={enquiry.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg flex-shrink-0">
                    {enquiry.full_name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg">{enquiry.full_name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <MailIcon className="w-4 h-4 mr-1 opacity-60" />
                        {enquiry.email}
                      </span>
                      {enquiry.phone && (
                        <span className="flex items-center">
                          <PhoneIcon className="w-4 h-4 mr-1 opacity-60" />
                          {enquiry.phone}
                        </span>
                      )}
                      {enquiry.company_name && (
                        <span className="text-gray-500">• {enquiry.company_name}</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(enquiry.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                >
                  <DeleteIcon />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 text-sm line-clamp-2">{enquiry.message}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    {getEnquiryTypeLabel(enquiry.enquiry_type)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      enquiry.status === 'New'
                        ? 'bg-green-100 text-green-800'
                        : enquiry.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : enquiry.status === 'Resolved'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {enquiry.status}
                  </span>
                  <span className="text-xs text-gray-500">{formatDate(enquiry.created_at)}</span>
                </div>
                <div className="flex gap-2">
                  <select
                    value={enquiry.status}
                    onChange={(e) => updateEnquiryStatus(enquiry.id, e.target.value)}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <button
                    onClick={() => handleViewDetails(enquiry)}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Enquiry Details</h3>
                  <p className="text-blue-100 mt-1">#{selectedEnquiry.id.substring(0, 8)}</p>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-white text-opacity-80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <p className="text-gray-900 font-semibold">{selectedEnquiry.full_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p className="text-gray-900">{selectedEnquiry.email}</p>
                </div>
                {selectedEnquiry.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <p className="text-gray-900">{selectedEnquiry.phone}</p>
                  </div>
                )}
                {selectedEnquiry.company_name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <p className="text-gray-900">{selectedEnquiry.company_name}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enquiry Type</label>
                  <p className="text-gray-900">{getEnquiryTypeLabel(selectedEnquiry.enquiry_type)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <p className="text-gray-900">{selectedEnquiry.status}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedEnquiry.message}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Internal Notes</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes about this enquiry..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Received</label>
                <p className="text-gray-600 text-sm">{formatDate(selectedEnquiry.created_at)}</p>
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 rounded-b-xl">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiriesView;