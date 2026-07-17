import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "../data/projects";
import "./AllProjects.css";

const EASE = [0.22, 1, 0.36, 1];
const DEFAULT_COVER_VIDEO = "/projects-loop-v2.mp4";

// Project cover. `withVideo` plays the looping clip (one card at a time on the
// desktop slider); otherwise it falls back to the gradient + rings artwork.
const ProjectCover = ({ project, withVideo = false }) => (
  <div className="ap-cover" style={{ background: project.gradient }}>
    {project.image ? (
      <img src={project.image} alt={project.title} />
    ) : withVideo ? (
      <video
        className="ap-cover-video"
        key={project.coverVideo || DEFAULT_COVER_VIDEO}
        src={project.coverVideo || DEFAULT_COVER_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    ) : (
      <svg
        className="ap-cover-rings"
        viewBox="0 0 340 240"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="290" cy="30" r="90" fill="none" stroke="#000" strokeWidth="1" />
        <circle cx="290" cy="30" r="60" fill="none" stroke="#000" strokeWidth="1" />
        <circle cx="40" cy="210" r="70" fill="none" stroke="#000" strokeWidth="1" />
        <line x1="0" y1="120" x2="340" y2="120" stroke="#000" strokeWidth="0.5" />
      </svg>
    )}
  </div>
);

/* Title split into words, each masked and revealed line by line. */
const RevealTitle = React.forwardRef(({ text, id }, ref) => (
  <h2 className="ap-title" aria-label={text} ref={ref}>
    {text.split(" ").map((word, i) => (
      <span className="ap-title-mask" key={`${id}-${i}`}>
        <motion.span
          className="ap-title-word"
          initial={{ y: "112%" }}
          animate={{ y: 0 }}
          exit={{ y: "-112%" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.04 * i }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </h2>
));

/* Rolling two-digit counter, digits slide vertically on change. */
const RollingNumber = ({ value }) => (
  <span className="ap-num-roll">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        className="ap-num-current"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
  </span>
);

const AllProjects = ({ onOpenProject }) => {
  const [index, setIndex] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const lockRef = useRef(false);
  const trackRef = useRef(null);
  const total = projectsData.length;
  const project = projectsData[index];

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none), (max-width: 820px)").matches);
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Mobile: track which carousel slide is centered.
  const onTrackScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild;
    if (!slide) return;
    const step = slide.offsetWidth + 14;
    const i = Math.round(track.scrollLeft / step);
    setIndex((prev) => {
      const next = Math.max(0, Math.min(total - 1, i));
      return next === prev ? prev : next;
    });
  }, [total]);

  const go = useCallback(
    (dir) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setIndex((i) => (i + dir + total) % total);
      setTimeout(() => { lockRef.current = false; }, 750);
    },
    [total]
  );

  const jumpTo = useCallback((i) => {
    if (lockRef.current || i === undefined) return;
    lockRef.current = true;
    setIndex(i);
    setTimeout(() => { lockRef.current = false; }, 750);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (isTouch) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
      if (e.key === "Enter") onOpenProject(projectsData[index]?.slug);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, isTouch, index, onOpenProject]);

  // Wheel navigation with a lockout so one gesture = one slide
  useEffect(() => {
    if (isTouch) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 24) return;
      go(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [go, isTouch]);

  /* ── Mobile: swipeable snap carousel, same design language ── */
  if (isTouch) {
    return (
      <div className="ap-page ap-page--m" style={{ "--accent": project.accent }}>
        <header className="ap-m-hero">
          <div className="ap-m-label">Selected work</div>
          <h1 className="ap-m-heading">Projects</h1>
          <p className="ap-m-sub">Swipe through — tap a card to open the case study.</p>
        </header>

        <div className="ap-m-track" ref={trackRef} onScroll={onTrackScroll}>
          {projectsData.map((p, i) => (
            <motion.button
              key={p.id}
              className="ap-m-slide"
              onClick={() => onOpenProject(p.slug)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.08 + i * 0.06 }}
            >
              <div className="ap-m-cover">
                <ProjectCover project={p} />
                <span className="ap-m-cover-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="ap-m-meta">
                <span className="ap-m-category">{p.category}</span>
                <span className="ap-m-year">{p.year}</span>
              </div>
              <h2 className="ap-m-title">{p.title}</h2>
              <p className="ap-m-desc">{p.description}</p>
              <span className="ap-m-cta">View case study →</span>
            </motion.button>
          ))}
        </div>

        {/* Counter — same language as desktop */}
        <div className="ap-m-counter">
          <RollingNumber value={index + 1} />
          <span className="ap-counter-total">/ {String(total).padStart(2, "0")}</span>
          <span className="ap-progress">
            <span
              className="ap-progress-fill"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </span>
        </div>

        <footer className="ap-footer ap-footer--m">
          <span>© {new Date().getFullYear()} Sanskar Lalawat</span>
          <span>AI Engineer — India</span>
        </footer>
      </div>
    );
  }

  /* ── Desktop: full-viewport slider ── */
  return (
    <div className="ap-page ap-page--slider" style={{ "--accent": project.accent }}>
      {/* Top strip */}
      <div className="ap-top">
        <span className="ap-top-label">Selected work</span>
        <span className="ap-top-hint">Scroll, arrow keys, or click a title</span>
      </div>

      <div className="ap-stage">
        {/* Left — index of all projects */}
        <nav className="ap-index">
          {projectsData.map((p, i) => (
            <button
              key={p.id}
              className={`ap-index-item ${i === index ? "active" : ""}`}
              onClick={() => jumpTo(i)}
              onDoubleClick={() => onOpenProject(p.slug)}
            >
              <span className="ap-index-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="ap-index-title">{p.title}</span>
            </button>
          ))}
        </nav>

        {/* Center — media card */}
        <div className="ap-media" onClick={() => onOpenProject(project.slug)}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={project.id}
              className="ap-media-inner"
              initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.08 }}
              animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <ProjectCover project={project} withVideo />
            </motion.div>
          </AnimatePresence>
          <span className="ap-media-open">Open case study →</span>
        </div>

        {/* Right — active project details */}
        <div className="ap-detail">
          <div className="ap-detail-meta">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {project.category}
                <span className="ap-detail-dot">·</span>
                {project.year}
              </motion.span>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            <RevealTitle key={project.id} id={project.id} text={project.title} />
          </AnimatePresence>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={project.id}
              className="ap-detail-desc"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
            >
              {project.description}
            </motion.p>
          </AnimatePresence>

          <motion.button
            className="ap-detail-cta"
            onClick={() => onOpenProject(project.slug)}
            whileHover={{ x: 4 }}
          >
            View case study →
          </motion.button>
        </div>
      </div>

      {/* Bottom strip — counter + prev/next */}
      <div className="ap-bottom">
        <div className="ap-counter">
          <RollingNumber value={index + 1} />
          <span className="ap-counter-total">/ {String(total).padStart(2, "0")}</span>
          <span className="ap-progress">
            <span
              className="ap-progress-fill"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </span>
        </div>
        <div className="ap-nav">
          <button className="ap-nav-btn" onClick={() => go(-1)}>← Prev</button>
          <button className="ap-nav-btn" onClick={() => go(1)}>Next →</button>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
