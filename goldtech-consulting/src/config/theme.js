/**
 * Theme Configuration - Variant-based styling utilities
 * 
 * Provides theme classes and utilities for distinguishing
 * Consulting (masculine, business-forward) from Marketing (creative, distinct)
 */

/**
 * Get theme classes for a specific variant
 * 
 * @param {string} variant - 'consulting' or 'marketing'
 * @param {string} element - Element type ('bg', 'text', 'border', 'accent', etc.)
 * @returns {string} Tailwind classes for the element
 */
export const getThemeClasses = (variant, element) => {
  if (variant === 'marketing') {
    switch (element) {
      case 'bg-primary':
        return 'bg-marketing-primary';
      case 'bg-secondary':
        return 'bg-marketing-bg';
      case 'bg-alt':
        return 'bg-marketing-bgAlt';
      case 'text-primary':
        return 'text-marketing-primary';
      case 'text-accent':
        return 'text-marketing-accent';
      case 'border-primary':
        return 'border-marketing-primary';
      case 'accent-gradient':
        return 'from-marketing-primary to-marketing-accent';
      case 'hover-bg':
        return 'hover:bg-marketing-primary/10';
      case 'hover-text':
        return 'hover:text-marketing-primary';
      case 'focus-ring':
        return 'focus:ring-marketing-primary/40';
      case 'section-bg':
        return 'bg-marketing-bg';
      case 'card-bg':
        return 'bg-marketing-bgAlt';
      case 'card-border':
        return 'border-marketing-primary/20';
      default:
        return '';
    }
  } else {
    // Consulting variant - default masculine, business-forward styling
    switch (element) {
      case 'bg-primary':
        return 'bg-navy';
      case 'bg-secondary':
        return 'bg-white';
      case 'bg-alt':
        return 'bg-lightGray';
      case 'text-primary':
        return 'text-navy';
      case 'text-accent':
        return 'text-gold';
      case 'border-primary':
        return 'border-navy';
      case 'accent-gradient':
        return 'from-gold to-goldLight';
      case 'hover-bg':
        return 'hover:bg-navy/10';
      case 'hover-text':
        return 'hover:text-gold';
      case 'focus-ring':
        return 'focus:ring-gold/40';
      case 'section-bg':
        return 'bg-lightGray';
      case 'card-bg':
        return 'bg-white';
      case 'card-border':
        return 'border-gray-100';
      default:
        return '';
    }
  }
};

/**
 * Resolve variant class from a mapping object.
 * 
 * @param {string} variant - 'consulting' or 'marketing'
 * @param {Object} classes - { marketing: string, consulting: string }
 * @returns {string} Variant-specific classes
 */
export const getVariantClasses = (variant, classes) =>
  variant === 'marketing' ? classes.marketing : classes.consulting;

/**
 * Get hero background gradient classes
 * 
 * @param {string} variant - 'consulting' or 'marketing'
 * @returns {string} Tailwind gradient classes
 */
export const getHeroGradient = (variant) => {
  if (variant === 'marketing') {
    return 'bg-gradient-to-br from-marketing-bg via-white to-marketing-primary/5';
  }
  return 'bg-gradient-to-br from-white via-lightGray to-gold/5';
};

/**
 * Get section background class
 * 
 * @param {string} variant - 'consulting' or 'marketing'
 * @param {boolean} alternate - Whether this is an alternate section
 * @returns {string} Background class
 */
export const getSectionBg = (variant, alternate = false) => {
  if (variant === 'marketing') {
    return alternate ? 'bg-marketing-bgAlt' : 'bg-marketing-bg';
  }
  return alternate ? 'bg-white' : 'bg-lightGray';
};
