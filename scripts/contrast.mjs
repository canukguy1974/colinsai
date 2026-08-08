/**
 * Contrast gate for the palette.
 *
 * Checks every text token against every surface it can appear on and fails
 * the run if a token used for body copy drops below WCAG AA (4.5:1). Run it
 * after touching colours in globals.css: `node scripts/contrast.mjs`.
 */
const SURFACES = {
  void: "#05070e",
  abyss: "#070b16",
  panel: "#0c1426",
  raised: "#101a30",
};

const TEXT = {
  ink: "#eef2fb",
  muted: "#a3b0cc",
  dim: "#8593b2",
  faint: "#7188b4",
  blue: "#4c7dff",
  "blue-bright": "#6d97ff",
  cyan: "#45e0d2",
  violet: "#9b6bff",
};

/** Tokens that carry readable prose and therefore must clear 4.5:1. */
const BODY_TOKENS = new Set(["ink", "muted", "dim", "faint", "blue-bright", "cyan", "violet"]);

const channels = (h) =>
  h
    .replace("#", "")
    .match(/../g)
    .map((x) => parseInt(x, 16) / 255);
const linearise = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (h) => {
  const [r, g, b] = channels(h).map(linearise);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failed = false;

for (const [name, colour] of Object.entries(TEXT)) {
  const results = Object.entries(SURFACES).map(([s, sv]) => [s, contrast(colour, sv)]);
  const worst = Math.min(...results.map(([, r]) => r));
  const needsAA = BODY_TOKENS.has(name);
  const ok = !needsAA || worst >= 4.5;
  if (!ok) failed = true;

  console.log(
    `${ok ? "ok  " : "FAIL"} ${name.padEnd(12)} worst ${worst.toFixed(2)}:1  ` +
      results.map(([s, r]) => `${s} ${r.toFixed(2)}`).join("  "),
  );
}

if (failed) {
  console.error("\nOne or more body-text tokens fall below WCAG AA (4.5:1).");
  process.exitCode = 1;
} else {
  console.log("\nAll body-text tokens clear WCAG AA (4.5:1).");
}
