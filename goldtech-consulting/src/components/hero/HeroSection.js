import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { getContent } from '../../config/content';

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
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-lightGray to-gold/5"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-navy/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          {/* Trust indicator */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-navy text-sm font-medium mb-8"
            variants={fadeInUp}
            role="img"
            aria-label={`Trust indicator: ${content.trustIndicator}`}
          >
            <span 
              className="w-2 h-2 bg-gold rounded-full mr-2 animate-pulse" 
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
              className="bg-gradient-to-r from-gold to-goldLight bg-clip-text text-transparent"
              aria-label={content.heading.highlight1}
            >
              {content.heading.highlight1}
            </span>
            <br />
            {content.heading.line2}{' '}
            <span 
              className="bg-gradient-to-r from-gold to-goldLight bg-clip-text text-transparent"
              aria-label={content.heading.highlight2}
            >
              {content.heading.highlight2}
            </span>
            <br />
            {content.heading.line3}{' '}
            <span 
              className="bg-gradient-to-r from-gold to-goldLight bg-clip-text text-transparent"
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
              className="group relative bg-gradient-to-r from-gold to-goldLight text-white px-8 py-4 rounded-xl font-semibold shadow-gold hover:shadow-gold-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 flex items-center justify-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-describedby="primary-cta-description"
            >
              <span className="flex items-center justify-center text-navy">
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
              className="group border-2 border-navy text-navy px-8 py-4 rounded-xl font-semibold hover:bg-navy hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy/40 focus:ring-offset-2"
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