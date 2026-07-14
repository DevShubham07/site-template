import { test, expect } from "@playwright/test";

/**
 * Template smoke suite — runs unmodified against every scaffolded site (G3)
 * and is extended with tool-specific flows at P5. Assertions map to gates:
 * title/h1/console (G4-G5), legal links (AdSense prerequisite, G6),
 * canonical + JSON-LD presence (G6), mobile viewport (G5).
 */

test("homepage renders with title, h1, and zero console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/");
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator("h1")).toBeVisible();
  expect(errors).toEqual([]);
});

test("legal pages exist and are linked from the footer", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  for (const [label, path] of [
    ["Privacy Policy", "/privacy/"],
    ["Terms & Conditions", "/terms/"],
    ["About Us", "/about/"],
    ["Contact Us", "/contact/"],
  ] as const) {
    await expect(footer.getByRole("link", { name: label })).toBeVisible();
    const res = await page.request.get(path);
    expect(res.status(), `${path} should return 200`).toBe(200);
  }
});

test("SEO invariants: canonical, meta description, JSON-LD, robots.txt, sitemap", async ({
  page,
}) => {
  await page.goto("/");
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute("href", /^https:\/\//);
  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute("content", /.{20,160}/);
  const jsonLd = page.locator('script[type="application/ld+json"]').first();
  const parsed = JSON.parse((await jsonLd.textContent()) ?? "{}");
  expect(parsed["@type"]).toBe("WebApplication");
  expect(parsed.offers?.price).toBe("0");
  // Fabricated ratings are a policy violation (design doc §13.4)
  expect(parsed.aggregateRating).toBeUndefined();
  expect(parsed.review).toBeUndefined();

  const robots = await page.request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");

  const sitemap = await page.request.get("/sitemap-index.xml");
  expect(sitemap.status()).toBe(200);
});

test("dark mode toggle switches theme and persists", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const toggle = page.locator("#theme-toggle");
  const wasDark = await html.evaluate((el) => el.classList.contains("dark"));
  await toggle.click();
  await expect(html).toHaveClass(wasDark ? /^(?!.*dark).*$/ : /dark/);
  await page.reload();
  const isDarkAfterReload = await html.evaluate((el) => el.classList.contains("dark"));
  expect(isDarkAfterReload).toBe(!wasDark);
});

test("mobile viewport renders without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});

test("404 page renders custom error page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText(/not found/i);
});
