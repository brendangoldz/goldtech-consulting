import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import LandingPage from './components/landing/LandingPage';
import ConsultingApp from './components/consulting/ConsultingApp';
import MarketingApp from './components/marketing/MarketingApp';
import Seo from './components/shared/Seo';
import SeoLandingPage from './components/pages/SeoLandingPage';
import BlogIndex from './components/pages/BlogIndex';
import BlogArticle from './components/pages/BlogArticle';
import ConfirmationPage from './components/pages/ConfirmationPage';
import NotFoundPage from './components/pages/NotFoundPage';
import {
  consultingServicePages,
  consultingPlatformPages,
  consultingIndustryPages,
  getConsultingPageBySlug
} from './config/consultingSeoPages';
import {
  marketingServicePages,
  marketingPlatformPages,
  marketingIndustryPages,
  getMarketingPageBySlug
} from './config/marketingSeoPages';

import './index.css';

/**
 * App - Main application component with routing
 * 
 * Features:
 * - React Router for navigation between landing page and business sections
 * - Landing page with split screen for Consulting vs Marketing
 * - Separate routes for Consulting and Marketing applications
 * - Accessibility support
 * 
 * @component
 * @returns {JSX.Element} Rendered application with routing
 */
const ConsultingServiceRoute = () => {
  const { slug } = useParams();
  const page = getConsultingPageBySlug(consultingServicePages, slug);
  if (!page) {
    return <NotFoundPage variant="consulting" />;
  }
  return <SeoLandingPage variant="consulting" page={page} />;
};

const MarketingServiceRoute = () => {
  const { slug } = useParams();
  const page = getMarketingPageBySlug(marketingServicePages, slug);
  if (!page) {
    return <NotFoundPage variant="marketing" />;
  }
  return <SeoLandingPage variant="marketing" page={page} />;
};

const App = () => {
  return (
    <BrowserRouter>
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

        <Route path="/consulting/services/:slug" element={<ConsultingServiceRoute />} />
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

        <Route path="/marketing/services/:slug" element={<MarketingServiceRoute />} />
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
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;
