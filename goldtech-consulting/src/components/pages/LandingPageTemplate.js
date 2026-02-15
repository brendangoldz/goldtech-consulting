import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SectionHeader from '../shared/SectionHeader';
import Button from '../shared/Button';

const LandingPageTemplate = ({ variant = 'consulting', page }) => {
  const isMarketing = variant === 'marketing';
  const ctaHref = page.cta?.href || (isMarketing ? '/marketing#contact' : '/consulting#contact');

  return (
    <div>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={page.eyebrow}
            title={page.h1}
            subtitle={page.intro}
            center={false}
            level="h1"
            variant={variant}
          />
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
          {page.sections.map((section) => (
            <div
              key={section.title}
              className={`${isMarketing ? 'bg-marketing-bgAlt' : 'bg-white'} rounded-2xl p-6 shadow-sm border ${
                isMarketing ? 'border-marketing-primary/20' : 'border-gray-100'
              }`}
            >
              <h2 className="text-xl font-semibold text-navy mb-4">{section.title}</h2>
              <ul className="space-y-2 text-gray-600">
                {section.items.map((item, index) => (
                  <li key={`${section.title}-${index}`} className="flex items-start gap-3">
                    <span
                      className={`mt-1 h-2 w-2 rounded-full ${isMarketing ? 'bg-marketing-primary' : 'bg-gold'}`}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-navy mb-4">
            {page.cta?.headline || 'Ready to move faster?'}
          </h2>
          {page.cta?.subtext && (
            <p className="text-gray-600 mb-6">{page.cta.subtext}</p>
          )}
          <Link to={ctaHref} aria-label={page.cta?.text || 'Contact GoldTech'}>
            <Button variant={isMarketing ? 'secondary' : 'primary'}>
              {page.cta?.text || 'Start your project'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

LandingPageTemplate.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing']),
  page: PropTypes.shape({
    h1: PropTypes.string.isRequired,
    intro: PropTypes.string,
    eyebrow: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string).isRequired
      })
    ).isRequired,
    cta: PropTypes.shape({
      text: PropTypes.string,
      href: PropTypes.string,
      headline: PropTypes.string,
      subtext: PropTypes.string
    })
  }).isRequired
};

export default LandingPageTemplate;
