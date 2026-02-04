import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../shared/Logo';
import { getContent } from '../../config/content';
import useVantaDots from '../../hooks/useVantaDots';

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
  const [isBackgroundHovered, setIsBackgroundHovered] = useState(false);
  const vantaOptions = useMemo(() => ({
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xffc300,
    color2: 0x3b82f6,
    backgroundColor: 0xfafafa,
    size: 4.00,
    spacing: 30.00,
    showLines: false
  }), []);
  const { vantaRef, vantaEffect } = useVantaDots(vantaOptions, []);
  
  // Get content for each section
  const consultingContent = getContent('consulting');
  const marketingContent = getContent('marketing');

  // Update Vanta effect on hover
  useEffect(() => {
    if (vantaEffect.current) {
      try {
        // Change dot size and spacing on hover for more dynamic effect
        vantaEffect.current.setOptions({
          size: isBackgroundHovered ? 6.00 : 4.00,
          spacing: isBackgroundHovered ? 20.00 : 30.00,
        });
      } catch (error) {
        console.error('Error updating Vanta on hover:', error);
      }
    }
  }, [isBackgroundHovered]);

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
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Screen reader only heading for SEO */}
      <h1 className="sr-only">GoldTech - Choose Your Path: Software Development or Marketing Solutions</h1>

      {/* Vanta.js animated background */}
      <div ref={vantaRef} className="absolute inset-0 w-full h-full" />
      
      {/* Overlay to ensure content is readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-50/80" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="w-full max-w-6xl mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy mb-4 animate-fade-in">
            Choose Your Path
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
            Select the service that best fits your business needs
          </p>
        </div>

        {/* Cards container */}
        <div className="w-full max-w-6xl">
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

        {/* Trust indicators / Footer section */}
        <div className="w-full max-w-6xl mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Mount Laurel, NJ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
