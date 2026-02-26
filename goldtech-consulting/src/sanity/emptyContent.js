/**
 * Empty content shape used before Sanity content loads.
 * Kept in a separate file so ContentContext does not pull in the full loaders bundle.
 */

function getEmptyVariantContent() {
    return {
      hero: {
        trustIndicator: '',
        heading: {
          line1: '',
          highlight1: '',
          line2: '',
          highlight2: '',
          line3: '',
          highlight3: ''
        },
        subtitle: '',
        primaryCTA: '',
        secondaryCTA: ''
      },
      about: {
        eyebrow: '',
        title: '',
        subtitle: '',
        description: '',
        features: [],
        techStack: [],
        image: '',
        imageAlt: ''
      },
      services: { eyebrow: '', title: '', subtitle: '', items: [] },
      projects: { eyebrow: '', title: '', subtitle: '', items: [] },
      footer: { description: '', copyright: '' },
      contact: {
        email: '',
        location: '',
        socialLinks: { linkedin: '', facebook: '', github: '', upwork: '' }
      }
    };
  }
  
  export const EMPTY_CONTENT = getEmptyVariantContent();
  