/**
 * useStorage Hook
 * 
 * Provides easy access to AWS Amplify Storage (S3) operations
 * Works with the existing S3 bucket: goldtech-consulting-images
 */

import { useState, useCallback } from 'react';
import { getUrl, uploadData, remove, list } from '@aws-amplify/storage';

/**
 * Custom hook for Amplify Storage operations
 * 
 * @param {string} level - Storage access level ('public', 'protected', 'private')
 * @returns {Object} Storage operations and state
 */
export const useStorage = (level = 'public') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Get a public URL for a file in S3
   * 
   * @param {string} key - S3 object key (e.g., 'projects/image.png')
   * @returns {Promise<string>} Public URL}
   */
  const getFileUrl = useCallback(async (key) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = await getUrl({
        key,
        options: {
          accessLevel: level,
        },
      });
      
      return url.url.toString();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [level]);

  /**
   * Upload a file to S3
   * 
   * @param {string} key - S3 object key (e.g., 'projects/image.png')
   * @param {File|Blob|string} data - File data to upload
   * @param {Object} options - Additional upload options
   * @returns {Promise<Object>} Upload result
   */
  const uploadFile = useCallback(async (key, data, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const result = await uploadData({
        key,
        data,
        options: {
          accessLevel: level,
          contentType: options.contentType,
          cacheControl: options.cacheControl || 'public, max-age=31536000',
          ...options,
        },
      }).result;

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [level]);

  /**
   * Delete a file from S3
   * 
   * @param {string} key - S3 object key to delete
   * @returns {Promise<void>}
   */
  const deleteFile = useCallback(async (key) => {
    try {
      setLoading(true);
      setError(null);

      await remove({
        key,
        options: {
          accessLevel: level,
        },
      });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [level]);

  /**
   * List files in S3
   * 
   * @param {string} path - Path prefix to list (e.g., 'projects/')
   * @param {Object} options - List options
   * @returns {Promise<Array>} List of file keys
   */
  const listFiles = useCallback(async (path = '', options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const result = await list({
        path,
        options: {
          accessLevel: level,
          ...options,
        },
      });

      return result.items || [];
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [level]);

  /**
   * Get optimized image URL (via Lambda function if available)
   * Falls back to direct S3 URL if Lambda is not configured
   * 
   * @param {string} key - S3 object key
   * @param {Object} options - Image optimization options (width, height, format)
   * @returns {Promise<string>} Optimized image URL
   */
  const getOptimizedImageUrl = useCallback(async (key, options = {}) => {
    const lambdaUrl = process.env.REACT_APP_IMAGE_CDN_URL;
    
    // If Lambda function URL is configured, use it for optimization
    if (lambdaUrl) {
      const params = new URLSearchParams({
        key,
        ...(options.width && { w: options.width }),
        ...(options.height && { h: options.height }),
        ...(options.format && { f: options.format }),
      });
      
      return `${lambdaUrl}?${params.toString()}`;
    }
    
    // Otherwise, return direct S3 URL
    return getFileUrl(key);
  }, [getFileUrl]);

  return {
    getFileUrl,
    uploadFile,
    deleteFile,
    listFiles,
    getOptimizedImageUrl,
    loading,
    error,
  };
};

/**
 * Utility function to get a public S3 URL directly
 * Useful for static image references
 * 
 * @param {string} key - S3 object key
 * @returns {string} Public S3 URL
 */
export const getS3Url = (key) => {
  const bucket = 'goldtech-consulting-images';
  const region = 'us-east-2';
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

/**
 * Utility function to get optimized image URL via Lambda
 * 
 * @param {string} key - S3 object key
 * @param {Object} options - Image optimization options
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (key, options = {}) => {
  const lambdaUrl = process.env.REACT_APP_IMAGE_CDN_URL;
  
  if (lambdaUrl) {
    const params = new URLSearchParams({
      key,
      ...(options.width && { w: options.width }),
      ...(options.height && { h: options.height }),
      ...(options.format && { f: options.format }),
    });
    
    return `${lambdaUrl}?${params.toString()}`;
  }
  
  // Fallback to direct S3 URL
  return getS3Url(key);
};

export default useStorage;
