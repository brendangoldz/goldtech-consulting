import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import SectionHeader from '../shared/SectionHeader';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const projects = [
    {
        title: '100+ Websites Delivered for Entrepreneurs & Businesses',
        summary: 'Designed and developed modern Wix websites with custom branding, optimized layouts, and scalable templates. Streamlined delivery process reduced turnaround time and enabled consistent, premium-quality results across industries.'
    }
];

const ProjectsSection = () => (
  <section id="projects" className="py-20 bg-white" aria-labelledby="projects-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Proof"
        title="Case Studies"
        titleId="projects-title"
        subtitle="A peek at how we turn requirements into reliable, production-grade systems."
      />
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.article
            key={i}
            className="bg-lightGray/60 rounded-xl p-6 border border-gray-200 hover:bg-lightGray transition"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="font-semibold text-xl text-navy mb-2">{p.title}</h3>
            <p className="text-gray-700 mb-4">{p.summary}</p>
            <button className="text-navy font-medium inline-flex items-center hover:underline" aria-label="View case study details - Coming Soon">
              Coming Soon <FaArrowRight className="ml-2 text-gold" />
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
