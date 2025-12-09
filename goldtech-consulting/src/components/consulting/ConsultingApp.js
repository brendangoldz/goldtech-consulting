import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '../nav/Navigation';
import HeroSection from '../hero/HeroSection';
import AboutSection from '../about/About';
import ServicesSection from '../services/ServicesSection';
import ProjectsSection from '../projects/ProjectsSection';
import ContactSection from '../contact/ContactSection';
import Footer from '../footer/Footer';

/**
 * ConsultingApp - Main application component for Goldtech Consulting
 * 
 * Features:
 * - Section-based navigation with active state tracking
 * - Smooth scrolling between sections
 * - Accessibility support with proper ARIA attributes
 * - Performance optimized with useCallback
 * - Back navigation to landing page
 * 
 * @component
 * @returns {JSX.Element} Rendered consulting application
 */
const ConsultingApp = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  /**
   * Smooth scroll to a specific section
   * 
   * @param {string} id - The ID of the section to scroll to
   */
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update focus for accessibility
      element.focus({ preventScroll: true });
    }
  }, []);

  /**
   * Handle scroll events to update active section
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

  /**
   * Handle navigation back to landing page
   */
  const handleBackToLanding = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
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
        logoVariant="consulting"
      />
      
      <main id="main-content" role="main">
        <HeroSection scrollTo={scrollTo} />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

ConsultingApp.propTypes = {};

export default ConsultingApp;

