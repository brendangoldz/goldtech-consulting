/**
 * ContentProvider - Preloads Sanity content so getContent(variant) is populated.
 * Wrap the app (or the tree that uses getContent) so loadContent() runs once on mount.
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { loadContent } from '../sanity/loaders';

const ContentProvider = ({ children }) => {
  const [, setContentReady] = useState(false);

  useEffect(() => {
    loadContent()
      .then(() => setContentReady(true))
      .catch(() => setContentReady(true));
  }, []);

  return children;
};

ContentProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentProvider;
