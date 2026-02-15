import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Experience() {
  useScrollAnimation();

  return (
    <section id="experience" className="py-5">
      <div className="container">
        <h2 className="section-title animate-target">Experience & Education</h2>
        <div className="timeline ps-4 border-start border-primary border-2 ms-3 animate-target">
          
          <div className="position-relative mb-5 ps-4">
            <div className="position-absolute top-0 start-0 translate-middle bg-primary border border-white border-2 rounded-circle" style={{ width: '16px', height: '16px', left: '-1px' }}></div>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 text-primary">Full-Stack Web Development Bootcamp</h3>
                <div className="text-secondary fw-bold small mb-2">Developers Institute (Gimel), Tel Aviv | 2024 - 2025</div>
                <ul className="text-secondary small mb-0">
                  <li>360-hour intensive program in modern web development</li>
                  <li>Built production-ready e-commerce and enterprise ERP systems</li>
                  <li>Mastered React, TypeScript, Node.js, Express.js, and PostgreSQL</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="position-relative mb-5 ps-4">
            <div className="position-absolute top-0 start-0 translate-middle bg-primary border border-white border-2 rounded-circle" style={{ width: '16px', height: '16px', left: '-1px' }}></div>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 text-primary">Machine Operator</h3>
                <div className="text-secondary fw-bold small mb-2">Max Brenner Chocolate Factory, Tel Aviv | 2024</div>
                <ul className="text-secondary small mb-0">
                  <li>Operated and monitored automated production systems</li>
                  <li>Diagnosed and resolved technical issues</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="position-relative mb-5 ps-4">
            <div className="position-absolute top-0 start-0 translate-middle bg-primary border border-white border-2 rounded-circle" style={{ width: '16px', height: '16px', left: '-1px' }}></div>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 text-primary">B.Sc. Information Systems</h3>
                <div className="text-secondary fw-bold small mb-2">Debre Berhan University | 2018 - 2022</div>
                <ul className="text-secondary small mb-0">
                  <li>Comprehensive study in information systems and software development</li>
                  <li>Graduated with honors</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center mt-5 animate-target">
          <div className="card shadow-sm border-0 d-inline-block p-4">
            <h3 className="h5 text-primary mb-2"><i className="fas fa-file-download me-2"></i> Download My Resume</h3>
            <p className="text-secondary small mb-3">Get a detailed PDF of my experience.</p>
            <a href="/Mebratu_Mengstu_Updated_CV.pdf" className="btn btn-primary" download>
              <i className="fas fa-download me-2"></i> Download Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
