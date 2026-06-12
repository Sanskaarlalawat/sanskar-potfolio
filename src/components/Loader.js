import React, { useEffect, useRef, useState } from "react";

// Intro loader: masked type reveal + progress counter, exiting with the same
// curved curtain sweep used by PageTransition so the whole site shares one
// motion language.
//
// Timeline: letters slide in → counter runs 0-100 over `duration` → letters
// slide out → black panel (then cream follow layer) sweeps up revealing the
// page. `onExitStart` fires when the sweep begins so the app can mount the
// home page underneath; `onFinish` fires when the loader is fully gone.
export default function Loader({ duration = 3200, onExitStart, onFinish }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  // Latest-ref pattern: parent passes inline callbacks whose identity changes
  // every render; the exit effect must not re-run (and cancel its timer) when
  // that happens.
  const onExitStartRef = useRef(onExitStart);
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onExitStartRef.current = onExitStart;
    onFinishRef.current = onFinish;
  });

  // Lock scrolling while the loader owns the screen.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Counter: 0 → 100 with an organic ease over `duration`.
  useEffect(() => {
    let raf;
    const start = performance.now();
    const easeInOutQuart = (t) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(easeInOutQuart(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
      }
    };
    raf = requestAnimationFrame(tick);
    // Fallback in case rAF is throttled (hidden tab): force completion.
    const fallback = setTimeout(() => {
      setProgress(100);
      setExiting(true);
    }, duration + 300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, [duration]);

  // Exit sequence: letters out → curtain sweep → done.
  useEffect(() => {
    if (!exiting) return;
    if (onExitStartRef.current) onExitStartRef.current();
    const finishTimer = setTimeout(() => {
      if (onFinishRef.current) onFinishRef.current();
    }, 1250); // letters out (300) + sweep incl. stagger (~950)
    return () => clearTimeout(finishTimer);
  }, [exiting]);

  const words = ["Token", "Tinkerer"];

  return (
    <div className={`ldr-root ${exiting ? "exit" : ""}`} aria-hidden="true">
      {/* cream follow layer — revealed as the black panel sweeps away */}
      <div className="ldr-follow" />

      <div className="ldr-panel">
        <div className="ldr-tag">AI Engineer — Portfolio</div>

        <h1 className="ldr-title">
          {words.map((word, wi) => (
            <span className="ldr-word" key={wi}>
              {word.split("").map((char, ci) => (
                <span className="ldr-mask" key={ci}>
                  <span
                    className="ldr-letter"
                    style={{ animationDelay: `${0.25 + (wi * word.length + ci) * 0.04}s` }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="ldr-bottom">
          <span className="ldr-loading-label">
            Loading<span className="ldr-dots">...</span>
          </span>
          <span className="ldr-counter">
            {String(progress).padStart(3, "0")}
            <sup>%</sup>
          </span>
        </div>

        <div className="ldr-bar">
          <div className="ldr-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <style>{`
        .ldr-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
          font-family: 'Space Grotesk', sans-serif;
        }

        .ldr-panel,
        .ldr-follow {
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        .ldr-panel {
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .ldr-follow {
          background: #f1f1ee;
        }

        /* curved trailing edge on both layers for the sweep */
        .ldr-panel::after,
        .ldr-follow::after {
          content: '';
          position: absolute;
          left: -5%;
          bottom: -88px;
          width: 110%;
          height: 90px;
          background: inherit;
          border-radius: 0 0 50% 50% / 0 0 100% 100%;
        }

        /* ── Tag ── */
        .ldr-tag {
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b6b6b;
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: ldr-fade-in 0.6s ease 0.15s forwards;
        }

        /* ── Title ── */
        .ldr-title {
          display: flex;
          gap: clamp(0.8rem, 2.5vw, 2rem);
          flex-wrap: wrap;
          justify-content: center;
          margin: 0;
          padding: 0 1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: clamp(3.2rem, 12vw, 11rem);
          line-height: 0.9;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #f1f1ee;
        }

        .ldr-word { display: flex; }

        .ldr-mask {
          display: inline-block;
          overflow: hidden;
          padding-bottom: 0.08em;
          margin-bottom: -0.08em;
        }

        .ldr-letter {
          display: inline-block;
          transform: translateY(115%);
          will-change: transform;
          animation: ldr-letter-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes ldr-letter-in {
          to { transform: translateY(0); }
        }

        /* ── Bottom row ── */
        .ldr-bottom {
          position: absolute;
          left: 2rem;
          right: 2rem;
          bottom: 2.2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .ldr-loading-label {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #6b6b6b;
          opacity: 0;
          animation: ldr-fade-in 0.6s ease 0.5s forwards;
        }

        .ldr-dots {
          display: inline-block;
          animation: ldr-blink 1.2s steps(1) infinite;
        }

        @keyframes ldr-blink {
          50% { opacity: 0; }
        }

        .ldr-counter {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          line-height: 1;
          color: #f1f1ee;
          opacity: 0;
          animation: ldr-fade-in 0.6s ease 0.35s forwards;
        }

        .ldr-counter sup {
          font-size: 0.35em;
          color: #6b6b6b;
          margin-left: 0.1em;
        }

        /* ── Progress hairline ── */
        .ldr-bar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: #1d1d1d;
        }

        .ldr-bar-fill {
          height: 100%;
          background: #f1f1ee;
          transition: width 0.15s linear;
        }

        @keyframes ldr-fade-in {
          to { opacity: 1; }
        }

        /* ── Exit ── */
        .ldr-root.exit .ldr-letter {
          transform: translateY(0);
          animation: ldr-letter-out 0.35s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        .ldr-root.exit .ldr-tag,
        .ldr-root.exit .ldr-bottom,
        .ldr-root.exit .ldr-bar {
          animation: ldr-fade-out 0.3s ease forwards;
        }

        .ldr-root.exit .ldr-panel {
          animation: ldr-sweep 0.7s cubic-bezier(0.76, 0, 0.24, 1) 0.25s forwards;
        }

        .ldr-root.exit .ldr-follow {
          animation: ldr-sweep 0.7s cubic-bezier(0.76, 0, 0.24, 1) 0.38s forwards;
        }

        @keyframes ldr-letter-out {
          to { transform: translateY(-115%); }
        }

        @keyframes ldr-fade-out {
          to { opacity: 0; }
        }

        @keyframes ldr-sweep {
          to { transform: translateY(-103%); }
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .ldr-bottom { left: 1.25rem; right: 1.25rem; bottom: 1.5rem; }
          .ldr-title { font-size: clamp(2.6rem, 14vw, 5rem); }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .ldr-title { font-size: clamp(2rem, 9vh, 4rem); }
        }
      `}</style>
    </div>
  );
}
