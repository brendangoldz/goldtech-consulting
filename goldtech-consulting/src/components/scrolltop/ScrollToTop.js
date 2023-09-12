import React, { useEffect, useState } from 'react';
import './ScrollToTop.css'; // Add your CSS here

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="scrollToTop"
      style={{ display: visible ? 'block' : 'none' }}
    >
      Top
    </button>
  );
};

export default ScrollToTop;
