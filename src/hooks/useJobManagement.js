import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export const useJobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState({
    job_title: '',
    client_id: '',
    job_description: '',
    city: '',
    state: '',
    employment_type: 'Full-time',
    experience_required: '',
    salary_range: '',
    skills_required: '',
    status: 'Open',
    deadline: ''
  });

  // Fetch jobs with client details
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('td_jobs')
        .select(`
          *,
          td_client (
            id,
            client_name,
            email_address
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch clients for dropdown
  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('td_client')
        .select('id, client_name')
        .eq('status', 'Active Client')
        .order('client_name');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.td_client?.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills_required?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.job_title.trim()) {
      alert('Job title is required');
      return;
    }
    if (!formData.client_id) {
      alert('Please select a client');
      return;
    }

    setLoading(true);

    try {
      if (editingJob) {
        const { error } = await supabase
          .from('td_jobs')
          .update(formData)
          .eq('id', editingJob.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('td_jobs')
          .insert([formData]);
        if (error) throw error;
      }

      resetForm();
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error saving job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      job_title: '',
      client_id: '',
      job_description: '',
      city: '',
      state: '',
      employment_type: 'Full-time',
      experience_required: '',
      salary_range: '',
      skills_required: '',
      status: 'Open',
      deadline: ''
    });
    setShowAddJob(false);
    setEditingJob(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        const { error } = await supabase
          .from('td_jobs')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  // Handle edit
  const handleEdit = (job) => {
    setFormData({
      job_title: job.job_title,
      client_id: job.client_id,
      job_description: job.job_description || '',
      city: job.city || '',
      state: job.state || '',
      employment_type: job.employment_type || 'Full-time',
      experience_required: job.experience_required || '',
      salary_range: job.salary_range || '',
      skills_required: job.skills_required || '',
      status: job.status || 'Open',
      deadline: job.deadline || ''
    });
    setEditingJob(job);
    setShowAddJob(true);
  };

  return {
    jobs,
    filteredJobs,
    clients,
    loading,
    showAddJob,
    setShowAddJob,
    editingJob,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    formData,
    setFormData,
    fetchJobs,
    fetchClients,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm
  };
};