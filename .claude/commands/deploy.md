---
description: Deploy Palace Porta Potties to production with pre-flight checks
---

# Deploy to Production

Pre-flight checklist + deploy. Follow P3 — do not make unrelated changes during deploy.

## Pre-flight (run in order, stop on first failure)

### 1. Clean working tree
```bash
git status
```
If there are uncommitted changes, commit or stash them first. Do not deploy a dirty tree.

### 2. Build locally
```bash
npm run build
```
Must exit 0. If it fails, stop. Do not deploy a broken build.

### 3. Env vars present
```bash
test -n "$TURSO_DATABASE_URL" && test -n "$TURSO_AUTH_TOKEN" && echo "env OK" || echo "env MISSING"
```
If missing, stop. Prompt user to add via `vercel env add`.

### 4. DB matches
```bash
npm run db:seed
```
Re-seeds are safe (upsert on slug). Confirms the deployed env will have current data.

### 5. Link check
Verify `next.config.mjs` still has `trailingSlash: true`. If not, stop — SEO-U rule violation.

## Deploy

### Target: Vercel (primary)
```bash
vercel --prod
```

### Target: Cloudflare Pages (alternative — use if Vercel costs are the issue)
```bash
git push origin main
```
Pages will auto-deploy from the connected GitHub repo.

## Post-deploy verification

1. Hit the production URL. Verify homepage loads.
2. Hit at least 2 city pages. Verify GBP iframe renders.
3. Hit `/sitemap.xml`. Verify it lists all cities.
4. Hit `/robots.txt`. Verify it references the sitemap.
5. Run Lighthouse (or PageSpeed Insights) on homepage. Report CWV.

## If something broke

**Do not patch forward on a broken production deploy.**

```bash
vercel rollback
```
or for Cloudflare Pages, redeploy the previous commit from the dashboard. Then investigate on a branch.

## What NOT to do

- Do not change code during the deploy flow. Deploy what is committed, nothing more.
- Do not skip the local build step because "it worked last time."
- Do not edit env vars as part of this workflow — that's a separate task.
