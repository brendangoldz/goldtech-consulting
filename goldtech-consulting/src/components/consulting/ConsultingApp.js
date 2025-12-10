import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '../nav/Navigation';
import HeroSection from '../hero/HeroSection';
import AboutSection from '../about/About';
import ServicesSection from '../services/ServicesSection';
import ProjectsSection from '../projects/ProjectsSection';
import ContactSection from '../contact/ContactSection';
import Footer from '../footer/Footer';
import Seo from '../shared/Seo';

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
      <Seo
        title="GoldTech Consulting - Modern Software Development & QA Automation"
        description="Build faster, ship cleaner, look premium. Custom software development, cloud solutions, integrations, and QA automation services. Trusted by 50+ businesses worldwide."
        path="/consulting"
        type="website"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'GoldTech Consulting',
          url: 'https://goldtechconsulting.com/consulting',
          logo: 'https://goldtechconsulting.com/goldtech-logo.svg',
          description: 'Modern software development, integrations, and QA automation services. Build faster, ship cleaner, look premium.',
          serviceType: ['Software Development', 'Cloud Solutions', 'QA Automation', 'IoT Integration', 'Tech Consultation'],
          areaServed: 'Worldwide',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Consulting Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Custom Software Development',
                  description: 'Tailor-made, scalable, and robust solutions for startups and enterprises.'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Tech Consultation & Strategy',
                  description: 'Technology-driven strategies that give your business a competitive edge.'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'IoT Implementation, Integration, & Optimization',
                  description: 'Seamless Internet of Things implementations and streamlined operations across your stack.'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Project Management & Automation',
                  description: 'Engineering focused project management and automation, performance monitoring, and release readiness.'
                }
              }
            ]
          }
        }}
      />
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
        <HeroSection scrollTo={scrollTo} variant="consulting" />
        <AboutSection variant="consulting" />
        <ServicesSection variant="consulting" />
        <ProjectsSection variant="consulting" />
        <ContactSection variant="consulting" />
      </main>
      
      <Footer variant="consulting" />
    </div>
  );
};

ConsultingApp.propTypes = {};

export default ConsultingApp;

