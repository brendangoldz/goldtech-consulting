import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';
import Button from '../shared/Button';

const NotFoundPage = ({ variant = 'consulting' }) => {
  const basePath = variant === 'marketing' ? '/marketing' : '/consulting';

  return (
    <PageLayout variant={variant}>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">Page not found</h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for does not exist. Try heading back to the main page.
          </p>
          <Link to={basePath}>
            <Button variant={variant === 'marketing' ? 'secondary' : 'primary'}>
              Go to {variant === 'marketing' ? 'Marketing' : 'Consulting'}
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

NotFoundPage.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing'])
};

export default NotFoundPage;
