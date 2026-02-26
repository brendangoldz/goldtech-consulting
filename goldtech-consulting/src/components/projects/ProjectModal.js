import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaTimes, FaExternalLinkAlt, FaExpand, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ITEMS_PER_PAGE = 20; // Number of screenshots to show per page

/**
 * Helper functions for class names
 */
const getButtonClasses = (isMarketing, isDisabled = false) => {
  if (isDisabled) {
    return 'opacity-50 cursor-not-allowed text-gray-400';
  }
  return isMarketing
    ? 'bg-marketing-primary/10 text-marketing-primary hover:bg-marketing-primary/20'
    : 'bg-gold/10 text-gold hover:bg-gold/20';
};

const getTextColor = (isMarketing) => {
  return isMarketing ? 'text-marketing-primary' : 'text-navy';
};

const getLinkColor = (isMarketing) => {
  return isMarketing
    ? 'text-marketing-primary hover:text-marketing-primary/80'
    : 'text-gold hover:text-gold/80';
};

const getHeaderBg = (isMarketing) => {
  return isMarketing ? 'bg-marketing-bg' : 'bg-white';
};

const getPaginationBg = (isMarketing) => {
  return isMarketing ? 'bg-marketing-bg' : 'bg-gray-50';
};

const getCloseButtonClasses = (isMarketing) => {
  return isMarketing
    ? 'text-marketing-primary hover:bg-marketing-primary/10'
    : 'text-gray-600 hover:bg-gray-100';
};

const getOverlayBadgeClasses = (isMarketing) => {
  return isMarketing
    ? 'bg-marketing-primary/90 text-white'
    : 'bg-gold/90 text-navy';
};

/**
 * Memoized screenshot item component for performance
 */
const ScreenshotItem = React.memo(({ 
  screenshot, 
  index, 
  projectTitle, 
  isMarketing, 
  onImageClick, 
  onImageExpand 
}) => {
  const handleImageClick = useCallback(() => {
    onImageClick(screenshot);
  }, [screenshot, onImageClick]);

  const handleImageExpand = useCallback((e) => {
    e.stopPropagation();
    onImageExpand(screenshot, index, e);
  }, [screenshot, index, onImageExpand]);

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image Container - Clickable to visit website */}
      <div
        className="relative group rounded-lg overflow-hidden bg-gray-100 aspect-screenshot shadow-lg cursor-pointer"
        onClick={handleImageClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleImageClick();
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
          loading="lazy"
          decoding="async"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className={`px-4 py-2 rounded-lg ${getOverlayBadgeClasses(isMarketing)}`}>
              <FaExternalLinkAlt className="text-lg" />
            </div>
          </div>
        </div>
        {/* Expand Icon - Secondary action for full-size view */}
        <button
          onClick={handleImageExpand}
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
            className={`text-sm font-normal transition-colors break-all ${getLinkColor(isMarketing)}`}
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
  );
});

ScreenshotItem.displayName = 'ScreenshotItem';

ScreenshotItem.propTypes = {
  screenshot: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    websiteUrl: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  projectTitle: PropTypes.string.isRequired,
  isMarketing: PropTypes.bool.isRequired,
  onImageClick: PropTypes.func.isRequired,
  onImageExpand: PropTypes.func.isRequired
};

/**
 * ProjectModal - Gallery modal for displaying project screenshots in a paginated 4-column grid
 * 
 * Features:
 * - Full-screen modal overlay
 * - Paginated 4-column grid gallery layout (20 items per page)
 * - Lazy loading for images
 * - Click image to view full size
 * - Keyboard navigation (escape to close, arrow keys for pagination)
 * - Click outside to close
 * - Responsive design
 * - Accessibility support
 * - Optimized rendering performance
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
  const [currentPage, setCurrentPage] = useState(1);
  const isMarketing = variant === 'marketing';

  // Calculate pagination
  const totalPages = useMemo(() => Math.ceil(screenshots.length / ITEMS_PER_PAGE), [screenshots.length]);
  const currentPageScreenshots = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return screenshots.slice(startIndex, endIndex);
  }, [screenshots, currentPage]);

  // Reset to page 1 when modal opens or screenshots change
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
    }
  }, [isOpen, screenshots.length]);

  const handleImageClick = useCallback((screenshot) => {
    // Navigate to the website when clicking the image
    if (screenshot.websiteUrl) {
      window.open(screenshot.websiteUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handleImageExpand = useCallback((screenshot, index, e) => {
    // Stop propagation so clicking expand doesn't navigate
    e.stopPropagation();
    // Calculate absolute index across all pages
    const absoluteIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    setSelectedImage({ ...screenshot, index: absoluteIndex });
  }, [currentPage]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      // Scroll to top of gallery when changing pages
      const galleryElement = document.querySelector('[data-gallery-container]');
      if (galleryElement) {
        galleryElement.scrollTop = 0;
      }
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      // Scroll to top of gallery when changing pages
      const galleryElement = document.querySelector('[data-gallery-container]');
      if (galleryElement) {
        galleryElement.scrollTop = 0;
      }
    }
  }, [currentPage, totalPages]);

  const handleCloseFullImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handlePreviousImage = useCallback(() => {
    if (selectedImage && selectedImage.index > 0) {
      const prevIndex = selectedImage.index - 1;
      setSelectedImage({ ...screenshots[prevIndex], index: prevIndex });
    }
  }, [selectedImage, screenshots]);

  const handleNextImage = useCallback(() => {
    if (selectedImage && selectedImage.index < screenshots.length - 1) {
      const nextIndex = selectedImage.index + 1;
      setSelectedImage({ ...screenshots[nextIndex], index: nextIndex });
    }
  }, [selectedImage, screenshots]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (selectedImage) {
        // When viewing full image, handle navigation
        if (e.key === 'Escape') {
          setSelectedImage(null);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePreviousImage();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextImage();
        }
        return;
      }

      // Modal navigation
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        e.preventDefault();
        setCurrentPage(prev => prev - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        e.preventDefault();
        setCurrentPage(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedImage, onClose, currentPage, totalPages, handlePreviousImage, handleNextImage]);

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

  if (!isOpen || screenshots.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-gray-900 z-modal flex items-center justify-center p-2 sm:p-4"
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
              className="relative w-full max-w-7xl h-modal max-h-modal flex flex-col bg-white rounded-xl overflow-hidden shadow-modal border border-gray-200/50"
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
              <div className={`flex items-center justify-between p-3 sm:p-4 border-b flex-shrink-0 ${getHeaderBg(isMarketing)}`}>
                <div className="flex-1 min-w-0">
                  <h2 
                    id="modal-title" 
                    className={`text-xl sm:text-2xl font-normal truncate ${getTextColor(isMarketing)}`}
                  >
                    {projectTitle}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className={`ml-4 p-2 rounded-full transition-colors ${getCloseButtonClasses(isMarketing)}`}
                  aria-label="Close modal"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Gallery Grid */}
              <div 
                className="flex-1 overflow-y-auto p-4 sm:p-6"
                data-gallery-container
              >
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentPageScreenshots.map((screenshot, index) => (
                    <ScreenshotItem
                      key={`${currentPage}-${index}`}
                      screenshot={screenshot}
                      index={index}
                      projectTitle={projectTitle}
                      isMarketing={isMarketing}
                      onImageClick={handleImageClick}
                      onImageExpand={handleImageExpand}
                    />
                  ))}
                </div>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className={`flex items-center justify-between p-3 sm:p-4 border-t flex-shrink-0 ${getPaginationBg(isMarketing)}`}>
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${getButtonClasses(isMarketing, currentPage === 1)}`}
                    aria-label="Previous page"
                  >
                    <FaChevronLeft />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-normal ${getTextColor(isMarketing)}`}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({screenshots.length} total)
                    </span>
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${getButtonClasses(isMarketing, currentPage === totalPages)}`}
                    aria-label="Next page"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Full Image View */}
          {selectedImage && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage.index}
                className="fixed inset-0 bg-black/95 z-image-viewer flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseFullImage}
              >
                <motion.div
                  className="relative max-w-full max-h-full flex items-center gap-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Previous Image Button */}
                  {selectedImage.index > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviousImage();
                      }}
                      className="absolute left-4 p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 transition-colors z-10"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft className="text-xl" />
                    </button>
                  )}

                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt || `${projectTitle} full size`}
                    className="max-w-full max-h-image-viewer object-contain rounded-lg"
                    loading="eager"
                  />

                  {/* Next Image Button */}
                  {selectedImage.index < screenshots.length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-4 p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 transition-colors z-10"
                      aria-label="Next image"
                    >
                      <FaChevronRight className="text-xl" />
                    </button>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={handleCloseFullImage}
                    className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 transition-colors z-10"
                    aria-label="Close full image view"
                  >
                    <FaTimes className="text-xl" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 text-white text-sm">
                    {selectedImage.index + 1} / {screenshots.length}
                  </div>
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
