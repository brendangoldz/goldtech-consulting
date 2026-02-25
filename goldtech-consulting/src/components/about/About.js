import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SectionHeader from '../shared/SectionHeader';
import { getContent } from '../../sanity/loaders';
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
  const imageFrameClasses = isMarketing
    ? 'bg-marketing-bg border-marketing-primary/20'
    : 'bg-lightGray/70 border-gray-200';
  
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
          className="flex justify-center md:justify-end"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div
            className={`${imageFrameClasses} rounded-2xl border p-2 flex w-full max-w-[14rem] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-[33rem] aspect-square items-center justify-center overflow-hidden`}
          >
            <img
              src={content.image}
              alt={content.imageAlt}
              className="h-full w-full rounded-xl object-cover object-center"
            />
          </div>
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
