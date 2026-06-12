import React, { useEffect, useState } from 'react';
import './PageTransition.css';

const COVER_MS = 700; // panel sweep + slight settle
const HOLD_MS = 350; // label readable while route swaps under cover
const REVEAL_MS = 750; // exit sweep incl. stagger

// Full-screen curtain transition: a cream leading edge sweeps up, a black
// panel with the destination label follows, the route swaps while covered,
// then both panels exit through the top.
const PageTransition = ({ transition, onDone }) => {
  const [phase, setPhase] = useState(null);

  useEffect(() => {
    if (!transition) {
      setPhase(null);
      return;
    }
    setPhase('cover');
    const swapTimer = setTimeout(() => {
      window.location.hash = transition.hash;
    }, COVER_MS);
    const revealTimer = setTimeout(() => {
      setPhase('reveal');
    }, COVER_MS + HOLD_MS);
    const doneTimer = setTimeout(() => {
      onDone();
    }, COVER_MS + HOLD_MS + REVEAL_MS);
    return () => {
      clearTimeout(swapTimer);
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, [transition, onDone]);

  if (!transition || !phase) return null;

  return (
    <div className={`pt-overlay ${phase}`} aria-hidden="true">
      <div className="pt-panel pt-panel-lead" />
      <div className="pt-panel pt-panel-main">
        <span className="pt-tag">{transition.tag}</span>
        <div className="pt-label-wrap">
          <span className="pt-label">{transition.label}</span>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
