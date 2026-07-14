import type { APIRoute } from "astro";

/**
 * robots.txt generated from the single site config — no placeholder file to
 * rewrite at scaffold time. References the sitemap index emitted by
 * @astrojs/sitemap.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL.href}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
