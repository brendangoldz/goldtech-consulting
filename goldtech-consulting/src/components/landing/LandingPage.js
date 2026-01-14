import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../shared/Logo';
import { getContent } from '../../config/content';

/**
 * LandingPage - Engaging card-based landing page for choosing between Consulting and Marketing
 * 
 * Features:
 * - Contained, module-like design with depth
 * - Card-based layout with hover effects
 * - Smooth animations and transitions
 * - Responsive design
 * - Accessibility support
 * 
 * @component
 * @returns {JSX.Element} Rendered landing page
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const [isConsultingHovered, setIsConsultingHovered] = useState(false);
  const [isMarketingHovered, setIsMarketingHovered] = useState(false);
  
  // Get content for each section
  const consultingContent = getContent('consulting');
  const marketingContent = getContent('marketing');

  /**
   * Handle navigation to Consulting section
   */
  const handleConsultingClick = () => {
    navigate('/consulting');
  };

  /**
   * Handle navigation to Marketing section
   */
  const handleMarketingClick = () => {
    navigate('/marketing');
  };

  /**
   * Handle keyboard navigation
   * 
   * @param {KeyboardEvent} event - Keyboard event
   * @param {Function} navigateFn - Navigation function to call
   */
  const handleKeyDown = (event, navigateFn) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigateFn();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Screen reader only heading for SEO */}
      <h1 className="sr-only">GoldTech - Choose Your Path: Software Development or Marketing Solutions</h1>

      {/* Main container - centered with max width */}
      <div className="w-full max-w-6xl">

        {/* Cards container */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Goldtech Consulting Card */}
          <div
            className={`group relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
              isConsultingHovered 
                ? 'border-gold shadow-2xl scale-105 shadow-gold/20' 
                : 'border-gray-200 hover:border-gold/50 hover:shadow-xl'
            } focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2`}
            onClick={handleConsultingClick}
            onKeyDown={(e) => handleKeyDown(e, handleConsultingClick)}
            onMouseEnter={() => setIsConsultingHovered(true)}
            onMouseLeave={() => setIsConsultingHovered(false)}
            role="button"
            tabIndex={0}
            aria-label="Navigate to Goldtech Consulting - Software Development Services"
          >
            {/* Hover background overlay */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 ${
                isConsultingHovered ? 'opacity-100 bg-gold' : 'opacity-0 bg-gold/5'
              }`}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-8 sm:p-12 min-h-[400px]">
              <div className={`transition-all duration-500 ease-in-out ${isConsultingHovered ? 'invert brightness-0' : ''}`}>
                <Logo size="large" variant="consulting"/>
              </div>
              
              <h3 className={`text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-300 ${
                isConsultingHovered ? 'text-navy' : 'text-navy'
              }`}>
                Consulting
              </h3>
              
              <p className={`text-base sm:text-lg font-medium max-w-sm text-center transition-colors duration-300 ${
                isConsultingHovered ? 'text-navy' : 'text-gray-600'
              }`}>
                {consultingContent.hero.subtitle}
              </p>
              
              {/* Arrow indicator */}
              <div className={`mt-6 flex items-center gap-2 transition-all duration-300 ${
                isConsultingHovered ? 'translate-x-2 opacity-100' : 'opacity-60'
              }`}>
                <span className={`font-semibold ${isConsultingHovered ? 'text-navy' : 'text-gray-600'}`}>
                  Explore
                </span>
                <svg 
                  className={`w-5 h-5 ${isConsultingHovered ? 'text-navy' : 'text-gray-600'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Goldtech Marketing Card */}
          <div
            className={`group relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
              isMarketingHovered 
                ? 'border-marketing-primary shadow-2xl scale-105 shadow-marketing-primary/20' 
                : 'border-gray-200 hover:border-marketing-primary/50 hover:shadow-xl'
            } focus:outline-none focus:ring-2 focus:ring-marketing-primary/40 focus:ring-offset-2`}
            onClick={handleMarketingClick}
            onKeyDown={(e) => handleKeyDown(e, handleMarketingClick)}
            onMouseEnter={() => setIsMarketingHovered(true)}
            onMouseLeave={() => setIsMarketingHovered(false)}
            role="button"
            tabIndex={0}
            aria-label="Navigate to Goldtech Marketing - Strategic Marketing Solutions"
          >
            {/* Hover background overlay */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 ${
                isMarketingHovered ? 'opacity-100 bg-marketing-primary' : 'opacity-0 bg-marketing-primary/5'
              }`}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-8 sm:p-12 min-h-[400px]">
              <div className={`transition-all duration-500 ease-in-out ${isMarketingHovered ? 'invert brightness-0' : ''}`}>
                <Logo size="large" variant="marketing"/>
              </div>
              
              <h3 className={`text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-300 ${
                isMarketingHovered ? 'text-navy' : 'text-navy'
              }`}>
                Marketing
              </h3>
              
              <p className={`text-base sm:text-lg font-medium max-w-sm text-center transition-colors duration-300 ${
                isMarketingHovered ? 'text-navy' : 'text-gray-600'
              }`}>
                {marketingContent.hero.subtitle}
              </p>
              
              {/* Arrow indicator */}
              <div className={`mt-6 flex items-center gap-2 transition-all duration-300 ${
                isMarketingHovered ? 'translate-x-2 opacity-100' : 'opacity-60'
              }`}>
                <span className={`font-semibold ${isMarketingHovered ? 'text-navy' : 'text-gray-600'}`}>
                  Explore
                </span>
                <svg 
                  className={`w-5 h-5 ${isMarketingHovered ? 'text-navy' : 'text-gray-600'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
