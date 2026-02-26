import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary - Error boundary component for catching and handling errors
 * 
 * Features:
 * - Catches JavaScript errors anywhere in the child component tree
 * - Logs errors to console and error reporting service
 * - Displays fallback UI when errors occur
 * - Provides error recovery options
 * - Accessibility support
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {Function} props.fallback - Custom fallback component
 * @param {Function} props.onError - Error callback function
 * @param {string} props.level - Error level (page, section, component)
 * @returns {JSX.Element} Rendered error boundary
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    this.setState({
      error,
      errorInfo
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call error callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you would typically send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // Default fallback UI
      return (
        <motion.div
          className="min-h-[400px] flex items-center justify-center p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-red-200 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Please try again or contact support if the problem persists.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-gold text-navy px-4 py-2 rounded-lg font-normal hover:bg-gold/90 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2"
                aria-label="Try again"
              >
                Try Again
              </button>
              
              <button
                onClick={this.handleReload}
                className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-normal hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label="Reload page"
              >
                Reload Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Error Details (Development Only)
                </summary>
                <div className="mt-2 p-4 bg-gray-100 rounded-lg text-xs font-mono text-gray-800 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
  onError: PropTypes.func,
  level: PropTypes.oneOf(['page', 'section', 'component'])
};

/**
 * withErrorBoundary - Higher-order component for wrapping components with error boundary
 * 
 * @param {React.Component} Component - Component to wrap
 * @param {Object} errorBoundaryProps - Props for ErrorBoundary
 * @returns {React.Component} Wrapped component with error boundary
 */
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

/**
 * ErrorFallback - Simple error fallback component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Error} props.error - The error that occurred
 * @param {Function} props.retry - Function to retry the operation
 * @param {string} props.message - Custom error message
 * @returns {JSX.Element} Rendered error fallback
 */
export const ErrorFallback = ({ error, retry, message = 'Something went wrong' }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-center">
      <svg
        className="w-5 h-5 text-red-600 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
      <span className="text-red-800 font-medium">{message}</span>
    </div>
    {retry && (
      <button
        onClick={retry}
        className="mt-2 text-sm text-red-600 hover:text-red-800 underline focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 rounded"
      >
        Try again
      </button>
    )}
  </div>
);

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error),
  retry: PropTypes.func,
  message: PropTypes.string
};

export default ErrorBoundary;
