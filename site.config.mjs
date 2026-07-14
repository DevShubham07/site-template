/**
 * Single source of truth for site identity.
 * `automation/new-site.mjs` rewrites ONLY this file (plus package.json name
 * and vercel.json host) when scaffolding a new site — pages, layouts and
 * components all read from here, so no other file contains identity strings.
 */
export const SITE = {
  /** Human-readable site/tool name (used in <title>, header, footer, schema). */
  name: "Site Template",
  /** Bare domain, no protocol, no trailing slash. */
  domain: "template.example.com",
  /** Main SEO keyword this site targets. */
  keyword: "site template",
  /** One-sentence description (meta description fallback; ≤160 chars). */
  description:
    "A fast, free online tool template. This placeholder description is replaced at scaffold time.",
  /** Vercel project slug — used by vercel.json host-scoped noindex rule. */
  vercelSlug: "site-template",
  /** Contact email shown on /contact and /privacy. */
  contactEmail: "info.softsolutionsai@gmail.com",
  /** Copyright/legal entity name for footer + legal pages. */
  legalName: "Site Template",
};

export const SITE_URL = `https://${SITE.domain}`;
