---
description: Onboard a new GBP-verified city to the Palace Porta Potties site
argument-hint: [city name, e.g. "Chicago"]
---

# Add a New City to Palace Porta Potties

Follow Karpathy's 4 principles. This is a P1 task (think before coding).

## Step 1 — Verify prerequisites (ask the user)

Before writing anything, confirm with the user:

1. Is the GBP **verified** for this city? (Not just created — verified.)
2. Is the GBP named **"Palace Porta Potties"**? (Not "Porta Potties" — the entity must match.)
3. Do they have the following for this location:
   - Physical address (street, city, state, ZIP)
   - Phone number (local area code preferred)
   - Google Maps share link → GBP URL
   - Google Maps embed iframe (from "Share" → "Embed a map")
   - Business hours (must match GBP exactly)
   - GBP Place ID and CID (from the listing)

If ANY of the above is missing, **stop and ask** — do not make them up.

## Step 2 — Draft unique local content

Before touching code, draft the unique local content for this city. Reference `scripts/seed.js` for NY and Denver as templates. The content must be 85%+ unique — no copy-paste of another city's structure.

Unique local content must include:

- **Intro paragraph** — EMQ once, mentions specific neighborhoods/markets, anchors to the official address
- **Services block** — can share category language but must reference local use cases
- **Local context block** — permit specifics, common venues, industry clusters, geographic quirks (weather, terrain, seasonality)
- **4–6 local FAQs** — city-specific questions, not generic "how do porta potties work" ones

Propose the draft to the user and get approval before seeding.

## Step 3 — SEO fields

Generate per SEO-U rules (all locked at launch, never changed after indexing):

- `slug`: `portable-toilet-rental-$1` (lowercase, hyphenated city)
- `meta_title`: `Portable Toilet Rental [City]: Official [Phrase] 2026` — ~6 words, complete sentence, includes "Official"
- `meta_description`: NO EMQ. CTA verb + perks + phone. Longer rather than shorter.
- `h1`: `Portable Toilet Rental [City]` — EMQ once

## Step 4 — Add the seed row

Add a new location object to the `locations` array in `scripts/seed.js`.

**Touch ONLY `scripts/seed.js`.** Do not reformat the file. Do not re-sort existing rows. Do not edit other files.

Use the exact same object shape as the existing rows.

## Step 5 — Run the seed

```bash
npm run db:seed
```

Verify it printed `> Seeding [City], [ST]` and `✓ Seeded N locations.`

## Step 6 — Verify locally

```bash
npm run dev
```

Open `http://localhost:3000/portable-toilet-rental-$1/` and verify:

- [ ] H1 renders correctly
- [ ] NAP block shows exact address, phone, hours
- [ ] GBP iframe renders and shows the correct location
- [ ] FAQs render and expand
- [ ] Nav shows the new city
- [ ] Sitemap at `/sitemap.xml` includes the new URL

## Step 7 — Deploy

Only after local verification passes. Use `/deploy` command.

## Step 8 — Post-launch

1. In Google Search Console, submit the new URL for indexing.
2. In the GBP dashboard, set the website URL to `https://palaceportapotties.com/portable-toilet-rental-$1/`.
3. Do NOT point the GBP to the homepage. Each GBP links to its matching city page.

## What NOT to do

- Do not copy another city's local context verbatim
- Do not change the URL format (breaks SEO convention)
- Do not touch unrelated seed rows
- Do not bundle "improvements" to other city pages into this change
- Do not add the city to nav — nav is dynamic, driven by DB
