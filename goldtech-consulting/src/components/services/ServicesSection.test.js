import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ServicesSection from './ServicesSection';

expect.extend(toHaveNoViolations);

// Mock the SectionHeader component to avoid Framer Motion issues
jest.mock('../shared/SectionHeader', () => {
  return function MockSectionHeader({ eyebrow, title, subtitle }) {
    return (
      <div data-testid="section-header">
        <div data-testid="eyebrow">{eyebrow}</div>
        <h2 data-testid="title">{title}</h2>
        {subtitle && <p data-testid="subtitle">{subtitle}</p>}
      </div>
    );
  };
});

// Mock Framer Motion components
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
  },
}));

describe('ServicesSection', () => {
  it('renders services section with all content', () => {
    render(<ServicesSection />);
    
    // Check section element
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveAttribute('id', 'services');
    
    // Check section header
    expect(screen.getByTestId('section-header')).toBeInTheDocument();
    expect(screen.getByTestId('eyebrow')).toHaveTextContent('What we do');
    expect(screen.getByTestId('title')).toHaveTextContent('Our Services');
    expect(screen.getByTestId('subtitle')).toHaveTextContent(/Modular offerings that can be engaged/);
  });

  it('displays all four service cards', () => {
    render(<ServicesSection />);
    
    const serviceTitles = [
      'Custom Software Development',
      'Tech Consultation & Strategy',
      'IoT Implementation, Integration, & Optimization',
      'Project Management & Automation'
    ];
    
    serviceTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('displays service descriptions', () => {
    render(<ServicesSection />);
    
    const descriptions = [
      'Tailor-made, scalable, and robust solutions for startups and enterprises.',
      'Technology-driven strategies that give your business a competitive edge.',
      'Seamless Internet of Things implementations and streamlined operations across your stack.',
      'Engineering focused project management and automation, performance monitoring, and release readiness.'
    ];
    
    descriptions.forEach(desc => {
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });

  it('displays service icons', () => {
    render(<ServicesSection />);
    
    // Check that icons are present (they should be rendered as SVG elements)
    const icons = screen.getAllByRole('img', { hidden: true });
    expect(icons).toHaveLength(4);
  });

  it('has proper heading structure for service cards', () => {
    render(<ServicesSection />);
    
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(4);
    
    const serviceTitles = [
      'Custom Software Development',
      'Tech Consultation & Strategy',
      'IoT Implementation, Integration, & Optimization',
      'Project Management & Automation'
    ];
    
    serviceTitles.forEach(title => {
      const heading = screen.getByRole('heading', { name: title });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });
  });

  it('has proper CSS classes for styling', () => {
    render(<ServicesSection />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass('py-20', 'bg-lightGray');
    
    // Check service cards have proper classes
    const serviceCards = screen.getAllByText(/Custom Software Development|Tech Consultation|IoT Implementation|Project Management/);
    serviceCards.forEach(card => {
      const cardElement = card.closest('div');
      expect(cardElement).toHaveClass('bg-white', 'rounded-xl', 'p-6', 'shadow-sm', 'border', 'border-gray-100');
    });
  });

  it('has proper semantic structure', () => {
    render(<ServicesSection />);
    
    // Check section role
    expect(screen.getByRole('region')).toBeInTheDocument();
    
    // Check heading structure
    expect(screen.getByTestId('title')).toBeInTheDocument();
    
    // Check service cards are properly structured
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(4);
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<ServicesSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('matches snapshot', () => {
    const { container } = render(<ServicesSection />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
