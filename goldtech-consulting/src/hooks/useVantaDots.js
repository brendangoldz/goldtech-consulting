import { useEffect, useRef, useState } from 'react';

const THREE_LOAD_TIMEOUT_MS = 5000;
const THREE_POLL_INTERVAL_MS = 80;
const VANTA_DISABLED_STORAGE_KEY = 'vanta.webgl.disabled';
/** Defer Vanta init until after first paint so LCP is text/content, not the canvas. */
const VANTA_DEFER_IDLE_MS = 2600;

/** True when the full Three.js library is available (not just a stub). */
const isTHREEReady = () =>
  typeof window !== 'undefined' &&
  window.THREE &&
  typeof window.THREE.PerspectiveCamera === 'function';

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
  const runWhenReadyCleanupRef = useRef(null);
  const [isVantaEnabled, setIsVantaEnabled] = useState(true);

  useEffect(() => {
    clearStaleVantaDisabledFlag();
    runWhenReadyCleanupRef.current = null;

    const isMobileViewport = () => {
      if (typeof window === 'undefined') return false;
      return (
        window.innerWidth <= 768 ||
        (typeof window.matchMedia !== 'undefined' &&
          window.matchMedia('(max-width: 768px)').matches)
      );
    };
    if (
      getVantaDisabledFlag() ||
      hasVantaFailedRef.current ||
      isMobileViewport()
    ) {
      setIsVantaEnabled(false);
      return () => {};
    }

    const initVanta = () => {
      if (!vantaRef.current || vantaEffect.current) return;
      const THREE = typeof window !== 'undefined' ? window.THREE : null;
      if (!THREE || typeof THREE.PerspectiveCamera !== 'function') return;
      import('vanta/dist/vanta.dots.min')
        .then((module) => {
          const DOTS = module.default;
          if (!vantaRef.current || vantaEffect.current) return;
          try {
            vantaEffect.current = DOTS({
              ...options,
              el: vantaRef.current,
              THREE
            });
          } catch (error) {
            console.error('Error initializing Vanta:', error);
            hasVantaFailedRef.current = true;
            setIsVantaEnabled(false);
            setVantaDisabledFlag();
          }
        })
        .catch(() => {
          hasVantaFailedRef.current = true;
          setIsVantaEnabled(false);
        });
    };

    const runWhenReady = () => {
      if (!vantaRef.current) return;
      if (isTHREEReady()) {
        initVanta();
        return;
      }
      const pollId = setInterval(() => {
        if (isTHREEReady()) {
          clearInterval(pollId);
          initVanta();
        }
      }, THREE_POLL_INTERVAL_MS);
      const timeoutId = setTimeout(() => {
        clearInterval(pollId);
        if (!vantaEffect.current) {
          hasVantaFailedRef.current = true;
          setIsVantaEnabled(false);
        }
      }, THREE_LOAD_TIMEOUT_MS);
      return () => {
        clearInterval(pollId);
        clearTimeout(timeoutId);
      };
    };

    const scheduleAfterPaint = (cb) => {
      if (typeof requestIdleCallback !== 'undefined') {
        return requestIdleCallback(cb, { timeout: VANTA_DEFER_IDLE_MS });
      }
      return setTimeout(cb, 100);
    };
    const cancelSchedule = (id) => {
      if (typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };

    const scheduleId = scheduleAfterPaint(() => {
      const cleanup = runWhenReady();
      if (typeof cleanup === 'function') runWhenReadyCleanupRef.current = cleanup;
    });

    return () => {
      cancelSchedule(scheduleId);
      if (typeof runWhenReadyCleanupRef.current === 'function') {
        runWhenReadyCleanupRef.current();
        runWhenReadyCleanupRef.current = null;
      }
      if (vantaEffect.current && typeof vantaEffect.current.destroy === 'function') {
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
