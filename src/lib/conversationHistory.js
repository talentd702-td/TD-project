// lib/conversationHistory.js
import { 
    collection, 
    query, 
    where, 
    orderBy, 
    onSnapshot, 
    doc, 
    setDoc, 
    deleteDoc, 
    getDocs,
    limit,
    startAfter
  } from 'firebase/firestore';
  import { db } from './firebase';
  
  /**
   * Save a new conversation to Firebase
   */
  export const saveConversationToFirebase = async (userId, category, messages) => {
    if (!userId || !messages || messages.length === 0) return null;
  
    try {
      // Create unique conversation ID
      const timestamp = Date.now();
      const conversationId = `${userId}_${category}_${timestamp}`;
      
      // Filter out empty messages and prepare data
      const validMessages = messages.filter(msg => msg.content && msg.content.trim().length > 0);
      
      const conversationData = {
        id: conversationId,
        userId,
        category,
        messages: validMessages,
        createdAt: new Date().toISOString(),
        lastMessageAt: new Date().toISOString(),
        messageCount: validMessages.filter(m => m.type === 'user').length,
        title: generateConversationTitle(validMessages),
        isArchived: false
      };
  
      await setDoc(doc(db, 'conversations', conversationId), conversationData);
      console.log('Conversation saved:', conversationId);
      return conversationId;
    } catch (error) {
      console.error('Error saving conversation:', error);
      return null;
    }
  };
  
  /**
   * Update an existing conversation in Firebase
   */
  export const updateConversationInFirebase = async (conversationId, messages) => {
    if (!conversationId || !messages) return;
  
    try {
      const validMessages = messages.filter(msg => msg.content && msg.content.trim().length > 0);
      
      await setDoc(doc(db, 'conversations', conversationId), {
        messages: validMessages,
        lastMessageAt: new Date().toISOString(),
        messageCount: validMessages.filter(m => m.type === 'user').length,
        title: generateConversationTitle(validMessages)
      }, { merge: true });
      
      console.log('Conversation updated:', conversationId);
    } catch (error) {
      console.error('Error updating conversation:', error);
    }
  };
  
  /**
   * Delete a conversation from Firebase
   */
  export const deleteConversation = async (conversationId) => {
    try {
      await deleteDoc(doc(db, 'conversations', conversationId));
      console.log('Conversation deleted:', conversationId);
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  };
  
  /**
   * Delete multiple conversations
   */
  export const deleteMultipleConversations = async (conversationIds) => {
    try {
      const deletePromises = conversationIds.map(id => 
        deleteDoc(doc(db, 'conversations', id))
      );
      await Promise.all(deletePromises);
      console.log('Multiple conversations deleted:', conversationIds.length);
    } catch (error) {
      console.error('Error deleting multiple conversations:', error);
      throw error;
    }
  };
  
  /**
   * Clear all conversations for a user
   */
  export const clearAllUserConversations = async (userId) => {
    try {
      const q = query(
        collection(db, 'conversations'),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      console.log('All conversations cleared for user:', userId);
    } catch (error) {
      console.error('Error clearing all conversations:', error);
      throw error;
    }
  };
  
  /**
   * Get conversations with pagination
   */
  export const getConversationsWithPagination = async (userId, lastDoc = null, limitCount = 20) => {
    try {
      let q = query(
        collection(db, 'conversations'),
        where('userId', '==', userId),
        orderBy('lastMessageAt', 'desc'),
        limit(limitCount)
      );
  
      if (lastDoc) {
        q = query(
          collection(db, 'conversations'),
          where('userId', '==', userId),
          orderBy('lastMessageAt', 'desc'),
          startAfter(lastDoc),
          limit(limitCount)
        );
      }
  
      const snapshot = await getDocs(q);
      const conversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        _doc: doc // Keep reference for pagination
      }));
  
      return {
        conversations,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
        hasMore: snapshot.docs.length === limitCount
      };
    } catch (error) {
      console.error('Error getting conversations:', error);
      return { conversations: [], lastDoc: null, hasMore: false };
    }
  };
  
  /**
   * Subscribe to user's conversations with real-time updates
   */
  export const subscribeToUserConversations = (userId, callback, limitCount = 50) => {
    if (!userId) return () => {};
  
    const q = query(
      collection(db, 'conversations'),
      where('userId', '==', userId),
      orderBy('lastMessageAt', 'desc'),
      limit(limitCount)
    );
  
    return onSnapshot(q, (snapshot) => {
      const conversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(conversations);
    }, (error) => {
      console.error('Error subscribing to conversations:', error);
      callback([]);
    });
  };
  
  /**
   * Generate a conversation title from messages
   */
  const generateConversationTitle = (messages) => {
    const userMessages = messages.filter(msg => msg.type === 'user');
    if (userMessages.length > 0) {
      const firstMessage = userMessages[0].content;
      // Create a title from the first user message
      const title = firstMessage.length > 40 
        ? firstMessage.substring(0, 40).trim() + '...' 
        : firstMessage;
      return title;
    }
    return 'New Conversation';
  };
  
  /**
   * Search conversations by content
   */
  export const searchConversations = async (userId, searchTerm) => {
    try {
      const q = query(
        collection(db, 'conversations'),
        where('userId', '==', userId),
        orderBy('lastMessageAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      const allConversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      // Filter conversations that contain the search term
      const filteredConversations = allConversations.filter(conversation => {
        const searchLower = searchTerm.toLowerCase();
        
        // Search in conversation title
        if (conversation.title && conversation.title.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Search in message content
        return conversation.messages.some(message => 
          message.content && message.content.toLowerCase().includes(searchLower)
        );
      });
  
      return filteredConversations;
    } catch (error) {
      console.error('Error searching conversations:', error);
      return [];
    }
  };
  
  /**
   * Archive/unarchive a conversation
   */
  export const toggleConversationArchive = async (conversationId, isArchived) => {
    try {
      await setDoc(doc(db, 'conversations', conversationId), {
        isArchived: !isArchived,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Error toggling archive status:', error);
      throw error;
    }
  };
  
  /**
   * Get conversation statistics for a user
   */
  export const getConversationStats = async (userId) => {
    try {
      const q = query(
        collection(db, 'conversations'),
        where('userId', '==', userId)
      );
      
      const snapshot = await getDocs(q);
      const conversations = snapshot.docs.map(doc => doc.data());
      
      const stats = {
        totalConversations: conversations.length,
        totalMessages: conversations.reduce((sum, conv) => sum + (conv.messageCount || 0), 0),
        categoryCounts: {},
        oldestConversation: null,
        newestConversation: null
      };
  
      // Calculate category counts
      conversations.forEach(conv => {
        stats.categoryCounts[conv.category] = (stats.categoryCounts[conv.category] || 0) + 1;
      });
  
      // Find oldest and newest
      if (conversations.length > 0) {
        const sorted = conversations.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        stats.oldestConversation = sorted[0].createdAt;
        stats.newestConversation = sorted[sorted.length - 1].createdAt;
      }
  
      return stats;
    } catch (error) {
      console.error('Error getting conversation stats:', error);
      return {
        totalConversations: 0,
        totalMessages: 0,
        categoryCounts: {},
        oldestConversation: null,
        newestConversation: null
      };
    }
  };