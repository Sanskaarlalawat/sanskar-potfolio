import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import AboutPage from './pages/AboutPage';
import PageTransition from './components/PageTransition';
import { getProjectBySlug } from './data/projects';
import { applySeo, seoForRoute } from './seo';

// Tiny path router: '/' → home, '/projects' → list, '/project/<slug>' → detail, '/about' → about.
// Old '#/...' links are upgraded to real paths so Google indexes every page separately.
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1));
}

const getRoute = () => {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (path === 'projects') return { page: 'projects' };
  if (path === 'about') return { page: 'about' };
  if (path.startsWith('project/')) return { page: 'project', slug: path.slice('project/'.length) };
  return { page: 'home' };
};

const App = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [route, setRoute] = useState(getRoute);
  // Only play the intro loader when landing on the home page.
  const [loading, setLoading] = useState(() => getRoute().page === 'home');
  // Home mounts under the loader as its exit sweep begins, so the curtain
  // reveals real content instead of a blank page.
  const [homeRevealed, setHomeRevealed] = useState(() => getRoute().page !== 'home');
  const [transition, setTransition] = useState(null);
  const transitionLockRef = useRef(false);
  useScroll();

  // Route changes go through the curtain transition: cover → swap path → reveal.
  const navigate = useCallback((path, label, tag) => {
    const current = window.location.pathname || '/';
    if (current === path || transitionLockRef.current) return;
    transitionLockRef.current = true;
    setTransition({ path, label, tag });
  }, []);

  const handleTransitionDone = useCallback(() => {
    transitionLockRef.current = false;
    setTransition(null);
  }, []);

  const openAllProjects = useCallback(() => {
    navigate('/projects', 'All Projects', 'Selected Work');
  }, [navigate]);

  const openAbout = useCallback(() => {
    navigate('/about', 'About', 'Sanskar Lalawat');
  }, [navigate]);

  const openProject = useCallback((slug) => {
    const project = getProjectBySlug(slug);
    navigate(
      `/project/${slug}`,
      project ? project.title : 'Project',
      project ? `Project — ${String(project.id).padStart(2, '0')}` : 'Project'
    );
  }, [navigate]);

  const goHome = useCallback(() => {
    navigate('/', 'Home', 'Sanskar Lalawat');
  }, [navigate]);

  useEffect(() => {
    const onNavigate = () => setRoute(getRoute());
    window.addEventListener('popstate', onNavigate);
    window.addEventListener('app:navigate', onNavigate);
    return () => {
      window.removeEventListener('popstate', onNavigate);
      window.removeEventListener('app:navigate', onNavigate);
    };
  }, []);

  // Keep title / description / canonical in sync with the active route.
  useEffect(() => {
    const project = route.page === 'project' ? getProjectBySlug(route.slug) : null;
    applySeo(seoForRoute(route, project));
  }, [route]);
  
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

  // Single return tree so PageTransition survives route swaps mid-animation.
  let pageContent;
  if (route.page === 'projects') {
    pageContent = <AllProjects onOpenProject={openProject} onBack={goHome} />;
  } else if (route.page === 'about') {
    pageContent = <AboutPage />;
  } else if (route.page === 'project') {
    pageContent = (
      <ProjectDetail
        slug={route.slug}
        onBack={openAllProjects}
        onOpenProject={openProject}
      />
    );
  } else pageContent = (
    <>
      {loading && (
        <Loader
          duration={3200}
          onExitStart={() => setHomeRevealed(true)}
          onFinish={() => setLoading(false)}
        />
      )}

      {(homeRevealed || !loading) && (
        <div ref={containerRef} className="bg-white text-black min-h-screen font-sans">
          <Hero
            heroRef={heroRef}
          />

          <Projects
            projectsRef={projectsRef}
            setActiveProject={setActiveProject}
            onViewAll={openAllProjects}
            onOpenProject={openProject}
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

  return (
    <>
      <Header
        onHome={goHome}
        onProjects={openAllProjects}
        onAbout={openAbout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {pageContent}
      <PageTransition transition={transition} onDone={handleTransitionDone} />
    </>
  );
};

export default App;