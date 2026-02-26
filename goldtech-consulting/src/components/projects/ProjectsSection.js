import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaArrowRight, FaImages } from 'react-icons/fa';
import SectionHeader from '../shared/SectionHeader';
import ProjectModal from './ProjectModal';
import Logo from '../shared/Logo';
import { useContent } from '../../contexts/ContentContext';
import { getSectionBg, getVariantClasses } from '../../config/theme';
import { fadeInUp } from '../../utils/animations';

const ProjectsSection = ({ variant = 'consulting' }) => {
  const content = useContent(variant).projects;
  const cardClasses = getVariantClasses(variant, {
    marketing: 'bg-marketing-bg border-marketing-primary/20 hover:bg-marketing-bgAlt',
    consulting: 'bg-lightGray/60 border-gray-200 hover:bg-lightGray'
  });
  const sharedBannerClasses = getVariantClasses(variant, {
    marketing: 'bg-marketing-primary/5 border-marketing-primary/20',
    consulting: 'bg-gold/5 border-gold/20'
  });
  const sharedAccentClasses = getVariantClasses(variant, {
    marketing: 'text-marketing-primary',
    consulting: 'text-gold'
  });
  const galleryButtonClasses = getVariantClasses(variant, {
    marketing: 'bg-marketing-primary/10 text-marketing-primary hover:bg-marketing-primary/20',
    consulting: 'bg-gold/10 text-gold hover:bg-gold/20'
  });
  const comingSoonClasses = getVariantClasses(variant, {
    marketing: 'hover:text-marketing-primary',
    consulting: 'hover:underline'
  });
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
              className={`${cardClasses} rounded-xl border overflow-hidden flex flex-col transition-all hover:shadow-lg`}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Collaboration Banner */}
              {project.isShared && (
                <div className={`${sharedBannerClasses} border-b px-6 py-4`}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center gap-3">
                      <Logo variant="consulting" size="small" />
                      <span className={`text-2xl font-semibold ${sharedAccentClasses}`}>×</span>
                      <Logo variant="marketing" size="small" />
                    </div>
                    {/* <p className={`text-sm font-medium ${isMarketing ? 'text-marketing-primary' : 'text-gold'}`}>
                      GoldTech Consulting × GoldTech Marketing
                    </p> */}
                  </div>
                </div>
              )}
              {/* Project Content */}
              <div className="p-6 flex flex-col flex-grow min-h-[200px]">
                <h3 className="font-semibold text-xl text-navy mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4 flex-grow">{project.summary}</p>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 items-center mt-auto">
                  {project.screenshots && project.screenshots.length > 0 && (
                    <button 
                      onClick={() => handleOpenModal(project)}
                      className={`text-navy font-medium inline-flex items-center px-4 py-2 rounded-lg transition-colors ${galleryButtonClasses}`}
                      aria-label={`View gallery for ${project.title}`}
                    >
                      <FaImages className="mr-2" />
                      View Gallery
                    </button>
                  )}
                  {(!project.screenshots || project.screenshots.length === 0) && !project.websiteUrl && (
                    <button className={`text-navy font-medium inline-flex items-center ${comingSoonClasses}`} aria-label="View case study details - Coming Soon">
                      Coming Soon <FaArrowRight className={`ml-2 ${sharedAccentClasses}`} />
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
