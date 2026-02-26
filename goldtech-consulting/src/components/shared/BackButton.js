import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * BackButton - Navigate back in history or to a fallback path
 *
 * @param {string} fallbackPath - Path to navigate to when history is empty
 * @param {string} variant - 'consulting' or 'marketing' for styling
 * @param {boolean} onlyWhenReferrer - If true, only show when referrer is same-origin or fromLocation is set
 * @param {boolean} fromLocation - If true, navigator came from in-app (e.g. location.state.from); show back button
 */
const BackButton = ({ fallbackPath, variant = 'consulting', onlyWhenReferrer = false, fromLocation = false }) => {
  const navigate = useNavigate();

  const shouldShow = useMemo(() => {
    if (!onlyWhenReferrer) return true;
    if (fromLocation) return true;
    try {
      const referrer = document.referrer;
      if (!referrer || referrer === '') return false;
      return new URL(referrer).origin === window.location.origin;
    } catch {
      return false;
    }
  }, [onlyWhenReferrer, fromLocation]);

  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  if (!shouldShow) return null;

  const isMarketing = variant === 'marketing';
  const focusRing = isMarketing ? 'focus:ring-marketing-primary/40' : 'focus:ring-gold/40';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${focusRing} ${
        isMarketing
          ? 'text-navy hover:text-marketing-primary'
          : 'text-navy hover:text-gold'
      }`}
      aria-label="Go back"
    >
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back
    </button>
  );
};

BackButton.propTypes = {
  fallbackPath: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['consulting', 'marketing']),
  onlyWhenReferrer: PropTypes.bool,
  fromLocation: PropTypes.bool
};

export default BackButton;
