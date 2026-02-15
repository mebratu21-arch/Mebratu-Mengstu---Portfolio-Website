import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const skillsData = [
  { category: 'frontend', title: 'Frontend', icon: 'fas fa-laptop-code', list: ['React & Redux', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { category: 'backend', title: 'Backend', icon: 'fas fa-server', list: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Stripe Integration', 'Python'] },
  { category: 'database', title: 'Database', icon: 'fas fa-database', list: ['PostgreSQL', 'MySQL', 'SQL Optimization', 'Database Design', 'Knex.js'] },
  { category: 'tools', title: 'Tools', icon: 'fas fa-tools', list: ['Git & GitHub', 'VS Code', 'Postman', 'Agile/Scrum', 'Vercel & Render'] },
];

export default function Skills() {
  const [filter, setFilter] = useState('all');
  useScrollAnimation();

  return (
    <section id="skills" className="py-5 bg-light-subtle">
      <div className="container">
        <h2 className="section-title animate-target">Technical Skills</h2>
        
        <div className="text-center mb-5 animate-target">
          <div className="d-flex justify-content-center flex-wrap gap-2">
            {['all', 'frontend', 'backend', 'database', 'tools'].map(f => (
              <button 
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`} 
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="row g-4 skills-grid">
          {skillsData.map((skill, index) => (
            <div 
              key={index} 
              className={`col-md-6 col-lg-3 skill-category animate-target ${filter !== 'all' && filter !== skill.category ? 'd-none' : ''}`}
            >
              <div className="card h-100 card-hover p-3">
                <div className="card-body">
                  <h3 className="h5 text-primary mb-3"><i className={`${skill.icon} me-2`}></i> {skill.title}</h3>
                  <ul className="list-unstyled">
                    {skill.list.map((item, i) => (
                      <li key={i} className="mb-2 text-secondary">
                        <i className="fas fa-check-circle text-success me-2"></i> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
