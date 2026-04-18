# Palace Porta Potties — Claude Code Project Guide

This file encodes how Claude Code should operate in this repo. Read it fully before any non-trivial task.

---

## PART 1 — The Four Principles (Karpathy)

These are non-negotiable. They apply to every task in this repo.

### P1 — Think Before Coding

Before writing or editing any code:

1. **Restate** what you believe the user wants in your own words.
2. **List assumptions** you are making.
3. **Ask 1–3 focused clarifying questions** if intent is ambiguous.
4. **Explore first** — list the files you plan to touch before touching them.
5. **Surface inconsistencies** between the request and existing code.

Never jump straight to editing on the first turn of a non-trivial task. Never invent requirements the user didn't state.

### P2 — Simplicity First

Write the **minimum** working change. Report line count added.

- No speculative abstractions
- No "while I'm in here" additions
- No defensive scaffolding for problems the user didn't mention
- No new managers, services, or helpers unless reused ≥2x
- No config toggles "for future flexibility"
- No try/except blocks that only hide bugs
- Inline simple logic instead of factoring it out

If the same task can be 20 lines or 50 lines, write 20.

### P3 — Surgical Changes

Touch **only** the lines the task requires.

- No reformatting unrelated files
- No renaming variables the user didn't ask to rename
- No reordering imports or declarations
- No deleting comments you don't recognize
- No bundling "improvements" into the same change
- If a refactor is warranted, **propose it first** — don't sneak it in

The diff must be reviewable. If the user reads the diff and sees changes they didn't ask for, the task failed.

### P4 — Goal-Driven Execution

Every meaningful task starts with a **definition of done** — what the user should be able to do, see, or measure when the change is complete.

- Plan backward from that criterion.
- Loop until satisfied, not until "done enough."
- Prefer declarative framing over imperative step-by-step.
- Verify in the running app, not in your own text output.

---

## PART 2 — Project Context

### What this is

Palace Porta Potties is a multi-location portable toilet rental site. Next.js 14 App Router, Turso (libSQL) for city data, deployed on Vercel (or Cloudflare Pages). This site is being built to scale nationwide across GBP-verified locations.

### Brand

- Brand name is **Palace Porta Potties** — always. Never "Porta Potties," never "palace porta potties lowercase."
- Voice: clean, direct, professional. Premium but not snobby. No toilet humor on core pages.
- Trademarked offers — use with ™ when referenced: Palace Standard™, Royal Response Quote™, Palace Placement Promise™, Event-Ready Setup™, Jobsite Reliability Plan™, Palace Clean Check™.
- Tagline: "Portable Restrooms. Royal Treatment."

### Entity consistency

Every surface must say **Palace Porta Potties** consistently:
- Every GBP listing
- Every on-page NAP block
- Every schema `name` field
- Every mention in copy

---

## PART 3 — SEO Rules (Hard Constraints)

These come from SEO University and are field-tested. **Do not deviate without explicit approval.** These take precedence over general "best practices" you might know.

### URLs

- Flat EMQ slugs only: `/portable-toilet-rental-[city]/`
- Trailing slash enforced via `next.config.mjs`
- **Never change a URL after it is indexed** — puts the site under Google's anti-SEO microscope.
- No `/locations/`, `/services/`, `/cities/`, or other subfolders.

### Title tags

Format: `EMQ: Complete sentence ~6 words. 2026`

- Include the word "Official"
- Include the year
- Do not include brand name
- Do not use abbreviations
- Use stop words ("in," "and," "the")
- Avoid repeating words between URL and title

### Meta descriptions

- **No EMQ** — use synonyms, entities, PMQs
- CTA format: verb + perks
- Include phone number
- Tend longer, not shorter
- Full, natural sentences

### H1

- EMQ once, at top of page
- Only use EMQ in H1 if 51%+ of ranking competitors do (default yes for this vertical)
- Never repeat the EMQ in H2/H3

### Content

- Each city page must be 85%+ unique vs other city pages — otherwise gets soft-404'd
- Unique local info required: permits, venues, geography, industry clusters
- First paragraph contains the EMQ once
- Do not stuff EMQ in CSS classes, IDs, alt text, or HTML attributes
- Keep EMQ count per page at 1–2 max unless competitor analysis justifies more

### Navigation

- Flat linking — every city page linked from every page via top nav
- Real `<a>` tags in the DOM, not JS-rendered
- When cities exceed ~8, migrate to a state-grouped mega-menu with DOM-rendered links

### Schema

- Homepage: `Organization` schema only
- City pages: `LocalBusiness` + `FAQPage` schema, with GBP place data
- Do not overuse schema — no product schema, no review schema on pages without real reviews

### NAP

- Must match the GBP **exactly** — same business name, same address format, same phone format
- Each city page embeds the GBP iframe from Google Maps

---

## PART 4 — Infrastructure Rules

### Database

- Turso/libSQL, one `locations` table, one row per physical GBP location
- Never hardcode city data in components — always fetch from DB
- Adding a city = adding a row to `scripts/seed.js` + running `npm run db:seed`

### Deployment

- **Primary target: Vercel** (matches other Joey portfolio sites, native Turso integration)
- **Alternative: Cloudflare Pages** — fine from an SEO standpoint per SEO-U validation. Use if Vercel costs become prohibitive.
- Env vars required: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`
- **Never upload the `.next` folder to a server** — upload source, build on server (Joey's operator rule)

### Joey's global infra rules (inherited)

- **Never modify DirectAdmin global nginx templates.** Per-domain configs in `/etc/nginx/conf.d/` only. Past mistakes broke 85+ sites.
- Nginx (80/443) proxies to httpd (8080) on the VPS.
- For any VPS work: touch per-domain configs, not globals.

---

## PART 5 — The Daily SOP

Follow this workflow for every meaningful task:

### Step 1 — Brainstorm

Before any non-trivial work:

1. User states the goal (declarative: "user should be able to X").
2. You restate, list assumptions, ask clarifying questions.
3. You propose 2–3 approaches with tradeoffs.
4. User approves an approach.

If Superpowers plugin is installed: `/superpowers:brainstorm`.

### Step 2 — Plan

1. Turn the approved approach into a line-by-line implementation plan.
2. List every file you will touch.
3. Flag any files you will NOT touch but that are tangentially related.
4. User reviews and catches bad decisions here — not after code is written.

If Superpowers plugin is installed: `/superpowers:write-plan`.

### Step 3 — Execute

1. Write the minimum code to satisfy the plan.
2. Run the code. Verify the definition of done is actually met.
3. Report: files touched, lines added/removed, what was verified.

If Superpowers plugin is installed: `/superpowers:execute-plan`.

### Context discipline

- Watch the cc-statusline context %. Restart session before ~50%, not after.
- **Never use `/compact`.** Start a fresh session with the plan doc instead.
- If you find yourself in a debug loop on your own side effects: stop, revert, restart.

---

## PART 6 — Checklists

### Before editing

- [ ] Did I restate intent and list assumptions?
- [ ] Did I answer my own clarifying questions (or did the user)?
- [ ] Do I know the definition of done?
- [ ] Have I listed the files I will touch?

### During editing

- [ ] Am I writing the minimum diff?
- [ ] Am I touching only the lines the task requires?
- [ ] Am I preserving formatting, imports, and comments in unrelated areas?

### After editing

- [ ] Did I verify the change in the running app, not just in my output text?
- [ ] Can I report exact files touched and line counts?
- [ ] Did I introduce any unrelated changes? (If yes, revert them.)
- [ ] Am I under 50% context? (If not, prepare to restart.)

### Before claiming done

- [ ] Is the definition of done actually met?
- [ ] Did I run the build? (`npm run build`)
- [ ] Did I check there are no unrelated changes in the diff?
- [ ] Did I update the README or docs if behavior changed?

---

## PART 7 — Repetition Rule

If you (or the user) do a task three times, it becomes a custom skill in `.claude/skills/`.

Current repeatable workflows already captured:

- `.claude/commands/add-city.md` — Onboard a new GBP-verified city
- `.claude/commands/seo-check.md` — Audit a page against SEO-U rules
- `.claude/commands/deploy.md` — Deploy to Vercel with env checks

---

## PART 8 — What to Refuse / Flag

Refuse or pause and confirm with the user if:

- A change would modify a URL that is already indexed
- A change would put the EMQ in H2, H3, or meta description
- A change would remove a city page (can cause sitewide drops per SEO-U)
- A task asks you to touch a DirectAdmin nginx global template
- A task asks you to upload `.next` folder instead of building on server
- The work would take the context past 60% in one session
