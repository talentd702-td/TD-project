import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export const useSalaryGuideManagement = () => {
  const [guides, setGuides] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddGuide, setShowAddGuide] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [uploadingFile, setUploadingFile] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_url: '',
    file_name: '',
    file_size: 0,
    status: 'Active'
  });

  // Fetch guides
  const fetchGuides = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('td_salary_guides')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGuides(data || []);
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch downloads
  const fetchDownloads = async () => {
    try {
      const { data, error } = await supabase
        .from('td_salary_guide_downloads')
        .select(`
          *,
          td_salary_guides (
            title
          )
        `)
        .order('downloaded_at', { ascending: false });

      if (error) throw error;
      setDownloads(data || []);
    } catch (error) {
      console.error('Error fetching downloads:', error);
    }
  };

  // Filter guides
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = 
      guide.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || guide.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Upload file
  const uploadFile = async (file) => {
    if (!file) return null;

    setUploadingFile(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('salary-guides')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('salary-guides')
        .getPublicUrl(filePath);

      return { 
        url: publicUrl, 
        filename: file.name,
        size: file.size 
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
      return null;
    } finally {
      setUploadingFile(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (file = null) => {
    if (!formData.title.trim()) {
      alert('Title is required');
      return false;
    }

    if (!editingGuide && !file) {
      alert('Please select a file to upload');
      return false;
    }

    setLoading(true);

    try {
      let fileData = {
        file_url: formData.file_url,
        file_name: formData.file_name,
        file_size: formData.file_size
      };

      // Upload file if provided
      if (file) {
        const uploadResult = await uploadFile(file);
        if (uploadResult) {
          fileData = {
            file_url: uploadResult.url,
            file_name: uploadResult.filename,
            file_size: uploadResult.size
          };
        } else {
          setLoading(false);
          return false;
        }
      }

      const guideData = {
        ...formData,
        ...fileData
      };

      if (editingGuide) {
        const { error } = await supabase
          .from('td_salary_guides')
          .update(guideData)
          .eq('id', editingGuide.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('td_salary_guides')
          .insert([guideData]);
        if (error) throw error;
      }

      resetForm();
      fetchGuides();
      return true;
    } catch (error) {
      console.error('Error saving guide:', error);
      alert('Error saving guide. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      file_url: '',
      file_name: '',
      file_size: 0,
      status: 'Active'
    });
    setShowAddGuide(false);
    setEditingGuide(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this salary guide?')) {
      try {
        const { error } = await supabase
          .from('td_salary_guides')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchGuides();
        fetchDownloads();
      } catch (error) {
        console.error('Error deleting guide:', error);
      }
    }
  };

  // Handle edit
  const handleEdit = (guide) => {
    setFormData({
      title: guide.title || '',
      description: guide.description || '',
      file_url: guide.file_url || '',
      file_name: guide.file_name || '',
      file_size: guide.file_size || 0,
      status: guide.status || 'Active'
    });
    setEditingGuide(guide);
    setShowAddGuide(true);
  };

  // Track download
  const trackDownload = async (guideId, name, email) => {
    try {
      const { error } = await supabase
        .from('td_salary_guide_downloads')
        .insert([{
          salary_guide_id: guideId,
          name,
          email
        }]);

      if (error) throw error;
      fetchDownloads();
      return true;
    } catch (error) {
      console.error('Error tracking download:', error);
      return false;
    }
  };

  return {
    guides,
    filteredGuides,
    downloads,
    loading,
    showAddGuide,
    setShowAddGuide,
    editingGuide,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    formData,
    setFormData,
    uploadingFile,
    fetchGuides,
    fetchDownloads,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm,
    trackDownload
  };
};