import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className = "", size = "default" }) => {
  const sizeClasses = {
    small: "h-10",
    default: "h-14", 
    large: "h-18"
  };

  // Use the transparent logo for all sizes
  const logoSrc = "/GoldTech_Logo_transparent.png";

  return (
    <motion.div 
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={logoSrc}
        alt="GoldTech Consulting Logo"
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
    </motion.div>
  );
};

export default Logo;
