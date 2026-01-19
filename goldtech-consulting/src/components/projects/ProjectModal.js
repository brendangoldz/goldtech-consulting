import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaTimes, FaExternalLinkAlt, FaExpand } from 'react-icons/fa';

/**
 * ProjectModal - Gallery modal for displaying project screenshots in a 4-column grid
 * 
 * Features:
 * - Full-screen modal overlay
 * - 4-column grid gallery layout
 * - Click image to view full size
 * - Keyboard navigation (escape to close)
 * - Click outside to close
 * - Responsive design
 * - Accessibility support
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when closing the modal
 * @param {Array} props.screenshots - Array of screenshot objects with src and alt
 * @param {string} props.projectTitle - Title of the project
 * @param {string} props.websiteUrl - URL to the project website
 * @param {string} props.variant - Content variant: 'consulting' or 'marketing'
 * @returns {JSX.Element} Rendered modal component
 */
const ProjectModal = ({ 
  isOpen, 
  onClose, 
  screenshots = [], 
  projectTitle = '',
  websiteUrl = '',
  variant = 'consulting'
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const isMarketing = variant === 'marketing';

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedImage, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleImageClick = (screenshot) => {
    // Navigate to the website when clicking the image
    if (screenshot.websiteUrl) {
      window.open(screenshot.websiteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleImageExpand = (screenshot, index, e) => {
    // Stop propagation so clicking expand doesn't navigate
    e.stopPropagation();
    setSelectedImage({ ...screenshot, index });
  };

  const handleCloseFullImage = () => {
    setSelectedImage(null);
  };

  if (!isOpen || screenshots.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(17, 24, 39, 0.85)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={selectedImage ? handleCloseFullImage : onClose}
            aria-label="Close modal"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (selectedImage) {
                  handleCloseFullImage();
                } else {
                  onClose();
                }
              }
            }}
          >
            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-7xl max-h-[90vh] flex flex-col bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200/50"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${
                isMarketing ? 'bg-marketing-bg' : 'bg-white'
              }`}>
                <div className="flex-1 min-w-0">
                  <h2 
                    id="modal-title" 
                    className="text-xl sm:text-2xl font-semibold text-navy truncate"
                  >
                    {projectTitle}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className={`ml-4 p-2 rounded-full transition-colors ${
                    isMarketing 
                      ? 'text-marketing-primary hover:bg-marketing-primary/10' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label="Close modal"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {screenshots.map((screenshot, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {/* Image Container - Clickable to visit website */}
                      <div
                        className="relative group rounded-lg overflow-hidden bg-gray-100 aspect-[4/3] shadow-lg cursor-pointer"
                        onClick={() => handleImageClick(screenshot)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleImageClick(screenshot);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Visit ${screenshot.websiteUrl || screenshot.alt || `website ${index + 1}`}`}
                      >
                        <img
                          src={screenshot.src}
                          alt={screenshot.alt || `${projectTitle} screenshot ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className={`px-4 py-2 rounded-lg ${
                              isMarketing
                                ? 'bg-marketing-primary/90 text-white'
                                : 'bg-gold/90 text-navy'
                            }`}>
                              <FaExternalLinkAlt className="text-lg" />
                            </div>
                          </div>
                        </div>
                        {/* Expand Icon - Secondary action for full-size view */}
                        <button
                          onClick={(e) => handleImageExpand(screenshot, index, e)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full shadow-lg bg-white/90 hover:bg-white text-gray-800"
                          aria-label={`View ${screenshot.alt || `screenshot ${index + 1}`} in full size`}
                        >
                          <FaExpand className="text-sm" />
                        </button>
                      </div>

                      {/* Website Identification */}
                      <div className="mt-3 text-center">
                        {screenshot.websiteUrl ? (
                          <a
                            href={screenshot.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-medium transition-colors break-all ${
                              isMarketing
                                ? 'text-marketing-primary hover:text-marketing-primary/80'
                                : 'text-gold hover:text-gold/80'
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {screenshot.websiteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-600">
                            {screenshot.alt || `Website ${index + 1}`}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Full Image View */}
          {selectedImage && (
            <AnimatePresence>
              <motion.div
                className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseFullImage}
              >
                <motion.div
                  className="relative max-w-full max-h-full"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt || `${projectTitle} full size`}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  />
                  <button
                    onClick={handleCloseFullImage}
                    className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 transition-colors"
                    aria-label="Close full image view"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

ProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  screenshots: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      websiteUrl: PropTypes.string
    })
  ).isRequired,
  projectTitle: PropTypes.string,
  websiteUrl: PropTypes.string,
  variant: PropTypes.oneOf(['consulting', 'marketing'])
};

export default ProjectModal;
