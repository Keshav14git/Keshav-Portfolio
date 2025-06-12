import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import emailLogo from './assets/email.png';
import linkedinLogo from './assets/linkedin.png';

const Contact = () => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.3 });

    if (contactRef.current) observer.observe(contactRef.current);
    return () => {
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

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
    const rect = contactRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, message } = formData;

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const templateParams = { fullName, email, message };

    emailjs.send(
      'service_05fz69s',       
      'template_hoia43t',      
      templateParams,
      '_ATgNBSEZAR-PEjCe'        
    )
    .then(() => {
      alert('Message sent successfully!');
      setFormData({ fullName: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      alert('Failed to send message. Please try again.');
    });
  };

  const contactItems = [
    {
      icon: <img src={emailLogo} alt="Email Logo" className="w-6 h-6" />,
      label: 'Email',
      value: 'keshavjangir1411@gmail.com',
      href: 'mailto:keshavjangir1411@gmail.com',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+91 7568574912',
      href: 'tel:+917568574912',
    },
    {
      icon: <img src={linkedinLogo} alt="LinkedIn Logo" className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'Keshav Jangir',
      href: 'https://linkedin.com/in/keshav-jangir-nov1411',
    },
  ];

  return (
    <section
      id="contact"
      ref={contactRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden cursor-none"
      style={{ background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)' }}
    >
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

      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.06), transparent 60%)`,
        }}
      />

      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto pt-20">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white mb-16 tracking-tight leading-none"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          Contact Me
        </h2>

        <div
          ref={contentRef}
          className="max-w-4xl mx-auto p-6 rounded-lg"
          style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center">
              {contactItems.map((item, index) => (
                <div key={index} className="flex items-center mb-4 last:mb-0 transition-all duration-300 hover:scale-105">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 mr-4">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-base md:text-lg font-light text-white/80">{item.label}</p>
                    <a
                      href={item.href}
                      className="text-base md:text-lg text-white hover:text-cyan-400 transition duration-300"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mb-3">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full p-2 rounded-lg text-white text-base md:text-lg font-light bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none transition duration-300"
                  style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full p-2 rounded-lg text-white text-base md:text-lg font-light bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none transition duration-300"
                  style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="3"
                  className="w-full p-2 rounded-lg text-white text-base md:text-lg font-light bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none transition duration-300"
                  style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition duration-300"
                style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Corner and side accents remain unchanged */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/5"></div>
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/5"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/5"></div>
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/5"></div>
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>
    </section>
  );
};

export default Contact;
