import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const MobileNavMenu = ({ navItems, activeSection, onNavClick, isMarketing }) => (
  <motion.div
    id="mobile-menu"
    className="md:hidden bg-white border-t border-gray-200 shadow-lg"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
    role="menu"
    aria-label="Mobile navigation menu"
  >
    <div className="px-4 py-2 space-y-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavClick(item)}
          className={`block w-full text-left px-3 py-2 rounded-lg font-normal transition-colors duration-200 focus:outline-none ${isMarketing ? 'focus:ring-marketing-primary/40' : 'focus:ring-gold/40'} focus:ring-2 ${
            activeSection === item.id
              ? (isMarketing ? 'bg-marketing-primary/10 text-marketing-primary' : 'bg-gold/10 text-gold')
              : 'text-navy hover:bg-gray-100'
          }`}
          role="menuitem"
          aria-current={activeSection === item.id ? 'page' : undefined}
        >
          {item.label}
        </button>
      ))}
    </div>
  </motion.div>
);

MobileNavMenu.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string
  })).isRequired,
  activeSection: PropTypes.string.isRequired,
  onNavClick: PropTypes.func.isRequired,
  isMarketing: PropTypes.bool.isRequired
};

export default MobileNavMenu;
