import React, { useEffect, useRef, useMemo } from 'react';
import { Mail, Linkedin, Phone, MessageCircle } from "lucide-react";

const About = ({ aboutRef: aboutRefProp }) => {
  const aboutRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const svgContainerRef = useRef(null);
  const sectionsRef = useRef([]);
  const contentsRef = useRef([]);
  const riverFlowRef = useRef(null);
  const heroRef = useRef(null);

  const careerJourney = useMemo(() => [
    {
      id: 1,
      logo: "VS",
      company: "Vyza Solutions",
      role: "AI Automation Intern",
      period: "Jul 2023 – Dec 2023 · 6 months",
      description:
        "Worked as an AI Automation Intern focusing on data analysis, NLP, and machine learning solutions. Contributed to real-world AI projects and gained hands-on experience in model building, insights generation, and automation.",
      projects: [
        {
          name: "WhatsApp Chat Analysis",
          desc:
            "Revamped WhatsApp chat analysis using Python, NLP, and ML. Extracted user behavior insights, engagement patterns, and generated visual analytics to improve communication understanding."
        }
      ],
      tech: ["Python", "NLP", "Machine Learning", "Data Analysis", "Matplotlib", "Pandas"]
    },
    {
      id: 2,
      logo: "AC",
      company: "Aimpathy Consulting",
      role: "Data & Analytics intern",
      period: "Aug 2023 – Dec 2023 · 4 months",
      description:
        "Worked on HR data handling and analytics to improve recruitment efficiency and decision-making processes.",
      projects: [
        {
          name: "HR Data Cleaning & Analysis",
          desc:
            "Handled employee data extraction, cleaning, and analysis to improve data quality and support strategic HR decisions."
        }
      ],
      tech: ["Python", "Data Cleaning", "Excel", "Analytics"]
    },
    {
      id: 3,
      logo: "KI",
      company: "Karai Innovation",
      role: "AI/ML Engineer",
      period: "Jan 2024 – April 2025 · 1 yr 4 months",
      description:
        "Worked as an AI/ML Engineer building intelligent education-focused systems. Developed AI chatbots, vector-based knowledge systems, and deployed scalable solutions.",
      projects: [
        {
          name: "IAS SATHI Platform",
          desc:
            "Contributed to the IAS SATHI platform by implementing answer evaluation logic, OCR pipelines, AI-assisted feedback, and scalable backend services."
        },
        {
          name: "Answer Evaluation System (OCR + AI)",
          desc:
            "Designed and implemented an AI-based answer evaluation system for students. Used OCR to digitize handwritten answers, automatically detect incorrect words, visually highlight errors by circling them, and generate structured evaluation graphs for performance analysis."
        },
        {
          name: "Graph-Based Performance Analysis",
          desc:
            "Built automated graph generation for evaluated answers, providing clear visual insights into strengths, weaknesses, and scoring distribution to help students improve answer-writing skills."
        },
        {
          name: "NCERT AI Chatbot",
          desc:
            "Developed an AI chatbot using GPT-4o and vector databases to answer NCERT-based IAS preparation queries with high contextual accuracy."
        }
      ],
      tech: [
        "Python",
        "Django",
        "OCR",
        "Computer Vision",
        "LLMs",
        "Vector Databases",
        "OpenAI",
        "Graph Generation",
        "AWS",
        "Docker"
      ]
    },
    {
      id: 4,
      logo: "SB",
      company: "Siksha Bhavishayan Private Limited",
      role: "Technical Head",
      period: " April 2025 – Present · Current Role",
      description:
        "Leading the complete technical operations for an education and counseling platform. Managing the technical team, driving innovation, handling deployments, and building AI-powered systems for counseling and student analytics.",
      projects: [
        {
          name: "Team & Technical Management",
          desc:
            "Managing developers, assigning tasks, reviewing work, and driving innovation-focused technical decisions across the platform."
        },
        {
          name: "Cloud Deployments & Infrastructure",
          desc:
            "Handled end-to-end deployments using AWS and VPS servers, ensuring scalability, performance, and reliability of production systems."
        },
        {
          name: "AI Chatbots & Summarization",
          desc:
            "Built AI chatbots and summarization systems to assist students and counselors with intelligent, real-time insights."
        },
        {
          name: "AI Reports & Counseling Reports",
          desc:
            "Developed AI-generated academic and counseling reports using LLMs to deliver personalized insights and decision support."
        }
      ],
      tech: [
        "Python",
        "Django",
        "AI Chatbots",
        "AI Summarization",
        "LLMs",
        "AWS",
        "VPS",
        "Docker",
        "System Architecture",
        "Team Management"
      ]
    }
  ], []);


  useEffect(() => {
    // Only track mouse on non-touch devices to avoid mobile perf issues
    let handleMouseMove = null;
    let mouseListenerAdded = false;
    if (!('ontouchstart' in window)) {
      handleMouseMove = (e) => {
        const hero = heroRef.current;
        if (!hero) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        hero.style.setProperty('--mouse-x', `${xPos}px`);
        hero.style.setProperty('--mouse-y', `${yPos}px`);
      };
      window.addEventListener('mousemove', handleMouseMove);
      mouseListenerAdded = true;
    }

    class RiverFlow {
      constructor() {
        this.svgEl = svgRef.current;
        this.pathEl = pathRef.current;
        this.svgContainer = svgContainerRef.current;
        this.sections = sectionsRef.current.filter(Boolean);
        this.contents = contentsRef.current.filter(Boolean);
        this.aboutSection = aboutRef.current;

        if (!this.svgEl || !this.pathEl || !this.svgContainer || !this.aboutSection) return;

        this.tension = 0.6;
        this.anchorRatio = 0.7;
        this.buffer = 400;
        this.isLocked = false;
        this.rafId = null;
        this.resizeTimeout = null;
        this.init();
      }

      init() {
        this.contents.forEach((c, i) => c.classList.add(i % 2 === 0 ? 'left' : 'right'));
        this.updateMeasurements();
        this.buildPath();
        this.calculateSectionOffset();
        this.onScroll();
        window.addEventListener('scroll', this.throttledScroll, { passive: true });
        window.addEventListener('resize', this.debouncedResize);
      }

      throttledScroll = () => {
        if (!this.rafId) {
          this.rafId = requestAnimationFrame(() => {
            this.onScroll();
            this.rafId = null;
          });
        }
      };

      debouncedResize = () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => this.onResize(), 120);
      };

      calculateSectionOffset() {
        const rect = this.aboutSection.getBoundingClientRect();
        this.sectionStartOffset = rect.top + window.scrollY;
        this.sectionHeight = this.aboutSection.offsetHeight;
      }

      updateMeasurements() {
        this.windowW = window.innerWidth;
        this.windowH = window.innerHeight;
        this.pageH = document.documentElement.scrollHeight;
        this.totalH = this.pageH + this.buffer;
        this.anchorY = Math.round(this.windowH * this.anchorRatio);

        // scale parameters based on viewport width (cap at 1400 which is design width)
        const scale = Math.min(this.windowW, 1400) / 1400;
        this.baseX = 700; // center in viewBox coordinates
        this.maxAmp = Math.max(60, Math.round(350 * scale));
        this.segmentCount = Math.max(30, Math.floor(this.sections.length * 8 * Math.max(0.6, scale)));

        this.svgEl.setAttribute('viewBox', `0 0 1400 ${this.totalH}`);
        this.svgEl.style.height = `${this.totalH}px`;
      }

      buildNodes() {
        const nodes = [];
        const startY = Math.round(this.totalH * 0.03);
        const mountainPeakY = Math.round(this.totalH - this.totalH * 0.12);
        const step = (mountainPeakY - startY) / (this.segmentCount - 1);
        const endFadeStart = 0.85;

        for (let i = 0; i < this.segmentCount; i++) {
          const y = startY + i * step;
          const progress = i / (this.segmentCount - 1);
          const sectionIndex = Math.floor((y / this.totalH) * this.sections.length);
          const dirBias = sectionIndex % 2 === 0 ? 1 : -1;

          const wave = Math.sin(progress * Math.PI * this.sections.length * 0.5);
          const amplitude = this.maxAmp * (0.65 + Math.abs(wave) * 0.35);
          const smooth = Math.cos(progress * Math.PI * this.sections.length * 1.2) * 0.12;

          const endFade =
            progress > endFadeStart
              ? Math.pow(1 - (progress - endFadeStart) / (1 - endFadeStart), 2)
              : 1;

          const x = this.baseX + (dirBias * amplitude + smooth * this.maxAmp) * endFade;
          nodes.push({ x, y });
        }

        nodes[nodes.length - 1] = { x: this.baseX, y: mountainPeakY };
        nodes[0].x = this.baseX;
        return nodes;
      }

      catmullRomToBezier(points) {
        if (!points.length) return '';
        const d = [`M ${points[0].x},${points[0].y}`];
        const tension = (this.tension * 2) / 6;

        for (let i = 0; i < points.length - 1; i++) {
          const P0 = points[Math.max(0, i - 1)];
          const P1 = points[i];
          const P2 = points[i + 1];
          const P3 = points[Math.min(points.length - 1, i + 2)];

          d.push(
            `C ${P1.x + (P2.x - P0.x) * tension},${P1.y + (P2.y - P0.y) * tension}
              ${P2.x - (P3.x - P1.x) * tension},${P2.y - (P3.y - P1.y) * tension}
              ${P2.x},${P2.y}`
          );
        }
        return d.join(' ');
      }

      buildPath() {
        const d = this.catmullRomToBezier(this.buildNodes());
        this.pathEl.setAttribute('d', d);
        this.pathLen = this.pathEl.getTotalLength();
        this.pathEl.setAttribute('stroke-dasharray', this.pathLen);
        this.pathEl.setAttribute('stroke-dashoffset', this.pathLen);
      }

      onScroll() {
        const scrollY = window.scrollY;
        const rect = this.aboutSection.getBoundingClientRect();
        if (!rect) return;

        const scrollInSection = Math.max(0, scrollY - this.sectionStartOffset);
        const maxScroll = Math.max(1, this.sectionHeight - this.windowH);
        const progress = Math.min(scrollInSection / maxScroll, 1);

        if (progress >= 1) {
          const pos = this.pathEl.getPointAtLength(this.pathLen);
          const translateY = Math.round(this.anchorY - pos.y);
          this.svgContainer.style.cssText = `position:absolute; top:${this.sectionHeight - this.windowH}px; transform:translate3d(0,${translateY}px,0)`;
          this.pathEl.setAttribute('stroke-dashoffset', 0);
        } else {
          const drawn = this.pathLen * progress;
          const pos = this.pathEl.getPointAtLength(drawn);
          this.svgContainer.style.cssText = `position:fixed; top:0; transform:translate3d(0,${this.anchorY - pos.y}px,0)`;
          this.pathEl.setAttribute('stroke-dashoffset', this.pathLen - drawn);
        }

        const threshold = this.windowH * 0.78;
        this.contents.forEach(c =>
          c.classList.toggle('active', c.getBoundingClientRect().top < threshold)
        );
      }

      onResize() {
        this.updateMeasurements();
        this.buildPath();
        this.calculateSectionOffset();
        this.onScroll();
      }

      destroy() {
        cancelAnimationFrame(this.rafId);
        clearTimeout(this.resizeTimeout);
        window.removeEventListener('scroll', this.throttledScroll);
        window.removeEventListener('resize', this.debouncedResize);
      }
    }

    riverFlowRef.current = new RiverFlow();

    const mountain = document.querySelector('.mountain-reveal');
    let observer;

    if (mountain) {
      observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && mountain.classList.add('show'),
        { threshold: 0.6 }
      );
      observer.observe(mountain);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      riverFlowRef.current?.destroy();
      observer?.disconnect();
    };
  }, []);

  const handleContactClick = () => {
    window.open('mailto:sanskarlal23@gmail.com', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+919887033255', '_self');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700;900&display=swap');
        
        .river-flow-section { --primary: #208C8D; --primary-light: #2AA5A6; --bg: #FcFcF9; --text: #134252; --muted: #626C71;position: relative; overflow: hidden; background-image: url('/bg-career2.svg');background-size: cover; background-position: center; }
        .river-svg-container { position: fixed; top: 0; left: 0; width: 100%; pointer-events: none; z-index: 5; transform-origin: 0 0; will-change: transform; }
        .river-svg { width: 100%; height: auto; overflow: visible; display: block; }
        .river-path { fill: none; stroke: url(#riverGradient); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 4px 12px rgba(32,140,141,0.25)); }
        
        .river-header { 
          min-height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: flex-start; 
          text-align: left; 
          padding: 40px 80px; 
          position: relative;
          overflow: hidden;
        }
        
        .hero-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          opacity: 0.4;
          z-index: 1;
        }

        .contour-line {
          position: absolute;
          stroke: rgba(255, 255, 255, 0.08);
          fill: none;
          stroke-width: 1.5;
          animation: heroFloat 20s ease-in-out infinite;
        }

        .contour-line:nth-child(1) {
          top: 10%;
          left: -20%;
          width: 800px;
          height: 600px;
          animation-delay: 0s;
        }

        .contour-line:nth-child(2) {
          top: 30%;
          right: -10%;
          width: 700px;
          height: 500px;
          animation-delay: -5s;
        }

        .contour-line:nth-child(3) {
          bottom: 15%;
          left: 10%;
          width: 600px;
          height: 450px;
          animation-delay: -10s;
        }

        .contour-line:nth-child(4) {
          top: 50%;
          left: 30%;
          width: 500px;
          height: 400px;
          animation-delay: -15s;
        }

        @keyframes heroFloat {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(30px, -30px) rotate(5deg) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-3deg) scale(0.95);
          }
        }

        .hero-floating-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(125, 211, 192, 0.6);
          border-radius: 50%;
          animation: floatDot 8s ease-in-out infinite;
          z-index: 1;
        }

        .hero-floating-dot:nth-child(5) {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        .hero-floating-dot:nth-child(6) {
          top: 60%;
          right: 20%;
          animation-delay: -2s;
        }

        .hero-floating-dot:nth-child(7) {
          bottom: 30%;
          left: 25%;
          animation-delay: -4s;
        }

        .hero-floating-dot:nth-child(8) {
          top: 40%;
          right: 30%;
          animation-delay: -6s;
        }

        @keyframes floatDot {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.6;
          }
          25% {
            transform: translate(20px, -20px);
            opacity: 1;
          }
          50% {
            transform: translate(-15px, 15px);
            opacity: 0.4;
          }
          75% {
            transform: translate(15px, 10px);
            opacity: 0.8;
          }
        }

        .river-header > div {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          padding: 0;
        }
        
        .river-header h1 { 
          font-size: clamp(2rem, 5vw, 4.5rem); 
          font-weight: 900;
          line-height: 1.2;
          color: #e0e0e0;
          margin-bottom: 0;
          letter-spacing: -0.02em;
          font-family: 'Inter', sans-serif;
        }

        .hero-title-line {
          display: block;
          opacity: 0;
          transform: translateY(40px);
          animation: slideUp 1s ease-out forwards;
        }

        .hero-title-line:nth-child(1) {
          animation-delay: 0.1s;
        }

        .hero-title-line:nth-child(2) {
          animation-delay: 0.2s;
        }

        .hero-title-line:nth-child(3) {
          animation-delay: 0.3s;
        }

        .hero-title-line:nth-child(4) {
          animation-delay: 0.4s;
        }

        .hero-title-line:nth-child(5) {
          animation-delay: 0.5s;
        }

        .hero-title-line:nth-child(6) {
          animation-delay: 0.6s;
        }

        .hero-highlight {
          color: #7dd3c0;
          position: relative;
          display: inline-block;
        }

        .hero-highlight::after {
          content: '';
          position: absolute;
          bottom: 0.1em;
          left: 0;
          right: 0;
          height: 0.15em;
          background: #7dd3c0;
          opacity: 0.3;
          transform: scaleX(0);
          transform-origin: left;
          animation: underlineGrow 0.8s ease-out 0.8s forwards;
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes underlineGrow {
          to {
            transform: scaleX(1);
          }
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: heroFadeIn 1s ease-out 1.5s forwards;
          z-index: 10;
        }

        .hero-scroll-text {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
        }

        .hero-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent);
          animation: scrollLine 2s ease-in-out infinite;
        }

        @keyframes scrollLine {
          0%, 100% {
            transform: scaleY(1);
            opacity: 1;
          }
          50% {
            transform: scaleY(0.5);
            opacity: 0.3;
          }
        }

        @keyframes heroFadeIn {
          to {
            opacity: 1;
          }
        }
        
        .scroll-section { position: relative; min-height: 120vh; display: flex; align-items: center; padding: 120px 0; }
        .content-wrapper { position: relative; z-index: 20; width: 100%; display: flex; justify-content: center; }
        .content { width: 52%; padding: 32px; transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0; transform: translateY(40px); display: flex; align-items: flex-start; gap: 20px; }
        .content:hover { transform: translateY(-4px); }
        .content.left { margin-right: auto; text-align: left; flex-direction: row; }
        .content.right { margin-left: auto; text-align: right; flex-direction: row-reverse; }
        .content.active { opacity: 1; transform: translateY(0); }
        .company-logo { flex-shrink: 0; width: 80px; height: 80px; border-radius: 12px; background: linear-gradient(135deg, #7dd3c0 0%, #9ee5d6 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(125,211,192,0.3); font-size: 2rem; font-weight: 700; color: #1a1a1a; transition: transform 0.3s ease; }
        .content:hover .company-logo { transform: scale(1.05) rotate(2deg); }
        .company-info { flex: 1; min-width: 0; }
        .company-name { font-size: 2.4rem; margin-bottom: 4px; color: #7dd3c0; font-weight: 700; position: relative;  letter-spacing: 0.05em;}
        .company-name::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 3px; background: linear-gradient(90deg, #7dd3c0, #9ee5d6); transition: width 0.4s ease; }
        .content:hover .company-name::after { width: 100%; }
        .role-badge { display: inline-block; background: linear-gradient(135deg, #7dd3c0 0%, #9ee5d6 100%); color: #1a1a1a; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin: 8px 0; box-shadow: 0 2px 8px rgba(125,211,192,0.3); }
        .years { color: #a8a8a8; font-size: 1rem; font-weight: 500; margin: 6px 0 16px 0; display: flex; align-items: center; gap: 6px; }
        .years::before { content: '📅'; font-size: 1.3rem; }
        .description { color: #d0d0d0; line-height: 1.2; margin-bottom: 20px; font-size: 1.45rem; letter-spacing: 0.02em;}
        .projects { margin-top: 20px; padding-top: 20px; border-top: 2px solid rgba(125,211,192,0.2); }
        .projects-title { font-size: 1.1rem; font-weight: 700; color: #7dd3c0; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;letter-spacing: 0.02em; }
        .projects-title::before { content: '🚀'; }
        .project-item { margin-bottom: 14px; padding: 12px; background: rgba(125,211,192,0.08); border-radius: 8px; border-left: 3px solid #7dd3c0; transition: all 0.3s ease;letter-spacing: 0.02em; }
        .project-item:hover { background: rgba(125,211,192,0.15); transform: translateX(4px); }
        .project-name { font-size: 1.3rem; font-weight: 550; color: #ffffff; margin-bottom: 4px; letter-spacing: 0.09em;}
        .project-desc { font-size: 1.1rem; color: #d1cfcfff; line-height: 1.1;letter-spacing: 0.02em; }
        .tech-stack { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px; letter-spacing: 0.02em; }
        .tech-tag { background: rgba(125,211,192,0.15); color: #7dd3c0; padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; border: 1px solid rgba(125,211,192,0.3); transition: all 0.2s ease; }
        .tech-tag:hover { background: #7dd3c0; color: #1a1a1a; transform: translateY(-2px); }
        
        .mountain-reveal {
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          height: 560px;
          overflow: hidden;
          background: transparent;
          z-index: 10;
          margin-bottom: 0;
        }

        .mountain-svg {
          position: absolute;
          bottom: -40px;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translateY(100%);
          transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mountain-reveal.show .mountain-svg {
          transform: translateY(0);
        }

        @media(max-width: 1024px) { 
          .content { width: 65%; padding: 28px 24px; } 
          .river-header h1 { font-size: 2.5rem; } 
          .river-header { padding: 40px 40px; }
          .river-header > div { padding: 0; }
          .company-logo { width: 70px; height: 70px; font-size: 1.8rem; } 
          .company-name { font-size: 1.6rem; } 
          .scroll-section { padding: 100px 0; } 
        }
        
        @media(max-width: 768px) { 
          .content { width: 85%; padding: 24px 20px; flex-direction: column !important; text-align: left !important; } 
          .content.left, .content.right { margin: 0 auto; flex-direction: column; } 
          .company-logo { width: 64px; height: 64px; font-size: 1.6rem; margin: 0 auto 16px auto; } 
          .company-name { font-size: 1.5rem; } 
          .role-badge { font-size: 0.8rem; padding: 5px 12px; } 
          .river-header { min-height: 80vh; padding: 40px 20px; } 
          .river-header h1 { font-size: 2rem; }
          .scroll-section { padding: 80px 0; min-height: auto; } 
          .river-path { stroke-width: 4; }
          .hero-scroll-indicator { bottom: 30px; }
        }
        
        @media(max-width: 480px) { 
          .content { width: 95%; padding: 20px 16px; } 
          .company-logo { width: 56px; height: 56px; font-size: 1.4rem; } 
          .river-header h1 { font-size: 1.6rem; } 
          .tech-tag { font-size: 0.7rem; padding: 3px 8px; }
        }
      `}</style>

      <section ref={aboutRef} className="river-flow-section">
        <div ref={svgContainerRef} className="river-svg-container">
          <svg ref={svgRef} className="river-svg" viewBox="0 0 1400 2000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="riverGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#85B9A5" stopOpacity="1" />
                <stop offset="50%" stopColor="#85B9A5" stopOpacity="1" />
                <stop offset="100%" stopColor="#85B9A5" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path ref={pathRef} className="river-path" />
          </svg>
        </div>

        <header className="river-header" ref={heroRef}>
          <div className="hero-background">
            <svg className="contour-line" viewBox="0 0 800 600">
              <path d="M 100 300 Q 250 100, 400 300 T 700 300" />
            </svg>
            <svg className="contour-line" viewBox="0 0 700 500">
              <path d="M 50 250 Q 200 50, 350 250 T 650 250" />
            </svg>
            <svg className="contour-line" viewBox="0 0 600 450">
              <path d="M 100 225 Q 200 75, 300 225 T 500 225" />
            </svg>
            <svg className="contour-line" viewBox="0 0 500 400">
              <path d="M 50 200 Q 150 50, 250 200 T 450 200" />
            </svg>
            <div className="hero-floating-dot"></div>
            <div className="hero-floating-dot"></div>
            <div className="hero-floating-dot"></div>
            <div className="hero-floating-dot"></div>
          </div>
          <div>
            <h1>
              <span className="hero-title-line">Crafting digital experiences</span>
              <span className="hero-title-line">that transform ideas into</span>
              <span className="hero-title-line">reality. <span className="hero-highlight">My Career Journey.</span></span>
              <span className="hero-title-line">From code to impact,</span>
              <span className="hero-title-line">building the future</span>
              <span className="hero-title-line">one project at a time.</span>
            </h1>
          </div>
          <div className="hero-scroll-indicator">
            <span className="hero-scroll-text">Scroll</span>
            <div className="hero-scroll-line"></div>
          </div>
        </header>

        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          {careerJourney.map((job, index) => (
            <section key={job.id} className="scroll-section" ref={el => sectionsRef.current[index] = el}>
              <div className="content-wrapper">
                <article className="content" ref={el => contentsRef.current[index] = el}>
                  <div className="company-logo">{job.logo}</div>
                  <div className="company-info">
                    <div>
                      <h2 className="company-name">{job.company}</h2>
                      <div className="role-badge">{job.role}</div>
                      <div className="years">{job.period}</div>
                    </div>
                    <p className="description">{job.description}</p>
                    <div className="projects">
                      <h3 className="projects-title">Key Projects</h3>
                      {job.projects.map((project, idx) => (
                        <div key={idx} className="project-item">
                          <div className="project-name">{project.name}</div>
                          <div className="project-desc">{project.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div className="tech-stack">
                      {job.tech.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            </section>
          ))}
        </main>

        <div className="mountain-reveal">
          <img
            src="/mountain-footer.svg"
            alt="Mountain landscape"
            className="mountain-svg"
          />
        </div>

      </section>
    </>
  );
};

export default About;