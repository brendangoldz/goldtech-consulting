import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const DesktopNavLinks = ({ navItems, activeSection, onNavClick, isMarketing }) => (
  <div className="hidden md:flex space-x-8" role="menubar">
    {navItems.map((item) => (
      <motion.button
        key={item.id}
        onClick={() => onNavClick(item)}
        className={`relative font-bold transition-colors duration-200 focus:outline-none ${isMarketing ? 'focus:ring-marketing-primary/40' : 'focus:ring-gold/40'} focus:ring-2 focus:ring-offset-2 rounded px-2 py-1 ${
          activeSection === item.id 
            ? (isMarketing ? 'text-marketing-primary' : 'text-gold')
            : (isMarketing ? 'text-navy hover:text-marketing-primary' : 'text-navy hover:text-gold')
        }`}
        whileHover={{ y: -2 }}
        role="menuitem"
        aria-current={activeSection === item.id ? 'page' : undefined}
        aria-label={item.path ? `Navigate to ${item.label}` : `Navigate to ${item.label} section`}
      >
        {item.label}
        {activeSection === item.id && (
          <motion.div
            className={`absolute -bottom-1 left-0 right-0 h-0.5 ${isMarketing ? 'bg-marketing-primary' : 'bg-gold'}`}
            layoutId="activeSection"
            initial={false}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />
        )}
      </motion.button>
    ))}
  </div>
);

DesktopNavLinks.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string
  })).isRequired,
  activeSection: PropTypes.string.isRequired,
  onNavClick: PropTypes.func.isRequired,
  isMarketing: PropTypes.bool.isRequired
};

export default DesktopNavLinks;
