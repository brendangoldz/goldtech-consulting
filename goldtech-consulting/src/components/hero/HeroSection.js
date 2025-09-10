import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const HeroSection = ({ scrollTo }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-lightGray to-gold/5"
    >
      {/* blobs */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-navy/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-navy text-sm font-medium mb-8"
            variants={fadeInUp}
          >
            <span className="w-2 h-2 bg-gold rounded-full mr-2 animate-pulse" />
            Delivered Solutions for 50+ businesses worldwide
          </motion.div>

          <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-navy mb-6" variants={fadeInUp}>
            Build <span className="bg-gradient-to-r from-gold to-goldLight bg-clip-text text-transparent">Faster</span>
            <br />
            Ship <span className="bg-gradient-to-r from-gold to-goldLight bg-clip-text text-transparent">Cleaner</span>
            <br />
            Look <span className="bg-gradient-to-r from-gold to-goldLight bg-clip-text text-transparent">Premium</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Your trusted partner for modern software, integrations, and QA automation.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
            <motion.button
              onClick={() => scrollTo('contact')}
              className="group relative bg-gradient-to-r from-gold to-goldLight text-white px-8 py-4 rounded-xl font-semibold shadow-gold hover:shadow-gold-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center text-navy">
                Start Your Project
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>

            <motion.button
              onClick={() => scrollTo('services')}
              className="group border-2 border-navy text-navy px-8 py-4 rounded-xl font-semibold hover:bg-navy hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Services
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;