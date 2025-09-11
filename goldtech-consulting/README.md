# GoldTech Consulting Website

## 🎯 Project Overview

A modern, responsive React application showcasing GoldTech Consulting's professional services. Built with performance, accessibility, and user experience as core principles, featuring a serverless backend for contact form processing.

## 🏗️ Website Architecture

### Component Structure
```
src/
├── App.js                    # Main application with navigation logic
├── components/
│   ├── about/               # About section components
│   │   └── About.js
│   ├── contact/             # Contact form and section
│   │   ├── ContactSection.js
│   │   └── ContactSection.test.js
│   ├── footer/              # Site footer
│   │   └── Footer.js
│   ├── hero/                # Hero/landing section
│   │   └── HeroSection.js
│   ├── nav/                 # Navigation components
│   │   ├── Navigation.js
│   │   └── Navigation.test.js
│   ├── projects/            # Portfolio/projects section
│   │   └── ProjectsSection.js
│   ├── services/            # Services showcase
│   │   └── ServicesSection.js
│   └── shared/              # Reusable UI components
│       ├── Button.js
│       ├── Card.js
│       ├── ErrorBoundary.js
│       ├── LoadingSpinner.js
│       ├── Logo.js
│       └── SectionHeader.js
├── hooks/                   # Custom React hooks
│   ├── useApi.js
│   └── useErrorHandler.js
└── types/                   # TypeScript definitions (future)
```

### Design System
- **Colors**: Custom gold (#ffc300), navy (#1a1a2e), and light gray (#f8f9fa) palette
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent Tailwind spacing scale
- **Components**: Modular, reusable UI components
- **Responsive**: Mobile-first design approach

## 🚀 Development Commands

### Essential Commands
```bash
# Start development server
npm start
# Opens http://localhost:3000

# Run test suite
npm test
# Runs Jest tests in watch mode

# Run tests with coverage
npm run test:coverage
# Generates coverage report

# Run tests for CI
npm run test:ci
# Runs tests without watch mode for CI/CD

# Build for production
npm run build
# Creates optimized build in /build directory

# Build Tailwind CSS
npm run build:tailwind
# Compiles Tailwind styles to index.css
```

### Code Quality Commands
```bash
# Lint code and auto-fix
npm run lint
# Runs ESLint with auto-fix

# Check linting without fixing
npm run lint:check
# Shows linting errors without fixing

# Format code with Prettier
npm run format
# Formats all code files

# Check formatting without fixing
npm run format:check
# Shows formatting issues without fixing
```

### Development Workflow
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Run tests in another terminal
npm test

# 4. Before committing, run quality checks
npm run lint
npm run format
npm run test:ci
npm run build
```

## 🎨 Styling & Design

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#ffc300',        // Primary brand color
        goldLight: '#ffde59',   // Light gold variant
        navy: '#1a1a2e',        // Dark navy for text
        lightGray: '#f8f9fa',   // Light background
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(255, 195, 0, 0.3)',
        'gold-lg': '0 10px 25px 0 rgba(255, 195, 0, 0.4)',
      },
    },
  },
}
```

### CSS Architecture
- **Global Styles**: `src/index.css` - Base styles and Tailwind imports
- **Component Styles**: `src/App.css` - App-specific styles
- **Utility Classes**: Tailwind CSS for consistent spacing and layout
- **Custom Classes**: Extended Tailwind theme for brand colors

### Responsive Design
- **Mobile First**: Base styles for mobile devices
- **Breakpoints**: 
  - `sm`: 640px and up
  - `md`: 768px and up
  - `lg`: 1024px and up
  - `xl`: 1280px and up

## 🧪 Testing Strategy

### Test Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

### Testing Commands
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests for CI (no watch mode)
npm run test:ci

# Run specific test file
npm test -- ContactSection.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should render"
```

### Test Structure
- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **Accessibility Tests**: WCAG compliance testing with jest-axe
- **Snapshot Tests**: UI regression testing

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: Meets WCAG contrast requirements
- **Focus Management**: Visible focus indicators

### Accessibility Testing
```bash
# Install accessibility testing tools
npm install --save-dev jest-axe

# Run accessibility tests
npm test -- --testNamePattern="accessibility"
```

### Key Accessibility Features
- **Skip Links**: Jump to main content
- **ARIA Labels**: Descriptive labels for screen readers
- **Focus Management**: Proper focus handling in navigation
- **Color Independence**: Information not conveyed by color alone
- **Responsive Design**: Works on all device sizes

## 🔧 Component Development

### Component Structure
```javascript
// Example component structure
import React from 'react';
import PropTypes from 'prop-types';

/**
 * ComponentName - Brief description
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div className="component-wrapper">
      {/* Component content */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

### Shared Components
- **Button**: Consistent button styling and behavior
- **Card**: Reusable card component for content sections
- **ErrorBoundary**: Error handling for React components
- **LoadingSpinner**: Loading state indicator
- **Logo**: Brand logo component
- **SectionHeader**: Consistent section headers

### Custom Hooks
- **useApi**: API request handling with error management
- **useErrorHandler**: Centralized error handling logic

## 🚀 Deployment

### Build Process
```bash
# 1. Install dependencies
npm install

# 2. Run tests
npm run test:ci

# 3. Build Tailwind CSS
npm run build:tailwind

# 4. Build React app
npm run build

# 5. Deploy to AWS Amplify (automatic)
```

### Build Output
```
build/
├── static/
│   ├── css/
│   │   └── main.[hash].css
│   ├── js/
│   │   ├── main.[hash].js
│   │   └── main.[hash].js.map
│   └── media/
│       └── [optimized images]
├── index.html
├── manifest.json
└── robots.txt
```

### Environment Variables
```bash
# Development
REACT_APP_API_ENDPOINT=http://localhost:3001/api

# Production
REACT_APP_API_ENDPOINT=https://api.goldtech-consulting.com
REACT_APP_ENVIRONMENT=production
```

## 🔍 Debugging & Development Tools

### Browser DevTools
- **React DevTools**: Component inspection and debugging
- **Lighthouse**: Performance and accessibility auditing

### VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Tailwind CSS IntelliSense**
- **Auto Rename Tag**

### Debugging Commands
```bash
# Start with debugging enabled
npm start

# Run tests with verbose output
npm test -- --verbose

# Check for unused dependencies
npx depcheck

# Analyze bundle size
npm run build && npx webpack-bundle-analyzer build/static/js/*.js
```

## 📚 Documentation

### Component Documentation
- **JSDoc Comments**: All components have comprehensive documentation
- **PropTypes**: Type checking for component props
- **README Files**: Component-specific documentation

### Code Standards
- **ESLint Configuration**: Enforced code quality rules
- **Prettier Configuration**: Consistent code formatting
- **Git Hooks**: Pre-commit quality checks

### Available Documentation
- **Architecture**: `../docs/architecture.md`
- **Style Guide**: `../docs/style-guide.md`
- **Testing**: `../docs/testing.md`
- **Accessibility**: `../docs/accessibility.md`
- **Commit Messages**: `../docs/commit-messages.md`

## 🐛 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Test Failures
```bash
# Clear Jest cache
npm test -- --clearCache
npm test
```

#### Styling Issues
```bash
# Rebuild Tailwind CSS
npm run build:tailwind
```

#### Development Server Issues
```bash
# Clear React cache
rm -rf node_modules/.cache
npm start
```

## 🔄 Git Workflow

### Branch Naming
- `feature/component-name` - New features
- `bugfix/issue-description` - Bug fixes
- `hotfix/critical-issue` - Critical fixes
- `docs/documentation-update` - Documentation changes

### Commit Messages
```bash
# Feature
feat: add contact form validation

# Bug fix
fix: resolve mobile navigation issue

# Documentation
docs: update component documentation

# Style
style: format code with prettier

# Test
test: add unit tests for contact form
```

### Pre-commit Checklist
- [ ] All tests pass (`npm run test:ci`)
- [ ] Code is linted (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Build succeeds (`npm run build`)
- [ ] Accessibility tests pass
- [ ] No console.log statements in production code

## 📞 Support

### Development Support
- **Documentation**: Check `../docs/` directory
- **Issues**: Create GitHub issues for bugs
- **Code Review**: All changes require peer review

### Technical Resources
- **React Documentation**: https://reactjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Jest Testing**: https://jestjs.io/docs/getting-started
- **Accessibility**: https://webaim.org/

---

## 📋 Quick Reference

### Daily Commands
```bash
npm start              # Start development
npm test              # Run tests
npm run build         # Build for production
npm run lint          # Check code quality
npm run format        # Format code
```

### File Locations
- **Main App**: `src/App.js`
- **Components**: `src/components/`
- **Styles**: `src/index.css`, `src/App.css`
- **Tests**: `src/**/*.test.js`
- **Configuration**: `package.json`, `tailwind.config.js`

### Key URLs
- **Local Development**: http://localhost:3000
- **Production Site**: https://goldtech-consulting.com
- **AWS Amplify**: https://console.aws.amazon.com/amplify

---

*Last Updated: December 2024*  
*Version: 1.0*  
*Framework: React 18.2.0*
