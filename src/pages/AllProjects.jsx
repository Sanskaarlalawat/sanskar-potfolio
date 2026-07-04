import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects";
import "./AllProjects.css";

// Gradient cover used when a project has no real image yet.
const ProjectCover = ({ project, showTitle = true }) => (
  <div className="ap-preview-cover" style={{ background: project.gradient }}>
    {project.image ? (
      <img src={project.image} alt={project.title} />
    ) : (
      <>
        <svg
          className="ap-preview-cover-rings"
          viewBox="0 0 340 240"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="290" cy="30" r="90" fill="none" stroke="#000" strokeWidth="1" />
          <circle cx="290" cy="30" r="60" fill="none" stroke="#000" strokeWidth="1" />
          <circle cx="40" cy="210" r="70" fill="none" stroke="#000" strokeWidth="1" />
          <line x1="0" y1="120" x2="340" y2="120" stroke="#000" strokeWidth="0.5" />
        </svg>
        {showTitle && (
          <span className="ap-preview-cover-text">{project.title}</span>
        )}
      </>
    )}
  </div>
);

const AllProjects = ({ onOpenProject, onBack }) => {
  const previewRef = useRef(null);
  const innerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none), (max-width: 768px)").matches);
    window.scrollTo(0, 0);
  }, []);

  // Lerp the floating preview toward the cursor.
  const animate = useCallback(() => {
    pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
    pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
    if (previewRef.current) {
      previewRef.current.style.transform = `translate3d(${pos.current.x + 30}px, ${
        pos.current.y - 120
      }px, 0)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, isTouch]);

  const hoveredProject =
    hovered !== null ? projectsData.find((p) => p.id === hovered) : null;

  return (
    <div className="ap-page">
      {/* Hero */}
      <header className="ap-hero">
        <motion.div
          className="ap-hero-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Selected Work
        </motion.div>
        <motion.h1
          className="ap-hero-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          Projects
          <sup className="ap-hero-count">
            ({String(projectsData.length).padStart(2, "0")})
          </sup>
        </motion.h1>
        <motion.p
          className="ap-hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          AI systems, computer vision and intelligent automation — every
          project engineered end to end, from model to production.
        </motion.p>
      </header>

      {/* List */}
      <div className="ap-list" onMouseLeave={() => setHovered(null)}>
        {projectsData.map((project, index) => (
          <motion.button
            key={project.id}
            className="ap-row"
            onClick={() => onOpenProject(project.slug)}
            onMouseEnter={() => setHovered(project.id)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ap-row-inner">
              {isTouch ? (
                <div className="ap-row-mobile-cover">
                  <ProjectCover project={project} showTitle={false} />
                </div>
              ) : (
                <span className="ap-row-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <div className="ap-row-main">
                <span className="ap-row-title">{project.title}</span>
                <p className="ap-row-desc">{project.description}</p>
              </div>
              <div className="ap-row-meta">
                <span className="ap-row-category">{project.category}</span>
                <span className="ap-row-year">{project.year}</span>
                {!isTouch && <span className="ap-row-arrow">→</span>}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Floating preview */}
      {!isTouch && (
        <div
          ref={previewRef}
          className={`ap-preview ${hoveredProject ? "visible" : ""}`}
        >
          <div ref={innerRef} className="ap-preview-inner">
            {hoveredProject && <ProjectCover project={hoveredProject} />}
          </div>
        </div>
      )}

      <footer className="ap-footer">
        <span>© {new Date().getFullYear()} Sanskar Lalawat</span>
        <span>AI Engineer — India</span>
      </footer>
    </div>
  );
};

export default AllProjects;
