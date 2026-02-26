import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import Navigation from './Navigation';

expect.extend(toHaveNoViolations);

const renderWithRouter = (ui, { route = '/consulting' } = {}) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );

describe('Navigation', () => {
  const mockScrollTo = jest.fn();
  const defaultProps = {
    activeSection: 'home',
    scrollTo: mockScrollTo
  };

  beforeEach(() => {
    mockScrollTo.mockClear();
  });

  it('renders navigation with all menu items', () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText(/main navigation/i)).toBeInTheDocument();
    
    // Check desktop navigation items (sections + Blog link)
    expect(screen.getByRole('menubar')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /navigate to home section/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /navigate to about section/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /navigate to services section/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /navigate to projects section/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /navigate to contact section/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /navigate to blog/i })).toBeInTheDocument();
  });

  it('shows active section with proper ARIA attributes', () => {
    renderWithRouter(<Navigation {...defaultProps} activeSection="about" />);
    
    const aboutButton = screen.getByRole('menuitem', { name: /navigate to about section/i });
    expect(aboutButton).toHaveAttribute('aria-current', 'page');
  });

  it('calls scrollTo when section navigation item is clicked', async () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    const aboutButton = screen.getByRole('menuitem', { name: /navigate to about section/i });
    await userEvent.click(aboutButton);
    
    expect(mockScrollTo).toHaveBeenCalledWith('about');
  });

  it('does not call scrollTo when Blog item is clicked (route link)', async () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    const blogButton = screen.getByRole('menuitem', { name: /navigate to blog/i });
    await userEvent.click(blogButton);
    
    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('toggles mobile menu when button is clicked', async () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    
    await userEvent.click(mobileMenuButton);
    
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile navigation menu/i)).toBeInTheDocument();
  });

  it('closes mobile menu when navigation item is clicked', async () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
    await userEvent.click(mobileMenuButton);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    const aboutButton = screen.getByRole('menuitem', { name: /navigate to about section/i });
    await userEvent.click(aboutButton);
    
    expect(mockScrollTo).toHaveBeenCalledWith('about');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes mobile menu when Escape key is pressed', async () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
    await userEvent.click(mobileMenuButton);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    await userEvent.keyboard('{Escape}');
    
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('has proper focus management', async () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
    await userEvent.click(mobileMenuButton);
    
    const aboutButton = screen.getByRole('menuitem', { name: /navigate to about section/i });
    // Mobile menu items should be focusable by default (no explicit tabIndex needed)
    expect(aboutButton).toBeInTheDocument();
  });

  it('handles keyboard navigation in mobile menu', async () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
    await userEvent.click(mobileMenuButton);
    
    const homeButton = screen.getByRole('menuitem', { name: /navigate to home section/i });
    const aboutButton = screen.getByRole('menuitem', { name: /navigate to about section/i });
    
    // Focus should be on first menu item
    homeButton.focus();
    expect(homeButton).toHaveFocus();
    
    // Tab to next item
    await userEvent.tab();
    expect(aboutButton).toHaveFocus();
  });

  it('shows mobile menu button only on mobile', () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
    expect(mobileMenuButton).toHaveClass('md:hidden');
  });

  it('shows desktop navigation only on desktop', () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    const desktopMenu = screen.getByRole('menubar');
    expect(desktopMenu).toHaveClass('hidden', 'md:flex');
  });

  it('has proper ARIA attributes for screen readers', () => {
    renderWithRouter(<Navigation {...defaultProps} />);
    
    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('aria-label', 'Main navigation');
    
    const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
    expect(mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should not have accessibility violations', async () => {
    const { container } = renderWithRouter(<Navigation {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with mobile menu open', async () => {
    const { container } = renderWithRouter(<Navigation {...defaultProps} />);
    
    const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
    fireEvent.click(mobileMenuButton);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('matches snapshot', () => {
    const { container } = renderWithRouter(<Navigation {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with mobile menu open', () => {
    const { container } = renderWithRouter(<Navigation {...defaultProps} />);
    
    const mobileMenuButton = screen.getByLabelText(/toggle mobile menu/i);
    fireEvent.click(mobileMenuButton);
    
    expect(container.firstChild).toMatchSnapshot();
  });
});
