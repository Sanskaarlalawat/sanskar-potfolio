import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { ExternalLink, Zap, Globe, Database, Smartphone } from "lucide-react";

const Projects = () => {
  const stackAreaRef = useRef(null);
  const rightWrapperRef = useRef(null);
  const leftWrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const heroTextRef = useRef(null);
  const leftBottomTextRef = useRef(null);
  const rightBottomTextRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mode, setMode] = useState("top"); // 'top' | 'fixed' | 'bottom'
  const [isInitialized, setIsInitialized] = useState(false);
  const [textScrollProgress, setTextScrollProgress] = useState(0);

  const projects = [
    {
      id: 1,
      title: "AI Dashboard",
      subtitle: "Machine Learning Platform",
      description: "A comprehensive AI-powered dashboard that analyzes user behavior and provides intelligent insights for business growth.",
      category: "Web Application",
      tags: ["React", "Python", "TensorFlow"],
      bgColor: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
      icon: <Database className="w-8 h-8" />
    },
    {
      id: 2,
      title: "E-Commerce Mobile",
      subtitle: "Cross-Platform Shopping App",
      description: "A modern mobile shopping experience with AR try-on features and personalized recommendations.",
      category: "Mobile App",
      tags: ["React Native", "Node.js", "Stripe"],
      bgColor: "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",
      icon: <Smartphone className="w-8 h-8" />
    },
    {
      id: 3,
      title: "SaaS Analytics",
      subtitle: "Business Intelligence Tool",
      description: "Advanced analytics platform helping businesses track KPIs and generate reports.",
      category: "SaaS Platform",
      tags: ["Vue.js", "Django", "PostgreSQL"],
      bgColor: "linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)",
      icon: <Zap className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Social Platform",
      subtitle: "Community Hub",
      description: "Next-generation social platform with real-time messaging and community features.",
      category: "Social Network",
      tags: ["Next.js", "GraphQL", "Redis"],
      bgColor: "linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)",
      icon: <Globe className="w-8 h-8" />
    }
  ];

  // Enhanced text animation function - letter by letter
  const animateTextLetters = (progress) => {
    // Animate main hero text
    const heroText = heroTextRef.current;
    if (heroText) {
      const letters = heroText.querySelectorAll('.letter');
      if (letters.length) {
        const totalLetters = letters.length;
        const letterProgress = progress * totalLetters;

        letters.forEach((letter, index) => {
          const letterStart = index;
          const letterEnd = index + 1;
          
          let color = '#202327ff'; // dark grey
          
          if (letterProgress >= letterEnd) {
            color = '#ffffff'; // white
          } else if (letterProgress > letterStart) {
            const localProgress = letterProgress - letterStart;
            const darkGrey = [75, 85, 99];
            const white = [255, 255, 255];
            
            const r = Math.round(darkGrey[0] + (white[0] - darkGrey[0]) * localProgress);
            const g = Math.round(darkGrey[1] + (white[1] - darkGrey[1]) * localProgress);
            const b = Math.round(darkGrey[2] + (white[2] - darkGrey[2]) * localProgress);
            
            color = `rgb(${r}, ${g}, ${b})`;
          }
          
          letter.style.color = color;
          letter.style.transition = 'color 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        });
      }
    }

    // Animate left bottom text
    const leftBottomText = leftBottomTextRef.current;
    if (leftBottomText) {
      const letters = leftBottomText.querySelectorAll('.letter');
      if (letters.length) {
        const totalLetters = letters.length;
        const letterProgress = Math.max(0, (progress - 0.3) * 1.4) * totalLetters; // Start later, faster

        letters.forEach((letter, index) => {
          const letterStart = index;
          const letterEnd = index + 1;
          
          let color = '#202327ff'; // grey-500 (starting color)
          
          if (letterProgress >= letterEnd) {
            color = '#ffffff'; // white
          } else if (letterProgress > letterStart) {
            const localProgress = letterProgress - letterStart;
            const grey = [107, 114, 128];
            const white = [255, 255, 255];
            
            const r = Math.round(grey[0] + (white[0] - grey[0]) * localProgress);
            const g = Math.round(grey[1] + (white[1] - grey[1]) * localProgress);
            const b = Math.round(grey[2] + (white[2] - grey[2]) * localProgress);
            
            color = `rgb(${r}, ${g}, ${b})`;
          }
          
          letter.style.color = color;
          letter.style.transition = 'color 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        });
      }
    }

    // Animate right bottom text
    const rightBottomText = rightBottomTextRef.current;
    if (rightBottomText) {
      const letters = rightBottomText.querySelectorAll('.letter');
      if (letters.length) {
        const totalLetters = letters.length;
        const letterProgress = Math.max(0, (progress - 0.5) * 2) * totalLetters; // Start even later, fastest

        letters.forEach((letter, index) => {
          const letterStart = index;
          const letterEnd = index + 1;
          
          let color = '#6b7280'; // grey-500 (starting color)
          
          if (letterProgress >= letterEnd) {
            color = '#ffffff'; // white
          } else if (letterProgress > letterStart) {
            const localProgress = letterProgress - letterStart;
            const grey = [107, 114, 128];
            const white = [255, 255, 255];
            
            const r = Math.round(grey[0] + (white[0] - grey[0]) * localProgress);
            const g = Math.round(grey[1] + (white[1] - grey[1]) * localProgress);
            const b = Math.round(grey[2] + (white[2] - grey[2]) * localProgress);
            
            color = `rgb(${r}, ${g}, ${b})`;
          }
          
          letter.style.color = color;
          letter.style.transition = 'color 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        });
      }
    }
  };

  // Wrap text in spans for letter-by-letter animation
  const wrapLettersInSpans = (text, startingColor = '#4b5563') => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="letter inline-block" 
        style={{color: startingColor}}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // rotate/fly-away logic (safe checks) - optimized for smoothness
  const rotateCards = (cards) => {
    if (!cards || !cards.length) return;
    let angle = 0;
    const baseRotation = -8;
    const total = cards.length;
    
    // Use transform3d for hardware acceleration
    for (let i = 0; i < total; i++) {
      const card = cards[i];
      if (!card || !(card instanceof HTMLElement)) continue;
      try {
        if (card.classList.contains("away")) {
          card.style.transform = `translate3d(0, -120vh, 0) rotateZ(-48deg) scale3d(0.8, 0.8, 1)`;
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
        } else {
          const scale = Math.max(0.84, 1 - i * 0.02);
          card.style.transform = `translate3d(0, 0, 0) rotateZ(${angle}deg) scale3d(${scale}, ${scale}, 1)`;
          card.style.opacity = "1";
          card.style.pointerEvents = "auto";
          card.style.zIndex = `${1000 + (total - i)}`;
          angle += baseRotation;
        }
        // Use longer transition for smoother animation
        card.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
      } catch (e) {
        // ignore single-card failures
        continue;
      }
    }
  };

  // Force scroll to top on component mount
  useLayoutEffect(() => {
    // Reset scroll position on page load/refresh
    window.scrollTo(0, 0);
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      rotateCards(cardRefs.current.filter(Boolean));
      setIsInitialized(true);
      // Initialize text animation
      animateTextLetters(0);
    }, 50);
  }, []);

  useEffect(() => {
    if (!stackAreaRef.current || !isInitialized) return;
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      const stackArea = stackAreaRef.current;
      if (!stackArea) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Throttle scroll updates for smoother performance
      if (Math.abs(scrollTop - lastScrollY) < 1) return;
      lastScrollY = scrollTop;

      const stackRect = stackArea.getBoundingClientRect();
      const stackTopDoc = stackRect.top + scrollTop;
      const stackHeight = stackArea.offsetHeight;
      const windowHeight = window.innerHeight;

      // Text gradient animation progress - enhanced for letter-by-letter effect with smoother progress
      const heroHeight = windowHeight;
      const textProgress = Math.min(1, Math.max(0, scrollTop / (heroHeight * 1.5))); // Increased multiplier for smoother progression
      setTextScrollProgress(textProgress);
      
      // Apply letter-by-letter animation
      animateTextLetters(textProgress);

      // compute start and end for "fixed" zone
      const start = stackTopDoc;
      const end = stackTopDoc + Math.max(0, stackHeight - windowHeight);

      // progress 0..1 with smoother interpolation
      const maxScroll = Math.max(1, end - start);
      const scrollWithinStack = scrollTop - start;
      const progress = Math.max(0, Math.min(1, scrollWithinStack / maxScroll));
      setScrollProgress(progress);

      // determine overall mode and set once
      if (scrollTop < start) {
        setMode("top");
      } else if (scrollTop >= start && scrollTop <= end) {
        setMode("fixed");
      } else {
        setMode("bottom");
      }

      // decide which cards fly away based on thresholds with smoother transitions
      const cards = cardRefs.current.filter((c) => c && c instanceof HTMLElement);
      if (cards.length) {
        const totalCards = cards.length;
        const cardThreshold = maxScroll / Math.max(1, totalCards);
        
        // Add hysteresis to prevent flickering
        const hysteresis = cardThreshold * 0.1;
        
        for (let i = 0; i < totalCards; i++) {
          const card = cards[i];
          if (!card) continue;
          const thresholdForCard = cardThreshold * (i + 1);
          
          if (scrollWithinStack > thresholdForCard + hysteresis) {
            card.classList.add("away");
          } else if (scrollWithinStack < thresholdForCard - hysteresis) {
            card.classList.remove("away");
          }
        }
        rotateCards(cards);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // run once to set initial state
    handleScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isInitialized]);

  // compute wrapper style (used for both left & right wrappers)
  const computeWrapperStyle = (isLeft = false) => {
    const stackEl = stackAreaRef.current;
    if (!stackEl) return {};
    const stackHeight = stackEl.offsetHeight || 0;
    const windowHeight = window.innerHeight || 0;

    const baseStyle = {
      width: "50%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: isLeft ? "flex-start" : "center",
      paddingLeft: isLeft ? "3rem" : undefined,
      paddingRight: !isLeft ? "3rem" : undefined,
      // Add will-change for better performance
      willChange: "transform, position",
      // Use transform3d for hardware acceleration
      transform: "translate3d(0, 0, 0)"
    };

    if (mode === "top") {
      return {
        ...baseStyle,
        position: "absolute",
        left: isLeft ? 0 : undefined,
        right: isLeft ? undefined : 0,
        top: 0,
        zIndex: 20
      };
    } else if (mode === "fixed") {
      return {
        ...baseStyle,
        position: "fixed",
        left: isLeft ? 0 : undefined,
        right: isLeft ? undefined : 0,
        top: 0,
        zIndex: 999
      };
    } else { // bottom
      const top = Math.max(0, stackHeight - windowHeight);
      return {
        ...baseStyle,
        position: "absolute",
        left: isLeft ? 0 : undefined,
        right: isLeft ? undefined : 0,
        top: `${top}px`,
        zIndex: 20
      };
    }
  };

  const leftStyle = computeWrapperStyle(true);
  const rightStyle = computeWrapperStyle(false);

  const heroText = "What we put on camera has weight. Yet faces with lived experience are still overlooked. We exists to change that. We represent bold faces with white hair, albinism, and striking contrast.";
  const heroSubtext = "Not trends—truth.";
  const leftBottomText = "";
  const rightBottomText = "Our white hair campaign casts models with presence. Real people. No retouching. No sameness.";

  return (
    <section className="relative bg-black overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .project-card { 
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1); 
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        body { overflow-x: hidden; background: black; }
        html { scroll-behavior: auto; }
        .letter { 
          display: inline-block; 
          will-change: color;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .bebas-font { font-family: 'Bebas Neue', sans-serif; }
        
        /* Optimize smooth scrolling performance */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Hardware acceleration for better performance */
        .smooth-transform {
          transform: translate3d(0, 0, 0);
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
      
      {/* HERO - Dark Design with Enhanced Letter Animation */}
      <div className="h-screen flex items-center justify-center bg-black relative overflow-hidden smooth-transform">
        {/* Background blur effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-800 rounded-full blur-3xl opacity-30"></div>
        </div>

        {/* Main content with animated text - full width left aligned */}
        <div className="w-full relative z-10 pl-8 pr-16 smooth-transform">
          <h1 
            ref={heroTextRef}
            className="bebas-font text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-normal mb-12 leading-none text-left max-w-none uppercase tracking-wide smooth-transform"
          >
            {wrapLettersInSpans(heroText)}{" "}
            <span 
              className="text-gray-500 font-normal transition-opacity duration-700 ease-out" 
              style={{ opacity: Math.max(0, (textScrollProgress - 0.8) * 5) }}
            >
              {heroSubtext}
            </span>
          </h1>
        </div>

        {/* Bottom content with animated text */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end smooth-transform">
          <div 
            ref={leftBottomTextRef}
            className="bebas-font text-lg md:text-xl leading-relaxed max-w-sm uppercase tracking-wide"
          >
            {wrapLettersInSpans(leftBottomText, '#6b7280')}
          </div>
          <div 
            ref={rightBottomTextRef}
            className="bebas-font text-lg md:text-xl leading-relaxed max-w-sm text-right uppercase tracking-wide"
          >
            {wrapLettersInSpans(rightBottomText, '#6b7280')}
          </div>
        </div>
      </div>

      {/* STACK AREA - Dark theme */}
      <div className="relative bg-black">
        <div
          ref={stackAreaRef}
          className="w-full relative bg-black"
          style={{ height: `${50 + projects.length * 60}vh` }}
        >
          {/* LEFT wrapper controlled by JS */}
          <div ref={leftWrapperRef} style={leftStyle} className="smooth-transform">
            <div style={{ maxWidth: 560 }}>
              <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">Our Projects</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Each project represents a unique challenge solved with innovative thinking, cutting-edge technology, and meticulous attention to detail. Scroll to explore our featured work.
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 ease-out flex items-center gap-2 transform hover:scale-105">
                View All Projects <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RIGHT wrapper controlled by JS */}
          <div ref={rightWrapperRef} style={rightStyle} className="smooth-transform">
            <div style={{ width: 400, height: 480, position: "relative" }}>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="project-card absolute inset-0 w-96 h-[30rem] rounded-3xl shadow-2xl cursor-pointer hover:scale-105"
                  style={{ 
                    background: project.bgColor, 
                    transformOrigin: "center bottom",
                    transform: "translate3d(0, 0, 0)"
                  }}
                >
                  <div className="relative h-full p-8 flex flex-col justify-between text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-white/80 text-sm font-bold uppercase tracking-wider">{String(index + 1).padStart(2, "0")}</span>
                        <div className="text-white/90">{project.icon}</div>
                      </div>
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white/90 mb-3">{project.category}</span>
                      </div>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold mb-3 leading-tight">{project.title}</h3>
                      <p className="text-white/90 font-medium mb-4">{project.subtitle}</p>
                      <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                    </div>

                    <div className="relative z-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 2).map((tag, ti) => (
                          <span key={ti} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/90">{tag}</span>
                        ))}
                      </div>

                      <div className="flex items-center text-white font-semibold hover:text-white/80 transition-colors duration-300">
                        <span className="mr-2">View Case Study</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar removed */}
    </section>
  );
};

export default Projects;