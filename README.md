# site-template

GitHub **template repository** for the micro-tool website factory. Every site
starts as `gh repo create ORG/site-<slug> --template ORG/site-template`, then
`automation/new-site.mjs` (in `factory-core`) fills identity into
[site.config.mjs](site.config.mjs) — the single file that holds name/domain/
keyword. Pages, SEO tags, JSON-LD, robots.txt and the sitemap all derive from it.

## Rule

This template must **always build and deploy green as-is** (design doc §4.4).
CI on this repo enforces it — if a template change breaks the build, it never
reaches the fleet.

## Stack (pinned — design doc §5)

Astro 7 (static) · Tailwind v4 via `@tailwindcss/vite` · `@astrojs/sitemap` ·
`astro-favicons` · Vercel Web Analytics + Speed Insights · Playwright smoke
suite · LHCI via reusable CI.

## Layout

- `site.config.mjs` — site identity (THE scaffold-time rewrite target)
- `src/layouts/Base.astro` — Seo + dark-mode + header/footer + analytics
- `src/components/` — Seo, JsonLd (WebApplication/no ratings), FaqSection (visible content, no FAQPage schema), Header, Footer, ThemeToggle
- `src/pages/` — index (tool area + 600-word copy slot), privacy, terms, about, contact, 404, 500, robots.txt endpoint
- `tests/smoke.spec.ts` — gate-mapped smoke suite (runs unmodified at G3)
- `spec.md` — binding per-site specification template (G2)
- `site.json` — per-site state machine record (design doc §3.3)
- `.claude/skills/` — the factory prompt library (P-01…P-14)

## Commands

```bash
pnpm install
pnpm dev        # local dev
pnpm build      # must pass with zero sitemap "Skipping" warnings
pnpm test       # Playwright smoke suite (builds preview server itself)
```
