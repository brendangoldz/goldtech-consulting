import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from '../shared/Logo';
import { getThemeClasses } from '../../config/theme';

/**
 * Navigation - Main navigation component with accessibility features
 * 
 * Features:
 * - Responsive navigation with mobile menu
 * - Active section tracking
 * - Keyboard navigation support
 * - ARIA attributes for screen readers
 * - Smooth animations with Framer Motion
 * - Optional back navigation to landing page
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.activeSection - Currently active section ID
 * @param {Function} props.scrollTo - Function to scroll to a section
 * @param {Function} [props.onBackToLanding] - Optional function to navigate back to landing page
 * @param {string} [props.logoVariant] - Logo variant ('consulting' or 'marketing')
 * @returns {JSX.Element} Rendered navigation
 */
const Navigation = ({ activeSection, scrollTo, onBackToLanding, logoVariant = 'consulting' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoDropdownOpen, setIsLogoDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMarketing = logoVariant === 'marketing';
  const canSwitch = location.pathname === '/consulting' || location.pathname === '/marketing';

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  /**
   * Handle scroll events to update navigation background
   */
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  /**
   * Handle navigation item click
   * 
   * @param {string} sectionId - The section ID to navigate to
   */
  const handleNavClick = useCallback((sectionId) => {
    scrollTo(sectionId);
    setIsMobileMenuOpen(false);
  }, [scrollTo]);

  /**
   * Handle keyboard navigation
   * 
   * @param {KeyboardEvent} event - Keyboard event
   */
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsMobileMenuOpen(false);
      setIsLogoDropdownOpen(false);
    }
  }, []);

  /**
   * Handle logo dropdown toggle
   */
  const handleLogoDropdownToggle = useCallback(() => {
    if (canSwitch) {
      setIsLogoDropdownOpen(prev => !prev);
    }
  }, [canSwitch]);

  /**
   * Handle switching to the other site
   */
  const handleSwitchSite = useCallback((targetSite) => {
    if (targetSite === 'consulting' && location.pathname !== '/consulting') {
      navigate('/consulting');
    } else if (targetSite === 'marketing' && location.pathname !== '/marketing') {
      navigate('/marketing');
    }
    setIsLogoDropdownOpen(false);
  }, [location.pathname, navigate]);

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLogoDropdownOpen && !event.target.closest('.logo-dropdown-container')) {
        setIsLogoDropdownOpen(false);
      }
    };

    if (isLogoDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isLogoDropdownOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScroll, handleKeyDown]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Dropdown */}
          {canSwitch ? (
            <div className="logo-dropdown-container relative">
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleLogoDropdownToggle}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLogoDropdownToggle();
                  }
                }}
                aria-label={`Switch between Consulting and Marketing. Currently viewing ${isMarketing ? 'Marketing' : 'Consulting'}`}
                aria-expanded={isLogoDropdownOpen}
                aria-haspopup="true"
              >
                <Logo 
                  size="large" 
                  variant={logoVariant}
                />
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
                    className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 min-w-[200px]"
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
                        onClick={() => handleSwitchSite('consulting')}
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
                        onClick={() => handleSwitchSite('marketing')}
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
          ) : (
            <Logo 
              size="large" 
              variant={logoVariant}
            />
          )}
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8" role="menubar">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative font-bold transition-colors duration-200 focus:outline-none ${isMarketing ? 'focus:ring-marketing-primary/40' : 'focus:ring-gold/40'} focus:ring-2 focus:ring-offset-2 rounded px-2 py-1 ${
                  activeSection === item.id 
                    ? (isMarketing ? 'text-marketing-primary' : 'text-gold')
                    : (isMarketing ? 'text-navy hover:text-marketing-primary' : 'text-navy hover:text-gold')
                }`}
                whileHover={{ y: -2 }}
                role="menuitem"
                aria-current={activeSection === item.id ? 'page' : undefined}
                aria-label={`Navigate to ${item.label} section`}
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

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg text-navy hover:bg-gray-100 focus:outline-none focus:ring-2 ${isMarketing ? 'focus:ring-marketing-primary/40' : 'focus:ring-gold/40'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
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
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none ${isMarketing ? 'focus:ring-marketing-primary/40' : 'focus:ring-gold/40'} focus:ring-2 ${
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
        )}
      </div>
    </motion.nav>
  );
};

Navigation.propTypes = {
  activeSection: PropTypes.string.isRequired,
  scrollTo: PropTypes.func.isRequired,
  onBackToLanding: PropTypes.func,
  logoVariant: PropTypes.oneOf(['consulting', 'marketing'])
};

export default Navigation;
