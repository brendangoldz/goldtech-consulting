import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './components/landing/LandingPage';
import ConsultingApp from './components/consulting/ConsultingApp';
import MarketingApp from './components/marketing/MarketingApp';
import Seo from './components/shared/Seo';

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
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Seo
                title="GoldTech - Choose Your Path | Software Development & Marketing"
                description="Choose between GoldTech Consulting for modern software development, integrations, and QA automation, or GoldTech Marketing for strategic marketing solutions that drive growth."
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
      </Routes>
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;
