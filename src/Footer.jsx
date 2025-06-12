import React, { useEffect, useRef, useState } from 'react';
import githubLogo from './assets/github.png'; // Adjust path if needed
import leetcodeLogo from './assets/leetcode.png'; // Adjust path if needed

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

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const socialRefs = useRef([]);
  const [scrolled, setScrolled] = useState(false);

  // Entrance animations and scroll effect
  useEffect(() => {
    // Entrance animations
    const elements = [contentRef.current, ...socialRefs.current.filter(Boolean)];
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

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Keshav14git',
      icon: <img src={githubLogo} alt="GitHub Logo" className="w-6 h-6 github-logo" />,
      hoverColor: '#4078C0', // GitHub blue
    },
    {
      name: 'LeetCode',
      href: 'https://leetcode.com/Keshav_Jangir/',
      icon: <img src={leetcodeLogo} alt="LeetCode Logo" className="w-6 h-6 leetcode-logo" />,
      hoverColor: '#F7C948', // LeetCode yellow/orange
    },
  ];

  return (
    <footer
      ref={footerRef}
      className={`relative py-6 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-t border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          ref={contentRef}
          className="flex flex-col items-center"
        >
          <p
            className="text-base md:text-lg font-extralight text-white/80 mb-4"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.01em' }}
          >
            © 2025 KESHAV JANGIR. WORKING INNOVATIVE/CREATIVE.
          </p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                ref={(el) => (socialRefs.current[index] = el)}
                onMouseEnter={(e) => handleItemHover(e.currentTarget)}
                onMouseLeave={(e) => handleItemLeave(e.currentTarget)}
                className="flex items-center relative group transition-all duration-300 social-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--hover-color': link.hoverColor }}
              >
                {link.icon}
                <span className="ml-2 text-sm font-light text-white/60 tracking-[0.1em] uppercase">
                  {link.name}
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-px bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      )}

      <style jsx>{`
        .social-link:hover span {
          color: var(--hover-color);
        }
        .social-link:hover .github-logo {
          filter: hue-rotate(220deg) brightness(1.2);
        }
        .social-link:hover .leetcode-logo {
          filter: hue-rotate(40deg) brightness(1.3);
        }
        @media (max-width: 640px) {
          .max-w-7xl {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;