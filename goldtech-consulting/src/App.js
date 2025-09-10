import React, { useState, useEffect } from 'react';
import Navigation from './components/nav/Navigation';
import HeroSection from './components/hero/HeroSection';
import AboutSection from './components/about/About';
import ServicesSection from './components/services/ServicesSection';
import ProjectsSection from './components/projects/ProjectsSection';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/footer/Footer';

import './index.css';
import './App.css';

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
