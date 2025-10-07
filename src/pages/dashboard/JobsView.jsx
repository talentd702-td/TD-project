import React from 'react';
import {
  PlusIcon,
  SearchIcon,
  BriefcaseIcon,
  EditIcon,
  DeleteIcon,
  LocationIcon,
  ClockIcon,
  DollarIcon,
} from '../../components/common/Icons';

export const JobsView = ({
  jobs = [],
  filteredJobs = [],
  loading = false,
  searchTerm = '',
  setSearchTerm = () => {},
  statusFilter = 'all',
  setStatusFilter = () => {},
  setShowAddJob = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
}) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your job postings and openings</p>
      </div>
      <button
        onClick={() => setShowAddJob(true)}
        className="mt-4 sm:mt-0 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors flex items-center font-medium"
        style={{ backgroundColor: '#FF4500' }}
      >
        <PlusIcon className="mr-2" />
        Post New Job
      </button>
    </div>

    {/* Search & Filter */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, client, location, or skills..."
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
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
      </div>
    </div>

    {/* Content */}
    {loading ? (
      // Skeleton loading
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse"
          >
            <div className="w-14 h-14 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    ) : (filteredJobs?.length ?? 0) === 0 ? (
      // Empty state
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BriefcaseIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {searchTerm || statusFilter !== 'all' ? 'No jobs found' : 'No jobs yet'}
        </h3>
        <p className="text-gray-500 mb-6">
          {searchTerm || statusFilter !== 'all'
            ? 'Try adjusting your search or filters'
            : 'Get started by posting your first job'}
        </p>
        {!searchTerm && statusFilter === 'all' && (
          <button
            onClick={() => setShowAddJob(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Post Your First Job
          </button>
        )}
      </div>
    ) : (
      // Job cards
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs?.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group"
          >
            {/* Header + Actions */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                <BriefcaseIcon />
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(job)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>

            {/* Job info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg">{job.job_title}</h3>
              
              {job.td_client && (
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="font-medium text-blue-600">{job.td_client.client_name}</span>
                </p>
              )}

              {(job.city || job.state) && (
                <p className="text-sm text-gray-600 flex items-center">
                  <LocationIcon className="w-4 h-4 mr-2 opacity-60" />
                  {[job.city, job.state].filter(Boolean).join(', ')}
                </p>
              )}

              {job.employment_type && (
                <p className="text-sm text-gray-600 flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2 opacity-60" />
                  {job.employment_type}
                </p>
              )}

              {job.salary_range && (
                <p className="text-sm text-gray-600 flex items-center">
                  <DollarIcon className="w-4 h-4 mr-2 opacity-60" />
                  {job.salary_range}
                </p>
              )}

              {job.experience_required && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span> {job.experience_required}
                </p>
              )}

              {job.skills_required && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.skills_required.split(',').slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                  {job.skills_required.split(',').length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-full">
                      +{job.skills_required.split(',').length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Status + Deadline */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  job.status === 'Open'
                    ? 'bg-green-100 text-green-800'
                    : job.status === 'Closed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {job.status}
              </span>
              {job.deadline && (
                <span className="text-xs text-gray-500">
                  Due: {new Date(job.deadline).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default JobsView;