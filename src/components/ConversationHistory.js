// components/ConversationHistory.js - Fixed version
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { deleteMultipleConversations, clearAllUserConversations } from '../lib/conversationHistory';

export default function ConversationHistory({ user, userData, onBack, onOpenConversation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversations, setSelectedConversations] = useState(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    // Use a simpler query structure to avoid index issues
    const q = query(
      collection(db, 'conversations'),
      where('userId', '==', user.uid),
      orderBy('lastMessageAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        console.log('Conversations snapshot received:', snapshot.docs.length);
        const convos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setConversations(convos);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Error fetching conversations:', error);
        setError(error.message);
        setLoading(false);
        
        // Fallback: if index doesn't exist, create empty state
        if (error.code === 'failed-precondition') {
          setConversations([]);
        }
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  const categoryConfig = {
    'ask-anything': { title: 'Ask me anything', icon: '🎱' },
    'daily-horoscope': { title: 'Daily horoscope', icon: '🔮' },
    'romantic-compatibility': { title: 'Romantic compatibility', icon: '🌹' },
    'friend-compatibility': { title: 'Friend compatibility', icon: '🤝' },
    'dream-interpreter': { title: 'Dream interpreter', icon: '☁️' },
    'astrological-events': { title: 'Astrological events', icon: '⭐' },
    'tarot-interpreter': { title: 'Tarot card interpreter', icon: '☀️' },
    'personal-growth': { title: 'Personal growth', icon: '🪁' }
  };

  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = (now - date) / (1000 * 60 * 60);
      
      if (diffInHours < 1) {
        return 'Just now';
      } else if (diffInHours < 24) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (diffInHours < 168) { // 7 days
        return date.toLocaleDateString([], { weekday: 'short' });
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    } catch (error) {
      return 'Unknown';
    }
  };

  const getPreview = (messages) => {
    if (!messages || !Array.isArray(messages)) return 'New conversation';
    
    const userMessages = messages.filter(msg => msg.type === 'user');
    if (userMessages.length > 0) {
      const content = userMessages[0].content || '';
      return content.substring(0, 50) + (content.length > 50 ? '...' : '');
    }
    return 'New conversation';
  };

  const filteredConversations = conversations.filter(conversation => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const title = conversation.title || '';
    const titleMatch = title.toLowerCase().includes(searchLower);
    
    const messages = conversation.messages || [];
    const messageMatch = messages.some(msg => 
      msg.content && msg.content.toLowerCase().includes(searchLower)
    );
    
    return titleMatch || messageMatch;
  });

  const handleLongPress = (conversationId) => {
    setIsSelectionMode(true);
    setSelectedConversations(new Set([conversationId]));
  };

  const toggleSelection = (conversationId) => {
    const newSelected = new Set(selectedConversations);
    if (newSelected.has(conversationId)) {
      newSelected.delete(conversationId);
    } else {
      newSelected.add(conversationId);
    }
    setSelectedConversations(newSelected);
    
    if (newSelected.size === 0) {
      setIsSelectionMode(false);
    }
  };

  const selectAll = () => {
    setSelectedConversations(new Set(filteredConversations.map(c => c.id)));
  };

  const deselectAll = () => {
    setSelectedConversations(new Set());
    setIsSelectionMode(false);
  };

  const deleteSelected = async () => {
    if (selectedConversations.size === 0) return;
    
    const count = selectedConversations.size;
    const confirmMessage = count === 1 
      ? 'Are you sure you want to delete this conversation?' 
      : `Are you sure you want to delete ${count} conversations?`;
    
    if (confirm(confirmMessage)) {
      try {
        await deleteMultipleConversations(Array.from(selectedConversations));
        setSelectedConversations(new Set());
        setIsSelectionMode(false);
      } catch (error) {
        console.error('Error deleting conversations:', error);
        alert('Failed to delete conversations. Please try again.');
      }
    }
  };

  const clearAllHistory = async () => {
    if (confirm('Are you sure you want to delete ALL conversation history? This cannot be undone.')) {
      try {
        await clearAllUserConversations(user.uid);
        setSelectedConversations(new Set());
        setIsSelectionMode(false);
      } catch (error) {
        console.error('Error clearing history:', error);
        alert('Failed to clear history. Please try again.');
      }
    }
  };

  const exitSelectionMode = () => {
    setSelectedConversations(new Set());
    setIsSelectionMode(false);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-red-500/5 via-orange-500/2 to-transparent blur-3xl"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your cosmic conversations...</p>
        </div>
        <style jsx>{`
          .bg-gradient-radial {
            background: radial-gradient(circle, var(--tw-gradient-stops));
          }
        `}</style>
      </div>
    );
  }

  // Show error state if index doesn't exist
  if (error && error.includes('index')) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-red-500/5 via-orange-500/2 to-transparent blur-3xl"></div>
        </div>
        
        {/* Header */}
        <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800 px-4 py-3 relative z-50">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <button 
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 touch-manipulation active:scale-95 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold">History</h1>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="flex-1 p-4 max-w-lg mx-auto relative z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold mb-4">Database Index Required</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              To enable conversation history, you need to create a database index. 
              This is a one-time setup that takes about 5 minutes.
            </p>
            <a
              href="https://console.firebase.google.com/v1/r/project/chitramapp/firestore/indexes?create_composite=ClBwcm9qZWN0cy9jaGl0cmFtYXBwL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9jb252ZXJzYXRpb25zL2luZGV4ZXMvXxABGgoKBnVzZXJJZBABGhEKDWxhc3RNZXNzYWdlQXQQAhoMCghfX25hbWVfXxAC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200"
            >
              Create Index in Firebase
            </a>
            <p className="text-xs text-gray-500 mt-4">
              After creating the index, refresh this page
            </p>
          </div>
        </div>
        
        <style jsx>{`
          .bg-gradient-radial {
            background: radial-gradient(circle, var(--tw-gradient-stops));
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-red-500/3 via-orange-500/1 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-orange-500/2 via-red-500/1 to-transparent blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800 px-4 py-3 flex-shrink-0 relative z-50">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {isSelectionMode ? (
            <button 
              onClick={exitSelectionMode}
              className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 touch-manipulation active:scale-95 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button 
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 touch-manipulation active:scale-95 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <div className="flex items-center space-x-2">
            <span className="text-xl">📜</span>
            <h1 className="text-lg font-semibold">
              {isSelectionMode ? `${selectedConversations.size} selected` : 'History'}
            </h1>
          </div>
          
          {isSelectionMode ? (
            <div className="flex items-center space-x-2">
              {selectedConversations.size < filteredConversations.length ? (
                <button
                  onClick={selectAll}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  All
                </button>
              ) : (
                <button
                  onClick={deselectAll}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  None
                </button>
              )}
              <button
                onClick={deleteSelected}
                disabled={selectedConversations.size === 0}
                className="text-red-400 hover:text-red-300 disabled:text-gray-600 transition-colors p-2 touch-manipulation active:scale-95 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={clearAllHistory}
              className="text-gray-400 hover:text-white transition-colors p-2 -mr-2 touch-manipulation active:scale-95 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {conversations.length > 3 && !isSelectionMode && (
        <div className="px-4 py-3 border-b border-gray-800/50 relative z-40">
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-gray-800/70 text-white rounded-full px-4 py-2 pl-10 border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 p-4 max-w-lg mx-auto relative z-10 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">🌌</div>
            <h3 className="text-lg font-semibold mb-2">
              {searchTerm ? 'No conversations found' : 'No conversations yet'}
            </h3>
            <p className="text-gray-400 text-sm">
              {searchTerm ? 'Try a different search term' : 'Start chatting to see your cosmic conversation history here!'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-red-400 hover:text-red-300 text-sm underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {/* Group conversations by date */}
            {(() => {
              const groupedConversations = {};
              filteredConversations.forEach(conversation => {
                const date = new Date(conversation.lastMessageAt);
                const now = new Date();
                const yesterday = new Date(now);
                yesterday.setDate(yesterday.getDate() - 1);
                
                let groupKey;
                if (date.toDateString() === now.toDateString()) {
                  groupKey = 'Today';
                } else if (date.toDateString() === yesterday.toDateString()) {
                  groupKey = 'Yesterday';
                } else if (date.getTime() > now.getTime() - 7 * 24 * 60 * 60 * 1000) {
                  groupKey = 'This week';
                } else if (date.getTime() > now.getTime() - 30 * 24 * 60 * 60 * 1000) {
                  groupKey = 'This month';
                } else {
                  groupKey = 'Older';
                }
                
                if (!groupedConversations[groupKey]) {
                  groupedConversations[groupKey] = [];
                }
                groupedConversations[groupKey].push(conversation);
              });

              return Object.entries(groupedConversations).map(([groupName, groupConversations]) => (
                <div key={groupName}>
                  <h4 className="text-sm font-medium text-gray-400 mb-3 px-2">{groupName}</h4>
                  <div className="space-y-2 mb-6">
                    {groupConversations.map((conversation) => {
                      const config = categoryConfig[conversation.category] || { title: 'Unknown', icon: '❓' };
                      const isSelected = selectedConversations.has(conversation.id);
                      
                      return (
                        <div
                          key={conversation.id}
                          className={`bg-gray-800/70 backdrop-blur-sm border rounded-xl transition-all duration-200 touch-manipulation ${
                            isSelected 
                              ? 'border-red-500 bg-red-900/30' 
                              : 'border-gray-700 hover:border-red-400/50 active:bg-gray-700/80'
                          }`}
                          onTouchStart={(e) => {
                            if (!isSelectionMode) {
                              const timeout = setTimeout(() => handleLongPress(conversation.id), 500);
                              e.currentTarget._longPressTimeout = timeout;
                            }
                          }}
                          onTouchEnd={(e) => {
                            if (e.currentTarget._longPressTimeout) {
                              clearTimeout(e.currentTarget._longPressTimeout);
                            }
                          }}
                          onTouchCancel={(e) => {
                            if (e.currentTarget._longPressTimeout) {
                              clearTimeout(e.currentTarget._longPressTimeout);
                            }
                          }}
                          onClick={() => {
                            if (isSelectionMode) {
                              toggleSelection(conversation.id);
                            } else {
                              onOpenConversation(conversation);
                            }
                          }}
                        >
                          <div className="p-4 flex items-center space-x-3">
                            {isSelectionMode && (
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected ? 'bg-red-500 border-red-500' : 'border-gray-400'
                              }`}>
                                {isSelected && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            )}
                            
                            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-lg">{config.icon}</span>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-medium text-sm text-white truncate">{config.title}</h3>
                                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                                  {formatDate(conversation.lastMessageAt)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 truncate">
                                {conversation.title || getPreview(conversation.messages || [])}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">
                                  {(conversation.messages || []).filter(m => m.type === 'user').length} messages
                                </span>
                                <div className="flex items-center space-x-2">
                                  {conversation.isArchived && (
                                    <span className="text-xs text-orange-400">📁</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {!isSelectionMode && (
                              <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}
          </div>
        )}
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}