// Edge-compatible Turso client (uses fetch under the hood, works on Cloudflare Workers/Pages)
import { createClient } from '@libsql/client/web';

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function getAllLocations() {
  const { rows } = await db.execute('SELECT * FROM locations ORDER BY state ASC, city ASC');
  return rows;
}

export async function getLocationBySlug(slug) {
  const { rows } = await db.execute({
    sql: 'SELECT * FROM locations WHERE slug = ? LIMIT 1',
    args: [slug],
  });
  return rows[0] || null;
}

export async function getAllSlugs() {
  const { rows } = await db.execute('SELECT slug FROM locations');
  return rows.map((r) => r.slug);
}

// Group locations by state for mega-menu rendering
export async function getLocationsGroupedByState() {
  const locations = await getAllLocations();
  const groups = {};
  for (const loc of locations) {
    const key = loc.state;
    if (!groups[key]) {
      groups[key] = { state: loc.state, state_code: loc.state_code, cities: [] };
    }
    groups[key].cities.push(loc);
  }
  return Object.values(groups).sort((a, b) => a.state.localeCompare(b.state));
}
