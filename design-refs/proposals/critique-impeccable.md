# Critique — critic-impeccable (front-tool Round 0)

> Reviewer: **critic-impeccable**. Source of rules: `~/.claude/skills/_imports/impeccable/cli/engine/detect-antipatterns.mjs` (29 deterministic anti-pattern rules) + `skill/SKILL.md` (qualitative "Shared design laws" + "Absolute bans" + the AI-slop test).
> Scope: the 5 design proposals in `design-refs/proposals/`. This is a **paper review of design specs**, not a runtime DOM scan — the CLI runs on rendered HTML/CSS; here I apply the same rule logic to the CSS/TSX snippets and design decisions each proposal commits to.
> Verdict legend: **PASS** = no violation in the spec; **WARN** = risk that materializes only under a specific (avoidable) implementation; **FAIL** = the spec as written triggers the rule.

---

## 0. How the deterministic rules map to this project

KEV's LOCKED RULES already neutralize most of impeccable's anti-patterns by construction (square corners, single accent, text controls, no bounce, no component libs). The genuinely live risks for THIS redesign are a small subset:

| Rule | Why it is (or isn't) live here |
|---|---|
| `overused-font` | **Structurally unavoidable.** Archivo AND Helvetica are both on impeccable's `OVERUSED_FONTS` set. This is a LOCKED RULE conflict, identical across all 5 proposals — see §6. |
| `single-font` | **Structurally unavoidable + intentional.** One grotesca is a LOCKED RULE. impeccable flags it; the brief overrides. Identical across all 5. |
| `pure-black-white` | Live. `#0D0D0D` is NOT pure `#000` (passes the detector's `r===0&&g===0&&b===0` gate) and is tinted-dark-enough in spirit. But several proposals use `#fff`/`color: #fff` literals on hero text — impeccable's law "Never use `#000` or `#fff`" is qualitative and these trip it. |
| `low-contrast` / `gray-on-color` | Live on every full-bleed text-over-image surface and every `rgba(...,0.6)` secondary on dark. Must be checked per-proposal. |
| `dark-glow` | Live in principle (dark fields gaining ground) — but every proposal explicitly bans shadows, so PASS unless a glow sneaks in. |
| `everything-centered` | Live as a *positive*: corner-anchoring is the opposite of centered, so these PASS easily. |
| `bounce-easing` | Live: any `cubic-bezier` with y outside [0,1] fails. Checked per-proposal. |
| `layout-transition` | Live: animating width/height/padding/margin fails. The `scaleX/scaleY` line-draw approach is the correct dodge; one proposal animates `height` implicitly. |
| `body-text-viewport-edge` / `cramped-padding` | Live: corner-anchored text at `left: var(--pad-x)` has padding, so PASS — but scatter letters / chapter ledes at the literal viewport edge need a check. |
| `tiny-text` | Live: `font-size: 11px`, `12px`, `13px`, `--cross-mark: 10px` on crosshair marks and scatter. The detector exempts UI-context/label/uppercase/`aria-hidden`-decorative; most crosshair marks are `aria-hidden` decorative so PASS, but a couple are real microcopy. |
| `wide-tracking` | Live: `letter-spacing: .12em` / `0.12em` on scatter letters as "body" — but they are single glyphs, not body text (textLen ≤ 20), so PASS the detector; still a qualitative note. |
| `nested-cards`, `icon-tile-stack`, `gradient-text`, `ai-color-palette`, `side-tab`, `flat-type-hierarchy`, `justified-text`, `all-caps-body`, `monotonous-spacing`, `skipped-heading`, `tight-leading`, `hero-eyebrow-chip`, `italic-serif-display`, `repeated-section-kickers`, `border-accent-on-rounded`, `line-length` | Checked per-proposal; most PASS by construction, with notable exceptions called out below. |

---

## 1. Master pass/fail matrix (29 deterministic rules × 5 proposals)

Legend: ✅ PASS · ⚠️ WARN · ❌ FAIL · — N/A (rule's preconditions can't occur in this spec)

| # | Rule (id) | aesthetic | styles | variants | references | components |
|---|---|:--:|:--:|:--:|:--:|:--:|
| 1 | side-tab | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| 2 | border-accent-on-rounded | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3 | overused-font | ❌ | ❌ | ❌ | ❌ | ❌ |
| 4 | single-font | ❌ | ❌ | ❌ | ❌ | ❌ |
| 5 | flat-type-hierarchy | ✅ | ✅ | ✅ | ✅ | ✅ |
| 6 | gradient-text | ✅ | ✅ | ✅ | ✅ | ✅ |
| 7 | ai-color-palette | ✅ | ✅ | ✅ | ✅ | ✅ |
| 8 | nested-cards | ✅ | ✅ | ✅ | ✅ | ✅ |
| 9 | monotonous-spacing | ✅ | ✅ | ✅ | ✅ | ✅ |
| 10 | everything-centered | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| 11 | bounce-easing | ✅ | ✅ | ✅ | ✅ | ✅ |
| 12 | dark-glow | ✅ | ✅ | ✅ | ✅ | ✅ |
| 13 | icon-tile-stack | ✅ | ✅ | ✅ | ✅ | ✅ |
| 14 | italic-serif-display | ✅ | ✅ | ✅ | ✅ | ✅ |
| 15 | hero-eyebrow-chip | ⚠️ | ⚠️ | ✅ | ❌ | ⚠️ |
| 16 | repeated-section-kickers | ✅ | ⚠️ | ✅ | ⚠️ | ✅ |
| 17 | pure-black-white | ✅ | ✅ | ❌ | ✅ | ✅ |
| 18 | gray-on-color | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| 19 | low-contrast | ⚠️ | ⚠️ | ❌ | ⚠️ | ⚠️ |
| 20 | layout-transition | ✅ | ✅ | ⚠️ | ⚠️ | ❌ |
| 21 | line-length | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| 22 | cramped-padding | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ |
| 23 | body-text-viewport-edge | ✅ | ⚠️ | ✅ | ⚠️ | ✅ |
| 24 | tight-leading | ⚠️ | ✅ | ⚠️ | ❌ | ✅ |
| 25 | skipped-heading | ✅ | ✅ | ✅ | ✅ | ✅ |
| 26 | justified-text | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| 27 | tiny-text | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| 28 | all-caps-body | ✅ | ✅ | ✅ | ✅ | ✅ |
| 29 | wide-tracking | ✅ | ⚠️ | ✅ | ✅ | ⚠️ |
| | **Deterministic FAILs** | **2** | **2** | **4** | **3** | **3** |
| | **WARNs** | 5 | 7 | 6 | 9 | 8 |

> Rules 3 and 4 (`overused-font`, `single-font`) fail on **all five** because they are forced by a LOCKED RULE; see §6 for the reconciliation. Stripping those two systemic-and-mandated fails, the *avoidable* deterministic FAIL counts are: aesthetic **0**, styles **0**, variants **2** (pure-black-white, low-contrast in Variant C), references **1** (hero-eyebrow-chip) + tight-leading, components **1** (layout-transition).

---

## 2. Qualitative SKILL.md laws (the LLM-critique pass) × 5 proposals

| Law (SKILL.md) | aesthetic | styles | variants | references | components |
|---|:--:|:--:|:--:|:--:|:--:|
| Color: never `#000`/`#fff`; tint neutrals | ✅ uses `#F2EFEA`/`--warm-veil` | ✅ `#E8E8E8` | ❌ uses `#fff` literals + raw `#0D0D0D` field | ✅ `#F2F0EC` cálido | ✅ `#F4F2EF` cálido |
| Color strategy chosen deliberately | ✅ "Restrained + image is the color" | ✅ explicit | ✅ explicit | ✅ explicit | ✅ explicit |
| Theme: scene sentence, not category | ✅ "darkroom/exposición" scene | ⚠️ style-CSV-derived, no scene | ✅ 3 named scenes (Hara/Field/Pentagram) | ✅ "atlas/chapters" scene | ✅ interaction scene |
| Type: line length 65–75ch | ✅ `max-width: 34ch/16ch` | ✅ `18ch/40ch` | ✅ `14ch` | ⚠️ `34ch` ok, but no cap on bio | ✅ `34ch` |
| Type: hierarchy via scale+weight ≥1.25 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Layout: vary spacing | ✅ | ✅ | ✅ | ✅ | ✅ |
| Layout: cards are lazy; nested always wrong | ✅ "chapters are full-bleed, not cards" | ✅ | ✅ | ✅ explicit disclaimer | ✅ |
| Layout: don't wrap everything in a container | ✅ | ✅ | ✅ | ✅ | ✅ |
| Motion: no layout-property animation | ✅ scaleX/Y | ✅ scaleX/Y | ⚠️ pan via transform ok; chapter 100dvh height? | ⚠️ opacity only (safe) | ❌ progress bar via width; `is-paused` ok |
| Motion: ease-out exponential, no bounce | ✅ `--ease` | ✅ | ✅ | ✅ `--ease-io` | ✅ `cubic-bezier(.16,1,.3,1)` |
| Bans: no side-stripe border | ✅ | ✅ | ✅ | ✅ | ⚠️ work-row `2px` accent left bar (mobile) |
| Bans: no gradient text | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bans: no glassmorphism default | ✅ opaque/flat | ✅ | ✅ | ✅ | ✅ |
| Bans: no hero-metric template | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bans: no identical card grids | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bans: modal as first thought | ✅ (menu overlay is nav, not modal) | ✅ | ✅ | ✅ | ✅ |
| Copy: no em dashes / `--` | ⚠️ uses ` — ` em dash in copy | ⚠️ ` — ` em dash | ⚠️ ` — ` em dash | ⚠️ ` — ` em dash | ⚠️ ` — ` em dash |
| AI-slop test (category reflex) | ✅ darkroom is non-obvious | ✅ | ✅ | ✅ | ✅ |

---

## 3. Per-proposal concrete violations

### A · proposal-aesthetic.md — "Cámara Oscura"
**Avoidable deterministic FAILs: 0. Systemic FAILs: 2 (font). WARNs: 5.**

- **❌ #3 overused-font / #4 single-font (systemic, mandated):** uses Archivo only. Both on impeccable's lists. Overridden by LOCKED RULE — see §6. Not a defect of this proposal.
- **⚠️ #15 hero-eyebrow-chip:** the Home `kev-paren` tagline `( Latin music × fashion editorial )` sits near the hero `h1`. The detector fires only when a ≤14px tracked-caps OR accent-bold sibling sits directly above an `h1`. Here the paren tagline is below/beside, sentence-case, not tracked-caps → **likely PASS**, but if implemented as a tracked-caps eyebrow above the h1 it flips to FAIL. Keep it as the BR credit, not a TL eyebrow.
- **⚠️ #18 gray-on-color / #19 low-contrast:** `--ink-on-dark-2: rgba(242,239,234,0.62)` over a warm photo + `--warm-veil` (18% amber multiply). Proposal claims ~9:1 with scrim, but the scrim is `0.42` top/bottom fading to 0 at 32% — the BR credit at `bottom: 6vh` may land in the faded zone over a mid-tone photo region. **Must be verified at runtime per image.** The amber `--warm-veil` over a light photo region can push the *effective* bg chroma high enough that `0.62`-alpha near-neutral text reads as gray-on-color.
- **⚠️ #24 tight-leading:** `.kev-air { line-height: 1.08 }` and `.kev-hero-title { line-height: 1.06 }` are below 1.3 — but the detector exempts headings (`h1`–`h6`) and short text (`textLen ≤ 50`). Titles are headings → PASS. The risk is only if `.kev-air` is applied to a non-heading multi-line block >50 chars. Confine `.kev-air` to headings.
- **⚠️ #27 tiny-text:** `--crosshair__mark font-size: 11px`. It is `aria-hidden` decorative and in no body context → detector PASS. Fine.
- **Qualitative ⚠️ em dash:** copy `Medellín · Miami · CDMX — 2026` and `Kev — Photographer & Director` use the em dash. SKILL.md bans em dashes (and `--`). Swap for a colon, comma, or middot.
- **Strengths:** corner-anchoring (anti `everything-centered`), `scaleX/scaleY` line draw (anti `layout-transition`), `--ink-on-dark #F2EFEA` not `#fff` (anti `pure-black-white` law), explicit contrast math, full reduced-motion guards. Cleanest font-aside proposal.

### B · proposal-styles.md — "Numinous Editorial Monochrome"
**Avoidable deterministic FAILs: 0. Systemic FAILs: 2 (font). WARNs: 7.**

- **❌ #3 / #4 (systemic, mandated):** Archivo only. See §6.
- **⚠️ #15 hero-eyebrow-chip + #16 repeated-section-kickers:** Variant A explicitly sets the Home top-label to `.kev-paren`: `( Photographer & Director )` and lowers section heads (`Photography`, `Overview`, `Video`) to `--w-light`. If those section labels are rendered as small tracked-caps kickers above each section `h1`, the `repeated-section-kickers` rule (≥3 instances) fires. The paren-tagline-above-h1 also risks `hero-eyebrow-chip`. **Render them as the actual section `h1` (light, large), not as eyebrow kickers above a second heading.**
- **⚠️ #18 / #19 contrast:** `--ink-on-field-2: #8A8A8A` (`rgb(138,138,138)`) on `--field #0D0D0D` = ~5.0:1 — passes body AA on solid black, but `#8A8A8A` is a *true neutral gray*; placed over the Overview "celda a sangre sobre campo negro" that also carries a photo, it can become gray-on-color. On the Home full-bleed it sits over a photo via `.kev-bleed::after` scrim (`0.34`→`0.40`); a `0.34` scrim over a bright still leaves `#8A8A8A` well under 4.5:1. **Verify; prefer `--ink-on-field #E8E8E8` for all over-image secondary text.**
- **⚠️ #22 cramped-padding / #23 body-text-viewport-edge:** Overview field cell uses `padding: 18px` (fine), but `.kev-bleed__bl { left: var(--pad-x) }` anchors text to the gutter — PASS as long as `--pad-x ≥ 16px`. Confirm `--pad-x` is ≥16px at mobile (the detector flags <16px horizontal).
- **⚠️ #27 tiny-text / #29 wide-tracking:** `.kev-scatter { font-size: 12px; letter-spacing: .12em }` and `--grid-mark: 10px`. Scatter spans are single letters (`K`,`E`,`V`), textLen ≤ 20, decorative → detector PASS on both. The `.kev-scatter` color `rgba(232,232,232,.5)` over image is decorative; not body. OK.
- **Qualitative ⚠️ em dash:** `Medellín · Miami · CDMX — 2026`. Same fix.
- **Strengths:** strongest formal grounding (maps to 3 named UI styles), explicit `--ink-on-field #E8E8E8` (anti `pure-black-white`), `scaleY/scaleX` grid draw with `!important` reduced-motion reset, scrim "only under text" (anti glassmorphism). The `#8A8A8A` secondary is the one token to retire.

### C · proposal-variants.md — "Hara / Field.io / Pentagram"
**Avoidable deterministic FAILs: 2 (pure-black-white law, low-contrast). Systemic FAILs: 2 (font). WARNs: 6.**

- **❌ #3 / #4 (systemic, mandated):** Archivo only. See §6.
- **❌ #17 pure-black-white (qualitative law):** Variant B's `app/page.tsx` and CSS hard-code `color: #fff` on `.kev-home__tl, .kev-home__title, .kev-home__menu, .kev-home__foot, .kev-home__tagline` and `.kev-home--bleed .kev-menulist__item { color: #fff }`. SKILL.md: "Never use `#000` or `#fff`. Tint every neutral toward the brand hue." Proposals A/D/E all use a *warm* near-white (`#F2EFEA`/`#F2F0EC`/`#F4F2EF`); C regresses to pure `#fff`. **Concrete fix: replace every `#fff` with `--field-ink #E8E8E8` (which C already defines) or a warm `#F2F0EC`.** Note: the *deterministic* `pure-black-white` detector only fires on pure-black *background*, so `color:#fff` won't trip the CLI — but it is a clear violation of the named impeccable color law and of the brief's own "blanco fino cálido (no #FFF puro)" note in the sibling proposals. Marked FAIL on the qualitative law.
- **❌ #19 low-contrast:** Variant C "Cinema" puts the orange client tags and white-fine lists over `#0D0D0D` and admits `#FF4D17 on #0D0D0D = ~4.7:1, justo en el umbral`. That is the *aesthetic* proposal's number, but C's variants doc pushes the orange onto dark fields more aggressively (Work index list "blanca-fina sobre negro" + tags). `rgb(255,77,23)` on `#0D0D0D` computes to ~4.6:1 — it *passes* AA-large (3:1) but **fails AA-normal (4.5:1) for small tag text** depending on tag font size. Tag text is small. **FAIL for small orange tag text on dark; fix by using a solid orange chip with paper text (the proposal's own escape hatch) rather than orange text on dark.**
- **⚠️ #20 layout-transition:** Variant B chapter is `min-height: 100dvh` and "scroll → entra la Gallery"; the chapter itself isn't animated (PASS), but Pentagram's "una palabra del menú gigantísima rota lentamente entre las 4 (cross-fade)" must be opacity-only, not a size/`font-size` transition. As written it's a cross-fade → PASS, but flag the implementer to avoid animating `font-size`.
- **⚠️ #22 cramped-padding:** `.kev-chapter { padding: ... var(--pad-x) 8vh }` is fine; Hara's matted image "flota en blanco" needs the counter not to touch the edge — confirm `--pad-x`.
- **⚠️ #24 tight-leading:** `.kev-home__title { line-height: 1.18 }` (PASS, heading) and Hara titles. OK; only watch non-heading light blocks.
- **⚠️ #27 tiny-text:** crosshair mark `font-size: 11px` (`.kev-crosshair__mark`) — decorative `aria-hidden` → PASS.
- **Qualitative ⚠️ em dash:** multiple (`Medellín · Miami · CDMX — 2026`, `Stillness in motion` fine; `Latin culture.` fine). Fix the em-dash credit line.
- **Strengths:** three genuinely distinct theses (passes the "vary across projects" law), `--field-ink #E8E8E8` defined, diagonal-hairline and chapter are full-bleed (not nested cards). The single biggest fixable defect is the `#fff` literal regression in Variant B + orange-on-dark small text in Variant C.

### D · proposal-references.md — "Crosshair Atlas"
**Avoidable deterministic FAILs: 1 (hero-eyebrow-chip) + tight-leading. Systemic FAILs: 2 (font). WARNs: 9.**

- **❌ #3 / #4 (systemic, mandated):** Archivo only. See §6.
- **❌ #15 hero-eyebrow-chip:** the Home (Variant C) markup wraps the descriptor as `<span className="kev-caps"><span className="kev-bracket">Photographer & Director</span></span>` placed at `.kev-hero__tl` *above* the menu/title, and Photography uses `<h1 className="kev-hero__tl kev-hero__title">Photography</h1>` with `<p className="kev-hero__bl kev-sub">`. The combination "`kev-caps` (uppercase tracked label) directly above a hero heading" is exactly the `hero-eyebrow-chip` shape (`siblingTextTransform: uppercase` + small + above h1). The detector branch A fires on tracked-caps ≤14px above an `h1`. **`kev-caps` is uppercase; if its letter-spacing ≥1.6px and it sits above the h1, this FAILS.** Fix: integrate the kicker into the headline or move it to TR/BR, and avoid `kev-caps` immediately above the hero `h1`.
- **❌/⚠️ #24 tight-leading:** `.kev-hero__title { line-height: 1.04 }` — heading, exempt → PASS by detector. But the Information bio "gran bloque de texto Light" in Light weight has no specified line-height; Light type needs *more* leading, and the proposal doesn't set it. If the bio inherits a <1.3 ratio on a >50-char non-heading block, it FAILS. **Set bio `line-height ≥ 1.5`.** Marked WARN→watch.
- **⚠️ #10 everything-centered:** Crosshair intersection is centered by design (decorative). Text is corner-anchored (good). PASS, but the Pentagram-style "número de cartel gigante detrás/junto" risks centered big numerals reading as a centered-everything layout if overused. Keep numerals corner/edge-aligned.
- **⚠️ #16 repeated-section-kickers:** Information "encabezado de cada columna (CLIENTS / SERVICES / CONTACT) gana brackets" — three bracketed uppercase column heads. These are column labels inside a 3-col block, not section kickers above headings, so the ≥3-kickers-above-headings rule should NOT fire. But if they are tracked-caps and read as scaffolding, it edges toward the advisory. Low risk.
- **⚠️ #18 / #19 contrast:** `--hair-on-media: rgba(242,240,236,0.34)` is for hairlines (non-text, OK). `--paper-on-ink #F2F0EC` on `#0D0D0D` ≈ 16:1 (PASS). The crosshair `__mark` uses `--paper-on-ink` over a *photo* with **no scrim local to the mark** and `background: transparent` (line 189) — over a light photo region the 13px heavy mark can drop below 4.5:1. **Add a local chip bg or constrain to dark quadrants.**
- **⚠️ #20 layout-transition:** only `opacity` transitions on `.kev-crosshair` (`transition: opacity`) — PASS, this is the safest motion approach of all five.
- **⚠️ #21 line-length / #23 body-text-viewport-edge:** Information bio on white "documento" — ensure a 65–75ch cap; the proposal doesn't state one. WARN.
- **⚠️ #22 cramped-padding:** crosshair `__mark { padding: 0 7px }` (decorative, fine). Chapter credits at `.kev-hero__br` use `--pad-x` (fine).
- **⚠️ #27 tiny-text:** `--cross-mark`/mark `13px` decorative; `.kev-scatter { font-size: 14px }` (≥12, PASS).
- **Qualitative ⚠️ em dash:** `Medellín · Miami · CDMX — 2026`, `( Less Noise. More Meaning. )` fine. Fix credit line.
- **Strengths:** the most rigorous reference-to-rule derivation (R1–R7), opacity-only motion (zero `layout-transition` risk), explicit "diagonal NOT adopted globally" restraint, warm `#F2F0EC` ink (anti `pure-black-white`), full reduced-motion. The `kev-caps`-above-`h1` eyebrow is its one clear deterministic FAIL.

### E · proposal-components.md — "Crosshair atmosférico"
**Avoidable deterministic FAILs: 1 (layout-transition). Systemic FAILs: 2 (font). WARNs: 8.**

- **❌ #3 / #4 (systemic, mandated):** Archivo only. See §6.
- **❌ #20 layout-transition:** §7 PlayerCard progress head: `.kev-player__prog span::after` is a 9px circular head, but the progress fill itself is the existing v1 bar; the **risk** is the progress span animating `width`. More concretely, the proposal's only explicit transitions are `opacity` and `transform: scaleX/scaleY` (good) — EXCEPT the mobile work-row accent bar: `.kev-work__row::before { height: 0; transition: height .25s }` then `:active::before { height: 60% }`. **Animating `height` is a `layout-transition` FAIL.** Fix: animate `transform: scaleY()` from a fixed-height bar instead of animating `height`.
- **⚠️ #1 side-tab (BORDER_SAFE_TAGS note):** the mobile work-row accent `.kev-work__row::before { width: 2px; background: var(--accent) }` is a 2px colored left bar on a list row. The deterministic `side-tab` rule fires on `border-left ≥ 2px` colored, OR (in the browser path) a side accent on a ≥20×20 element. This is a *pseudo-element* bar, not a `border-left`, so the CSS-regex `side-tab` patterns (`border-l-`, `border-left:`) won't match it — **deterministic PASS**, but it is *visually* the side-stripe-accent anti-pattern that SKILL.md's "absolute ban" names ("colored accent stripe... on list items"). **WARN: it reads as the exact thing the ban describes; replace with the orange appearing on the row text/`→` instead of a left stripe.**
- **⚠️ #15 hero-eyebrow-chip:** Home `<h1 className="kev-atmos">KEV® / Photographer / & Director</h1>` — the `®` and structure are inside the h1 (good, integrated, not an eyebrow). But `data-cnr="tl"` header wrapping the h1 plus a separate `kev-paren` tagline at BL is fine. The risk: if any `kev-caps`/tracked label gets placed above `kev-atmos`. Currently none → PASS-leaning WARN.
- **⚠️ #18 / #19 contrast:** `--on-dark-2: rgba(244,242,239,0.62)` and `--on-dark-3: rgba(244,242,239,0.34)`. `on-dark-3` at 0.34 alpha over `#0D0D0D` ≈ 4.9:1 (borderline body) and **fails over any photo** without a strong scrim. The scrim `--scrim-top 0.45→0 at 42%`, `--scrim-bottom 0.50→0 at 38%` is stronger than others (good). But `--on-dark-3` is used where? The proposal lists it as a token; ensure it is hairline/decorative only, never body text. **WARN: forbid `--on-dark-3` for any real text.**
- **⚠️ #22 cramped-padding:** `.kev-chapter__lede { left: var(--pad-x) }` fine; `kev-cross__mark { padding: 0 6px }` decorative.
- **⚠️ #26 justified-text:** not used, but Information "prosa bio en peso fino" — confirm not `text-align: justify` (no hyphens). WARN only as a guard.
- **⚠️ #27 tiny-text:** `--cross-mark: 11px` decorative `aria-hidden` → PASS. Player `Play` center is `--fs-h3` (large, PASS).
- **⚠️ #29 wide-tracking:** `.kev-paren { letter-spacing: .01em }` (PASS, <0.05). Player center `letter-spacing: .02em` (PASS).
- **Strengths:** most complete component spec; `--ease-draw cubic-bezier(0.16,1,0.3,1)` is a proper ease-out (y-values in [0,1] → anti `bounce-easing` PASS), all draw-ins use `scaleX/scaleY` (anti `layout-transition`) EXCEPT the work-row height bug, warm `#F4F2EF` ink, explicit contrast math (`17:1`, `9:1`), comprehensive reduced-motion. The `height` transition and the 2px accent stripe are the two fixes.

---

## 4. Cross-cutting concrete violations (apply to ALL proposals)

1. **`overused-font` + `single-font` (deterministic FAIL ×2, systemic):** Archivo and Helvetica are both on impeccable's `OVERUSED_FONTS`; one-font-only trips `single-font`. **This is a hard, unavoidable conflict between impeccable's defaults and a non-negotiable LOCKED RULE.** See §6 for the ruling. No proposal should "fix" this by adding a second font or swapping the grotesque.

2. **Em-dash in copy (qualitative ban, ALL 5):** every proposal's credit line uses `Medellín · Miami · CDMX — 2026`. SKILL.md: "No em dashes. Use commas, colons, semicolons, periods, or parentheses." **Fix globally: `Medellín · Miami · CDMX, 2026` or `Medellín · Miami · CDMX · 2026`.**

3. **Contrast over photos (`low-contrast`/`gray-on-color`, WARN→FAIL risk, ALL 5):** every secondary-text token at alpha 0.30–0.62 over a *warm photo* is unverifiable from the spec and is the single highest-probability runtime FAIL. **Mandate: (a) secondary over-image text uses ≥0.7 alpha of a warm near-white; (b) all over-image text sits inside a scrim region that guarantees ≥4.5:1 at the text's actual position, not just at the gradient's darkest stop.** The visual-eval round must measure this per image, per breakpoint.

4. **Orange on dark (`low-contrast`, FAIL for small text):** `#FF4D17` on `#0D0D0D` ≈ 4.6:1 — fails AA-normal (4.5:1) for small tag text. Wherever client tags land on a dark field (Variant C especially), use a **solid orange chip with paper text**, never orange text on dark. (The aesthetic + variants proposals both already flag this; make it a hard rule.)

---

## 5. Ranking (impeccable-compliance, font-conflict held constant)

All five share the two mandated font FAILs equally, so they don't discriminate. Ranking by *avoidable* deterministic FAILs + WARN density + qualitative-law adherence:

1. **A · aesthetic ("Cámara Oscura")** — 0 avoidable FAILs, lowest WARN count, warm ink, explicit contrast math, cleanest motion. **Most impeccable-compliant.**
2. **B · styles ("Editorial Monochrome")** — 0 avoidable FAILs; only liability is the `#8A8A8A` neutral-gray secondary (retire it) and possible kicker stacking.
3. **E · components** — 1 avoidable FAIL (`height` transition), 1 visual side-stripe WARN; otherwise the most thorough and motion-correct.
4. **D · references ("Crosshair Atlas")** — 1 avoidable FAIL (`kev-caps` eyebrow above hero h1), strongest derivation, opacity-only motion; fix the eyebrow + bio leading.
5. **C · variants ("Hara/Field/Pentagram")** — 2 avoidable FAILs (`#fff` literals in Variant B; orange-on-dark small text in Variant C). Best conceptual range, but the most cleanup. Easily lifted to #1–2 by swapping `#fff`→`#E8E8E8`/`#F2F0EC` and chipping the tags.

> Note: B/D/E all converge on the same canonical "Field.io / Chapters / Crosshair" fusion and recommend it; A is the safest; C offers the widest selectable range. Synthesizer guidance: take **A's warm-ink + contrast discipline** as the token floor, **B/D/E's crosshair system** as the structure, and **explicitly forbid**: `#fff`/`#000` literals, `height`/`width`/`padding`/`margin` transitions, side-stripe accent bars, orange-text-on-dark, em dashes, and any tracked-caps kicker directly above a hero `h1`.

---

## 6. The unavoidable rule conflict: `overused-font` + `single-font` vs LOCKED RULE

impeccable's `OVERUSED_FONTS` set explicitly contains **both `helvetica` and `arial`**, and now the "newer monoculture" (`geist`, `inter`, `space grotesk`, etc.). `single-font` fires whenever one family covers the whole page. The KEV brief's LOCKED RULE is the exact opposite: **"UNA tipografía grotesca (Helvetica/Archivo). Sin serifas, sin itálicas, sin segunda fuente."**

These cannot both be satisfied. Resolution, in priority order:

- **The LOCKED RULE wins.** The CONTEXT PACK marks font rules "cero tolerancia," and the project brief is the authoritative design system here; impeccable is the *critic*, not the owner. All five proposals correctly refuse to add a second font.
- **Why the impeccable rule is nonetheless defused in spirit:** impeccable's `overused-font` rationale is "no longer feels distinctive / gives no personality." KEV recovers distinctiveness *not* through a second face but through (a) the **weight inversion** (Light 300 titulars vs Heavy 800 wordmark) every proposal introduces, and (b) the **crosshair + paréntesis + scatter** brand system. That is a legitimate impeccable-aligned answer to "create typographic hierarchy" (the `single-font` remedy is literally "create typographic hierarchy" — which weight-contrast does).
- **Action:** treat #3 and #4 as **WAIVED-BY-BRIEF**, not as defects to remediate. The deterministic CLI will always report them; the human/orchestrator should suppress these two IDs for this repo (e.g. an allowlist) so the signal isn't drowned. Do NOT let any downstream round "fix" them by importing Inter/Geist/a serif — that would trade a waived-by-brief flag for an actual `overused-font` (newer-monoculture) FAIL.

---

## 7. Determinism note

This report applies the impeccable rule *logic* to design specs (CSS/TSX in markdown), not to a rendered DOM. The authoritative deterministic pass must run on the implemented `:3001` build:

```
npx impeccable detect http://localhost:3001
npx impeccable detect http://localhost:3001/video
npx impeccable detect http://localhost:3001/work/<slug>
```

Expected residual after implementing the fixes in §3–§4: only the two WAIVED-BY-BRIEF font IDs (#3, #4) plus any per-image contrast findings that the visual-eval round must resolve against the real KEV media. Every other rule should report clean if the synthesizer adopts §5's guidance.
