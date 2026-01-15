import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Logo - Reusable logo component with accessibility features
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Logo size variant
 * @param {string} props.variant - Logo variant ('consulting' or 'marketing')
 * @param {Function} props.onClick - Click handler for interactive logo
 * @param {string} props.href - Link destination for logo
 * @returns {JSX.Element} Rendered logo
 */
const Logo = ({ className = '', size = 'default', variant = 'consulting', onClick, href }) => {
  /**
   * Get logo source and alt text based on variant
   * 
   * @param {string} variant - Logo variant
   * @returns {Object} Object with src and alt properties
   */
  const getLogoInfo = (variant) => {
    switch (variant) {
      case 'marketing':
        return {
          src: '/goldtech-marketing-logo.svg',
          alt: 'GoldTech Marketing'
        };
      case 'consulting':
      default:
        return {
          src: '/goldtech-logo.svg',
          alt: 'GoldTech Consulting'
        };
    }
  };

  const logoInfo = getLogoInfo(variant);
  /**
   * Get size-based width classes and styles
   * 
   * @param {string} size - Size variant
   * @returns {Object} Object with className and style properties
   */
  const getSizeStyles = (size) => {
    switch (size) {
      case 'small':
        return { className: 'w-auto', style: { height: '3em' } };
      case 'large':
        return { className: 'w-auto', style: { height: '6em' } };
      case 'extra-large':
        return { className: 'w-auto', style: { height: '15em' } };
      case 'default':
      default:
        return { className: 'w-auto', style: { height: '5em' } };
    }
  };

  const sizeStyles = getSizeStyles(size);

  const logoElement = (
    <motion.div
      className={`flex items-center ${className} relative`}
      whileHover={onClick || href ? { scale: 1.05 } : {}}
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
      aria-label={onClick || href ? `Click to switch to ${variant === 'consulting' ? 'GoldTech Marketing' : 'GoldTech Consulting'}` : `${logoInfo.alt} logo`}
      style={{ minHeight: sizeStyles.style.height }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={variant}
          src={logoInfo.src}
          alt={logoInfo.alt}
          className={sizeStyles.className}
          style={sizeStyles.style}
          loading="eager"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 rounded"
        aria-label={`${logoInfo.alt} - Go to homepage`}
      >
        {logoElement}
      </a>
    );
  }

  return logoElement;
};

Logo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large', 'extra-large']),
  variant: PropTypes.oneOf(['consulting', 'marketing']),
  onClick: PropTypes.func,
  href: PropTypes.string
};

export default Logo;
