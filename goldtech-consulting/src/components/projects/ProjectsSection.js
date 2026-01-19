import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaArrowRight, FaImages } from 'react-icons/fa';
import SectionHeader from '../shared/SectionHeader';
import ProjectModal from './ProjectModal';
import Logo from '../shared/Logo';
import { getContent } from '../../config/content';
import { getSectionBg } from '../../config/theme';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const ProjectsSection = ({ variant = 'consulting' }) => {
  const content = getContent(variant).projects;
  const isMarketing = variant === 'marketing';
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project) => {
    if (project.screenshots && project.screenshots.length > 0) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Determine grid columns based on number of items
  const itemCount = content.items.length;
  const gridCols = itemCount === 1 
    ? 'grid-cols-1 max-w-3xl mx-auto' 
    : 'grid md:grid-cols-2';
  
  return (
    <section id="projects" className={`py-20 ${getSectionBg(variant, true)}`} aria-labelledby="projects-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          titleId="projects-title"
          subtitle={content.subtitle}
          variant={variant}
        />
        <div className={`grid ${gridCols} gap-8`}>
          {content.items.map((project, i) => (
            <motion.article
              key={project.id || i}
              className={`${isMarketing ? 'bg-marketing-bg border-marketing-primary/20' : 'bg-lightGray/60 border-gray-200'} rounded-xl border overflow-hidden ${isMarketing ? 'hover:bg-marketing-bgAlt' : 'hover:bg-lightGray'} transition-all hover:shadow-lg`}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Collaboration Banner */}
              {project.isShared && (
                <div className={`${isMarketing ? 'bg-marketing-primary/5 border-marketing-primary/20' : 'bg-gold/5 border-gold/20'} border-b px-6 py-4`}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center gap-4">
                      <Logo variant="consulting" size="small" />
                      <span className={`text-2xl font-semibold ${isMarketing ? 'text-marketing-primary' : 'text-gold'}`}>×</span>
                      <Logo variant="marketing" size="small" />
                    </div>
                    {/* <p className={`text-sm font-medium ${isMarketing ? 'text-marketing-primary' : 'text-gold'}`}>
                      GoldTech Consulting × GoldTech Marketing
                    </p> */}
                  </div>
                </div>
              )}
              {/* Project Content */}
              <div className="p-6">
                <h3 className="font-semibold text-xl text-navy mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.summary}</p>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 items-center">
                  {project.screenshots && project.screenshots.length > 0 && (
                    <button 
                      onClick={() => handleOpenModal(project)}
                      className={`text-navy font-medium inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                        isMarketing 
                          ? 'bg-marketing-primary/10 text-marketing-primary hover:bg-marketing-primary/20' 
                          : 'bg-gold/10 text-gold hover:bg-gold/20'
                      }`}
                      aria-label={`View gallery for ${project.title}`}
                    >
                      <FaImages className="mr-2" />
                      View Gallery
                    </button>
                  )}
                  {(!project.screenshots || project.screenshots.length === 0) && !project.websiteUrl && (
                    <button className={`text-navy font-medium inline-flex items-center ${isMarketing ? 'hover:text-marketing-primary' : 'hover:underline'}`} aria-label="View case study details - Coming Soon">
                      Coming Soon <FaArrowRight className={`ml-2 ${isMarketing ? 'text-marketing-primary' : 'text-gold'}`} />
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          screenshots={selectedProject.screenshots || []}
          projectTitle={selectedProject.title}
          websiteUrl={selectedProject.websiteUrl}
          variant={variant}
        />
      )}
    </section>
  );
};

ProjectsSection.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing'])
};

export default ProjectsSection;
