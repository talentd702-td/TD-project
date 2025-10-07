import React from 'react';
import {
  PlusIcon,
  SearchIcon,
  DocumentIcon,
  EditIcon,
  DeleteIcon,
} from '../../components/common/Icons';

export const ArticlesView = ({
  articles = [],
  filteredArticles = [],
  loading = false,
  searchTerm = '',
  setSearchTerm = () => {},
  statusFilter = 'all',
  setStatusFilter = () => {},
  setShowAddArticle = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
}) => {
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles Management</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage your blog articles</p>
        </div>
        <button
          onClick={() => setShowAddArticle(true)}
          className="mt-4 sm:mt-0 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors flex items-center font-medium"
          style={{ backgroundColor: '#FF4500' }}
        >
          <PlusIcon className="mr-2" />
          New Article
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles by title, excerpt, category, or tags..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        // Skeleton loading
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (filteredArticles?.length ?? 0) === 0 ? (
        // Empty state
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <DocumentIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || statusFilter !== 'all' ? 'No articles found' : 'No articles yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first article'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button
              onClick={() => setShowAddArticle(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Your First Article
            </button>
          )}
        </div>
      ) : (
        // Article cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles?.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group overflow-hidden"
            >
              {/* Featured Image */}
              {article.featured_image_url ? (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={article.featured_image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <DocumentIcon className="w-16 h-16 text-white opacity-50" />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Category & Status */}
                <div className="flex items-center justify-between mb-3">
                  {article.category && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {article.category}
                    </span>
                  )}
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      article.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : article.status === 'Draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {article.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                {article.excerpt && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{article.author_name || 'Anonymous'}</span>
                  <span>{formatDate(article.published_at)}</span>
                </div>

                {/* Tags */}
                {article.tags && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.split(',').slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(article)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesView;