import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaUpwork, FaCode, FaChartLine, FaShieldAlt, FaLaptopCode, FaMobileAlt,
  FaSearch, FaTools, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin,
  FaTwitter, FaGithub, FaArrowRight, FaCheck
} from 'react-icons/fa';
import Logo from './components/shared/Logo';

import './index.css';

import './App.css';
/* -------------------- Animations -------------------- */
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

/* -------------------- Helpers -------------------- */
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

/* -------------------- Navigation -------------------- */
const Navigation = ({ activeSection, scrollTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo size="default" />
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative font-medium transition-colors duration-200 ${
                  activeSection === item.id ? 'text-gold' : 'text-navy hover:text-gold'
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    layoutId="activeSection"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

/* -------------------- Hero -------------------- */
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
            className="inline-flex items-center px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8"
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
              <span className="flex items-center">
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

/* -------------------- About -------------------- */
const AboutSection = () => (
  <section id="about" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Who we are"
        title="About GoldTech"
        subtitle="We harness the power of technology to drive business transformation—pairing engineering rigor with product sensibility."
      />
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="text-gray-700 leading-relaxed" variants={fadeInUp}>
            From cloud solutions and QA automation to bespoke web apps and integrations, our team delivers outcomes,
            not just artifacts. We keep accessibility, performance, and maintainability front and center—so you scale
            with confidence.
          </motion.p>

          <motion.ul className="mt-6 space-y-3" variants={fadeInUp}>
            {[
              'Cloud-first architecture & DevOps',
              'Accessible, responsive UI/UX',
              'Integration with your existing stack',
              'Measurable impact and clear reporting'
            ].map((t, i) => (
              <li key={i} className="flex items-start text-gray-700">
                <FaCheck className="text-gold mt-1 mr-3" /> {t}
              </li>
            ))}
          </motion.ul>

          <motion.div className="mt-8 flex flex-wrap gap-3" variants={fadeInUp}>
            <span className="px-3 py-1 rounded-full bg-lightGray text-navy text-sm">React</span>
            <span className="px-3 py-1 rounded-full bg-lightGray text-navy text-sm">Node</span>
            <span className="px-3 py-1 rounded-full bg-lightGray text-navy text-sm">AWS</span>
            <span className="px-3 py-1 rounded-full bg-lightGray text-navy text-sm">PostgreSQL</span>
            <span className="px-3 py-1 rounded-full bg-lightGray text-navy text-sm">CICD</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-lightGray/70 rounded-2xl p-6 h-[320px] flex items-center justify-center border border-gray-200"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="text-gray-400">[ Illustration / team image / dashboard mockup ]</span>
        </motion.div>
      </div>
    </div>
  </section>
);

/* -------------------- Services -------------------- */
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

/* -------------------- Projects -------------------- */
const projects = [
    {
        title: '100+ Websites Delivered for Entrepreneurs & Businesses',
        summary: 'Designed and developed modern Wix websites with custom branding, optimized layouts, and scalable templates. Streamlined delivery process reduced turnaround time and enabled consistent, premium-quality results across industries.'
    }
];

const ProjectsSection = () => (
  <section id="projects" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Proof"
        title="Case Studies"
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
            <h4 className="font-semibold text-xl text-navy mb-2">{p.title}</h4>
            <p className="text-gray-700 mb-4">{p.summary}</p>
            <button className="text-gold font-medium inline-flex items-center hover:underline">
              Read Case Study <FaArrowRight className="ml-2" />
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

/* -------------------- Contact -------------------- */
const ContactSection = () => (
  <section id="contact" className="py-20 bg-lightGray">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Let’s talk"
        title="Start Your Project"
        subtitle="Tell us a bit about your goals. We’ll follow up with a short discovery call and a clear plan."
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
            className="mt-6 bg-gradient-to-r from-gold to-goldLight text-white px-6 py-3 rounded-xl font-semibold shadow-gold hover:shadow-gold-lg transition"
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

/* -------------------- Footer -------------------- */
const Footer = () => (
  <footer className="bg-navy text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
      <div>
        <div className="mb-4">
          <Logo size="default" className="filter brightness-0 invert" />
        </div>
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
            <a href="https://www.linkedin.com/in/brendangoldsmith/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border hover:bg-lightGray transition-colors">
              <FaLinkedin className="text-gray-300 hover:text-gold" />
            </a>
            <a href="https://github.com/brendangoldz" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border hover:bg-lightGray transition-colors">
              <FaGithub className="text-gray-300 hover:text-gold" />
            </a>
            <a href="https://www.upwork.com/freelancers/~014de678477c7c319c?mp_source=share" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border hover:bg-lightGray transition-colors">
              <svg className="w-5 h-5 text-gray-300 hover:text-gold transition-colors" viewBox="0 0 56.7 56.7" fill="currentColor">
                <path d="M42.4,17.7c-5.3,0-9.3,3.5-10.9,9c-2.5-3.9-4.5-8.3-5.6-12.1h-5.6v14.7c0,2.9-2.4,5.3-5.3,5.3c-2.9,0-5.3-2.4-5.3-5.3V14.7  H4.3v14.7c0,6.1,4.9,11,10.9,11c6,0,10.9-4.9,10.9-11v-2.5c1.1,2.2,2.5,4.6,4,6.7l-3.5,16.3h5.7L34.7,38c2.2,1.4,4.7,2.2,7.7,2.2  c6.1,0,11.1-5,11.1-11.4C53.5,22.7,48.5,17.7,42.4,17.7z M42.4,34.6c-2.2,0-4.5-1-6.3-2.5l0.6-2.2v-0.1c0.4-2.4,1.7-6.4,5.8-6.4  c3.1,0,5.6,2.5,5.6,5.6C48,32.1,45.3,34.6,42.4,34.6z"/>
              </svg>
            </a>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-500 text-sm mt-8">
      © {new Date().getFullYear()} GoldTech Consulting LLC
    </div>
  </footer>
);

/* -------------------- App -------------------- */
function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const ids = ['home', 'about', 'services', 'projects', 'contact'];
      const pos = window.scrollY + 120;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { offsetTop, offsetHeight } = el;
        if (pos >= offsetTop && pos < offsetTop + offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
