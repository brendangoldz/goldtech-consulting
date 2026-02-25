import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useContent } from '../../contexts/ContentContext';
import { getHeroGradient, getThemeClasses, getVariantClasses } from '../../config/theme';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import useVantaDots from '../../hooks/useVantaDots';

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
  const content = useContent(variant).hero;
  const isMarketing = variant === 'marketing';
  const overlayClasses = getVariantClasses(variant, {
    marketing: 'bg-marketing-bg/60',
    consulting: 'bg-white/70'
  });
  const trustBadgeClasses = getVariantClasses(variant, {
    marketing: 'bg-marketing-primary/10 border-marketing-primary/20 text-marketing-primary',
    consulting: 'bg-gold/10 border-gold/20 text-navy'
  });
  const trustDotClasses = getVariantClasses(variant, {
    marketing: 'bg-marketing-primary',
    consulting: 'bg-gold'
  });
  const accentGradient = getThemeClasses(variant, 'accent-gradient');
  const primaryButtonClasses = getVariantClasses(variant, {
    marketing: 'from-marketing-primary to-marketing-accent text-white shadow-lg hover:shadow-xl focus:ring-marketing-primary/40',
    consulting: 'from-gold to-goldLight text-navy shadow-gold hover:shadow-gold-lg focus:ring-gold/40'
  });
  const secondaryButtonClasses = getVariantClasses(variant, {
    marketing: 'border-marketing-primary text-marketing-primary hover:bg-marketing-primary hover:text-white focus:ring-marketing-primary/40',
    consulting: 'border-navy text-navy hover:bg-navy hover:text-white focus:ring-navy/40'
  });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const vantaOptions = useMemo(() => ({
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 100.00,
    minWidth: 200.00,
    scale: 0.80,
    scaleMobile: 1.00,
    color: isMarketing ? 0x3b82f6 : 0xffc300,
    color2: isMarketing ? 0xec4899 : 0x1a1a2e,
    backgroundColor: isMarketing ? 0xfafafa : 0xffffff,
    size: 3.0,
    spacing: 25.00,
    showLines: false
  }), [isMarketing]);
  const { vantaRef, isVantaEnabled } = useVantaDots(vantaOptions, [
    isMarketing
  ]);

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
      {isVantaEnabled && (
        <div ref={vantaRef} className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Overlay to ensure content readability */}
      <div className={`absolute inset-0 ${overlayClasses}`} />

      <motion.div
        className="backdrop-blur-sm relative z-10 text-center max-w-5xl mx-auto px-4 mt-20 sm:mt-20 lg:px-8 rounded-3xl"
        style={{ y, opacity }}
      >
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          {/* Trust indicator */}
          <motion.div
            className={`inline-flex items-center px-4 py-2 rounded-full ${trustBadgeClasses} text-sm font-medium mb-8 border`}
            variants={fadeInUp}
            role="img"
            aria-label={`Trust indicator: ${content.trustIndicator}`}
          >
            <span 
              className={`w-2 h-2 ${trustDotClasses} rounded-full mr-2 animate-pulse`}
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
              className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}
              aria-label={content.heading.highlight1}
            >
              {content.heading.highlight1}
            </span>
            <br />
            {content.heading.line2}{' '}
            <span 
              className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}
              aria-label={content.heading.highlight2}
            >
              {content.heading.highlight2}
            </span>
            <br />
            {content.heading.line3}{' '}
            <span 
              className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}
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
              className={`group relative bg-gradient-to-r ${primaryButtonClasses} px-8 py-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center`}
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
              className={`group border-2 ${secondaryButtonClasses} px-8 py-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`}
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