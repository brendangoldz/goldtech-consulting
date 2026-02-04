/**
 * Content Loader - Code splitting for content.js
 * 
 * Dynamically loads content to reduce initial bundle size
 * This allows the main bundle to load faster while content loads in parallel
 */

let contentCache = null;

/**
 * Load content configuration
 * Uses dynamic import for code splitting
 */
export async function loadContent() {
  if (contentCache) {
    return contentCache;
  }

  try {
    const { contentConfig } = await import('./content.js');
    contentCache = contentConfig;
    return contentConfig;
  } catch (error) {
    console.error('Failed to load content:', error);
    // Return minimal fallback content
    return {
      consulting: { projects: { items: [] } },
      marketing: { projects: { items: [] } },
    };
  }
}

/**
 * Preload content (call this early in app lifecycle)
 */
export function preloadContent() {
  if (!contentCache) {
    import('./content.js').then(({ contentConfig }) => {
      contentCache = contentConfig;
    });
  }
}

/**
 * Get content synchronously (if already loaded)
 */
export function getContentSync() {
  return contentCache;
}
