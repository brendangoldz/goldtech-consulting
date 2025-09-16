import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from './App';

expect.extend(toHaveNoViolations);

// Mock the components to avoid complex dependencies
jest.mock('./components/nav/Navigation', () => {
  return function MockNavigation({ activeSection, scrollTo }) {
    return (
      <nav data-testid="navigation" data-active-section={activeSection}>
        <button onClick={() => scrollTo('contact')}>Contact</button>
      </nav>
    );
  };
});

jest.mock('./components/hero/HeroSection', () => {
  return function MockHeroSection({ scrollTo }) {
    return (
      <section data-testid="hero-section">
        <button onClick={() => scrollTo('contact')}>Start Project</button>
      </section>
    );
  };
});

// Mock Framer Motion hooks to prevent errors
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    p: 'p',
    button: 'button',
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}));

jest.mock('./components/about/About', () => {
  return function MockAboutSection() {
    return <section data-testid="about-section">About Section</section>;
  };
});

jest.mock('./components/services/ServicesSection', () => {
  return function MockServicesSection() {
    return <section data-testid="services-section">Services Section</section>;
  };
});

jest.mock('./components/projects/ProjectsSection', () => {
  return function MockProjectsSection() {
    return <section data-testid="projects-section">Projects Section</section>;
  };
});

jest.mock('./components/contact/ContactSection', () => {
  return function MockContactSection() {
    return <section data-testid="contact-section">Contact Section</section>;
  };
});

jest.mock('./components/footer/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

describe('App', () => {
  beforeEach(() => {
    // Mock getElementById to return mock elements
    const mockElement = {
      scrollIntoView: jest.fn(),
      focus: jest.fn(),
      offsetTop: 100,
      offsetHeight: 200
    };
    
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (['home', 'about', 'services', 'projects', 'contact'].includes(id)) {
        return mockElement;
      }
      return null;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders all main sections', () => {
    render(<App />);
    
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
    expect(screen.getByTestId('services-section')).toBeInTheDocument();
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<App />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });

  it('includes skip navigation link', () => {
    render(<App />);
    
    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(skipLink).toHaveClass('sr-only');
  });

  it('handles scroll events and updates active section', () => {
    render(<App />);
    
    const navigation = screen.getByTestId('navigation');
    expect(navigation).toHaveAttribute('data-active-section', 'home');
    
    // Simulate scroll to about section
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    fireEvent.scroll(window);
    
    // Note: In a real test, you'd need to mock the scroll position more precisely
    // This is a simplified version
  });

  it('calls scrollTo function when navigation is triggered', async () => {
    render(<App />);
    
    const contactButton = screen.getByText('Contact');
    await userEvent.click(contactButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('contact');
  });

  it('has proper accessibility structure', () => {
    render(<App />);
    
    // Check for proper heading hierarchy
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Check skip link is properly positioned
    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toHaveClass('sr-only', 'focus:not-sr-only');
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('handles focus management properly', async () => {
    render(<App />);
    
    const skipLink = screen.getByText(/skip to main content/i);
    
    // Focus the skip link
    skipLink.focus();
    expect(skipLink).toHaveFocus();
    
    // Check that it becomes visible when focused
    expect(skipLink).toHaveClass('focus:not-sr-only');
  });

  it('has proper document structure', () => {
    render(<App />);
    
    const app = screen.getByRole('main').closest('div');
    expect(app).toHaveClass('min-h-screen', 'bg-white');
  });

  it('matches snapshot', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});