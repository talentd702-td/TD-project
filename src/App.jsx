"use client";

import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/landing/LandingPage';
import { AppLayout } from './pages/dashboard/AppLayout';
import { useClientManagement } from './hooks/useClientManagement';
import { useJobManagement } from './hooks/useJobManagement';
import { useCandidateManagement } from './hooks/useCandidateManagement';
import { useArticleManagement } from './hooks/useArticleManagement';
import { useEnquiryManagement } from './hooks/useEnquiryManagement';

const TalentDiscoveryApp = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

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

  useEffect(() => {
    if (isSignedIn) {
      clientManagement.fetchClients();
      jobManagement.fetchJobs();
      jobManagement.fetchClients();
      candidateManagement.fetchCandidates();
      articleManagement.fetchArticles();
      enquiryManagement.fetchEnquiries();
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return <LandingPage setIsSignedIn={setIsSignedIn} />;
  }

  return (
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
      
      setIsSignedIn={setIsSignedIn}
    />
  );
};

export default TalentDiscoveryApp;