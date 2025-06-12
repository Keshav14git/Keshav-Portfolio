import React from 'react';
import Navbar from './Navbar';
import './App.css'; // Assuming you have some global styles
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Certificates from './Certificates';
import Contact from './Contact';
import Footer from './footer';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
      
      {/* Other components or content can go here */}
    </div>
  );
}

export default App;
