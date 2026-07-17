import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { getProjectBySlug, getNextProject } from "../data/projects";
import "./ProjectDetail.css";

const rise = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

/* Features written as "Title — description" split into card title + body. */
const splitFeature = (text) => {
  const i = text.indexOf("—");
  if (i > 6 && i < text.length - 6) {
    return [text.slice(0, i).trim(), text.slice(i + 1).trim()];
  }
  return [null, text];
};

/* ── How it works — voice agent case study only ── */
const voiceSteps = [
  {
    title: "Call comes in",
    body: "A student dials the institute's number. Plivo picks up the PSTN call and opens a WebSocket to the FastAPI server, streaming raw mulaw audio in real time.",
  },
  {
    title: "Three coroutines boot",
    body: "Every call runs three asyncio coroutines concurrently — a Plivo pump streaming audio in, a Deepgram pump handling transcription, and a turn runner orchestrating the response.",
  },
  {
    title: "Speech becomes text",
    body: "Deepgram transcribes the caller as they speak. The moment a speech_final event fires, the turn is handed to the LLM — typically in under 300 ms.",
  },
  {
    title: "The LLM decides",
    body: "GPT-4o-mini generates the reply with full conversation context. When it detects intent, it calls tools instead of just talking:",
    tools: [
      { name: "book_lead()", desc: "logs the lead to SQLite and pushes it to Google Sheets" },
      { name: "transfer_call()", desc: "bridges the caller to a human counselor via Plivo REST" },
    ],
  },
  {
    title: "Voice goes back out",
    body: "The reply is split into sentences. Each one is synthesized by Sarvam AI in under 200 ms and streamed back while the LLM is still writing the next — the full loop stays under a second.",
  },
];

const HowItWorks = () => (
  <div className="cs-steps">
    {voiceSteps.map((step, i) => (
      <div className="cs-step" key={i}>
        <span className="cs-step-num">{String(i + 1).padStart(2, "0")}</span>
        <div className="cs-step-body">
          <h3 className="cs-step-title">{step.title}</h3>
          <p className="cs-step-desc">{step.body}</p>
          {step.tools && (
            <div className="cs-step-tools">
              {step.tools.map((t) => (
                <div className="cs-step-tool" key={t.name}>
                  <code>{t.name}</code>
                  <span>{t.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

/* ── Comparison — voice agent case study only ── */
const compareRows = [
  { label: "Cost per minute", human: "₹30–50", siya: "₹2–3" },
  { label: "Availability", human: "9 AM – 6 PM", siya: "24 / 7" },
  { label: "Missed calls", human: "Yes, off-hours", siya: "Zero" },
  { label: "Languages", human: "One per agent", siya: "Auto-detects both" },
  { label: "Lead capture", human: "Manual entry", siya: "Automatic, to Sheets" },
  { label: "Response time", human: "Hold music", siya: "Under a second" },
];

const ComparisonTable = () => (
  <div className="cs-table">
    <div className="cs-table-row cs-table-head">
      <span />
      <span>Human call center</span>
      <span>Siya</span>
    </div>
    {compareRows.map((row) => (
      <div className="cs-table-row" key={row.label}>
        <span className="cs-table-label">{row.label}</span>
        <span className="cs-table-human">{row.human}</span>
        <span className="cs-table-siya">{row.siya}</span>
      </div>
    ))}
  </div>
);

const ProjectDetail = ({ slug, onBack, onOpenProject }) => {
  const project = getProjectBySlug(slug);
  const nextProject = getNextProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="cs-page">
        <div className="cs-container">
          <h1 className="cs-title">Not found</h1>
          <p className="cs-subtitle">This project doesn't exist.</p>
        </div>
      </div>
    );
  }

  const isVoiceAgent = project.slug === "ai-voice-calling-agent";
  const [intro, ...restParas] = project.longDescription;

  return (
    <div className="cs-page" key={slug} style={{ "--accent": project.accent }}>
      <div className="cs-container">
        {/* Back */}
        <button className="cs-back" onClick={onBack}>
          <span className="cs-back-arrow">←</span> All projects
        </button>

        {/* Hero */}
        <motion.header
          className="cs-hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cs-meta">
            <span>{project.role}</span>
            <span className="cs-meta-dot">·</span>
            <span>{project.year}</span>
          </div>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-subtitle">{project.subtitle}</p>
          <p className="cs-intro">{intro}</p>
          <div className="cs-tags">
            {project.tags.map((tag) => (
              <span className="cs-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </motion.header>

        {/* Stat band */}
        {project.metrics && (
          <motion.div className="cs-stats" {...rise}>
            {project.metrics.map((m) => (
              <div className="cs-stat" key={m.label}>
                <span className="cs-stat-value">{m.value}</span>
                <span className="cs-stat-label">{m.label}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Cover */}
        <motion.div
          className="cs-cover"
          style={{ background: project.gradient }}
          {...rise}
        >
          {project.image ? (
            <img src={project.image} alt={project.title} />
          ) : (
            <span className="cs-cover-title">{project.title}</span>
          )}
        </motion.div>

        {/* Overview */}
        <motion.section className="cs-section" {...rise}>
          <h2 className="cs-heading">Overview</h2>
          {restParas.map((para, i) => (
            <p className="cs-body" key={i}>{para}</p>
          ))}
        </motion.section>

        {/* Highlights */}
        <motion.section className="cs-section" {...rise}>
          <h2 className="cs-heading">Highlights</h2>
          <div className="cs-cards">
            {project.features.map((feature, i) => {
              const [title, body] = splitFeature(feature);
              return (
                <div className="cs-card" key={i}>
                  {title && <h3 className="cs-card-title">{title}</h3>}
                  <p className="cs-card-body">{body}</p>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* How it works — voice agent only */}
        {isVoiceAgent && (
          <motion.section className="cs-section" {...rise}>
            <h2 className="cs-heading">How a call works</h2>
            <p className="cs-body">
              From the caller's first word to Siya's reply, the whole loop runs in
              under a second. Here is what happens on every call:
            </p>
            <HowItWorks />
          </motion.section>
        )}

        {/* Comparison — voice agent only */}
        {isVoiceAgent && (
          <motion.section className="cs-section" {...rise}>
            <h2 className="cs-heading">Why not just hire more agents?</h2>
            <p className="cs-body">
              The institute was missing every call outside office hours. Siya
              answers all of them, in both languages, at a tenth of the cost.
            </p>
            <ComparisonTable />
          </motion.section>
        )}

        {/* Stack */}
        <motion.section className="cs-section" {...rise}>
          <h2 className="cs-heading">Stack</h2>
          <div className="cs-tags">
            {project.tags.map((tag) => (
              <span className="cs-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </motion.section>

        {/* Gallery — only when real images exist */}
        {project.gallery.length > 0 && (
          <motion.section className="cs-section" {...rise}>
            <div className="cs-gallery">
              {project.gallery.map((src, i) => (
                <div className="cs-gallery-item" key={i}>
                  <img src={src} alt={`${project.title} — ${i + 1}`} />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Next project */}
        <motion.section className="cs-next-wrap" {...rise}>
          <span className="cs-next-label">Next project</span>
          <button className="cs-next" onClick={() => onOpenProject(nextProject.slug)}>
            {nextProject.title}
            <span className="cs-next-arrow">→</span>
          </button>
        </motion.section>

        <footer className="cs-footer">
          <span>© {new Date().getFullYear()} Sanskar Lalawat</span>
          <span>AI Engineer — India</span>
        </footer>
      </div>
    </div>
  );
};

export default ProjectDetail;
