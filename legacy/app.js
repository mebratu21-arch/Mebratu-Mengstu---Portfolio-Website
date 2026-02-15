/**
 * app.js — Portfolio Interactivity (Phase 2)
 * Dynamic project loading, form validation, modals, animations.
 */

// ─── Project Data (will later come from API / DB) ───
const projectsData = [
  {
    id: 1,
    title: "Mebratu Shop — E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with secure authentication, payment processing via Stripe, and real-time inventory management.",
    longDescription:
      "A complete online store built from scratch featuring user registration & JWT-based login, product catalogue with search/filter, shopping cart with persistent state, Stripe payment integration, and an admin dashboard for managing orders and inventory.",
    image: "shop.png",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe", "JWT"],
    github: "https://github.com/mebratu21-arch/Mebratu-Projects",
    live: null,
    status: "live",
  },
  {
    id: 2,
    title: "Choco Ops Cloud & Artisan ERP",
    description:
      "Cloud-based factory management and ERP system with real-time monitoring, analytics, and multilingual support.",
    longDescription:
      "Enterprise Resource Planning system built for a chocolate factory. Features include production tracking, warehouse management, quality control dashboards, role-based access control (RBAC), and full multilingual support for Amharic, English, and Hebrew (RTL/LTR).",
    image: "new dashboard.png",
    tags: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL"],
    github: "https://github.com/mebratu21-arch/choco-ops-cloud",
    live: null,
    status: "live",
  },
  {
    id: 3,
    title: "Future Enterprise Project",
    description:
      "An upcoming enterprise-level dashboard with advanced analytics, real-time data visualization, and AI-driven insights.",
    longDescription:
      "Next-generation analytics platform featuring interactive charts powered by ApexCharts, server-side rendering with Next.js, GraphQL API layer, and AI-driven anomaly detection for business metrics.",
    image: "new dashboard.png",
    tags: ["Next.js", "Tailwind", "GraphQL"],
    github: null,
    live: null,
    status: "coming-soon",
  },
  {
    id: 4,
    title: "Next-Gen Mobile Commerce",
    description:
      "A futuristic mobile-first shopping experience with AR product previews and personalized AI stylists.",
    longDescription:
      "Cross-platform mobile app delivering an immersive shopping experience. Uses Three.js for 3D product views, React Native for native performance, Redis for session caching, and Prisma for a type-safe database layer.",
    image: "shop.png",
    tags: ["React Native", "Three.js", "Prisma"],
    github: null,
    live: null,
    status: "coming-soon",
  },
];

// ─── DOM Ready ───
document.addEventListener("DOMContentLoaded", () => {
  loadAndRenderProjects();
  initFormValidation();
  initScrollToTop();
  initThemeToggle();
  initSkillFilter();
  initScrollAnimations();
  initTypingEffect();
  initNavbarScroll();
});

// ═══════════════════════════════════════
// 1. DYNAMIC PROJECT RENDERING (API + fallback)
// ═══════════════════════════════════════

// Runtime project list (populated from API or fallback)
let activeProjects = [...projectsData];

async function loadAndRenderProjects() {
  try {
    const res = await fetch("/api/projects");
    if (res.ok) {
      const data = await res.json();
      // Normalise DB rows → match the shape the renderer expects
      activeProjects = data.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        longDescription: p.long_description || p.longDescription || "",
        image: p.image,
        tags: typeof p.tags === "string" ? JSON.parse(p.tags) : p.tags || [],
        github: p.github,
        live: p.live,
        status: p.status || "live",
      }));
    }
  } catch {
    // API not available — use hardcoded fallback
    activeProjects = [...projectsData];
  }
  renderProjects();
}

function renderProjects() {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  container.innerHTML = "";

  activeProjects.forEach((project) => {
    const col = document.createElement("div");
    col.className = "col-md-6";

    const isComingSoon = project.status === "coming-soon";
    const imgOpacity = isComingSoon ? 'style="opacity:0.7"' : "";
    const tags = Array.isArray(project.tags) ? project.tags : [];

    col.innerHTML = `
      <div class="card h-100 card-hover" data-project-id="${project.id}">
        <div class="project-image-container">
          <img src="${project.image}" alt="${project.title}" loading="lazy" ${imgOpacity}>
          ${isComingSoon ? '<div class="position-absolute top-50 start-50 translate-middle badge bg-dark opacity-75 fs-6">COMING SOON</div>' : ""}
        </div>
        <div class="card-body d-flex flex-column">
          <h3 class="h5 card-title">${project.title}</h3>
          <p class="card-text text-secondary flex-grow-1">${project.description}</p>
          <div class="mb-3">
            ${tags.map((t) => `<span class="badge bg-light text-primary border border-primary-subtle me-1 mb-1">${t}</span>`).join("")}
          </div>
          <div class="d-flex gap-2 mt-auto">
            ${
              project.github
                ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm"><i class="fab fa-github me-1"></i> Code</a>`
                : ""
            }
            ${
              project.live
                ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt me-1"></i> Live</a>`
                : ""
            }
            ${
              isComingSoon
                ? `<button class="btn btn-outline-secondary btn-sm" disabled><i class="fas fa-hammer me-1"></i> In Progress</button>`
                : ""
            }
            <button class="btn btn-sm btn-outline-dark ms-auto" onclick="showProjectModal(${project.id})" title="Details">
              <i class="fas fa-info-circle me-1"></i> Details
            </button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

// ═══════════════════════════════════════
// 2. PROJECT DETAIL MODAL
// ═══════════════════════════════════════
function showProjectModal(id) {
  const project = activeProjects.find((p) => p.id === id);
  if (!project) return;

  // Populate modal content
  document.getElementById("modalProjectTitle").textContent = project.title;
  document.getElementById("modalProjectImage").src = project.image;
  document.getElementById("modalProjectImage").alt = project.title;
  document.getElementById("modalProjectDescription").textContent =
    project.longDescription;

  const tagsContainer = document.getElementById("modalProjectTags");
  tagsContainer.innerHTML = project.tags
    .map(
      (t) =>
        `<span class="badge bg-primary me-1 mb-1">${t}</span>`
    )
    .join("");

  const linksContainer = document.getElementById("modalProjectLinks");
  linksContainer.innerHTML = "";
  if (project.github) {
    linksContainer.innerHTML += `<a href="${project.github}" target="_blank" class="btn btn-outline-dark"><i class="fab fa-github me-1"></i> View Code</a>`;
  }
  if (project.live) {
    linksContainer.innerHTML += `<a href="${project.live}" target="_blank" class="btn btn-primary ms-2"><i class="fas fa-external-link-alt me-1"></i> Live Demo</a>`;
  }

  // Show modal via Bootstrap API
  const modal = new bootstrap.Modal(document.getElementById("projectModal"));
  modal.show();
}

// ═══════════════════════════════════════
// 3. FORM VALIDATION
// ═══════════════════════════════════════
function initFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Clear previous custom messages
      form.querySelectorAll(".invalid-feedback").forEach((el) => (el.textContent = ""));

      let isValid = true;

      // Name check
      const nameInput = form.querySelector("#name");
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setInvalid(nameInput, "Please enter at least 2 characters.");
        isValid = false;
      } else {
        setValid(nameInput);
      }

      // Email check
      const emailInput = form.querySelector("#email");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        setInvalid(emailInput, "Please enter a valid email address.");
        isValid = false;
      } else {
        setValid(emailInput);
      }

      // Subject check
      const subjectInput = form.querySelector("#subject");
      if (!subjectInput.value) {
        setInvalid(subjectInput, "Please select a subject.");
        isValid = false;
      } else {
        setValid(subjectInput);
      }

      // Message check
      const messageInput = form.querySelector("#message");
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        setInvalid(messageInput, "Message must be at least 10 characters.");
        isValid = false;
      } else {
        setValid(messageInput);
      }

      form.classList.add("was-validated");

      if (isValid) {
        handleFormSubmit(form);
      }
    },
    false
  );

  // Live validation on input
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      if (form.classList.contains("was-validated")) {
        // Re-validate just this field
        if (field.checkValidity()) {
          setValid(field);
        }
      }
    });
  });
}

function setInvalid(el, message) {
  el.classList.add("is-invalid");
  el.classList.remove("is-valid");
  let feedback = el.parentElement.querySelector(".invalid-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    el.parentElement.appendChild(feedback);
  }
  feedback.textContent = message;
}

function setValid(el) {
  el.classList.remove("is-invalid");
  el.classList.add("is-valid");
}

async function handleFormSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const msg = document.getElementById("formMessage");

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending...';

  try {
    // Try API first
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      msg.textContent = "Message sent successfully! I'll get back to you soon.";
      msg.className =
        "mt-3 p-3 rounded text-center d-block bg-success-subtle text-success border border-success-subtle";
    } else {
      throw new Error("API error");
    }
  } catch {
    // Fallback to mailto
    const mailtoLink = `mailto:mebratu21arch@gmail.com?subject=${encodeURIComponent(
      (data.subject || "General") + " — " + data.name
    )}&body=${encodeURIComponent(
      "Name: " + data.name + "\nEmail: " + data.email +
      "\nPhone: " + (data.phone || "N/A") + "\n\nMessage:\n" + data.message
    )}`;
    window.location.href = mailtoLink;

    msg.textContent =
      "Opening your email client… If nothing happens, email me directly at mebratu21arch@gmail.com";
    msg.className =
      "mt-3 p-3 rounded text-center d-block bg-success-subtle text-success border border-success-subtle";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    form.reset();
    form.classList.remove("was-validated");
    form
      .querySelectorAll(".is-valid, .is-invalid")
      .forEach((el) => el.classList.remove("is-valid", "is-invalid"));

    setTimeout(() => {
      msg.className = "mt-3 p-3 rounded text-center d-none";
    }, 6000);
  }
}

// ═══════════════════════════════════════
// 4. SCROLL-TO-TOP BUTTON
// ═══════════════════════════════════════
function initScrollToTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 300);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ═══════════════════════════════════════
// 5. THEME TOGGLE
// ═══════════════════════════════════════
function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const html = document.documentElement;
  const saved = localStorage.getItem("theme") || "light";
  html.setAttribute("data-theme", saved);

  toggle.addEventListener("click", () => {
    const next =
      html.getAttribute("data-theme") === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// ═══════════════════════════════════════
// 6. SKILL FILTER
// ═══════════════════════════════════════
function initSkillFilter() {
  const btns = document.querySelectorAll(".filter-btn");
  const categories = document.querySelectorAll(".skill-category");
  if (!btns.length) return;

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      categories.forEach((cat) => {
        const match =
          filter === "all" || cat.dataset.category === filter;
        cat.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        if (match) {
          cat.classList.remove("d-none");
          requestAnimationFrame(() => {
            cat.style.opacity = "1";
            cat.style.transform = "translateY(0)";
          });
        } else {
          cat.style.opacity = "0";
          cat.style.transform = "translateY(10px)";
          setTimeout(() => cat.classList.add("d-none"), 300);
        }
      });
    });
  });
}

// ═══════════════════════════════════════
// 7. SCROLL ANIMATIONS (Intersection Observer)
// ═══════════════════════════════════════
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document
    .querySelectorAll(
      ".card-hover, .stat-card, .timeline .card, .section-title"
    )
    .forEach((el) => {
      el.classList.add("animate-target");
      observer.observe(el);
    });
}

// ═══════════════════════════════════════
// 8. TYPING EFFECT
// ═══════════════════════════════════════
function initTypingEffect() {
  const el = document.getElementById("typingText");
  if (!el) return;

  const phrases = [
    "Full-Stack Developer",
    "React Specialist",
    "Node.js Engineer",
    "PostgreSQL Expert",
    "Available in Israel 2026",
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 500);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }

  type();
}

// ═══════════════════════════════════════
// 9. NAVBAR SCROLL EFFECT
// ═══════════════════════════════════════
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}
