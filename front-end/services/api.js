import { API_CONFIG, API_ENDPOINTS, HTTP_STATUS } from './constants';

/**
 * Generic HTTP client with error handling and timeout
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 */
const httpClient = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    
    throw error;
  }
};

/**
 * Fetches posts from the API
 * @param {number} limit - Number of posts to fetch (default: 5)
 * @returns {Promise<Array>} Array of posts
 */
export const fetchPosts = async (limit = 5) => {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POSTS}`;
    const response = await httpClient(url);
    const data = await response.json();
    
    return data.slice(0, limit);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
};

/**
 * Fetches a single post by ID
 * @param {number} id - Post ID
 * @returns {Promise<Object>} Post object
 */
export const fetchPostById = async (id) => {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POSTS}/${id}`;
    const response = await httpClient(url);
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
};



