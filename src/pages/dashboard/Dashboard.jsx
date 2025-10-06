import React from 'react';
import { UsersIcon, UserIcon, BriefcaseIcon, PlusIcon, CalendarIcon } from '../../components/common/Icons';

export const Dashboard = ({ clients, setActiveTab, setShowAddClient }) => (
  <div className="space-y-8">
    <div className="rounded-xl p-8 text-white" style={{ background: 'linear-gradient(135deg, #003566 0%, #00203D 100%)' }}>
      <h1 className="text-3xl font-bold mb-2">Welcome to Talent Discovery</h1>
      <p className="text-lg opacity-90">
        Connecting top talent with visionary companies for unstoppable growth together.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#CCE6FF' }}>
            <UsersIcon style={{ color: '#003566' }} />
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
            <p className="text-sm text-gray-500">Total Clients</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFDACC' }}>
            <UserIcon style={{ color: '#FF4500' }} />
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-gray-900">
              {clients.filter(c => c.status === 'Active Client').length}
            </p>
            <p className="text-sm text-gray-500">Active Clients</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-3 bg-amber-100 rounded-lg">
            <BriefcaseIcon className="text-amber-600" />
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500">Open Jobs</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-3 bg-purple-100 rounded-lg">
            <UserIcon className="text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500">Candidates</p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Clients</h3>
        </div>
        <div className="p-6">
          {clients.slice(0, 5).map((client) => (
            <div key={client.id} className="flex items-center py-4 border-b border-gray-100 last:border-b-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: '#003566' }}>
                {client.client_name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1 ml-4">
                <p className="font-medium text-gray-900">{client.client_name}</p>
                <p className="text-sm text-gray-500">{client.email_address}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                client.status === 'Active Client' ? 'bg-green-400' : 'bg-gray-300'
              }`}></div>
            </div>
          ))}
          {clients.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No clients yet</p>
              <p className="text-sm text-gray-400 mb-4">Add your first client to get started</p>
              <button
                onClick={() => {
                  setActiveTab('client');
                  setShowAddClient(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Your First Client
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6 space-y-4">
          <button
            onClick={() => {
              setActiveTab('client');
              setShowAddClient(true);
            }}
            className="w-full text-white p-4 rounded-lg flex items-center space-x-3 hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#FF4500' }}
          >
            <PlusIcon />
            <span className="font-medium">Add New Client</span>
          </button>

          <button className="w-full bg-gray-50 text-gray-700 p-4 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors border border-gray-200">
            <BriefcaseIcon />
            <span className="font-medium">Post New Job</span>
          </button>

          <button className="w-full bg-gray-50 text-gray-700 p-4 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors border border-gray-200">
            <CalendarIcon />
            <span className="font-medium">Schedule Interview</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);