import React, { useEffect, useRef, useState } from 'react';
import CustomCursor from './CustomCursor';

const handleItemHover = (element) => {
  if (element) {
    element.style.transform = 'translateY(-1px)';
  }
};

const handleItemLeave = (element) => {
  if (element) {
    element.style.transform = 'translateY(0)';
  }
};

const MenuButton = ({ isOpen, toggleMenu }) => {
  const [particles, setParticles] = useState([]);

  const handleClick = () => {
    toggleMenu();
    const newParticles = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * 2 * Math.PI;
      const distance = 20 + Math.random() * 10;
      return {
        id: Date.now() + i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 2 + Math.random() * 2,
      };
    });
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 600);
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-8 h-8 bg-transparent focus:outline-none md:hidden"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `50%`,
            top: `50%`,
            width: particle.size,
            height: particle.size,
            background: 'rgba(255, 255, 255, 0.7)',
            transform: `translate(-50%, -50%) translate(${particle.x}px, ${particle.y}px) scale(0.5)`,
            opacity: 0,
            animation: 'particle-burst 0.6s ease-out forwards',
          }}
        />
      ))}
      <span
        className={`absolute w-5 h-0.5 left-1.5 rounded transition-all duration-300 ${
          isOpen ? 'top-3.5 rotate-45 bg-white' : 'top-2 bg-white/60'
        }`}
      ></span>
      <span
        className={`absolute w-5 h-0.5 left-1.5 rounded transition-all duration-300 ${
          isOpen ? 'opacity-0 top-3.5' : 'top-3.5 bg-white/60 opacity-100'
        }`}
      ></span>
      <span
        className={`absolute w-5 h-0.5 left-1.5 rounded transition-all duration-300 ${
          isOpen ? 'top-3.5 -rotate-45 bg-white' : 'top-5 bg-white/60'
        }`}
      ></span>
      <style jsx>{`
        @keyframes particle-burst {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(0.5);
            opacity: 0;
          }
        }
        button:hover span {
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </button>
  );
};

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Entrance animations
    const elements = [logoRef.current, ...navItemsRef.current.filter(Boolean)];
    elements.forEach((ref, index) => {
      if (ref) {
        ref.style.opacity = '0';
        ref.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          ref.style.transition = 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)';
          ref.style.opacity = '1';
          ref.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <CustomCursor />
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 cursor-none transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-black'
        }`}
      >
        <div className="w-full px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              ref={logoRef}
              className="flex items-center space-x-2 cursor-none"
            >
              <img
                src="/K(2).png"
                alt="Keshav Jangir Logo"
                className="w-8 h-8 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
              <span
                className="text-xl font-extralight text-white tracking-tight"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '-0.01em',
                }}
              >
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              {['About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  ref={(el) => (navItemsRef.current[index] = el)}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  onMouseEnter={(e) => handleItemHover(e.target)}
                  onMouseLeave={(e) => handleItemLeave(e.target)}
                  className="relative group cursor-none"
                >
                  <span className="text-sm font-light text-white/60 group-hover:text-white tracking-[0.1em] uppercase transition-colors duration-300">
                    {item}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <MenuButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
              isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {['About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className="block w-full text-left px-4 py-3 text-sm font-light text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 tracking-[0.1em] uppercase cursor-none"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Border Effect */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        )}
      </nav>
    </>
  );
};

export default Navbar;