import React, { useRef, useState } from 'react';

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

  const handleMouseMove = (e) => {
    if (skillsRef.current) {
      const rect = skillsRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
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
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.12), transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-6xl font-extralight text-white mb-16 tracking-tight leading-none"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          SKILLS
        </h2>

        {/* Skills Layout */}
        <div className="relative flex items-center justify-center min-h-[400px]">
          {!selectedCategory ? (
            // Initial State: Show all categories in a grid layout
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {Object.keys(skills).map((category, index) => (
                <div
                  key={category}
                  className="group cursor-pointer transition-all duration-500 hover:scale-110"
                  onClick={() => handleCategoryClick(category)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="relative">
                    {/* Category Node */}
                    <div className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/5 border border-white/20 shadow-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                      <span className="text-white text-sm md:text-lg font-light text-center px-2">
                        {category}
                      </span>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </div>
                  
                  {/* Category Label */}
                  <p className="mt-4 text-xs md:text-sm font-light uppercase tracking-[0.2em] text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {category}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            // Selected State: Show selected category with skills and sidebar
            <div className="w-full flex items-start justify-between gap-8">
              {/* Sidebar with other categories */}
              <div className="hidden md:flex flex-col gap-4 w-48">
                <h3 className="text-lg font-light text-white/40 mb-4 uppercase tracking-wider">
                  Other Skills
                </h3>
                {Object.keys(skills)
                  .filter(cat => cat !== selectedCategory)
                  .map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white/60 hover:text-white/80 text-sm"
                    >
                      {category}
                    </button>
                  ))}
              </div>

              {/* Main Selected Category Display */}
              <div className="flex-1 max-w-2xl">
                <div className="text-center mb-8">
                  {/* Selected Category Header */}
                  <div 
                    className="inline-flex items-center gap-4 cursor-pointer group mb-6"
                    onClick={() => handleCategoryClick(selectedCategory)}
                  >
                    <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 border border-white/30 shadow-xl backdrop-blur-sm group-hover:bg-white/15 transition-all duration-300">
                      <span className="text-white text-lg md:text-xl font-light">
                        {selectedCategory.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl md:text-4xl font-light text-white mb-1">
                        {selectedCategory}
                      </h3>
                      <p className="text-sm text-white/60">Click to close</p>
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {skills[selectedCategory].map((skill, index) => (
                    <div
                      key={skill}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm md:text-base hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                        animation: 'fadeInUp 0.6s ease-out forwards',
                        opacity: 0,
                        transform: 'translateY(20px)',
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile: Other categories as pills at bottom */}
              <div className="md:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/80 backdrop-blur-sm p-3 rounded-full border border-white/10">
                {Object.keys(skills)
                  .filter(cat => cat !== selectedCategory)
                  .slice(0, 3)
                  .map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="px-3 py-1 text-xs bg-white/10 border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                    >
                      {category}
                    </button>
                  ))}
                {Object.keys(skills).filter(cat => cat !== selectedCategory).length > 3 && (
                  <div className="px-3 py-1 text-xs text-white/50">
                    +{Object.keys(skills).filter(cat => cat !== selectedCategory).length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/10"></div>
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-white/10"></div>
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-white/10"></div>
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-white/10"></div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;