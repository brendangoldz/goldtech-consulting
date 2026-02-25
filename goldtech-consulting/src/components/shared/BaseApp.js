import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';

import Navigation from '../nav/Navigation';
import HeroSection from '../hero/HeroSection';
import AboutSection from '../about/About';
import ServicesSection from '../services/ServicesSection';
import ProjectsSection from '../projects/ProjectsSection';
import ContactSection from '../contact/ContactSection';
import Footer from '../footer/Footer';
import Seo from './Seo';

/**
 * BaseApp - Shared application wrapper for Consulting and Marketing.
 */
const BaseApp = ({ variant, rootClassName, logoVariant, seo }) => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const getNavigationOffset = useCallback(() => {
    const navigation = document.querySelector('nav[aria-label="Main navigation"]');
    if (!navigation) {
      return 96;
    }

    return navigation.getBoundingClientRect().height + 16;
  }, []);

  /**
   * Smooth scroll to a specific section.
   * 
   * @param {string} id - The ID of the section to scroll to
   */
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const y =
        element.getBoundingClientRect().top +
        window.scrollY -
        getNavigationOffset();
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
      
      // Update focus for accessibility
      element.focus({ preventScroll: true });
    }
  }, [getNavigationOffset]);

  /**
   * Handle scroll events to update active section.
   */
  const handleScroll = useCallback(() => {
    const sectionIds = ['home', 'about', 'services', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 120;
    
    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (!element) continue;
      
      const { offsetTop, offsetHeight } = element;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        setActiveSection(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    // Add scroll event listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set active section
    handleScroll();
    
    // Cleanup event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const targetId = location.hash.replace('#', '');
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }
    const y =
      target.getBoundingClientRect().top +
      window.scrollY -
      getNavigationOffset();
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, [location.hash, getNavigationOffset]);

  /**
   * Handle navigation back to landing page.
   */
  const handleBackToLanding = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className={rootClassName} data-variant={variant}>
      <Seo {...seo} />
      {/* Skip navigation links for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-navy text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>
      
      <Navigation 
        activeSection={activeSection} 
        scrollTo={scrollTo}
        onBackToLanding={handleBackToLanding}
        logoVariant={logoVariant}
      />
      
      <main id="main-content" role="main">
        <HeroSection scrollTo={scrollTo} variant={variant} />
        <AboutSection variant={variant} />
        <ServicesSection variant={variant} />
        <ProjectsSection variant={variant} />
        <ContactSection variant={variant} />
      </main>
      
      <Footer variant={variant} />
    </div>
  );
};

BaseApp.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing']).isRequired,
  rootClassName: PropTypes.string.isRequired,
  logoVariant: PropTypes.oneOf(['consulting', 'marketing']).isRequired,
  seo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    schema: PropTypes.object.isRequired
  }).isRequired
};

export default BaseApp;
