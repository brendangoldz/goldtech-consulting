import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * SectionHeader - Reusable section header component
 * 
 * Features:
 * - Animated entrance effects
 * - Flexible layout options
 * - Accessibility support
 * - Consistent typography
 * - Responsive design
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.eyebrow - Small text above the title
 * @param {string} props.title - Main heading text
 * @param {string} props.subtitle - Description text below title
 * @param {boolean} props.center - Whether to center align content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.level - Heading level (h1, h2, h3, etc.)
 * @param {string} props.variant - Content variant: 'consulting' or 'marketing'
 * @returns {JSX.Element} Rendered section header
 */
const SectionHeader = ({ 
  eyebrow, 
  title, 
  subtitle, 
  center = true, 
  className = '',
  level = 'h2',
  titleId,
  variant = 'consulting'
}) => {
  const isMarketing = variant === 'marketing';
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const HeadingTag = level;

  return (
    <motion.header
      className={`mb-12 ${center ? 'text-center' : ''} ${className}`}
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      role="banner"
    >
      {eyebrow && (
        <motion.div
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${
            isMarketing 
              ? 'bg-marketing-primary/10 border border-marketing-primary/20 text-marketing-primary' 
              : 'bg-gold/10 border border-gold/20 text-gold'
          }`}
          variants={fadeInUp}
          role="img"
          aria-label={`Section category: ${eyebrow}`}
        >
          {eyebrow}
        </motion.div>
      )}
      
      <motion.div variants={fadeInUp}>
        <HeadingTag id={titleId} className="text-4xl sm:text-5xl font-bold text-navy">
          {title}
        </HeadingTag>
      </motion.div>
      
      {subtitle && (
        <motion.p
          className={`mt-4 text-gray-600 ${center ? 'max-w-2xl mx-auto' : ''}`}
          variants={fadeInUp}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
};

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  center: PropTypes.bool,
  className: PropTypes.string,
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  titleId: PropTypes.string,
  variant: PropTypes.oneOf(['consulting', 'marketing'])
};

export default SectionHeader;
