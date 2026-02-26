// Mock Sanity client so tests don't load @sanity/client/csm; fetch rejects to trigger static fallback in loaders
jest.mock('@sanity/client', () => ({
  createClient: () => ({
    fetch: jest.fn().mockRejectedValue(new Error('Sanity mocked in tests'))
  })
}));

// Mock Framer Motion before any other imports
jest.mock('framer-motion', () => {
  const React = require('react');
  
  const createMotionComponent = (Component) => {
    return React.forwardRef((props, ref) => {
      const { 
        initial, 
        animate, 
        exit, 
        transition, 
        variants, 
        whileHover, 
        whileInView, 
        viewport, 
        layoutId,
        ...restProps 
      } = props;
      
      return React.createElement(Component, { ...restProps, ref });
    });
  };

  return {
    motion: {
      div: createMotionComponent('div'),
      nav: createMotionComponent('nav'),
      button: createMotionComponent('button'),
      section: createMotionComponent('section'),
      h1: createMotionComponent('h1'),
      h2: createMotionComponent('h2'),
      h3: createMotionComponent('h3'),
      p: createMotionComponent('p'),
      span: createMotionComponent('span'),
      img: createMotionComponent('img'),
      a: createMotionComponent('a'),
      header: createMotionComponent('header'),
      form: createMotionComponent('form'),
      fieldset: createMotionComponent('fieldset'),
      input: createMotionComponent('input'),
      textarea: createMotionComponent('textarea'),
    },
    AnimatePresence: ({ children }) => children,
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      set: jest.fn(),
    }),
    useInView: () => false,
    useReducedMotion: () => false,
  };
});

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Extend Jest matchers for accessibility testing
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver for components that use it
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});


// Mock scrollTo for smooth scrolling
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

// Mock getBoundingClientRect for element positioning
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 120,
  height: 120,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
}));
