import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../shared/Logo';
import { getContent } from '../../config/content';

/**
 * LandingPage - Minimal split-screen landing page for choosing between Consulting and Marketing
 * 
 * Features:
 * - Flat, minimal design
 * - Split screen layout (side by side)
 * - Logo at top center
 * - Thick black divider bar
 * - Gold highlight on hover
 * - Full viewport height
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
    <div className="h-screen w-full bg-white overflow-hidden flex flex-col">
      {/* Screen reader only heading for SEO */}
      <h1 className="sr-only">GoldTech - Choose Your Path: Software Development or Marketing Solutions</h1>

      {/* Split screen container */}
      <div className="flex flex-row h-full w-full">
        {/* Goldtech Consulting Section */}
        <div
          className="flex-1 flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2"
          style={{
            backgroundColor: isConsultingHovered ? '#ffc300' : '#ffffff',
            transition: 'background-color 500ms ease-in-out'
          }}
          onClick={handleConsultingClick}
          onKeyDown={(e) => handleKeyDown(e, handleConsultingClick)}
          onMouseEnter={() => setIsConsultingHovered(true)}
          onMouseLeave={() => setIsConsultingHovered(false)}
          role="button"
          tabIndex={0}
          aria-label="Navigate to Goldtech Consulting - Software Development Services"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className={`transition-all duration-500 ease-in-out ${isConsultingHovered ? 'invert brightness-0' : ''}`}>
              <Logo size="extra-large" variant="consulting"/>
            </div>
            <p className={`text-md sm:text-xl md:text-2xl font-medium max-w-md text-center px-4 transition-all duration-500 ease-in-out ${
              isConsultingHovered ? 'text-navy' : 'text-gray-600'
            }`}>
              {consultingContent.hero.subtitle}
            </p>
          </div>
        </div>

        {/* Thick black divider bar */}
        <div className="w-4 bg-navy" aria-hidden="true" />

        {/* Goldtech Marketing Section */}
        <div
          className="flex-1 flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2"
          style={{
            backgroundColor: isMarketingHovered ? '#ffc300' : '#ffffff',
            transition: 'background-color 500ms ease-in-out'
          }}
          onClick={handleMarketingClick}
          onKeyDown={(e) => handleKeyDown(e, handleMarketingClick)}
          onMouseEnter={() => setIsMarketingHovered(true)}
          onMouseLeave={() => setIsMarketingHovered(false)}
          role="button"
          tabIndex={0}
          aria-label="Navigate to Goldtech Marketing - Strategic Marketing Solutions"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className={`transition-all duration-500 ease-in-out ${isMarketingHovered ? 'invert brightness-0' : ''}`}>
              <Logo size="extra-large" variant="marketing"/>
            </div>
            <p className={`text-lg sm:text-xl md:text-2xl font-medium max-w-md text-center px-4 transition-all duration-500 ease-in-out ${
              isMarketingHovered ? 'text-navy' : 'text-gray-600'
            }`}>
              {marketingContent.hero.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
