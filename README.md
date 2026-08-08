# Colin's AI — colinsai.com

> Built by experience. Expanded by AI.

Production V1 marketing site: a cinematic dark-tech interface built with the Next.js App
Router, TypeScript and Tailwind CSS v4.

**Verified results:** Lighthouse 100 / 100 / 100 / 100 on desktop, 96 / 100 / 100 / 100 on
throttled mobile. All routes prerender statically; the homepage ships **1.7 kB** of route
JavaScript.

---

## Quick start

```bash
npm install          # install dependencies
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build        # compile and prerender
npm start            # serve the production build
```

Quality gates:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run audit:contrast   # WCAG AA gate on the colour tokens
npm run audit            # headless-browser responsive + a11y sweep (needs the app running)
```

`npm run audit` expects a server on `http://127.0.0.1:3000`; start one with `npm start`
in another terminal, or pass a URL: `node scripts/audit.mjs https://colinsai.com`.

---

## Architecture

```
src/
├── app/                      App Router: one folder per route
│   ├── layout.tsx            Fonts, metadata, header/footer shell, skip link
│   ├── page.tsx              Homepage — composes the seven sections in order
│   ├── globals.css           Design tokens, base layer, utilities, motion rules
│   ├── icon.svg              Favicon (App Router convention)
│   ├── opengraph-image.tsx   Social card, rendered at build time from JSX
│   ├── sitemap.ts robots.ts  Derived from the nav — no duplicate route lists
│   ├── not-found.tsx         404
│   └── projects|investigations|about|contact/
├── components/
│   ├── layout/               Header, Footer, PageIntro
│   ├── sections/             One component per homepage band
│   ├── visuals/              Starfield, HeroVisual, Glyph/ProjectSignature
│   └── ui/                   Button, Section/SectionHeading/Eyebrow, Reveal
├── content/                  ← all copy and project data lives here
│   ├── site.ts               Brand, nav, socials, SEO defaults
│   ├── home.ts               Every string on the homepage
│   └── story-blur.ts         Generated blur placeholder (do not hand-edit)
├── lib/                      cn(), media-query hooks
└── scripts/                  Asset pipeline and QA tooling
```

### Content architecture

**All copy lives in `src/content/`.** Sections are presentational and import from there, so
no string is written twice: the Story copy is shared by the homepage and `/about`, the
project cards are shared by the homepage and `/projects`, and `sitemap.ts` is generated
from the same `nav` array the header and footer render.

To add a Projects, Investigations or Content entry later, extend the typed arrays in
`content/home.ts` (or add a sibling module) — no component changes required. Detail pages
can drop into `app/projects/[slug]/page.tsx` and read from the same data.

### Important components

| Component | Role |
| --- | --- |
| `visuals/HeroVisual.tsx` | The hero's cosmic system: planetary limb, orbital ellipses, signal lattice and decorative instrumentation. Pure SVG + CSS — zero image bytes. |
| `visuals/Starfield.tsx` | Canvas starfield. Desktop only, DPR-capped, paused off-screen and when the tab is hidden, single static frame under reduced motion. |
| `visuals/Glyph.tsx` | `Glyph` (feature-card icons) and `ProjectSignature` (per-project artwork: orbit, lattice, spiral, waveform). |
| `ui/Reveal.tsx` | Visible-first scroll reveal. Renders content with no hiding styles on the server, then hides-and-animates only below-the-fold elements when motion is welcome. |
| `layout/Header.tsx` | Transparent inside the hero, opaque + hairline after 24px of scroll. Active-route underline, mobile sheet with scroll lock and Escape handling. |
| `ui/Section.tsx` | Shared section rhythm, heading style and the luminous accent rule. |

### Design system

Tokens live in the `@theme` block of `globals.css` — surfaces (`void` → `raised`), ink
(`ink`/`muted`/`dim`/`faint`), illumination (`blue`/`violet`/`cyan`/`ember`) and a
per-step fluid type scale. Change a colour there and it propagates everywhere.

Typography is **Geist Sans/Mono**, self-hosted through the `geist` package — no network
request to a font CDN, no layout shift.

---

## Performance

- No background video, no icon library, no animation library. Framer Motion was evaluated
  and removed: the reveal is one opacity step and 18px of travel, which CSS does for free.
  Dropping it cut homepage route JS from 40.8 kB to 1.7 kB.
- Story artwork: source PNG 5.1 MB → **66 kB** WebP, lazy-loaded with a generated 20px blur
  placeholder. Regenerate with `npm run assets -- /path/to/source.png`.
- Canvas work never mounts on phones; a static CSS star layer stands in.
- Every route is statically prerendered.

## Accessibility

- Semantic landmarks, one `h1` per page, no skipped heading levels (asserted in `npm run audit`).
- Skip-to-content link as the first tab stop; visible 2px focus ring on every interactive element.
- All text tokens clear WCAG AA 4.5:1 against every surface they can sit on — enforced by
  `npm run audit:contrast`, which exits non-zero on a regression.
- Touch targets ≥ 40px.
- `prefers-reduced-motion` is honoured globally in CSS *and* structurally in `Reveal` and
  `Starfield`; content is never gated behind an animation, and works with JavaScript off.
- Decorative visuals are `aria-hidden`; the story image has descriptive alt text.

## SEO

Metadata API with title template and per-route canonicals, OpenGraph + Twitter cards, a
build-time OG image, `sitemap.xml` and `robots.txt` generated from the nav, and
`metadataBase` pinned to `https://colinsai.com`.

---

## Before you go live

1. **`src/content/site.ts`** — `hello@colinsai.com` is a placeholder; set your real address.
2. **`src/content/site.ts`** — the GitHub / LinkedIn / YouTube links are `#` placeholders.
3. Point the domain at your host (Vercel deploys this with zero configuration).

There are no fabricated statistics, testimonials, client logos or telemetry readouts
anywhere in the site. The instrumentation panels in the hero are labelled decoration and
deliberately display no numbers.

---

## Deployment

Zero-config on Vercel. Any Node host works with `npm run build && npm start`. Only
`metadataBase` in `app/layout.tsx` assumes the production domain.

---

## Logical V2 enhancements

1. **MDX content pipeline** for Investigations and Content — file-based posts with
   frontmatter, generated index pages and RSS, no CMS required.
2. **Project detail routes** at `/projects/[slug]`, reading the existing typed data.
3. **Evidence-log component** for investigations: claim, sources, confidence, and an
   explicit "what would change this conclusion" block — the differentiator of the brand.
4. **Email capture** for "Follow the Journey" (Buttondown/Resend) replacing the mailto CTA.
5. **View Transitions** between routes now that the App Router supports them.
6. **Search / tag filtering** once there are enough entries to warrant it.
7. **A light theme**, if it ever earns its keep — the tokens are already centralised.
8. **CI**: run `typecheck`, `lint`, `audit:contrast` and Lighthouse budgets on every PR.
