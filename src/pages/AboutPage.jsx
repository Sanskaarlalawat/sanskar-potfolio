import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./AboutPage.css";

const ROTATE = ["talks", "listens", "reasons", "ships"];

const experience = [
  { role: "Technical Head", company: "Siksha Bhavishayan", period: "2025 — Now" },
  { role: "AI / ML Engineer", company: "Karai Innovation", period: "2024 — 25" },
  { role: "AI Automation Intern", company: "Vyza Solutions", period: "2023" },
  { role: "Data & Analytics Intern", company: "Aimpathy Consulting", period: "2023" },
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWi((w) => (w + 1) % ROTATE.length), 2200);
    return () => clearInterval(id);
  }, []);

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
            <span className="ab-rot">
              <span key={wi} className="ab-rot-word">{ROTATE[wi]}</span>
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
            {experience.map((job) => (
              <div className="ab-exp-row" key={job.company}>
                <span className="ab-exp-arrow">→</span>
                <div className="ab-exp-main">
                  <span className="ab-exp-role">{job.role}</span>
                  <span className="ab-exp-co">{job.company}</span>
                </div>
                <span className="ab-exp-year">{job.period}</span>
              </div>
            ))}
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
