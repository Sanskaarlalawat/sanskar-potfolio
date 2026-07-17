import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  GraduationCap, PhoneCall, MessageCircle, Boxes, BarChart3, ScanFace, Bot,
  Database, X,
} from "lucide-react";
import projectsData from "../data/projects";
import "./FinderProjects.css";

// Pastel folder colors + matching deep glyph tones, one per project.
const PALETTE = [
  { base: "#89B4E8", deep: "#33598C" }, // blue
  { base: "#E8C291", deep: "#8C6730" }, // tan
  { base: "#93CDA8", deep: "#3C7252" }, // green
  { base: "#E89A94", deep: "#8C423C" }, // rose
  { base: "#BBA0E2", deep: "#5D4685" }, // purple
  { base: "#85CBCF", deep: "#356E72" }, // teal
];

// Each project gets an icon that reflects what it actually is.
const GLYPH_BY_SLUG = {
  "ias-sathi": GraduationCap,
  "ai-voice-calling-agent": PhoneCall,
  "ncert-ai-chatbot": MessageCircle,
  "object-detection-system": Boxes,
  "whatsapp-chat-analysis": BarChart3,
  "face-recognition-system": ScanFace,
  "web-feature-extraction-bot": Bot,
};

const projectStyle = (project) => {
  const i = projectsData.findIndex((p) => p.id === project.id);
  return {
    palette: PALETTE[i % PALETTE.length],
    Glyph: GLYPH_BY_SLUG[project.slug] || Database,
  };
};

// Layered 3D folder: dark back panel with the tab, paper sheets inside, and a
// front flap that swings open on hover (see .fp-folder rules in the CSS).
const Folder = ({ color = "#89B4E8", deep, glyph: Glyph, size = 84 }) => (
  <span
    className="fp-folder"
    style={{ width: size, height: size * 0.8, "--fc": color, "--fd": deep || color }}
  >
    <svg className="fp-f-back" viewBox="0 0 100 80" width="100%" height="100%">
      <path d="M8 18 a9 9 0 0 1 9-9 h19 a9 9 0 0 1 6.8 3.1 l4.4 5.1 H83 a9 9 0 0 1 9 9 v36 a9 9 0 0 1-9 9 H17 a9 9 0 0 1-9-9 Z" />
    </svg>
    <span className="fp-f-paper-back" />
    <span className="fp-f-paper" />
    <span className="fp-f-front">
      {Glyph && deep && (
        <Glyph className="fp-folder-glyph" size={Math.round(size * 0.3)} strokeWidth={2.1} />
      )}
    </span>
    <span className="fp-f-shadow" />
  </span>
);

// Cursor-following tilt: writes rotation vars consumed by .fp-folder.
const tiltHandlers = {
  onMouseMove: (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ty", `${(x * 26).toFixed(1)}deg`);
    e.currentTarget.style.setProperty("--tx", `${(-y * 18).toFixed(1)}deg`);
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.removeProperty("--ty");
    e.currentTarget.style.removeProperty("--tx");
  },
};

const DiskIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3.5" width="14" height="9" rx="2" fill="#8a8890" />
    <rect x="1" y="3.5" width="14" height="4.5" rx="2" fill="#a8a6ae" />
    <circle cx="12.2" cy="10.2" r="1.1" fill="#5d5c62" />
  </svg>
);

const SearchIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <circle cx="5" cy="5" r="3.6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 8l2.6 2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const GridGlyph = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
    <rect x="0" y="0" width="5.5" height="5.5" rx="1" />
    <rect x="7.5" y="0" width="5.5" height="5.5" rx="1" />
    <rect x="0" y="7.5" width="5.5" height="5.5" rx="1" />
    <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" />
  </svg>
);

const ListGlyph = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
    <rect x="0" y="1" width="13" height="1.8" rx="0.9" />
    <rect x="0" y="5.6" width="13" height="1.8" rx="0.9" />
    <rect x="0" y="10.2" width="13" height="1.8" rx="0.9" />
  </svg>
);

const ALL = "All Projects";

const FinderProjects = ({ onOpenProject }) => {
  const [category, setCategory] = useState(ALL);
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState("grid");
  const [query, setQuery] = useState("");
  const [windowState, setWindowState] = useState("open"); // open | minimized | closing | closed
  const [expanded, setExpanded] = useState(false);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(projectsData.map((p) => p.category)))],
    []
  );

  // Sidebar folder colors follow the first project of each category.
  const categoryColor = useMemo(() => {
    const map = { [ALL]: "#8a8890" };
    categories.slice(1).forEach((cat) => {
      const first = projectsData.find((p) => p.category === cat);
      map[cat] = first ? projectStyle(first).palette.base : "#89B4E8";
    });
    return map;
  }, [categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projectsData.filter((p) => {
      const inCategory = category === ALL || p.category === category;
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [category, query]);

  const selected = selectedId
    ? projectsData.find((p) => p.id === selectedId) || null
    : null;

  // On phones the preview opens below the file grid — bring it into view.
  const previewRef = useRef(null);
  useEffect(() => {
    if (!selectedId || !previewRef.current) return;
    if (window.matchMedia("(max-width: 760px)").matches) {
      previewRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedId]);

  const closeWindow = () => {
    setWindowState("closing");
    setTimeout(() => setWindowState("closed"), 360);
  };

  const selectCategory = (cat) => {
    setCategory(cat);
    setSelectedId(null);
  };

  if (windowState === "closed") {
    return (
      <div className="fp-stage">
        <button className="fp-reopen" onClick={() => setWindowState("open")}>
          <Folder size={24} color="#89B4E8" /> Reopen Projects
        </button>
      </div>
    );
  }

  return (
    <div className={`fp-stage ${expanded ? "expanded" : ""}`}>
      <div
        className={`fp-window ${windowState === "minimized" ? "minimized" : ""} ${
          windowState === "closing" ? "closing" : ""
        }`}
      >
        {/* ── Toolbar ── */}
        <div className="fp-toolbar">
          <div className="fp-traffic">
            <button className="fp-tl fp-tl-red" onClick={closeWindow} aria-label="Close">
              <span>×</span>
            </button>
            <button
              className="fp-tl fp-tl-yellow"
              onClick={() => setWindowState(windowState === "minimized" ? "open" : "minimized")}
              aria-label="Minimize"
            >
              <span>−</span>
            </button>
            <button
              className="fp-tl fp-tl-green"
              onClick={() => setExpanded(!expanded)}
              aria-label="Zoom"
            >
              <span>+</span>
            </button>
          </div>

          <div className="fp-nav">
            <button
              disabled={category === ALL}
              onClick={() => selectCategory(ALL)}
              aria-label="Back"
            >
              ‹
            </button>
            <button disabled aria-label="Forward">›</button>
          </div>

          <div className="fp-title">
            ~/sanskar/projects{category !== ALL ? `/${category.toLowerCase().replace(/ /g, "-")}` : ""}
          </div>

          <div className="fp-spacer" />

          <div className="fp-seg">
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="Icon view">
              <GridGlyph />
            </button>
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="List view">
              <ListGlyph />
            </button>
          </div>

          <div className="fp-search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* ── Mobile category strip ── */}
        <div className="fp-cats">
          {categories.map((cat) => (
            <button
              key={cat}
              className={cat === category ? "active" : ""}
              onClick={() => selectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Body ── */}
        <div className="fp-body">
          <aside className="fp-sidebar">
            <div className="fp-side-label">Favorites</div>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`fp-side-item ${cat === category ? "active" : ""}`}
                onClick={() => selectCategory(cat)}
              >
                <Folder size={17} color={categoryColor[cat]} />
                {cat}
                <span className="fp-count">
                  {cat === ALL
                    ? projectsData.length
                    : projectsData.filter((p) => p.category === cat).length}
                </span>
              </button>
            ))}
            <div className="fp-side-label">Locations</div>
            <button className="fp-side-item" onClick={() => selectCategory(ALL)}>
              <DiskIcon />
              Macintosh HD
            </button>
          </aside>

          <div
            className="fp-content"
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}
          >
            {filtered.length === 0 ? (
              <div className="fp-empty">No items match “{query}”.</div>
            ) : view === "grid" ? (
              <div className="fp-grid">
                {filtered.map((project) => {
                  const { palette, Glyph } = projectStyle(project);
                  return (
                    <button
                      key={project.id}
                      className={`fp-item ${selectedId === project.id ? "selected" : ""}`}
                      onClick={() => setSelectedId(project.id)}
                      onDoubleClick={() => onOpenProject(project.slug)}
                      {...tiltHandlers}
                    >
                      <span className="fp-icon-wrap">
                        <Folder color={palette.base} deep={palette.deep} glyph={Glyph} />
                      </span>
                      <span className="fp-item-label">{project.title}</span>
                      <span className="fp-item-sub">{project.year}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <table className="fp-list">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Kind</th>
                    <th>Date</th>
                    <th>Stack</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((project) => {
                    const { palette, Glyph } = projectStyle(project);
                    return (
                      <tr
                        key={project.id}
                        className={selectedId === project.id ? "selected" : ""}
                        onClick={() => setSelectedId(project.id)}
                        onDoubleClick={() => onOpenProject(project.slug)}
                      >
                        <td className="fp-name-cell">
                          <Folder size={18} color={palette.base} deep={palette.deep} glyph={Glyph} />
                          {project.title}
                        </td>
                        <td>{project.category}</td>
                        <td>{project.year}</td>
                        <td>{project.tags.slice(0, 3).join(", ")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* ── Preview pane (single click) ── */}
          {selected && (
            <aside className="fp-preview" key={selected.id} ref={previewRef}>
              <div className="fp-prev-head">
                <span>Preview</span>
                <button onClick={() => setSelectedId(null)} aria-label="Close preview">
                  <X size={13} />
                </button>
              </div>

              <div className="fp-prev-cover">
                <video
                  className="fp-prev-cover-video"
                  key={selected.coverVideo || "/projects-loop-v2.mp4"}
                  src={selected.coverVideo || "/projects-loop-v2.mp4"}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
              </div>

              <h3 className="fp-prev-title">{selected.title}</h3>
              <div className="fp-prev-meta">
                <span>{selected.category}</span>
                <span>·</span>
                <span>{selected.year}</span>
                <span>·</span>
                <span>{selected.role}</span>
              </div>

              <p className="fp-prev-desc">{selected.description}</p>

              <div className="fp-prev-tags">
                {selected.tags.slice(0, 4).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <button className="fp-prev-open" onClick={() => onOpenProject(selected.slug)}>
                Open Case Study →
              </button>
              <div className="fp-prev-hint">or double-click the folder</div>
            </aside>
          )}
        </div>

        {/* ── Status bar ── */}
        <div className="fp-statusbar">
          <span className="fp-crumb">
            Macintosh HD ▸ Users ▸ sanskar ▸ Projects{category !== ALL ? ` ▸ ${category}` : ""}
          </span>
          <span>·</span>
          <span className="fp-hint-desktop">
            {filtered.length} item{filtered.length === 1 ? "" : "s"} — click to preview, double-click to open
          </span>
          <span className="fp-hint-mobile">
            {filtered.length} item{filtered.length === 1 ? "" : "s"} — tap a folder to preview
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinderProjects;
