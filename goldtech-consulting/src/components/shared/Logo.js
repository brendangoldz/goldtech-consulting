import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Logo - Reusable logo component with accessibility features
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
        src="/goldtech-logo.svg"
        alt="GoldTech Consulting"
        className={`w-auto`}
        loading="eager"
      />
    </motion.div>
  );

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
