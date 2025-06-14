import React, { useEffect, useRef, useState } from 'react';

const ImageModal = ({ isOpen, onClose, images, projectTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  const nextImage = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setIsLoading(true);
    setCurrentIndex(index);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-60 text-white/70 hover:text-white hover:scale-110 transition-all duration-300"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Project title */}
      <div className="absolute top-6 left-6 z-60">
        <h3 className="text-white text-xl font-light tracking-wide">{projectTitle}</h3>
        <p className="text-white/50 text-sm">{currentIndex + 1} of {images.length}</p>
      </div>

      {/* Main image container */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-8 z-60 text-white/70 hover:text-white hover:scale-110 transition-all duration-300 bg-black/30 rounded-full p-2 backdrop-blur-sm"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-8 z-60 text-white/70 hover:text-white hover:scale-110 transition-all duration-300 bg-black/30 rounded-full p-2 backdrop-blur-sm"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image display */}
        <div className="relative max-w-6xl max-h-[80vh] flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${projectTitle} Screenshot ${currentIndex + 1}`}
            className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-500 ${
              isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            onLoad={handleImageLoad}
            onError={() => {
              console.error('Image failed to load:', images[currentIndex]);
              setIsLoading(false);
            }}
            style={{
              filter: 'drop-shadow(0 0 30px rgba(120, 119, 198, 0.3))',
            }}
          />
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125 shadow-lg'
                    : 'bg-white/30 hover:bg-white/60 hover:scale-110'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed w-6 h-6 border border-white/30 rounded-full pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: mousePosition.x - 12,
        top: mousePosition.y - 12,
        backdropFilter: 'blur(2px)',
      }}
    />
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const projects = [
    {
      title: 'TALK - Real-Time Chat Application',
      details: [
        'Developed a real-time messaging application using MERN stack and Socket.io',
        'Integrated JWT for secure authentication and Zustand for state management',
        'Applied TailwindCSS for responsive UI design',
        'Enabled scalable two-way communication between users',
      ],
      status: 'Will be deployed soon',
      images: [],
    },
    {
      title: 'ASSESSIQ - Remote Interview Platform',
      details: [
        'Built a web-based coding interview tool using Next.js and TypeScript',
        'Implemented Clerk for user authentication and Convex for database management',
        'Integrated Stream for video conferencing within the coding environment',
        'Embedded Monaco Editor to allow real-time code collaboration',
        'Supported multilingual coding with a clean, single-window interface',
      ],
      link: '#',
      images: [
        'https://via.placeholder.com/1200x800/1a1a1a/ffffff?text=AssessIQ+Screenshot+1',
        'https://via.placeholder.com/1200x800/1a1a1a/ffffff?text=AssessIQ+Screenshot+2', 
        'https://via.placeholder.com/1200x800/1a1a1a/ffffff?text=AssessIQ+Screenshot+3',
        'https://via.placeholder.com/1200x800/1a1a1a/ffffff?text=AssessIQ+Screenshot+4',
        'https://via.placeholder.com/1200x800/1a1a1a/ffffff?text=AssessIQ+Screenshot+5',
        'https://via.placeholder.com/1200x800/1a1a1a/ffffff?text=AssessIQ+Screenshot+6',
        'https://via.placeholder.com/1200x800/1a1a1a/ffffff?text=AssessIQ+Screenshot+7',
      ],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleViewImages = (project) => {
    if (project.images && project.images.length > 0) {
      setSelectedProject(project);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
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
    <div className="min-h-screen bg-black">
      <CustomCursor />
      
      {/* Image Modal */}
      {selectedProject && (
        <ImageModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          images={selectedProject.images}
          projectTitle={selectedProject.title}
        />
      )}
      <section
        ref={sectionRef}
        id="projects"
        onMouseMove={handleMouseMove}
        className="relative py-12 md:py-20 min-h-screen flex flex-col justify-center bg-black overflow-hidden"
        style={{
          background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)',
          cursor: 'none',
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
        
        {/* Mouse Following Gradient */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.08), transparent 60%)`,
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-extralight text-white/90 mb-10 md:mb-16 text-center tracking-tight transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
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
                className={`project-card group relative p-4 sm:p-6 rounded-none bg-black/30 border border-white/10 transition-all duration-400 backdrop-blur-sm ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                  transitionDelay: `${index * 200}ms`,
                }}
                onMouseEnter={() => handleCardHover(true, index)}
                onMouseLeave={() => handleCardHover(false, index)}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                
                <h3 className="text-lg sm:text-xl font-light text-white/90 mb-2 sm:mb-3 tracking-wide">
                  {project.title}
                </h3>
                
                <ul className="text-sm sm:text-base text-white/50 mb-3 sm:mb-4 font-light leading-relaxed list-disc list-inside">
                  {project.details.map((detail, idx) => (
                    <li key={idx} className="mb-1">{detail}</li>
                  ))}
                </ul>
                
                {project.title.includes('ASSESSIQ') && Array.isArray(project.images) && project.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-1 mb-4 opacity-60">
                    {project.images.slice(0, 3).map((image, idx) => (
                      <div key={idx} className="relative overflow-hidden rounded border border-white/10">
                        <img
                          src={image}
                          alt={`AssessIQ Preview ${idx + 1}`}
                          className="w-full h-12 object-cover hover:scale-110 transition-transform duration-300"
                        />
                        {idx === 2 && project.images.length > 3 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-xs font-light">+{project.images.length - 3}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      className="relative text-white/70 group-hover:text-white text-xs sm:text-sm font-light tracking-[0.15em] uppercase transition-colors duration-300 mb-2 sm:mb-0 inline-block"
                    >
                      View Project
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  )}
                  
                  {project.images && project.images.length > 0 ? (
                    <button
                      onClick={() => handleViewImages(project)}
                      className="relative text-white/70 group-hover:text-white text-xs sm:text-sm font-light tracking-[0.15em] uppercase transition-colors duration-300 inline-block bg-transparent border-none cursor-pointer"
                    >
                      View Images ({project.images.length})
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300"></span>
                    </button>
                  ) : project.status ? (
                    <span className="text-white/40 text-xs sm:text-sm font-light tracking-[0.15em] uppercase">
                      {project.status}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Corner Decorations */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-6 sm:w-8 h-6 sm:h-8 border-l border-t border-white/10"></div>
        <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-6 sm:w-8 h-6 sm:h-8 border-r border-t border-white/10"></div>
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-6 sm:w-8 h-6 sm:h-8 border-l border-b border-white/10"></div>
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-6 sm:w-8 h-6 sm:h-8 border-r border-b border-white/10"></div>
      </section>
    </div>
  );
};

export default Projects;