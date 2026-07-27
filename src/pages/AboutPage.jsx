import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import "./AboutPage.css";

const ROTATE = ["talks", "listens", "reasons", "ships"];

const experience = [
  {
    role: "Technical Head",
    company: "Siksha Bhavishayan",
    period: "2025 — Now",
    description:
      "Leading complete technical operations for an education & counseling platform — managing the engineering team, driving innovation, handling deployments, and building AI systems for counseling and student analytics.",
    tech: ["Python", "Django", "LLMs", "AWS", "Docker", "System Architecture"],
  },
  {
    role: "AI / ML Engineer",
    company: "Karai Innovation",
    period: "2024 — 25",
    description:
      "Built intelligent education-focused systems: AI chatbots, vector-based knowledge systems, OCR pipelines and answer-evaluation engines — deployed end to end at scale.",
    tech: ["Python", "OCR", "Computer Vision", "LLMs", "Vector Databases", "OpenAI"],
  },
  {
    role: "AI Automation Intern",
    company: "Vyza Solutions",
    period: "2023",
    description:
      "Worked on data analysis, NLP and machine-learning solutions — contributing to real-world AI projects, model building, insight generation and automation workflows.",
    tech: ["Python", "NLP", "Machine Learning", "Pandas"],
  },
  {
    role: "Data & Analytics Intern",
    company: "Aimpathy Consulting",
    period: "2023",
    description:
      "Handled HR data and analytics to improve recruitment efficiency and decision-making through data extraction, cleaning and reporting.",
    tech: ["Python", "Data Cleaning", "Analytics"],
  },
];

const skills = [
  "Python", "LLMs", "RAG", "Vector Databases", "Computer Vision", "NLP",
  "OpenAI", "FastAPI", "Django", "AWS", "Docker", "PostgreSQL",
  "Prompt Engineering", "System Architecture",
];

const fade = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const AboutPage = () => {
  const [wi, setWi] = useState(0);
  const [snap, setSnap] = useState(false);
  const [openExp, setOpenExp] = useState(0);
  const [dlDone, setDlDone] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [flying, setFlying] = useState(false);
  const [trayShow, setTrayShow] = useState(false);
  const [trayDone, setTrayDone] = useState(false);
  const [flyPos, setFlyPos] = useState({ x: 0, y: 0, dx: 0, dy: 0 });
  const termRef = useRef(null);
  const linkRef = useRef(null);
  const trayRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const downloadResume = useCallback(() => {
    if (dlDone || pressing || flying) return;

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !termRef.current) {
      linkRef.current?.click();
      setDlDone(true);
      return;
    }

    setPressing(true); // flash the Enter key first
    setTimeout(() => {
      setPressing(false);
      setTrayShow(true); // the "download popup" appears near the top, like a browser

      // The tray is always mounted (only its opacity/transform toggle), so its
      // box dimensions are valid immediately — no need to wait a frame for the
      // show transition, which also avoids rAF ever stalling in a backgrounded tab.
      const tr = termRef.current.getBoundingClientRect();
      const trayEl = trayRef.current;
      const sx = tr.left + tr.width * 0.5;
      const sy = tr.top + tr.height * 0.62;
      const ex = window.innerWidth / 2;
      const ey = 14 + trayEl.offsetHeight / 2; // matches the tray's resting `top: 14px`
      setFlyPos({ x: sx, y: sy, dx: ex - sx, dy: ey - sy });

      linkRef.current?.click();
      setFlying(true);

      setTimeout(() => {
        setFlying(false);
        setDlDone(true);
        setTrayDone(true); // file "arrives" — checkmark + bounce

        setTimeout(() => {
          setTrayShow(false); // the popup fades away, as if it were never there
          setTimeout(() => setTrayDone(false), 350);
        }, 950);
      }, 700);
    }, 220);
  }, [dlDone, pressing, flying]);

  // Press Enter to download — active while the terminal is on screen.
  useEffect(() => {
    if (dlDone) return;
    const onKey = (e) => {
      if (e.key !== "Enter") return;
      const tag = document.activeElement?.tagName;
      if (["A", "BUTTON", "INPUT", "TEXTAREA"].includes(tag)) return;
      const el = termRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.85 && r.bottom > window.innerHeight * 0.15;
      if (!inView) return;
      e.preventDefault();
      downloadResume();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dlDone, downloadResume]);

  useEffect(() => {
    const id = setInterval(() => setWi((w) => w + 1), 2400);
    return () => clearInterval(id);
  }, []);

  // Seamless loop: after sliding onto the duplicated first word, snap back
  // to index 0 with the transition off (invisible jump).
  useEffect(() => {
    if (wi === ROTATE.length) {
      const t = setTimeout(() => {
        setSnap(true);
        setWi(0);
      }, 640);
      return () => clearTimeout(t);
    }
    if (snap) {
      const raf = requestAnimationFrame(() => setSnap(false));
      return () => cancelAnimationFrame(raf);
    }
  }, [wi, snap]);

  return (
    <div className="ab-page">
      <div className="ab-wrap">
        {/* Hero */}
        <header className="ab-hero">
          <motion.div
            className="ab-status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="ab-status-dot" /> Available for work
          </motion.div>

          <motion.h1
            className="ab-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            I build AI that
            <span className="ab-rot" aria-label={ROTATE[wi % ROTATE.length]}>
              <span
                className="ab-rot-track"
                style={{
                  transform: `translateY(-${wi * 1.25}em)`,
                  transition: snap
                    ? "none"
                    : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {[...ROTATE, ROTATE[0]].map((w, i) => (
                  <span className="ab-rot-item" key={i}>{w}</span>
                ))}
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="ab-lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            I'm Sanskar Lalawat — an AI/ML engineer based in India. I take
            products from raw idea to production: LLM pipelines, real-time voice
            agents, computer vision, and the backends behind them.
          </motion.p>
        </header>

        {/* Meta */}
        <motion.div className="ab-meta" {...fade}>
          <div>
            <span className="ab-meta-k">Currently</span>
            <span className="ab-meta-v">Technical Head · Siksha Bhavishayan</span>
          </div>
          <div>
            <span className="ab-meta-k">Based in</span>
            <span className="ab-meta-v">India</span>
          </div>
          <div>
            <span className="ab-meta-k">Open to</span>
            <span className="ab-meta-v">Full-time & freelance</span>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.section className="ab-section" {...fade}>
          <h2 className="ab-h2">Experience</h2>
          <div className="ab-exp">
            {experience.map((job, i) => {
              const isOpen = openExp === i;
              return (
                <div className={`ab-exp-row ${isOpen ? "is-open" : ""}`} key={job.company}>
                  <button
                    className="ab-exp-head"
                    onClick={() => setOpenExp(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <div className="ab-exp-main">
                      <span className="ab-exp-role">{job.role}</span>
                      <span className="ab-exp-co">{job.company}</span>
                    </div>
                    <span className="ab-exp-year">{job.period}</span>
                    <span className="ab-exp-chev" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div className="ab-exp-detail">
                    <div className="ab-exp-detail-inner">
                      <p className="ab-exp-desc">{job.description}</p>
                      <div className="ab-exp-tags">
                        {job.tech.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section className="ab-section" {...fade}>
          <h2 className="ab-h2">Skills</h2>
          <div className="ab-skills">
            {skills.map((s) => (
              <span className="ab-skill" key={s}>{s}</span>
            ))}
          </div>
        </motion.section>

        {/* Résumé */}
        <motion.section className="ab-section" {...fade}>
          <h2 className="ab-h2">Résumé</h2>
          <div
            className="ab-term"
            ref={termRef}
            role="button"
            tabIndex={0}
            aria-label="Download résumé"
            onClick={downloadResume}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                downloadResume();
              }
            }}
          >
            <div className="ab-term-bar">
              <span className="ab-term-dot ab-term-dot--r" />
              <span className="ab-term-dot ab-term-dot--y" />
              <span className="ab-term-dot ab-term-dot--g" />
              <span className="ab-term-title">resume — zsh</span>
            </div>
            <div className="ab-term-body">
              <p className="ab-term-line">
                <span className="ab-term-user">sanskar@portfolio</span>
                <span className="ab-term-sep">:</span>
                <span className="ab-term-dir">~</span>
                <span className="ab-term-prompt">$</span>
                <span className="ab-term-cmd">./get-resume.sh</span>
              </p>
              {!flying && !dlDone && (
                <p className="ab-term-hint">
                  press{" "}
                  <kbd className={`ab-term-kbd ${pressing ? "ab-term-kbd--active" : ""}`}>
                    ⏎ enter
                  </kbd>{" "}
                  to download résumé
                  <span className="ab-term-cursor" />
                </p>
              )}
              {(flying || dlDone) && (
                <p className="ab-term-out">→ fetching Sanskar-Lalawat-Resume.pdf …</p>
              )}
              {dlDone && <p className="ab-term-ok">✓ saved to Downloads</p>}
            </div>
            <a
              ref={linkRef}
              href="/sanskar-lalawat-resume.pdf"
              download="Sanskar-Lalawat-Resume.pdf"
              aria-hidden="true"
              tabIndex={-1}
              style={{ position: "absolute", width: 0, height: 0, opacity: 0, pointerEvents: "none" }}
            >
              resume
            </a>
          </div>
        </motion.section>

        {createPortal(
          <>
            {/* Ephemeral "download popup" — pops in near the top like a
                browser's download tray, receives the file, then vanishes. */}
            <div
              className={`ab-dl-tray ${trayShow ? "is-show" : ""} ${trayDone ? "is-done" : ""}`}
              ref={trayRef}
              aria-hidden="true"
            >
              <svg viewBox="0 0 64 50" width="20" height="16" fill="none">
                <path
                  d="M3 8c0-2.8 2.2-5 5-5h13l5 6h30c2.8 0 5 2.2 5 5v29c0 2.8-2.2 5-5 5H8c-2.8 0-5-2.2-5-5V8z"
                  fill="#bcd9ff"
                />
                <path d="M3 15h58v23c0 2.8-2.2 5-5 5H8c-2.8 0-5-2.2-5-5V15z" fill="#5b9df9" />
              </svg>
              <span className="ab-dl-tray-label">Sanskar-Lalawat-Resume.pdf</span>
              <span className="ab-dl-tray-check">✓</span>
            </div>

            {flying && (
              <div
                className="ab-fly-doc"
                style={{
                  left: flyPos.x,
                  top: flyPos.y,
                  "--dx": `${flyPos.dx}px`,
                  "--dy": `${flyPos.dy}px`,
                }}
              >
                <svg viewBox="0 0 28 32" width="28" height="32" fill="none">
                  <path
                    d="M3 1h14l6 6v23a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
                    fill="#fff"
                    stroke="#d8d3cd"
                  />
                  <path d="M17 1v6h6" fill="none" stroke="#d8d3cd" />
                  <rect x="4" y="17" width="17" height="6" rx="1.2" fill="#e2503a" />
                  <text
                    x="12.5"
                    y="21.7"
                    fontSize="4.6"
                    fill="#fff"
                    textAnchor="middle"
                    fontFamily="ui-monospace, monospace"
                    fontWeight="700"
                  >
                    PDF
                  </text>
                </svg>
              </div>
            )}
          </>,
          document.body
        )}

        {/* Contact */}
        <motion.section className="ab-contact" {...fade}>
          <h2 className="ab-cta">Let's build something.</h2>
          <div className="ab-links">
            <a href="mailto:sanskarlal23@gmail.com" className="ab-link">
              sanskarlal23@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/sanskar-lalawat/"
              target="_blank"
              rel="noreferrer"
              className="ab-link ab-link--ghost"
            >
              LinkedIn →
            </a>
          </div>
        </motion.section>

        <footer className="ab-footer">
          <span>© {new Date().getFullYear()} Sanskar Lalawat</span>
          <span>AI Engineer — India</span>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
