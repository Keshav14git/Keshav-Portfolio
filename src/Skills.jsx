import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skills = {
    Languages: ['C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Python'],
    Frameworks: ['React.js', 'Node.js', 'Express.js', 'Next.js'],
    Tools: ['Git', 'GitHub', 'Clerk', 'Postman', 'Vercel', 'Convex'],
    Databases: ['MongoDB', 'MySQL', 'Convex'],
    SoftSkills: ['Team Collaboration', 'Time Management', 'Communication', 'Adaptability'],
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const skillsRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      '.skill-title',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#skills', start: 'top 80%' },
      }
    );

    gsap.fromTo(
      '.skill-node',
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '#skills', start: 'top 80%' },
      }
    );
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <section
      id="skills"
      ref={skillsRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      {/* Grid Background */}
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

      {/* Ambient Light Effect */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.08), transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <h2
          className="skill-title text-6xl md:text-8xl font-extralight text-white mb-16 tracking-tight leading-none"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          SKILLS
        </h2>

        {/* Radial Layout */}
        <div className="relative flex items-center justify-center">
          {/* Central Node (Tools) */}
          <div
            className="skill-node flex items-center justify-center w-32 h-32 rounded-full bg-white/10 border border-white/20 shadow-lg"
            style={{ position: 'relative' }}
          >
            <span className="text-white text-lg font-light">Tools</span>
          </div>

          {/* Categories */}
          {Object.keys(skills).map((category, index) => {
            if (category === 'Tools') return null;

            // Position categories around the central node
            const angle = (index * 90) * (Math.PI / 180); // 90-degree intervals
            const radius = 200; // Distance from center
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={category}
                className="absolute skill-title cursor-pointer"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <span
                  className={`text-lg md:text-xl font-light uppercase tracking-[0.2em] ${
                    selectedCategory === category ? 'text-white' : 'text-white/40'
                  } hover:text-white transition-colors duration-300`}
                >
                  {category}
                </span>
                {/* Arrow pointing to center */}
                <div
                  className="absolute w-32 h-px bg-white/40"
                  style={{
                    transform: `rotate(${-index * 90}deg) translateX(-50%)`,
                    transformOrigin: 'left',
                    left: '50%',
                    top: '50%',
                  }}
                >
                  <div
                    className="absolute w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[10px] border-l-white/40"
                    style={{ left: '100%' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Display Selected Category Skills */}
        {selectedCategory && (
          <div className="mt-12 animate-fadeIn">
            <ul className="flex flex-wrap justify-center gap-4">
              {skills[selectedCategory].map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-gray-300 text-sm md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/10"></div>
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-white/10"></div>
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-white/10"></div>
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-white/10"></div>
    </section>
  );
};

export default Skills;