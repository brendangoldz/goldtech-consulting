import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-navy text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
      <div>
        <h4 className="text-white font-bold text-xl mb-4">
          <span className="text-gold">Gold</span>Tech Consulting
        </h4>
        <p className="text-sm">Your trusted partner for modern software, integrations, and QA automation.</p>
      </div>
      <div>
        <h5 className="text-white font-semibold mb-4">Quick Links</h5>
        <ul className="space-y-2 text-sm">
          <li><a href="#about" className="hover:text-gold">About</a></li>
          <li><a href="#services" className="hover:text-gold">Services</a></li>
          <li><a href="#projects" className="hover:text-gold">Projects</a></li>
          <li><a href="#contact" className="hover:text-gold">Contact</a></li>
        </ul>
      </div>
      <div>
        <h5 className="text-white font-semibold mb-4">Connect</h5>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gold"><FaLinkedin /></a>
          <a href="#" className="hover:text-gold"><FaGithub /></a>
          <a href="#" className="hover:text-gold"><FaTwitter /></a>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-500 text-sm mt-8">
      © {new Date().getFullYear()} GoldTech Consulting LLC
    </div>
  </footer>
);

export default Footer;