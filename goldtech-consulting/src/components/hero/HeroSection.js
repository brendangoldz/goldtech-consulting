import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { getContent } from '../../config/content';
import { getHeroGradient, getThemeClasses } from '../../config/theme';
import DOTS from 'vanta/dist/vanta.dots.min';

/**
 * HeroSection - Main hero section with accessibility improvements
 * 
 * Features:
 * - Parallax scrolling effects
 * - Animated background elements
 * - Call-to-action buttons
 * - Semantic HTML structure
 * - Accessibility support
 * - Responsive design
 * - Variant-based content (consulting/marketing)
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.scrollTo - Function to scroll to a section
 * @param {string} props.variant - Content variant: 'consulting' or 'marketing'
 * @returns {JSX.Element} Rendered hero section
 */
const HeroSection = ({ scrollTo, variant = 'consulting' }) => {
  const content = getContent(variant).hero;
  const isMarketing = variant === 'marketing';
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  // Initialize Vanta.js background
  useEffect(() => {
    const initVanta = () => {
      if (vantaRef.current && !vantaEffect.current && window.THREE) {
        try {
          vantaEffect.current = DOTS({
            el: vantaRef.current,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 100.00,
            minWidth: 200.00,
            scale: 0.80,
            scaleMobile: 1.00,
            color: isMarketing ? 0x3b82f6 : 0xffc300, // Blue for marketing, gold for consulting
            color2: isMarketing ? 0xec4899 : 0x1a1a2e, // Pink accent for marketing, light gold for consulting
            backgroundColor: isMarketing ? 0xfafafa : 0xffffff, // Marketing bg or white for consulting
            size: 3.0,
            spacing: 25.00,
            showLines: false
          });
        } catch (error) {
          console.error('Error initializing Vanta:', error);
        }
      }
    };

    // Check if THREE is already loaded
    if (window.THREE) {
      initVanta();
    } else {
      // Wait for THREE to load
      const checkTHREE = setInterval(() => {
        if (window.THREE) {
          clearInterval(checkTHREE);
          initVanta();
        }
      }, 100);

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkTHREE);
      }, 5000);
    }

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.error('Error destroying Vanta:', error);
        }
        vantaEffect.current = null;
      }
    };
  }, [isMarketing]);

  /**
   * Handle primary CTA button click
   */
  const handlePrimaryCTA = () => {
    scrollTo('contact');
  };

  /**
   * Handle secondary CTA button click
   */
  const handleSecondaryCTA = () => {
    scrollTo('services');
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${getHeroGradient(variant)}`}
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Vanta.js animated background */}
      <div ref={vantaRef} className="absolute inset-0 w-full h-full" />
      
      {/* Overlay to ensure content readability */}
      <div className={`absolute inset-0 ${isMarketing ? 'bg-marketing-bg/60' : 'bg-white/70'}`} />

      <motion.div
        className="backdrop-blur-sm relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl"
        style={{ y, opacity }}
      >
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          {/* Trust indicator */}
          <motion.div
            className={`inline-flex items-center px-4 py-2 rounded-full ${isMarketing ? 'bg-marketing-primary/10 border-marketing-primary/20 text-marketing-primary' : 'bg-gold/10 border-gold/20 text-navy'} text-sm font-medium mb-8 border`}
            variants={fadeInUp}
            role="img"
            aria-label={`Trust indicator: ${content.trustIndicator}`}
          >
            <span 
              className={`w-2 h-2 ${isMarketing ? 'bg-marketing-primary' : 'bg-gold'} rounded-full mr-2 animate-pulse`}
              aria-hidden="true"
            />
            {content.trustIndicator}
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            id="hero-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-navy mb-6" 
            variants={fadeInUp}
          >
            {content.heading.line1}{' '}
            <span 
              className={`bg-gradient-to-r ${isMarketing ? 'from-marketing-primary to-marketing-accent' : 'from-gold to-goldLight'} bg-clip-text text-transparent`}
              aria-label={content.heading.highlight1}
            >
              {content.heading.highlight1}
            </span>
            <br />
            {content.heading.line2}{' '}
            <span 
              className={`bg-gradient-to-r ${isMarketing ? 'from-marketing-primary to-marketing-accent' : 'from-gold to-goldLight'} bg-clip-text text-transparent`}
              aria-label={content.heading.highlight2}
            >
              {content.heading.highlight2}
            </span>
            <br />
            {content.heading.line3}{' '}
            <span 
              className={`bg-gradient-to-r ${isMarketing ? 'from-marketing-primary to-marketing-accent' : 'from-gold to-goldLight'} bg-clip-text text-transparent`}
              aria-label={content.heading.highlight3}
            >
              {content.heading.highlight3}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            {content.subtitle}
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center" 
            variants={fadeInUp}
            role="group"
            aria-label="Call to action buttons"
          >
            <motion.button
              onClick={handlePrimaryCTA}
              className={`group relative bg-gradient-to-r ${isMarketing ? 'from-marketing-primary to-marketing-accent text-white' : 'from-gold to-goldLight text-navy'} px-8 py-4 rounded-xl font-semibold ${isMarketing ? 'shadow-lg hover:shadow-xl' : 'shadow-gold hover:shadow-gold-lg'} transition-all duration-300 focus:outline-none ${isMarketing ? 'focus:ring-marketing-primary/40' : 'focus:ring-gold/40'} focus:ring-2 focus:ring-offset-2 flex items-center justify-center`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-describedby="primary-cta-description"
            >
              <span className="flex items-center justify-center">
                {content.primaryCTA}
                <FaArrowRight 
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                  aria-hidden="true"
                />
              </span>
            </motion.button>
            <span id="primary-cta-description" className="sr-only">
              Navigate to contact section to start your project
            </span>

            <motion.button
              onClick={handleSecondaryCTA}
              className={`group border-2 ${isMarketing ? 'border-marketing-primary text-marketing-primary hover:bg-marketing-primary hover:text-white' : 'border-navy text-navy hover:bg-navy hover:text-white'} px-8 py-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none ${isMarketing ? 'focus:ring-marketing-primary/40' : 'focus:ring-navy/40'} focus:ring-2 focus:ring-offset-2`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-describedby="secondary-cta-description"
            >
              {content.secondaryCTA}
            </motion.button>
            <span id="secondary-cta-description" className="sr-only">
              Navigate to services section to learn about our offerings
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

HeroSection.propTypes = {
  scrollTo: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['consulting', 'marketing'])
};

export default HeroSection;