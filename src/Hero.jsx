import React, { useEffect, useRef, useState } from 'react';
import CustomCursor from './CustomCursor'; // Import the custom cursor

const Hero = () => {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonRef = useRef(null);
  const gridRef = useRef(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 
  useEffect(() => {
    // Simple entrance animations
    const elements = [logoRef, textRef, subtextRef, buttonRef];
    elements.forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          ref.current.style.transition = 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)';
          ref.current.style.opacity = '1';
          ref.current.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleButtonHover = (hovered) => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = hovered 
        ? 'translateY(-2px) scale(1.02)' 
        : 'translateY(0) scale(1)';
    }
  };

  const handleButtonClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Custom Cursor - Only render once at the top level */}
      <CustomCursor />
      
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden cursor-none"
        style={{
          background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)',
        }}
      >
        {/* Minimal Grid Background */}
        <div
          ref={gridRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Ambient Light Effect - Simplified */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.08), transparent 60%)`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
          {/* Logo */}
          <img
            ref={logoRef}
            src="/K(2).png"
            alt="Keshav Jangir Logo"
            className="mx-auto mb-26 w-36 h-26 md:w-26 md:h-26 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
          />

          {/* Name */}
          <h1
            ref={textRef}
            className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white mb-6 tracking-tight leading-none"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Keshav Jangir
          </h1>

          {/* Role */}
          <p
            ref={subtextRef}
            className="text-lg md:text-xl text-white/40 mb-16 font-light tracking-[0.2em] uppercase"
          >
            Software Developer
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              ref={buttonRef}
              onMouseEnter={() => handleButtonHover(true)}
              onMouseLeave={() => handleButtonHover(false)}
              onClick={handleButtonClick}
              className="group relative px-8 py-3 md:px-12 md:py-4 overflow-hidden cursor-none"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0',
                background: 'transparent',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* Button Background Effect */}
              <div 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500"
              />
              
              {/* Button Border Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)',
                }}
              />
              
              <span className="relative text-white/70 group-hover:text-white text-sm md:text-base font-light tracking-[0.15em] uppercase transition-colors duration-300">
                Connect
              </span>
            </button>
          </div>
        </div>

        {/* Minimal Bottom Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/10"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-white/10"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-white/10"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-white/10"></div>
      </section>
    </>
  );
};

export default Hero;