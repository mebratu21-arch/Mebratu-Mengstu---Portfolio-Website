const router = require("express").Router();
const db = require("../db");
const { isAuthenticated } = require("../middleware/auth");

// POST /api/messages — submit new message (PUBLIC)
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await db.query(
      "INSERT INTO messages (name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5)",
      [name, email, phone, subject, message]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("POST /api/messages error:", err.message);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// GET /api/messages — list messages (ADMIN ONLY)
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("GET /api/messages error:", err.message);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// DELETE /api/messages/:id — delete message (ADMIN ONLY)
router.delete("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM messages WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(`DELETE /api/messages/${id} error:`, err.message);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

module.exports = router;
