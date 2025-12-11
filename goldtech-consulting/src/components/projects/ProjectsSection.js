import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaArrowRight } from 'react-icons/fa';
import SectionHeader from '../shared/SectionHeader';
import { getContent } from '../../config/content';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const ProjectsSection = ({ variant = 'consulting' }) => {
  const content = getContent(variant).projects;
  
  return (
  <section id="projects" className="py-20 bg-white" aria-labelledby="projects-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        titleId="projects-title"
        subtitle={content.subtitle}
      />
      <div className="grid md:grid-cols-2 gap-8">
        {content.items.map((project, i) => (
          <motion.article
            key={i}
            className="bg-lightGray/60 rounded-xl p-6 border border-gray-200 hover:bg-lightGray transition"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="font-semibold text-xl text-navy mb-2">{project.title}</h3>
            <p className="text-gray-700 mb-4">{project.summary}</p>
            <button className="text-navy font-medium inline-flex items-center hover:underline" aria-label="View case study details - Coming Soon">
              Coming Soon <FaArrowRight className="ml-2 text-gold" />
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
  );
};

ProjectsSection.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing'])
};

export default ProjectsSection;
