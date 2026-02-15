import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  useScrollAnimation();

  return (
    <section id="about" className="py-5">
      <div className="container">
        <h2 className="section-title animate-target">About Me</h2>
        <div className="row align-items-center gy-5">
          <div className="col-lg-6">
            <div className="about-text animate-target">
              <h3 className="h4 text-primary mb-3">Full-Stack Developer in Tel Aviv</h3>
              <p className="text-secondary">
                I'm a passionate Full-Stack Developer with hands-on experience
                building production-ready web applications for the Israeli tech
                ecosystem. My expertise spans the entire development stack, from
                crafting intuitive React interfaces to designing robust backend
                systems with Node.js and PostgreSQL.
              </p>
              <p className="text-secondary">
                Recently completed an intensive ISO-certified Full-Stack Web
                Development Bootcamp (360 hours) at Developers Institute in Tel
                Aviv, where I mastered modern technologies and agile development
                practices. I hold a B.Sc. in Information Systems from Debre Berhan
                University, along with professional certifications in Cisco CCNA
                (Networking, Routing & Security) and Database Administration Level 3.
              </p>
              <p>
                <strong>Languages:</strong> Amharic (Native), English (Professional), Hebrew (Professional)
              </p>
              <p>
                <strong>Work Authorization:</strong> Eligible to work in Israel | Available immediately for full-time positions in 2026
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row g-3">
              {[
                { num: "B.Sc.", label: "Information Systems" },
                { num: "360h", label: "ISO Certified Bootcamp" },
                { num: "3", label: "Languages" },
                { num: "4+", label: "Certifications" }
              ].map((stat, index) => (
                <div className="col-6" key={index}>
                  <div className="stat-card animate-target">
                    <div className="number">{stat.num}</div>
                    <div className="label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
