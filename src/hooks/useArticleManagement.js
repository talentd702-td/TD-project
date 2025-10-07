import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export const useArticleManagement = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    featured_image_filename: '',
    author_name: '',
    category: '',
    tags: '',
    status: 'Draft',
    published_at: ''
  });

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  // Fetch articles
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('td_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Upload featured image
  const uploadFeaturedImage = async (file) => {
    if (!file) return null;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      return { url: publicUrl, filename: file.name };
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (featuredImageFile = null) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required');
      return false;
    }

    setLoading(true);

    try {
      let imageData = {
        featured_image_url: formData.featured_image_url,
        featured_image_filename: formData.featured_image_filename
      };

      // Upload featured image if provided
      if (featuredImageFile) {
        const uploadResult = await uploadFeaturedImage(featuredImageFile);
        if (uploadResult) {
          imageData = {
            featured_image_url: uploadResult.url,
            featured_image_filename: uploadResult.filename
          };
        }
      }

      // Generate slug if not editing or if title changed
      let slug = formData.slug;
      if (!editingArticle || editingArticle.title !== formData.title) {
        slug = generateSlug(formData.title);
      }

      // Set published_at if status is Published
      const published_at = formData.status === 'Published' && !formData.published_at
        ? new Date().toISOString()
        : formData.published_at;

      const articleData = {
        ...formData,
        ...imageData,
        slug,
        published_at
      };

      if (editingArticle) {
        const { error } = await supabase
          .from('td_articles')
          .update(articleData)
          .eq('id', editingArticle.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('td_articles')
          .insert([articleData]);
        if (error) throw error;
      }

      resetForm();
      fetchArticles();
      return true;
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error saving article. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image_url: '',
      featured_image_filename: '',
      author_name: '',
      category: '',
      tags: '',
      status: 'Draft',
      published_at: ''
    });
    setShowAddArticle(false);
    setEditingArticle(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const { error } = await supabase
          .from('td_articles')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  // Handle edit
  const handleEdit = (article) => {
    setFormData({
      title: article.title || '',
      slug: article.slug || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      featured_image_url: article.featured_image_url || '',
      featured_image_filename: article.featured_image_filename || '',
      author_name: article.author_name || '',
      category: article.category || '',
      tags: article.tags || '',
      status: article.status || 'Draft',
      published_at: article.published_at || ''
    });
    setEditingArticle(article);
    setShowAddArticle(true);
  };

  return {
    articles,
    filteredArticles,
    loading,
    showAddArticle,
    setShowAddArticle,
    editingArticle,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    formData,
    setFormData,
    uploadingImage,
    fetchArticles,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm,
    generateSlug
  };
};