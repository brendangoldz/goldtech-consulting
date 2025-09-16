import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLaptopCode, FaChartLine, FaShieldAlt, FaMobileAlt
} from 'react-icons/fa';
import SectionHeader from '../shared/SectionHeader';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const services = [
  {
    icon: <FaLaptopCode className="text-3xl text-gold" />,
    title: 'Custom Software Development',
    desc: 'Tailor-made, scalable, and robust solutions for startups and enterprises.'
  },
  {
    icon: <FaChartLine className="text-3xl text-gold" />,
    title: 'Tech Consultation & Strategy',
    desc: 'Technology-driven strategies that give your business a competitive edge.'
  },
  {
    icon: <FaShieldAlt className="text-3xl text-gold" />,
    title: 'IoT Implementation, Integration, & Optimization',
    desc: 'Seamless Internet of Things implementations and streamlined operations across your stack.'
  },
  {
    icon: <FaMobileAlt className="text-3xl text-gold" />,
    title: 'Project Management & Automation',
    desc: 'Engineering focused project management and automation, performance monitoring, and release readiness.'
  }
];

const ServicesSection = () => (
  <section id="services" className="py-20 bg-lightGray">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="What we do"
        title="Our Services"
        subtitle="Modular offerings that can be engaged individually or combined into an end-to-end delivery model."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition will-change-transform"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="mb-4">{s.icon}</div>
            <h4 className="font-semibold text-lg text-navy mb-2">{s.title}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
