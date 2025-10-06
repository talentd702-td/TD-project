"use client";

import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/landing/LandingPage';
import { AppLayout } from './pages/dashboard/AppLayout';
import { useClientManagement } from './hooks/useClientManagement';

const TalentDiscoveryApp = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const {
    clients,
    filteredClients,
    loading,
    showAddClient,
    setShowAddClient,
    editingClient,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    formData,
    setFormData,
    fetchClients,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm
  } = useClientManagement();

  useEffect(() => {
    if (isSignedIn) {
      fetchClients();
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return <LandingPage setIsSignedIn={setIsSignedIn} />;
  }

  return (
    <AppLayout
      clients={clients}
      filteredClients={filteredClients}
      loading={loading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      showAddClient={showAddClient}
      setShowAddClient={setShowAddClient}
      editingClient={editingClient}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      resetForm={resetForm}
      setIsSignedIn={setIsSignedIn}
    />
  );
};

export default TalentDiscoveryApp;