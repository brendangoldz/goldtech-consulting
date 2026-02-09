import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Footer from './Footer';

expect.extend(toHaveNoViolations);

// Mock the Logo component to avoid Framer Motion issues
jest.mock('../shared/Logo', () => {
  return function MockLogo({ size, className }) {
    return (
      <div data-testid="logo" data-size={size} className={className}>
        GoldTech Consulting
      </div>
    );
  };
});

describe('Footer', () => {
  it('renders footer with all sections', () => {
    render(<Footer />);
    
    // Check footer element
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Check company info section
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toHaveAttribute('data-size', 'default');
    
    // Check quick links section
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    
    // Check social links section
    expect(screen.getByText('Connect')).toBeInTheDocument();
    
    // Check copyright
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} GoldTech Consulting LLC`)).toBeInTheDocument();
  });

  it('has proper navigation links', () => {
    render(<Footer />);
    
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const servicesLink = screen.getByRole('link', { name: /services/i });
    const projectsLink = screen.getByRole('link', { name: /projects/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });
    
    expect(aboutLink).toHaveAttribute('href', '#about');
    expect(servicesLink).toHaveAttribute('href', '#services');
    expect(projectsLink).toHaveAttribute('href', '#projects');
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('has proper social media links', () => {
    render(<Footer />);
    
    // LinkedIn link
    const linkedinLink = screen.getByRole('link', { name: 'Connect on LinkedIn' });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/brendangoldsmith/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // GitHub link
    const githubLink = screen.getByRole('link', { name: 'View GitHub profile' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/brendangoldz');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Facebook link
    const facebookLink = screen.getByRole('link', { name: 'Connect on Facebook' });
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=61587235855071');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Upwork link
    const upworkLink = screen.getByRole('link', { name: 'View Upwork profile' });
    expect(upworkLink).toBeInTheDocument();
    expect(upworkLink).toHaveAttribute('href', 'https://www.upwork.com/freelancers/~014de678477c7c319c?mp_source=share');
    expect(upworkLink).toHaveAttribute('target', '_blank');
    expect(upworkLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has proper heading structure', () => {
    render(<Footer />);
    
    const quickLinksHeading = screen.getByRole('heading', { name: /quick links/i });
    const connectHeading = screen.getByRole('heading', { name: /connect/i });
    
    expect(quickLinksHeading).toBeInTheDocument();
    expect(connectHeading).toBeInTheDocument();
    expect(quickLinksHeading.tagName).toBe('H5');
    expect(connectHeading.tagName).toBe('H5');
  });

  it('has proper CSS classes for styling', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-navy', 'text-gray-300', 'py-12');
    
    const logo = screen.getByTestId('logo');
    expect(logo).toHaveClass('filter', 'brightness-0', 'invert');
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper semantic structure', () => {
    render(<Footer />);
    
    // Check footer role
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Check navigation links are in a list
    const quickLinksSection = screen.getByText('Quick Links').closest('div');
    const linksList = quickLinksSection?.querySelector('ul');
    expect(linksList).toBeInTheDocument();
    
    // Check list items
    const listItems = linksList?.querySelectorAll('li');
    expect(listItems).toHaveLength(4);
  });

  it('matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
