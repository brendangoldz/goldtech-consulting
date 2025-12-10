import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SectionHeader from '../shared/SectionHeader';
import { getContent } from '../../config/content';

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
  
  return (
  <section id="about" className="py-20 bg-white" aria-labelledby="about-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        titleId="about-title"
        subtitle={content.subtitle}
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
                <FaCheck className="text-gold mt-1 mr-3" /> {feature}
              </li>
            ))}
          </motion.ul>

          <motion.div className="mt-8 flex flex-wrap gap-3" variants={fadeInUp}>
            {content.techStack.map((tech, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-lightGray text-navy text-sm">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-lightGray/70 rounded-2xl p-6 h-18 flex items-center justify-center border border-gray-200 overflow-hidden"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <img 
            src="/at_desk_smirk.JPG" 
            alt="Brendan at his desk working on software development" 
            className="w-full h-full object-cover rounded-xl"
          />
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
