import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProjectBySlug, getNextProject } from "../data/projects";
import "./ProjectDetail.css";

/* ── Per-section visuals for the pinned panel ── */
const OrbitVisual = () => (
  <svg className="cs-pv-svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" r="46" className="cs-pv-ring" />
    <circle cx="120" cy="120" r="80" className="cs-pv-ring" />
    <circle cx="120" cy="120" r="112" className="cs-pv-ring" />
    <g className="cs-pv-orbit">
      <circle cx="120" cy="8" r="6" className="cs-pv-solid" />
    </g>
    <circle cx="120" cy="120" r="11" className="cs-pv-solid" />
  </svg>
);

// Signal-transformation flow: the voice changes form as it moves down the
// pipeline — waveform (you) → text (transcript) → spark (LLM) → waveform (Siya).
// A comet flows down the spine and each stage ignites as it passes.
const tfRep = (type) => {
  if (type === "wave") {
    const hs = [9, 16, 23, 15, 10];
    return (
      <g className="cs-tf-wave">
        {hs.map((h, j) => (
          <rect
            key={j}
            x={-12 + j * 6}
            y={-h / 2}
            width="3"
            height={h}
            rx="1.5"
            className="cs-tf-wavebar"
            style={{ animationDelay: `${j * 0.1}s` }}
          />
        ))}
      </g>
    );
  }
  if (type === "text") {
    return (
      <g>
        <rect x="-13" y="-7" width="26" height="2.6" rx="1.3" className="cs-tf-line" />
        <rect x="-13" y="-1" width="20" height="2.6" rx="1.3" className="cs-tf-line" />
        <rect x="-13" y="5" width="14" height="2.6" rx="1.3" className="cs-tf-line" />
      </g>
    );
  }
  return (
    <g className="cs-tf-spark">
      <path d="M0 -14 V14 M-14 0 H14 M-8 -8 L8 8 M-8 8 L8 -8" className="cs-tf-sparkline" />
      <circle r="2.6" className="cs-pv-solid" />
    </g>
  );
};

const TF_STAGES = [
  { type: "wave", label: "You speak" },
  { type: "text", label: "Transcribed" },
  { type: "ai", label: "GPT-4o-mini" },
  { type: "wave", label: "Siya replies" },
];
const TF_YS = [48, 118, 188, 258];
const FlowVisual = () => {
  const cx = 92;
  return (
    <svg className="cs-pv-svg cs-tf" viewBox="0 0 250 306">
      <line x1={cx} y1="48" x2={cx} y2="258" className="cs-tf-track" />
      <circle cx={cx} r="9" className="cs-tf-comet-glow">
        <animate attributeName="cy" values="48;258;48" dur="3.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} r="4" className="cs-pv-solid">
        <animate attributeName="cy" values="48;258;48" dur="3.4s" repeatCount="indefinite" />
      </circle>
      {TF_STAGES.map((s, i) => (
        <g key={i} transform={`translate(${cx} ${TF_YS[i]})`}>
          <g className="cs-tf-stage" style={{ animationDelay: `${((TF_YS[i] - 48) / 210) * 1.7}s` }}>
            <circle r="21" className="cs-tf-bubble" />
            {tfRep(s.type)}
          </g>
          <text x="36" y="4" textAnchor="start" className="cs-pv-text cs-pv-text--sm">{s.label}</text>
        </g>
      ))}
    </svg>
  );
};

const CompareVisual = () => (
  <svg className="cs-pv-svg" viewBox="0 0 240 240">
    <rect x="44" y="46" width="56" height="150" rx="7" className="cs-pv-bar-a" />
    <text x="72" y="216" className="cs-pv-text" textAnchor="middle">Human</text>
    <text x="72" y="38" className="cs-pv-text cs-pv-text--sm" textAnchor="middle">₹30–50</text>
    <rect x="140" y="150" width="56" height="46" rx="7" className="cs-pv-bar-b" />
    <text x="168" y="216" className="cs-pv-text" textAnchor="middle">Siya</text>
    <text x="168" y="142" className="cs-pv-text cs-pv-text--sm" textAnchor="middle">₹2–3</text>
  </svg>
);

const GridVisual = ({ count }) => (
  <div className="cs-pv-grid">
    {Array.from({ length: Math.min(count, 6) }).map((_, i) => (
      <span key={i} className="cs-pv-cell" style={{ animationDelay: `${i * 0.18}s` }}>✓</span>
    ))}
  </div>
);

// Tech stack as a lively marquee: rows of pills drift in alternating directions
// with faded edges — a modern tech-stack ticker.
const PillsVisual = ({ tags }) => {
  const rows = [[], [], []];
  tags.forEach((t, i) => rows[i % 3].push(t));
  return (
    <div className="cs-stack">
      {rows.map((row, r) => (
        <div className="cs-stack-row" key={r}>
          <div className={`cs-stack-track ${r % 2 ? "cs-stack-track--rev" : ""}`}>
            {[...row, ...row, ...row].map((t, i) => (
              <span className="cs-pv-pill" key={i}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Radial voice-visualiser orb: a glowing core with a slowly-rotating ring of
// audio bars pulsing like a live voice, plus expanding sound ripples.
const VOICE_BARS = 40;
const CallVisual = () => (
  <svg className="cs-pv-svg cs-voice" viewBox="0 0 260 230">
    {/* live status chip */}
    <rect x="100" y="4" width="60" height="22" rx="11" className="cs-call-chip" />
    <circle cx="116" cy="15" r="3.4" className="cs-call-live" />
    <text x="125" y="19" className="cs-call-livetext">LIVE</text>

    {/* expanding sound ripples */}
    <circle cx="130" cy="126" r="46" className="cs-ripple" style={{ animationDelay: "0s" }} />
    <circle cx="130" cy="126" r="46" className="cs-ripple" style={{ animationDelay: "1.2s" }} />

    {/* soft halo */}
    <circle cx="130" cy="126" r="60" className="cs-call-glow" />

    {/* rotating radial waveform */}
    <g className="cs-voice-ring">
      {Array.from({ length: VOICE_BARS }).map((_, i) => (
        <g key={i} transform={`rotate(${i * (360 / VOICE_BARS)} 130 126)`}>
          <rect
            x="128.7"
            y="70"
            width="2.6"
            height="22"
            rx="1.3"
            className="cs-voice-bar"
            style={{ animationDelay: `${(i % 20) * 0.06}s` }}
          />
        </g>
      ))}
    </g>

    {/* glowing core */}
    <circle cx="130" cy="126" r="34" className="cs-voice-core" />
    <circle cx="130" cy="126" r="34" className="cs-voice-core cs-voice-core--pulse" />
    <path d="M130 116 v20 M120 120 v12 M140 120 v12 M112 124 v4 M148 124 v4" className="cs-voice-eq" />
  </svg>
);

const PinVisual = ({ label, project }) => {
  switch (label) {
    case "See it in action":
      return <CallVisual />;
    case "How it works":
      return <FlowVisual />;
    case "vs. Humans":
      return <CompareVisual />;
    case "Highlights":
      return <GridVisual count={project.features.length} />;
    case "Stack":
      return <PillsVisual tags={project.tags} />;
    default:
      return <OrbitVisual />;
  }
};

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
  const progressRef = useRef(null);
  const sectionRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActive(0);
  }, [slug]);

  // Scrollytelling: mark the section crossing the viewport's middle band as active.
  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.idx));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  // Thin reading-progress bar tied to scroll position.
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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

  // Numbered content sections — conditional ones only appear for the voice agent.
  const sections = [
    {
      label: "Overview",
      body: restParas.map((para, i) => (
        <p className="cs-body" key={i}>{para}</p>
      )),
    },
    ...(isVoiceAgent
      ? [{
          label: "See it in action",
          body: (
            <>
              <p className="cs-body">
                A live walkthrough of Siya handling a real call — hear how she
                greets the caller, answers questions, and captures the lead.
              </p>
              <div className="cs-demo">
                <video
                  src="/voice-agent-demo.mp4"
                  poster="/voice-agent-demo-poster-v2.jpg"
                  controls
                  playsInline
                  preload="none"
                />
              </div>
            </>
          ),
        }]
      : []),
    {
      label: "Highlights",
      body: (
        <div className="cs-cards">
          {project.features.map((feature, i) => {
            const [title, bodyText] = splitFeature(feature);
            return (
              <div className="cs-card" key={i}>
                {title && <h3 className="cs-card-title">{title}</h3>}
                <p className="cs-card-body">{bodyText}</p>
              </div>
            );
          })}
        </div>
      ),
    },
    ...(isVoiceAgent
      ? [{
          label: "How it works",
          body: (
            <>
              <p className="cs-body">
                From the caller's first word to Siya's reply, the whole loop
                runs in under a second. Here is what happens on every call:
              </p>
              <HowItWorks />
            </>
          ),
        }]
      : []),
    ...(isVoiceAgent
      ? [{
          label: "vs. Humans",
          body: (
            <>
              <p className="cs-body">
                The institute was missing every call outside office hours. Siya
                answers all of them, in both languages, at a tenth of the cost.
              </p>
              <ComparisonTable />
            </>
          ),
        }]
      : []),
    {
      label: "Stack",
      body: (
        <div className="cs-tags">
          {project.tags.map((tag) => (
            <span className="cs-tag" key={tag}>{tag}</span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="cs-page" key={slug} style={{ "--accent": project.accent }}>
      <div className="cs-progress">
        <span className="cs-progress-fill" ref={progressRef} />
      </div>
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

        {/* Scrollytelling: pinned visual + scrolling narrative */}
        <div className="cs-scrolly">
          {/* Pinned panel — reacts to the active section */}
          <div className="cs-pin">
            <div className="cs-pin-panel" style={{ background: project.gradient }}>
              <span className="cs-pin-project">{project.title}</span>

              <div className="cs-pin-stage">
                <AnimatePresence mode="wait">
                  <motion.div
                    className="cs-pin-visual"
                    key={active}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PinVisual label={sections[active].label} project={project} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="cs-pin-foot">
                <AnimatePresence mode="wait">
                  <motion.div
                    className="cs-pin-body"
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="cs-pin-num">
                      {String(active + 1).padStart(2, "0")}
                      <span className="cs-pin-total"> / {String(sections.length).padStart(2, "0")}</span>
                    </span>
                    <span className="cs-pin-label">{sections[active].label}</span>
                  </motion.div>
                </AnimatePresence>
                <div className="cs-pin-dots">
                  {sections.map((s, i) => (
                    <span key={s.label} className={`cs-pin-dot ${i === active ? "on" : ""}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling narrative */}
          <div className="cs-story">
            {sections.map((s, i) => (
              <section
                className="cs-story-section"
                key={s.label}
                data-idx={i}
                ref={(el) => (sectionRefs.current[i] = el)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="cs-story-head">
                    <span className="cs-story-num">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="cs-story-label">{s.label}</h2>
                  </div>
                  <div className="cs-story-col">{s.body}</div>
                </motion.div>
              </section>
            ))}
          </div>
        </div>

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
