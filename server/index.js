/**
 * index.js — Express entry point
 * Serves the static frontend and mounts API routes.
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./db"); // uses the pool from db.js

const projectsRouter = require("./routes/projects");
const messagesRouter = require("./routes/messages");
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───
app.set("trust proxy", 1); // Trust first proxy (Render/Vercel) for secure cookies

app.use(helmet({ contentSecurityPolicy: false })); // CSP off for CDN links
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", // Allow Vercel frontend
  credentials: true, // Allow cookies
}));
app.use(express.json());

// Session setup
app.use(session({
  store: new pgSession({
    pool: require("./db"),
    tableName: 'session'
  }),
  secret: process.env.SESSION_SECRET || 'dev_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV === "production", // Secure in prod
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" // Cross-site in prod
  }
}));

// ─── API Routes ───
app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/messages", messagesRouter);



// ─── Serve React Frontend (Production Build) ───
app.use(express.static(path.join(__dirname, "../client/dist")));

// ─── SPA Fallback (for client-side routing) ───
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ─── Start ───
app.listen(PORT, () => {
  console.log(`✅  Portfolio server running at http://localhost:${PORT}`);
});
