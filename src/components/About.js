import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = ({ aboutRef }) => {
  // AnimatedSection Component
  const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  // Career journey data
  const careerJourney = [
    {
      company: "Tech Startup Inc.",
      role: "Junior Developer",
      period: "2021 - 2022",
      description: "Started my journey building web applications and learning full-stack development fundamentals.",
      skills: ["Python", "Django", "React"],
      color: "indigo"
    },
    {
      company: "Innovation Labs",
      role: "Full Stack Developer",
      period: "2022 - 2023",
      description: "Expanded expertise in AI/ML while developing scalable applications for enterprise clients.",
      skills: ["Machine Learning", "NLP", "Cloud Services"],
      color: "purple"
    },
    {
      company: "AI Solutions Corp",
      role: "AI/ML Engineer",
      period: "2023 - Present",
      description: "Leading AI projects, implementing cutting-edge solutions, and mentoring junior developers.",
      skills: ["Deep Learning", "LLMs", "MLOps"],
      color: "pink"
    }
  ];

  const colorClasses = {
    indigo: {
      bg: "bg-indigo-500",
      border: "border-indigo-500",
      text: "text-indigo-600",
      lightBg: "bg-indigo-50",
      tagBg: "bg-indigo-100"
    },
    purple: {
      bg: "bg-purple-500",
      border: "border-purple-500",
      text: "text-purple-600",
      lightBg: "bg-purple-50",
      tagBg: "bg-purple-100"
    },
    pink: {
      bg: "bg-pink-500",
      border: "border-pink-500",
      text: "text-pink-600",
      lightBg: "bg-pink-50",
      tagBg: "bg-pink-100"
    }
  };

  return (
    <section ref={aboutRef} className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              ABOUT ME
            </h2>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#1F2937' }}
              className="bg-black text-white px-6 py-3 rounded-full font-medium"
            >
              Get to know me
            </motion.button>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
            {/* Profile Card */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Photo Section */}
              <div className="relative h-96 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-indigo-600 text-7xl font-black">SL</span>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-12 left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
              
              {/* Info Section */}
              <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
                <h3 className="text-3xl font-black text-gray-900 mb-2">Sanskar Lalawat</h3>
                <p className="text-lg text-indigo-600 font-semibold mb-6">AI/ML Engineer & Full Stack Developer</p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-xl border-2 border-gray-100">
                    <p className="text-3xl font-black text-indigo-600 mb-1">5+</p>
                    <p className="text-sm font-semibold text-gray-600">Projects</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border-2 border-gray-100">
                    <p className="text-3xl font-black text-purple-600 mb-1">3</p>
                    <p className="text-sm font-semibold text-gray-600">Companies</p>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {['AI/ML', 'Python', 'Django', 'React', 'NLP'].map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* About Text */}
            <div>
              <div className="mb-8">
                <h3 className="text-4xl font-black text-gray-900 mb-4">
                  Crafting the Future with AI
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed mb-4">
                  Passionate about creating intelligent solutions that bridge complex technology 
                  with user-friendly experiences.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With expertise spanning multiple companies and diverse projects, I've evolved from 
                  a junior developer to an AI/ML specialist, constantly pushing the boundaries of 
                  what's possible with technology.
                </p>
              </div>

              {/* Quick Highlights */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🎯</span>
                  </div>
                  <p className="text-gray-700 font-semibold">Problem Solver & Innovator</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">⚡</span>
                  </div>
                  <p className="text-gray-700 font-semibold">Fast Learner & Adaptor</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🌟</span>
                  </div>
                  <p className="text-gray-700 font-semibold">Team Player & Mentor</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Career Journey Roadmap */}
        <AnimatedSection>
          <div className="mb-12">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 text-center mb-4">
              MY CAREER JOURNEY
            </h3>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
              From junior developer to AI/ML engineer — a journey of growth, learning, and innovation
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line - Hidden on mobile, shown on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>

            {/* Career Cards */}
            <div className="space-y-12">
              {careerJourney.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? '' : 'md:grid-flow-dense'}`}
                >
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={`${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'} bg-white rounded-2xl p-8 shadow-xl border-t-4 ${colorClasses[job.color].border} relative`}
                  >
                    {/* Timeline Dot */}
                    <div className={`hidden md:block absolute top-8 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-8 h-8 ${colorClasses[job.color].bg} rounded-full border-4 border-white shadow-lg`}></div>
                    
                    {/* Period Badge */}
                    <div className={`inline-block ${colorClasses[job.color].tagBg} ${colorClasses[job.color].text} px-4 py-2 rounded-full text-sm font-bold mb-4`}>
                      {job.period}
                    </div>

                    {/* Company & Role */}
                    <h4 className="text-2xl font-black text-gray-900 mb-2">{job.company}</h4>
                    <p className={`text-lg font-bold ${colorClasses[job.color].text} mb-4`}>{job.role}</p>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6">{job.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, idx) => (
                        <span key={idx} className={`px-3 py-1 ${colorClasses[job.color].lightBg} ${colorClasses[job.color].text} rounded-lg text-sm font-semibold`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className={`hidden md:block ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'}`}></div>
                </motion.div>
              ))}
            </div>

            {/* Achievement Badge at bottom */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-1 shadow-xl">
                <div className="bg-white rounded-xl px-8 py-6 text-center">
                  <p className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Currently Growing
                  </p>
                  <p className="text-gray-600 font-semibold">Building the future, one project at a time 🚀</p>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;