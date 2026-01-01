import React from 'react';

const AIServicesCarousel = ({ sectionRef }) => {
  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700;900&display=swap');

        .ai-services-section {
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Decorative corner elements */
        .ai-corner-decoration {
          position: fixed;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          opacity: 0.4;
          filter: blur(60px);
          z-index: 0;
        }

        /* Main Heading */
        .ai-heading {
          position: absolute;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 5rem;
          font-weight: 900;
          color: #2d2d2d;
          z-index: 10;
          text-transform: lowercase;
          letter-spacing: -0.03em;
          text-align: center;
          line-height: 0.9;
          padding: 0 20px;
        }

        .ai-heading span {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 10px;
        }

        /* Large Background Text */
        .ai-background-text {
          position: absolute;
          font-size: 20vw;
          font-weight: 900;
          color: rgba(2, 2, 2, 0.03);
          letter-spacing: -0.05em;
          user-select: none;
          pointer-events: none;
          z-index: 1;
          line-height: 0.85;
          text-transform: lowercase;
          white-space: nowrap;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          letter-spacing: 0.03em;
        }

        /* 3D Scene Container */
        .ai-scene {
          width: 700px;
          height: 1000px;
          perspective: 1600px;
          position: relative;
          z-index: 2;
        }

        /* Rotating Carousel */
        .ai-carousel {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCarousel 30s linear infinite;
        }

        @keyframes rotateCarousel {
          from {
            transform: rotateY(0deg) rotateX(-12deg);
          }
          to {
            transform: rotateY(360deg) rotateX(-12deg);
          }
        }

        /* Image Cards with Professional Styling */
        .ai-carousel-item {
          position: absolute;
          width: 240px;
          height: 320px;
          left: 50%;
          top: 50%;
          margin-left: -120px;
          margin-top: -80px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 5px 15px rgba(0, 0, 0, 0.15);
          transform-style: preserve-3d;
          background: #fff;
          border: 1px solid rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }

        .ai-carousel-item:hover {
          transform: scale(1.05);
        }

        .ai-carousel-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Text Card Styling */
        .ai-carousel-item.text-card {
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 25px 20px;
          text-align: center;
        }

        .text-card .ai-icon {
          width: 55px;
          height: 55px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-card .ai-icon svg {
          width: 100%;
          height: 100%;
          fill: url(#ai-gradient);
        }

        .text-card .ai-number {
          font-size: 0.85rem;
          font-weight: 700;
          color: #888;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .text-card .ai-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #2d2d2d;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          line-height: 1.1;
        }

        .text-card .ai-description {
          font-size: 0.9rem;
          font-weight: 400;
          color: #666;
          line-height: 1.4;
          letter-spacing: 0.03em;
        }

        /* Inner white border effect */
        .ai-carousel-item::after {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          z-index: 2;
          pointer-events: none;
        }

        /* Mathematical Distribution */
        .ai-carousel-item:nth-child(1) {
          transform: rotateY(0deg) translateZ(380px);
        }
        
        .ai-carousel-item:nth-child(2) {
          transform: rotateY(60deg) translateZ(380px);
        }
        
        .ai-carousel-item:nth-child(3) {
          transform: rotateY(120deg) translateZ(380px);
        }
        
        .ai-carousel-item:nth-child(4) {
          transform: rotateY(180deg) translateZ(380px);
        }
        
        .ai-carousel-item:nth-child(5) {
          transform: rotateY(240deg) translateZ(380px);
        }
        
        .ai-carousel-item:nth-child(6) {
          transform: rotateY(300deg) translateZ(380px);
        }

        /* Center glow effect */
        .ai-scene::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle, 
            rgba(255, 180, 100, 0.15) 0%, 
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          border-radius: 50%;
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        /* Responsive Design */
        
        /* Large Tablets and Small Desktops */
        @media (max-width: 1024px) {
          .ai-heading {
            font-size: 4rem;
            top: 110px;
            padding: 0 30px;
          }

          .ai-heading span {
            font-size: 1.1rem;
          }

          .ai-scene {
            width: 600px;
            height: 600px;
            perspective: 1400px;
          }

          .ai-carousel-item {
            width: 200px;
            height: 280px;
            margin-left: -100px;
            margin-top: -140px;
          }

          .ai-carousel-item:nth-child(1) { transform: rotateY(0deg) translateZ(320px); }
          .ai-carousel-item:nth-child(2) { transform: rotateY(60deg) translateZ(320px); }
          .ai-carousel-item:nth-child(3) { transform: rotateY(120deg) translateZ(320px); }
          .ai-carousel-item:nth-child(4) { transform: rotateY(180deg) translateZ(320px); }
          .ai-carousel-item:nth-child(5) { transform: rotateY(240deg) translateZ(320px); }
          .ai-carousel-item:nth-child(6) { transform: rotateY(300deg) translateZ(320px); }

          .ai-carousel-item.text-card {
            padding: 18px 15px;
          }

          .text-card .ai-icon {
            width: 50px;
            height: 50px;
            margin-bottom: 10px;
          }

          .text-card .ai-number {
            font-size: 0.8rem;
            margin-bottom: 5px;
          }

          .text-card .ai-title {
            font-size: 1.35rem;
            margin-bottom: 6px;
          }

          .text-card .ai-description {
            font-size: 0.85rem;
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .ai-heading {
            font-size: 3rem;
            top: 100px;
            padding: 0 25px;
          }

          .ai-heading span {
            font-size: 0.9rem;
          }

          .ai-scene {
            width: 450px;
            height: 450px;
            perspective: 1100px;
          }

          .ai-carousel-item {
            width: 170px;
            height: 240px;
            margin-left: -85px;
            margin-top: -120px;
          }

          .ai-carousel-item.text-card {
            padding: 16px 14px;
          }

          .text-card .ai-icon {
            width: 45px;
            height: 45px;
            margin-bottom: 10px;
          }

          .text-card .ai-number {
            font-size: 0.8rem;
            margin-bottom: 5px;
          }

          .text-card .ai-title {
            font-size: 1.2rem;
            margin-bottom: 6px;
          }

          .text-card .ai-description {
            font-size: 0.8rem;
          }

          .ai-carousel-item:nth-child(1) { transform: rotateY(0deg) translateZ(260px); }
          .ai-carousel-item:nth-child(2) { transform: rotateY(60deg) translateZ(260px); }
          .ai-carousel-item:nth-child(3) { transform: rotateY(120deg) translateZ(260px); }
          .ai-carousel-item:nth-child(4) { transform: rotateY(180deg) translateZ(260px); }
          .ai-carousel-item:nth-child(5) { transform: rotateY(240deg) translateZ(260px); }
          .ai-carousel-item:nth-child(6) { transform: rotateY(300deg) translateZ(260px); }

          .ai-background-text {
            font-size: 25vw;
          }

          .ai-corner-decoration {
            width: 120px;
            height: 120px;
          }
        }

        /* Large Phones (Landscape) */
        @media (max-width: 640px) {
          .ai-heading {
            font-size: 2.5rem;
            top: 95px;
            padding: 0 20px;
          }

          .ai-heading span {
            font-size: 0.85rem;
          }

          .ai-scene {
            width: 380px;
            height: 380px;
            perspective: 950px;
          }

          .ai-carousel-item {
            width: 150px;
            height: 210px;
            margin-left: -75px;
            margin-top: -105px;
          }

          .ai-carousel-item.text-card {
            padding: 16px 12px;
          }

          .text-card .ai-icon {
            width: 40px;
            height: 40px;
            margin-bottom: 8px;
          }

          .text-card .ai-number {
            font-size: 0.75rem;
            margin-bottom: 4px;
          }

          .text-card .ai-title {
            font-size: 1.1rem;
            margin-bottom: 5px;
          }

          .text-card .ai-description {
            font-size: 0.75rem;
            line-height: 1.4;
          }

          .ai-carousel-item:nth-child(1) { transform: rotateY(0deg) translateZ(220px); }
          .ai-carousel-item:nth-child(2) { transform: rotateY(60deg) translateZ(220px); }
          .ai-carousel-item:nth-child(3) { transform: rotateY(120deg) translateZ(220px); }
          .ai-carousel-item:nth-child(4) { transform: rotateY(180deg) translateZ(220px); }
          .ai-carousel-item:nth-child(5) { transform: rotateY(240deg) translateZ(220px); }
          .ai-carousel-item:nth-child(6) { transform: rotateY(300deg) translateZ(220px); }

          .ai-background-text {
            font-size: 28vw;
          }

          .ai-corner-decoration {
            width: 100px;
            height: 100px;
          }

          .ai-scene::before {
            width: 450px;
            height: 450px;
          }
        }

        /* Small Phones (Portrait) */
        @media (max-width: 480px) {
          .ai-heading {
            font-size: 2.2rem;
            top: 85px;
            padding: 0 15px;
          }

          .ai-heading span {
            font-size: 0.75rem;
            margin-bottom: 8px;
          }

          .ai-scene {
            width: 320px;
            height: 320px;
            perspective: 850px;
          }

          .ai-carousel-item {
            width: 130px;
            height: 185px;
            margin-left: -65px;
            margin-top: -92.5px;
            border-radius: 15px;
          }

          .ai-carousel-item::after {
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            border-radius: 10px;
          }

          .ai-carousel-item.text-card {
            padding: 14px 10px;
          }

          .text-card .ai-icon {
            width: 35px;
            height: 35px;
            margin-bottom: 6px;
          }

          .text-card .ai-number {
            font-size: 0.7rem;
            margin-bottom: 3px;
          }

          .text-card .ai-title {
            font-size: 1rem;
            margin-bottom: 4px;
          }

          .text-card .ai-description {
            font-size: 0.7rem;
            line-height: 1.35;
          }

          .ai-carousel-item:nth-child(1) { transform: rotateY(0deg) translateZ(190px); }
          .ai-carousel-item:nth-child(2) { transform: rotateY(60deg) translateZ(190px); }
          .ai-carousel-item:nth-child(3) { transform: rotateY(120deg) translateZ(190px); }
          .ai-carousel-item:nth-child(4) { transform: rotateY(180deg) translateZ(190px); }
          .ai-carousel-item:nth-child(5) { transform: rotateY(240deg) translateZ(190px); }
          .ai-carousel-item:nth-child(6) { transform: rotateY(300deg) translateZ(190px); }

          .ai-background-text {
            font-size: 32vw;
          }

          .ai-corner-decoration {
            width: 80px;
            height: 80px;
            filter: blur(50px);
          }

          .ai-scene::before {
            width: 350px;
            height: 350px;
          }
        }

        /* Extra Small Phones */
        @media (max-width: 375px) {
          .ai-heading {
            font-size: 1.9rem;
            top: 80px;
            padding: 0 15px;
          }

          .ai-heading span {
            font-size: 0.7rem;
          }

          .ai-scene {
            width: 280px;
            height: 280px;
            perspective: 750px;
          }

          .ai-carousel-item {
            width: 115px;
            height: 165px;
            margin-left: -57.5px;
            margin-top: -82.5px;
          }

          .ai-carousel-item.text-card {
            padding: 12px 8px;
          }

          .text-card .ai-icon {
            width: 30px;
            height: 30px;
            margin-bottom: 5px;
          }

          .text-card .ai-number {
            font-size: 0.65rem;
            margin-bottom: 3px;
          }

          .text-card .ai-title {
            font-size: 0.9rem;
            margin-bottom: 3px;
          }

          .text-card .ai-description {
            font-size: 0.65rem;
          }

          .ai-carousel-item:nth-child(1) { transform: rotateY(0deg) translateZ(165px); }
          .ai-carousel-item:nth-child(2) { transform: rotateY(60deg) translateZ(165px); }
          .ai-carousel-item:nth-child(3) { transform: rotateY(120deg) translateZ(165px); }
          .ai-carousel-item:nth-child(4) { transform: rotateY(180deg) translateZ(165px); }
          .ai-carousel-item:nth-child(5) { transform: rotateY(240deg) translateZ(165px); }
          .ai-carousel-item:nth-child(6) { transform: rotateY(300deg) translateZ(165px); }
        }

        /* Landscape Orientation Optimization */
        @media (max-height: 600px) and (orientation: landscape) {
          .ai-heading {
            top: 70px;
            font-size: 2rem;
            padding: 0 20px;
          }

          .ai-heading span {
            font-size: 0.7rem;
          }

          .ai-scene {
            width: 350px;
            height: 350px;
          }

          .ai-carousel-item {
            width: 140px;
            height: 195px;
            margin-left: -70px;
            margin-top: -97.5px;
          }

          .ai-carousel-item:nth-child(1) { transform: rotateY(0deg) translateZ(200px); }
          .ai-carousel-item:nth-child(2) { transform: rotateY(60deg) translateZ(200px); }
          .ai-carousel-item:nth-child(3) { transform: rotateY(120deg) translateZ(200px); }
          .ai-carousel-item:nth-child(4) { transform: rotateY(180deg) translateZ(200px); }
          .ai-carousel-item:nth-child(5) { transform: rotateY(240deg) translateZ(200px); }
          .ai-carousel-item:nth-child(6) { transform: rotateY(300deg) translateZ(200px); }
        }
      `}</style>

      <div className="ai-services-section">
        {/* Decorative Elements */}
        <div className="ai-corner-decoration top-left"></div>
        <div className="ai-corner-decoration bottom-right"></div>

        {/* Main Heading */}
        <div className="ai-heading">
          <span>Let's Work</span>
          Together
        </div>

        {/* Large Background Text */}
        <div className="ai-background-text">innovate</div>

        {/* 3D Carousel Scene */}
        <div className="ai-scene">
          {/* SVG Gradient Definition */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ff6b9d', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ffd93d', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>

          <div className="ai-carousel">
            {/* Service 1: AI Agents & Automation */}
            <div className="ai-carousel-item text-card">
              <div className="ai-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  <circle cx="12" cy="8" r="1.5"/>
                  <path d="M7 18h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
                </svg>
              </div>
              <div className="ai-number">Service 01</div>
              <div className="ai-title">AI Agents & Automation</div>
              <div className="ai-description">Task-driven AI agents for workflows, lead handling & business automation</div>
            </div>
            
            {/* Service 2: RAG Chatbots */}
            <div className="ai-carousel-item text-card">
              <div className="ai-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  <circle cx="19" cy="5" r="2"/>
                  <circle cx="5" cy="19" r="2"/>
                </svg>
              </div>
              <div className="ai-number">Service 02</div>
              <div className="ai-title">RAG-Based Chatbots</div>
              <div className="ai-description">Knowledge-grounded AI using vector databases for accurate responses</div>
            </div>
            
            {/* Service 3: Custom Chatbots */}
            <div className="ai-carousel-item text-card">
              <div className="ai-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
                  <path d="M6 8h8v2H6zm0-3h8v2H6z"/>
                </svg>
              </div>
              <div className="ai-number">Service 03</div>
              <div className="ai-title">Custom AI Chatbots</div>
              <div className="ai-description">Website, WhatsApp & business chatbots with OCR & speech support</div>
            </div>
            
            {/* Service 4: AI Web Applications */}
            <div className="ai-carousel-item text-card">
              <div className="ai-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                  <path d="M7 11l2 2 4-4"/>
                </svg>
              </div>
              <div className="ai-number">Service 04</div>
              <div className="ai-title">AI Web Applications</div>
              <div className="ai-description">Full-stack AI platforms with dashboards, APIs & evaluation tools</div>
            </div>
            
            {/* Service 5: Computer Vision */}
            <div className="ai-carousel-item text-card">
              <div className="ai-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <div className="ai-number">Service 05</div>
              <div className="ai-title">Computer Vision</div>
              <div className="ai-description">Object detection, face recognition, OCR & surveillance solutions</div>
            </div>
            
            {/* Service 6: AI Deployment */}
            <div className="ai-carousel-item text-card">
              <div className="ai-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3h-2v2h2c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h6v-2H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.73L19.73 23 21 21.73 4.27 4 3 5.27z"/>
                  <path d="M12 12h2v8h-2z"/>
                </svg>
              </div>
              <div className="ai-number">Service 06</div>
              <div className="ai-title">Cloud Deployment</div>
              <div className="ai-description">AWS, Docker & VPS hosting for scalable AI model deployment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIServicesCarousel;