---
description: Audit a page or the whole site against the SEO University rules
argument-hint: [optional slug, e.g. "portable-toilet-rental-denver" or leave blank for sitewide]
---

# SEO Rule Audit

Audit against SEO University rules. Report findings as a checklist with ✓ / ✗ / ⚠.

**Scope:** If `$1` is provided, audit that page only. Otherwise audit the homepage and every city page.

## P1 — Start by listing what you will check

Before running any checks, list the files you will read and the rules you will apply. Do not skip this step.

## Checks to run

### URL
- [ ] Flat slug (no subfolders)
- [ ] Contains EMQ (`portable-toilet-rental-[city]`)
- [ ] Trailing slash enforced
- [ ] No repeated words between URL and title

### Title tag
- [ ] Starts with EMQ
- [ ] Complete sentence format
- [ ] ~6 words (report actual count)
- [ ] Contains "Official"
- [ ] Contains year (2026)
- [ ] Does NOT contain brand name
- [ ] Does NOT contain abbreviations

### Meta description
- [ ] Does NOT contain EMQ (check exact phrase "portable toilet rental [city]")
- [ ] Contains phone number
- [ ] CTA verb present (call, book, reserve, get)
- [ ] Full sentence format, not broken phrases
- [ ] 150+ characters

### H1
- [ ] Contains EMQ exactly once
- [ ] Placed at top of page (first meaningful heading)
- [ ] Different from title tag

### H2/H3
- [ ] EMQ does NOT appear in H2 or H3
- [ ] Headings are entity-based (not keyword-stuffed)

### Body content
- [ ] EMQ count in body is 1–2 max (report actual)
- [ ] First paragraph contains EMQ once
- [ ] Content is 85%+ unique vs other city pages (spot check 3 sentences against siblings)

### NAP
- [ ] Business name: "Palace Porta Potties" (exact)
- [ ] Street address present
- [ ] City, state, ZIP present
- [ ] Phone number in `(XXX) XXX-XXXX` format with `tel:` link

### GBP embed
- [ ] Iframe renders
- [ ] URL points to the correct location's map data

### Schema
- [ ] Homepage: `Organization` only
- [ ] City pages: `LocalBusiness` + `FAQPage`
- [ ] No duplicate or conflicting schema blocks

### Nav
- [ ] Every city linked in top nav
- [ ] Links are real `<a>` tags (check HTML source, not just React output)
- [ ] Nav consistent across all pages

### Technical
- [ ] No noindex, nofollow, or disallow on the page
- [ ] Canonical tag matches the actual URL
- [ ] Sitemap includes the URL

## Report format

For each check, report:

- ✓ Pass
- ✗ Fail — include the actual value found and the fix
- ⚠ Warning — include why

End with a one-line summary: `N passed, N failed, N warnings.`

## What NOT to do

- Do not auto-fix findings. Report only. User decides which to act on.
- Do not suggest changes that contradict `CLAUDE.md` rules.
- Do not audit against general "SEO best practices" — only the rules in this repo's CLAUDE.md.
