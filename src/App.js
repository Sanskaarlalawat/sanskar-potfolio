import React, { useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import AIServicesCarousel from './components/AIServicesCarousel';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import Loader from './components/Loader';
import TunnelAnimation from './components/TunnelAnimation';
import Recommendations from './components/Recommendations';

const App = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const tunnelRef = useRef(null);
  const reviewsRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {loading && (
        <Loader
          duration={4000}
          exitDuration={900}
          onFinish={() => setLoading(false)}
        />
      )}

      {!loading && (
        <div ref={containerRef} className="bg-white text-black min-h-screen overflow-x-hidden font-sans">
          <Header 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            scrollToSection={scrollToSection}
            projectsRef={projectsRef}
            aboutRef={aboutRef}
            heroRef={heroRef}
            contactRef={contactRef}
          />

          <Hero 
            heroRef={heroRef}
            scrollToSection={scrollToSection}
            projectsRef={projectsRef}
            scrollY={scrollY}
          />

          <Projects 
            projectsRef={projectsRef}
            setActiveProject={setActiveProject}
          />

          {/* 3D Tunnel Animation Section */}
          <TunnelAnimation sectionRef={tunnelRef} />

          {/* Client Recommendations Section */}
          <Recommendations sectionRef={reviewsRef} />

          <About aboutRef={aboutRef} />

          {/* AI Services Carousel Section */}
          <AIServicesCarousel sectionRef={servicesRef} />

          <Footer contactRef={contactRef} scrollToSection={scrollToSection} heroRef={heroRef} />

          <ProjectModal activeProject={activeProject} setActiveProject={setActiveProject} />

          {/* Scroll to top button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => scrollToSection(heroRef)}
            className="fixed bottom-8 right-8 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg z-40"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      )}
    </>
  );
};

export default App;