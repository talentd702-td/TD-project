import React, { useState, useEffect } from 'react';
import RichTextEditor from '../common/RichTextEditor';
import { 
  DocumentIcon,
} from '../common/Icons';

export const AddArticleModal = ({ 
  showAddArticle, 
  editingArticle, 
  formData, 
  setFormData, 
  loading,
  uploadingImage,
  handleSubmit, 
  resetForm,
  generateSlug
}) => {
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (formData.featured_image_url) {
      setImagePreview(formData.featured_image_url);
    }
  }, [formData.featured_image_url]);

  if (!showAddArticle) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid image (JPEG, PNG, GIF, or WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      setFeaturedImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    });
  };

  const onSubmit = async () => {
    const success = await handleSubmit(featuredImageFile);
    if (success) {
      setFeaturedImageFile(null);
      setImagePreview('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-5xl my-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-t-xl sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                {editingArticle ? 'Edit Article' : 'Create New Article'}
              </h3>
              <p className="text-blue-100 mt-1">
                {editingArticle ? 'Update your article' : 'Write and publish your blog article'}
              </p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setFeaturedImageFile(null);
                setImagePreview('');
              }}
              className="text-white text-opacity-80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6 max-h-[calc(90vh-180px)] overflow-y-auto">
          {/* Title & Slug */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter article title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                value={formData.slug}
                readOnly
                placeholder="auto-generated-from-title"
              />
              <p className="text-xs text-gray-500 mt-1">Auto-generated from title</p>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              placeholder="Brief summary of your article (optional)"
            ></textarea>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Article Content *
            </label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({...formData, content})}
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFeaturedImageFile(null);
                    setImagePreview('');
                    setFormData({...formData, featured_image_url: '', featured_image_filename: ''});
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center px-4 py-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors bg-gray-50">
                  <DocumentIcon className="w-12 h-12 text-gray-400 mb-3" />
                  <span className="text-sm text-gray-600">
                    Click to upload featured image
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    JPEG, PNG, GIF, WebP (Max 5MB)
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.author_name}
                onChange={(e) => setFormData({...formData, author_name: e.target.value})}
                placeholder="Author name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="e.g., Technology, Career Tips"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="recruitment, hiring, career (comma-separated)"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 rounded-b-xl sticky bottom-0">
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                resetForm();
                setFeaturedImageFile(null);
                setImagePreview('');
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={loading || uploadingImage}
              className={`px-6 py-3 text-white rounded-lg font-medium transition-colors ${
                loading || uploadingImage
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {uploadingImage ? 'Uploading Image...' : loading ? 'Saving...' : editingArticle ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};