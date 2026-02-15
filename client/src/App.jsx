import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link visually-hidden-focusable">Skip to main content</a>
      
      <Navbar />
      
      <Hero />
      
      <main id="main-content">
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Contact />
      </main>
      
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
