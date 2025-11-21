import React from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

const ProjectModal = ({ activeProject, setActiveProject }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    setIsScrolled(scrollTop > 20);
  };

  return (
    <AnimatePresence mode="wait">
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6"
          onClick={() => setActiveProject(null)}
        >
          <motion.div
            layout
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ 
              duration: 0.25, 
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.2 },
              layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
            className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl will-change-transform scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onClick={(e) => e.stopPropagation()}
            onScroll={handleScroll}
          >
            <motion.div 
              layout="position"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex justify-between items-start mb-6"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  layout
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: activeProject.color }}
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </motion.div>
                <motion.div layout="position" transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                  <motion.h3 
                    layout="position"
                    className="text-3xl font-black mb-2"
                  >
                    {activeProject.title}
                  </motion.h3>
                  <motion.p 
                    layout="position"
                    className="text-lg text-gray-600 mb-2"
                  >
                    {activeProject.subtitle}
                  </motion.p>
                  <motion.span 
                    layout
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 font-medium inline-block"
                  >
                    {activeProject.category}
                  </motion.span>
                </motion.div>
              </div>
              <motion.button
                layout
                onClick={() => setActiveProject(null)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </motion.div>
            
            <motion.div 
              layout="position"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="mb-6 p-6 rounded-2xl" 
              style={{ backgroundColor: activeProject.bgColor }}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                {activeProject.description}
              </p>
            </motion.div>
            
            <motion.div 
              layout="position"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {activeProject.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.05,
                    layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                  }}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div 
              layout="position"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <motion.div 
                layout
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="p-4 bg-gray-50 rounded-2xl"
              >
                <h4 className="font-bold text-gray-800 mb-2">Key Features</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Advanced AI/ML implementation</li>
                  <li>• Scalable architecture design</li>
                  <li>• User-friendly interface</li>
                  <li>• Real-time data processing</li>
                </ul>
              </motion.div>
              <motion.div 
                layout
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="p-4 bg-gray-50 rounded-2xl"
              >
                <h4 className="font-bold text-gray-800 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.slice(0, 4).map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              layout="position"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex gap-4"
            >
              <motion.button
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: activeProject.color }}
                className="text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-lg"
              >
                View Live Demo <ExternalLink size={16} />
              </motion.button>
              <motion.button
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-100 text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors"
              >
                Source Code <Github size={16} />
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isScrolled ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm"
            >
              Scroll for more
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Demo Component
const Demo = () => {
  const [activeProject, setActiveProject] = React.useState(null);

  const sampleProject = {
    title: "AI-Powered Analytics",
    subtitle: "Machine Learning Dashboard",
    category: "Data Science",
    color: "#6366f1",
    bgColor: "#e0e7ff",
    description: "A comprehensive analytics platform that leverages advanced machine learning algorithms to provide real-time insights and predictive analytics. Built with scalability and performance in mind, this system processes millions of data points efficiently. The dashboard features real-time monitoring, predictive modeling, and automated reporting capabilities.",
    tags: ["React", "TensorFlow", "Python", "PostgreSQL", "Redis", "Docker", "AWS", "Kubernetes", "GraphQL"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4 text-gray-800">Modal Layout Animation Demo</h1>
        <p className="text-gray-600 mb-8">Click to see smooth layout transitions</p>
        <button
          onClick={() => setActiveProject(sampleProject)}
          className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
        >
          Open Project Modal
        </button>
      </div>
      
      <ProjectModal 
        activeProject={activeProject} 
        setActiveProject={setActiveProject} 
      />
    </div>
  );
};

export default ProjectModal;