import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';
import Seo from '../shared/Seo';
import Button from '../shared/Button';

const ConfirmationPage = ({ variant = 'consulting' }) => {
  const isMarketing = variant === 'marketing';
  const workLink = '/consulting#projects';

  return (
    <PageLayout variant={variant}>
      <Seo
        title="Thank You | GoldTech"
        description="Thanks for reaching out. Your submission is confirmed, and we will be in touch shortly."
        path="/confirmation"
        type="website"
      />
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-4">Thank you!</h1>
          <p className="text-lg text-gray-700 mb-3">
            We have received your submission and it is in our queue.
          </p>
          <p className="text-base text-gray-600 mb-8">
            Our team will review your request and follow up shortly. In the meantime, feel free to return home or
            browse our recent work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button variant={isMarketing ? 'secondary' : 'primary'} size="large">
                Return Home
              </Button>
            </Link>
            <Link to={workLink}>
              <Button variant="outline" size="large">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

ConfirmationPage.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing'])
};

export default ConfirmationPage;
