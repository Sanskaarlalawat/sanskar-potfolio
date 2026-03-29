import React, { useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 120;

function getFramePath(index) {
  const frameNum = String(index + 1).padStart(3, "0");
  return `/sequence/ezgif-frame-${frameNum}.png`;
}

const Hero = ({ heroRef }) => {
  const containerRef = useRef(null);
  
  // -- Canvas Logic --
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);
  const intervalRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Get the actual container dimensions
    const container = canvas.parentElement;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    // Always update canvas dimensions to match container
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);

    // Ensure context is still valid after resize
    if (ctx.isContextLost && ctx.isContextLost()) {
      console.warn("Canvas context lost, attempting to restore");
      return;
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspect > canvasAspect) {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgAspect;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspect;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    const images = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCountRef.current++;
        if (i === 0) {
          drawFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    // Use ResizeObserver for more reliable resize detection
    const resizeObserver = new ResizeObserver(() => {
      drawFrame(currentFrameRef.current);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also listen to window resize as fallback
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [drawFrame]);

  // Periodic check to ensure canvas stays properly sized
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // Only redraw if we have images loaded
      if (loadedCountRef.current > 0) {
        drawFrame(currentFrameRef.current);
      }
    }, 30000); // Check every 30 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [drawFrame]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.round(latest);
    if (index !== currentFrameRef.current) {
      currentFrameRef.current = index;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(index);
      });
    }
  });

  // -- Overlay Logic --
  // Section 1: Fades in early, fades out between 30% and 40% of the scroll
  // Section 1: 0% – 33% of scroll
  const s1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.33], [0, 1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.33], [60, 0, 0, -80]);

  // Section 2: 33% – 66% of scroll
  const s2Opacity = useTransform(scrollYProgress, [0.33, 0.40, 0.58, 0.66], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.33, 0.40, 0.58, 0.66], [60, 0, 0, -60]);

  // Section 3: 66% – 100% of scroll
  const s3Opacity = useTransform(scrollYProgress, [0.66, 0.73, 0.93, 1], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.66, 0.73, 0.93, 1], [60, 0, 0, -60]);

  return (
    <section ref={heroRef} className="relative bg-[#121212]" style={{ fontFamily: "'League Spartan', sans-serif" }}>
      {/* Container for both canvas and overlay */}
      <div ref={containerRef} className="relative h-[500vh]" id="scroll-sequence">
        
        {/* ScrollyCanvas Layer */}
        <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: "#121212" }}
          />
        </div>

        {/* Overlay Layer - Removed overflow-hidden to fix sticky bug */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Section 1: Hero text - Center */}
          <motion.div
            style={{ opacity: s1Opacity, y: s1Y }}
            className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6"
          >
            <div className="text-center w-full max-w-4xl">
              <motion.div
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#c4f541] animate-pulse" />
                <span className="text-sm text-white/60 tracking-widest uppercase font-light">
                  Available for work
                </span>
              </motion.div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8"
                style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.02em" }}
              >
                <span className="block text-white">Sanskar</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Lalawat</span>
              </h1>

              <p className="text-xl sm:text-xl md:text-2xl text-white/50 font-light tracking-wide max-w-xl mx-auto">
                Creative Developer
              </p>

              <div className="mt-10 flex items-center justify-center gap-3">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
                <span className="text-xs text-white/30 tracking-[0.3em] uppercase">Scroll to explore</span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
              </div>

              <motion.div 
                className="mt-6 flex justify-center"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/30">
                  <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Section 2: New paragraph - appears after Sanskar Lalawat disappears */}
          <motion.div
            style={{ opacity: s2Opacity, y: s2Y }}
            className="sticky top-0 h-[100dvh] w-full flex flex-col items-start justify-center px-6 sm:px-10 md:px-16"
          >
            <div className="w-full max-w-4xl text-left">
              <p
                className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-white/90 font-light leading-[1.1] tracking-tight"
              >
                Built entirely via <br /> generative AI prompting.
                <br />
                <span className="text-white/40 text-2xl sm:text-2xl md:text-3xl mt-4 block leading-snug tracking-normal">
                  Showcasing advanced prompt engineering & intelligent automation.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Section 3: New paragraph - appears after Section 2 disappears, right-aligned */}
          <motion.div
            style={{ opacity: s3Opacity, y: s3Y }}
            className="sticky top-0 h-[100dvh] w-full flex flex-col items-end justify-center px-6 sm:px-10 md:px-16"
          >
            <div className="w-full max-w-3xl text-right">
              <p
                className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-white/90 font-light leading-[1.1] tracking-tight"
              >
                An AI/ML Engineer driven by bold creativity.
                <br />
                <span className="text-white/40 text-2xl sm:text-2xl md:text-3xl mt-4 block leading-snug tracking-normal">
                  Pushing the boundaries of artificial intelligence to build visionary experiences.
                </span>
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;