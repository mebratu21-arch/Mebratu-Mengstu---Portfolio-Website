require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  try {
    console.log('🔄 Adding "likes" column to projects table...');
    await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;');
    console.log('✅ Migration complete: "likes" column added.');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    await pool.end();
  }
}

migrate();
