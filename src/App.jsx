"use client";

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import { SignInPage } from './pages/landing/SignInPage';
import { AppLayout } from './pages/dashboard/AppLayout';
import { useClientManagement } from './hooks/useClientManagement';
import { useJobManagement } from './hooks/useJobManagement';
import { useCandidateManagement } from './hooks/useCandidateManagement';
import { useArticleManagement } from './hooks/useArticleManagement';
import { useEnquiryManagement } from './hooks/useEnquiryManagement';
import { useSalaryGuideManagement } from './hooks/useSalaryGuideManagement';



const TalentDiscoveryApp = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Client Management
  const clientManagement = useClientManagement();

  // Job Management
  const jobManagement = useJobManagement();

  // Candidate Management
  const candidateManagement = useCandidateManagement();

  // Article Management
  const articleManagement = useArticleManagement();

  // Enquiry Management
  const enquiryManagement = useEnquiryManagement();

  // Salary Guide Management
  const salaryGuideManagement = useSalaryGuideManagement();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const adminUser = localStorage.getItem('admin_user');
      if (adminUser) {
        setIsSignedIn(true);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('admin_user');
    setIsSignedIn(false);
  };

  // Fetch data when signed in
  useEffect(() => {
    if (isSignedIn) {
      clientManagement.fetchClients();
      jobManagement.fetchJobs();
      jobManagement.fetchClients();
      candidateManagement.fetchCandidates();
      articleManagement.fetchArticles();
      enquiryManagement.fetchEnquiries();
      salaryGuideManagement.fetchGuides();
      salaryGuideManagement.fetchDownloads();
    }
  }, [isSignedIn]);

  // Show loading screen while checking session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={!isSignedIn ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/signin" element={!isSignedIn ? <SignInPage setIsSignedIn={setIsSignedIn} /> : <Navigate to="/dashboard" replace />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isSignedIn ? (
              <AppLayout
                // Client props
                clients={clientManagement.clients}
                filteredClients={clientManagement.filteredClients}
                clientsLoading={clientManagement.loading}
                clientSearchTerm={clientManagement.searchTerm}
                setClientSearchTerm={clientManagement.setSearchTerm}
                clientStatusFilter={clientManagement.statusFilter}
                setClientStatusFilter={clientManagement.setStatusFilter}
                showAddClient={clientManagement.showAddClient}
                setShowAddClient={clientManagement.setShowAddClient}
                editingClient={clientManagement.editingClient}
                clientFormData={clientManagement.formData}
                setClientFormData={clientManagement.setFormData}
                handleClientSubmit={clientManagement.handleSubmit}
                handleClientEdit={clientManagement.handleEdit}
                handleClientDelete={clientManagement.handleDelete}
                resetClientForm={clientManagement.resetForm}
                
                // Job props
                jobs={jobManagement.jobs}
                filteredJobs={jobManagement.filteredJobs}
                activeClients={jobManagement.clients}
                jobsLoading={jobManagement.loading}
                jobSearchTerm={jobManagement.searchTerm}
                setJobSearchTerm={jobManagement.setSearchTerm}
                jobStatusFilter={jobManagement.statusFilter}
                setJobStatusFilter={jobManagement.setStatusFilter}
                showAddJob={jobManagement.showAddJob}
                setShowAddJob={jobManagement.setShowAddJob}
                editingJob={jobManagement.editingJob}
                jobFormData={jobManagement.formData}
                setJobFormData={jobManagement.setFormData}
                handleJobSubmit={jobManagement.handleSubmit}
                handleJobEdit={jobManagement.handleEdit}
                handleJobDelete={jobManagement.handleDelete}
                resetJobForm={jobManagement.resetForm}

                // Candidate props
                candidates={candidateManagement.candidates}
                filteredCandidates={candidateManagement.filteredCandidates}
                candidatesLoading={candidateManagement.loading}
                candidateSearchTerm={candidateManagement.searchTerm}
                setCandidateSearchTerm={candidateManagement.setSearchTerm}
                candidateStatusFilter={candidateManagement.statusFilter}
                setCandidateStatusFilter={candidateManagement.setStatusFilter}
                showAddCandidate={candidateManagement.showAddCandidate}
                setShowAddCandidate={candidateManagement.setShowAddCandidate}
                editingCandidate={candidateManagement.editingCandidate}
                candidateFormData={candidateManagement.formData}
                setCandidateFormData={candidateManagement.setFormData}
                uploadingResume={candidateManagement.uploadingResume}
                handleCandidateSubmit={candidateManagement.handleSubmit}
                handleCandidateEdit={candidateManagement.handleEdit}
                handleCandidateDelete={candidateManagement.handleDelete}
                resetCandidateForm={candidateManagement.resetForm}

                // Article props
                articles={articleManagement.articles}
                filteredArticles={articleManagement.filteredArticles}
                articlesLoading={articleManagement.loading}
                articleSearchTerm={articleManagement.searchTerm}
                setArticleSearchTerm={articleManagement.setSearchTerm}
                articleStatusFilter={articleManagement.statusFilter}
                setArticleStatusFilter={articleManagement.setStatusFilter}
                showAddArticle={articleManagement.showAddArticle}
                setShowAddArticle={articleManagement.setShowAddArticle}
                editingArticle={articleManagement.editingArticle}
                articleFormData={articleManagement.formData}
                setArticleFormData={articleManagement.setFormData}
                uploadingImage={articleManagement.uploadingImage}
                handleArticleSubmit={articleManagement.handleSubmit}
                handleArticleEdit={articleManagement.handleEdit}
                handleArticleDelete={articleManagement.handleDelete}
                resetArticleForm={articleManagement.resetForm}
                generateSlug={articleManagement.generateSlug}

                // Enquiry props
                enquiries={enquiryManagement.enquiries}
                filteredEnquiries={enquiryManagement.filteredEnquiries}
                enquiriesLoading={enquiryManagement.loading}
                enquirySearchTerm={enquiryManagement.searchTerm}
                setEnquirySearchTerm={enquiryManagement.setSearchTerm}
                enquiryStatusFilter={enquiryManagement.statusFilter}
                setEnquiryStatusFilter={enquiryManagement.setStatusFilter}
                enquiryTypeFilter={enquiryManagement.typeFilter}
                setEnquiryTypeFilter={enquiryManagement.setTypeFilter}
                updateEnquiryStatus={enquiryManagement.updateEnquiryStatus}
                updateEnquiryNotes={enquiryManagement.updateEnquiryNotes}
                handleEnquiryDelete={enquiryManagement.handleDelete}

                // Salary Guide props
                guides={salaryGuideManagement.guides}
                filteredGuides={salaryGuideManagement.filteredGuides}
                downloads={salaryGuideManagement.downloads}
                guidesLoading={salaryGuideManagement.loading}
                guideSearchTerm={salaryGuideManagement.searchTerm}
                setGuideSearchTerm={salaryGuideManagement.setSearchTerm}
                guideStatusFilter={salaryGuideManagement.statusFilter}
                setGuideStatusFilter={salaryGuideManagement.setStatusFilter}
                showAddGuide={salaryGuideManagement.showAddGuide}
                setShowAddGuide={salaryGuideManagement.setShowAddGuide}
                editingGuide={salaryGuideManagement.editingGuide}
                guideFormData={salaryGuideManagement.formData}
                setGuideFormData={salaryGuideManagement.setFormData}
                uploadingFile={salaryGuideManagement.uploadingFile}
                handleGuideSubmit={salaryGuideManagement.handleSubmit}
                handleGuideEdit={salaryGuideManagement.handleEdit}
                handleGuideDelete={salaryGuideManagement.handleDelete}
                resetGuideForm={salaryGuideManagement.resetForm}
                
                setIsSignedIn={handleSignOut} 
              />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default TalentDiscoveryApp;