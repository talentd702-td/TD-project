import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export const useCandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [uploadingResume, setUploadingResume] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    current_location: '',
    city: '',
    state: '',
    total_experience: '',
    current_company: '',
    current_designation: '',
    preferred_location: '',
    expected_salary: '',
    notice_period: '',
    linkedin_url: '',
    portfolio_url: '',
    skills: '',
    resume_url: '',
    resume_filename: '',
    status: 'New',
    notes: ''
  });

  // Fetch candidates
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('td_candidates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCandidates(data || []);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter candidates
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Upload resume to Supabase Storage
  const uploadResume = async (file) => {
    if (!file) return null;

    setUploadingResume(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      return { url: publicUrl, filename: file.name };
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Error uploading resume. Please try again.');
      return null;
    } finally {
      setUploadingResume(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (resumeFile = null) => {
    if (!formData.full_name.trim() || !formData.email.trim()) {
      alert('Name and email are required');
      return false;
    }

    setLoading(true);

    try {
      let resumeData = {
        resume_url: formData.resume_url,
        resume_filename: formData.resume_filename
      };

      // Upload resume if provided
      if (resumeFile) {
        const uploadResult = await uploadResume(resumeFile);
        if (uploadResult) {
          resumeData = {
            resume_url: uploadResult.url,
            resume_filename: uploadResult.filename
          };
        }
      }

      const candidateData = {
        ...formData,
        ...resumeData
      };

      if (editingCandidate) {
        const { error } = await supabase
          .from('td_candidates')
          .update(candidateData)
          .eq('id', editingCandidate.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('td_candidates')
          .insert([candidateData]);
        if (error) throw error;
      }

      resetForm();
      fetchCandidates();
      return true;
    } catch (error) {
      console.error('Error saving candidate:', error);
      alert('Error saving candidate. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      current_location: '',
      city: '',
      state: '',
      total_experience: '',
      current_company: '',
      current_designation: '',
      preferred_location: '',
      expected_salary: '',
      notice_period: '',
      linkedin_url: '',
      portfolio_url: '',
      skills: '',
      resume_url: '',
      resume_filename: '',
      status: 'New',
      notes: ''
    });
    setShowAddCandidate(false);
    setEditingCandidate(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this candidate?')) {
      try {
        const { error } = await supabase
          .from('td_candidates')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchCandidates();
      } catch (error) {
        console.error('Error deleting candidate:', error);
      }
    }
  };

  // Handle edit
  const handleEdit = (candidate) => {
    setFormData(candidate);
    setEditingCandidate(candidate);
    setShowAddCandidate(true);
  };

  return {
    candidates,
    filteredCandidates,
    loading,
    showAddCandidate,
    setShowAddCandidate,
    editingCandidate,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    formData,
    setFormData,
    uploadingResume,
    fetchCandidates,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm,
    uploadResume
  };
};