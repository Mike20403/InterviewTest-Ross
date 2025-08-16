/**
 * API Configuration Constants
 */

export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

export const API_ENDPOINTS = {
  POSTS: '/posts',
  USERS: '/users',
  COMMENTS: '/comments',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
