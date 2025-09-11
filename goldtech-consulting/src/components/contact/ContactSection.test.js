import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import ContactSection from './ContactSection';

expect.extend(toHaveNoViolations);

describe('ContactSection', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock console.error to avoid noise in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('renders all form fields and contact information', () => {
    render(<ContactSection />);
    
    // Check form fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    
    // Check contact information
    expect(screen.getByText(/contact info/i)).toBeInTheDocument();
    expect(screen.getByText(/brendan@goldtech-consulting.com/i)).toBeInTheDocument();
    expect(screen.getByText(/mount laurel, nj/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<ContactSection />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<ContactSection />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates minimum length requirements', async () => {
    render(<ContactSection />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    await user.type(nameInput, 'A');
    await user.type(subjectInput, 'Test');
    await user.type(messageInput, 'Short');
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/subject must be at least 5 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('clears errors when user starts typing', async () => {
    render(<ContactSection />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
    
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'John');
    
    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    render(<ContactSection />);
    
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with sufficient length.'
    };
    
    await user.type(screen.getByLabelText(/name/i), formData.name);
    await user.type(screen.getByLabelText(/email/i), formData.email);
    await user.type(screen.getByLabelText(/subject/i), formData.subject);
    await user.type(screen.getByLabelText(/message/i), formData.message);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    // Check loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Check form is reset
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/subject/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<ContactSection />);
    
    // Check form accessibility
    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('aria-labelledby', 'contact-heading');
    expect(form).toHaveAttribute('novalidate');
    
    // Check fieldset
    const fieldset = screen.getByRole('group');
    expect(fieldset).toBeInTheDocument();
    
    // Check form fields have proper labels and ARIA attributes
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toHaveAttribute('required');
    expect(nameInput).toHaveAttribute('aria-invalid', 'false');
    
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<ContactSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has accessible social media links', () => {
    render(<ContactSection />);
    
    const linkedinLink = screen.getByLabelText(/connect on linkedin/i);
    const githubLink = screen.getByLabelText(/view github profile/i);
    const upworkLink = screen.getByLabelText(/view upwork profile/i);
    
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/brendangoldsmith/');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/brendangoldz');
    expect(upworkLink).toHaveAttribute('href', expect.stringContaining('upwork.com'));
    
    // Check all links open in new tab
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles keyboard navigation properly', async () => {
    render(<ContactSection />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Tab through form elements
    nameInput.focus();
    expect(nameInput).toHaveFocus();
    
    await user.tab();
    expect(emailInput).toHaveFocus();
    
    await user.tab();
    expect(subjectInput).toHaveFocus();
    
    await user.tab();
    expect(messageInput).toHaveFocus();
    
    await user.tab();
    expect(submitButton).toHaveFocus();
  });

  it('matches snapshot', () => {
    const { container } = render(<ContactSection />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
