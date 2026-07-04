import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = ({ onHome, onProjects, onAbout, mobileMenuOpen, setMobileMenuOpen }) => {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        style={{ pointerEvents: hidden ? 'none' : 'auto' }}
        animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-6 py-5"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-black border border-white/10"
            onClick={onHome}
          >
            <img src="/logo.svg" alt="Logo" className="w-full h-full object-cover" />
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:flex items-center gap-6 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-7 py-2.5 shadow-lg"
          >
            <motion.button
              onClick={onProjects}
              whileHover={{ scale: 1.06 }}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              My Work
            </motion.button>
            <span className="w-px h-3.5 bg-white/10" />
            <motion.button
              onClick={onAbout}
              whileHover={{ scale: 1.06 }}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              About
            </motion.button>
          </motion.nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 bg-black border border-white/10 rounded-full flex items-center justify-center"
          >
            {mobileMenuOpen
              ? <X className="text-white" size={18} />
              : <Menu className="text-white" size={18} />}
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-5 right-5 z-[99] bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:hidden shadow-2xl flex flex-col gap-6"
          >
            <button
              onClick={() => { onProjects(); setMobileMenuOpen(false); }}
              className="block w-full text-left text-2xl font-medium text-white/80 hover:text-white transition-colors"
            >
              My Work
            </button>
            <button
              onClick={() => { onAbout(); setMobileMenuOpen(false); }}
              className="block w-full text-left text-2xl font-medium text-white/80 hover:text-white transition-colors"
            >
              About
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
