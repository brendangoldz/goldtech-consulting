import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Card - Reusable card component
 * 
 * Features:
 * - Multiple variants
 * - Hover animations
 * - Accessibility support
 * - Flexible content
 * - Responsive design
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.variant - Card variant (default, primary, success, warning, error)
 * @param {boolean} props.hoverable - Whether card has hover effects
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler for interactive cards
 * @param {string} props.role - ARIA role
 * @param {string} props.ariaLabel - ARIA label
 * @returns {JSX.Element} Rendered card
 */
const Card = ({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  onClick,
  role,
  ariaLabel,
  ...props
}) => {
  const baseClasses = 'rounded-2xl shadow-sm border transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white border-gray-100',
    primary: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200'
  };
  
  const hoverClasses = hoverable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  const interactiveClasses = onClick ? 'focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2' : '';

  const cardClasses = [
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    interactiveClasses,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event);
    }
  };

  const CardComponent = onClick ? motion.div : motion.div;

  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={role}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
      whileHover={hoverable ? { scale: 1.02 } : undefined}
      whileTap={hoverable ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

/**
 * CardHeader - Card header component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Header content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Rendered card header
 */
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`p-6 pb-4 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * CardBody - Card body component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Body content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Rendered card body
 */
const CardBody = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * CardFooter - Card footer component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Footer content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Rendered card footer
 */
const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  hoverable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  role: PropTypes.string,
  ariaLabel: PropTypes.string
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Attach sub-components to main component
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
