/**
 * OptimizedImage - Progressive image loading component with CDN support
 * 
 * Features:
 * - Automatic format selection (WebP/AVIF fallback)
 * - Lazy loading
 * - Responsive images with srcset
 * - Placeholder/blur-up support
 * - Error handling
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getOptimizedImageUrl, getBestFormat } from '../../utils/imageUtils';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  className = '',
  loading = 'lazy',
  onLoad,
  onError,
  placeholder,
  ...props
}) => {
  const [imageFormat, setImageFormat] = useState('webp');
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Determine best format on mount
  useEffect(() => {
    getBestFormat().then(format => {
      setImageFormat(format);
    });
  }, []);

  // Generate optimized URL
  useEffect(() => {
    if (src && imageFormat) {
      const optimizedUrl = getOptimizedImageUrl(src, {
        width,
        height,
        quality,
        format: imageFormat,
      });
      setImageSrc(optimizedUrl);
    } else {
      setImageSrc(src);
    }
  }, [src, imageFormat, width, height, quality]);

  const handleLoad = useCallback((e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  }, [onLoad]);

  const handleError = useCallback((e) => {
    // Fallback to original image if optimized version fails
    if (imageSrc !== src) {
      setImageSrc(src);
      setHasError(false);
    } else {
      setHasError(true);
      if (onError) onError(e);
    }
  }, [imageSrc, src, onError]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Placeholder/Blur */}
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
          aria-hidden="true"
        />
      )}

      {/* Main Image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${hasError ? 'opacity-50' : ''}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          {...props}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  quality: PropTypes.number,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  placeholder: PropTypes.string,
};

export default OptimizedImage;
