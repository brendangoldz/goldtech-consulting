/**
 * ContentProvider - Loads Sanity content and provides it via ContentContext.
 * Consumers use useContent(variant) and re-render when content is ready.
 * loadContent is dynamic-imported so Sanity client is not in the initial bundle (helps LCP).
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ContentContextProvider } from './ContentContext';

const ContentProvider = ({ children }) => {
  const [state, setState] = useState({ content: null, contentReady: false });

  useEffect(() => {
    import('../sanity/loaders')
      .then((m) => m.loadContent())
      .then((content) => {
        setState({ content, contentReady: true });
      })
      .catch(() => {
        setState((prev) => ({ ...prev, contentReady: true }));
      });
  }, []);

  return (
    <ContentContextProvider value={state}>
      {children}
    </ContentContextProvider>
  );
};

ContentProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentProvider;
