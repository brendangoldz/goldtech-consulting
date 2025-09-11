import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

/**
 * Custom render function that includes common providers
 * 
 * @param {React.ReactElement} ui - The component to render
 * @param {Object} options - Render options
 * @returns {Object} Render result with additional utilities
 */
const customRender = (ui, options = {}) => {
  const AllTheProviders = ({ children }) => {
    return <>{children}</>;
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

/**
 * Test data factories for creating consistent test data
 */
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

/**
 * Accessibility testing utilities
 */
export const testAccessibility = async (container) => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

/**
 * Mock IntersectionObserver for components that use it
 */
export const mockIntersectionObserver = () => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };
};

/**
 * Mock ResizeObserver for components that use it
 */
export const mockResizeObserver = () => {
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };
};

/**
 * Mock matchMedia for responsive components
 */
export const mockMatchMedia = (matches = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

/**
 * Mock scrollTo for smooth scrolling
 */
export const mockScrollTo = () => {
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn(),
  });
};

/**
 * Mock getBoundingClientRect for element positioning
 */
export const mockGetBoundingClientRect = (rect = {}) => {
  const defaultRect = {
    width: 120,
    height: 120,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    ...rect,
  };

  Element.prototype.getBoundingClientRect = jest.fn(() => defaultRect);
};

/**
 * Wait for async operations to complete
 */
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

/**
 * Create a mock function with default implementation
 */
export const createMockFunction = (defaultReturn = undefined) => {
  const mockFn = jest.fn();
  if (defaultReturn !== undefined) {
    mockFn.mockReturnValue(defaultReturn);
  }
  return mockFn;
};

/**
 * Setup common mocks for testing
 */
export const setupCommonMocks = () => {
  mockIntersectionObserver();
  mockResizeObserver();
  mockMatchMedia();
  mockScrollTo();
  mockGetBoundingClientRect();
};

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Override the render function
export { customRender as render };
