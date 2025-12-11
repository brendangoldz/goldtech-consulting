import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import {
  FaLaptopCode, FaChartLine, FaShieldAlt, FaMobileAlt
} from 'react-icons/fa';
import SectionHeader from '../shared/SectionHeader';
import { getContent } from '../../config/content';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const iconMap = {
  FaLaptopCode: FaLaptopCode,
  FaChartLine: FaChartLine,
  FaShieldAlt: FaShieldAlt,
  FaMobileAlt: FaMobileAlt
};

const ServicesSection = ({ variant = 'consulting' }) => {
  const content = getContent(variant).services;
  
  return (
  <section id="services" className="py-20 bg-lightGray" aria-labelledby="services-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.title}
        titleId="services-title"
        subtitle={content.subtitle}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.items.map((service, i) => {
          const IconComponent = iconMap[service.icon];
          return (
            <motion.div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition will-change-transform"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-4" role="img" aria-hidden="true">
                {IconComponent && <IconComponent className="text-3xl text-gold" />}
              </div>
              <h3 className="font-semibold text-lg text-navy mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
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
