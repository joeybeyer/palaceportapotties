# Palace Porta Potties

Multi-location portable toilet rental site. Next.js 14 (App Router) + Turso, deployed to **Cloudflare Pages** via `@cloudflare/next-on-pages`.

## Working with Claude Code on this repo

Read `CLAUDE.md` first. It encodes the 4 Karpathy principles and every project-specific rule.

Custom commands available:
- `/add-city` — Onboard a new GBP-verified city
- `/seo-check` — Audit a page against SEO University rules
- `/deploy` — Pre-flight + deploy to production

Custom skill:
- `new-city-launch` — Full end-to-end city onboarding workflow (ask Claude to "launch [city]")

Recommended plugins (install once, use everywhere):
- `cc-statusline` — `npx cc-statusline@latest`
- Superpowers — `/plugin` → add `superpowers`
- Context7 — `/plugin` → add `context7`
- Sequential Thinking MCP — ask Claude to install it

Golden rule: **watch the context %**. Restart fresh before 50%. Never `/compact`.

## SEO Architecture (Per SEO University Rules)

- Flat EMQ URLs: `/portable-toilet-rental-[city]/` with trailing slash
- Title tags: EMQ + complete ~6-word sentence + year, includes "Official"
- Meta descriptions: no EMQ, CTA verb + perks format, includes phone
- H1 contains EMQ once at top of page
- **Flat linking via mega-menu** — every city link is in the DOM on every page
- Unique local content per city (85%+ unique) — permits, geo, venues, FAQs
- **Organization schema on homepage only**
- **`HomeAndConstructionBusiness` schema + FAQPage schema on each city page**
- NAP matches GBP exactly with embedded GBP map iframe

---

## Setup

### 1. Clone + Install
```bash
git clone https://github.com/joeybeyer/palaceportapotties.git
cd palaceportapotties
npm install
```

### 2. Create Turso DB
```bash
turso db create palaceportapotties
turso db show palaceportapotties --url
turso db tokens create palaceportapotties
```

Create `.env.local`:
```
TURSO_DATABASE_URL=libsql://palaceportapotties-xxx.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOi...
```

### 3. Apply Schema + Seed
```bash
npm run db:schema
npm run db:seed
```

### 4. Local Dev
```bash
npm run dev          # Next.js dev server
npm run preview      # Cloudflare Pages preview with edge runtime
```

---

## Deploy to Cloudflare Pages

### Option A — Dashboard (recommended for first deploy)

1. Push code to GitHub (`joeybeyer/palaceportapotties`)
2. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select the `palaceportapotties` repo
4. Build settings:
   - **Framework preset:** `Next.js`
   - **Build command:** `npx @cloudflare/next-on-pages@1`
   - **Build output directory:** `.vercel/output/static`
5. Environment variables (both Production + Preview):
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `NODE_VERSION` = `20`
6. **Settings → Functions → Compatibility flags**: add `nodejs_compat` for both Production and Preview
7. Save and deploy

### Option B — CLI
```bash
npm run deploy
```

### Add Custom Domain
Pages project → **Custom domains** → add `palaceportapotties.com` and `www.palaceportapotties.com`. Cloudflare auto-creates the CNAME records.

---

## Adding a New City

1. Verify GBP at the new address (name: **Palace Porta Potties**)
2. Point the GBP's website link to `palaceportapotties.com/portable-toilet-rental-[city]/`
3. Grab the Google Maps embed iframe from the listing
4. Add a row to the `locations` array in `scripts/seed.js` with **unique** local content (permits, venues, geography)
5. Run `npm run db:seed`
6. Push or trigger redeploy — nav, footer, sitemap, and schema update automatically

---

## Critical SEO Rules (Do Not Break)

- **Never change a URL after it's indexed.** Per SEO-U, changing post-index attracts anti-SEO algo attention.
- **Do not put the EMQ in meta descriptions.** Use synonyms + CTA format.
- **Do not duplicate content between cities.** Each city needs unique local info or it gets soft-404'd.
- **Brand name must match GBP exactly** — all GBPs should be "Palace Porta Potties" (not "Porta Potties").
- **Keep H1 EMQ count at 1.** Do not repeat elsewhere on the page.
- **Phased rollout per city** — start within ~5-mile radius of each GBP before trying to rank the whole metro.

---

## File Structure

```
palaceportapotties/
├── app/
│   ├── [slug]/page.jsx         Dynamic city page (edge runtime)
│   ├── page.jsx                Homepage (edge runtime, Organization schema)
│   ├── layout.jsx              Mega-menu nav + state-grouped footer
│   ├── sitemap.js              Auto-generated from DB
│   ├── robots.js
│   └── globals.css
├── components/
│   └── Nav.jsx                 Mega-menu client component (state-grouped)
├── lib/db.js                   Edge-compatible Turso client
├── scripts/
│   ├── schema.sql              Turso schema
│   ├── schema.js               Apply schema runner
│   └── seed.js                 Seed NY + Denver (template for new cities)
├── next.config.mjs             trailingSlash: true
├── wrangler.toml               Cloudflare Pages config
└── package.json
```

---

## Notes

- Pages use `runtime = 'edge'` so Turso queries run on Cloudflare's edge network
- Mega-menu nav renders ALL city links in server HTML (crawlable) and toggles visibility via CSS — grows cleanly from 2 → 100+ cities
- `HomeAndConstructionBusiness` schema chosen as the most semantically accurate `LocalBusiness` sub-type for portable toilet rental
