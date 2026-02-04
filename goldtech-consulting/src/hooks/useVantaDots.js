import { useEffect, useRef } from 'react';
import DOTS from 'vanta/dist/vanta.dots.min';

const THREE_LOAD_TIMEOUT_MS = 5000;
const THREE_POLL_INTERVAL_MS = 100;

const useVantaDots = (options, deps = []) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    const initVanta = () => {
      if (vantaRef.current && !vantaEffect.current && window.THREE) {
        try {
          vantaEffect.current = DOTS({
            el: vantaRef.current,
            THREE: window.THREE,
            ...options
          });
        } catch (error) {
          console.error('Error initializing Vanta:', error);
        }
      }
    };

    if (window.THREE) {
      initVanta();
    } else {
      const checkTHREE = setInterval(() => {
        if (window.THREE) {
          clearInterval(checkTHREE);
          initVanta();
        }
      }, THREE_POLL_INTERVAL_MS);

      setTimeout(() => {
        clearInterval(checkTHREE);
      }, THREE_LOAD_TIMEOUT_MS);
    }

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.error('Error destroying Vanta:', error);
        }
        vantaEffect.current = null;
      }
    };
  }, deps);

  return { vantaRef, vantaEffect };
};

export default useVantaDots;
