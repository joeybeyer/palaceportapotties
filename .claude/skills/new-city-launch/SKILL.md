---
name: new-city-launch
description: Full end-to-end workflow for launching a new Palace Porta Potties city — from GBP verification check through post-launch indexing submission. Use when the user says "launch [city]", "add [city] to Palace", "onboard a new location", or similar multi-step city launch requests. This skill orchestrates GBP alignment, unique content drafting, seeding, deployment, and GSC submission.
---

# New City Launch — Palace Porta Potties

This skill is the definitive workflow for bringing a new GBP-verified market online.

## Principle alignment

This skill operates under Karpathy's 4 principles (see `CLAUDE.md`):
- **P1** — ask before coding; verify prerequisites first
- **P2** — minimum viable launch; don't build extra pages yet
- **P3** — surgical changes; only touch files this skill needs to touch
- **P4** — definition of done = city page live, indexed, linked from GBP

## Definition of Done

- [ ] GBP verified and renamed to "Palace Porta Potties"
- [ ] Row added to Turso `locations` table
- [ ] Page renders at `/portable-toilet-rental-[city]/` in production
- [ ] Nav shows the new city automatically (dynamic from DB)
- [ ] Sitemap includes the new URL
- [ ] GBP website field points to the city page (not homepage)
- [ ] URL submitted to Google Search Console
- [ ] No unrelated changes in the deploy diff

## Workflow

### Phase 1 — Intake (never skip)

Ask the user for:

1. City name, state
2. Full street address, ZIP
3. Phone number (local area code strongly preferred)
4. GBP name — confirm it reads "Palace Porta Potties" exactly
5. Google Maps share URL for the GBP
6. Embed iframe HTML (from Maps → Share → Embed)
7. GBP Place ID and CID
8. Business hours (day-by-day)
9. Lat/lng coordinates

If the user is missing any of 1–9, stop. Do not fabricate values. Ask for them.

If GBP name is NOT "Palace Porta Potties," stop. Require rename first.

### Phase 2 — Content research (user-approved draft)

Research this city for unique content that will pass the 85% uniqueness bar:

- **Permits & regulations** — what's the local permit authority? DOT, city, health department? Sidewalk rules?
- **Industry context** — construction corridors, event districts, wedding venue hotspots
- **Venues** — specific named locations where porta potties are commonly deployed (parks, convention centers, wedding spots)
- **Seasonality & weather** — conditions that affect unit operation (freeze, heat, storms)
- **Common use cases** — 5 specific local use cases

Draft and show the user:
- Intro paragraph (EMQ once)
- Local context block
- 4–6 FAQs with local specifics

Get explicit approval before writing code.

### Phase 3 — Seed the row

**Touch only `scripts/seed.js`.** No other files.

Add a new object to the `locations` array, matching the exact shape of NY and Denver. All fields mandatory.

Generate:
- `slug`: lowercase, hyphenated — `portable-toilet-rental-[city]`
- `meta_title`: `Portable Toilet Rental [City]: Official [Phrase] 2026` — verify ~6 words, includes "Official," includes "2026"
- `meta_description`: NO EMQ. Verb + perks + phone. 150+ chars.
- `h1`: `Portable Toilet Rental [City]`

Apply content from Phase 2.

Run:
```bash
npm run db:seed
```

Verify output shows `> Seeding [City], [ST]`.

### Phase 4 — Local verification

```bash
npm run dev
```

Open the city URL and run the audit. Every item below must pass:

- H1 renders as expected
- NAP exact match to GBP
- Iframe shows the correct map
- Hours render all 7 days
- 4+ FAQs expand properly
- Nav now shows the new city
- `/sitemap.xml` includes the URL
- Schema validates (paste into Rich Results Test)

If any item fails, stop. Do not deploy a broken page.

### Phase 5 — Deploy

Use `/deploy` command. Do not bundle other changes into this deploy.

### Phase 6 — Post-launch

1. In GBP dashboard, set website URL to `https://palaceportapotties.com/portable-toilet-rental-[city]/`
2. In Google Search Console:
   - Submit the URL via URL Inspection → Request Indexing
   - Verify sitemap has been resubmitted
3. Add a reminder to check indexation status in 14–21 days

## What this skill does NOT do

- Does not create `/weddings/`, `/construction/`, `/events/` subpages for this city. Those are a separate phase.
- Does not add the city to the homepage hero. Homepage stays broad/national.
- Does not modify other city pages' content.
- Does not rename or restructure existing URLs.

## Failure modes

| If... | Do... |
|---|---|
| GBP isn't verified | Stop. Verification is a prerequisite, not a step. |
| GBP name is still "Porta Potties" | Stop. Require rename first. |
| User wants to "reuse" Denver's content | Refuse. 85% uniqueness rule. Draft fresh. |
| User wants to skip local content research | Refuse. Soft-404 risk is real per SEO-U. |
| Build fails mid-deploy | Stop. Rollback. Fix on branch, not in prod. |
