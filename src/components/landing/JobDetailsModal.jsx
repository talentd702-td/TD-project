import React from 'react';
import { X, Briefcase, MapPin, Clock, DollarSign, Building, Calendar, Users } from 'lucide-react';

export const JobDetailsModal = ({ isOpen, onClose, job, onApply }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{job.job_title}</h3>
                  {job.td_client && (
                    <p className="text-sm text-white/90">{job.td_client.client_name}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {(job.city || job.state) && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">
                      {[job.city, job.state].filter(Boolean).join(', ')}
                    </p>
                  </div>
                </div>
              )}

              {job.employment_type && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Employment Type</p>
                    <p className="text-sm font-medium text-gray-900">{job.employment_type}</p>
                  </div>
                </div>
              )}

              {job.experience_required && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Experience Required</p>
                    <p className="text-sm font-medium text-gray-900">{job.experience_required}</p>
                  </div>
                </div>
              )}

              {job.salary_range && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Salary Range</p>
                    <p className="text-sm font-medium text-gray-900">{job.salary_range}</p>
                  </div>
                </div>
              )}

              {job.created_at && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Posted On</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(job.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              )}

              {job.status && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Building className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium text-gray-900">{job.status}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Job Description */}
            {job.job_description && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h4>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {job.job_description}
                  </p>
                </div>
              </div>
            )}

            {/* Skills Required */}
            {job.skills_required && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills_required.split(',').map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Responsibilities</h4>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {job.responsibilities}
                  </p>
                </div>
              </div>
            )}

            {/* Qualifications */}
            {job.qualifications && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Qualifications</h4>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {job.qualifications}
                  </p>
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h4>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {job.benefits}
                  </p>
                </div>
              </div>
            )}

            {/* Additional Info */}
            {job.additional_info && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h4>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {job.additional_info}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(job);
              }}
              className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium shadow-lg"
            >
              Apply for this Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;