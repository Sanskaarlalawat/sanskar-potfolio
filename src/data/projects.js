// Single source of truth for all project showcase data.
// `image` / `gallery` accept paths under /public — leave null to use the
// generated gradient cover instead.
const projectsData = [
  {
    id: 1,
    slug: "ias-sathi",
    title: "IAS Sathi",
    subtitle: "AI-Driven IAS Preparation Platform",
    description:
      "An end-to-end AI-powered platform for IAS aspirants featuring chatbot assistance, answer evaluation, OCR, speech-to-text, flowchart-based guidance, and test series.",
    longDescription: [
      "IAS Sathi is a full-stack AI learning ecosystem built for one of the most competitive exams in the world. The platform brings together a conversational AI mentor, automated answer evaluation, and structured study journeys into one cohesive product.",
      "The core engine combines large language models with custom-built OCR and speech-to-text pipelines, letting aspirants submit handwritten answers and receive structured, examiner-style feedback within seconds. Flowchart-based guidance maps the entire syllabus into navigable decision trees.",
      "Built on Django and deployed on AWS, the system handles concurrent evaluation jobs through a queued inference architecture, keeping response times predictable even under heavy load.",
    ],
    features: [
      "LLM-powered chatbot mentor trained on UPSC-specific corpus",
      "Handwritten answer evaluation via OCR + LLM scoring rubric",
      "Speech-to-text for verbal answer practice",
      "Flowchart-based syllabus navigation and guidance",
      "Full test-series engine with analytics dashboard",
    ],
    category: "Web Application",
    year: "2024",
    role: "AI Engineer & Full-Stack Developer",
    client: "EdTech",
    tags: ["Python", "Django", "LLMs", "AWS", "OCR", "Speech-to-Text"],
    accent: "#85B9A5",
    gradient: "linear-gradient(135deg, #85B9A5 0%, #7FA6A8 100%)",
    coverVideo: "/cover-ias-sathi.mp4",
    image: null,
    gallery: [],
  },
  {
    id: 2,
    slug: "ai-voice-calling-agent",
    title: "AI Voice Calling Agent",
    subtitle: "Autonomous bilingual phone agent for UPSC coaching — built for Raj Malhotra IAS",
    description:
      "Fully autonomous AI phone agent 'Siya' that handles real PSTN calls — bilingual, sub-second latency, lead capture, live transfers — at ₹2–3 per minute.",
    longDescription: [
      "Siya is a production-grade AI voice agent deployed for Raj Malhotra IAS, one of India's UPSC coaching institutes. She answers inbound calls 24/7 — greeting students, explaining courses and fees, capturing leads, and escalating to a human counselor exactly when needed. Zero scripts. Zero dead air. Zero human involvement for routine enquiries.",
      "The core engine runs three asyncio coroutines simultaneously per call. A Plivo WebSocket pump streams raw mulaw audio from the PSTN network to Deepgram's real-time STT. The moment Deepgram emits a speech_final event, a turn runner fires: GPT-4o-mini generates a response, the text is split into natural sentences, each sentence is synthesized by Sarvam AI in under 200ms, and audio is piped back to the caller before the LLM even finishes generating the next sentence. The result is conversational latency that feels human.",
      "Bilingual support is handled without any user setting. Every utterance is scanned for Devanagari characters — if detected, the language lock switches to Hindi and stays there for the rest of the call, injected directly into the LLM system prompt. Barge-in detection lets callers interrupt Siya mid-sentence; the agent stops speaking immediately and listens. Every call is recorded, logged with a full transcript, and all captured leads flow automatically into a Google Sheet for the sales team.",
    ],
    features: [
      "Real phone calls — handles PSTN inbound and outbound calls with no IVR menus, just natural conversation",
      "Bilingual by default — detects Hindi or English per utterance and locks the language for the rest of the call",
      "Sub-second latency — sentence-level TTS pipelining with Sarvam AI keeps every response under a second",
      "Barge-in detection — callers can interrupt Siya mid-sentence; she stops speaking and listens",
      "Tool calling — book_lead logs leads to Google Sheets, transfer_call bridges to a human via Plivo REST",
      "Full call records — every call stored with an audio playback link and complete transcript in SQLite",
      "Live dashboard — today's calls, leads, transfers, 7-day trends and a peak-hour graph",
    ],
    metrics: [
      { value: "₹2–3", label: "per minute" },
      { value: "<1s", label: "response latency" },
      { value: "2", label: "languages" },
      { value: "24/7", label: "uptime" },
    ],
    category: "AI Voice Agent",
    year: "2025",
    role: "AI Engineer & Backend Developer",
    client: "Raj Malhotra IAS",
    tags: ["Python", "FastAPI", "asyncio", "OpenAI GPT-4o-mini", "Deepgram STT", "Sarvam AI TTS", "Plivo", "WebSocket", "Google Sheets API", "SQLite"],
    accent: "#C47B5A",
    gradient: "linear-gradient(135deg, #C47B5A 0%, #A85C3A 100%)",
    image: null,
    gallery: [],
  },
  {
    id: 3,
    slug: "ncert-ai-chatbot",
    title: "NCERT AI Chatbot",
    subtitle: "Vector-Based Knowledge System",
    description:
      "GPT-powered chatbot using vector databases to answer NCERT-based UPSC queries with high contextual accuracy.",
    longDescription: [
      "A retrieval-augmented generation system built over the entire NCERT corpus — the foundational study material for UPSC aspirants. Every textbook was chunked, embedded, and indexed into a vector database for semantic retrieval.",
      "The chatbot grounds every answer in retrieved source passages, dramatically reducing hallucination and giving students citations back to the exact chapter and page. Query rewriting and hybrid search keep retrieval sharp even for vague, conversational questions.",
      "The result is a study companion that answers like a tutor who has actually read every book on the syllabus.",
    ],
    features: [
      "Full NCERT corpus embedded and semantically indexed",
      "RAG pipeline with citation-grounded answers",
      "Hybrid semantic + keyword retrieval",
      "Query rewriting for conversational follow-ups",
      "GPT-4o powered generation layer",
    ],
    category: "AI System",
    year: "2024",
    role: "AI Engineer",
    client: "EdTech",
    tags: ["GPT-4o", "Vector DB", "Python", "RAG", "Embeddings"],
    accent: "#7FA6A8",
    gradient: "linear-gradient(135deg, #7FA6A8 0%, #7A8FA6 100%)",
    image: null,
    gallery: [],
  },
  {
    id: 4,
    slug: "object-detection-system",
    title: "Object Detection System",
    subtitle: "Computer Vision Surveillance",
    description:
      "Large-scale object detection system deployed across 100+ locations using custom-trained models on 1000+ images.",
    longDescription: [
      "A production computer-vision platform monitoring 100+ physical locations in real time. Custom detection models were trained on a hand-labelled dataset of over a thousand domain-specific images.",
      "Inference runs at the edge using OpenVINO-optimized models, keeping latency low and bandwidth costs near zero — only detection events leave the device. A central dashboard aggregates alerts across every site.",
      "The deployment pipeline allows retrained models to roll out to the entire fleet with a single command.",
    ],
    features: [
      "Custom-trained detection models (Ultralytics YOLO)",
      "Edge inference optimized with OpenVINO",
      "Deployed across 100+ live locations",
      "Centralized alerting and analytics dashboard",
      "One-command fleet-wide model rollout",
    ],
    category: "Computer Vision",
    year: "2023",
    role: "Computer Vision Engineer",
    client: "Enterprise Security",
    tags: ["OpenCV", "OpenVINO", "Ultralytics", "Python", "Edge AI"],
    accent: "#7A8FA6",
    gradient: "linear-gradient(135deg, #7A8FA6 0%, #8B7FB8 100%)",
    image: null,
    gallery: [],
  },
  {
    id: 5,
    slug: "whatsapp-chat-analysis",
    title: "WhatsApp Chat Analysis",
    subtitle: "NLP & Behavioral Insights",
    description:
      "NLP-based analytics tool extracting engagement patterns and user behavior from WhatsApp conversations.",
    longDescription: [
      "An analytics engine that turns raw WhatsApp chat exports into behavioral insight. The tool parses message streams, then applies NLP to surface sentiment trends, engagement rhythms, and conversational dynamics.",
      "Interactive visualizations reveal who drives conversations, when groups are most alive, and how sentiment shifts over time — patterns invisible in the raw chat log.",
      "Built as a fast, privacy-first pipeline: all processing happens locally, nothing leaves the machine.",
    ],
    features: [
      "Chat-export parsing for individual and group chats",
      "Sentiment analysis and emotion tracking over time",
      "Engagement heatmaps by hour, day, and participant",
      "Topic and keyword trend extraction",
      "Local-only processing — fully private",
    ],
    category: "Data Science",
    year: "2023",
    role: "Data Scientist",
    client: "Personal / Open Source",
    tags: ["Python", "NLP", "ML", "Pandas", "Visualization"],
    accent: "#9B82C4",
    gradient: "linear-gradient(135deg, #8B7FB8 0%, #7C5AA3 100%)",
    image: null,
    gallery: [],
  },
  {
    id: 6,
    slug: "face-recognition-system",
    title: "Face Recognition System",
    subtitle: "Real-Time CV Application",
    description:
      "Real-time face recognition system with 95% accuracy using deep learning and live camera integration.",
    longDescription: [
      "A real-time face recognition system achieving 95% accuracy on live camera streams. Deep-learning embeddings map every detected face into a vector space where identity matching becomes a fast nearest-neighbour lookup.",
      "The pipeline handles detection, alignment, embedding, and matching at full camera frame-rate, staying robust across lighting changes, partial occlusion, and head pose variation.",
      "Enrollment is instant: a single reference photo is enough to start recognizing a new identity in the live stream.",
    ],
    features: [
      "95% recognition accuracy on live video",
      "Full-framerate detection → alignment → matching pipeline",
      "Single-photo identity enrollment",
      "Robust to lighting, occlusion, and pose changes",
      "TensorFlow deep-learning embedding model",
    ],
    category: "Computer Vision",
    year: "2022",
    role: "ML Engineer",
    client: "R&D",
    tags: ["TensorFlow", "OpenCV", "Deep Learning", "Python"],
    accent: "#B07DB8",
    gradient: "linear-gradient(135deg, #7C5AA3 0%, #6D3B91 100%)",
    image: null,
    gallery: [],
  },
  {
    id: 7,
    slug: "web-feature-extraction-bot",
    title: "Web Feature Extraction Bot",
    subtitle: "AI Automation Tool",
    description:
      "ChatGPT-powered bot that scrapes websites and extracts structured features in real time.",
    longDescription: [
      "An autonomous extraction agent that reads arbitrary websites and returns clean, structured data. Point it at a URL and it scrapes the page, feeds the content through ChatGPT, and emits typed feature objects in real time.",
      "The LLM layer makes the scraper resilient: instead of brittle CSS selectors, extraction is driven by semantic understanding of the page, so layout changes don't break the pipeline.",
      "Built for product-data aggregation, competitive analysis, and any workflow that needs the web turned into a database.",
    ],
    features: [
      "Semantic extraction — no brittle selectors",
      "Real-time streaming of structured results",
      "Schema-driven output (JSON feature objects)",
      "Resilient to site layout changes",
      "ChatGPT API powered understanding layer",
    ],
    category: "AI Automation",
    year: "2023",
    role: "AI Engineer",
    client: "Internal Tooling",
    tags: ["ChatGPT API", "Web Scraping", "Python", "Automation"],
    accent: "#9B6B8B",
    gradient: "linear-gradient(135deg, #6D3B91 0%, #5A2F78 100%)",
    image: null,
    gallery: [],
  },
];

export const getProjectBySlug = (slug) =>
  projectsData.find((p) => p.slug === slug) || null;

export const getNextProject = (slug) => {
  const idx = projectsData.findIndex((p) => p.slug === slug);
  if (idx === -1) return projectsData[0];
  return projectsData[(idx + 1) % projectsData.length];
};

export default projectsData;
