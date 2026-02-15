import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <h5 className="text-white mb-3">Mebratu Mengstu</h5>
            <p className="text-white-50 small">
              Full-Stack Developer specializing in building modern web applications with React, Node.js, and PostgreSQL.
            </p>
          </div>
          <div className="col-md-6 col-lg-3">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#about" className="text-white-50 text-decoration-none">About</a></li>
              <li><a href="#projects" className="text-white-50 text-decoration-none">Projects</a></li>
              <li><a href="#contact" className="text-white-50 text-decoration-none">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3">
            <h5 className="text-white mb-3">Services</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50 text-decoration-none">Full-Stack Development</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">Web Application Development</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">API Development</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3">
            <h5 className="text-white mb-3">Connect</h5>
            <div className="d-flex gap-3">
              <a href="https://www.linkedin.com/in/mebratu21" className="text-white fs-5" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
              <a href="https://github.com/mebratu21-arch" className="text-white fs-5" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
              <a href="mailto:mebratu21arch@gmail.com" className="text-white fs-5"><i className="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
        <hr className="border-white-50 mt-4 mb-3" />
        <div className="text-center text-white-50 small">
          &copy; 2026 Mebratu Mengstu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
