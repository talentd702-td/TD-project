import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Dashboard } from './Dashboard';
import { ClientsView } from './ClientsView';
import { JobsView } from './JobsView';
import { CandidatesView } from './CandidatesView';
import { ArticlesView } from './ArticlesView';
import { EnquiriesView } from './EnquiriesView';
import { AddClientModal } from '../../components/dashboard/AddClientModal';
import { AddJobModal } from '../../components/dashboard/AddJobModal';
import { AddCandidateModal } from '../../components/dashboard/AddCandidateModal';
import { AddArticleModal } from '../../components/dashboard/AddArticleModal';
import { ComingSoon } from '../../components/common/ComingSoon';

export const AppLayout = ({ 
  // Client props
  clients,
  filteredClients,
  clientsLoading,
  clientSearchTerm,
  setClientSearchTerm,
  clientStatusFilter,
  setClientStatusFilter,
  showAddClient,
  setShowAddClient,
  editingClient,
  clientFormData,
  setClientFormData,
  handleClientSubmit,
  handleClientEdit,
  handleClientDelete,
  resetClientForm,
  
  // Job props
  jobs,
  filteredJobs,
  activeClients,
  jobsLoading,
  jobSearchTerm,
  setJobSearchTerm,
  jobStatusFilter,
  setJobStatusFilter,
  showAddJob,
  setShowAddJob,
  editingJob,
  jobFormData,
  setJobFormData,
  handleJobSubmit,
  handleJobEdit,
  handleJobDelete,
  resetJobForm,

  // Candidate props
  candidates,
  filteredCandidates,
  candidatesLoading,
  candidateSearchTerm,
  setCandidateSearchTerm,
  candidateStatusFilter,
  setCandidateStatusFilter,
  showAddCandidate,
  setShowAddCandidate,
  editingCandidate,
  candidateFormData,
  setCandidateFormData,
  uploadingResume,
  handleCandidateSubmit,
  handleCandidateEdit,
  handleCandidateDelete,
  resetCandidateForm,

  // Article props
  articles,
  filteredArticles,
  articlesLoading,
  articleSearchTerm,
  setArticleSearchTerm,
  articleStatusFilter,
  setArticleStatusFilter,
  showAddArticle,
  setShowAddArticle,
  editingArticle,
  articleFormData,
  setArticleFormData,
  uploadingImage,
  handleArticleSubmit,
  handleArticleEdit,
  handleArticleDelete,
  resetArticleForm,
  generateSlug,

  // Enquiry props
  enquiries,
  filteredEnquiries,
  enquiriesLoading,
  enquirySearchTerm,
  setEnquirySearchTerm,
  enquiryStatusFilter,
  setEnquiryStatusFilter,
  enquiryTypeFilter,
  setEnquiryTypeFilter,
  updateEnquiryStatus,
  updateEnquiryNotes,
  handleEnquiryDelete,
  
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
    jobs={jobs}
    candidates={candidates}
    articles={articles}
    enquiries={enquiries}
    setActiveTab={setActiveTab}
    setShowAddClient={setShowAddClient}
    setShowAddJob={setShowAddJob}
    setShowAddCandidate={setShowAddCandidate}
  />
)}
          {activeTab === 'client' && (
            <ClientsView 
              clients={clients}
              filteredClients={filteredClients}
              loading={clientsLoading}
              searchTerm={clientSearchTerm}
              setSearchTerm={setClientSearchTerm}
              statusFilter={clientStatusFilter}
              setStatusFilter={setClientStatusFilter}
              setShowAddClient={setShowAddClient}
              handleEdit={handleClientEdit}
              handleDelete={handleClientDelete}
            />
          )}
          {activeTab === 'jobs' && (
            <JobsView 
              jobs={jobs}
              filteredJobs={filteredJobs}
              loading={jobsLoading}
              searchTerm={jobSearchTerm}
              setSearchTerm={setJobSearchTerm}
              statusFilter={jobStatusFilter}
              setStatusFilter={setJobStatusFilter}
              setShowAddJob={setShowAddJob}
              handleEdit={handleJobEdit}
              handleDelete={handleJobDelete}
            />
          )}
          {activeTab === 'candidate' && (
            <CandidatesView 
              candidates={candidates}
              filteredCandidates={filteredCandidates}
              loading={candidatesLoading}
              searchTerm={candidateSearchTerm}
              setSearchTerm={setCandidateSearchTerm}
              statusFilter={candidateStatusFilter}
              setStatusFilter={setCandidateStatusFilter}
              setShowAddCandidate={setShowAddCandidate}
              handleEdit={handleCandidateEdit}
              handleDelete={handleCandidateDelete}
            />
          )}
          {activeTab === 'articles' && (
            <ArticlesView 
              articles={articles}
              filteredArticles={filteredArticles}
              loading={articlesLoading}
              searchTerm={articleSearchTerm}
              setSearchTerm={setArticleSearchTerm}
              statusFilter={articleStatusFilter}
              setStatusFilter={setArticleStatusFilter}
              setShowAddArticle={setShowAddArticle}
              handleEdit={handleArticleEdit}
              handleDelete={handleArticleDelete}
            />
          )}
          {activeTab === 'enquiries' && (
            <EnquiriesView 
              enquiries={enquiries}
              filteredEnquiries={filteredEnquiries}
              loading={enquiriesLoading}
              searchTerm={enquirySearchTerm}
              setSearchTerm={setEnquirySearchTerm}
              statusFilter={enquiryStatusFilter}
              setStatusFilter={setEnquiryStatusFilter}
              typeFilter={enquiryTypeFilter}
              setTypeFilter={setEnquiryTypeFilter}
              updateEnquiryStatus={updateEnquiryStatus}
              updateEnquiryNotes={updateEnquiryNotes}
              handleDelete={handleEnquiryDelete}
            />
          )}
          {activeTab === 'my-account' && <ComingSoon title="My Account" />}
          {activeTab === 'interviews' && <ComingSoon title="Interviews" />}
          {activeTab === 'testimonials' && <ComingSoon title="Testimonials" />}
          {activeTab === 'team' && <ComingSoon title="Team" />}
          {activeTab === 'salary-guide' && <ComingSoon title="Salary Guide" />}
        </main>
      </div>

      {/* Modals */}
      <AddClientModal 
        showAddClient={showAddClient}
        editingClient={editingClient}
        formData={clientFormData}
        setFormData={setClientFormData}
        loading={clientsLoading}
        handleSubmit={handleClientSubmit}
        resetForm={resetClientForm}
      />

      <AddJobModal 
        showAddJob={showAddJob}
        editingJob={editingJob}
        formData={jobFormData}
        setFormData={setJobFormData}
        clients={activeClients}
        loading={jobsLoading}
        handleSubmit={handleJobSubmit}
        resetForm={resetJobForm}
      />

      <AddCandidateModal 
        showAddCandidate={showAddCandidate}
        editingCandidate={editingCandidate}
        formData={candidateFormData}
        setFormData={setCandidateFormData}
        loading={candidatesLoading}
        uploadingResume={uploadingResume}
        handleSubmit={handleCandidateSubmit}
        resetForm={resetCandidateForm}
      />

      <AddArticleModal 
        showAddArticle={showAddArticle}
        editingArticle={editingArticle}
        formData={articleFormData}
        setFormData={setArticleFormData}
        loading={articlesLoading}
        uploadingImage={uploadingImage}
        handleSubmit={handleArticleSubmit}
        resetForm={resetArticleForm}
        generateSlug={generateSlug}
      />
    </div>
  );
};

export default AppLayout;