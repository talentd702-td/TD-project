import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';


export const useClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState({
    client_name: '',
    street: '',
    area: '',
    country: 'India',
    state: '',
    city: '',
    pin: '',
    contact_number: '',
    email_address: '',
    website: '',
    profile: '',
    status: 'Active Client'
  });

  // Fetch clients
  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('td_client')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact_number?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.client_name.trim()) {
      alert('Client name is required');
      return;
    }

    setLoading(true);

    try {
      if (editingClient) {
        const { error } = await supabase
          .from('td_client')
          .update(formData)
          .eq('id', editingClient.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('td_client')
          .insert([formData]);
        if (error) throw error;
      }

      resetForm();
      fetchClients();
    } catch (error) {
      console.error('Error saving client:', error);
      alert('Error saving client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      client_name: '',
      street: '',
      area: '',
      country: 'India',
      state: '',
      city: '',
      pin: '',
      contact_number: '',
      email_address: '',
      website: '',
      profile: '',
      status: 'Active Client'
    });
    setShowAddClient(false);
    setEditingClient(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        const { error } = await supabase
          .from('td_client')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  // Handle edit
  const handleEdit = (client) => {
    setFormData(client);
    setEditingClient(client);
    setShowAddClient(true);
  };

  return {
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
  };
};