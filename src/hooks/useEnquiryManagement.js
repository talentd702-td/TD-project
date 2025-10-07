import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export const useEnquiryManagement = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Fetch enquiries
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('td_enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnquiries(data || []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter enquiries
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    const matchesType = typeFilter === 'all' || enquiry.enquiry_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Update enquiry status
  const updateEnquiryStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('td_enquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating enquiry:', error);
    }
  };

  // Update enquiry notes
  const updateEnquiryNotes = async (id, notes) => {
    try {
      const { error } = await supabase
        .from('td_enquiries')
        .update({ notes })
        .eq('id', id);

      if (error) throw error;
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  // Delete enquiry
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      try {
        const { error } = await supabase
          .from('td_enquiries')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchEnquiries();
      } catch (error) {
        console.error('Error deleting enquiry:', error);
      }
    }
  };

  return {
    enquiries,
    filteredEnquiries,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    fetchEnquiries,
    updateEnquiryStatus,
    updateEnquiryNotes,
    handleDelete
  };
};