import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
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
    gsap.fromTo(
      '.project-card',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.3, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: '#projects', start: 'top 80%' } }
    );
  }, []);

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-white mb-12 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card p-6 rounded-lg bg-backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              {project.link ? (
                <a
  href={project.link}
  className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:underline hover:decoration-4 hover:underline-offset-4 hover:decoration-gradient-to-r hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 transition-all duration-300"
                    >
                     View Project
                   </a>

              ) : (
                <span className="text-gray-400">{project.status}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;