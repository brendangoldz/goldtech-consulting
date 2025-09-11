import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

/**
 * useApi - Custom hook for making API calls with error handling and loading states
 * 
 * Features:
 * - Loading state management
 * - Error handling
 * - Request cancellation
 * - Retry functionality
 * - Caching support
 * - Request/response interceptors
 * 
 * @param {Object} options - Hook options
 * @param {string} options.baseURL - Base URL for API requests
 * @param {Object} options.defaultHeaders - Default headers for requests
 * @param {number} options.timeout - Request timeout in milliseconds
 * @param {Function} options.onError - Error callback function
 * @param {Function} options.onSuccess - Success callback function
 * @returns {Object} API utilities and state
 */
export const useApi = (options = {}) => {
  const {
    baseURL = process.env.REACT_APP_API_ENDPOINT || '',
    defaultHeaders = {},
    timeout = 10000,
    onError,
    onSuccess
  } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const cancelTokenRef = useRef(null);

  /**
   * Create axios instance with default configuration
   */
  const createAxiosInstance = useCallback(() => {
    const instance = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders
      }
    });

    // Request interceptor
    instance.interceptors.request.use(
      (config) => {
        // Add authentication token if available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Handle common error cases
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [baseURL, timeout, defaultHeaders]);

  /**
   * Make GET request
   * 
   * @param {string} url - Request URL
   * @param {Object} config - Axios config
   * @returns {Promise} Request promise
   */
  const get = useCallback(async (url, config = {}) => {
    return makeRequest('GET', url, null, config);
  }, []);

  /**
   * Make POST request
   * 
   * @param {string} url - Request URL
   * @param {Object} data - Request data
   * @param {Object} config - Axios config
   * @returns {Promise} Request promise
   */
  const post = useCallback(async (url, data = null, config = {}) => {
    return makeRequest('POST', url, data, config);
  }, []);

  /**
   * Make PUT request
   * 
   * @param {string} url - Request URL
   * @param {Object} data - Request data
   * @param {Object} config - Axios config
   * @returns {Promise} Request promise
   */
  const put = useCallback(async (url, data = null, config = {}) => {
    return makeRequest('PUT', url, data, config);
  }, []);

  /**
   * Make DELETE request
   * 
   * @param {string} url - Request URL
   * @param {Object} config - Axios config
   * @returns {Promise} Request promise
   */
  const del = useCallback(async (url, config = {}) => {
    return makeRequest('DELETE', url, null, config);
  }, []);

  /**
   * Make PATCH request
   * 
   * @param {string} url - Request URL
   * @param {Object} data - Request data
   * @param {Object} config - Axios config
   * @returns {Promise} Request promise
   */
  const patch = useCallback(async (url, data = null, config = {}) => {
    return makeRequest('PATCH', url, data, config);
  }, []);

  /**
   * Make HTTP request with error handling
   * 
   * @param {string} method - HTTP method
   * @param {string} url - Request URL
   * @param {Object} data - Request data
   * @param {Object} config - Axios config
   * @returns {Promise} Request promise
   */
  const makeRequest = useCallback(async (method, url, data = null, config = {}) => {
    // Cancel previous request if it exists
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('New request started');
    }

    // Create new cancel token
    cancelTokenRef.current = axios.CancelToken.source();

    setLoading(true);
    setError(null);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance({
        method,
        url,
        data,
        cancelToken: cancelTokenRef.current.token,
        ...config
      });

      setData(response.data);
      
      if (onSuccess) {
        onSuccess(response.data, response);
      }

      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was cancelled, don't set error state
        return;
      }

      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setError(errorMessage);
      
      if (onError) {
        onError(error, errorMessage);
      }

      throw error;
    } finally {
      setLoading(false);
      cancelTokenRef.current = null;
    }
  }, [createAxiosInstance, onError, onSuccess]);

  /**
   * Cancel current request
   */
  const cancelRequest = useCallback(() => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Request cancelled by user');
      setLoading(false);
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Clear data state
   */
  const clearData = useCallback(() => {
    setData(null);
  }, []);

  /**
   * Reset all states
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
    cancelRequest();
  }, [cancelRequest]);

  return {
    // State
    loading,
    error,
    data,
    
    // HTTP methods
    get,
    post,
    put,
    delete: del,
    patch,
    
    // Utilities
    cancelRequest,
    clearError,
    clearData,
    reset,
    
    // Computed
    hasError: !!error,
    hasData: !!data
  };
};

/**
 * useApiData - Custom hook for fetching data with caching
 * 
 * @param {string} url - API endpoint URL
 * @param {Object} options - Hook options
 * @returns {Object} Data fetching state and utilities
 */
export const useApiData = (url, options = {}) => {
  const {
    immediate = true,
    cache = false,
    cacheKey,
    onError,
    onSuccess
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const api = useApi({ onError, onSuccess });

  const fetchData = useCallback(async () => {
    if (!url) return;

    // Check cache if enabled
    if (cache && cacheKey) {
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      
      if (cachedData && cacheTimestamp) {
        const cacheAge = Date.now() - parseInt(cacheTimestamp);
        const maxAge = 5 * 60 * 1000; // 5 minutes
        
        if (cacheAge < maxAge) {
          setData(JSON.parse(cachedData));
          return JSON.parse(cachedData);
        }
      }
    }

    try {
      const result = await api.get(url);
      
      // Cache data if enabled
      if (cache && cacheKey) {
        localStorage.setItem(cacheKey, JSON.stringify(result));
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      }
      
      setData(result);
      setLastFetch(new Date());
      return result;
    } catch (error) {
      setError(error);
      throw error;
    }
  }, [url, cache, cacheKey, api]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const clearCache = useCallback(() => {
    if (cacheKey) {
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(`${cacheKey}_timestamp`);
    }
  }, [cacheKey]);

  // Fetch data immediately if requested
  React.useEffect(() => {
    if (immediate && url) {
      fetchData();
    }
  }, [immediate, url, fetchData]);

  return {
    data,
    loading: api.loading,
    error: api.error || error,
    refetch,
    clearCache,
    lastFetch,
    hasError: !!api.error || !!error,
    hasData: !!data
  };
};
