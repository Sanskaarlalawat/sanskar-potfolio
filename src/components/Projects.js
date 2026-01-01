import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import {
  Database,
  Zap,
  Eye,
  MessageCircle,
  UserCheck,
  Bot,
  ExternalLink
} from "lucide-react";

const Projects = () => {
  const stackAreaRef = useRef(null);
  const rightWrapperRef = useRef(null);
  const leftWrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const heroTextRef = useRef(null);
  const leftBottomTextRef = useRef(null);
  const rightBottomTextRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mode, setMode] = useState("top");
  const [isInitialized, setIsInitialized] = useState(false);
  const [textScrollProgress, setTextScrollProgress] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const projects = [
    {
      id: 1,
      title: "IAS SATHI",
      subtitle: "AI-Driven IAS Preparation Platform",
      description: "An end-to-end AI-powered platform for IAS aspirants featuring chatbot assistance, answer evaluation, OCR, speech-to-text, flowchart-based guidance, and test series.",
      category: "Web Application",
      tags: ["Python", "Django", "LLMs", "AWS"],
      bgColor: "linear-gradient(135deg, #85B9A5 0%, #7FA6A8 100%)",
      icon: <Database className="w-6 h-6 md:w-8 md:h-8" />
    },
    {
      id: 2,
      title: "NCERT AI Chatbot",
      subtitle: "Vector-Based Knowledge System",
      description: "GPT-powered chatbot using vector databases to answer NCERT-based UPSC queries with high contextual accuracy.",
      category: "AI System",
      tags: ["GPT-4o", "Vector DB", "Python"],
      bgColor: "linear-gradient(135deg, #7FA6A8 0%, #7A8FA6 100%)",
      icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />
    },
    {
      id: 3,
      title: "Object Detection System",
      subtitle: "Computer Vision Surveillance",
      description: "Large-scale object detection system deployed across 100+ locations using custom-trained models on 1000+ images.",
      category: "Computer Vision",
      tags: ["OpenCV", "OpenVINO", "Ultralytics"],
      bgColor: "linear-gradient(135deg, #7A8FA6 0%, #8B7FB8 100%)",
      icon: <Eye className="w-6 h-6 md:w-8 md:h-8" />
    },
    {
      id: 4,
      title: "WhatsApp Chat Analysis",
      subtitle: "NLP & Behavioral Insights",
      description: "NLP-based analytics tool extracting engagement patterns and user behavior from WhatsApp conversations.",
      category: "Data Science",
      tags: ["Python", "NLP", "ML"],
      bgColor: "linear-gradient(135deg, #8B7FB8 0%, #7C5AA3 100%)",
      icon: <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
    },
    {
      id: 5,
      title: "Face Recognition System",
      subtitle: "Real-Time CV Application",
      description: "Real-time face recognition system with 95% accuracy using deep learning and live camera integration.",
      category: "Computer Vision",
      tags: ["TensorFlow", "OpenCV"],
      bgColor: "linear-gradient(135deg, #7C5AA3 0%, #6D3B91 100%)",
      icon: <UserCheck className="w-6 h-6 md:w-8 md:h-8" />
    },
    {
      id: 6,
      title: "Web Feature Extraction Bot",
      subtitle: "AI Automation Tool",
      description: "ChatGPT-powered bot that scrapes websites and extracts structured features in real time.",
      category: "AI Automation",
      tags: ["ChatGPT API", "Web Scraping"],
      bgColor: "linear-gradient(135deg, #6D3B91 0%, #5A2F78 100%)",
      icon: <Bot className="w-6 h-6 md:w-8 md:h-8" />
    }
  ];

  // Get device type
  const getDeviceType = () => {
    const width = windowSize.width;
    if (width < 640) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const deviceType = getDeviceType();
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  // Get card dimensions based on device
  const getCardDimensions = () => {
    if (isMobile) {
      return { width: 260, height: 300 };
    }
    if (isTablet) {
      return { width: 320, height: 440 };
    }
    return { width: 400, height: 480 };
  };

  const cardDimensions = getCardDimensions();

  // Enhanced text animation function
  const animateTextLetters = (progress) => {
    const heroText = heroTextRef.current;
    if (heroText) {
      const letters = heroText.querySelectorAll('.letter');
      if (letters.length) {
        const totalLetters = letters.length;
        const letterProgress = progress * totalLetters;

        letters.forEach((letter, index) => {
          const letterStart = index;
          const letterEnd = index + 1;
          
          let color = '#202327ff';
          
          if (letterProgress >= letterEnd) {
            color = '#ffffff';
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

    const leftBottomText = leftBottomTextRef.current;
    if (leftBottomText) {
      const letters = leftBottomText.querySelectorAll('.letter');
      if (letters.length) {
        const totalLetters = letters.length;
        const letterProgress = Math.max(0, (progress - 0.3) * 1.4) * totalLetters;

        letters.forEach((letter, index) => {
          const letterStart = index;
          const letterEnd = index + 1;
          
          let color = '#202327ff';
          
          if (letterProgress >= letterEnd) {
            color = '#ffffff';
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

    const rightBottomText = rightBottomTextRef.current;
    if (rightBottomText) {
      const letters = rightBottomText.querySelectorAll('.letter');
      if (letters.length) {
        const totalLetters = letters.length;
        const letterProgress = Math.max(0, (progress - 0.5) * 2) * totalLetters;

        letters.forEach((letter, index) => {
          const letterStart = index;
          const letterEnd = index + 1;
          
          let color = '#6b7280';
          
          if (letterProgress >= letterEnd) {
            color = '#ffffff';
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

  const rotateCards = (cards) => {
    if (!cards || !cards.length) return;
    let angle = 0;
    const baseRotation = isMobile ? -5 : isTablet ? -6 : -8;
    const verticalOffset = isMobile ? 15 : isTablet ? 20 : 25;
    const total = cards.length;
    
    for (let i = 0; i < total; i++) {
      const card = cards[i];
      if (!card || !(card instanceof HTMLElement)) continue;
      try {
        if (card.classList.contains("away")) {
          card.style.transform = `translate3d(0, -120vh, 0) rotateZ(-48deg) scale3d(0.8, 0.8, 1)`;
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
        } else {
          const scale = Math.max(0.85, 1 - i * 0.03);
          const translateY = i * verticalOffset;
          card.style.transform = `translate3d(0, 0, 0) rotateZ(${angle}deg) scale3d(${scale}, ${scale}, 1)`;
          card.style.opacity = "1";
          card.style.pointerEvents = "auto";
          card.style.zIndex = `${1000 + (total - i)}`;
          angle += baseRotation;
        }
        card.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
      } catch (e) {
        continue;
      }
    }
  };

  // Track window size
  useLayoutEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      rotateCards(cardRefs.current.filter(Boolean));
      setIsInitialized(true);
      animateTextLetters(0);
    }, 50);
  }, []);

  useEffect(() => {
    if (!stackAreaRef.current || !isInitialized || windowSize.width === 0) return;
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      const stackArea = stackAreaRef.current;
      if (!stackArea) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (Math.abs(scrollTop - lastScrollY) < 1) return;
      lastScrollY = scrollTop;

      const stackRect = stackArea.getBoundingClientRect();
      const stackTopDoc = stackRect.top + scrollTop;
      const stackHeight = stackArea.offsetHeight;
      const windowHeight = window.innerHeight;

      const heroHeight = windowHeight;
      const textProgress = Math.min(1, Math.max(0, scrollTop / (heroHeight * 1.5)));
      setTextScrollProgress(textProgress);
      
      animateTextLetters(textProgress);

      const start = stackTopDoc;
      const end = stackTopDoc + Math.max(0, stackHeight - windowHeight);

      const maxScroll = Math.max(1, end - start);
      const scrollWithinStack = scrollTop - start;
      const progress = Math.max(0, Math.min(1, scrollWithinStack / maxScroll));
      setScrollProgress(progress);

      if (scrollTop < start) {
        setMode("top");
      } else if (scrollTop >= start && scrollTop <= end) {
        setMode("fixed");
      } else {
        setMode("bottom");
      }

      const cards = cardRefs.current.filter((c) => c && c instanceof HTMLElement);
      if (cards.length) {
        const totalCards = cards.length;
        const cardThreshold = maxScroll / Math.max(1, totalCards);
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

    handleScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isInitialized, windowSize, isMobile, isTablet]);

  const computeWrapperStyle = (isLeft = false) => {
    const stackEl = stackAreaRef.current;
    if (!stackEl) return {};
    const stackHeight = stackEl.offsetHeight || 0;
    const windowHeight = window.innerHeight || 0;

    // Mobile & Tablet: Stack vertically
    if (isMobile || isTablet) {
      const baseStyle = {
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: isMobile ? "2rem 1.5rem 1rem" : "2.5rem 2rem 1.5rem",
        willChange: "transform, position",
        transform: "translate3d(0, 0, 0)"
      };

      if (isLeft) {
        // Left wrapper for mobile/tablet
        if (mode === "top") {
          return {
            ...baseStyle,
            position: "absolute",
            top: 0,
            left: 0,
            height: "45vh",
            zIndex: 20
          };
        } else if (mode === "fixed") {
          return {
            ...baseStyle,
            position: "fixed",
            top: 0,
            left: 0,
            height: "45vh",
            zIndex: 999
          };
        } else {
          const top = Math.max(0, stackHeight - windowHeight);
          return {
            ...baseStyle,
            position: "absolute",
            top: `${top}px`,
            left: 0,
            height: "45vh",
            zIndex: 20
          };
        }
      } else {
        // Right wrapper for mobile/tablet
        if (mode === "top") {
          return {
            ...baseStyle,
            position: "absolute",
            top: "50vh",
            left: 0,
            height: "45vh",
            zIndex: 20
          };
        } else if (mode === "fixed") {
          return {
            ...baseStyle,
            position: "fixed",
            top: "50vh",
            left: 0,
            height: "45vh",
            zIndex: 999
          };
        } else {
          const top = Math.max(0, stackHeight - windowHeight) + windowHeight * 0.5;
          return {
            ...baseStyle,
            position: "absolute",
            top: `${top}px`,
            left: 0,
            height: "45vh",
            zIndex: 20
          };
        }
      }
    }

    // Desktop: Side by side (original behavior)
    const baseStyle = {
      width: "50%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: isLeft ? "flex-start" : "center",
      paddingLeft: isLeft ? "3rem" : undefined,
      paddingRight: !isLeft ? "3rem" : undefined,
      willChange: "transform, position",
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
    } else {
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
        
        * {
          font-family: 'Bebas Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .smooth-transform {
          transform: translate3d(0, 0, 0);
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
      
      {/* HERO */}
      <div className="h-screen flex items-center justify-center bg-black relative overflow-hidden smooth-transform">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-800 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="w-full relative z-10 px-4 sm:px-6 md:px-8 lg:pl-8 lg:pr-16 smooth-transform">
          <h1 
            ref={heroTextRef}
            className="bebas-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-normal mb-8 sm:mb-10 md:mb-12 leading-none text-left max-w-none uppercase tracking-wide smooth-transform"
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

        <div className="absolute bottom-10 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 smooth-transform pb-16 sm:pb-0">
          <div 
            ref={leftBottomTextRef}
            className="bebas-font text-base sm:text-lg md:text-xl leading-relaxed max-w-sm uppercase tracking-wide"
          >
            {wrapLettersInSpans(leftBottomText, '#6b7280')}
          </div>
          <div 
            ref={rightBottomTextRef}
            className="bebas-font text-base sm:text-lg md:text-xl leading-relaxed max-w-sm sm:text-right uppercase tracking-wide"
          >
            {wrapLettersInSpans(rightBottomText, '#6b7280')}
          </div>
        </div>
      </div>

      {/* STACK AREA */}
      <div className="relative bg-black">
        <div
          ref={stackAreaRef}
          className="w-full relative bg-black"
          style={{ height: `${50 + projects.length * (isMobile ? 80 : isTablet ? 70 : 60)}vh` }}
        >
          {/* LEFT wrapper */}
          <div ref={leftWrapperRef} style={leftStyle} className="smooth-transform">
            <div className={`${isMobile || isTablet ? 'w-full text-center' : ''}`} style={{ maxWidth: isMobile || isTablet ? '100%' : 560 }}>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold text-white leading-tight mb-4 sm:mb-5 md:mb-6">Our Projects</h3>
              <p className="text-gray-400 text-base sm:text-lg md:text-2xl lg:text-3xlleading-relaxed mb-6 sm:mb-7 md:mb-8">
                Each project represents a unique challenge solved with innovative thinking, cutting-edge technology, and meticulous attention to detail. Scroll to explore our featured work.
              </p>
              {/* <button className="bg-white text-black px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-200 transition-all duration-300 ease-out flex items-center gap-2 transform hover:scale-105 mx-auto lg:mx-0">
                View All Projects <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </button> */}
            </div>
          </div>

          {/* RIGHT wrapper */}
          <div ref={rightWrapperRef} style={rightStyle} className="smooth-transform">
            <div style={{ 
                width: cardDimensions.width, 
                height: cardDimensions.height, 
                position: "relative",
                paddingTop: isMobile ? '20px' : isTablet ? '30px' : '40px'
              }}>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="project-card absolute inset-0 rounded-2xl sm:rounded-3xl shadow-2xl cursor-pointer hover:scale-105"
                  style={{ 
                    background: project.bgColor, 
                    transformOrigin: "center bottom",
                    transform: "translate3d(0, 0, 0)",
                    width: cardDimensions.width,
                    height: cardDimensions.height
                  }}
                >
                  <div className="relative h-full p-5 sm:p-6 md:p-8 flex flex-col justify-between text-gray-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-black rounded-full transform translate-x-12 sm:translate-x-14 md:translate-x-16 -translate-y-12 sm:-translate-y-14 md:-translate-y-16" />
                      <div className="absolute bottom-0 left-0 w-20 sm:w-22 md:w-24 h-20 sm:h-22 md:h-24 bg-black rounded-full transform -translate-x-10 sm:-translate-x-11 md:-translate-x-12 translate-y-10 sm:translate-y-11 md:translate-y-12" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <span className="text-gray-800 text-xs sm:text-sm font-bold uppercase tracking-wider">{String(index + 1).padStart(2, "0")}</span>
                        <div className="text-gray-900">{project.icon}</div>
                      </div>
                      <div className="mb-3 sm:mb-4">
                        <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-black/20 rounded-full text-xs font-medium text-gray-900 mb-2 sm:mb-3">{project.category}</span>
                      </div>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 leading-tight text-gray-900">{project.title}</h3>
                      <p className="text-gray-800 font-medium mb-3 sm:mb-4 text-sm sm:text-base">{project.subtitle}</p>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">{project.description}</p>
                    </div>

                    <div className="relative z-10">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {project.tags.slice(0, 2).map((tag, ti) => (
                          <span key={ti} className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-black/20 rounded-full text-xs font-medium text-gray-900">{tag}</span>
                        ))}
                      </div>

                      <div className="flex items-center text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">
                        <span className="mr-2">View Case Study</span>
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-black/20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;