// Run with: node scripts/schema.js
import 'dotenv/config';
import { createClient } from '@libsql/client';
import fs from 'node:fs';
import path from 'node:path';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const sql = fs.readFileSync(path.join(process.cwd(), 'scripts/schema.sql'), 'utf8');

// Split on semicolons so we can execute each statement
const statements = sql
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && !s.startsWith('--'));

for (const stmt of statements) {
  console.log('> Running:', stmt.substring(0, 60), '...');
  await db.execute(stmt);
}

console.log('✓ Schema applied.');
