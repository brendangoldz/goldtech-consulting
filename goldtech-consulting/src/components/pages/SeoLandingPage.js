import React from 'react';
import PropTypes from 'prop-types';
import Seo from '../shared/Seo';
import PageLayout from './PageLayout';
import LandingPageTemplate from './LandingPageTemplate';

const SeoLandingPage = ({ variant = 'consulting', page }) => {
  return (
    <PageLayout
      variant={variant}
      showBackButton
      backFallbackPath={variant === 'marketing' ? '/marketing#services' : '/consulting#services'}
    >
      <Seo
        title={page.seoTitle}
        description={page.metaDescription}
        path={page.path}
        type="website"
      />
      <LandingPageTemplate variant={variant} page={page} />
    </PageLayout>
  );
};

SeoLandingPage.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing']),
  page: PropTypes.shape({
    seoTitle: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }).isRequired
};

export default SeoLandingPage;
