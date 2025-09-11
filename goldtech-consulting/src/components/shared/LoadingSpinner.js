import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * LoadingSpinner - Reusable loading spinner component
 * 
 * Features:
 * - Multiple sizes
 * - Customizable colors
 * - Accessibility support
 * - Smooth animations
 * - Optional text
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.size - Spinner size (small, medium, large)
 * @param {string} props.color - Spinner color (primary, secondary, white)
 * @param {string} props.text - Optional loading text
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.ariaLabel - ARIA label for accessibility
 * @returns {JSX.Element} Rendered loading spinner
 */
const LoadingSpinner = ({
  size = 'medium',
  color = 'primary',
  text,
  className = '',
  ariaLabel = 'Loading',
  ...props
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-gold',
    secondary: 'text-navy',
    white: 'text-white'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const spinnerClasses = [
    sizeClasses[size],
    colorClasses[color],
    className
  ].filter(Boolean).join(' ');

  const textClasses = [
    'ml-2',
    textSizeClasses[size],
    colorClasses[color]
  ].filter(Boolean).join(' ');

  return (
    <div 
      className="flex items-center justify-center" 
      role="status" 
      aria-label={ariaLabel}
      {...props}
    >
      <motion.div
        className={spinnerClasses}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </motion.div>
      
      {text && (
        <span className={textClasses}>
          {text}
        </span>
      )}
      
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
};

/**
 * LoadingOverlay - Full-screen loading overlay
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isVisible - Whether overlay is visible
 * @param {string} props.text - Loading text
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Rendered loading overlay
 */
const LoadingOverlay = ({
  isVisible = false,
  text = 'Loading...',
  className = '',
  ...props
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Loading overlay"
      {...props}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <LoadingSpinner size="large" text={text} />
      </div>
    </motion.div>
  );
};

/**
 * LoadingSkeleton - Skeleton loading component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.variant - Skeleton variant (text, circular, rectangular)
 * @param {string} props.width - Skeleton width
 * @param {string} props.height - Skeleton height
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Rendered skeleton
 */
const LoadingSkeleton = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-gray-200 animate-pulse rounded';
  
  const variantClasses = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const skeletonClasses = [
    baseClasses,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  const style = {
    width: width || undefined,
    height: height || undefined
  };

  return (
    <div
      className={skeletonClasses}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  text: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string
};

LoadingOverlay.propTypes = {
  isVisible: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string
};

LoadingSkeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'circular', 'rectangular']),
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string
};

// Attach sub-components to main component
LoadingSpinner.Overlay = LoadingOverlay;
LoadingSpinner.Skeleton = LoadingSkeleton;

export default LoadingSpinner;
