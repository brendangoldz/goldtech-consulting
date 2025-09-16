# GoldTech Consulting - Style Guide

## 📋 Table of Contents
1. [JavaScript/React Standards](#javascriptreact-standards)
2. [Code Formatting](#code-formatting)
3. [Component Architecture](#component-architecture)
4. [Styling Guidelines](#styling-guidelines)
5. [File Organization](#file-organization)
6. [Naming Conventions](#naming-conventions)
7. [Documentation Standards](#documentation-standards)
8. [Error Handling](#error-handling)
9. [Performance Guidelines](#performance-guidelines)
10. [AWS Integration Patterns](#aws-integration-patterns)

## ⚛️ JavaScript/React Standards

### Modern JavaScript (ES2020+)
```javascript
// ✅ GOOD: Modern syntax
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw new Error('User data unavailable');
  }
};

// ❌ BAD: Legacy syntax
function fetchUserData(userId) {
  return fetch('/api/users/' + userId)
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
}
```

### React Functional Components
```javascript
// ✅ GOOD: Functional component with hooks
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ userId, onUpdate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await fetchUserData(userId);
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) return <div className="animate-pulse">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
};

export default UserProfile;
```

### Custom Hooks
```javascript
// ✅ GOOD: Custom hook for reusable logic
import { useState, useEffect } from 'react';

export const useApiData = (url, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};
```

## 🎨 Code Formatting

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### Import Organization
```javascript
// ✅ GOOD: Organized imports
// 1. React and core libraries
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// 2. Third-party libraries
import axios from 'axios';
import { motion } from 'framer-motion';

// 3. Internal components (absolute imports)
import Button from 'components/shared/Button';
import LoadingSpinner from 'components/shared/LoadingSpinner';

// 4. Internal utilities and hooks
import { useApiData } from 'hooks/useApiData';
import { formatDate } from 'utils/dateUtils';

// 5. Styles (last)
import './UserProfile.css';
```

### Variable Declarations
```javascript
// ✅ GOOD: Clear, descriptive naming
const userEmailAddress = 'user@example.com';
const isUserAuthenticated = true;
const maximumRetryAttempts = 3;

// ❌ BAD: Unclear abbreviations
const usrEmail = 'user@example.com';
const isAuth = true;
const maxRetry = 3;
```

## 🏗️ Component Architecture

### Component Structure Template
```javascript
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * ComponentName - Brief description of component purpose
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Component title
 * @param {Function} props.onSubmit - Submit handler
 * @returns {JSX.Element} Rendered component
 */
const ComponentName = ({ title, onSubmit }) => {
  // 1. State declarations
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  // 2. Custom hooks
  const { user } = useAuth();

  // 3. Event handlers
  const handleSubmit = useCallback((formData) => {
    setIsLoading(true);
    onSubmit(formData)
      .finally(() => setIsLoading(false));
  }, [onSubmit]);

  // 4. Effects
  useEffect(() => {
    // Effect logic here
  }, []);

  // 5. Render helpers
  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    return <div>{/* Content */}</div>;
  };

  // 6. Main render
  return (
    <div className="component-wrapper">
      <h1>{title}</h1>
      {renderContent()}
    </div>
  );
};

ComponentName.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ComponentName.defaultProps = {
  title: 'Default Title',
};

export default ComponentName;
```

### Component Composition
```javascript
// ✅ GOOD: Composable components
const ContactForm = () => {
  return (
    <form className="space-y-4">
      <FormField
        label="Name"
        type="text"
        required
        validation={validateName}
      />
      <FormField
        label="Email"
        type="email"
        required
        validation={validateEmail}
      />
      <FormField
        label="Message"
        type="textarea"
        required
        validation={validateMessage}
      />
      <ButtonGroup>
        <Button variant="primary" type="submit">
          Send Message
        </Button>
        <Button variant="secondary" type="button">
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
};
```

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices
```javascript
// ✅ GOOD: Semantic class organization
const Card = ({ children, variant = 'default' }) => {
  const baseClasses = 'rounded-lg shadow-md p-6';
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    primary: 'bg-blue-50 border border-blue-200',
    success: 'bg-green-50 border border-green-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    error: 'bg-red-50 border border-red-200',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

// ✅ GOOD: Responsive design
const ResponsiveGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="col-span-1 md:col-span-2 lg:col-span-1">
      {/* Content */}
    </div>
  </div>
);

// ❌ BAD: Inline styles (except for dynamic values)
const BadComponent = () => (
  <div style={{ backgroundColor: 'red', padding: '20px' }}>
    {/* Don't do this */}
  </div>
);

// ✅ GOOD: Dynamic styles when necessary
const DynamicComponent = ({ color }) => (
  <div 
    className="p-4 rounded"
    style={{ backgroundColor: color }} // Only for truly dynamic values
  >
    Content
  </div>
);
```

### CSS Custom Properties
```css
/* ✅ GOOD: CSS custom properties for design tokens */
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-secondary: #6b7280;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --border-radius: 0.375rem;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

## 📁 File Organization

### Directory Structure
```
src/
├── components/
│   ├── about/
│   │   ├── About.js
│   │   ├── About.test.js
│   │   └── About.css
│   ├── contact/
│   │   ├── ContactForm.js
│   │   ├── ContactSection.js
│   │   ├── ContactForm.test.js
│   │   └── ContactSection.test.js
│   └── shared/
│       ├── Button/
│       │   ├── Button.js
│       │   ├── Button.test.js
│       │   └── Button.css
│       ├── Modal/
│       └── LoadingSpinner/
├── hooks/
│   ├── useApiData.js
│   ├── useLocalStorage.js
│   └── useDebounce.js
├── utils/
│   ├── dateUtils.js
│   ├── validationUtils.js
│   └── apiUtils.js
├── services/
│   ├── apiService.js
│   ├── authService.js
│   └── emailService.js
└── constants/
    ├── apiEndpoints.js
    ├── validationRules.js
    └── appConstants.js
```

### File Naming Conventions
```javascript
// ✅ GOOD: PascalCase for components
// UserProfile.js
// ContactForm.js
// NavigationMenu.js

// ✅ GOOD: camelCase for utilities and hooks
// dateUtils.js
// useApiData.js
// validationUtils.js

// ✅ GOOD: kebab-case for CSS files
// user-profile.css
// contact-form.css
// navigation-menu.css
```

## 🏷️ Naming Conventions

### Variables and Functions
```javascript
// ✅ GOOD: Descriptive, camelCase
const userEmailAddress = 'user@example.com';
const isUserAuthenticated = true;
const maximumRetryAttempts = 3;

const fetchUserData = async (userId) => { /* ... */ };
const validateEmailAddress = (email) => { /* ... */ };
const handleFormSubmission = (formData) => { /* ... */ };

// ❌ BAD: Unclear or inconsistent naming
const email = 'user@example.com';
const auth = true;
const retry = 3;

const getUser = async (id) => { /* ... */ };
const checkEmail = (e) => { /* ... */ };
const submit = (data) => { /* ... */ };
```

### Constants
```javascript
// ✅ GOOD: SCREAMING_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.goldtech-consulting.com';
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT = 5000;

// ✅ GOOD: Grouped constants
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
};
```

## 📚 Documentation Standards

### JSDoc Comments
```javascript
/**
 * Calculates the total price including tax and discounts
 * 
 * @param {number} basePrice - The base price before tax and discounts
 * @param {number} taxRate - The tax rate as a decimal (e.g., 0.08 for 8%)
 * @param {number} discountAmount - The discount amount to subtract
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR')
 * @returns {Object} Object containing total price and breakdown
 * @returns {number} returns.total - The final total price
 * @returns {number} returns.tax - The tax amount
 * @returns {number} returns.discount - The discount amount
 * 
 * @example
 * const result = calculateTotalPrice(100, 0.08, 10, 'USD');
 * console.log(result.total); // 98
 * 
 * @throws {Error} When basePrice is negative
 */
const calculateTotalPrice = (basePrice, taxRate, discountAmount, currency) => {
  if (basePrice < 0) {
    throw new Error('Base price cannot be negative');
  }
  
  const tax = basePrice * taxRate;
  const total = basePrice + tax - discountAmount;
  
  return {
    total: Math.max(0, total),
    tax,
    discount: discountAmount,
    currency,
  };
};
```

### Component Documentation
```javascript
/**
 * ContactForm - A form component for collecting user contact information
 * 
 * Features:
 * - Email validation
 * - Required field validation
 * - Loading states
 * - Error handling
 * - Accessibility support
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {boolean} props.isLoading - Whether form is in loading state
 * @param {string} props.errorMessage - Error message to display
 * @param {Object} props.initialValues - Initial form values
 * 
 * @example
 * <ContactForm
 *   onSubmit={handleSubmit}
 *   isLoading={false}
 *   errorMessage=""
 *   initialValues={{ name: '', email: '', message: '' }}
 * />
 */
const ContactForm = ({ onSubmit, isLoading, errorMessage, initialValues }) => {
  // Component implementation
};
```

## ⚠️ Error Handling

### Error Boundaries
```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Async Error Handling
```javascript
// ✅ GOOD: Comprehensive error handling
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error: Unable to connect to server');
    }
    
    if (error.message.includes('404')) {
      throw new Error('User not found');
    }
    
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};

// ✅ GOOD: Error handling in components
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <div>No user data available</div>;

  return <UserCard user={user} />;
};
```

## 🚀 Performance Guidelines

### Memoization
```javascript
// ✅ GOOD: Memoizing expensive calculations
const ExpensiveComponent = ({ data, filter }) => {
  const filteredData = useMemo(() => {
    return data.filter(item => item.category === filter);
  }, [data, filter]);

  const sortedData = useMemo(() => {
    return filteredData.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredData]);

  return (
    <div>
      {sortedData.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

// ✅ GOOD: Memoizing callbacks
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const handleItemClick = useCallback((itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <button onClick={handleIncrement}>Count: {count}</button>
      {items.map(item => (
        <MemoizedItemCard
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
};

// ✅ GOOD: Memoizing components
const MemoizedItemCard = React.memo(({ item, onClick }) => {
  return (
    <div onClick={() => onClick(item.id)}>
      {item.name}
    </div>
  );
});
```

### Lazy Loading
```javascript
// ✅ GOOD: Lazy loading components
import React, { lazy, Suspense } from 'react';

const LazyContactForm = lazy(() => import('./ContactForm'));
const LazyUserProfile = lazy(() => import('./UserProfile'));

const App = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  return (
    <div>
      <button onClick={() => setShowContactForm(true)}>
        Show Contact Form
      </button>
      
      {showContactForm && (
        <Suspense fallback={<div>Loading contact form...</div>}>
          <LazyContactForm />
        </Suspense>
      )}

      {showUserProfile && (
        <Suspense fallback={<div>Loading user profile...</div>}>
          <LazyUserProfile />
        </Suspense>
      )}
    </div>
  );
};
```

## ☁️ AWS Integration Patterns

### Lambda Function Structure
```javascript
// ✅ GOOD: Well-structured Lambda function
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: process.env.AWS_REGION });

/**
 * Lambda handler for contact form submissions
 * 
 * @param {Object} event - API Gateway event
 * @param {Object} context - Lambda context
 * @returns {Object} API Gateway response
 */
export const handler = async (event, context) => {
  // Input validation
  if (!event.body) {
    return createErrorResponse(400, 'Request body is required');
  }

  let parsedData;
  try {
    parsedData = JSON.parse(event.body);
  } catch (error) {
    return createErrorResponse(400, 'Invalid JSON in request body');
  }

  const { email, subject, message } = parsedData;

  // Validate required fields
  if (!email || !subject || !message) {
    return createErrorResponse(400, 'Missing required fields: email, subject, message');
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return createErrorResponse(400, 'Invalid email format');
  }

  try {
    // Send email via SES
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [process.env.SES_TO_EMAIL],
      },
      Message: {
        Body: {
          Text: {
            Data: `From: ${email}\n\n${message}`,
          },
        },
        Subject: {
          Data: subject,
        },
      },
      Source: process.env.SES_FROM_EMAIL,
    });

    await sesClient.send(command);

    return createSuccessResponse({
      message: 'Email sent successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('SES error:', error);
    return createErrorResponse(500, 'Failed to send email');
  }
};

// Helper functions
const createSuccessResponse = (data) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  },
  body: JSON.stringify(data),
});

const createErrorResponse = (statusCode, message) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  },
  body: JSON.stringify({ error: message }),
});

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Frontend AWS Integration
```javascript
// ✅ GOOD: AWS service integration
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

class ContactService {
  /**
   * Submit contact form data to Lambda function
   * 
   * @param {Object} formData - Form data to submit
   * @param {string} formData.email - User email
   * @param {string} formData.subject - Email subject
   * @param {string} formData.message - Email message
   * @returns {Promise<Object>} API response
   */
  static async submitContactForm(formData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data.error || 'Server error');
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Network error: Unable to connect to server');
      } else {
        // Something else happened
        throw new Error('An unexpected error occurred');
      }
    }
  }
}

export default ContactService;
```

---

*This style guide should be followed for all code in the GoldTech Consulting repository. For questions or clarifications, please refer to the team lead or create an issue in the repository.*

*Last Updated: December 2024*
*Version: 1.0*
