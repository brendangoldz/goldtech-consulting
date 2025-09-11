import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Logo - Reusable logo component with accessibility features
 * 
 * Features:
 * - Multiple size variants
 * - Hover animations
 * - Proper alt text for accessibility
 * - Responsive design
 * - Focus management
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Logo size variant
 * @param {Function} props.onClick - Click handler for interactive logo
 * @param {string} props.href - Link destination for logo
 * @returns {JSX.Element} Rendered logo
 */
const Logo = ({ className = '', size = 'default', onClick, href }) => {
  const sizeClasses = {
    small: 'h-8',
    default: 'h-16',
    large: 'h-18'
  };

  const logoSrc = '/goldtech-logo-edited-hires-navy.png';

  const logoElement = (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      role={onClick || href ? 'button' : 'img'}
      tabIndex={onClick || href ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && (onClick || href)) {
          e.preventDefault();
          if (onClick) onClick();
          if (href) window.location.href = href;
        }
      }}
      aria-label={onClick || href ? 'GoldTech Consulting - Go to homepage' : undefined}
    >
      <img
        src={logoSrc}
        alt="GoldTech Consulting - Professional web development and consulting services"
        className={`${sizeClasses[size]} w-auto object-cover`}
        style={{ objectPosition: 'center 30%' }}
        loading="eager"
        width={size === 'small' ? 32 : size === 'large' ? 72 : 64}
        height={size === 'small' ? 32 : size === 'large' ? 72 : 64}
      />
    </motion.div>
  );

  // Wrap in link if href is provided
  if (href) {
    return (
      <a
        href={href}
        className="focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 rounded"
        aria-label="GoldTech Consulting - Go to homepage"
      >
        {logoElement}
      </a>
    );
  }

  return logoElement;
};

Logo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  onClick: PropTypes.func,
  href: PropTypes.string
};

export default Logo;
