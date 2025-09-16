import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Logo from '../shared/Logo';

const Footer = () => (
  <footer className="bg-navy text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-6 lg:gap-12">
        {/* Company Info */}
        <div className="md:text-left">
          <div className="mb-4 flex justify-center md:justify-start">
            <Logo size="default" className="filter brightness-0 invert" />
          </div>
          {/* <p className="text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            Your trusted partner for modern software, integrations, and QA automation.
          </p> */}
        </div>
        
        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h5 className="text-white font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-gold transition-colors">About</a></li>
            <li><a href="#services" className="hover:text-gold transition-colors">Services</a></li>
            <li><a href="#projects" className="hover:text-gold transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
          </ul>
        </div>
        
        {/* Social Links */}
        <div className="text-center md:text-left">
          <h5 className="text-white font-semibold mb-4">Connect</h5>
          <div className="flex justify-center md:justify-center space-x-4">
            <a href="https://www.linkedin.com/in/brendangoldsmith/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-gray-600 hover:border-gold hover:bg-gold/10 transition-all duration-300" aria-label="Connect on LinkedIn">
              <FaLinkedin className="text-gray-300 hover:text-gold transition-colors" />
            </a>
            <a href="https://github.com/brendangoldz" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-gray-600 hover:border-gold hover:bg-gold/10 transition-all duration-300" aria-label="View GitHub profile">
              <FaGithub className="text-gray-300 hover:text-gold transition-colors" />
            </a>
            <a href="https://www.upwork.com/freelancers/~014de678477c7c319c?mp_source=share" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-gray-600 hover:border-gold hover:bg-gold/10 transition-all duration-300" aria-label="View Upwork profile">
              <svg className="w-5 h-5 text-gray-300 hover:text-gold transition-colors" viewBox="0 0 56.7 56.7" fill="currentColor">
                <path d="M42.4,17.7c-5.3,0-9.3,3.5-10.9,9c-2.5-3.9-4.5-8.3-5.6-12.1h-5.6v14.7c0,2.9-2.4,5.3-5.3,5.3c-2.9,0-5.3-2.4-5.3-5.3V14.7  H4.3v14.7c0,6.1,4.9,11,10.9,11c6,0,10.9-4.9,10.9-11v-2.5c1.1,2.2,2.5,4.6,4,6.7l-3.5,16.3h5.7L34.7,38c2.2,1.4,4.7,2.2,7.7,2.2  c6.1,0,11.1-5,11.1-11.4C53.5,22.7,48.5,17.7,42.4,17.7z M42.4,34.6c-2.2,0-4.5-1-6.3-2.5l0.6-2.2v-0.1c0.4-2.4,1.7-6.4,5.8-6.4  c3.1,0,5.6,2.5,5.6,5.6C48,32.1,45.3,34.6,42.4,34.6z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-gray-700">
        © {new Date().getFullYear()} GoldTech Consulting LLC
      </div>
    </div>
  </footer>
);

export default Footer;
