import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './components/landing/LandingPage';
import ConsultingApp from './components/consulting/ConsultingApp';
import MarketingApp from './components/marketing/MarketingApp';

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/consulting" element={<ConsultingApp />} />
        <Route path="/marketing" element={<MarketingApp />} />
      </Routes>
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;
