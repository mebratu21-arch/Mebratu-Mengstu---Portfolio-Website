require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  try {
    console.log('🔄 Creating "session" table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      )
      WITH (OIDS=FALSE);

      ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
    `);
    console.log('✅ Migration complete: "session" table created.');
  } catch (err) {
    // Ignore error if table exists (constraints/indices might throw if they exist)
    if (err.message.includes("already exists")) {
        console.log('👌 Table/Constraint already exists.');
    } else {
        console.error('❌ Migration failed:', err.message);
    }
  } finally {
    await pool.end();
  }
}

migrate();
