import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

// Mock ProjectModal component
jest.mock('./ProjectModal', () => {
  return function MockProjectModal({ isOpen, onClose, projectTitle, screenshots }) {
    if (!isOpen) return null;
    return (
      <div data-testid="project-modal" role="dialog">
        <div data-testid="modal-title">{projectTitle}</div>
        <div data-testid="modal-screenshots-count">{screenshots?.length || 0}</div>
        <button onClick={onClose} data-testid="modal-close">Close</button>
      </div>
    );
  };
});

// Mock Framer Motion components
jest.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }) => {
      const { whileInView, initial, variants, viewport, ...rest } = props;
      return <article {...rest}>{children}</article>;
    },
    div: ({ children, ...props }) => {
      const { whileInView, initial, variants, viewport, animate, exit, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    img: ({ ...props }) => {
      const { whileInView, initial, variants, viewport, animate, exit, ...rest } = props;
      return <img {...rest} />;
    },
  },
  AnimatePresence: ({ children }) => children,
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
    
    const projectTitle = '200+ Websites Delivered for Entrepreneurs & Businesses';
    const projectSummary = 'Designed and developed modern Wix websites with custom branding, optimized layouts, and scalable templates. Streamlined delivery process reduced turnaround time and enabled consistent, premium-quality results across industries.';
    
    expect(screen.getByText(projectTitle)).toBeInTheDocument();
    expect(screen.getByText(projectSummary)).toBeInTheDocument();
  });

  it('displays View Gallery button when screenshots are available', () => {
    render(<ProjectsSection />);
    
    // Check if View Gallery button is rendered
    const galleryButton = screen.getByRole('button', { name: /View gallery for/i });
    expect(galleryButton).toBeInTheDocument();
  });

  it('opens modal when clicking View Gallery button', () => {
    render(<ProjectsSection />);
    
    // Find and click the View Gallery button
    const galleryButton = screen.getByRole('button', { name: /View gallery for/i });
    fireEvent.click(galleryButton);
    
    // Check if modal is opened
    expect(screen.getByTestId('project-modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-title')).toHaveTextContent(/200\+ Websites/i);
  });

  it('opens modal when clicking View Gallery button', () => {
    render(<ProjectsSection />);
    
    // Find and click the View Gallery button
    const galleryButton = screen.getByRole('button', { name: /View gallery for/i });
    fireEvent.click(galleryButton);
    
    // Check if modal is opened
    expect(screen.getByTestId('project-modal')).toBeInTheDocument();
  });

  it('closes modal when clicking close button', () => {
    render(<ProjectsSection />);
    
    // Open modal
    const galleryButton = screen.getByRole('button', { name: /View gallery for/i });
    fireEvent.click(galleryButton);
    expect(screen.getByTestId('project-modal')).toBeInTheDocument();
    
    // Close modal
    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('project-modal')).not.toBeInTheDocument();
  });

  it('displays website link when websiteUrl is provided', () => {
    render(<ProjectsSection />);
    
    const websiteLink = screen.getByRole('link', { 
      name: /Visit 200\+ Websites Delivered for Entrepreneurs & Businesses website/i 
    });
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute('href', 'https://goldtech-consulting.com');
    expect(websiteLink).toHaveAttribute('target', '_blank');
    expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has proper heading structure for project cards', () => {
    render(<ProjectsSection />);
    
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(1);
    
    const projectHeading = screen.getByRole('heading', { name: /200\+ Websites Delivered/ });
    expect(projectHeading).toBeInTheDocument();
    expect(projectHeading.tagName).toBe('H3');
  });

  it('has proper CSS classes for styling', () => {
    render(<ProjectsSection />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass('py-20', 'bg-white');
    
    // Check project card has proper classes
    const projectCard = screen.getByText(/200\+ Websites Delivered/).closest('article');
    expect(projectCard).toHaveClass('bg-lightGray/60', 'rounded-xl', 'border', 'border-gray-200');
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
    
    // Check buttons (screenshot container and View Gallery button)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
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
