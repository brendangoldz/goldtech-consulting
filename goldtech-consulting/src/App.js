import React, { useState, useEffect, useCallback } from 'react';

import Navigation from './components/nav/Navigation';
import HeroSection from './components/hero/HeroSection';
import AboutSection from './components/about/About';
import ServicesSection from './components/services/ServicesSection';
import ProjectsSection from './components/projects/ProjectsSection';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/footer/Footer';

import './index.css';
import './App.css';

/**
 * App - Main application component
 * 
 * Features:
 * - Section-based navigation with active state tracking
 * - Smooth scrolling between sections
 * - Accessibility support with proper ARIA attributes
 * - Performance optimized with useCallback
 * 
 * @component
 * @returns {JSX.Element} Rendered application
 */
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

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

  return (
    <div className="min-h-screen bg-white">
      {/* Skip navigation links for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-navy text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>
      
      <Navigation activeSection={activeSection} scrollTo={scrollTo} />
      
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

App.propTypes = {};

export default App;
