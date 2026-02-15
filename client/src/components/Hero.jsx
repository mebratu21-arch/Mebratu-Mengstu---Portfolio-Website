import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "Full-Stack Developer",
    "React Specialist",
    "Node.js Engineer",
    "PostgreSQL Expert",
    "Available in Israel 2026",
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const float = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(float);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="hero d-flex align-items-center" id="home">
      <div className="container hero-content">
        <h1 className="display-4 fw-bold animate-target">Mebratu Mengstu</h1>
        <div className="subtitle h2 mb-3 animate-target">
          <span id="typingText">{text}</span>
          <span className="typing-cursor">|</span>
        </div>
        <p className="lead animate-target">
          Building scalable, high-performance web applications with modern technologies.
        </p>
        <div className="hero-buttons d-flex justify-content-center gap-3 animate-target">
          <a href="#contact" className="btn btn-light btn-lg fw-bold text-primary">
            <i className="fas fa-paper-plane me-2"></i> Hire Me
          </a>
          <a href="#projects" className="btn btn-outline-light btn-lg fw-bold">
            <i className="fas fa-code me-2"></i> View Projects
          </a>
        </div>
      </div>
    </section>
  );
}
