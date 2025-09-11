# GoldTech Consulting - Accessibility Documentation

## 📋 Table of Contents
1. [Accessibility Philosophy](#accessibility-philosophy)
2. [WCAG 2.1 AA Compliance](#wcag-21-aa-compliance)
3. [Semantic HTML](#semantic-html)
4. [Keyboard Navigation](#keyboard-navigation)
5. [Screen Reader Support](#screen-reader-support)
6. [Visual Design](#visual-design)
7. [Testing & Validation](#testing--validation)
8. [Component Guidelines](#component-guidelines)
9. [Common Patterns](#common-patterns)
10. [Resources & Tools](#resources--tools)

## 🎯 Accessibility Philosophy

### Core Principles
- **Inclusive Design**: Design for everyone, including people with disabilities
- **Progressive Enhancement**: Build accessible experiences that work for all users
- **User-Centered**: Focus on real user needs and experiences
- **Continuous Improvement**: Regular testing and refinement of accessibility features

### Legal & Business Impact
- **WCAG 2.1 AA Compliance**: Required for government contracts and many enterprise clients
- **Legal Compliance**: ADA, Section 508, and international accessibility laws
- **Business Benefits**: Expanded user base, improved SEO, better user experience
- **Brand Reputation**: Demonstrates commitment to inclusivity and social responsibility

## 📏 WCAG 2.1 AA Compliance

### Four Principles of Accessibility

#### 1. Perceivable
- **Text Alternatives**: All images have alt text
- **Captions**: Video content includes captions
- **Color Contrast**: Minimum 4.5:1 ratio for normal text, 3:1 for large text
- **Resizable Text**: Text can be resized up to 200% without loss of functionality

#### 2. Operable
- **Keyboard Accessible**: All functionality available via keyboard
- **No Seizures**: No content flashes more than 3 times per second
- **Navigation**: Users can navigate and find content easily
- **Input Modalities**: Support for various input methods

#### 3. Understandable
- **Readable**: Text content is readable and understandable
- **Predictable**: Web pages appear and operate in predictable ways
- **Input Assistance**: Users are helped to avoid and correct mistakes

#### 4. Robust
- **Compatible**: Content is compatible with assistive technologies
- **Future-Proof**: Works with current and future user agents

## 🏗️ Semantic HTML

### Document Structure
```html
<!-- ✅ GOOD: Proper document structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GoldTech Consulting - Professional Web Development Services</title>
  <meta name="description" content="Expert web development and consulting services">
</head>
<body>
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <!-- Navigation content -->
    </nav>
  </header>
  
  <main role="main">
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">Welcome to GoldTech Consulting</h1>
    </section>
    
    <section aria-labelledby="services-heading">
      <h2 id="services-heading">Our Services</h2>
    </section>
  </main>
  
  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</body>
</html>
```

### Heading Hierarchy
```html
<!-- ✅ GOOD: Proper heading hierarchy -->
<h1>GoldTech Consulting</h1>
  <h2>Our Services</h2>
    <h3>Web Development</h3>
      <h4>Frontend Development</h4>
      <h4>Backend Development</h4>
    <h3>Consulting</h3>
      <h4>Technical Consulting</h4>
      <h4>Project Management</h4>
  <h2>About Us</h2>
    <h3>Our Team</h3>
    <h3>Our Mission</h3>

<!-- ❌ BAD: Skipping heading levels -->
<h1>GoldTech Consulting</h1>
  <h3>Our Services</h3> <!-- Skipped h2 -->
    <h5>Web Development</h5> <!-- Skipped h4 -->
```

### Form Structure
```html
<!-- ✅ GOOD: Accessible form -->
<form aria-labelledby="contact-form-heading" novalidate>
  <fieldset>
    <legend id="contact-form-heading">Contact Information</legend>
    
    <div class="form-group">
      <label for="contact-name">Full Name *</label>
      <input 
        type="text" 
        id="contact-name" 
        name="name" 
        required 
        aria-describedby="name-error"
        aria-invalid="false"
      >
      <div id="name-error" class="error-message" role="alert" aria-live="polite">
        <!-- Error message will appear here -->
      </div>
    </div>
    
    <div class="form-group">
      <label for="contact-email">Email Address *</label>
      <input 
        type="email" 
        id="contact-email" 
        name="email" 
        required 
        aria-describedby="email-error email-help"
        aria-invalid="false"
      >
      <div id="email-help" class="help-text">
        We'll never share your email address
      </div>
      <div id="email-error" class="error-message" role="alert" aria-live="polite">
        <!-- Error message will appear here -->
      </div>
    </div>
    
    <div class="form-group">
      <label for="contact-message">Message *</label>
      <textarea 
        id="contact-message" 
        name="message" 
        rows="5" 
        required 
        aria-describedby="message-error"
        aria-invalid="false"
      ></textarea>
      <div id="message-error" class="error-message" role="alert" aria-live="polite">
        <!-- Error message will appear here -->
      </div>
    </div>
    
    <button type="submit" aria-describedby="submit-help">
      Send Message
    </button>
    <div id="submit-help" class="help-text">
      Your message will be sent securely
    </div>
  </fieldset>
</form>
```

## ⌨️ Keyboard Navigation

### Focus Management
```javascript
// ✅ GOOD: Proper focus management
import React, { useRef, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement;
      
      // Focus the modal
      modalRef.current?.focus();
      
      // Trap focus within modal
      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements?.length) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
        // Return focus to previously focused element
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button 
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
```

### Skip Links
```html
<!-- ✅ GOOD: Skip navigation links -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
<a href="#navigation" class="skip-link">
  Skip to navigation
</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
</style>
```

### Keyboard Event Handling
```javascript
// ✅ GOOD: Keyboard event handling
const handleKeyDown = (event) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      handleClick();
      break;
    case 'Escape':
      handleClose();
      break;
    case 'ArrowDown':
      event.preventDefault();
      focusNextItem();
      break;
    case 'ArrowUp':
      event.preventDefault();
      focusPreviousItem();
      break;
    default:
      break;
  }
};

// ✅ GOOD: Accessible button component
const AccessibleButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  ariaLabel,
  ariaDescribedBy 
}) => {
  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className="accessible-button"
    >
      {children}
    </button>
  );
};
```

## 🔊 Screen Reader Support

### ARIA Labels and Descriptions
```html
<!-- ✅ GOOD: Comprehensive ARIA support -->
<button 
  aria-label="Close dialog"
  aria-describedby="close-help"
  onClick={handleClose}
>
  ×
</button>
<div id="close-help" class="sr-only">
  This will close the current dialog and return to the main content
</div>

<!-- ✅ GOOD: ARIA live regions for dynamic content -->
<div 
  id="status-message" 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
>
  <!-- Status messages will be announced here -->
</div>

<div 
  id="error-message" 
  role="alert" 
  aria-live="assertive" 
  aria-atomic="true"
>
  <!-- Error messages will be announced immediately -->
</div>
```

### ARIA States and Properties
```javascript
// ✅ GOOD: Dynamic ARIA attributes
const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  const contentId = `content-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const buttonId = `button-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="accordion-item">
      <button
        id={buttonId}
        className="accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-describedby={`${contentId}-description`}
      >
        {title}
        <span className="accordion-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      <div
        id={contentId}
        className="accordion-content"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        role="region"
      >
        <div id={`${contentId}-description`} className="sr-only">
          Expandable content section
        </div>
        {content}
      </div>
    </div>
  );
};
```

### Screen Reader Only Content
```css
/* ✅ GOOD: Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ✅ GOOD: Focusable screen reader only content */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

## 🎨 Visual Design

### Color Contrast
```css
/* ✅ GOOD: WCAG AA compliant color contrast */
:root {
  /* Primary colors - 4.5:1 contrast ratio */
  --color-primary: #1e40af; /* Blue 800 */
  --color-primary-text: #ffffff;
  
  /* Secondary colors - 4.5:1 contrast ratio */
  --color-secondary: #374151; /* Gray 700 */
  --color-secondary-text: #ffffff;
  
  /* Text colors - 4.5:1 contrast ratio */
  --color-text-primary: #111827; /* Gray 900 */
  --color-text-secondary: #4b5563; /* Gray 600 */
  --color-text-muted: #6b7280; /* Gray 500 */
  
  /* Background colors */
  --color-background: #ffffff;
  --color-background-secondary: #f9fafb; /* Gray 50 */
  
  /* Error and success colors - 4.5:1 contrast ratio */
  --color-error: #dc2626; /* Red 600 */
  --color-error-text: #ffffff;
  --color-success: #059669; /* Green 600 */
  --color-success-text: #ffffff;
}

/* ✅ GOOD: Focus indicators */
.focusable:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ✅ GOOD: High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --color-primary: #000000;
    --color-text-primary: #000000;
    --color-background: #ffffff;
  }
}
```

### Responsive Typography
```css
/* ✅ GOOD: Scalable typography */
html {
  font-size: 16px; /* Base font size */
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
  color: var(--color-text-primary);
}

/* ✅ GOOD: Responsive font sizes */
h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.2;
  margin-bottom: 1rem;
}

h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.3;
  margin-bottom: 0.875rem;
}

p {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* ✅ GOOD: Large text for better readability */
.large-text {
  font-size: 1.25rem;
  line-height: 1.4;
}
```

### Motion and Animation
```css
/* ✅ GOOD: Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ✅ GOOD: Safe animations */
.safe-animation {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## 🧪 Testing & Validation

### Automated Testing
```javascript
// ✅ GOOD: Accessibility testing with jest-axe
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ContactForm from './ContactForm';

expect.extend(toHaveNoViolations);

describe('ContactForm Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper form labels', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('should announce validation errors', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
  });
});
```

### Manual Testing Checklist
```markdown
## Manual Accessibility Testing Checklist

### Keyboard Navigation
- [ ] All interactive elements are reachable via Tab key
- [ ] Focus order is logical and intuitive
- [ ] Focus indicators are clearly visible
- [ ] Skip links work properly
- [ ] Modal dialogs trap focus correctly

### Screen Reader Testing
- [ ] All content is announced correctly
- [ ] Form labels are properly associated
- [ ] Error messages are announced
- [ ] Dynamic content updates are announced
- [ ] Decorative images are hidden from screen readers

### Visual Testing
- [ ] Color contrast meets WCAG AA standards
- [ ] Text is readable at 200% zoom
- [ ] Content reflows properly on small screens
- [ ] No information is conveyed by color alone
- [ ] Focus indicators are visible

### Motor Accessibility
- [ ] Click targets are at least 44x44 pixels
- [ ] Sufficient spacing between interactive elements
- [ ] No time limits on user interactions
- [ ] Drag and drop has keyboard alternatives
```

## 🧩 Component Guidelines

### Accessible Button Component
```javascript
// ✅ GOOD: Comprehensive accessible button
import React from 'react';
import PropTypes from 'prop-types';

const AccessibleButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaControls,
  className = '',
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  };
  const sizeClasses = {
    small: 'btn-sm',
    medium: 'btn-md',
    large: 'btn-lg',
  };

  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className="btn-spinner" aria-hidden="true">
          <svg className="animate-spin" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </span>
      )}
      <span className={loading ? 'sr-only' : ''}>
        {children}
      </span>
      {loading && (
        <span className="sr-only">Loading...</span>
      )}
    </button>
  );
};

AccessibleButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ariaLabel: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  ariaExpanded: PropTypes.bool,
  ariaControls: PropTypes.string,
  className: PropTypes.string,
};

export default AccessibleButton;
```

### Accessible Form Component
```javascript
// ✅ GOOD: Accessible form field component
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FormField = ({
  id,
  label,
  type = 'text',
  required = false,
  error,
  helpText,
  value,
  onChange,
  onBlur,
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  const hasError = touched && error;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  const handleBlur = (e) => {
    setTouched(true);
    onBlur?.(e);
  };

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {required && (
          <span className="required-indicator" aria-label="required">
            *
          </span>
        )}
      </label>
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        required={required}
        aria-invalid={hasError}
        aria-describedby={[
          hasError ? errorId : null,
          helpText ? helpId : null,
        ].filter(Boolean).join(' ') || undefined}
        className={`form-input ${hasError ? 'form-input-error' : ''}`}
        {...props}
      />
      
      {helpText && (
        <div id={helpId} className="form-help">
          {helpText}
        </div>
      )}
      
      {hasError && (
        <div 
          id={errorId} 
          className="form-error" 
          role="alert" 
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  helpText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default FormField;
```

## 🔄 Common Patterns

### Accessible Navigation
```javascript
// ✅ GOOD: Accessible navigation component
import React, { useState, useRef, useEffect } from 'react';

const AccessibleNavigation = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => 
            prev < items.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => 
            prev > 0 ? prev - 1 : items.length - 1
          );
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(items.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, items.length]);

  return (
    <nav aria-label="Main navigation">
      <button
        ref={buttonRef}
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls="main-menu"
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
        <span className="nav-toggle-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      <ul
        ref={menuRef}
        id="main-menu"
        className={`nav-menu ${isOpen ? 'nav-menu-open' : ''}`}
        role="menubar"
      >
        {items.map((item, index) => (
          <li key={item.id} role="none">
            <a
              href={item.href}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              aria-current={item.current ? 'page' : undefined}
              className={activeIndex === index ? 'nav-item-active' : ''}
              onFocus={() => setActiveIndex(index)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

### Accessible Data Table
```javascript
// ✅ GOOD: Accessible data table
import React from 'react';

const AccessibleTable = ({ data, columns, caption }) => {
  return (
    <div className="table-container">
      <table className="data-table" role="table">
        <caption className="table-caption">
          {caption}
        </caption>
        <thead>
          <tr role="row">
            {columns.map((column) => (
              <th
                key={column.key}
                role="columnheader"
                scope="col"
                aria-sort={column.sortable ? 'none' : undefined}
              >
                {column.label}
                {column.sortable && (
                  <button
                    className="sort-button"
                    aria-label={`Sort by ${column.label}`}
                    onClick={() => handleSort(column.key)}
                  >
                    <span aria-hidden="true">↕</span>
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id} role="row">
              {columns.map((column, colIndex) => (
                <td
                  key={`${row.id}-${column.key}`}
                  role="cell"
                  aria-rowindex={rowIndex + 2}
                  aria-colindex={colIndex + 1}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

## 🛠️ Resources & Tools

### Testing Tools
- **axe-core**: Automated accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Built-in Chrome accessibility audit
- **NVDA**: Free screen reader for testing
- **VoiceOver**: Built-in macOS screen reader
- **JAWS**: Professional screen reader

### Browser Extensions
- **axe DevTools**: Real-time accessibility testing
- **WAVE**: Visual accessibility feedback
- **Color Contrast Analyzer**: WCAG contrast checking
- **Accessibility Insights**: Comprehensive testing suite

### Development Tools
```json
{
  "devDependencies": {
    "jest-axe": "^7.0.0",
    "@testing-library/jest-axe": "^6.0.0",
    "eslint-plugin-jsx-a11y": "^6.7.0",
    "stylelint-a11y": "^1.2.0"
  }
}
```

### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['jsx-a11y'],
  rules: {
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
  },
};
```

### Continuous Integration
```yaml
# .github/workflows/accessibility.yml
name: Accessibility Testing

on: [push, pull_request]

jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:accessibility
      - run: npm run lighthouse:accessibility
```

---

*This accessibility documentation should be followed for all development activities in the GoldTech Consulting repository. Accessibility is not optional - it's a fundamental requirement for inclusive web development.*

*Last Updated: December 2024*
*Version: 1.0*
