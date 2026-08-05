// Single source of truth for all project showcase data.
// `image` / `gallery` accept paths under /public — leave null to use the
// generated gradient cover instead.
const projectsData = [
  {
    id: 1,
    slug: "ias-sathi",
    title: "IAS Sathi",
    subtitle: "AI-Driven UPSC Preparation Platform",
    description:
      "A four-module AI platform for UPSC aspirants — a RAG chatbot grounded in NCERT, self-adapting MCQ practice, OCR-based handwritten answer evaluation, and AI-generated live lectures.",
    longDescription: [
      "IAS Sathi is a full-stack AI learning ecosystem built for one of the most competitive exams in the world. Rather than a single chatbot bolted onto a course site, it ships four distinct AI modules — a retrieval-grounded mentor, an adaptive MCQ engine, an examiner-style answer evaluator, and an on-demand lecture generator — all reading from the same NCERT knowledge base.",
      "Everything is grounded in one place: the full NCERT corpus, updated through 2025 and embedded into a vector store. Every module reads from that same retrieval layer, so a concept explained by the mentor, tested in an MCQ, and marked in a handwritten answer all trace back to the same source material rather than to whatever the model happens to remember.",
    ],
    // Each module becomes its own case-study section with a matching visual.
    // To add a demo clip to a module, drop the file in /public and add:
    //   demo: { src: "/ias-sathi-mentor.mp4", poster: "/ias-sathi-mentor.jpg" }
    // The video renders under that module's copy. `poster` is optional but
    // worth having — without it the player shows a black frame until played.
    modules: [
      {
        label: "AI Mentor",
        visual: "rag",
        body: "The mentor answers from retrieved NCERT passages rather than the model's own recall — grounding that lifted answer quality roughly 70% over the earlier non-retrieval build. Responses come back structured the way an examiner expects, with graphs and diagrams where a concept is easier drawn than described, and a set of related follow-up questions so an aspirant can practise the topic immediately in UPSC format.",
      },
      {
        label: "Adaptive MCQs",
        visual: "mcq",
        body: "The MCQ engine profiles each student's performance and generates fresh questions from the same NCERT vectors. Every attempt is written to a history, so a question is never served to the same aspirant twice — practice keeps moving into untested ground instead of recycling what they already know.",
      },
      {
        label: "Answer Evaluation",
        visual: "ocr",
        body: "Aspirants photograph a handwritten answer sheet and a custom OCR pipeline transcribes it at around 90% accuracy, holding up even on poor handwriting. The transcript is then marked the way a UPSC teacher would mark it — introduction, body and conclusion scored separately, with written feedback next to the marks rather than a bare number.",
      },
      {
        label: "Live Lectures",
        visual: "lecture",
        body: "Give the system a topic and a short note on what you want covered, and it teaches the session — a full explanation with supporting graphs, images and generated slides, so a concept lands the way it would in a classroom instead of being read off a page.",
      },
    ],
    features: [
      "RAG chatbot grounded in the full NCERT corpus, updated through 2025 — ~70% better answer quality than the previous non-retrieval build",
      "Structured, examiner-style answers with generated graphs and diagrams, plus related follow-up questions in UPSC format",
      "Adaptive MCQ engine that profiles the student and generates questions from the NCERT vector store",
      "Full attempt history so no MCQ is ever repeated to the same aspirant",
      "Custom OCR pipeline reading handwritten answer sheets at ~90% accuracy, including poor handwriting",
      "Answer evaluation scored on introduction, body and conclusion structure with written examiner-style feedback",
      "AI live lecture generator — give a topic and it produces explanation, graphs, images and slides like a teacher",
    ],
    metrics: [
      { value: "~70%", label: "better answers vs. pre-RAG" },
      { value: "~90%", label: "OCR accuracy" },
      { value: "2025", label: "NCERT corpus" },
      { value: "4", label: "AI modules" },
    ],
    category: "Web Application",
    year: "2024",
    role: "AI Engineer & Full-Stack Developer",
    client: "EdTech",
    tags: ["Python", "Django", "LLMs", "RAG", "Vector Databases", "OCR", "AWS"],
    accent: "#85B9A5",
    gradient: "linear-gradient(135deg, #85B9A5 0%, #7FA6A8 100%)",
    coverVideo: "/cover-ias-sathi.mp4",
    image: null,
    gallery: [],
  },
  {
    id: 2,
    slug: "answer-evaluation",
    title: "Answer Evaluation",
    subtitle: "Two-stage service: extract the student's answer, then evaluate it like an examiner",
    description:
      "A FastAPI microservice built in two halves — one that lifts a student's handwritten answer off the page, and one that marks it against a six-part examiner rubric.",
    longDescription: [
      "Answer Evaluation is the marking engine behind IAS Sathi's test series, pulled out into its own FastAPI service. It splits cleanly in two: extraction turns a photographed answer booklet into structured question/answer text, and evaluation marks that text the way a UPSC examiner would. Keeping them separate means either half can be called on its own — a scanned booklet can be digitised without being graded, and typed answers can be graded without ever touching OCR.",
      "The whole thing runs on FastAPI behind a Kafka consumer and a Redis/RQ worker pool, because a bulk test submission is far too slow to mark on the request path. Generated artefacts — annotated scans, Mermaid diagrams rendered through Playwright, and ReportLab PDFs typeset in Latin, Devanagari or Gurmukhi script — are written to S3 and returned as links.",
    ],
    // The service's two halves, each with its own section and visual.
    // To add a demo clip, drop the file in /public and add:
    //   demo: { src: "/answer-eval-extract.mp4", poster: "/answer-eval-extract.jpg" }
    modules: [
      {
        label: "Extraction",
        visual: "extract",
        body: "The first half turns paper into structured text. PyMuPDF rasterises the booklet page by page, and every page is preprocessed and transcribed concurrently rather than one after another. The preprocessing is what carries the accuracy: a 2x Lanczos upscale, dark-border cropping, a bilateral filter that smooths paper grain without softening pen strokes, morphological background normalisation to flatten uneven phone-camera lighting, then adaptive Gaussian thresholding and sharpening. Only the cleaned page reaches the vision model, which is what holds transcription near 90% on genuinely poor handwriting. The model marks question boundaries as it reads, so the raw transcript is then split into question/answer pairs — each answer being everything between one question and the next — and deduplicated before it leaves this stage.",
      },
      {
        label: "Evaluation",
        visual: "evaluate",
        body: "The second half marks the extracted answer. Rather than collapsing everything into one number, it scores six dimensions separately — introduction, content quality, analysis and argumentation, paraphrasing and expression, following instructions, and conclusion — so an aspirant can see whether they lost marks on substance or on structure. Essays run against their own rubric covering structure, depth of analysis, originality, interdisciplinary approach, language and presentation. Model answers are grounded against a Pinecone index of current material instead of being written from the model's own recall, and the feedback comes back three ways: written suggestions, the mistakes circled directly on the student's own scanned page, and a typeset model answer PDF with diagrams.",
      },
    ],
    features: [
      "Handwriting OCR — OpenCV preprocessing ahead of vision-model transcription, holding ~90% accuracy on poor handwriting",
      "Six-dimension rubric — introduction, content quality, analysis and argumentation, paraphrasing and expression, following instructions and conclusion scored separately",
      "Separate essay rubric — structure, depth of analysis, originality, interdisciplinary approach, language and presentation",
      "Mistakes circled in place — errors annotated onto the aspirant's own scanned page rather than only described in text",
      "Model-answer PDFs — typeset with ReportLab, including Mermaid diagrams rendered via Playwright and CairoSVG",
      "Trilingual output — English, Hindi and Punjabi, with bundled Noto and Tiro fonts for Devanagari and Gurmukhi",
      "Retrieval-grounded — model answers checked against a Pinecone index instead of the model's own recall",
      "Queued at scale — a Kafka consumer plus a Redis/RQ worker pool keeps bulk marking off the request path",
    ],
    metrics: [
      { value: "~90%", label: "OCR accuracy" },
      { value: "6", label: "rubric dimensions" },
      { value: "3", label: "languages" },
      { value: "PDF", label: "model answers" },
    ],
    category: "AI Microservice",
    year: "2025",
    role: "AI Engineer & Backend Developer",
    client: "IAS Sathi",
    tags: ["Python", "FastAPI", "OpenAI", "OpenCV", "Google Cloud Vision", "Pinecone", "Kafka", "Redis / RQ", "ReportLab", "Docker"],
    accent: "#BFA05A",
    gradient: "linear-gradient(135deg, #BFA05A 0%, #A8823C 100%)",
    image: null,
    gallery: [],
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
