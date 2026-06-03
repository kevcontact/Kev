---
name: kev-design
description: Use this skill to generate well-branded interfaces and assets for KEV — a photographer & music-video director portfolio (Latin music artists + brands). Editorial, mobile-first, white paper, one bold neo-grotesque, a single orange accent. Contains design guidelines, colors, type, the logo, and a website UI kit for prototyping.
user-invocable: true
---

# KEV — design skill

KEV is a photographer & music-video director (J Balvin, Maluma, Maisak, New Era).
The portfolio is editorial and silent so the imagery does the talking: **pure
white paper, near-black bold type, one whisper of orange.**

Read **`README.md`** first — it holds the full context, content fundamentals,
visual foundations, iconography, and a file index. Then explore:

- `colors_and_type.css` — all tokens (color, type scale, spacing, motion) +
  semantic helpers (`.kev-mega`, `.kev-label`, `.kev-tag`, `.kev-ticks`…).
  Import it into anything you build.
- `assets/` — the `Kev.` wordmark (black / white / original).
- `preview/` — small specimen cards (type, color, spacing, components).
- `ui_kits/website/` — interactive portfolio recreation + JSX components
  (header with film-strip ruler, editorial menu, work index with hover preview,
  project Gallery/Overview, video list, custom cursor). See its `README.md`.

## Non-negotiables
- One typeface (Helvetica Now / Neue Haas Grotesk style → real Helvetica, Archivo
  fallback). No serifs, no italics, no second font. Heavy weights for display,
  tight tracking; generous line-height on body.
- Background is always `#FFFFFF`. All chroma comes from photos/videos.
- Orange `#FF4D17` only on client tags + `View →` hover — never as a field.
- Square corners. Text-based controls, not icons. The only glyph is `→`.
- Quiet, filmic motion: cross-fades + soft ease-out, no bounce, no shadows.
- Mobile-first, 100dvh sections, lots of whitespace.

## Working
- **Visual artifacts** (mocks, slides, throwaway prototypes): copy the assets and
  tokens you need into your output folder and produce static/standalone HTML the
  user can open. Replace the tonal `Frame` placeholders with real imagery.
- **Production code**: read the tokens and rules here and design as a KEV expert.
- If invoked with no brief, ask what they want to build, ask a few focused
  questions, then act as an expert designer who outputs HTML artifacts or
  production code as the need dictates.
