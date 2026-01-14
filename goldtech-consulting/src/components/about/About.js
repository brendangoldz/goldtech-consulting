import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SectionHeader from '../shared/SectionHeader';
import { getContent } from '../../config/content';
import { getSectionBg, getThemeClasses } from '../../config/theme';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const AboutSection = ({ variant = 'consulting' }) => {
  const content = getContent(variant).about;
  const isMarketing = variant === 'marketing';
  
  return (
  <section id="about" className={`py-20 ${getSectionBg(variant, true)}`} aria-labelledby="about-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        titleId="about-title"
        subtitle={content.subtitle}
        variant={variant}
      />
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="text-gray-700 leading-relaxed" variants={fadeInUp}>
            {content.description}
          </motion.p>

          <motion.ul className="mt-6 space-y-3" variants={fadeInUp}>
            {content.features.map((feature, i) => (
              <li key={i} className="flex items-start text-gray-700">
                <FaCheck className={`${isMarketing ? 'text-marketing-primary' : 'text-gold'} mt-1 mr-3`} /> {feature}
              </li>
            ))}
          </motion.ul>

          <motion.div className="mt-8 flex flex-wrap gap-3" variants={fadeInUp}>
            {content.techStack.map((tech, i) => (
              <span key={i} className={`px-3 py-1 rounded-full ${isMarketing ? 'bg-marketing-primary/10 text-marketing-primary' : 'bg-lightGray text-navy'} text-sm`}>
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className={`${isMarketing ? 'bg-marketing-bg' : 'bg-lightGray/70'} rounded-2xl p-6 h-18 flex items-center justify-center border ${isMarketing ? 'border-marketing-primary/20' : 'border-gray-200'} overflow-hidden relative`}
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {isMarketing ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
              <div className={`w-24 h-24 rounded-full ${isMarketing ? 'bg-marketing-primary/20' : 'bg-gold/20'} flex items-center justify-center mb-4`}>
                <svg className={`w-12 h-12 ${isMarketing ? 'text-marketing-primary' : 'text-gold'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className={`text-sm font-medium ${isMarketing ? 'text-marketing-primary' : 'text-gold'}`}>Coming Soon</p>
              <p className="text-xs text-gray-500 mt-1">Professional headshot</p>
            </div>
          ) : (
            <img 
              src={content.image} 
              alt={content.imageAlt} 
              className="w-full h-full object-cover rounded-xl"
            />
          )}
        </motion.div>
      </div>
    </div>
  </section>
  );
};

AboutSection.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing'])
};

export default AboutSection;
