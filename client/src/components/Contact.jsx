import React, { useState } from 'react';
import { submitMessage } from '../api';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  
  useScrollAnimation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      await submitMessage(formData);
      setStatus({ type: 'success', msg: 'Message sent successfully! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setValidated(false);
    } catch (error) {
      // Fallback to mailto
      setStatus({ type: 'success', msg: 'Opening your email client... (API fallback)' });
      const mailtoLink = `mailto:mebratu21arch@gmail.com?subject=${encodeURIComponent(
        (formData.subject || "General") + " — " + formData.name
      )}&body=${encodeURIComponent(
        "Name: " + formData.name + "\nEmail: " + formData.email +
        "\nPhone: " + (formData.phone || "N/A") + "\n\nMessage:\n" + formData.message
      )}`;
      window.location.href = mailtoLink;
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: '', msg: '' }), 6000);
    }
  };

  return (
    <section id="contact" className="py-5 bg-light-subtle">
      <div className="container">
        <h2 className="section-title animate-target">Get In Touch</h2>
        <div className="row g-5">
          <div className="col-lg-5 animate-target">
            <h3 className="h4 text-primary mb-4">Contact Information</h3>
            <div className="d-flex flex-column gap-3">
              {[
                { icon: 'fas fa-envelope', title: 'Email', val: 'mebratu21arch@gmail.com', href: 'mailto:mebratu21arch@gmail.com' },
                { icon: 'fas fa-phone', title: 'Phone', val: '+972 53-551-4764', href: 'tel:+972535514764' },
                { icon: 'fab fa-linkedin', title: 'LinkedIn', val: 'linkedin.com/in/mebratu21', href: 'https://www.linkedin.com/in/mebratu21' },
                { icon: 'fab fa-github', title: 'GitHub', val: 'github.com/mebratu21-arch', href: 'https://github.com/mebratu21-arch' }
              ].map((item, i) => (
                <div className="card border-0 shadow-sm p-3" key={i}>
                  <div className="d-flex align-items-center">
                    <i className={`${item.icon} text-primary fs-3 me-3`}></i>
                    <div>
                      <h4 className="h6 mb-0">{item.title}</h4>
                      <a href={item.href} target="_blank" rel="noreferrer" className="text-secondary text-decoration-none small">{item.val}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-7 animate-target">
            <div className="card border-0 shadow">
              <div className="card-body p-4">
                <h3 className="h4 text-primary mb-4">Send Me a Message</h3>
                <form id="contactForm" noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Name *</label>
                      <input type="text" className="form-control" id="name" name="name" required minLength="2" value={formData.name} onChange={handleChange} />
                      <div className="invalid-feedback">Please enter at least 2 characters.</div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email *</label>
                      <input type="email" className="form-control" id="email" name="email" required value={formData.email} onChange={handleChange} />
                      <div className="invalid-feedback">Please enter a valid email.</div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="subject" className="form-label">Subject *</label>
                      <select className="form-select" id="subject" name="subject" required value={formData.subject} onChange={handleChange}>
                        <option value="">Select a subject</option>
                        <option value="job">Job Opportunity</option>
                        <option value="project">Project Collaboration</option>
                        <option value="general">General Inquiry</option>
                      </select>
                      <div className="invalid-feedback">Please select a subject.</div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea className="form-control" id="message" name="message" rows="5" required minLength="10" value={formData.message} onChange={handleChange}></textarea>
                      <div className="invalid-feedback">Message must be at least 10 characters.</div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
                        {loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Sending...</> : 'Send Message'}
                      </button>
                    </div>
                  </div>
                  {status.msg && (
                    <div className={`mt-3 p-3 rounded text-center d-block bg-${status.type}-subtle text-${status.type} border border-${status.type}-subtle`}>
                      {status.msg}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
