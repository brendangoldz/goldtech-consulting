import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../nav/Navigation';
import Footer from '../footer/Footer';
import BackButton from '../shared/BackButton';

const PageLayout = ({
  variant = 'consulting',
  logoVariant: logoVariantProp,
  showBackButton = false,
  backFallbackPath,
  backButtonOnlyWhenReferrer = false,
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = variant === 'marketing' ? '/marketing' : '/consulting';
  const logoVariant = logoVariantProp ?? variant;
  const activeSection = location.pathname.startsWith('/blog') ? 'blog' : 'home';
  const getNavigationOffset = useCallback(() => {
    const navigation = document.querySelector('nav[aria-label="Main navigation"]');
    if (!navigation) {
      return 96;
    }

    return navigation.getBoundingClientRect().height + 16;
  }, []);

  const scrollTo = useCallback(
    (id) => {
      navigate(`${basePath}#${id}`);
    },
    [navigate, basePath]
  );

  const handleBackToLanding = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (location.hash) {
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const scrollToHash = () => {
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
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, getNavigationOffset]);

  return (
    <div
      className={`min-h-screen ${variant === 'marketing' ? 'bg-marketing-bg' : 'bg-white'}`}
      data-variant={variant}
    >
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

      <main
        id="main-content"
        role="main"
        className="pt-24 pb-16 min-h-[calc(100vh-12rem)] sm:pt-28 sm:pb-20 sm:min-h-[calc(100vh-14rem)] lg:pt-32 lg:pb-24"
      >
        {showBackButton && backFallbackPath && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <BackButton
              fallbackPath={backFallbackPath}
              variant={variant}
              onlyWhenReferrer={backButtonOnlyWhenReferrer}
              fromLocation={Boolean(location.state?.from)}
            />
          </div>
        )}
        {children}
      </main>

      <Footer variant={variant} />
    </div>
  );
};

PageLayout.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing']),
  logoVariant: PropTypes.oneOf(['consulting', 'marketing']),
  showBackButton: PropTypes.bool,
  backFallbackPath: PropTypes.string,
  backButtonOnlyWhenReferrer: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default PageLayout;
