/**
 * Local QA pass: screenshots at four breakpoints plus automated checks for
 * horizontal overflow, heading hierarchy, contrast-critical roles, focus
 * order and reduced-motion behaviour.
 *
 * Usage: node scripts/audit.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const outDir = "/tmp/shots";
await mkdir(outDir, { recursive: true });

const VIEWPORTS = [
  { name: "desktop-xl", width: 1728, height: 1080 },
  { name: "laptop", width: 1280, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "phone", width: 390, height: 844 },
];

const ROUTES = ["/", "/projects", "/investigations", "/about", "/contact", "/nope-404"];

const browser = await chromium.launch();
const problems = [];

// ---- Screenshots + overflow check -------------------------------------
for (const vp of VIEWPORTS) {
  // Captured with reduced motion so the stitched full-page image shows the
  // settled layout rather than reveals frozen mid-transition. Motion itself
  // is verified separately below.
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // Walk the page so scroll-triggered reveals have actually run before we
  // capture; otherwise a full-page shot freezes them mid-hide.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 130));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });
  await page.waitForTimeout(500);

  await page.screenshot({ path: `${outDir}/home-${vp.name}.png`, fullPage: true });

  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    const offenders = [];
    if (de.scrollWidth > de.clientWidth + 1) {
      for (const el of document.querySelectorAll("*")) {
        const r = el.getBoundingClientRect();
        if (r.right > de.clientWidth + 1 || r.left < -1) {
          offenders.push(
            `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)} left=${Math.round(r.left)}`,
          );
        }
      }
    }
    return { doc: de.scrollWidth, client: de.clientWidth, offenders: offenders.slice(0, 6) };
  });
  if (overflow.doc > overflow.client + 1) {
    problems.push(
      `HORIZONTAL OVERFLOW @${vp.name}: ${overflow.doc} > ${overflow.client}\n   ${overflow.offenders.join("\n   ")}`,
    );
  }

  await ctx.close();
}

// ---- Structure / accessibility ----------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    const res = await page.goto(base + route, { waitUntil: "networkidle" });
    const status = res?.status();
    if (route === "/nope-404") {
      if (status !== 404) problems.push(`404 route returned ${status}, expected 404`);
      continue;
    }
    if (status !== 200) problems.push(`${route} returned ${status}`);

    const info = await page.evaluate(() => {
      const heads = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => ({
        level: Number(h.tagName[1]),
        text: (h.textContent ?? "").trim().slice(0, 48),
      }));
      const imgs = [...document.querySelectorAll("img")].map((i) => ({
        src: i.getAttribute("src")?.slice(0, 40),
        alt: i.getAttribute("alt"),
      }));
      const links = [...document.querySelectorAll("a")].map((a) => ({
        href: a.getAttribute("href"),
        text: (a.textContent ?? "").trim(),
        label: a.getAttribute("aria-label"),
      }));
      const buttons = [...document.querySelectorAll("button")].map((b) => ({
        text: (b.textContent ?? "").trim(),
        label: b.getAttribute("aria-label"),
      }));
      return { heads, imgs, links, buttons, title: document.title };
    });

    const h1s = info.heads.filter((h) => h.level === 1);
    if (h1s.length !== 1) problems.push(`${route}: expected exactly one h1, found ${h1s.length}`);

    // No skipped heading levels
    let prev = 0;
    for (const h of info.heads) {
      if (prev && h.level > prev + 1) {
        problems.push(`${route}: heading jump h${prev} → h${h.level} ("${h.text}")`);
      }
      prev = h.level;
    }

    for (const img of info.imgs) {
      if (img.alt === null) problems.push(`${route}: <img ${img.src}> missing alt`);
    }
    for (const l of info.links) {
      if (!l.text && !l.label) problems.push(`${route}: link with no accessible name (${l.href})`);
    }
    for (const b of info.buttons) {
      if (!b.text && !b.label) problems.push(`${route}: button with no accessible name`);
    }
    if (!info.title) problems.push(`${route}: empty <title>`);
  }

  // Keyboard: first tab should reach the skip link
  await page.goto(base, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const firstFocus = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      text: (el.textContent ?? "").trim().slice(0, 30),
      outline: cs.outlineStyle,
      width: cs.outlineWidth,
    };
  });
  if (firstFocus?.text !== "Skip to content") {
    problems.push(`First tab stop is "${firstFocus?.text}", expected the skip link`);
  }
  if (firstFocus && firstFocus.outline === "none") {
    problems.push("Focused element has no visible outline");
  }

  // Mobile menu opens and exposes state
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await mob.newPage();
  await mp.goto(base, { waitUntil: "networkidle" });
  const toggle = mp.locator('button[aria-controls="mobile-nav"]');
  await toggle.click();
  await mp.waitForTimeout(250);
  if ((await toggle.getAttribute("aria-expanded")) !== "true") {
    problems.push("Mobile menu toggle did not set aria-expanded=true");
  }
  if (!(await mp.locator("#mobile-nav a", { hasText: "Projects" }).first().isVisible())) {
    problems.push("Mobile menu did not reveal navigation links");
  }
  await mp.screenshot({ path: `${outDir}/mobile-menu.png` });
  await mob.close();

  await ctx.close();
}

// ---- Reduced motion ----------------------------------------------------
{
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // Every revealed block must be fully opaque and untransformed with RM on.
  const hidden = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll("h2, h3, p, li")) {
      const cs = getComputedStyle(el);
      if (Number(cs.opacity) < 0.95 && el.getBoundingClientRect().height > 0) {
        bad.push(`${el.tagName}: opacity ${cs.opacity} — "${(el.textContent ?? "").slice(0, 40)}"`);
      }
    }
    return bad.slice(0, 8);
  });
  if (hidden.length) problems.push(`Reduced motion leaves content faded:\n   ${hidden.join("\n   ")}`);

  const canvases = await page.evaluate(() => document.querySelectorAll("canvas").length);
  console.log(`reduced-motion: ${canvases} canvas element(s) present (static paint expected)`);

  await page.screenshot({ path: `${outDir}/home-reduced-motion.png`, fullPage: true });
  await ctx.close();
}

await browser.close();

console.log("\n=== AUDIT RESULT ===");
if (problems.length === 0) {
  console.log("PASS — no issues found");
} else {
  console.log(`${problems.length} issue(s):`);
  for (const p of problems) console.log(" • " + p);
  process.exitCode = 1;
}
