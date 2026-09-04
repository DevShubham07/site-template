import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Axe accessibility suite: fails on any critical/serious violation.
 * Coverage: home (/) and a representative content page (/about/), at desktop
 * (1280px) and mobile (375px), each in light and dark mode (dark toggled by
 * adding the `.dark` class to <html>, mirroring ThemeToggle's mechanism).
 * Extend PAGES below as new routes are added.
 */

const PAGES = ["/", "/about/"];
const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 375, height: 812 },
];
const THEMES = ["light", "dark"] as const;

for (const path of PAGES) {
  for (const viewport of VIEWPORTS) {
    for (const theme of THEMES) {
      test(`axe: ${path} @ ${viewport.name} (${theme})`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(path);
        if (theme === "dark") {
          await page.evaluate(() => document.documentElement.classList.add("dark"));
        }
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        const blocking = results.violations.filter(
          (v) => v.impact === "critical" || v.impact === "serious",
        );
        expect(
          blocking.map((v) => `${v.id} [${v.impact}]: ${v.nodes.length} node(s)`),
        ).toEqual([]);
      });
    }
  }
}
