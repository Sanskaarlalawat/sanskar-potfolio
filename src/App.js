import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import Loader from './components/Loader';
import TunnelAnimation from './components/TunnelAnimation';

// Recommendations Component - Integrated Directly
const Recommendations = ({ sectionRef }) => {
  const wrapperRef = useRef(null);
  const recommendationsSectionRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const reviews = [
    {
      title: "Outstanding\nCreative Work",
      number: "01",
      text: "Working with this freelancer was an absolute game-changer for our startup. Their creative vision and attention to detail transformed our entire brand identity.",
      clientInitials: "SM",
      clientName: "Sarah Mitchell",
      clientRole: "CEO, TechFlow Solutions"
    },
    {
      title: "Exceptional\nCommunication",
      number: "02",
      text: "Professional, responsive, and incredibly talented. They understood our complex requirements immediately and delivered beyond expectations.",
      clientInitials: "DL",
      clientName: "David Lopez",
      clientRole: "Creative Director, Pixel Studios"
    },
    {
      title: "Perfect\nExecution",
      number: "03",
      text: "A true professional who turns vague concepts into stunning visual experiences. The creativity and technical skill demonstrated was remarkable.",
      clientInitials: "AR",
      clientName: "Amanda Rodriguez",
      clientRole: "Marketing Manager, GrowthLab"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!recommendationsSectionRef.current || !wrapperRef.current || !sectionRef.current) return;

      const rect = recommendationsSectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const container = sectionRef.current.querySelector('[data-recommendations-container]');
      
      if (!container) return;

      // Calculate when section enters viewport
      const isBeforeSection = sectionTop > 0;
      const isAfterSection = sectionTop + sectionHeight < windowHeight;

      // Smooth transition zone (50px buffer)
      const transitionBuffer = 50;
      const isNearTop = sectionTop <= transitionBuffer && sectionTop > -transitionBuffer;
      const isNearBottom = (sectionTop + sectionHeight - windowHeight) <= transitionBuffer && 
                           (sectionTop + sectionHeight - windowHeight) > -transitionBuffer;

      if (isBeforeSection) {
        // Before reaching section
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.bottom = 'auto';
        container.style.left = '0';
        container.style.right = '0';
        container.style.willChange = 'auto';
        wrapperRef.current.style.transform = 'translateX(0)';
        setActiveCardIndex(0);
        return;
      }

      if (isAfterSection) {
        // After section - lock at bottom
        container.style.position = 'absolute';
        container.style.top = 'auto';
        container.style.bottom = '0';
        container.style.left = '0';
        container.style.right = '0';
        container.style.willChange = 'auto';
        
        // Keep cards at final position
        const totalCards = reviews.length;
        const cardWidth = window.innerWidth <= 480 ? 95 : 
                          window.innerWidth <= 768 ? 90 : 
                          window.innerWidth <= 1024 ? 73 : 65;
        const finalTranslateX = -cardWidth * (totalCards - 1);
        wrapperRef.current.style.transform = `translateX(${finalTranslateX}vw)`;
        setActiveCardIndex(totalCards - 1);
        return;
      }

      // Section is in viewport - apply sticky behavior
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.bottom = 'auto';
      container.style.left = '0';
      container.style.right = '0';
      
      // Enable GPU acceleration for smooth transitions
      if (isNearTop || isNearBottom) {
        container.style.willChange = 'transform, position';
      } else {
        container.style.willChange = 'transform';
      }

      // Calculate scroll progress within the section
      const scrollIntoSection = Math.abs(sectionTop);
      const maxScroll = sectionHeight - windowHeight;
      const progress = Math.min(1, Math.max(0, scrollIntoSection / maxScroll));

      // Calculate active card
      const totalCards = reviews.length;
      const cardProgress = progress * (totalCards - 1);
      const currentCardIndex = Math.min(totalCards - 1, Math.floor(cardProgress + 0.5));

      setActiveCardIndex(currentCardIndex);

      // Calculate horizontal translation
      const cardWidth = window.innerWidth <= 480 ? 95 : 
                        window.innerWidth <= 768 ? 90 : 
                        window.innerWidth <= 1024 ? 78 : 65;
      const translateX = -progress * cardWidth * (totalCards - 1);
      wrapperRef.current.style.transform = `translateX(${translateX}vw)`;
    };

    // Use requestAnimationFrame for smoother updates
    let rafId = null;
    const smoothScroll = () => {
      handleScroll();
      rafId = requestAnimationFrame(smoothScroll);
    };

    rafId = requestAnimationFrame(smoothScroll);

    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews.length]);

  return (
    <div ref={sectionRef} style={{ position: 'relative', width: '100%' }}>
      <div ref={recommendationsSectionRef} style={{ height: '300vh', position: 'relative' }}>
        <div data-recommendations-container style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100vh',
          background: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          zIndex: 10,
          padding: 'clamp(20px, 4vw, 40px)',
          overflow: 'hidden',
          boxSizing: 'border-box',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}>
          <h2 style={{
            position: 'absolute',
            top: 'clamp(20px, 4vh, 40px)',
            left: 'clamp(20px, 4vw, 40px)',
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.1)',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(-1px, -0.2vw, -2px)',
            zIndex: 5
          }}>
            Client Reviews
          </h2>
          
          <div ref={wrapperRef} style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(350px, 60vh, 500px)',
            maxWidth: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(15px, 3vw, 30px)',
            padding: '0 clamp(5%, 10vw, 15%)',
            transform: 'translateX(0)',
            willChange: 'transform'
          }}>
            {reviews.map((review, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  width: window.innerWidth <= 480 ? '90vw' : 
                         window.innerWidth <= 768 ? '85vw' : 
                         window.innerWidth <= 1024 ? '70vw' : '62vw',
                  height: '100%',
                  background: 'linear-gradient(180deg, #fff0ff 0%, #7f4ca5 100%)',
                  borderRadius: 'clamp(20px, 4vw, 32px)',
                  padding: 'clamp(25px, 5vw, 60px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                  overflow: 'hidden',
                  opacity: activeCardIndex === index ? 1 : 0.6,
                  transform: activeCardIndex === index ? 'scale(1)' : 'scale(0.95)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  border: activeCardIndex === index ? '2px solid #8A7AA3' : '2px solid #9A88B5',
                  boxShadow: activeCardIndex === index ? '0 25px 50px rgba(176, 159, 202, 0.3)' : 'none'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 'clamp(20px, 4vh, 40px)',
                  gap: 'clamp(10px, 2vw, 20px)'
                }}>
                  <h3 style={{
                    fontSize: 'clamp(22px, 5vw, 48px)',
                    fontWeight: 900,
                    lineHeight: 0.9,
                    color: '#2d1b3d',
                    textTransform: 'uppercase',
                    letterSpacing: 'clamp(-1px, -0.2vw, -2px)',
                    maxWidth: '65%',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-line'
                  }}>
                    {review.title}
                  </h3>
                  <div style={{
                    background: '#7f4ca5',
                    color: '#ffffff',
                    width: 'clamp(45px, 8vw, 60px)',
                    height: 'clamp(45px, 8vw, 60px)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(18px, 3vw, 24px)',
                    fontWeight: 900,
                    flexShrink: 0
                  }}>
                    {review.number}
                  </div>
                </div>
                
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    fontSize: 'clamp(14px, 2.5vw, 24px)',
                    lineHeight: 1.4,
                    color: '#2d1b3d',
                    fontWeight: 600,
                    marginBottom: 'clamp(25px, 5vh, 50px)',
                    maxWidth: '100%'
                  }}>
                    {review.text}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(12px, 2.5vw, 24px)',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      width: 'clamp(50px, 10vw, 80px)',
                      height: 'clamp(50px, 10vw, 80px)',
                      borderRadius: 'clamp(16px, 3vw, 24px)',
                      background: '#7f4ca5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'clamp(18px, 3.5vw, 28px)',
                      fontWeight: 900,
                      color: '#ffffff',
                      border: '2px solid #7f4ca5',
                      flexShrink: 0
                    }}>
                      {review.clientInitials}
                    </div>
                    <div style={{
                      flex: 1,
                      minWidth: '150px'
                    }}>
                      <h3 style={{
                        fontSize: 'clamp(16px, 2.5vw, 24px)',
                        fontWeight: 900,
                        marginBottom: 'clamp(4px, 1vh, 8px)',
                        color: '#2d1b3d',
                        textTransform: 'uppercase',
                        letterSpacing: 'clamp(-0.5px, -0.1vw, -1px)'
                      }}>
                        {review.clientName}
                      </h3>
                      <p style={{
                        color: '#4a2f5e',
                        fontSize: 'clamp(13px, 2vw, 16px)',
                        fontWeight: 600,
                        margin: 0
                      }}>
                        {review.clientRole}
                      </p>
                    </div>
                    <div style={{
                      background: '#7f4ca5',
                      padding: 'clamp(8px, 1.5vw, 12px) clamp(14px, 2.5vw, 20px)',
                      borderRadius: '50px',
                      display: 'flex',
                      gap: 'clamp(2px, 0.5vw, 4px)'
                    }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{
                          color: '#ffffff',
                          fontSize: 'clamp(14px, 2vw, 18px)'
                        }}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: 'clamp(30px, 5vh, 60px)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 'clamp(8px, 1.5vw, 12px)',
            zIndex: 20
          }}>
            {reviews.map((_, index) => (
              <div
                key={index}
                style={{
                  width: 'clamp(10px, 1.5vw, 12px)',
                  height: 'clamp(10px, 1.5vw, 12px)',
                  borderRadius: '50%',
                  background: activeCardIndex === index ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                  transition: 'all 0.3s ease',
                  border: activeCardIndex === index ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.6)',
                  transform: activeCardIndex === index ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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

          {/* Client Recommendations Section - Integrated Directly */}
          <Recommendations sectionRef={reviewsRef} />

          <About aboutRef={aboutRef} />

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