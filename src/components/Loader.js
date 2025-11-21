import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Loader.css";

export default function Loader({ duration = 2600, exitDuration = 700, onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, duration + exitDuration);
    return () => clearTimeout(timer);
  }, [duration, exitDuration, onFinish]);

  const letters = ["T", "o", "k", "e", "n"," ", " T", "i", "n", "k", "e", " r", "e", "r" ];

  const containerVariants = {
    start: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
    vertical: { transition: { staggerChildren: 0.15 } }
  };

  const letterVariants = {
    start: { opacity: 0, y: 0 },
    vertical: {
      opacity: 1,
      letterSpacing: "1rem",
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
              // Step 1: Fade out middle letters
              document.querySelectorAll(".loader-letter.mid").forEach(el => {
                el.classList.add("fade-out");
              });

              // Step 2: Wait for middle letters to disappear, then move M & I
              setTimeout(() => {
                const mEl = document.querySelector(".loader-letter.T");
                const iEl = document.querySelector(".loader-letter.r");

                // Move towards each other (small gap at collision)
                mEl.style.setProperty("--hit-dir", "100px");
                iEl.style.setProperty("--hit-dir", "-100px");

                // Step 3: Trigger bounce
                mEl.classList.add("hit");
                iEl.classList.add("hit");

                // Step 4: Fade out after bounce
                setTimeout(() => {
                  mEl.classList.add("fade-out-delay");
                  iEl.classList.add("fade-out-delay");
                }, 500);
              }, 400); // Wait for fade-out of middle letters
            }, 800); // Wait after vertical animation finishes
          }}
        >
          {letters.map((letter, i) => {
            if (letter === "T") {
              return (
                <motion.span
                  key={i}
                  className="loader-letter T"
                  variants={letterVariants}
                >
                  {letter}
                </motion.span>
              );
            }
            if (letter === "r") {
              return (
                <motion.span
                  key={i}
                  className="loader-letter r"
                  variants={letterVariants}
                >
                  {letter}
                </motion.span>
              );
            }
            return (
              <motion.span
                key={i}
                className="loader-letter mid"
                variants={letterVariants}
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
