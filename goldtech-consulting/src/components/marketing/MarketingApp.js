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
 * MarketingApp - Main application component for Goldtech Marketing
 * 
 * Features:
 * - Section-based navigation with active state tracking
 * - Smooth scrolling between sections
 * - Accessibility support with proper ARIA attributes
 * - Performance optimized with useCallback
 * - Back navigation to landing page
 * 
 * Note: Currently uses identical branding to Consulting. This can be customized later.
 * 
 * @component
 * @returns {JSX.Element} Rendered marketing application
 */
const MarketingApp = () => {
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
        title="GoldTech Marketing - Strategic Marketing Solutions & Growth"
        description="Grow smarter, engage deeper, convert better. Strategic marketing solutions including digital strategy, social media management, content creation, SEO, and brand development. 100+ campaigns delivered."
        path="/marketing"
        type="website"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'MarketingAgency',
          name: 'GoldTech Marketing',
          url: 'https://goldtech-consulting.com/marketing',
          logo: 'https://goldtech-consulting.com/goldtech-marketing-logo.svg',
          description: 'Strategic marketing solutions that drive growth, engagement, and measurable results for your business.',
          serviceType: ['Digital Marketing Strategy', 'Social Media Management', 'Content Creation', 'SEO', 'Brand Development'],
          areaServed: 'Worldwide',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Marketing Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Digital Marketing Strategy',
                  description: 'Comprehensive marketing strategies tailored to your business goals and target audience.'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Social Media Management',
                  description: 'Engaging content creation and community management across all major platforms.'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Content Creation & SEO',
                  description: 'High-quality content that ranks, engages, and converts your audience.'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Brand Development & Design',
                  description: 'Complete brand identity development from concept to execution across all touchpoints.'
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
        logoVariant="marketing"
      />
      
      <main id="main-content" role="main">
        <HeroSection scrollTo={scrollTo} variant="marketing" />
        <AboutSection variant="marketing" />
        <ServicesSection variant="marketing" />
        <ProjectsSection variant="marketing" />
        <ContactSection variant="marketing" />
      </main>
      
      <Footer variant="marketing" />
    </div>
  );
};

MarketingApp.propTypes = {};

export default MarketingApp;

