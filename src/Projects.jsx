import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './CustomCursor'; // Assuming CustomCursor is available

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const projects = [
    {
      title: 'TALK - Real-Time Chat Application',
      description: 'A real-time messaging app built with MERN stack and Socket.io. Features JWT authentication, Zustand state management, and TailwindCSS for responsive UI.',
      status: 'Will be deployed soon',
    },
    {
      title: 'ASSESSIQ - Remote Interview Platform',
      description: 'A web-based coding interview tool using Next.js and TypeScript. Includes Clerk authentication, Convex database, Stream video conferencing, and Monaco Editor for real-time code collaboration.',
      link: '#',
    },
  ];

  useEffect(() => {
    // Animations for project cards
    gsap.fromTo(
      '.project-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        scrollTrigger: { trigger: '#projects', start: 'top 80%' },
      }
    );

    // Animate section title
    gsap.fromTo(
      '.section-title',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        scrollTrigger: { trigger: '#projects', start: 'top 90%' },
      }
    );
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleCardHover = (hovered, index) => {
    const card = document.querySelectorAll('.project-card')[index];
    if (card) {
      card.style.transform = hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)';
      card.style.boxShadow = hovered
        ? 'inset 0 0 0 1px rgba(255,255,255,0.2), 0 4px 15px rgba(0,0,0,0.3)'
        : 'inset 0 0 0 1px rgba(255,255,255,0.05)';
    }
  };

  return (
    <>
      <CustomCursor />
      <section
        ref={sectionRef}
        id="projects"
        onMouseMove={handleMouseMove}
        className="relative py-12 md:py-20 min-h-[60vh] flex flex-col justify-center bg-black overflow-hidden cursor-none"
        style={{
          background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)',
        }}
      >
        {/* Minimal Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient Light Effect */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.08), transparent 60%)`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2
            className="section-title text-4xl sm:text-5xl md:text-6xl font-extralight text-white/90 mb-10 md:mb-16 text-center tracking-tight"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card group relative p-4 sm:p-6 rounded-none bg-transparent border border-white/10 transition-all duration-400"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
                }}
                onMouseEnter={() => handleCardHover(true, index)}
                onMouseLeave={() => handleCardHover(false, index)}
              >
                {/* Card Background Effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                <h3 className="text-lg sm:text-xl font-light text-white/90 mb-2 sm:mb-3 tracking-wide">{project.title}</h3>
                <p className="text-sm sm:text-base text-white/50 mb-3 sm:mb-4 font-light leading-relaxed">{project.description}</p>
                {project.link ? (
                  <a
                    href={project.link}
                    className="relative text-white/70 group-hover:text-white text-xs sm:text-sm font-light tracking-[0.15em] uppercase transition-colors duration-300 cursor-none"
                  >
                    View Project
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ) : (
                  <span className="text-white/40 text-xs sm:text-sm font-light tracking-[0.15em] uppercase">{project.status}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-6 sm:w-8 h-6 sm:h-8 border-l border-t border-white/10"></div>
        <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-6 sm:w-8 h-6 sm:h-8 border-r border-t border-white/10"></div>
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-6 sm:w-8 h-6 sm:h-8 border-l border-b border-white/10"></div>
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-6 sm:w-8 h-6 sm:h-8 border-r border-b border-white/10"></div>
      </section>
    </>
  );
};

export default Projects;