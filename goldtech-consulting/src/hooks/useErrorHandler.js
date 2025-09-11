import { useCallback, useState } from 'react';

/**
 * useErrorHandler - Custom hook for handling errors in functional components
 * 
 * Features:
 * - Centralized error handling
 * - Error state management
 * - Error reporting integration
 * - Retry functionality
 * - Error logging
 * 
 * @param {Object} options - Hook options
 * @param {Function} options.onError - Error callback function
 * @param {Function} options.onRetry - Retry callback function
 * @param {boolean} options.logErrors - Whether to log errors to console
 * @returns {Object} Error handling utilities
 */
export const useErrorHandler = (options = {}) => {
  const { onError, onRetry, logErrors = true } = options;
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  /**
   * Handle error with logging and callback
   * 
   * @param {Error} error - The error to handle
   * @param {Object} context - Additional context information
   */
  const handleError = useCallback((error, context = {}) => {
    const errorInfo = {
      error,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Log error in development
    if (logErrors && process.env.NODE_ENV === 'development') {
      console.error('Error handled by useErrorHandler:', errorInfo);
    }

    // Set error state
    setError(error);

    // Call error callback if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // In production, you would typically send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }, [onError, logErrors]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Retry operation with error handling
   * 
   * @param {Function} operation - The operation to retry
   * @param {Object} context - Additional context information
   */
  const retry = useCallback(async (operation, context = {}) => {
    if (!operation || typeof operation !== 'function') {
      throw new Error('Retry operation must be a function');
    }

    setIsRetrying(true);
    clearError();

    try {
      const result = await operation();
      
      // Call retry callback if provided
      if (onRetry) {
        onRetry(result, context);
      }
      
      return result;
    } catch (error) {
      handleError(error, { ...context, isRetry: true });
      throw error;
    } finally {
      setIsRetrying(false);
    }
  }, [handleError, clearError, onRetry]);

  /**
   * Execute async operation with error handling
   * 
   * @param {Function} operation - The operation to execute
   * @param {Object} context - Additional context information
   * @returns {Promise} Promise that resolves with operation result
   */
  const executeWithErrorHandling = useCallback(async (operation, context = {}) => {
    if (!operation || typeof operation !== 'function') {
      throw new Error('Operation must be a function');
    }

    clearError();

    try {
      const result = await operation();
      return result;
    } catch (error) {
      handleError(error, context);
      throw error;
    }
  }, [handleError, clearError]);

  return {
    error,
    isRetrying,
    handleError,
    clearError,
    retry,
    executeWithErrorHandling,
    hasError: !!error
  };
};

/**
 * useAsyncError - Custom hook for handling async operations with error handling
 * 
 * @param {Function} asyncFunction - The async function to execute
 * @param {Array} dependencies - Dependencies for the async function
 * @param {Object} options - Hook options
 * @returns {Object} Async operation state and utilities
 */
export const useAsyncError = (asyncFunction, dependencies = [], options = {}) => {
  const { onError, onSuccess, onRetry } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction(...args);
      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      setError(error);
      
      if (onError) {
        onError(error);
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction, onError, onSuccess]);

  const retry = useCallback(async (...args) => {
    if (onRetry) {
      onRetry();
    }
    
    return execute(...args);
  }, [execute, onRetry]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    retry,
    reset,
    hasError: !!error,
    hasData: !!data
  };
};

/**
 * useErrorBoundary - Custom hook for functional error boundaries
 * 
 * @param {Function} onError - Error callback function
 * @returns {Function} Function to throw errors to error boundary
 */
export const useErrorBoundary = (onError) => {
  const [error, setError] = useState(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error) => {
    setError(error);
    
    if (onError) {
      onError(error);
    }
  }, [onError]);

  if (error) {
    throw error;
  }

  return { captureError, resetError };
};
