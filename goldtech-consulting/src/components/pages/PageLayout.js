import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../nav/Navigation';
import Footer from '../footer/Footer';

const PageLayout = ({ variant = 'consulting', children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = variant === 'marketing' ? '/marketing' : '/consulting';

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
      const offset = 96;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

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
        activeSection="home"
        scrollTo={scrollTo}
        onBackToLanding={handleBackToLanding}
        logoVariant={variant}
      />

      <main
        id="main-content"
        role="main"
        className="pt-32 pb-24 min-h-[calc(100vh-14rem)]"
      >
        {children}
      </main>

      <Footer variant={variant} />
    </div>
  );
};

PageLayout.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing']),
  children: PropTypes.node.isRequired
};

export default PageLayout;
