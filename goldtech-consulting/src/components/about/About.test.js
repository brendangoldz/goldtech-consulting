import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import AboutSection from './About';
import { ContentContextProvider } from '../../contexts/ContentContext';
import { contentConfig } from '../../config/content';

expect.extend(toHaveNoViolations);

const contentWrapper = ({ children }) => (
  <ContentContextProvider value={{ content: contentConfig, contentReady: true }}>
    {children}
  </ContentContextProvider>
);

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
    p: 'p',
    ul: 'ul',
    li: 'li',
  },
}));

describe('AboutSection', () => {
  it('renders about section with all content', () => {
    render(<AboutSection />, { wrapper: contentWrapper });
    
    // Check section element
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'about');
    
    // Check section header
    expect(screen.getByTestId('section-header')).toBeInTheDocument();
    expect(screen.getByTestId('eyebrow')).toHaveTextContent('Who we are');
    expect(screen.getByTestId('title')).toHaveTextContent('About GoldTech Consulting');
    expect(screen.getByTestId('subtitle')).toHaveTextContent(/We harness the power of technology/);
  });

  it('displays the main description paragraph', () => {
    render(<AboutSection />, { wrapper: contentWrapper });
    
    const description = screen.getByText(/From cloud solutions and QA automation/);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-gray-700', 'leading-relaxed');
  });

  it('displays the feature list with checkmarks', () => {
    render(<AboutSection />, { wrapper: contentWrapper });
    
    const features = [
      'Cloud-first architecture & DevOps',
      'Accessible, responsive UI/UX',
      'Integration with your existing stack',
      'Measurable impact and clear reporting'
    ];
    
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
    
    // Check that the list is properly structured
    const featureList = screen.getByRole('list');
    expect(featureList).toBeInTheDocument();
    expect(featureList).toHaveClass('mt-6', 'space-y-3');
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  it('displays technology tags', () => {
    render(<AboutSection />, { wrapper: contentWrapper });
    
    const technologies = ['React', 'Node', 'AWS', 'PostgreSQL', 'CICD'];
    
    technologies.forEach(tech => {
      const tag = screen.getByText(tech);
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveClass('px-3', 'py-1', 'rounded-full', 'bg-lightGray', 'text-navy', 'text-sm');
    });
  });

  it('displays the profile image with proper attributes', () => {
    render(<AboutSection />, { wrapper: contentWrapper });
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/at_desk_smirk.JPG');
    expect(image).toHaveAttribute('alt', 'Brendan at his desk working on software development');
    expect(image).toHaveClass('w-full', 'h-full', 'object-cover', 'rounded-xl');
  });

  it('has proper CSS classes for styling', () => {
    render(<AboutSection />, { wrapper: contentWrapper });
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass('py-20', 'bg-white');
    
    const image = screen.getByRole('img');
    const imageContainer = image.closest('div');
    expect(imageContainer).toHaveClass('bg-lightGray/70', 'rounded-2xl', 'border', 'flex', 'items-center', 'justify-center', 'overflow-hidden');
  });

  it('has proper semantic structure', () => {
    render(<AboutSection />, { wrapper: contentWrapper });
    
    // Check section role
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    
    // Check heading structure
    expect(screen.getByTestId('title')).toBeInTheDocument();
    
    // Check list structure
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    
    // Check image
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<AboutSection />, { wrapper: contentWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('matches snapshot', () => {
    const { container } = render(<AboutSection />, { wrapper: contentWrapper });
    expect(container.firstChild).toMatchSnapshot();
  });
});
