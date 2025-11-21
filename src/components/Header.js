import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  scrollToSection, 
  projectsRef, 
  tunnelRef, // Added tunnel ref
  aboutRef, 
  heroRef, 
  contactRef 
}) => {
  const navigationItems = [
    { name: 'Projects', ref: projectsRef }, // Added tunnel/experience navigation
    { name: 'About', ref: aboutRef },
    { name: 'Skills', ref: heroRef },
    { name: 'Contact', ref: contactRef }
  ];

  return (
    <>
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => scrollToSection(heroRef)}
          >
            <span className="text-white font-bold text-lg">S</span>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex bg-gray-100 rounded-full px-6 py-3 space-x-8"
          >
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.ref)}
                whileHover={{ scale: 1.05 }}
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                {item.name}
              </motion.button>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-12 h-12 bg-black rounded-full flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="text-white" size={20} /> : <Menu className="text-white" size={20} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-6 right-6 z-40 bg-white rounded-2xl shadow-2xl p-8 md:hidden"
          >
            <div className="space-y-6">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    scrollToSection(item.ref);
                    setMobileMenuOpen(false);
                  }}
                  className="block text-2xl font-medium text-gray-800 hover:text-black transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;