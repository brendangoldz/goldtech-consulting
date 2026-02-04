/**
 * Image Utility Functions
 * 
 * Provides helper functions for image URL generation and optimization
 * Supports CDN URLs with automatic format selection based on browser support
 */

/**
 * Get optimized image URL
 * 
 * @param {string} imagePath - Path to image (e.g., '/projects/screenshot.png')
 * @param {Object} options - Optimization options
 * @param {number} options.width - Target width in pixels
 * @param {number} options.height - Target height in pixels
 * @param {number} options.quality - Quality 1-100 (default: 80)
 * @param {string} options.format - Format: 'webp', 'avif', 'jpeg', 'png' (default: 'webp')
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(imagePath, options = {}) {
  const {
    width = null,
    height = null,
    quality = 80,
    format = 'webp',
  } = options;

  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  // Get CDN base URL from environment
  const cdnBaseUrl = process.env.REACT_APP_IMAGE_CDN_URL || '';
  
  // If no CDN URL configured, return original path
  if (!cdnBaseUrl) {
    return imagePath;
  }

  // Build optimization path: /{width}x{height}/{quality}/{format}/{image-path}
  const dimensions = `${width || ''}x${height || ''}`;
  const optimizationPath = `${dimensions}/${quality}/${format}/${cleanPath}`;
  
  return `${cdnBaseUrl}${optimizationPath}`;
}

/**
 * Get responsive image srcset
 * 
 * @param {string} imagePath - Path to image
 * @param {Array<number>} widths - Array of widths for srcset
 * @param {Object} options - Additional options
 * @returns {string} srcset string
 */
export function getResponsiveSrcSet(imagePath, widths = [400, 800, 1200, 1600], options = {}) {
  return widths
    .map(width => {
      const url = getOptimizedImageUrl(imagePath, { ...options, width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Get image sources for picture element with format fallbacks
 * 
 * @param {string} imagePath - Path to image
 * @param {Object} options - Optimization options
 * @returns {Array<Object>} Array of source objects for <picture> element
 */
export function getImageSources(imagePath, options = {}) {
  const { width, height, quality = 80 } = options;
  
  // Try modern formats first, fallback to original
  const formats = ['avif', 'webp'];
  const sources = [];

  formats.forEach(format => {
    sources.push({
      srcSet: getOptimizedImageUrl(imagePath, { ...options, format, width, height, quality }),
      type: `image/${format}`,
    });
  });

  // Add original as fallback
  sources.push({
    srcSet: imagePath,
    type: null, // Browser will use file extension
  });

  return sources;
}

/**
 * Check if browser supports WebP
 */
export function supportsWebP() {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Check if browser supports AVIF
 */
export async function supportsAVIF() {
  if (typeof window === 'undefined') return false;
  
  return new Promise(resolve => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
}

/**
 * Get best format for current browser
 */
export async function getBestFormat() {
  if (await supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpeg';
}
