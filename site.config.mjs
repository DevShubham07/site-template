/**
 * Single source of truth for site identity.
 * Pages, layouts and components all read from here, so identity strings
 * (name, domain, description, …) don't need to be edited in more than one
 * place.
 */
export const SITE = {
  /** Human-readable site name (used in <title>, header, footer, schema). */
  name: "Leads Automation",
  /** Bare domain, no protocol, no trailing slash. */
  domain: "leads-automation.example.com",
  /** Main SEO keyword this site targets. */
  keyword: "leads automation",
  /** One-sentence description (meta description fallback; ≤160 chars). */
  description: "Automate lead capture, qualification, and follow-up.",
  /** Vercel project slug — used by vercel.json host-scoped noindex rule. */
  vercelSlug: "leads-automation",
  /** Contact email shown on /contact and /privacy. */
  contactEmail: "info.softsolutionsai@gmail.com",
  /** Copyright/legal entity name for footer + legal pages. */
  legalName: "Leads Automation",
};

export const SITE_URL = `https://${SITE.domain}`;
