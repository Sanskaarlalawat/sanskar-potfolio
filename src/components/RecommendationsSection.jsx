import React, { useRef, useState, useEffect } from 'react';


const ReviewsAnimation = () => {
  const containerRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    // Load Bebas Neue font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const reviews = [
    {
      id: 1,
      title: "Outstanding\nCreative Work",
      text: "Working with this freelancer was an absolute game-changer for our startup. Their creative vision and attention to detail transformed our entire brand identity.",
      client: {
        name: "Sarah Mitchell",
        role: "CEO, TechFlow Solutions",
        avatar: "SM"
      }
    },
    {
      id: 2,
      title: "Exceptional\nCommunication",
      text: "Professional, responsive, and incredibly talented. They understood our complex requirements immediately and delivered beyond expectations.",
      client: {
        name: "David Lopez",
        role: "Creative Director, Pixel Studios",
        avatar: "DL"
      }
    },
    {
      id: 3,
      title: "Perfect\nExecution",
      text: "A true professional who turns vague concepts into stunning visual experiences. The creativity and technical skill demonstrated was remarkable.",
      client: {
        name: "Amanda Rodriguez",
        role: "Marketing Manager, GrowthLab",
        avatar: "AR"
      }
    }
  ];

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollRange = containerHeight - viewportHeight;
      const scrolled = -containerRect.top;

      if (scrolled >= 0 && scrolled <= scrollRange) {
        const progress = scrolled / scrollRange;
        setScrollProgress(progress);
        
        const cardIndex = Math.min(
          reviews.length - 1,
          Math.floor(progress * reviews.length)
        );
        setCurrentCardIndex(cardIndex);
      } else if (scrolled < 0) {
        setScrollProgress(0);
        setCurrentCardIndex(0);
      } else {
        setScrollProgress(1);
        setCurrentCardIndex(reviews.length - 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [reviews.length]);

  const cardWidth = typeof window !== 'undefined' ? window.innerWidth * 0.7 : 1000;
  const gap = 30;
  const totalWidth = (cardWidth + gap) * reviews.length;
  const translateX = -scrollProgress * (totalWidth - (typeof window !== 'undefined' ? window.innerWidth * 0.8 : 1000));

  return (
    <div style={{ backgroundColor: '#000' }}>
      <div style={{ height: '100vh', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
          Scroll Down ↓
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          height: '400vh',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: '#000',
            overflow: 'hidden'
          }}
        >
          <h2
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 900,
              color: 'white',
              textTransform: 'uppercase',
              opacity: 0.1,
              letterSpacing: '-2px',
              zIndex: 5,
              margin: 0
            }}
          >
            Client Reviews
          </h2>

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              height: '500px',
              gap: '30px',
              paddingLeft: '10%',
              paddingRight: '10%',
              transform: `translate(${translateX}px, -50%)`,
              transition: 'none',
              willChange: 'transform'
            }}
          >
            {reviews.map((review, index) => (
              <div
                key={review.id}
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  width: '70vw',
                  maxWidth: '900px',
                  height: '500px',
                  padding: '60px',
                  background: 'linear-gradient(180deg, #fff0ff 0%, #7f4ca5 100%)',
                  borderRadius: '32px',
                  border: `2px solid ${currentCardIndex === index ? '#8A7AA3' : '#9A88B5'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  opacity: currentCardIndex === index ? 1 : 0.6,
                  transform: currentCardIndex === index ? 'scale(1)' : 'scale(0.95)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease'
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.03)',
                    transform: 'translate(50%, -50%)'
                  }}
                />

                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    borderRadius: '32px',
                    opacity: 0.02,
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)'
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', position: 'relative', zIndex: 10 }}>
                  <h3 
                    style={{
                      fontSize: 'clamp(32px, 5vw, 48px)',
                      lineHeight: 0.9,
                      color: '#2d1b3d',
                      letterSpacing: '-2px',
                      maxWidth: '60%',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      whiteSpace: 'pre-line',
                      margin: 0
                    }}
                  >
                    {review.title}
                  </h3>
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: '#7f4ca5',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: 900,
                      flexShrink: 0
                    }}
                  >
                    {String(review.id).padStart(2, '0')}
                  </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                  <div 
                    style={{
                      fontSize: 'clamp(18px, 2.5vw, 24px)',
                      lineHeight: 1.4,
                      color: '#2d1b3d',
                      marginBottom: '50px',
                      maxWidth: '85%',
                      fontWeight: 600
                    }}
                  >
                    {review.text}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
                    <div 
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '24px',
                        background: '#7f4ca5',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        fontWeight: 900,
                        border: '2px solid #7f4ca5'
                      }}
                    >
                      {review.client.avatar}
                    </div>
                    <div style={{ flex: '1 1 auto', minWidth: '150px' }}>
                      <h3 
                        style={{
                          fontSize: 'clamp(18px, 2.5vw, 24px)',
                          color: '#2d1b3d',
                          letterSpacing: '-1px',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          marginBottom: '8px',
                          margin: 0
                        }}
                      >
                        {review.client.name}
                      </h3>
                      <p 
                        style={{
                          color: '#4a2f5e',
                          fontSize: 'clamp(14px, 1.5vw, 16px)',
                          fontWeight: 600,
                          margin: 0
                        }}
                      >
                        {review.client.role}
                      </p>
                    </div>
                    <div 
                      style={{
                        background: '#7f4ca5',
                        padding: '12px 20px',
                        borderRadius: '50px',
                        display: 'flex',
                        gap: '4px'
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: 'white', fontSize: '18px' }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '12px',
              zIndex: 20
            }}
          >
            {reviews.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: currentCardIndex === index ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  border: `1px solid ${currentCardIndex === index ? 'white' : 'rgba(255, 255, 255, 0.6)'}`,
                  transform: currentCardIndex === index ? 'scale(1.2)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: '100vh', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
          End of Reviews ↓
        </div>
      </div>
    </div>
  );
};

export default ReviewsAnimation;