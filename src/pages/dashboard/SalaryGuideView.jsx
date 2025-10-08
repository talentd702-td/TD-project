import React, { useState } from 'react';
import { FileText, Upload, Plus, X, Download, Users, Calendar } from 'lucide-react';

export const SalaryGuideView = ({
  guides = [],
  filteredGuides = [],
  downloads = [],
  loading,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  setShowAddGuide,
  handleEdit,
  handleDelete
}) => {
  const [showDownloads, setShowDownloads] = useState(false);
  const [selectedGuideDownloads, setSelectedGuideDownloads] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const getDownloadsForGuide = (guideId) => {
    if (!downloads || !Array.isArray(downloads)) return [];
    return downloads.filter(d => d.salary_guide_id === guideId);
  };

  const viewGuideDownloads = (guide) => {
    setSelectedGuideDownloads(guide);
    setShowDownloads(true);
  };

  // Calculate unique users safely
  const uniqueUsers = downloads && Array.isArray(downloads) 
    ? new Set(downloads.map(d => d.email)).size 
    : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Salary Guide Management</h1>
          <p className="text-gray-600 mt-1">Upload and manage downloadable salary guides</p>
        </div>
        <button
          onClick={() => setShowAddGuide(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Upload New Guide
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Guides</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {guides?.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {downloads?.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unique Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {uniqueUsers}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search guides..."
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
          <select
            value={statusFilter || 'all'}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Guides List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guide
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : !filteredGuides || filteredGuides.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No salary guides found
                  </td>
                </tr>
              ) : (
                filteredGuides.map((guide) => {
                  const guideDownloads = getDownloadsForGuide(guide.id);
                  return (
                    <tr key={guide.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{guide.title}</p>
                            {guide.description && (
                              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                {guide.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDate(guide.created_at)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{guide.file_name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(guide.file_size)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => viewGuideDownloads(guide)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                        >
                          <Download className="w-4 h-4" />
                          <span className="font-medium">{guideDownloads.length}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            guide.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {guide.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(guide)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleDelete(guide.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Downloads Modal */}
      {showDownloads && selectedGuideDownloads && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Downloads</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedGuideDownloads.title}</p>
              </div>
              <button
                onClick={() => {
                  setShowDownloads(false);
                  setSelectedGuideDownloads(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Downloaded At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getDownloadsForGuide(selectedGuideDownloads.id).map((download) => (
                      <tr key={download.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{download.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{download.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {formatDate(download.downloaded_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryGuideView