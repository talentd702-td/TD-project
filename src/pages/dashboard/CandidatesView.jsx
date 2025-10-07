import React from 'react';
import {
  PlusIcon,
  SearchIcon,
  UserIcon,
  EditIcon,
  DeleteIcon,
  MailIcon,
  PhoneIcon,
  LocationIcon,
  DocumentIcon,
} from '../../components/common/Icons';

export const CandidatesView = ({
  candidates = [],
  filteredCandidates = [],
  loading = false,
  searchTerm = '',
  setSearchTerm = () => {},
  statusFilter = 'all',
  setStatusFilter = () => {},
  setShowAddCandidate = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
}) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Candidate Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your candidate database</p>
      </div>
      <button
        onClick={() => setShowAddCandidate(true)}
        className="mt-4 sm:mt-0 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors flex items-center font-medium"
        style={{ backgroundColor: '#FF4500' }}
      >
        <PlusIcon className="mr-2" />
        Add Candidate
      </button>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates by name, email, phone, or skills..."
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
            <option value="Screening">Screening</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
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
    ) : (filteredCandidates?.length ?? 0) === 0 ? (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <UserIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {searchTerm || statusFilter !== 'all' ? 'No candidates found' : 'No candidates yet'}
        </h3>
        <p className="text-gray-500 mb-6">
          {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filters' : 'Get started by adding your first candidate'}
        </p>
        {!searchTerm && statusFilter === 'all' && (
          <button onClick={() => setShowAddCandidate(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Add Your First Candidate
          </button>
        )}
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates?.map((candidate) => (
          <div key={candidate.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {candidate.full_name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(candidate)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                  <EditIcon />
                </button>
                <button onClick={() => handleDelete(candidate.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50">
                  <DeleteIcon />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg">{candidate.full_name}</h3>
              
              {candidate.current_designation && (
                <p className="text-sm text-gray-600 font-medium">
                  {candidate.current_designation}
                  {candidate.current_company && ` at ${candidate.current_company}`}
                </p>
              )}

              {candidate.email && (
                <p className="text-sm text-gray-600 flex items-center">
                  <MailIcon className="w-4 h-4 mr-2 opacity-60" />
                  {candidate.email}
                </p>
              )}

              {candidate.phone && (
                <p className="text-sm text-gray-600 flex items-center">
                  <PhoneIcon className="w-4 h-4 mr-2 opacity-60" />
                  {candidate.phone}
                </p>
              )}

              {(candidate.city || candidate.state) && (
                <p className="text-sm text-gray-600 flex items-center">
                  <LocationIcon className="w-4 h-4 mr-2 opacity-60" />
                  {[candidate.city, candidate.state].filter(Boolean).join(', ')}
                </p>
              )}

              {candidate.total_experience && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span> {candidate.total_experience}
                </p>
              )}

              {candidate.skills && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {candidate.skills.split(',').slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                      {skill.trim()}
                    </span>
                  ))}
                  {candidate.skills.split(',').length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-full">
                      +{candidate.skills.split(',').length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                candidate.status === 'New' ? 'bg-blue-100 text-blue-800' :
                candidate.status === 'Screening' ? 'bg-yellow-100 text-yellow-800' :
                candidate.status === 'Interviewing' ? 'bg-purple-100 text-purple-800' :
                candidate.status === 'Offered' ? 'bg-orange-100 text-orange-800' :
                candidate.status === 'Hired' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {candidate.status}
              </span>
              {candidate.resume_url && (
                <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors flex items-center">
                  <DocumentIcon className="w-4 h-4 mr-1" />
                  Resume
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default CandidatesView;