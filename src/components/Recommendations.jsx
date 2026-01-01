import React, { useState, useRef, useEffect } from 'react';
import './Recommendations.css';

const Recommendations = ({ sectionRef }) => {
  const wrapperRef = useRef(null);
  const recommendationsSectionRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const reviews = [
    {
      title: "Outstanding\nCreative Work",
      number: "01",
      text: "Working with Sanskar was an absolute game-changer for our startup. Their creative vision and attention to detail transformed our entire brand identity.",
      clientInitials: "SK",
      clientName: "Sudhakar Kumari",
      clientRole: "CEO, X360 Technologies"
    },
    {
      title: "Exceptional\nCommunication",
      number: "02",
      text: "Professional, responsive, and incredibly talented. They understood our complex requirements immediately and delivered beyond expectations.",
      clientInitials: "AS",
      clientName: "Amit Sharma",
      clientRole: "Founder, Karai Innovations"
    },
    {
      title: "Perfect\nExecution",
      number: "03",
      text: "A true professional who turns vague concepts into stunning visual experiences. The creativity and technical skill demonstrated was remarkable.",
      clientInitials: "VA",
      clientName: "Vijay Arora",
      clientRole: "CTO, Brand Cabin"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!recommendationsSectionRef.current || !wrapperRef.current || !sectionRef.current) return;

      const rect = recommendationsSectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const container = sectionRef.current.querySelector('[data-recommendations-container]');
      
      if (!container) return;

      // Calculate scroll progress
      const scrollProgress = -sectionTop / (sectionHeight - windowHeight);
      const clampedProgress = Math.min(1, Math.max(0, scrollProgress));

      // Calculate card dimensions
      const totalCards = reviews.length;
      const cardWidth = window.innerWidth <= 480 ? 95 : 
                        window.innerWidth <= 768 ? 90 : 
                        window.innerWidth <= 1024 ? 78 : 65;

      // Determine positioning - use will-change for smoother transitions
      if (sectionTop > 0) {
        // Before section enters viewport
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.bottom = 'auto';
        container.style.willChange = 'transform';
        wrapperRef.current.style.transform = 'translate3d(0, 0, 0)';
        setActiveCardIndex(0);
      } else if (sectionTop + sectionHeight < windowHeight) {
        // After section leaves viewport
        container.style.position = 'absolute';
        container.style.top = 'auto';
        container.style.bottom = '0';
        container.style.willChange = 'auto';
        
        // Keep cards at final position
        const finalTranslateX = -cardWidth * (totalCards - 1);
        wrapperRef.current.style.transform = `translate3d(${finalTranslateX}vw, 0, 0)`;
        setActiveCardIndex(totalCards - 1);
      } else {
        // Section is in viewport - sticky
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.bottom = 'auto';
        container.style.willChange = 'transform';

        // Calculate active card based on progress
        const cardProgress = clampedProgress * (totalCards - 1);
        const currentCardIndex = Math.min(totalCards - 1, Math.round(cardProgress));
        setActiveCardIndex(currentCardIndex);

        // Calculate horizontal translation - use transform3d for GPU acceleration
        const translateX = -clampedProgress * cardWidth * (totalCards - 1);
        wrapperRef.current.style.transform = `translate3d(${translateX}vw, 0, 0)`;
      }
    };

    // Throttle scroll handler for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [reviews.length, sectionRef]);

  return (
    <div ref={sectionRef} className="recommendations-root">
      <div ref={recommendationsSectionRef} className="recommendations-section">
        <div data-recommendations-container className="recommendations-container">
          <h2 className="recommendations-title">
            Client Reviews
          </h2>
          
          <div ref={wrapperRef} className="recommendations-wrapper">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`review-card ${activeCardIndex === index ? 'active' : ''}`}
              >
                <div className="review-header">
                  <h3 className="review-title">
                    {review.title}
                  </h3>
                  <div className="review-number">
                    {review.number}
                  </div>
                </div>
                
                <div className="review-content">
                  <div className="review-text">
                    {review.text}
                  </div>
                  
                  <div className="review-footer">
                    <div className="client-initials">
                      {review.clientInitials}
                    </div>
                    <div className="client-info">
                      <h3 className="client-name">
                        {review.clientName}
                      </h3>
                      <p className="client-role">
                        {review.clientRole}
                      </p>
                    </div>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="star">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="recommendations-dots">
            {reviews.map((_, index) => (
              <div
                key={index}
                className={`dot ${activeCardIndex === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;