import React from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub
} from 'react-icons/fa';
import SectionHeader from '../shared/SectionHeader';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const ContactSection = () => (
  <section id="contact" className="py-20 bg-lightGray">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Let's talk"
        title="Start Your Project"
        subtitle="Tell us a bit about your goals. We'll follow up with a short discovery call and a clear plan."
      />

      <div className="grid md:grid-cols-5 gap-8">
        {/* Form */}
        <motion.form
          className="md:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40" />
            <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40" />
          </div>
          <input type="text" placeholder="Subject" className="mt-4 w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40" />
          <textarea placeholder="Message" rows="6" className="mt-4 w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/40" />
          <button
            type="submit"
            className="mt-6 bg-gradient-to-r from-gold to-goldLight text-navy px-6 py-3 rounded-xl font-semibold shadow-gold hover:shadow-gold-lg transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.aside
          className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h5 className="font-semibold text-navy mb-4">Contact Info</h5>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center"><FaEnvelope className="text-gold mr-3" /> brendan@goldtech-consulting.com</li>
            <li className="flex items-center"><FaMapMarkerAlt className="text-gold mr-3" /> Mount Laurel, NJ</li>
          </ul>
          <div className="mt-6 flex space-x-4">
            <a href="https://www.linkedin.com/in/brendangoldsmith/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border hover:bg-lightGray transition-colors">
              <FaLinkedin className="text-navy hover:text-gold" />
            </a>
            <a href="https://github.com/brendangoldz" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border hover:bg-lightGray transition-colors">
              <FaGithub className="text-navy hover:text-gold" />
            </a>
            <a href="https://www.upwork.com/freelancers/~014de678477c7c319c?mp_source=share" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border hover:bg-lightGray transition-colors">
              <svg className="w-5 h-5 text-navy hover:text-gold transition-colors" viewBox="0 0 56.7 56.7" fill="currentColor">
                <path d="M42.4,17.7c-5.3,0-9.3,3.5-10.9,9c-2.5-3.9-4.5-8.3-5.6-12.1h-5.6v14.7c0,2.9-2.4,5.3-5.3,5.3c-2.9,0-5.3-2.4-5.3-5.3V14.7  H4.3v14.7c0,6.1,4.9,11,10.9,11c6,0,10.9-4.9,10.9-11v-2.5c1.1,2.2,2.5,4.6,4,6.7l-3.5,16.3h5.7L34.7,38c2.2,1.4,4.7,2.2,7.7,2.2  c6.1,0,11.1-5,11.1-11.4C53.5,22.7,48.5,17.7,42.4,17.7z M42.4,34.6c-2.2,0-4.5-1-6.3-2.5l0.6-2.2v-0.1c0.4-2.4,1.7-6.4,5.8-6.4  c3.1,0,5.6,2.5,5.6,5.6C48,32.1,45.3,34.6,42.4,34.6z"/>
              </svg>
            </a>
          </div>
        </motion.aside>
      </div>
    </div>
  </section>
);

export default ContactSection;
