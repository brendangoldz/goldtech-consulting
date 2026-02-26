import PropTypes from 'prop-types';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import ContentProvider from './contexts/ContentProvider';
import LandingPage from './components/landing/LandingPage';
import Seo from './components/shared/Seo';
import {
  consultingPlatformPages,
  consultingIndustryPages
} from './config/consultingSeoPages';
import {
  marketingPlatformPages,
  marketingIndustryPages
} from './config/marketingSeoPages';
const ConsultingApp = lazy(() => import('./components/consulting/ConsultingApp'));
const MarketingApp = lazy(() => import('./components/marketing/MarketingApp'));
const SeoLandingPage = lazy(() => import('./components/pages/SeoLandingPage'));
const BlogIndex = lazy(() => import('./components/pages/BlogIndex'));
const BlogArticle = lazy(() => import('./components/pages/BlogArticle'));
const ConfirmationPage = lazy(() => import('./components/pages/ConfirmationPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

/**
 * Resolves a service page by slug from Sanity (with static fallback) and renders SeoLandingPage or NotFound.
 */
const ServicePageRoute = ({ variant }) => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    import('./sanity/loaders')
      .then((m) => m.loadServicePageBySlug(variant, slug))
      .then((p) => {
        if (!cancelled) setPage(p);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [variant, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-busy="true">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }
  if (!page) {
    return <NotFoundPage variant={variant} />;
  }
  return <SeoLandingPage variant={variant} page={page} />;
};

ServicePageRoute.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing']).isRequired
};

/**
 * App - Main application component with routing
 *
 * Features:
 * - React Router for navigation between landing page and business sections
 * - Landing page with split screen for Consulting vs Marketing
 * - Separate routes for Consulting and Marketing applications
 * - Service and blog content from Sanity with static fallback
 * - Accessibility support
 *
 * @component
 * @returns {JSX.Element} Rendered application with routing
 */

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center" aria-busy="true">
    <p className="text-gray-600">Loading…</p>
  </div>
);

const App = () => {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
        <Routes>
        <Route
          path="/"
          element={
            <>
              <Seo
                title="GoldTech Consulting & Marketing | Software Development & Digital Marketing Services"
                description="GoldTech Consulting offers custom software development, QA automation, and IT consulting services in Mount Laurel, NJ. GoldTech Marketing provides digital marketing, SEO, and brand development solutions. Trusted by 50+ businesses."
                path="/"
                schema={{
                  '@context': 'https://schema.org',
                  '@type': 'WebSite',
                  name: 'GoldTech',
                  url: 'https://goldtech-consulting.com',
                  description: 'GoldTech Consulting and Marketing - Modern software development and strategic marketing solutions.',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://goldtech-consulting.com?q={search_term_string}',
                    'query-input': 'required name=search_term_string'
                  }
                }}
              />
              <LandingPage />
            </>
          }
        />
        <Route path="/consulting" element={<ConsultingApp />} />
        <Route path="/marketing" element={<MarketingApp />} />

        <Route path="/consulting/services/:slug" element={<ServicePageRoute variant="consulting" />} />
        {consultingPlatformPages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<SeoLandingPage variant="consulting" page={page} />}
          />
        ))}
        {consultingIndustryPages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<SeoLandingPage variant="consulting" page={page} />}
          />
        ))}

        <Route path="/marketing/services/:slug" element={<ServicePageRoute variant="marketing" />} />
        {marketingPlatformPages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<SeoLandingPage variant="marketing" page={page} />}
          />
        ))}
        {marketingIndustryPages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<SeoLandingPage variant="marketing" page={page} />}
          />
        ))}

        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFoundPage variant="consulting" />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </ContentProvider>
  );
};

App.propTypes = {};

export default App;
