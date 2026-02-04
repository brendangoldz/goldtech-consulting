import React from 'react';

import BaseApp from '../shared/BaseApp';

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
  const seo = {
    title: 'Software Development Consulting | Mount Laurel, NJ | GoldTech',
    description: 'Expert software development consulting in Mount Laurel, NJ. Custom software development, React/AWS consulting, QA automation, IoT integration, and DevOps services. Trusted by 50+ businesses worldwide.',
    path: '/consulting',
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'GoldTech Consulting',
      url: 'https://goldtech-consulting.com/consulting',
      logo: 'https://goldtech-consulting.com/goldtech-logo.svg',
      description: 'Expert software development consulting in Mount Laurel, NJ. Custom software development, React/AWS consulting, QA automation, IoT integration, and DevOps services.',
      serviceType: ['Software Development', 'Custom Software Development', 'Web Development', 'App Development', 'Cloud Solutions', 'AWS Consulting', 'QA Automation', 'IoT Integration', 'DevOps Consulting', 'Tech Consultation'],
      areaServed: {
        '@type': 'Country',
        name: 'United States'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mount Laurel',
        addressRegion: 'NJ',
        addressCountry: 'US'
      },
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
    }
  };

  return (
    <BaseApp
      variant="consulting"
      rootClassName="min-h-screen bg-white"
      logoVariant="consulting"
      seo={seo}
    />
  );
};

ConsultingApp.propTypes = {};

export default ConsultingApp;

