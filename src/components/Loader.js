import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ duration = 2600, exitDuration = 700, onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, duration + exitDuration);
    return () => clearTimeout(timer);
  }, [duration, exitDuration, onFinish]);

  const letters = ["T", "o", "k", "e", "n"," ", "T", "i", "n", "k", "e", "r", "e", "r" ];

  const containerVariants = {
    start: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
    vertical: { transition: { staggerChildren: 0.15 } }
  };

  const letterVariants = {
    start: { opacity: 0, y: 0 },
    vertical: {
      opacity: 1,
      letterSpacing: "clamp(0.3rem, 1.5vw, 1rem)",
      scale: 1.05,
      transition: { duration: 0.8 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="loader-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: exitDuration / 1000 } }}
      >
        <motion.div
          className="loader-text-container"
          variants={containerVariants}
          initial="start"
          animate="vertical"
          onAnimationComplete={() => {
            setTimeout(() => {
              document.querySelectorAll(".loader-letter").forEach(el => {
                el.classList.add("fade-out");
              });
            }, 800);
          }}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="loader-letter"
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
      <style>{`
        .loader-overlay {
          position: fixed;
          inset: 0;
          background: black;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
        }

        .loader-text-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 700;
          font-size: clamp(2rem, 8vw, 6rem);
          color: white;
          line-height: 1.2;
          max-width: 100%;
        }

        .loader-letter {
          display: inline-block;
          will-change: transform, opacity, letter-spacing;
        }

        .fade-out {
          animation: fadeOut 0.4s forwards ease-in;
        }

        @keyframes fadeOut {
          to { opacity: 0; }
        }

        /* Small mobile devices */
        @media (max-width: 374px) {
          .loader-text-container {
            font-size: clamp(1.5rem, 10vw, 2.5rem);
          }
        }

        /* Mobile portrait */
        @media (max-width: 600px) {
          .loader-overlay {
            padding: 0.5rem;
          }
        }

        /* Tablet and larger */
        @media (min-width: 601px) and (max-width: 1024px) {
          .loader-text-container {
            font-size: clamp(3rem, 7vw, 5rem);
          }
        }

        /* Large screens */
        @media (min-width: 1025px) {
          .loader-text-container {
            font-size: clamp(4rem, 6vw, 6rem);
          }
        }

        /* Landscape mobile adjustments */
        @media (max-height: 500px) and (orientation: landscape) {
          .loader-text-container {
            font-size: clamp(1.5rem, 6vh, 3rem);
          }
        }

        /* High DPI screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .loader-letter {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}