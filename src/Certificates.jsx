import React, { useEffect, useRef, useState } from 'react';
import javaImage from './assets/java.png'; // Adjust path based on your project structure
import psBasicImage from './assets/PS-basic.png'; // Adjust path based on your project structure
import psInterImage from './assets/PS-Inter.png'; // Adjust path based on your project structure

const Certificates = () => {
  const certificatesRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const certificates = [
    {
      title: 'Programming in Java (HackerRank)',
      date: 'May 2025',
      description: 'Demonstrated fundamental knowledge of Java programming, including syntax, object-oriented concepts, and basic data structures.',
      image: javaImage, // Imported Java certificate image
    },
    {
      title: 'Problem Solving Basic (HackerRank)',
      date: 'June 2025',
      description: 'Showcased proficiency in basic algorithmic thinking and logical reasoning through structured coding exercises.',
      image: psBasicImage, // Imported Problem Solving Basic certificate image
    },
    {
      title: 'Problem Solving Intermediate (HackerRank)',
      date: 'June 2025',
      description: 'Proven ability to solve medium-difficulty algorithmic problems involving arrays, strings, sorting, and recursion.',
      image: psInterImage, // Imported Problem Solving Intermediate certificate image
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % certificates.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [certificates.length]);

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

    if (certificatesRef.current) {
      observer.observe(certificatesRef.current);
    }

    return () => {
      if (certificatesRef.current) {
        observer.unobserve(certificatesRef.current);
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
    const rect = certificatesRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % certificates.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleViewImage = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleImageError = (e) => {
    console.error(`Failed to load image: ${e.target.src}`);
    alert('Certificate image could not be loaded. Please check the image path or file availability.');
  };

  return (
    <section
      id="certificates"
      ref={certificatesRef}
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
      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto pb-20">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white mb-16 tracking-tight leading-none"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          Certificates
        </h2>

        {/* Certificates Carousel */}
        <div ref={contentRef} className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="min-w-full flex justify-center"
              >
                <div
                  className="relative p-4 sm:p-8 w-full max-w-lg sm:max-w-md md:max-w-lg"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <h3 className="text-xl md:text-2xl font-light text-white mb-4">
                    {cert.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/50">{cert.date}</p>
                  <p className="text-base md:text-lg text-white/70">{cert.description}</p>
                  <button
                    onClick={() => handleViewImage(cert.image)}
                    className="mt-4 bg-black/30 hover:bg-white/20 text-white px-4 py-2 rounded-full transition duration-300"
                    style={{ backdropFilter: 'blur(5px)' }}
                  >
                    View Certificate
                  </button>
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
          {certificates.map((_, index) => (
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

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          style={{ backdropFilter: 'blur(10px)' }}
          onClick={handleCloseImage}
        >
          <div
            className="relative max-w-3xl w-full p-4"
            style={{
              transform: selectedImage ? 'translateY(0)' : 'translateY(-100%)',
              opacity: selectedImage ? 1 : 0,
              transition: 'transform 600ms ease-in-out, opacity 600ms ease-in-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Certificate"
              className="w-full h-auto rounded-lg shadow-lg"
              onError={handleImageError}
            />
            <button
              onClick={handleCloseImage}
              className="absolute top-2 right-3 bg-gray-300 hover:bg-white/20 text-red-900 p-2 rounded-full transition duration-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}

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

export default Certificates;