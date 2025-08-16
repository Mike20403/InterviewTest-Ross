import { useState, useEffect } from 'react';
import { fetchPosts } from '../services/api';

/**
 * Custom hook for managing posts state and API calls
 * @param {number} limit - Number of posts to fetch
 * @returns {Object} Posts state and actions
 */
export const usePosts = (limit = 5) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts(limit);
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshPosts = () => {
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, [limit]);

  return {
    posts,
    loading,
    error,
    refreshPosts,
  };
};
