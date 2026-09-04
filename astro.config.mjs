// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import favicons from "astro-favicons";
import tailwindcss from "@tailwindcss/vite";
import { SITE, SITE_URL } from "./site.config.mjs";

// Static output (default) — no adapter needed for static-on-Vercel.
export default defineConfig({
  site: SITE_URL,
  output: "static",
  trailingSlash: "ignore",
  integrations: [
    sitemap(),
    favicons({
      name: SITE.name,
      short_name: SITE.name,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
