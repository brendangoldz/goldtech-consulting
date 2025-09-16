import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';

import SectionHeader from '../shared/SectionHeader';

/**
 * ContactSection - Contact form with validation and accessibility
 * 
 * Features:
 * - Form validation with real-time feedback
 * - Accessibility support with ARIA attributes
 * - Loading states and error handling
 * - Success/error messaging
 * - Social media links
 * - Responsive design
 * 
 * @component
 * @returns {JSX.Element} Rendered contact section
 */
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  /**
   * Validate email format
   * 
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate form data
   * 
   * @param {Object} data - Form data to validate
   * @returns {Object} Validation errors
   */
  const validateForm = useCallback((data) => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (data.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  }, []);

  /**
   * Handle input change
   * 
   * @param {Event} event - Input change event
   */
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  /**
   * Handle form submission
   * 
   * @param {Event} event - Form submit event
   */
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically call your API endpoint
      // const response = await ContactService.submitContactForm(formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return (
    <section 
      id="contact" 
      className="py-20 bg-lightGray"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Let's talk"
          title="Start Your Project"
          subtitle="Tell us a bit about your goals. We'll follow up with a short discovery call and a clear plan."
        />

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.form
            className="md:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="contact-heading"
          >
            <fieldset disabled={isSubmitting}>
              <legend className="sr-only">Contact form</legend>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    required
                  />
                  {errors.name && (
                    <div 
                      id="name-error" 
                      className="mt-1 text-sm text-red-600 flex items-center"
                      role="alert"
                      aria-live="polite"
                    >
                      <FaExclamationCircle className="mr-1" aria-hidden="true" />
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required
                  />
                  {errors.email && (
                    <div 
                      id="email-error" 
                      className="mt-1 text-sm text-red-600 flex items-center"
                      role="alert"
                      aria-live="polite"
                    >
                      <FaExclamationCircle className="mr-1" aria-hidden="true" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div className="form-group mt-4">
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  required
                />
                {errors.subject && (
                  <div 
                    id="subject-error" 
                    className="mt-1 text-sm text-red-600 flex items-center"
                    role="alert"
                    aria-live="polite"
                  >
                    <FaExclamationCircle className="mr-1" aria-hidden="true" />
                    {errors.subject}
                  </div>
                )}
              </div>

              {/* Message Field */}
              <div className="form-group mt-4">
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors resize-vertical ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  required
                />
                {errors.message && (
                  <div 
                    id="message-error" 
                    className="mt-1 text-sm text-red-600 flex items-center"
                    role="alert"
                    aria-live="polite"
                  >
                    <FaExclamationCircle className="mr-1" aria-hidden="true" />
                    {errors.message}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 bg-gradient-to-r from-gold to-goldLight text-navy px-6 py-3 rounded-xl font-semibold shadow-gold hover:shadow-gold-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-describedby="submit-status"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Messages */}
              <div id="submit-status" className="mt-4" role="status" aria-live="polite">
                {submitStatus === 'success' && (
                  <div className="text-green-600 flex items-center">
                    <FaCheckCircle className="mr-2" aria-hidden="true" />
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-2" aria-hidden="true" />
                    Failed to send message. Please try again or contact us directly.
                  </div>
                )}
              </div>
            </fieldset>
          </motion.form>

          {/* Contact Information */}
          <motion.aside
            className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            aria-labelledby="contact-info-heading"
          >
            <h3 id="contact-info-heading" className="font-semibold text-navy mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <FaEnvelope className="text-gold mr-3 flex-shrink-0" aria-hidden="true" />
                <a 
                  href="mailto:brendan@goldtech-consulting.com"
                  className="hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40 rounded"
                >
                  brendan@goldtech-consulting.com
                </a>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-gold mr-3 flex-shrink-0" aria-hidden="true" />
                Mount Laurel, NJ
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium text-navy mb-3">Connect with us</h4>
              <div className="flex space-x-4" role="list">
                <a 
                  href="https://www.linkedin.com/in/brendangoldsmith/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-lg border hover:bg-lightGray transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40"
                  aria-label="Connect on LinkedIn"
                >
                  <FaLinkedin className="text-navy hover:text-gold transition-colors" aria-hidden="true" />
                </a>
                <a 
                  href="https://github.com/brendangoldz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-lg border hover:bg-lightGray transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40"
                  aria-label="View GitHub profile"
                >
                  <FaGithub className="text-navy hover:text-gold transition-colors" aria-hidden="true" />
                </a>
                <a 
                  href="https://www.upwork.com/freelancers/~014de678477c7c319c?mp_source=share" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-lg border hover:bg-lightGray transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40"
                  aria-label="View Upwork profile"
                >
                  <svg 
                    className="w-5 h-5 text-navy hover:text-gold transition-colors" 
                    viewBox="0 0 56.7 56.7" 
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M42.4,17.7c-5.3,0-9.3,3.5-10.9,9c-2.5-3.9-4.5-8.3-5.6-12.1h-5.6v14.7c0,2.9-2.4,5.3-5.3,5.3c-2.9,0-5.3-2.4-5.3-5.3V14.7  H4.3v14.7c0,6.1,4.9,11,10.9,11c6,0,10.9-4.9,10.9-11v-2.5c1.1,2.2,2.5,4.6,4,6.7l-3.5,16.3h5.7L34.7,38c2.2,1.4,4.7,2.2,7.7,2.2  c6.1,0,11.1-5,11.1-11.4C53.5,22.7,48.5,17.7,42.4,17.7z M42.4,34.6c-2.2,0-4.5-1-6.3-2.5l0.6-2.2v-0.1c0.4-2.4,1.7-6.4,5.8-6.4  c3.1,0,5.6,2.5,5.6,5.6C48,32.1,45.3,34.6,42.4,34.6z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

ContactSection.propTypes = {};

export default ContactSection;
