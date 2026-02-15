import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Certifications() {
  useScrollAnimation();

  const certs = [
    { icon: "fas fa-certificate", title: "Cisco CCNA", sub: "Networking Academy" },
    { icon: "fas fa-graduation-cap", title: "Bootcamp Graduate", sub: "Developers Institute (ISO)" },
    { icon: "fas fa-database", title: "DB Admin Level 3", sub: "Federal TVET Agency" }
  ];

  return (
    <section id="certifications" className="py-5 bg-light-subtle">
      <div className="container">
        <h2 className="section-title animate-target">Certifications</h2>
        <div className="row g-4 justify-content-center">
          {certs.map((cert, index) => (
            <div className="col-md-6 col-lg-3 animate-target" key={index}>
              <div className="card h-100 card-hover p-3 text-center">
                <div className="card-body">
                  <i className={`${cert.icon} text-primary fs-2 mb-3`}></i>
                  <h3 className="h5">{cert.title}</h3>
                  <p className="small text-secondary mb-0">{cert.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
