# KEV — Design System

> Editorial portfolio for **KEV**, a photographer & music-video director working
> with Latin music artists (J Balvin, Maluma, Maisak) and brands (New Era).
> Mobile-first portfolio site: an editorial gallery for photography campaigns,
> music videos and brand work.

**The one rule:** the container stays mute, the imagery does the talking. Pure
white paper, near-black bold type, one whisper of orange. Everything else is the
photo or the film.

---

## Sources

This system was built from a written art-direction brief plus one supplied asset.
No codebase or Figma file was provided.

| Source | What it is |
|---|---|
| `uploads/B8814578-097F-495D-8FA2-AC40BE867FEF.PNG` | The **"Kev."** wordmark (white-on-black, 1024×1024). Cropped + recolored variants live in `assets/`. |
| Written brief | Art direction, IA, and component behaviour (header, editorial home menu, work index, gallery/overview project views, video list, custom cursor). |
| Reference (not accessed) | `renellmedrano.com` by UNSTATED — the stylistic north star: editorial fashion-photography portfolio, white paper, bold grotesque, restraint. |

---

## What this brand is

KEV shoots and directs at the intersection of **Latin music culture and fashion
editorial**. The work is loud and colourful; the portfolio that frames it is the
opposite — silent, white, exacting. The site is a *frame*, not a feature. There
is exactly one product:

- **The portfolio website** (mobile-first, responsive up to desktop). Sections:
  Home (editorial menu) → Work index → Project (Gallery / Overview views) →
  Video → Information.

---

## CONTENT FUNDAMENTALS

How KEV writes. The copy is as stripped-back as the layout.

- **Voice:** third-person and impersonal, almost like exhibition wall labels. The
  site rarely says "I" or "you" — it just **names things**. Project title, client,
  year. Let the work speak.
- **Casing:** **Title Case** for navigation and section words (`Photography`,
  `Overview`, `Video`, `Information`). **UPPERCASE** only for micro-labels and the
  orange client tags (`NEW ERA`, `SONY MUSIC`). Counters are bare numerals
  (`05 / 34`).
- **Brevity:** noun phrases, not sentences. "Music video — Maluma" not "This is a
  music video I directed for Maluma." Verbs appear only as **actions** in the UI:
  `Pause`, `Unmute`, `View →`, `Menu`, `Close`.
- **Wayfinding copy:** the end-of-project link reads `View → [Next Project]`. Nav
  is a single word: `Menu`. The home page is four words and nothing else.
- **Numbers:** zero-padded counters (`05 / 34`), years in full (`2024`),
  timecodes as `0:42 / 3:18`.
- **Emoji:** never. **Exclamation marks:** never. **Marketing adjectives**
  ("stunning", "award-winning"): never. The Information page is the only place
  with running prose, and even there it's terse — a paragraph of bio, a list of
  clients, contact lines.
- **Tone words:** confident, cinematic, quiet, expensive, deadpan. If a line
  could appear in a gallery handout or a film's end credits, it's on-brand.

**On-brand examples**
```
Photography
Overview
Video
Information

J Balvin — "Rio"            NEW ERA
Maluma — Tour Film          SONY MUSIC
05 / 34
View → Maisak: Capsule
Pause   Unmute   0:42 / 3:18
```

**Off-brand**
```
Check out my AMAZING new shoot! 🔥
Welcome to my creative world ✨
Click here to see more →
```

---

## VISUAL FOUNDATIONS

- **Background:** one colour — `#FFFFFF` (`--paper`). No off-whites, no
  sections-on-grey, no dark mode. All chroma in the page comes from the
  photographs and videos themselves.
- **Type:** a single bold neo-grotesque does *everything* — wordmark, hero menu,
  titles, body, UI. Family: Helvetica Now Display / Neue Haas Grotesk style.
  No serifs, **no italics ever**, no second typeface. Big sizes, heavy weights
  (700–800) for display; regular (400) for the few bits of running text.
  Tight negative tracking on large display (`-0.03em`), generous line-height on
  body (`1.55`). See `colors_and_type.css`.
- **Colour text system:** near-black `#0D0D0D` primary, mid-gray `#8A8A8A`
  secondary (client names, captions, counters), light-gray `#BDBDBD` tertiary
  (inactive states).
- **The accent:** exactly one — orange `#FF4D17`, used **only** on small client
  tags over the Overview grid (and sparingly as `View →` hover). It is a
  punctuation mark, not a theme. Never large fields of orange.
- **Spacing:** 4px base, but the macro rhythm is huge — `96–192px` of vertical
  air around content. Whitespace is the primary compositional tool. Sections are
  `100dvh` and centred; the Gallery view is one image floating in white.
- **Imagery:** full-bleed or generously-matted photographs; cinematic, colour-rich,
  warm Latin-culture palettes (the work is the colour). Video previews autoplay
  **muted**. In this system, real media is replaced by neutral placeholder frames
  (`--frame` light / `--frame-dark` for video) labelled with project + client —
  **swap in real assets**.
- **Corners:** square. `border-radius: 0` is the default for frames, images,
  buttons, toggles. The only rounded things are the orange tag (`2px`, barely) and
  circles (the cursor dot, video timecode dot).
- **Borders:** hairline `1px` rules in `#ECECEC`, used as dividers in lists and
  under the header. No boxes around content, no card chrome.
- **Cards:** there essentially *aren't* cards. The Overview grid is bare images in
  a masonry column layout with a tag floating at the corner — **no shadow, no
  border, no rounding, no padding chrome**. Elevation is communicated by
  whitespace, not by shadows.
- **Shadows:** none on UI. The system has no elevation/shadow scale by design —
  depth comes from imagery and negative space.
- **The film-strip ruler:** the signature motif — a row of thin `1px` vertical
  tick marks (`--tick #D6D6D6`, ~9px tall, ~9px apart) spanning the header between
  `KEV` and `Menu`, evoking a film-strip / sprocket ruler. Implemented as a
  repeating linear-gradient (`.kev-ticks`).
- **Motion:** quiet and filmic. Cross-fades (`--t-film 900ms`) for image/video
  swaps, soft ease-out (`--ease`) for everything. **No bounce, no slide-ins, no
  parallax gimmicks.** Hover video previews fade up from 0; the gallery counter
  ticks. Respect `prefers-reduced-motion`.
- **Hover states:** text links fade to `--ink-2` (or the link's siblings dim to
  ~0.35 opacity while the hovered one stays black — the "dim the rest" pattern on
  the work index). The orange `View →` may shift fully orange on hover. No
  underlines, no color-block fills.
- **Press states:** a subtle `opacity: 0.6` tap-down; no scale, no shadow. Touch
  targets ≥ 44px.
- **Transparency / blur:** essentially none. The aesthetic is opaque and flat;
  no frosted glass, no scrims except a minimal protection gradient under header
  text when it overlays a full-bleed image.
- **Custom cursor:** a soft, semi-transparent gray circle (`--cursor`,
  rgba black 16%) that trails the pointer with a little easing; grows slightly
  over interactive targets. Hidden on touch devices.
- **Layout rules:** persistent fixed header (the ticks row). Page content sits in
  a `--maxw 1600px` column with `--pad-x` gutters that scale `20→64px`.
  Mobile-first: everything is designed for a phone column then opens up to
  multi-column grids at width.

---

## ICONOGRAPHY

KEV is **near-iconless by design**. The interface is text-first; words do the
work that icons usually do.

- **No icon font, no icon set.** There is no Lucide/Heroicons/Font-Awesome
  dependency and none is needed. Controls are **text labels**: `Pause`, `Unmute`,
  `Menu`, `Close`, `View →`.
- **The one glyph:** the arrow `→` (U+2192), used in `View →` and occasionally as
  a list affordance. Use the real Unicode arrow, not an SVG.
- **The brand dot:** the period in **"Kev."** is the closest thing to an icon —
  echoed by the cursor circle and the dot in the video timecode separator.
- **Tick-mark ruler:** the film-strip ticks are decorative, drawn in CSS
  (repeating-linear-gradient), not an asset.
- **Emoji / unicode décor:** never.
- If a future surface genuinely needs icons (rare), use a hairline 1.5px
  monoline set (Lucide is the closest CDN match) — but treat that as an exception
  and keep them ink-colored and tiny. **Flagged:** no icon set ships with this
  system today.

Logo assets in `assets/`:
- `logo-kev-black.png` — black wordmark, transparent bg (default, on white).
- `logo-kev-white.png` — white wordmark, transparent bg (over imagery / dark).
- `logo-kev-white-on-black.png` — original, tightly cropped.

---

## Index — what's in this folder

| Path | What |
|---|---|
| `README.md` | This file — context, content + visual foundations, iconography, manifest. |
| `colors_and_type.css` | All foundations as CSS vars — colour tokens, type scale, spacing, motion, plus semantic helpers (`.kev-mega`, `.kev-label`, `.kev-tag`, `.kev-ticks`…). Import this everywhere. |
| `SKILL.md` | Agent-Skill manifest so this system works inside Claude Code. |
| `assets/` | Logo variants (black / white / original). Real photos + videos go here. |
| `preview/` | Small HTML specimen cards that populate the Design System tab. |
| `ui_kits/website/` | The portfolio UI kit — `index.html` interactive demo + JSX components (header, editorial menu, work index, project gallery/overview, video list, custom cursor). |

> No slide template was supplied, so `slides/` is intentionally absent.

---

## Quick start

```html
<link rel="stylesheet" href="colors_and_type.css">
<body>
  <!-- everything inherits Helvetica/Archivo, white paper, near-black ink -->
  <h1 class="kev-mega">Photography</h1>
  <span class="kev-tag">New Era</span>
</body>
```
