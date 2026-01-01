import React from "react";
import { Mail, Linkedin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const Footer = ({ contactRef }) => {
  const handleContactClick = () => {
    // Open email client
    window.open('mailto:sanskarlal23@gmail.com', '_blank');
  };

  const handlePhoneClick = () => {
    // Open phone dialer
    window.open('tel:+919887033255', '_self');
  };

  return (
    <footer
      ref={contactRef}
      className="bg-white text-black pt-20 pb-8 px-6"
      style={{
        animation: 'fadeIn 1s ease-out',
        fontFamily: "'Bebas Neue', cursive"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Top Text */}
        <p className="text-2xl text-gray-600 mb-4 animate-fade-in">
          That's a wrap? Maybe not.
        </p>

        {/* Main Heading */}
        <h2 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-wide animate-fade-in-up">
          Great things start with <span>'Meet'</span>! <span className="ml-2"></span>
        </h2>

        {/* Sub Text */}
        <p className="text-2xl text-gray-700 max-w-3xl mx-auto mb-12 animate-fade-in-up delay-100">
          Open to 🧠 conversations, 🤝 collabs, 🧩 creative challenges,
          🧠 puzzles — or just a friendly game of ♟️ Chess.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleContactClick}
          className="inline-block bg-black text-white px-12 py-5 rounded-full text-3xl font-medium shadow-md hover:bg-gray-800 hover:scale-105 transition-all duration-300 animate-fade-in-up delay-200 cursor-pointer"
        >
          Let's Meet →
        </button>

        {/* Social Icons */}
        <div className="flex justify-center gap-10 mt-10">
          <button 
            onClick={handlePhoneClick}
            className="text-4xl hover:text-gray-500 cursor-pointer bg-transparent border-none p-0"
            aria-label="Call phone number"
          >
            <Phone size={36} />
          </button>
          <a 
            href="mailto:sanskarlal23@gmail.com" 
            className="text-4xl hover:text-gray-500"
            aria-label="Send email"
          >
            <Mail size={36} />
          </a>
          <a 
            href="https://www.linkedin.com/in/sanskar-lalawat/" 
            className="text-4xl hover:text-gray-500"
            aria-label="Visit LinkedIn profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={36} />
          </a>
          <a 
            href="https://wa.me/919887033255" 
            className="text-4xl hover:text-gray-500"
            aria-label="Send WhatsApp message"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={36} />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-xl text-gray-500 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© Copyright Sanskar Lalawat ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;