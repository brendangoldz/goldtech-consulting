import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const SectionHeader = ({ eyebrow, title, subtitle, center = true }) => (
  <motion.div
    className={`mb-12 ${center ? 'text-center' : ''}`}
    variants={staggerContainer}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.3 }}
  >
    {eyebrow && (
      <motion.div
        className="inline-flex items-center px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium"
        variants={fadeInUp}
      >
        {eyebrow}
      </motion.div>
    )}
    <motion.h2
      className="mt-4 text-4xl sm:text-5xl font-bold text-navy"
      variants={fadeInUp}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        className="mt-4 text-gray-600 max-w-2xl mx-auto"
        variants={fadeInUp}
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

export default SectionHeader;
