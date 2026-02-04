import React from 'react';

import BaseApp from '../shared/BaseApp';

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
  const seo = {
    title: 'Digital Marketing Agency | Mount Laurel, NJ | GoldTech Marketing',
    description: 'Full-service digital marketing agency in Mount Laurel, NJ. SEO consulting, social media management, content marketing, PPC advertising, and brand development services. 100+ successful campaigns delivered.',
    path: '/marketing',
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'MarketingAgency',
      name: 'GoldTech Marketing',
      url: 'https://goldtech-consulting.com/marketing',
      logo: 'https://goldtech-consulting.com/goldtech-marketing-logo.svg',
      description: 'Full-service digital marketing agency in Mount Laurel, NJ. SEO consulting, social media management, content marketing, PPC advertising, and brand development services.',
      serviceType: ['Digital Marketing', 'SEO Consulting', 'Social Media Marketing', 'Content Marketing', 'PPC Advertising', 'Brand Development', 'Marketing Strategy', 'Marketing Consulting'],
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
    }
  };

  return (
    <BaseApp
      variant="marketing"
      rootClassName="min-h-screen bg-marketing-bg"
      logoVariant="marketing"
      seo={seo}
    />
  );
};

MarketingApp.propTypes = {};

export default MarketingApp;

