import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProjectsSection from './ProjectsSection';

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
    article: 'article',
  },
}));

describe('ProjectsSection', () => {
  it('renders projects section with all content', () => {
    render(<ProjectsSection />);
    
    // Check section element
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveAttribute('id', 'projects');
    
    // Check section header
    expect(screen.getByTestId('section-header')).toBeInTheDocument();
    expect(screen.getByTestId('eyebrow')).toHaveTextContent('Proof');
    expect(screen.getByTestId('title')).toHaveTextContent('Case Studies');
    expect(screen.getByTestId('subtitle')).toHaveTextContent(/A peek at how we turn requirements/);
  });

  it('displays the project case study', () => {
    render(<ProjectsSection />);
    
    const projectTitle = '100+ Websites Delivered for Entrepreneurs & Businesses';
    const projectSummary = 'Designed and developed modern Wix websites with custom branding, optimized layouts, and scalable templates. Streamlined delivery process reduced turnaround time and enabled consistent, premium-quality results across industries.';
    
    expect(screen.getByText(projectTitle)).toBeInTheDocument();
    expect(screen.getByText(projectSummary)).toBeInTheDocument();
  });

  it('displays the coming soon button', () => {
    render(<ProjectsSection />);
    
    const comingSoonButton = screen.getByRole('button', { name: /coming soon/i });
    expect(comingSoonButton).toBeInTheDocument();
    expect(comingSoonButton).toHaveTextContent('Coming Soon');
  });

  it('has proper heading structure for project cards', () => {
    render(<ProjectsSection />);
    
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(1);
    
    const projectHeading = screen.getByRole('heading', { name: /100\+ Websites Delivered/ });
    expect(projectHeading).toBeInTheDocument();
    expect(projectHeading.tagName).toBe('H3');
  });

  it('has proper CSS classes for styling', () => {
    render(<ProjectsSection />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass('py-20', 'bg-white');
    
    // Check project card has proper classes
    const projectCard = screen.getByText(/100\+ Websites Delivered/).closest('article');
    expect(projectCard).toHaveClass('bg-lightGray/60', 'rounded-xl', 'p-6', 'border', 'border-gray-200');
    
    // Check button has proper classes
    const button = screen.getByRole('button', { name: /coming soon/i });
    expect(button).toHaveClass('text-navy', 'font-medium', 'inline-flex', 'items-center');
  });

  it('has proper semantic structure', () => {
    render(<ProjectsSection />);
    
    // Check section role
    expect(screen.getByRole('region')).toBeInTheDocument();
    
    // Check heading structure
    expect(screen.getByTestId('title')).toBeInTheDocument();
    
    // Check article elements
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(1);
    
    // Check button
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<ProjectsSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('matches snapshot', () => {
    const { container } = render(<ProjectsSection />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
