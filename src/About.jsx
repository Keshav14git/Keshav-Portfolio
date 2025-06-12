import React, { useEffect, useRef, useState } from 'react';

const About = () => {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const educationData = [
    {
      title: 'Senior Secondary',
      school: 'Ideal Public School, Rajgarh, India',
      period: '2020 - 2021',
      percentage: '82%',
    },
    {
      title: 'Secondary',
      school: 'Ideal Public School, Rajgarh, India',
      period: '2018 - 2019',
      percentage: '84%',
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % educationData.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [educationData.length]);

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => {
              if (titleRef.current) {
                titleRef.current.style.opacity = '1';
                titleRef.current.style.transform = 'translateY(0)';
              }
            }, 200);
            setTimeout(() => {
              if (contentRef.current) {
                contentRef.current.style.opacity = '1';
                contentRef.current.style.transform = 'translateY(0)';
              }
            }, 500);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  // Initial styles for title and content
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.opacity = '0';
      titleRef.current.style.transform = 'translateY(30px)';
      titleRef.current.style.transition = 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)';
    }
    if (contentRef.current) {
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = 'translateY(30px)';
      contentRef.current.style.transition = 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }, []);

  const handleMouseMove = (e) => {
    const rect = aboutRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + educationData.length) % educationData.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % educationData.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="about"
      ref={aboutRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden cursor-none"
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
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient Light Effect */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.06), transparent 60%)`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white mb-16 tracking-tight leading-none"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          About Me
        </h2>

        {/* Content Card */}
        <div ref={contentRef} className="relative group cursor-none">
          {/* Background blur effect */}
          <div
            className="absolute inset-0 rounded-none"
            style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          />
          {/* Hover glow effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'rgba(255,255,255,0.01)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          />

          {/* Content */}
          <div className="relative p-12 md:p-16">
            <p className="text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed font-light max-w-4xl mx-auto">
              I'm a passionate{' '}
              <span className="text-white/90 font-normal">Software Developer</span>{' '}
              pursuing a B.Tech at JECRC University (2022–2026). With a strong foundation in programming and a knack for problem-solving, I craft innovative solutions using modern technologies.
            </p>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-base md:text-lg text-white/50 leading-relaxed font-light max-w-3xl mx-auto">
                My journey is fueled by a{' '}
                <span className="text-white/70">110+ day streak on LeetCode</span>, solving over{' '}
                <span className="text-white/70">320 problems</span>, and building projects like real-time chat apps and remote interview platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Education Carousel */}
        <div className="mt-12 relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="min-w-full flex justify-center"
              >
                <div
                  className="relative p-8 max-w-lg w-full"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <h3 className="text-xl md:text-2xl font-light text-white mb-4">
                    {edu.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/70">{edu.school}</p>
                  <p className="text-base md:text-lg text-white/50">{edu.period}</p>
                  <p className="text-base md:text-lg text-white/70">
                    Percentage: <span className="text-white/90">{edu.percentage}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition duration-300"
            style={{ backdropFilter: 'blur(5px)' }}
          >
            ←
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition duration-300"
            style={{ backdropFilter: 'blur(5px)' }}
          >
            →
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="mt-8 flex justify-center space-x-2">
          {educationData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition duration-300 ${
                currentSlide === index ? 'bg-white/50' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/5"></div>
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/5"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/5"></div>
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/5"></div>

      {/* Side Indicators */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>
    </section>
  );
};

export default About;