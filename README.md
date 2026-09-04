# Leads Automation

Website for Leads Automation, built with Astro.

## Stack

Astro 7 (static) · Tailwind v4 via `@tailwindcss/vite` · `@astrojs/sitemap` ·
`astro-favicons` · Vercel Web Analytics + Speed Insights · Playwright test suite.

## Layout

- `site.config.mjs` — site identity (name, domain, description, contact) used across pages
- `src/layouts/Base.astro` — SEO + dark-mode + header/footer + analytics
- `src/components/` — Seo, JsonLd, FaqSection, Header, Footer, ThemeToggle
- `src/pages/` — home, privacy, terms, about, contact, 404, 500, robots.txt endpoint
- `tests/` — Playwright smoke and accessibility (axe) suites

## Commands

```bash
pnpm install
pnpm dev        # local dev
pnpm build      # production build
pnpm test       # Playwright suite (builds a preview server itself)
pnpm check      # astro check (typecheck)
```
