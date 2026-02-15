/**
 * seed.js — Create tables and seed initial project data
 * Run: node seed.js
 */
require("dotenv").config();
const db = require("./db");

async function seed() {
  console.log("🌱 Seeding database...");

  // Create tables
  await db.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id          SERIAL PRIMARY KEY,
      title       VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT,
      image       VARCHAR(255),
      tags        JSONB DEFAULT '[]',
      github      VARCHAR(512),
      live        VARCHAR(512),
      status      VARCHAR(50) DEFAULT 'live',
      sort_order  INTEGER DEFAULT 0,
      likes       INTEGER DEFAULT 0,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(255) NOT NULL,
      email      VARCHAR(255) NOT NULL,
      phone      VARCHAR(50),
      subject    VARCHAR(255) NOT NULL,
      message    TEXT NOT NULL,
      is_read    BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  console.log("✅ Tables created.");

  // Check if projects already seeded
  const { rows } = await db.query("SELECT COUNT(*) AS cnt FROM projects");
  if (parseInt(rows[0].cnt) > 0) {
    console.log("⏭  Projects already seeded, skipping.");
  } else {
    const projects = [
      {
        title: "Mebratu Shop — E-Commerce Platform",
        description: "Full-stack e-commerce platform with secure authentication, payment processing via Stripe, and real-time inventory management.",
        long_description: "A complete online store built from scratch featuring user registration & JWT-based login, product catalogue with search/filter, shopping cart with persistent state, Stripe payment integration, and an admin dashboard for managing orders and inventory.",
        image: "shop.png",
        tags: ["React", "Node.js", "PostgreSQL", "Stripe", "JWT"],
        github: "https://github.com/mebratu21-arch/Mebratu-Projects",
        live: null,
        status: "live",
        sort_order: 1,
      },
      {
        title: "Choco Ops Cloud & Artisan ERP",
        description: "Cloud-based factory management and ERP system with real-time monitoring, analytics, and multilingual support.",
        long_description: "Enterprise Resource Planning system built for a chocolate factory. Features include production tracking, warehouse management, quality control dashboards, role-based access control (RBAC), and full multilingual support for Amharic, English, and Hebrew (RTL/LTR).",
        image: "new dashboard.png",
        tags: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL"],
        github: "https://github.com/mebratu21-arch/choco-ops-cloud",
        live: null,
        status: "live",
        sort_order: 2,
      },
      {
        title: "Future Enterprise Project",
        description: "An upcoming enterprise-level dashboard with advanced analytics, real-time data visualization, and AI-driven insights.",
        long_description: "Next-generation analytics platform featuring interactive charts, server-side rendering with Next.js, GraphQL API layer, and AI-driven anomaly detection for business metrics.",
        image: "new dashboard.png",
        tags: ["Next.js", "Tailwind", "GraphQL"],
        github: null,
        live: null,
        status: "coming-soon",
        sort_order: 3,
      },
      {
        title: "Next-Gen Mobile Commerce",
        description: "A futuristic mobile-first shopping experience with AR product previews and personalized AI stylists.",
        long_description: "Cross-platform mobile app with immersive shopping. Uses Three.js for 3D product views, React Native for native performance, and Prisma for a type-safe database layer.",
        image: "shop.png",
        tags: ["React Native", "Three.js", "Prisma"],
        github: null,
        live: null,
        status: "coming-soon",
        sort_order: 4,
      },
    ];

    for (const p of projects) {
      await db.query(
        `INSERT INTO projects (title, description, long_description, image, tags, github, live, status, sort_order, likes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [p.title, p.description, p.long_description, p.image, JSON.stringify(p.tags), p.github, p.live, p.status, p.sort_order, 0]
      );
    }
    console.log("✅ Seeded 4 projects.");
  }

  console.log("🎉 Done!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
