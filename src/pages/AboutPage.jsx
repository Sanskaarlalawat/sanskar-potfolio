import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);
  const termRef = useRef(null);
  const linkRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const downloadResume = useCallback(() => {
    if (dlDone || pressing || downloading) return;

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !termRef.current) {
      linkRef.current?.click();
      setDlDone(true);
      return;
    }

    setPressing(true); // flash the Enter key first
    timerRef.current = setTimeout(() => {
      setPressing(false);
      setDownloading(true);
      setPercent(0);
      linkRef.current?.click();

      // Ease toward 100 — quick at first, settling in near the end, like a
      // real transfer. setTimeout (not rAF) so it always finishes, even if
      // this tab is backgrounded — it just runs slower, never stalls.
      let p = 0;
      const tick = () => {
        p = Math.min(100, p + Math.max(2, (100 - p) * 0.22));
        setPercent(Math.round(p));
        if (p < 100) {
          timerRef.current = setTimeout(tick, 70);
        } else {
          timerRef.current = setTimeout(() => {
            setDownloading(false);
            setDlDone(true);
          }, 260);
        }
      };
      timerRef.current = setTimeout(tick, 70);
    }, 220);
  }, [dlDone, pressing, downloading]);

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
              {!downloading && !dlDone && (
                <p className="ab-term-hint">
                  press{" "}
                  <kbd className={`ab-term-kbd ${pressing ? "ab-term-kbd--active" : ""}`}>
                    ⏎ enter
                  </kbd>{" "}
                  to download résumé
                  <span className="ab-term-cursor" />
                </p>
              )}
              {(downloading || dlDone) && (
                <p className="ab-term-out">→ fetching Sanskar-Lalawat-Resume.pdf</p>
              )}
              {downloading && (
                <div className="ab-term-progress">
                  <div className="ab-term-progress-track">
                    <div
                      className="ab-term-progress-fill"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="ab-term-progress-pct">{percent}%</span>
                </div>
              )}
              {dlDone && (
                <p className="ab-term-ok">✓ saved to ~/Downloads/Sanskar-Lalawat-Resume.pdf</p>
              )}
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
