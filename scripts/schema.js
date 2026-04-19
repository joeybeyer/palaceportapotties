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

// Strip -- line comments first, then split on semicolons.
// The old version checked startsWith('--'), which nuked any statement that
// had a leading comment block and silently caused CREATE TABLE to be skipped.
const statements = sql
  .replace(/--[^\n]*/g, '')
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

for (const stmt of statements) {
  console.log('> Running:', stmt.substring(0, 60).replace(/\s+/g, ' '), '...');
  await db.execute(stmt);
}

console.log(`✓ Schema applied (${statements.length} statements).`);
