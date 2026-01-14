import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEO Component - Dynamic meta tags for search engines and social sharing
 * 
 * Implements comprehensive SEO best practices:
 * - Dynamic page titles and meta descriptions
 * - Open Graph tags for social sharing
 * - Twitter Card tags
 * - Canonical URLs
 * - JSON-LD structured data
 * 
 * @component
 * @param {Object} props - SEO configuration props
 * @param {string} props.title - Page title (max 60 characters)
 * @param {string} props.description - Meta description (150-160 characters)
 * @param {string} props.path - Current page path (for canonical URL)
 * @param {string} [props.type] - Open Graph type (website, article, etc.)
 * @param {string} [props.image] - Social sharing image URL
 * @param {Object} [props.schema] - JSON-LD structured data object
 * @returns {JSX.Element} Helmet component with SEO tags
 */
const Seo = ({
  title,
  description,
  path = '/',
  type = 'website',
  image,
  schema
}) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://goldtech-consulting.com';
  const fullUrl = `${siteUrl}${path}`;
  const defaultImage = `${siteUrl}/goldtech-logo.svg`;
  const ogImage = image || defaultImage;
  
  // Ensure title doesn't exceed 60 characters (SEO best practice)
  const pageTitle = title.length > 60 
    ? `${title.substring(0, 57)}...` 
    : title;
  
  // Ensure description is between 150-160 characters (SEO best practice)
  const metaDescription = description.length > 160
    ? `${description.substring(0, 157)}...`
    : description.length < 120
    ? `${description} - GoldTech Consulting delivers modern software development and strategic marketing solutions.`
    : description;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="GoldTech Consulting" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@goldtechconsult" />
      <meta name="twitter:creator" content="@goldtechconsult" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="GoldTech Consulting" />
      
      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  schema: PropTypes.object
};

export default Seo;
