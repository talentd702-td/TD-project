import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';

export const InsightsPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch published articles
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('td_articles')
        .select('*')
        .eq('status', 'Published')
        .order('published_at', { ascending: false })
        .limit(9);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }, 1000);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const text = stripHtml(content);
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  // Cycle through colors for articles
  const getArticleColor = (index) => {
    const colors = [
      {
        gradient: 'from-blue-500 to-blue-600',
        badge: 'bg-blue-500/30 backdrop-blur-sm text-blue-100 border-blue-300/30',
        hover: 'hover:border-blue-400/50 hover:shadow-blue-500/20',
        text: 'text-blue-400 hover:text-blue-300',
        hoverText: 'group-hover:text-blue-300'
      },
      {
        gradient: 'from-purple-500 to-purple-600',
        badge: 'bg-purple-500/30 backdrop-blur-sm text-purple-100 border-purple-300/30',
        hover: 'hover:border-purple-400/50 hover:shadow-purple-500/20',
        text: 'text-purple-400 hover:text-purple-300',
        hoverText: 'group-hover:text-purple-300'
      },
      {
        gradient: 'from-orange-500 to-orange-600',
        badge: 'bg-orange-500/30 backdrop-blur-sm text-orange-100 border-orange-300/30',
        hover: 'hover:border-orange-400/50 hover:shadow-orange-500/20',
        text: 'text-orange-400 hover:text-orange-300',
        hoverText: 'group-hover:text-orange-300'
      }
    ];
    return colors[index % 3];
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">Insights & Resources</h2>
            <div className="w-20 h-0.5 bg-orange-400 mx-auto mb-3"></div>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              Stay informed with our latest industry insights and expert articles
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden animate-pulse">
                  <div className="h-40 bg-white/10"></div>
                  <div className="p-5">
                    <div className="h-4 bg-white/10 rounded mb-2 w-20"></div>
                    <div className="h-6 bg-white/10 rounded mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            /* Empty State */
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-12 text-center mb-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">No Articles Yet</h3>
              <p className="text-gray-300">Check back soon for new insights and resources</p>
            </div>
          ) : (
            /* Articles Grid */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {articles.map((article, index) => {
                const colorScheme = getArticleColor(index);
                return (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className={`group bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden ${colorScheme.hover} hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                  >
                    {/* Featured Image or Gradient */}
                    {article.featured_image_url ? (
                      <div className="h-40 relative overflow-hidden">
                        <img
                          src={article.featured_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        {article.category && (
                          <div className="absolute bottom-3 left-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${colorScheme.badge}`}>
                              {article.category}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`h-40 bg-gradient-to-br ${colorScheme.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        {article.category && (
                          <div className="absolute bottom-3 left-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${colorScheme.badge}`}>
                              {article.category}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex items-center text-xs text-gray-400 mb-2">
                        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{getReadingTime(article.content)}</span>
                        {article.published_at && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{formatDate(article.published_at)}</span>
                          </>
                        )}
                      </div>
                      <h3 className={`text-lg font-bold text-white mb-2 transition-colors ${colorScheme.hoverText} line-clamp-2`}>
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                        {article.excerpt || stripHtml(article.content).substring(0, 100) + '...'}
                      </p>
                      {article.author_name && (
                        <p className="text-xs text-gray-400 mb-3">By {article.author_name}</p>
                      )}
                      <button className={`inline-flex items-center text-sm ${colorScheme.text} font-semibold transition-colors`}>
                        Read More 
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Newsletter Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 md:p-10 text-center text-white shadow-2xl border border-blue-400/20">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Get Exclusive Insights Delivered to Your Inbox
            </h3>
            <p className="text-sm text-blue-100 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter for the latest trends, reports, and expert advice in talent acquisition.
            </p>
            
            {subscribed ? (
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-200 px-6 py-3 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Successfully subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-5 py-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all font-semibold text-sm disabled:opacity-50 hover:scale-105 transform"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between z-10 rounded-t-xl">
              <div className="flex-1">
                {selectedArticle.category && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-2">
                    {selectedArticle.category}
                  </span>
                )}
                <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">{selectedArticle.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2 flex-wrap">
                  {selectedArticle.author_name && (
                    <span>By {selectedArticle.author_name}</span>
                  )}
                  {selectedArticle.published_at && (
                    <>
                      <span>•</span>
                      <span>{formatDate(selectedArticle.published_at)}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{getReadingTime(selectedArticle.content)}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Featured Image */}
            {selectedArticle.featured_image_url && (
              <div className="w-full h-96 overflow-hidden">
                <img
                  src={selectedArticle.featured_image_url}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="px-8 py-8">
              {selectedArticle.excerpt && (
                <p className="text-lg text-gray-600 mb-6 font-medium italic border-l-4 border-blue-500 pl-4">
                  {selectedArticle.excerpt}
                </p>
              )}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:text-gray-700
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                  prose-img:rounded-lg prose-img:shadow-lg
                  prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Tags */}
              {selectedArticle.tags && (
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200">
                  {selectedArticle.tags.split(',').map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 rounded-b-xl sticky bottom-0">
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPage;