import React from 'react';
import {
  UsersIcon,
  UserIcon,
  BriefcaseIcon,
  MailIcon,
  DocumentIcon,
} from '../../components/common/Icons';

export const Dashboard = ({
  clients = [],
  jobs = [],
  candidates = [],
  articles = [],
  enquiries = [],
  setActiveTab = () => {},
  setShowAddClient = () => {},
  setShowAddJob = () => {},
  setShowAddCandidate = () => {},
}) => {
  const totalClients = clients?.length ?? 0;
  const activeClients = clients?.filter((c) => c?.status === 'Active Client') ?? [];
  const recentClients = clients?.slice(0, 5) ?? [];
  
  // Job stats
  const totalJobs = jobs?.length ?? 0;
  const openJobs = jobs?.filter((j) => j?.status === 'Open') ?? [];
  const recentJobs = jobs?.slice(0, 5) ?? [];

  // Candidate stats
  const totalCandidates = candidates?.length ?? 0;
  const newCandidates = candidates?.filter((c) => c?.status === 'New') ?? [];
  const recentCandidates = candidates?.slice(0, 5) ?? [];

  // Article stats
  const totalArticles = articles?.length ?? 0;
  const publishedArticles = articles?.filter((a) => a?.status === 'Published') ?? [];

  // Enquiry stats
  const totalEnquiries = enquiries?.length ?? 0;
  const newEnquiries = enquiries?.filter((e) => e?.status === 'New') ?? [];

  return (
    <div className="space-y-8">
      <div
        className="rounded-xl p-8 text-white"
        style={{ background: 'linear-gradient(135deg, #003566 0%, #00203D 100%)' }}
      >
        <h1 className="text-3xl font-bold mb-2">Welcome to Talent Discovery</h1>
        <p className="text-lg opacity-90">
          Connecting top talent with visionary companies for unstoppable growth together.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {/* Total Clients */}
        <div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setActiveTab('client')}
        >
          <div className="flex flex-col">
            <div className="p-3 rounded-lg self-start" style={{ backgroundColor: '#CCE6FF' }}>
              <UsersIcon style={{ color: '#003566' }} />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
              <p className="text-sm text-gray-500">Total Clients</p>
            </div>
          </div>
        </div>

        {/* Active Clients */}
        <div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setActiveTab('client')}
        >
          <div className="flex flex-col">
            <div className="p-3 rounded-lg self-start" style={{ backgroundColor: '#FFDACC' }}>
              <UserIcon style={{ color: '#FF4500' }} />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{activeClients.length}</p>
              <p className="text-sm text-gray-500">Active Clients</p>
            </div>
          </div>
        </div>

        {/* Open Jobs */}
        <div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setActiveTab('jobs')}
        >
          <div className="flex flex-col">
            <div className="p-3 bg-amber-100 rounded-lg self-start">
              <BriefcaseIcon style={{ color: '#D97706' }} />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{openJobs.length}</p>
              <p className="text-sm text-gray-500">Open Jobs</p>
            </div>
          </div>
        </div>

        {/* Total Candidates */}
        <div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setActiveTab('candidate')}
        >
          <div className="flex flex-col">
            <div className="p-3 bg-purple-100 rounded-lg self-start">
              <UserIcon style={{ color: '#9333EA' }} />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{totalCandidates}</p>
              <p className="text-sm text-gray-500">Candidates</p>
            </div>
          </div>
        </div>

        {/* Published Articles */}
        <div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setActiveTab('articles')}
        >
          <div className="flex flex-col">
            <div className="p-3 bg-blue-100 rounded-lg self-start">
              <DocumentIcon style={{ color: '#2563EB' }} />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{publishedArticles.length}</p>
              <p className="text-sm text-gray-500">Published Articles</p>
            </div>
          </div>
        </div>

        {/* New Enquiries */}
        <div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setActiveTab('enquiries')}
        >
          <div className="flex flex-col">
            <div className="p-3 bg-green-100 rounded-lg self-start">
              <MailIcon style={{ color: '#16A34A' }} />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{newEnquiries.length}</p>
              <p className="text-sm text-gray-500">New Enquiries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity - Full Width */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          {recentClients.length > 0 || recentJobs.length > 0 || recentCandidates.length > 0 || newEnquiries.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Recent Clients Section */}
                {recentClients.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Recent Clients</h4>
                    {recentClients.slice(0, 3).map((client) => (
                      <div
                        key={client.id}
                        className="flex items-center py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-2"
                        onClick={() => setActiveTab('client')}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                          style={{ backgroundColor: '#003566' }}
                        >
                          {client.client_name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 ml-3">
                          <p className="font-medium text-gray-900 text-sm">{client.client_name}</p>
                          <p className="text-xs text-gray-500">{client.email_address}</p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            client.status === 'Active Client' ? 'bg-green-400' : 'bg-gray-300'
                          }`}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Recent Candidates Section */}
                {recentCandidates.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Recent Candidates</h4>
                    {recentCandidates.slice(0, 3).map((candidate) => (
                      <div
                        key={candidate.id}
                        className="flex items-center py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-2"
                        onClick={() => setActiveTab('candidate')}
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {candidate.full_name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 ml-3">
                          <p className="font-medium text-gray-900 text-sm">{candidate.full_name}</p>
                          <p className="text-xs text-gray-500">
                            {candidate.current_designation || candidate.email}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            candidate.status === 'New'
                              ? 'bg-blue-100 text-blue-800'
                              : candidate.status === 'Screening'
                              ? 'bg-yellow-100 text-yellow-800'
                              : candidate.status === 'Interviewing'
                              ? 'bg-purple-100 text-purple-800'
                              : candidate.status === 'Offered'
                              ? 'bg-orange-100 text-orange-800'
                              : candidate.status === 'Hired'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {candidate.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Recent Jobs Section */}
                {recentJobs.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Recent Jobs</h4>
                    {recentJobs.slice(0, 3).map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-2"
                        onClick={() => setActiveTab('jobs')}
                      >
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <BriefcaseIcon style={{ color: '#D97706' }} />
                        </div>
                        <div className="flex-1 ml-3">
                          <p className="font-medium text-gray-900 text-sm">{job.job_title}</p>
                          <p className="text-xs text-gray-500">
                            {job.td_client?.client_name || 'Unknown Client'}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === 'Open'
                              ? 'bg-green-100 text-green-800'
                              : job.status === 'Closed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Recent Enquiries Section */}
                {newEnquiries.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Recent Enquiries</h4>
                    {newEnquiries.slice(0, 3).map((enquiry) => (
                      <div
                        key={enquiry.id}
                        className="flex items-center py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-2"
                        onClick={() => setActiveTab('enquiries')}
                      >
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-sm">
                          {enquiry.full_name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 ml-3">
                          <p className="font-medium text-gray-900 text-sm">{enquiry.full_name}</p>
                          <p className="text-xs text-gray-500">{enquiry.email}</p>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {enquiry.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No activity yet</p>
              <p className="text-sm text-gray-400 mb-4">Add your first client, job, or candidate to get started</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => {
                    setActiveTab('client');
                    setShowAddClient(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Add Client
                </button>
                <button
                  onClick={() => {
                    setActiveTab('jobs');
                    setShowAddJob(true);
                  }}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
                >
                  Post Job
                </button>
                <button
                  onClick={() => {
                    setActiveTab('candidate');
                    setShowAddCandidate(true);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Add Candidate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;