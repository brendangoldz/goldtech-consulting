import { useEffect, useRef, useState } from 'react';
import DOTS from 'vanta/dist/vanta.dots.min';

const THREE_LOAD_TIMEOUT_MS = 5000;
const THREE_POLL_INTERVAL_MS = 100;
const VANTA_DISABLED_STORAGE_KEY = 'vanta.webgl.disabled';

/**
 * Safely read a WebGL disabled flag from session storage.
 *
 * @returns {boolean} True when Vanta should be skipped.
 */
const getVantaDisabledFlag = () => {
  try {
    return window.sessionStorage?.getItem(VANTA_DISABLED_STORAGE_KEY) === 'true';
  } catch (error) {
    return false;
  }
};

/**
 * Safely set a WebGL disabled flag in session storage.
 *
 * @returns {void}
 */
const setVantaDisabledFlag = () => {
  try {
    window.sessionStorage?.setItem(VANTA_DISABLED_STORAGE_KEY, 'true');
  } catch (error) {
    // No-op: storage may be unavailable.
  }
};

/**
 * Clear any stale persistent disable flag from local storage.
 *
 * @returns {void}
 */
const clearStaleVantaDisabledFlag = () => {
  try {
    window.localStorage?.removeItem(VANTA_DISABLED_STORAGE_KEY);
  } catch (error) {
    // No-op: storage may be unavailable.
  }
};

/**
 * useVantaDots - Initialize and manage Vanta.js DOTS background effect.
 *
 * @param {Object} options - Vanta configuration options.
 * @param {Array<unknown>} deps - Dependency list for the effect.
 * @returns {{ vantaRef: Object, vantaEffect: Object, isVantaEnabled: boolean }}
 */
const useVantaDots = (options, deps = []) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const hasVantaFailedRef = useRef(false);
  const [isVantaEnabled, setIsVantaEnabled] = useState(true);

  useEffect(() => {
    clearStaleVantaDisabledFlag();

    if (getVantaDisabledFlag() || hasVantaFailedRef.current) {
      setIsVantaEnabled(false);
      return () => {};
    }

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
          hasVantaFailedRef.current = true;
          setIsVantaEnabled(false);
          setVantaDisabledFlag();
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

  return { vantaRef, vantaEffect, isVantaEnabled };
};

export default useVantaDots;
