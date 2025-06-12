import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skills = {
    Languages: ['C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Python'],
    Frameworks: ['React.js', 'Node.js', 'Express.js', 'Next.js'],
    Tools: ['Git', 'GitHub', 'Clerk', 'Postman', 'Vercel', 'Convex'],
    Databases: ['MongoDB', 'MySQL', 'Convex'],
    'Soft Skills': ['Team Collaboration', 'Time Management', 'Communication', 'Adaptability'],
  };

  useEffect(() => {
    gsap.fromTo(
      '.skill-card',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.2, duration: 0.8, ease: 'back.out(1.7)', scrollTrigger: { trigger: '#skills', start: 'top 80%' } }
    );
  }, []);

  return (
    <section id="skills" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-white mb-12 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-card p-6 rounded-lg bg-backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">{category}</h3>
              <ul className="list-disc list-inside text-gray-300">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;