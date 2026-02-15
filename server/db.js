/**
 * db.js — PostgreSQL connection pool
 */
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Simple query helper
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
