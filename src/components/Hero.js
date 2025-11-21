import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Start animation after component mounts (simulating after loader)
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Split Screen Animation Overlay */}
      <div className={`split-overlay ${animationStarted ? 'animate' : ''}`}>
        <div className="split-top"></div>
        <div className="split-bottom"></div>
      </div>

      {/* Hero Section */}
      <section className={`hero-section ${animationStarted ? 'zoom-in' : ''}`}>
        <div className="hero-container">
          {/* Large background text */}
          <div className={`hero-background-text ${animationStarted ? 'fade-in-bg' : ''}`}>
            SANSKAR
          </div>
          
          {/* Central content */}
          <div className="hero-content">
            {/* Profile image container */}
            <div className={`hero-image-container ${animationStarted ? 'fade-in-image' : ''}`}>
              <img 
                src="/sanskarl.png" 
                alt="Sanskar - AI Engineer" 
                className="hero-image"
              />
            </div>
            
            {/* Bottom right titles */}
            <div className={`hero-titles ${animationStarted ? 'slide-in-right' : ''}`}>
              
            </div>
            
            {/* Bottom left tagline */}
            <div className={`hero-tagline ${animationStarted ? 'slide-in-left' : ''}`}>
              <p>Engineers you</p>
              <p>remember. Solutions</p>
              <p>you can't unsee.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;