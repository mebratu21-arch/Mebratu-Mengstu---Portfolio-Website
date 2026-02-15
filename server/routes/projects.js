const router = require("express").Router();
const db = require("../db");
const { isAuthenticated } = require("../middleware/auth");

// GET /api/projects — list all
router.get("/", async (_req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM projects ORDER BY sort_order ASC, id ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /api/projects error:", err.message);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// GET /api/projects/:id — get one
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query("SELECT * FROM projects WHERE id = $1", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(`GET /api/projects/${id} error:`, err.message);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// POST /api/projects — create new
router.post("/", isAuthenticated, async (req, res) => {
  const { title, description, long_description, image, tags, github, live, status, sort_order } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO projects (title, description, long_description, image, tags, github, live, status, sort_order, likes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 0)
       RETURNING *`,
      [title, description, long_description, image, JSON.stringify(tags || []), github, live, status || 'live', sort_order || 0]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("POST /api/projects error:", err.message);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// PUT /api/projects/:id — update
router.put("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { title, description, long_description, image, tags, github, live, status, sort_order } = req.body;
  try {
    const { rows } = await db.query(
      `UPDATE projects
       SET title = $1, description = $2, long_description = $3, image = $4, tags = $5, github = $6, live = $7, status = $8, sort_order = $9, updated_at = NOW()
       WHERE id = $10
       RETURNING *`,
      [title, description, long_description, image, JSON.stringify(tags || []), github, live, status, sort_order, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(`PUT /api/projects/${id} error:`, err.message);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// DELETE /api/projects/:id — delete
router.delete("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await db.query("DELETE FROM projects WHERE id = $1", [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(`DELETE /api/projects/${id} error:`, err.message);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// POST /api/projects/:id/like — increment like count (PUBLIC)
router.post("/:id/like", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      "UPDATE projects SET likes = likes + 1 WHERE id = $1 RETURNING likes",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ likes: rows[0].likes });
  } catch (err) {
    console.error(`POST /api/projects/${id}/like error:`, err.message);
    res.status(500).json({ error: "Failed to like project" });
  }
});

module.exports = router;
