import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../shared/Logo';

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
      {/* Logo at top center */}
      {/* <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <Logo />
      </div> */}

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
          aria-label="Navigate to Goldtech Consulting"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy transition-colors duration-500 ease-in-out">    
            <div className={`transition-all duration-500 ease-in-out ${isConsultingHovered ? 'invert brightness-0' : ''}`}>
              <Logo size="extra-large" variant="consulting"/>
            </div>
          </h2>
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
          aria-label="Navigate to Goldtech Marketing"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy transition-colors duration-500 ease-in-out">
            <div className={`transition-all duration-500 ease-in-out ${isMarketingHovered ? 'invert brightness-0' : ''}`}>
              <Logo size="extra-large" variant="marketing"/>
            </div>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
