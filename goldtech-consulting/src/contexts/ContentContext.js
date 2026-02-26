/**
 * ContentContext - Reactive content for the app.
 * Holds full loaded content (consulting + marketing) and contentReady flag.
 * Consumers use useContent(variant) to subscribe and re-render when content loads.
 */

import { createContext, useContext } from 'react';
import { EMPTY_CONTENT } from '../sanity/loaders';

const ContentContext = createContext({
  content: null,
  contentReady: false
});

/**
 * useContent - Returns content for a variant and subscribes to context updates.
 * When content loads, consumers re-render with the loaded data.
 *
 * @param {string} variant - 'consulting' or 'marketing'
 * @returns {Object} Variant content (hero, about, services, projects, footer, contact)
 */
export function useContent(variant = 'consulting') {
  const { content } = useContext(ContentContext);
  if (!content) {
    return EMPTY_CONTENT;
  }
  return content[variant] || content.consulting;
}

/**
 * useContentReady - Returns whether Sanity content has finished loading.
 *
 * @returns {boolean}
 */
export function useContentReady() {
  const { contentReady } = useContext(ContentContext);
  return contentReady;
}

ContentContext.displayName = 'ContentContext';

export const ContentContextProvider = ContentContext.Provider;

export default ContentContext;
