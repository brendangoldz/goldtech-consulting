import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import LogoSwitcher from './LogoSwitcher';
import DesktopNavLinks from './DesktopNavLinks';
import MobileNavMenu from './MobileNavMenu';

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
    { id: 'contact', label: 'Contact' },
    { id: 'blog', path: '/blog', label: 'Blog' }
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
   * @param {Object} item - Nav item (id, label, optional path)
   */
  const handleNavClick = useCallback((item) => {
    if (item.path) {
      navigate(item.path);
    } else {
      scrollTo(item.id);
    }
    setIsMobileMenuOpen(false);
  }, [navigate, scrollTo]);

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
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-h-[3.5rem] items-center justify-between gap-3">
          {/* Logo with Dropdown */}
          <LogoSwitcher
            canSwitch={canSwitch}
            isLogoDropdownOpen={isLogoDropdownOpen}
            isMarketing={isMarketing}
            logoVariant={logoVariant}
            onToggle={handleLogoDropdownToggle}
            onSwitchSite={handleSwitchSite}
          />
          
          {/* Desktop Navigation */}
          <DesktopNavLinks
            navItems={navItems}
            activeSection={activeSection}
            onNavClick={handleNavClick}
            isMarketing={isMarketing}
          />

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
          <MobileNavMenu
            navItems={navItems}
            activeSection={activeSection}
            onNavClick={handleNavClick}
            isMarketing={isMarketing}
          />
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
