import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { getProjectBySlug, getNextProject } from "../data/projects";
import "./ProjectDetail.css";

const riseUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const CoverArt = ({ project }) => (
  <>
    <svg
      className="pd-cover-rings"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="1050" cy="80" r="260" fill="none" stroke="#000" strokeWidth="1.5" />
      <circle cx="1050" cy="80" r="180" fill="none" stroke="#000" strokeWidth="1.5" />
      <circle cx="120" cy="620" r="220" fill="none" stroke="#000" strokeWidth="1.5" />
      <line x1="0" y1="350" x2="1200" y2="350" stroke="#000" strokeWidth="1" />
      <line x1="600" y1="0" x2="600" y2="700" stroke="#000" strokeWidth="1" />
    </svg>
    <span className="pd-cover-title">{project.title}</span>
  </>
);

const ProjectDetail = ({ slug, onBack, onOpenProject }) => {
  const project = getProjectBySlug(slug);
  const nextProject = getNextProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="pd-page">
        <div className="pd-topbar">
          <button className="pd-back" onClick={onBack}>
            <span className="pd-back-arrow">←</span> All Projects
          </button>
        </div>
        <div className="pd-hero">
          <h1 className="pd-hero-title">Not Found</h1>
          <p className="pd-hero-subtitle">This project doesn't exist.</p>
        </div>
      </div>
    );
  }

  const titleWords = project.title.split(" ");

  return (
    <div className="pd-page" key={slug}>
      {/* Top bar */}
      <div className="pd-topbar">
        <button className="pd-back" onClick={onBack}>
          <span className="pd-back-arrow">←</span> All Projects
        </button>
        <span className="pd-topbar-meta">
          {String(project.id).padStart(2, "0")} — Project
        </span>
      </div>

      {/* Hero */}
      <header className="pd-hero">
        <motion.div
          className="pd-hero-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {project.category}
        </motion.div>
        <h1 className="pd-hero-title">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="pd-title-line"
              initial={{ opacity: 0, y: "60%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.08,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="pd-hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {project.subtitle}
        </motion.p>
      </header>

      {/* Meta grid */}
      <motion.div className="pd-meta" {...riseUp}>
        <div className="pd-meta-item">
          <div className="pd-meta-label">Year</div>
          <div className="pd-meta-value">{project.year}</div>
        </div>
        <div className="pd-meta-item">
          <div className="pd-meta-label">Role</div>
          <div className="pd-meta-value">{project.role}</div>
        </div>
        <div className="pd-meta-item">
          <div className="pd-meta-label">Client</div>
          <div className="pd-meta-value">{project.client}</div>
        </div>
        <div className="pd-meta-item">
          <div className="pd-meta-label">Stack</div>
          <div className="pd-meta-value">{project.tags.slice(0, 3).join(", ")}</div>
        </div>
      </motion.div>

      {/* Cover */}
      <div className="pd-cover-wrap">
        <motion.div
          className="pd-cover"
          style={{ background: project.gradient }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.image ? (
            <img src={project.image} alt={project.title} />
          ) : (
            <CoverArt project={project} />
          )}
        </motion.div>
      </div>

      {/* Overview */}
      <motion.section className="pd-section" {...riseUp}>
        <div className="pd-section-label">Overview</div>
        <div className="pd-section-body">
          {project.longDescription.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </motion.section>

      {/* Features */}
      <motion.section className="pd-section" {...riseUp}>
        <div className="pd-section-label">Key Features</div>
        <div className="pd-section-body">
          {project.features.map((feature, i) => (
            <div className="pd-feature" key={i}>
              <span className="pd-feature-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pd-feature-text">{feature}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Stack */}
      <motion.section className="pd-section" {...riseUp}>
        <div className="pd-section-label">Technologies</div>
        <div className="pd-tags">
          {project.tags.map((tag, i) => (
            <span className="pd-tag" key={i}>
              {tag}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Gallery */}
      <div className="pd-gallery">
        {(project.gallery.length
          ? project.gallery
          : [null, null]
        ).map((src, i) => (
          <motion.div
            className="pd-gallery-item"
            key={i}
            style={!src ? { background: project.gradient } : undefined}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {src ? (
              <img src={src} alt={`${project.title} — ${i + 1}`} />
            ) : (
              <span className="pd-gallery-num">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Next project */}
      <button className="pd-next" onClick={() => onOpenProject(nextProject.slug)}>
        <span className="pd-next-inner">
          <span className="pd-next-label">Next Project</span>
          <span className="pd-next-title">{nextProject.title}</span>
        </span>
      </button>

      <footer className="pd-footer">
        <span>© {new Date().getFullYear()} Sanskar Lalawat</span>
        <span>AI Engineer — India</span>
      </footer>
    </div>
  );
};

export default ProjectDetail;
