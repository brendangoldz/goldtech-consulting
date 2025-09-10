import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className = "", size = "default" }) => {
  const sizeClasses = {
    small: "h-8",
    default: "h-16", 
    large: "h-18"
  };

  // Use the new GoldTech logo
  const logoSrc = "/goldtech-logo-edited-hires-navy.png";

  return (
    <motion.div 
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={logoSrc}
        alt="GoldTech Consulting Logo"
        className={`${sizeClasses[size]} w-auto object-cover`}
        style={{ objectPosition: 'center 30%' }}
      />
    </motion.div>
  );
};

export default Logo;
