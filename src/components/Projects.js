import React, { useRef, useEffect, useState } from "react";
import FinderProjects from "./FinderProjects";
import projectsData from "../data/projects";

const Projects = ({ projectsRef, onViewAll, onOpenProject }) => {
  const heroTextRef = useRef(null);
  const rightBottomTextRef = useRef(null);
  const introRef = useRef(null);

  const [textScrollProgress, setTextScrollProgress] = useState(0);

  const animateTextLetters = (progress) => {
    const heroText = heroTextRef.current;
    if (heroText) {
      const letters = heroText.querySelectorAll(".letter");
      if (letters.length) {
        const totalLetters = letters.length;
        const letterProgress = progress * totalLetters;
        letters.forEach((letter, index) => {
          const letterStart = index;
          const letterEnd = index + 1;
          let color = "#202327ff";
          if (letterProgress >= letterEnd) {
            color = "#ffffff";
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
          letter.style.transition = "color 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";
        });
      }
    }

    const rightBottomText = rightBottomTextRef.current;
    if (rightBottomText) {
      const letters = rightBottomText.querySelectorAll(".letter");
      if (letters.length) {
        const totalLetters = letters.length;
        const letterProgress = Math.max(0, (progress - 0.5) * 2) * totalLetters;
        letters.forEach((letter, index) => {
          const letterStart = index;
          const letterEnd = index + 1;
          let color = "#6b7280";
          if (letterProgress >= letterEnd) {
            color = "#ffffff";
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
          letter.style.transition = "color 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";
        });
      }
    }
  };

  const wrapLettersInSpans = (text, startingColor = "#4b5563") => {
    return text.split("").map((char, index) =>
      char === " " ? (
        <span key={index} className="letter" style={{ color: startingColor }}>{' '}</span>
      ) : (
        <span key={index} className="letter inline-block" style={{ color: startingColor }}>{char}</span>
      )
    );
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      let textProgress = 0;
      if (introRef.current) {
        const introRect = introRef.current.getBoundingClientRect();
        const startOffset = windowHeight * 0.8;
        const distanceToAnimate = windowHeight * 0.9;
        textProgress = (startOffset - introRect.top) / distanceToAnimate;
        textProgress = Math.min(1, Math.max(0, textProgress));
      }
      setTextScrollProgress(textProgress);
      animateTextLetters(textProgress);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const heroText =
    "AI systems that understand context, generate insight, and automate the complex — engineered to work in the real world.";
  const heroSubtext = "Built to perform.";
  const rightBottomText =
    "Prompt engineering, vector databases, real-time inference — the full stack of modern AI, shipped end to end.";

  return (
    <section ref={projectsRef} className="relative bg-black overflow-hidden">
      <style>{`
        body { overflow-x: hidden; background: black; }
        html { scroll-behavior: auto; }
        .letter { display: inline-block; will-change: color; backface-visibility: hidden; }
        .bebas-font { font-family: 'Space Grotesk', sans-serif; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .smooth-transform { transform: translate3d(0, 0, 0); will-change: transform; backface-visibility: hidden; }
      `}</style>

      {/* ── HERO ── */}
      <div
        ref={introRef}
        className="h-screen flex items-center justify-center bg-black relative overflow-hidden smooth-transform"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-800 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="w-full relative z-10 px-4 sm:px-6 md:px-8 lg:pl-8 lg:pr-16 smooth-transform">
          <h1
            ref={heroTextRef}
            className="bebas-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-normal mb-8 sm:mb-10 md:mb-12 leading-none text-left uppercase tracking-wide smooth-transform"
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
          <div className="bebas-font text-base sm:text-lg md:text-xl leading-relaxed max-w-sm uppercase tracking-wide" />
          <div
            ref={rightBottomTextRef}
            className="bebas-font text-base sm:text-lg md:text-xl leading-relaxed max-w-sm sm:text-right uppercase tracking-wide"
          >
            {wrapLettersInSpans(rightBottomText, "#6b7280")}
          </div>
        </div>
      </div>

      {/* ── FINDER SHOWCASE ── */}
      <div className="relative bg-black py-16 sm:py-24">
        <div className="text-center mb-10 sm:mb-14 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-gray-600 text-xs font-mono uppercase tracking-widest">
              Selected Work
            </span>
            <span className="text-gray-700 text-xs font-mono">—</span>
            <span className="text-gray-500 text-xs font-mono">
              ({String(projectsData.length).padStart(2, "0")})
            </span>
          </div>
          <h2 className="bebas-font text-white uppercase leading-none text-4xl sm:text-5xl md:text-6xl">
            Projects
          </h2>
        </div>

        <FinderProjects onOpenProject={onOpenProject} />
      </div>
    </section>
  );
};

export default Projects;
