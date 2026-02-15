import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ProjectModal({ show, onHide, project }) {
  if (!project) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="text-primary">{project.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img 
          src={project.image} 
          alt={project.title} 
          className="img-fluid rounded mb-3 w-100" 
          style={{ maxHeight: '300px', objectFit: 'cover' }} 
        />
        <p className="text-secondary">
          {project.long_description || project.longDescription || project.description}
        </p>
        <div className="mb-3">
          {project.tags && (typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags).map((tag, i) => (
            <span key={i} className="badge bg-primary me-1 mb-1">{tag}</span>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-start">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline-dark">
            <i className="fab fa-github me-1"></i> View Code
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary ms-2">
            <i className="fas fa-external-link-alt me-1"></i> Live Demo
          </a>
        )}
        <Button variant="secondary" onClick={onHide} className="ms-auto">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
