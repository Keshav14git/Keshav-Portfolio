import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Smooth cursor animation
    let rafId;
    const updateCursor = () => {
      setCursorPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15,
      }));
      rafId = requestAnimationFrame(updateCursor);
    };
    
    updateCursor();
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive = target.matches('button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])') ||
                          target.closest('button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])');
      
      setIsHovered(isInteractive);
    };

    // Add global event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    return () => {
      // Cleanup
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.8 : 1})`,
        transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Main cursor dot */}
      <div
        className="w-3 h-3 rounded-full bg-white/30 backdrop-blur-sm border border-white/20"
        style={{
          boxShadow: isHovered 
            ? '0 0 20px rgba(255,255,255,0.3)' 
            : '0 0 10px rgba(255,255,255,0.1)',
        }}
      />
      
      {/* Outer ring for hover effect */}
      {isHovered && (
        <div
          className="absolute inset-0 w-8 h-8 rounded-full border border-white/10 -translate-x-2.5 -translate-y-2.5"
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;