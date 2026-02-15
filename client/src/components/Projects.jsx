import React, { useState, useEffect } from 'react';
import { fetchProjects, likeProject } from '../api';
import ProjectModal from './ProjectModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [likedProjects, setLikedProjects] = useState(() => {
    return JSON.parse(localStorage.getItem('likedProjects') || '{}');
  });

  useScrollAnimation();

  useEffect(() => {
    fetchProjects().then(data => {
      setProjects(data);
    });
  }, []);

  const handleLike = async (id, e) => {
    e.stopPropagation();
    if (likedProjects[id]) return; // Already liked

    // Optimistic update
    const prevProjects = [...projects];
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
    ));

    // Update local storage
    const newLiked = { ...likedProjects, [id]: true };
    setLikedProjects(newLiked);
    localStorage.setItem('likedProjects', JSON.stringify(newLiked));

    try {
      await likeProject(id);
    } catch (error) {
      // Revert if failed
      setProjects(prevProjects);
      const revertedLiked = { ...likedProjects };
      delete revertedLiked[id];
      setLikedProjects(revertedLiked);
      localStorage.setItem('likedProjects', JSON.stringify(revertedLiked));
    }
  };

  return (
    <section id="projects" className="py-5">
      <div className="container">
        <h2 className="section-title animate-target">Featured Projects</h2>
        <div className="row g-4" id="projectsContainer">
          {projects.map((project) => (
            <div className="col-md-6 animate-target" key={project.id}>
              <div className="card h-100 card-hover" onClick={() => setSelectedProject(project)}>
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy" 
                    style={{ opacity: project.status === 'coming-soon' ? 0.7 : 1 }}
                  />
                  {project.status === 'coming-soon' && (
                    <div className="position-absolute top-50 start-50 translate-middle badge bg-dark opacity-75 fs-6">COMING SOON</div>
                  )}
                  {/* Like Button Overlay */}
                  <button 
                    className={`btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle shadow-sm ${likedProjects[project.id] ? 'btn-danger' : 'btn-light text-danger'}`}
                    onClick={(e) => handleLike(project.id, e)}
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Like this project"
                  >
                    <i className={`${likedProjects[project.id] ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start">
                    <h3 className="h5 card-title">{project.title}</h3>
                    <span className="text-secondary small">
                      <i className="fas fa-heart text-danger me-1"></i>
                      {project.likes || 0}
                    </span>
                  </div>
                  
                  <p className="card-text text-secondary flex-grow-1">{project.description}</p>
                  <div className="mb-3">
                    {(typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags || []).map((tag, i) => (
                      <span key={i} className="badge bg-light text-primary border border-primary-subtle me-1 mb-1">{tag}</span>
                    ))}
                  </div>
                  <div className="d-flex gap-2 mt-auto">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm" onClick={(e) => e.stopPropagation()}>
                        <i className="fab fa-github me-1"></i> Code
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" onClick={(e) => e.stopPropagation()}>
                        <i className="fas fa-external-link-alt me-1"></i> Live
                      </a>
                    )}
                    {project.status === 'coming-soon' && (
                      <button className="btn btn-outline-secondary btn-sm" disabled>
                        <i className="fas fa-hammer me-1"></i> In Progress
                      </button>
                    )}
                    <button className="btn btn-sm btn-outline-dark ms-auto" onClick={() => setSelectedProject(project)}>
                      <i className="fas fa-info-circle me-1"></i> Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ProjectModal 
        show={!!selectedProject} 
        onHide={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </section>
  );
}
