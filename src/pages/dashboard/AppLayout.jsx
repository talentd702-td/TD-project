import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Dashboard } from './Dashboard';
import { ClientsView } from './ClientsView';
import { AddClientModal } from '../../components/dashboard/AddClientModal';
import { ComingSoon } from '../../components/common/ComingSoon';

export const AppLayout = ({ 
  clients,
  filteredClients,
  loading,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  showAddClient,
  setShowAddClient,
  editingClient,
  formData,
  setFormData,
  handleSubmit,
  handleEdit,
  handleDelete,
  resetForm,
  setIsSignedIn
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        setIsSignedIn={setIsSignedIn}
      />

      <div className="flex">
        <Sidebar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 p-4 lg:p-8">
          {activeTab === 'dashboard' && (
            <Dashboard 
              clients={clients}
              setActiveTab={setActiveTab}
              setShowAddClient={setShowAddClient}
            />
          )}
          {activeTab === 'client' && (
            <ClientsView 
              clients={clients}
              filteredClients={filteredClients}
              loading={loading}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              setShowAddClient={setShowAddClient}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
          {activeTab === 'my-account' && <ComingSoon title="My Account" />}
          {activeTab === 'jobs' && <ComingSoon title="Jobs" />}
          {activeTab === 'candidate' && <ComingSoon title="Candidates" />}
          {activeTab === 'interviews' && <ComingSoon title="Interviews" />}
          {activeTab === 'testimonials' && <ComingSoon title="Testimonials" />}
          {activeTab === 'team' && <ComingSoon title="Team" />}
          {activeTab === 'articles' && <ComingSoon title="Articles" />}
          {activeTab === 'enquiries' && <ComingSoon title="Enquiries" />}
          {activeTab === 'salary-guide' && <ComingSoon title="Salary Guide" />}
        </main>
      </div>

      <AddClientModal 
        showAddClient={showAddClient}
        editingClient={editingClient}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
    </div>
  );
};