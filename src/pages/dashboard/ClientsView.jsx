import React from 'react';
import {
  PlusIcon,
  SearchIcon,
  UsersIcon,
  EditIcon,
  DeleteIcon,
  MailIcon,
  PhoneIcon,
  LocationIcon,
} from '../../components/common/Icons';

export const ClientsView = ({
  clients = [],
  filteredClients = [],
  loading = false,
  searchTerm = '',
  setSearchTerm = () => {},
  statusFilter = 'all',
  setStatusFilter = () => {},
  setShowAddClient = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
}) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your client relationships</p>
      </div>
      <button
        onClick={() => setShowAddClient(true)}
        className="mt-4 sm:mt-0 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors flex items-center font-medium"
        style={{ backgroundColor: '#FF4500' }}
      >
        <PlusIcon className="mr-2" />
        Add Client
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
              placeholder="Search clients by name, email, or phone..."
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
            <option value="Active Client">Active</option>
            <option value="In - Active Client">Inactive</option>
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
    ) : (filteredClients?.length ?? 0) === 0 ? (
      // Empty state
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <UsersIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {searchTerm || statusFilter !== 'all' ? 'No clients found' : 'No clients yet'}
        </h3>
        <p className="text-gray-500 mb-6">
          {searchTerm || statusFilter !== 'all'
            ? 'Try adjusting your search or filters'
            : 'Get started by adding your first client'}
        </p>
        {!searchTerm && statusFilter === 'all' && (
          <button
            onClick={() => setShowAddClient(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Your First Client
          </button>
        )}
      </div>
    ) : (
      // Client cards
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients?.map((client) => {
          const websiteUrl = client.website?.startsWith('http')
            ? client.website
            : `http://${client.website}`;

          return (
            <div
              key={client.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group"
            >
              {/* Avatar + Actions */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {client.client_name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(client)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>

              {/* Client info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-lg">{client.client_name}</h3>
                {client.email_address && (
                  <p className="text-sm text-gray-600 flex items-center">
                    <MailIcon className="w-4 h-4 mr-2 opacity-60" />
                    {client.email_address}
                  </p>
                )}
                {client.contact_number && (
                  <p className="text-sm text-gray-600 flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2 opacity-60" />
                    {client.contact_number}
                  </p>
                )}
                {(client.city || client.state) && (
                  <p className="text-sm text-gray-600 flex items-center">
                    <LocationIcon className="w-4 h-4 mr-2 opacity-60" />
                    {[client.city, client.state].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>

              {/* Status + Website */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    client.status === 'Active Client'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {client.status === 'Active Client' ? 'Active' : 'Inactive'}
                </span>
                {client.website && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default ClientsView;
