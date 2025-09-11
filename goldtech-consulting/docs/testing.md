# GoldTech Consulting - Testing Documentation

## 📋 Table of Contents
1. [Testing Philosophy](#testing-philosophy)
2. [Testing Stack](#testing-stack)
3. [Unit Testing](#unit-testing)
4. [Integration Testing](#integration-testing)
5. [AWS Lambda Testing](#aws-lambda-testing)
6. [End-to-End Testing](#end-to-end-testing)
7. [Testing Utilities](#testing-utilities)
8. [Mocking Strategies](#mocking-strategies)
9. [Test Coverage](#test-coverage)
10. [CI/CD Testing](#cicd-testing)

## 🎯 Testing Philosophy

### Testing Pyramid
```
        /\
       /  \
      / E2E \     <- Few, high-level tests
     /______\
    /        \
   /Integration\  <- Some, medium-level tests
  /____________\
 /              \
/    Unit Tests   \  <- Many, low-level tests
/__________________\
```

### Testing Principles
- **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
- **AAA Pattern**: Arrange, Act, Assert
- **Single Responsibility**: Each test should verify one specific behavior
- **Independent Tests**: Tests should not depend on each other
- **Fast Feedback**: Unit tests should run quickly (< 100ms each)
- **Reliable**: Tests should be deterministic and not flaky

## 🛠️ Testing Stack

### Core Testing Tools
```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "msw": "^2.0.0",
    "aws-sdk-client-mock": "^3.0.0"
  }
}
```

### Testing Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/setupTests.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx}',
  ],
};
```

## 🧪 Unit Testing

### Component Testing
```javascript
// ContactForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    onSubmit: mockOnSubmit,
    isLoading: false,
    errorMessage: '',
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields', () => {
    render(<ContactForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...defaultProps} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...defaultProps} />);
    
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test message.',
    };
    
    await user.type(screen.getByLabelText(/name/i), formData.name);
    await user.type(screen.getByLabelText(/email/i), formData.email);
    await user.type(screen.getByLabelText(/message/i), formData.message);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith(formData);
  });

  it('shows loading state', () => {
    render(<ContactForm {...defaultProps} isLoading={true} />);
    
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  });

  it('displays error message', () => {
    const errorMessage = 'Failed to send message';
    render(<ContactForm {...defaultProps} errorMessage={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<ContactForm {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

### Hook Testing
```javascript
// useApiData.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { useApiData } from './useApiData';

// Mock fetch
global.fetch = jest.fn();

describe('useApiData', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test User' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useApiData('/api/users/1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useApiData('/api/users/1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Network error');
  });

  it('handles HTTP errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useApiData('/api/users/1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('HTTP error! status: 404');
  });
});
```

### Utility Function Testing
```javascript
// dateUtils.test.js
import { formatDate, isValidDate, getRelativeTime } from './dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      expect(formatDate(date)).toBe('January 15, 2024');
    });

    it('handles invalid dates', () => {
      expect(formatDate('invalid')).toBe('Invalid Date');
    });
  });

  describe('isValidDate', () => {
    it('validates correct dates', () => {
      expect(isValidDate(new Date())).toBe(true);
      expect(isValidDate('2024-01-15')).toBe(true);
    });

    it('rejects invalid dates', () => {
      expect(isValidDate('invalid')).toBe(false);
      expect(isValidDate(null)).toBe(false);
      expect(isValidDate(undefined)).toBe(false);
    });
  });

  describe('getRelativeTime', () => {
    it('returns correct relative time', () => {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      
      expect(getRelativeTime(oneHourAgo)).toBe('1 hour ago');
    });
  });
});
```

## 🔗 Integration Testing

### API Integration Testing
```javascript
// ContactService.test.js
import ContactService from './ContactService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios;

describe('ContactService', () => {
  beforeEach(() => {
    mockedAxios.post.mockClear();
  });

  it('submits contact form successfully', async () => {
    const formData = {
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test Message',
    };

    const mockResponse = {
      data: { message: 'Email sent successfully' },
      status: 200,
    };

    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const result = await ContactService.submitContactForm(formData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/contact'),
      formData,
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      })
    );

    expect(result).toEqual(mockResponse.data);
  });

  it('handles network errors', async () => {
    const formData = {
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test Message',
    };

    mockedAxios.post.mockRejectedValueOnce({
      request: {},
    });

    await expect(ContactService.submitContactForm(formData))
      .rejects.toThrow('Network error: Unable to connect to server');
  });

  it('handles server errors', async () => {
    const formData = {
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test Message',
    };

    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: { error: 'Server error' },
        status: 500,
      },
    });

    await expect(ContactService.submitContactForm(formData))
      .rejects.toThrow('Server error');
  });
});
```

### Component Integration Testing
```javascript
// ContactSection.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactSection from './ContactSection';
import ContactService from '../services/ContactService';

jest.mock('../services/ContactService');
const mockedContactService = ContactService;

describe('ContactSection Integration', () => {
  beforeEach(() => {
    mockedContactService.submitContactForm.mockClear();
  });

  it('submits form and shows success message', async () => {
    const user = userEvent.setup();
    
    mockedContactService.submitContactForm.mockResolvedValueOnce({
      message: 'Email sent successfully',
    });

    render(<ContactSection />);

    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is a test.');

    // Submit form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/email sent successfully/i)).toBeInTheDocument();
    });

    expect(mockedContactService.submitContactForm).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test.',
    });
  });

  it('handles form submission errors', async () => {
    const user = userEvent.setup();
    
    mockedContactService.submitContactForm.mockRejectedValueOnce(
      new Error('Network error')
    );

    render(<ContactSection />);

    // Fill out and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is a test.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
});
```

## ☁️ AWS Lambda Testing

### Lambda Function Testing
```javascript
// ContactForm.test.js (Lambda function)
import { handler } from '../ContactForm.mjs';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { mockClient } from 'aws-sdk-client-mock';

const sesMock = mockClient(SESClient);

describe('ContactForm Lambda Handler', () => {
  beforeEach(() => {
    sesMock.reset();
    process.env.SES_FROM_EMAIL = 'test@example.com';
    process.env.SES_TO_EMAIL = 'admin@example.com';
    process.env.ALLOWED_ORIGIN = 'https://goldtech-consulting.com';
  });

  it('sends email successfully', async () => {
    const event = {
      body: JSON.stringify({
        email: 'user@example.com',
        subject: 'Test Subject',
        message: 'Test Message',
      }),
    };

    sesMock.on(SendEmailCommand).resolves({
      MessageId: 'test-message-id',
    });

    const result = await handler(event, {});

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: 'Email sent successfully',
      timestamp: expect.any(String),
    });

    expect(sesMock.commandCalls(SendEmailCommand)).toHaveLength(1);
  });

  it('validates required fields', async () => {
    const event = {
      body: JSON.stringify({
        email: 'user@example.com',
        // Missing subject and message
      }),
    };

    const result = await handler(event, {});

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      error: 'Missing required fields: email, subject, message',
    });
  });

  it('validates email format', async () => {
    const event = {
      body: JSON.stringify({
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'Test Message',
      }),
    };

    const result = await handler(event, {});

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      error: 'Invalid email format',
    });
  });

  it('handles SES errors', async () => {
    const event = {
      body: JSON.stringify({
        email: 'user@example.com',
        subject: 'Test Subject',
        message: 'Test Message',
      }),
    };

    sesMock.on(SendEmailCommand).rejects(new Error('SES error'));

    const result = await handler(event, {});

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      error: 'Failed to send email',
    });
  });

  it('handles invalid JSON', async () => {
    const event = {
      body: 'invalid json',
    };

    const result = await handler(event, {});

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      error: 'Invalid JSON in request body',
    });
  });
});
```

### Local Lambda Testing
```javascript
// lambda-local-test.js
import { handler } from './ContactForm.mjs';

// Mock environment variables
process.env.AWS_REGION = 'us-east-2';
process.env.SES_FROM_EMAIL = 'test@example.com';
process.env.SES_TO_EMAIL = 'admin@example.com';

// Test locally
const testEvent = {
  body: JSON.stringify({
    email: 'test@example.com',
    subject: 'Local Test',
    message: 'This is a local test message.',
  }),
};

const testContext = {
  functionName: 'ContactForm',
  functionVersion: '$LATEST',
  invokedFunctionArn: 'arn:aws:lambda:us-east-2:123456789012:function:ContactForm',
  memoryLimitInMB: '256',
  awsRequestId: 'test-request-id',
};

handler(testEvent, testContext)
  .then(result => {
    console.log('Test result:', result);
  })
  .catch(error => {
    console.error('Test error:', error);
  });
```

## 🎭 End-to-End Testing

### Cypress Configuration
```javascript
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
  },
});
```

### E2E Test Example
```javascript
// contact-form.cy.js
describe('Contact Form E2E', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="contact-section"]').scrollIntoView();
  });

  it('submits contact form successfully', () => {
    // Fill out form
    cy.get('[data-testid="contact-name"]').type('John Doe');
    cy.get('[data-testid="contact-email"]').type('john@example.com');
    cy.get('[data-testid="contact-message"]').type('Hello, this is a test message.');

    // Submit form
    cy.get('[data-testid="contact-submit"]').click();

    // Verify success message
    cy.get('[data-testid="contact-success"]')
      .should('be.visible')
      .and('contain.text', 'Message sent successfully');

    // Verify form is reset
    cy.get('[data-testid="contact-name"]').should('have.value', '');
    cy.get('[data-testid="contact-email"]').should('have.value', '');
    cy.get('[data-testid="contact-message"]').should('have.value', '');
  });

  it('validates required fields', () => {
    // Try to submit empty form
    cy.get('[data-testid="contact-submit"]').click();

    // Verify validation messages
    cy.get('[data-testid="contact-name-error"]')
      .should('be.visible')
      .and('contain.text', 'Name is required');
    
    cy.get('[data-testid="contact-email-error"]')
      .should('be.visible')
      .and('contain.text', 'Email is required');
    
    cy.get('[data-testid="contact-message-error"]')
      .should('be.visible')
      .and('contain.text', 'Message is required');
  });

  it('validates email format', () => {
    cy.get('[data-testid="contact-email"]').type('invalid-email');
    cy.get('[data-testid="contact-submit"]').click();

    cy.get('[data-testid="contact-email-error"]')
      .should('be.visible')
      .and('contain.text', 'Please enter a valid email address');
  });

  it('handles network errors gracefully', () => {
    // Mock network failure
    cy.intercept('POST', '/api/contact', { forceNetworkError: true });

    cy.get('[data-testid="contact-name"]').type('John Doe');
    cy.get('[data-testid="contact-email"]').type('john@example.com');
    cy.get('[data-testid="contact-message"]').type('Test message');
    cy.get('[data-testid="contact-submit"]').click();

    cy.get('[data-testid="contact-error"]')
      .should('be.visible')
      .and('contain.text', 'Network error');
  });
});
```

## 🛠️ Testing Utilities

### Custom Render Function
```javascript
// test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Test Data Factories
```javascript
// test-data-factories.js
export const createUser = (overrides = {}) => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

export const createContactFormData = (overrides = {}) => ({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Test Subject',
  message: 'Test message content',
  ...overrides,
});

export const createApiResponse = (data, overrides = {}) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  ...overrides,
});
```

### Mock Service Worker Setup
```javascript
// mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/contact', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Email sent successfully',
        timestamp: new Date().toISOString(),
      })
    );
  }),

  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id,
        name: 'John Doe',
        email: 'john@example.com',
      })
    );
  }),
];
```

## 🎭 Mocking Strategies

### AWS SDK Mocking
```javascript
// aws-mocks.js
import { mockClient } from 'aws-sdk-client-mock';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export const sesMock = mockClient(SESClient);

export const setupSESMock = () => {
  sesMock.on(SendEmailCommand).resolves({
    MessageId: 'test-message-id',
  });
};

export const setupSESErrorMock = (error) => {
  sesMock.on(SendEmailCommand).rejects(error);
};
```

### API Mocking
```javascript
// api-mocks.js
import { rest } from 'msw';

export const createContactSuccessHandler = () =>
  rest.post('/api/contact', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Email sent successfully' })
    );
  });

export const createContactErrorHandler = (status = 500, message = 'Server error') =>
  rest.post('/api/contact', (req, res, ctx) => {
    return res(
      ctx.status(status),
      ctx.json({ error: message })
    );
  });
```

## 📊 Test Coverage

### Coverage Configuration
```javascript
// jest.config.js - Coverage section
collectCoverageFrom: [
  'src/**/*.{js,jsx}',
  '!src/index.js',
  '!src/reportWebVitals.js',
  '!src/setupTests.js',
  '!src/**/*.test.{js,jsx}',
  '!src/**/*.spec.{js,jsx}',
],
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
  './src/components/': {
    branches: 90,
    functions: 90,
    lines: 90,
    statements: 90,
  },
},
coverageReporters: ['text', 'lcov', 'html'],
```

### Coverage Commands
```json
{
  "scripts": {
    "test": "react-scripts test",
    "test:coverage": "react-scripts test --coverage --watchAll=false",
    "test:ci": "react-scripts test --coverage --watchAll=false --ci",
    "test:lambda": "jest --testPathPattern=ContactForm.test.js"
  }
}
```

## 🚀 CI/CD Testing

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
        cache-dependency-path: goldtech-consulting/package-lock.json
    
    - name: Install dependencies
      run: |
        cd goldtech-consulting
        npm ci
    
    - name: Run linter
      run: |
        cd goldtech-consulting
        npm run lint
    
    - name: Run tests
      run: |
        cd goldtech-consulting
        npm run test:ci
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: goldtech-consulting/coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
    
    - name: Run E2E tests
      run: |
        cd goldtech-consulting
        npm run cypress:run
      env:
        CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test:ci"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --bail --findRelatedTests"
    ]
  }
}
```

## 📝 Testing Best Practices

### Do's
- ✅ Write tests before implementing features (TDD)
- ✅ Test user interactions, not implementation details
- ✅ Use descriptive test names that explain the behavior
- ✅ Keep tests simple and focused on one behavior
- ✅ Mock external dependencies and APIs
- ✅ Test error conditions and edge cases
- ✅ Use data-testid attributes for reliable element selection
- ✅ Clean up after tests (reset mocks, clear state)

### Don'ts
- ❌ Test implementation details (internal state, method calls)
- ❌ Write tests that depend on other tests
- ❌ Use brittle selectors (CSS classes, complex XPath)
- ❌ Test third-party library functionality
- ❌ Ignore flaky tests
- ❌ Write tests that are too complex
- ❌ Skip testing error conditions
- ❌ Commit code without tests

---

*This testing documentation should be followed for all testing activities in the GoldTech Consulting repository. For questions or clarifications, please refer to the team lead or create an issue in the repository.*

*Last Updated: December 2024*
*Version: 1.0*
