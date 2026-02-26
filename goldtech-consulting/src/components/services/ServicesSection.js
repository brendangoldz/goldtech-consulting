import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  FaLaptopCode, FaChartLine, FaShieldAlt, FaMobileAlt, FaArrowRight,
  FaGlobeAmericas, FaClipboardCheck, FaPlug, FaCogs, FaPalette, FaPenFancy, FaStamp
} from 'react-icons/fa';
import SectionHeader from '../shared/SectionHeader';
import { useContent } from '../../contexts/ContentContext';
import { getSectionBg, getThemeClasses, getVariantClasses } from '../../config/theme';
import { fadeInUp } from '../../utils/animations';

const iconMap = {
  FaLaptopCode,
  FaChartLine,
  FaShieldAlt,
  FaMobileAlt,
  FaGlobeAmericas,
  FaClipboardCheck,
  FaPlug,
  FaCogs,
  FaPalette,
  FaPenFancy,
  FaStamp
};

const ServicesSection = ({ variant = 'consulting' }) => {
  const location = useLocation();
  const content = useContent(variant).services;
  const cardBaseClasses = `${getThemeClasses(variant, 'card-bg')} ${getThemeClasses(variant, 'card-border')}`;
  const iconClasses = getVariantClasses(variant, {
    marketing: 'text-marketing-primary',
    consulting: 'text-gold'
  });
  const linkClasses = getVariantClasses(variant, {
    marketing: 'bg-marketing-primary/10 text-marketing-primary hover:bg-marketing-primary/20 focus:ring-marketing-primary/40',
    consulting: 'bg-gold/10 text-gold hover:bg-gold/20 focus:ring-gold/40'
  });
  
  return (
  <section id="services" className={`py-20 ${getSectionBg(variant)}`} aria-labelledby="services-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        titleId="services-title"
        subtitle={content.subtitle}
        variant={variant}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.items.map((service, i) => {
          const IconComponent = iconMap[service.icon];
          const servicePath = service.slug
            ? `/${variant}/services/${service.slug}`
            : null;
          return (
            <motion.div
              key={i}
              className={`${cardBaseClasses} rounded-xl p-6 shadow-sm h-full min-h-[260px] flex flex-col border hover:shadow-lg hover:-translate-y-1 transition will-change-transform`}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-4" role="img" aria-hidden="true">
                {IconComponent && (
                  <IconComponent className={`text-3xl ${iconClasses}`} />
                )}
              </div>
              <h3 className="font-semibold text-lg text-navy mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">{service.desc}</p>
              {servicePath && (
                <Link
                  to={servicePath}
                  state={{ from: location.pathname }}
                  className={`
                    group mt-auto pt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
                    !no-underline transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${linkClasses}
                  `}
                  aria-label={`View ${service.title} service details`}
                >
                  View details
                  <FaArrowRight className="text-xs shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

ServicesSection.propTypes = {
  variant: PropTypes.oneOf(['consulting', 'marketing'])
};

export default ServicesSection;
