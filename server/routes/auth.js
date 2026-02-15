const router = require("express").Router();
const bcrypt = require("bcryptjs");

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH; 
// You can generate a hash using: await bcrypt.hash('your_password', 10)

router.post("/login", async (req, res) => {
  const { password } = req.body;
  if (!ADMIN_PASSWORD_HASH) {
    return res.status(500).json({ error: "Server auth not configured" });
  }

  const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (match) {
    req.session.authenticated = true;
    req.session.user = "admin";
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

router.get("/me", (req, res) => {
  if (req.session.authenticated) {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;
