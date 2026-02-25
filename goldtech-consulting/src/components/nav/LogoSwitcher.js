import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from '../shared/Logo';

const LogoSwitcher = ({
  canSwitch,
  isLogoDropdownOpen,
  isMarketing,
  logoVariant,
  onToggle,
  onSwitchSite
}) => {
  if (!canSwitch) {
    return <Logo size="small" variant={logoVariant} />;
  }

  return (
    <div className="logo-dropdown-container relative">
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        onClick={onToggle}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onToggle();
          }
        }}
        aria-label={`Switch between Consulting and Marketing. Currently viewing ${isMarketing ? 'Marketing' : 'Consulting'}`}
        aria-expanded={isLogoDropdownOpen}
        aria-haspopup="true"
      >
        <Logo size="small" variant={logoVariant} />
        {/* Dropdown Arrow */}
        <motion.div
          animate={{ rotate: isLogoDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`${isMarketing ? 'text-marketing-primary' : 'text-gold'}`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isLogoDropdownOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
            style={{ minWidth: '200px' }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="menu"
            aria-label="Website selection menu"
          >
            {/* Option: Switch to Consulting */}
            {isMarketing && (
              <motion.button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gold/10 transition-colors duration-200 text-left group"
                onClick={() => onSwitchSite('consulting')}
                role="menuitem"
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <img
                    src="/goldtech-logo.svg"
                    alt="GoldTech Consulting"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-navy group-hover:text-gold transition-colors">
                    Consulting
                  </div>
                  <div className="text-xs text-gray-500">
                    Software Development
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            )}

            {/* Option: Switch to Marketing */}
            {!isMarketing && (
              <motion.button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-marketing-primary/10 transition-colors duration-200 text-left group"
                onClick={() => onSwitchSite('marketing')}
                role="menuitem"
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <img
                    src="/goldtech-marketing-logo.svg"
                    alt="GoldTech Marketing"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-navy group-hover:text-marketing-primary transition-colors">
                    Marketing
                  </div>
                  <div className="text-xs text-gray-500">
                    Digital Marketing
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-marketing-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

LogoSwitcher.propTypes = {
  canSwitch: PropTypes.bool.isRequired,
  isLogoDropdownOpen: PropTypes.bool.isRequired,
  isMarketing: PropTypes.bool.isRequired,
  logoVariant: PropTypes.oneOf(['consulting', 'marketing']).isRequired,
  onToggle: PropTypes.func.isRequired,
  onSwitchSite: PropTypes.func.isRequired
};

export default LogoSwitcher;
