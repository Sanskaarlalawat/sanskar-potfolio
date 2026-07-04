import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./AboutPage.css";

const riseUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const experience = [
  {
    logo: "SB",
    company: "Siksha Bhavishayan",
    role: "Technical Head",
    period: "April 2025 – Present",
    description:
      "Leading complete technical operations for an education and counseling platform. Managing the technical team, driving innovation, handling deployments, and building AI-powered systems for counseling and student analytics.",
    tech: ["Python", "Django", "AI Chatbots", "LLMs", "AWS", "VPS", "Docker", "System Architecture"],
  },
  {
    logo: "KI",
    company: "Karai Innovation",
    role: "AI / ML Engineer",
    period: "Jan 2024 – April 2025 · 1 yr 4 mo",
    description:
      "Built intelligent education-focused systems including AI chatbots, vector-based knowledge systems, OCR pipelines, and answer evaluation engines. Deployed scalable solutions end to end.",
    tech: ["Python", "Django", "OCR", "Computer Vision", "LLMs", "Vector Databases", "OpenAI", "AWS", "Docker"],
  },
  {
    logo: "VS",
    company: "Vyza Solutions",
    role: "AI Automation Intern",
    period: "Jul 2023 – Dec 2023 · 6 mo",
    description:
      "Focused on data analysis, NLP, and machine learning solutions. Contributed to real-world AI projects, model building, insights generation, and automation workflows.",
    tech: ["Python", "NLP", "Machine Learning", "Pandas", "Matplotlib"],
  },
  {
    logo: "AC",
    company: "Aimpathy Consulting",
    role: "Data & Analytics Intern",
    period: "Aug 2023 – Dec 2023 · 4 mo",
    description:
      "Worked on HR data handling and analytics to improve recruitment efficiency and decision-making processes through data extraction, cleaning, and reporting.",
    tech: ["Python", "Data Cleaning", "Excel", "Analytics"],
  },
];

const skills = [
  {
    group: "AI / ML",
    tags: ["LLMs", "Prompt Engineering", "RAG", "Vector Databases", "OpenAI", "OCR", "Computer Vision", "NLP"],
  },
  {
    group: "Backend",
    tags: ["Python", "Django", "REST APIs", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    group: "Infrastructure",
    tags: ["AWS", "Docker", "VPS", "CI/CD", "Linux", "Nginx"],
  },
  {
    group: "Tools & More",
    tags: ["Git", "System Architecture", "Team Management", "Data Analysis", "Pandas", "Matplotlib"],
  },
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* ── Hero ── */}
      <header className="about-hero">
        <motion.div
          className="about-hero-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.div>

        <motion.h1
          className="about-hero-name"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          Sanskar
          <br />
          Lalawat
        </motion.h1>

        <motion.div
          className="about-hero-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="about-hero-title">
            <strong>AI / ML Engineer</strong> based in India —
            building intelligent systems that work in the real world, from LLM
            pipelines to computer vision to production-grade APIs.
          </p>
          <div className="about-hero-status">
            <span className="about-hero-status-dot" />
            Available for work
          </div>
        </motion.div>
      </header>

      {/* ── Stats bar ── */}
      <motion.div className="about-stats" {...riseUp}>
        {[
          { number: "3+", label: "Years Experience" },
          { number: "15+", label: "Projects Shipped" },
          { number: "04", label: "Companies" },
          { number: "∞", label: "Models Prompted" },
        ].map((s) => (
          <div className="about-stat" key={s.label}>
            <div className="about-stat-number">{s.number}</div>
            <div className="about-stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Bio ── */}
      <motion.div className="about-bio" {...riseUp}>
        <div className="about-bio-label">Who I Am</div>
        <div className="about-bio-text">
          <p>
            I'm Sanskar Lalawat — an AI/ML Engineer who thrives at the
            intersection of intelligent systems and practical engineering. I
            don't just prototype; I ship — from raw idea to deployed product,
            end to end.
          </p>
          <p>
            My work spans LLM orchestration, computer vision pipelines, OCR
            systems, vector-database–powered search, and full-stack Django
            backends. I've led engineering teams, built platforms used by
            thousands of students, and consistently turned complex AI research
            into clean, production-ready code.
          </p>
          <p>
            Currently serving as Technical Head at Siksha Bhavishayan, where I
            architect AI-driven counseling tools and manage the full engineering
            lifecycle — from sprint planning to cloud deployment.
          </p>
        </div>
      </motion.div>

      {/* ── Skills ── */}
      <motion.div className="about-skills" {...riseUp}>
        <div className="about-skills-label">Skills</div>
        <div className="about-skills-grid">
          {skills.map((group) => (
            <div key={group.group}>
              <div className="about-skill-group-title">{group.group}</div>
              <div className="about-tags">
                {group.tags.map((tag) => (
                  <span className="about-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Experience ── */}
      <div className="about-exp">
        <div className="about-exp-label">Experience</div>
        <div className="about-timeline">
          {experience.map((job, i) => (
            <motion.div
              key={i}
              className="about-timeline-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <div className="about-tl-logo">{job.logo}</div>
              <div>
                <div className="about-tl-company">{job.company}</div>
                <div className="about-tl-role">{job.role}</div>
                <div className="about-tl-period">{job.period}</div>
                <p className="about-tl-desc">{job.description}</p>
                <div className="about-tl-tags">
                  {job.tech.map((t) => (
                    <span className="about-tl-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Contact strip ── */}
      <motion.div className="about-contact" {...riseUp}>
        <div className="about-contact-text">
          Let's build<br />something.
        </div>
        <a href="mailto:anshulcreates14@gmail.com" className="about-contact-link">
          Get in touch →
        </a>
      </motion.div>

      <footer className="about-footer">
        <span>© {new Date().getFullYear()} Sanskar Lalawat</span>
        <span>AI Engineer — India</span>
      </footer>
    </div>
  );
};

export default AboutPage;
