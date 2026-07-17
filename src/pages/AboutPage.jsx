import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./AboutPage.css";

const rise = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const experience = [
  {
    company: "Siksha Bhavishayan",
    role: "Technical Head",
    period: "April 2025 – Present",
    description:
      "Leading complete technical operations for an education and counseling platform — managing the engineering team, driving innovation, handling deployments, and building AI-powered systems for counseling and student analytics.",
    tech: ["Python", "Django", "LLMs", "AWS", "Docker", "System Architecture"],
  },
  {
    company: "Karai Innovation",
    role: "AI / ML Engineer",
    period: "Jan 2024 – April 2025",
    description:
      "Built intelligent education-focused systems: AI chatbots, vector-based knowledge systems, OCR pipelines, and answer evaluation engines — deployed end to end at scale.",
    tech: ["Python", "OCR", "Computer Vision", "LLMs", "Vector Databases", "OpenAI"],
  },
  {
    company: "Vyza Solutions",
    role: "AI Automation Intern",
    period: "Jul 2023 – Dec 2023",
    description:
      "Worked on data analysis, NLP, and machine learning solutions — contributing to real-world AI projects, model building, insight generation, and automation workflows.",
    tech: ["Python", "NLP", "Machine Learning", "Pandas"],
  },
  {
    company: "Aimpathy Consulting",
    role: "Data & Analytics Intern",
    period: "Aug 2023 – Dec 2023",
    description:
      "Handled HR data and analytics to improve recruitment efficiency and decision-making through data extraction, cleaning, and reporting.",
    tech: ["Python", "Data Cleaning", "Analytics"],
  },
];

const skills = [
  {
    group: "AI / ML",
    tags: ["LLMs", "Prompt Engineering", "RAG", "Vector Databases", "OpenAI", "OCR", "Computer Vision", "NLP"],
  },
  {
    group: "Backend",
    tags: ["Python", "Django", "FastAPI", "REST APIs", "PostgreSQL", "Redis"],
  },
  {
    group: "Infrastructure",
    tags: ["AWS", "Docker", "VPS", "CI/CD", "Linux", "Nginx"],
  },
  {
    group: "Tools & Practice",
    tags: ["Git", "System Architecture", "Team Management", "Data Analysis"],
  },
];

const stats = [
  { number: "3+", label: "years of experience" },
  { number: "15+", label: "projects shipped" },
  { number: "4", label: "companies" },
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero */}
        <motion.header
          className="about-hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-meta">
            <span>AI / ML Engineer</span>
            <span className="about-meta-dot">·</span>
            <span>India</span>
            <span className="about-meta-dot">·</span>
            <span className="about-available">
              <span className="about-available-dot" />
              Available for work
            </span>
          </div>
          <h1 className="about-title">Sanskar Lalawat</h1>
          <p className="about-subtitle">
            I build intelligent systems that work in the real world — from LLM
            pipelines and voice agents to computer vision and production-grade
            backends.
          </p>
        </motion.header>

        {/* Stat band */}
        <motion.div className="about-stats" {...rise}>
          {stats.map((s) => (
            <div className="about-stat" key={s.label}>
              <span className="about-stat-value">{s.number}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.section className="about-section" {...rise}>
          <h2 className="about-heading">Who I am</h2>
          <p className="about-body">
            I'm an AI/ML engineer who thrives at the intersection of intelligent
            systems and practical engineering. I don't just prototype — I ship,
            taking products from raw idea to deployed system, end to end.
          </p>
          <p className="about-body">
            My work spans LLM orchestration, real-time voice agents, computer
            vision pipelines, OCR systems, vector-database–powered search, and
            full-stack Django and FastAPI backends. I've led engineering teams,
            built platforms used by thousands of students, and turned complex AI
            research into clean, production-ready code.
          </p>
          <p className="about-body">
            Currently I'm the Technical Head at Siksha Bhavishayan, where I
            architect AI-driven counseling tools and own the full engineering
            lifecycle — from sprint planning to cloud deployment.
          </p>
        </motion.section>

        {/* Experience */}
        <motion.section className="about-section" {...rise}>
          <h2 className="about-heading">Experience</h2>
          <div className="about-exp-list">
            {experience.map((job) => (
              <div className="about-exp" key={job.company}>
                <div className="about-exp-head">
                  <div>
                    <h3 className="about-exp-role">{job.role}</h3>
                    <span className="about-exp-company">{job.company}</span>
                  </div>
                  <span className="about-exp-period">{job.period}</span>
                </div>
                <p className="about-exp-desc">{job.description}</p>
                <div className="about-tags">
                  {job.tech.map((t) => (
                    <span className="about-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section className="about-section" {...rise}>
          <h2 className="about-heading">Skills</h2>
          <div className="about-skills">
            {skills.map((group) => (
              <div className="about-skill-group" key={group.group}>
                <h3 className="about-skill-title">{group.group}</h3>
                <div className="about-tags">
                  {group.tags.map((tag) => (
                    <span className="about-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section className="about-contact" {...rise}>
          <h2 className="about-contact-title">Let's build something.</h2>
          <p className="about-contact-sub">
            Tell me what you're working on — I'm open to interesting problems.
          </p>
          <div className="about-contact-links">
            <a href="mailto:sanskarlal23@gmail.com" className="about-contact-link">
              sanskarlal23@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/sanskar-lalawat/"
              target="_blank"
              rel="noreferrer"
              className="about-contact-link about-contact-link--ghost"
            >
              LinkedIn →
            </a>
          </div>
        </motion.section>

        <footer className="about-footer">
          <span>© {new Date().getFullYear()} Sanskar Lalawat</span>
          <span>AI Engineer — India</span>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
