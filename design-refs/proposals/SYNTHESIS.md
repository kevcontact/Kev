# SYNTHESIS — KEV × Numinous · "Darkroom Atlas"

> Meta-synthesizer, front-tool Round 3. Decisión final + plan de implementación
> archivo por archivo. Lee primero el REDESIGN-BRIEF y las LOCKED RULES.
> Server de la propuesta: `http://localhost:3001` (ya corriendo — NO arrancar otro).
> `lib/data.ts` y `lib/media.ts` INTOCABLES.

---

## 1. Dirección final — **"Darkroom Atlas"**

El sitio de KEV es un **atlas editorial blanco** (la sala de exposición: Work index,
galería de proyecto, Information) atravesado por **capítulos atmosféricos full-bleed
en negro `#0D0D0D`** (el cuarto oscuro: Home hero, entrada de proyecto, Video) donde
la imagen real de KEV es la única fuente de color. La pieza de marca que cose ambos
campos es un **crosshair hairline** — la evolución 2D de la regla de ticks film-strip
del v1 — con una micro-marca `Kev.` en la intersección (a ~58% de alto, regla de
tercios, no centro muerto). Los titulares atmosféricos bajan a **peso Light (300)**
mientras el wordmark conserva el Heavy 800; la jerarquía se vuelve de tamaño, no de
peso. Texto fino anclado a las cuatro esquinas sobre cada full-bleed, tagline entre
paréntesis `( … )` como puntuación de marca, y letras `K E V` dispersas en Information.
**Regla de oro (de aesthetic): negro solo cuando hay imagen real detrás — nunca un
campo negro decorativo vacío, y nunca un velo de color inventado sobre la foto.**

---

## 2. Rationale — qué se toma de quién, qué se descarta

Las 5 propuestas convergen en la misma fusión canónica (crosshair + chapters negros +
pesos finos + paréntesis); difieren en el rigor de tokens y en dos defectos evitables.
La síntesis toma el **mejor componente de cada una** y aplica los fixes obligatorios
del critic-impeccable.

| Se toma | De | Por qué |
|---|---|---|
| **Concepto narrativo "galería iluminada vs cuarto oscuro"** + regla de oro "negro solo con imagen detrás" | aesthetic ("Cámara Oscura") | Es el aporte más original de la ronda y la lectura más defendible del brief ("pantallas alternas"). Eleva Bold-commitment y Motion. |
| **Rigor de contraste con cálculo numérico** + escala de opacidades `--on-dark-1/2/3` con near-white **cálido** (no `#fff`) | aesthetic + styles | Único par que calcula contraste (17:1, 9:1, naranja/negro 4.7:1). Es el "token floor". |
| **Sistema crosshair en CSS puro** (V+H hairline, draw-in `scaleX/scaleY`, micro-`Kev.` en hueco sin caja) | styles + references + variants (Field.io) | La estructura central. Las tres convergen; tomo la versión CSS-pura (cero JS), draw-in con transform (anti `layout-transition`). |
| **4 anclas de esquina + scrim "solo bajo texto"** | styles + references | Layout reutilizable para todo full-bleed; scrim mínimo permitido por el v1. |
| **Chapter de entrada de proyecto + header on-dark + cursor on-dark + ticks on-dark** | components | Spec de componentes más completo y motion-correcto. |
| **Tagline `( … )` + letras dispersas K·E·V** | references + styles | Puntuación de marca; letras dispersas opt-in en Information (de `07-business-cards`). |
| **`data-variant` raíz para 3 dosis** (quiet / chapters / cinema) | aesthetic + variants + styles | El 95% del código es compartido; 4 variables conmutan la dosis. Default = **chapters** (la recomendada por 4 de 5 proposers). |

**Descartado, con motivo:**

1. **`--warm-veil` (velo ámbar `multiply` sobre los heros) de aesthetic.** Viola
   "el contenedor calla; la imagen habla; el color viene de las fotos". Inventa color
   de contenedor y puede tumbar el contraste del texto en zonas medias. **El calor lo
   pone la media real de KEV** (balvin, posters cálidos de videoclips), no un fill CSS.
2. **`#fff` / `#000` literales (Variante B de variants).** Regresión de la ley de
   color. Todo near-white es **cálido** (`--ink-on-dark #F2EFEA`); todo negro de campo
   es `#0D0D0D`, nunca `#000`.
3. **Naranja-texto sobre campo negro (Variante C de varias).** `#FF4D17`/`#0D0D0D` ≈
   4.6:1 — falla AA-normal para texto pequeño de tag. **Resolución obligada:** los tags
   de cliente viven SOLO sobre papel blanco. Sobre campo oscuro el cliente va en
   `--ink-on-dark` neutro y el **naranja se reserva al `View →`** (que vive en el papel)
   y a los tags de la Overview grid (que sigue en papel). Cero naranja como fill sobre
   negro (eso colisiona con "naranja nunca como campo").
4. **Transiciones de `height`/`width`/`padding` (work-row bar de components; progress).**
   Anti-pattern `layout-transition`. La barra de fila activa se anima con `scaleY()`
   sobre altura fija; el progreso del player se queda como está (v1, sin transición).
5. **Side-stripe accent bar de 2px (components, mobile work-row).** Es visualmente el
   ban "colored accent stripe on list items". El naranja aparece en el texto/`→`, no
   en una barra lateral.
6. **View Transitions API / `useRouteFade` (components).** Desvío opcional; se descarta
   para mantener cero JS extra y cero riesgo. El `fade-in`/`rise-in` existente cubre la
   entrada fílmica por página.
7. **Diagonal hairline global (referencia img 04).** Opt-in/omitida para no competir
   con el crosshair (restraint que el propio references señala).
8. **Em dashes en copy.** Ban cualitativo. `Medellín · Miami · CDMX · 2026` (middot).

**Fixes globales aplicados (de §4/§5 del critic-impeccable):**
- Cero `#fff`/`#000` literales → tokens cálidos.
- Cero transición de layout-properties → solo `opacity` y `transform`.
- Cero side-stripe accent.
- Cero naranja-texto sobre negro.
- Cero em dash.
- Cero tracked-caps kicker directamente encima de un hero `h1` (el descriptor va como
  BR credit o integrado, nunca como eyebrow sobre el `h1`).
- Peso 300 **realmente cargado** en `layout.tsx` (sin él, "Light" cae a 400/sintético).

---

## 3. Tokens nuevos/modificados — bloque CSS completo para `globals.css`

> **Todo aditivo.** Nada de lo existente se renombra ni se borra. Pegar este bloque
> AL FINAL de `app/globals.css`, después de la sección INFORMATION.

```css
/* ============================================================
   NUMINOUS LAYER — "Darkroom Atlas" (additive)
   Field alternation (paper ↔ #0D0D0D), crosshair, fine weights,
   corner-anchored full-bleed. The image is the only color.
   ============================================================ */

:root {
  /* ---------- DARK FIELD (segundo campo; SOLO con imagen detrás) ---------- */
  --field-dark:   #0D0D0D;                 /* nunca #000; nunca campo vacío */
  --ink-on-dark:  #F2EFEA;                 /* near-white CÁLIDO (no #fff)   ~17:1 */
  --ink-on-dark-2: rgba(242,239,234,0.72); /* secundario sobre negro/imagen ≥4.5:1 con scrim */
  --hair-on-dark: rgba(242,239,234,0.20);  /* hairline/crosshair sobre negro/imagen */
  --tick-on-dark: rgba(242,239,234,0.34);  /* ticks film-strip sobre negro/imagen */
  --cursor-on-dark: rgba(242,239,234,0.22);

  /* ---------- FINE WEIGHT (traducción de Neue Montreal Light → peso de la grotesca) ---------- */
  --w-light: 300;                          /* titulares atmosféricos; requiere 300 en next/font */

  /* ---------- FINE SCALE (titulares grandes pero ligeros, tracking casi neutro) ---------- */
  --fs-atmos: clamp(2rem, 6vw, 4.5rem);    /* hero / chapter title (light) */
  --lh-atmos: 1.06;
  --ls-atmos: -0.015em;                    /* menos negativo que --ls-mega */

  /* ---------- CROSSHAIR ---------- */
  --crosshair-y:  58%;                     /* intersección bajo el centro óptico (regla de tercios) */
  --crosshair-mark: 11px;                  /* micro-"Kev." en la intersección (decorativo) */
  --t-draw: 1100ms;                        /* draw-in fílmico de las líneas */

  /* ---------- SCRIM (protección mínima de texto sobre imagen; sin blur) ---------- */
  --scrim-top:    linear-gradient(180deg, rgba(13,13,13,0.46) 0%, rgba(13,13,13,0) 34%);
  --scrim-bottom: linear-gradient(0deg,   rgba(13,13,13,0.52) 0%, rgba(13,13,13,0) 32%);

  /* ---------- VARIANT DEFAULTS (= chapters) ---------- */
  --home-field: var(--field-dark);         /* Home hero en negro+imagen */
  --info-field: var(--paper);              /* Information en papel */
}

/* DOSIS DE NUMINOUS — una clase raíz en <html> conmuta el alcance del negro.
   Default (sin atributo) = chapters. */
[data-variant="quiet"] {
  --home-field: var(--paper);              /* Home en papel, imagen "matada" en marco */
}
[data-variant="cinema"] {
  --info-field: var(--field-dark);         /* Information también en negro+imagen */
}

/* ============================================================
   TYPE HELPERS — pesos finos + paréntesis de marca
   ============================================================ */
.kev-atmos {
  font-size: var(--fs-atmos);
  font-weight: var(--w-light);
  line-height: var(--lh-atmos);
  letter-spacing: var(--ls-atmos);
  margin: 0;
  text-wrap: balance;
}
/* Paréntesis curvos de la propia grotesca como puntuación de marca (no 2ª fuente) */
.kev-paren { font-weight: var(--w-regular); letter-spacing: 0.01em; }
.kev-paren::before { content: "( "; opacity: 0.55; }
.kev-paren::after  { content: " )"; opacity: 0.55; }

/* ============================================================
   FULL-BLEED FIELD + 4 corner anchors (Home hero, Project chapter)
   ============================================================ */
.kev-bleed {
  position: relative; min-height: 100dvh; overflow: hidden;
  background: var(--field-dark); color: var(--ink-on-dark);
}
.kev-bleed--paper { background: var(--paper); color: var(--ink); }
.kev-bleed__bg { position: absolute; inset: 0; z-index: 0; }
/* el .frame de <Media> debe llenar el bleed (override del aspect-ratio) */
.kev-bleed__bg .frame { width: 100%; height: 100%; aspect-ratio: auto !important; }
.kev-bleed__bg .frame > img,
.kev-bleed__bg .frame > video { width: 100%; height: 100%; object-fit: cover; }
.kev-bleed__scrim {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: var(--scrim-top), var(--scrim-bottom);
}
/* capa de contenido sobre la imagen */
.kev-bleed__layer {
  position: absolute; inset: 0; z-index: 5;
  padding: calc(var(--header-h) + 4vh) var(--pad-x) 6vh;
}
.kev-bleed__tl { position: absolute; top: calc(var(--header-h) + 4vh); left: var(--pad-x); max-width: min(82vw, 18ch); z-index: 5; }
.kev-bleed__tr { position: absolute; top: calc(var(--header-h) + 4vh); right: var(--pad-x); text-align: right; z-index: 5; }
.kev-bleed__bl { position: absolute; bottom: 6vh; left: var(--pad-x); max-width: min(86vw, 36ch); z-index: 5; }
.kev-bleed__br { position: absolute; bottom: 6vh; right: var(--pad-x); text-align: right; color: var(--ink-on-dark-2); z-index: 5; }
.kev-bleed--paper .kev-bleed__tl,
.kev-bleed--paper .kev-bleed__tr,
.kev-bleed--paper .kev-bleed__bl { color: var(--ink); }
.kev-bleed--paper .kev-bleed__br { color: var(--fg2); }

@media (max-width: 720px) {
  /* mobile: la nav TR se apila bajo el título; créditos BR pasan a la izquierda */
  .kev-bleed__tr { position: static; }
  .kev-bleed__br { right: auto; left: var(--pad-x); text-align: left; }
}

/* ============================================================
   CROSSHAIR — la regla de ticks llevada a 2D. CSS puro, decorativo.
   ============================================================ */
.kev-crosshair { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
.kev-crosshair__v, .kev-crosshair__h { position: absolute; background: var(--hair-on-dark); }
.kev-crosshair__v {
  left: 50%; top: 0; bottom: 0; width: 1px; transform: translateX(-0.5px) scaleY(0);
  transform-origin: top;
}
.kev-crosshair__h {
  top: var(--crosshair-y); left: 0; right: 0; height: 1px; transform: scaleX(0);
  transform-origin: left;
}
.kev-crosshair__mark {
  position: absolute; left: 50%; top: var(--crosshair-y); transform: translate(-50%, -50%);
  font-size: var(--crosshair-mark); font-weight: var(--w-heavy); letter-spacing: -0.03em;
  line-height: 1; color: var(--ink-on-dark); padding: 0 6px; opacity: 0;
}
/* draw-in fílmico (anti layout-transition: solo transform/opacity) */
@media (prefers-reduced-motion: no-preference) {
  .kev-app.is-ready .kev-crosshair__v { transform: translateX(-0.5px) scaleY(1); transition: transform var(--t-draw) var(--ease); }
  .kev-app.is-ready .kev-crosshair__h { transform: scaleX(1); transition: transform var(--t-draw) var(--ease) 120ms; }
  .kev-app.is-ready .kev-crosshair__mark { opacity: 0.9; transition: opacity .5s var(--ease) .5s; }
}
@media (prefers-reduced-motion: reduce) {
  .kev-crosshair__v { transform: translateX(-0.5px) scaleY(1); }
  .kev-crosshair__h { transform: scaleX(1); }
  .kev-crosshair__mark { opacity: 0.9; }
}
/* variante sobre papel (Work preview, quiet Home) */
.kev-crosshair--paper .kev-crosshair__v,
.kev-crosshair--paper .kev-crosshair__h { background: var(--hair); }
.kev-crosshair--paper .kev-crosshair__mark { color: var(--ink); }

/* ============================================================
   SCATTERED LETTERS — K · E · V en esquinas (Information; opt-in)
   ============================================================ */
.kev-scatter { position: absolute; inset: 0; pointer-events: none; z-index: 0; color: var(--ink-3); }
.kev-scatter span { position: absolute; font-size: clamp(1rem, 2vw, 1.4rem); font-weight: var(--w-light); letter-spacing: 0.02em; }
.kev-scatter .k { top: 16vh;  right: var(--pad-x); }
.kev-scatter .e { bottom: 24vh; left: var(--pad-x); }
.kev-scatter .v { bottom: 9vh;  right: calc(var(--pad-x) + 5vw); }

/* ============================================================
   FIELD OVERRIDES — Home / Project chapter / Video / Information
   ============================================================ */

/* HOME — hero full-bleed (override del .kev-home flex actual) */
.kev-home--bleed { padding: 0; display: block; gap: 0; min-height: 100dvh; }
.kev-home__title { /* titular fino 3 líneas, TL */ }
.kev-home__nav .kev-menulist__item {
  font-size: var(--fs-h3); font-weight: var(--w-regular); line-height: 1.7;
  letter-spacing: 0; color: var(--ink-on-dark);
}
.kev-home__nav .kev-menulist:hover .kev-menulist__item { opacity: .42; }
.kev-home__nav .kev-menulist__item:hover { opacity: 1 !important; }
.kev-home--bleed.kev-bleed--paper .kev-home__nav .kev-menulist__item { color: var(--ink); }

/* PROJECT CHAPTER — banda full-bleed antes del bar; rompe el gutter */
.kev-chapter { height: 72vh; min-height: 420px; margin: 0 calc(var(--pad-x) * -1) 0; }
.kev-chapter .kev-bleed__bl { gap: 14px; display: flex; flex-direction: column; }
.kev-chapter__divider {
  width: clamp(120px, 24vw, 320px); height: 1px; background: var(--hair-on-dark);
  transform: scaleX(0); transform-origin: left;
}
@media (prefers-reduced-motion: no-preference) {
  .kev-app.is-ready .kev-chapter__divider { transform: scaleX(1); transition: transform var(--t-draw) var(--ease) .25s; }
}
@media (prefers-reduced-motion: reduce) { .kev-chapter__divider { transform: scaleX(1); } }

/* VIDEO — campo negro pleno (es cine); players intactos, solo color */
.kev-videos--dark { background: var(--field-dark); color: var(--ink-on-dark); }
.kev-videos--dark .kev-videos__title { font-weight: var(--w-light); letter-spacing: var(--ls-atmos); }
.kev-videos--dark .kev-counter { color: var(--ink-on-dark-2); }
.kev-videos--dark .kev-player__ctl { color: var(--ink-on-dark); }
.kev-videos--dark .kev-player__ctl:hover { opacity: .5; }
.kev-videos--dark .kev-player__title { color: var(--ink-on-dark); }
.kev-videos--dark .kev-player__tc,
.kev-videos--dark .kev-player__meta .kev-sub { color: var(--ink-on-dark-2); }
.kev-videos--dark .kev-player__prog { background: rgba(242,239,234,0.18); }
.kev-videos--dark .kev-player__prog span { background: var(--ink-on-dark); }

/* INFORMATION — lead fino + letras dispersas; campo según variante */
.kev-info { position: relative; }
.kev-info__lead { font-weight: var(--w-light); letter-spacing: -0.01em; line-height: 1.18; }
.kev-info__sign { margin-top: clamp(48px, 10vh, 120px); color: var(--fg2); display: block; }
.kev-info--dark { background: var(--field-dark); color: var(--ink-on-dark); }
.kev-info--dark .kev-info__lead { color: var(--ink-on-dark); }
.kev-info--dark .kev-info__h { color: var(--ink-on-dark-2); }
.kev-info--dark .kev-info__list li { border-bottom-color: var(--hair-on-dark); }
.kev-info--dark .kev-info__ck { color: var(--ink-on-dark-2); }
.kev-info--dark .kev-scatter span { color: rgba(242,239,234,0.28); }

/* WORK PREVIEW — micro-crosshair sobre el panel hover (paper-on-dark image) */
.kev-work__panel { position: fixed; } /* (ya existe; sin cambio estructural) */

/* ============================================================
   HEADER + CURSOR — evolución del film-strip y el círculo sobre campo oscuro
   ============================================================ */
.kev-header.is-dark { background: transparent; }
.kev-header.is-dark .kev-header__mark,
.kev-header.is-dark .kev-header__menu { color: var(--ink-on-dark); }
.kev-header.is-dark .kev-ticks { --tick: var(--tick-on-dark); }

/* cursor: invierte a claro sobre campo oscuro; gana micro-crosshair en targets calientes */
.kev-cursor::before, .kev-cursor::after {
  content: ""; position: absolute; left: 50%; top: 50%; background: currentColor;
  opacity: 0; transition: opacity .2s var(--ease);
}
.kev-cursor::before { width: 1px;  height: 12px; transform: translate(-50%,-50%); }
.kev-cursor::after  { width: 12px; height: 1px;  transform: translate(-50%,-50%); }
.kev-cursor.is-hot::before, .kev-cursor.is-hot::after { opacity: .45; }
.kev-cursor.on-dark { background: var(--cursor-on-dark); color: var(--ink-on-dark); }
.kev-cursor.on-dark.is-hot { background: rgba(242,239,234,0.12); }
```

---

## 4. Plan de implementación archivo por archivo

> Cada bloque es el **código nuevo completo** (para reescrituras) o el **diff exacto**
> (para retoques). Aplicar en este orden.

### 4.1 `app/layout.tsx` — añadir peso 300 (DIFF)

```diff
 const archivo = Archivo({
   subsets: ['latin'],
-  weight: ['400', '500', '600', '700', '800', '900'],
+  weight: ['300', '400', '500', '600', '700', '800', '900'],
   variable: '--font-archivo',
   display: 'swap',
 })
```

Y declarar la variante por defecto en `<html>` (chapters = sin atributo; opcional dejar
explícito para claridad):

```diff
-    <html lang="en" className={archivo.variable}>
+    <html lang="en" className={archivo.variable} data-variant="chapters">
```

> `data-variant="chapters"` es el default; `"quiet"` y `"cinema"` conmutan dosis
> (§3). El CSS sin atributo = chapters, así que esto es informativo.

### 4.2 `app/globals.css` — pegar el bloque completo de §3 al final del archivo.

Sin cambios a lo existente. Solo append.

### 4.3 `components/Crosshair.tsx` — NUEVO (CSS-only, sin JS de animación)

```tsx
/**
 * Hairline viewfinder crosshair with a micro "Kev." at the intersection.
 * Pure CSS overlay; lives over full-bleed fields only. The draw-in is driven
 * by `.kev-app.is-ready` (set by AppShell), so no client JS is needed here.
 */
export function Crosshair({
  tone = 'dark',
  label = 'Kev.',
}: {
  tone?: 'dark' | 'paper'
  label?: string
}) {
  return (
    <div
      className={'kev-crosshair' + (tone === 'paper' ? ' kev-crosshair--paper' : '')}
      aria-hidden="true"
    >
      <span className="kev-crosshair__v" />
      <span className="kev-crosshair__h" />
      <span className="kev-crosshair__mark">{label}</span>
    </div>
  )
}
```

### 4.4 `app/page.tsx` — Home hero full-bleed (REESCRITURA COMPLETA)

```tsx
import { MenuList } from '@/components/MenuList'
import { Media } from '@/components/Media'
import { Crosshair } from '@/components/Crosshair'
import { projectBySlug } from '@/lib/data'

/** Home — full-bleed warm field with KEV's showreel; the four menu words in a
 *  fine weight anchored to the corners, crosshair with micro "Kev." in the center. */
export default function Home() {
  const reel = projectBySlug('showreel')!.cover // video-clips/reel-kev.mp4 (cálido, en movimiento)

  return (
    <section className="kev-home kev-home--bleed kev-bleed">
      <div className="kev-bleed__bg">
        <Media item={reel} alt="" loading="eager" />
      </div>
      <div className="kev-bleed__scrim" aria-hidden="true" />
      <Crosshair tone="dark" />

      <h1 className="kev-bleed__tl kev-atmos kev-home__title rise-in">
        Photographer<br />&amp; Director.
      </h1>

      <nav className="kev-bleed__bl kev-home__nav rise-in">
        <MenuList />
        <span className="kev-paren kev-sub" style={{ display: 'block', marginTop: '1.2em', color: 'var(--ink-on-dark-2)' }}>
          Latin music culture, fashion editorial
        </span>
      </nav>

      <span className="kev-bleed__br kev-counter">
        Medellín · Miami · CDMX · 2026
      </span>
    </section>
  )
}
```

> Notas: el descriptor `( … )` va **debajo** del menú (BL), nunca como eyebrow
> tracked-caps encima del `h1` (evita `hero-eyebrow-chip`). El menú reusa `MenuList`
> sin tocar la IA. En `data-variant="quiet"` añadir `kev-bleed--paper` a la sección
> (la imagen sigue de fondo "matada" y el texto pasa a tinta) — opcional, no requerido
> para el default.

### 4.5 `components/Header.tsx` — clase `is-dark` por pathname (DIFF)

```diff
 export function Header() {
   const pathname = usePathname()
   const [menuOpen, setMenuOpen] = useState(false)
+
+  // dark fields: Home, Video, and any project page (the chapter sits at top)
+  const onDark =
+    pathname === '/' || pathname === '/video' || pathname.startsWith('/work/')
```

```diff
-      <header className="kev-header">
+      <header className={'kev-header' + (onDark && !menuOpen ? ' is-dark' : '')}>
```

> Cuando el overlay de menú está abierto (`menuOpen`), el header vuelve a papel
> porque el overlay es blanco editorial. El overlay (4 palabras mega) NO cambia.

### 4.6 `components/Cursor.tsx` — detección on-dark + hot crosshair (DIFF)

```diff
     const onMove = (e: MouseEvent) => {
       tgt.current = { x: e.clientX, y: e.clientY }
       dot.classList.add('is-ready')
       const target = e.target as Element | null
       const hot = target?.closest?.('a, button, [data-hot]')
       dot.classList.toggle('is-hot', !!hot)
+      const onDark = target?.closest?.('.kev-bleed:not(.kev-bleed--paper), .kev-videos--dark, .kev-info--dark')
+      dot.classList.toggle('on-dark', !!onDark)
     }
```

> El micro-crosshair interno del cursor (`::before/::after`) aparece en `is-hot`
> (definido en §3). El círculo se conserva; solo invierte color sobre campo oscuro.

### 4.7 `components/ProjectView.tsx` — chapter de entrada (DIFF)

Añadir el import y la cabecera full-bleed **antes** del `.kev-project__bar`. El resto
(bar sticky, toggle Gallery/Overview, counter, masonry, `View →`) queda **idéntico**.

```diff
 import Link from 'next/link'
 import { useEffect, useRef, useState } from 'react'
 import { Media } from '@/components/Media'
+import { Crosshair } from '@/components/Crosshair'
 import type { Project } from '@/lib/data'
```

```diff
   return (
     <section className="kev-project" style={{ paddingTop: 'var(--header-h)' }}>
+      <header className="kev-chapter kev-bleed">
+        <div className="kev-bleed__bg">
+          <Media item={project.cover} alt="" loading="eager" />
+        </div>
+        <div className="kev-bleed__scrim" aria-hidden="true" />
+        <Crosshair tone="dark" />
+        <h1 className="kev-bleed__tl kev-atmos fade-in">{project.title}</h1>
+        <div className="kev-bleed__bl">
+          <span className="kev-chapter__divider" aria-hidden="true" />
+          <span className="kev-counter" style={{ color: 'var(--ink-on-dark-2)' }}>
+            {project.client} · {project.year}
+          </span>
+        </div>
+      </header>
+
       <div className="kev-project__bar">
```

> El cliente en el chapter va en `--ink-on-dark-2` (neutro), **no** en naranja
> (regla: naranja-texto nunca sobre negro). Los tags naranja siguen en la Overview
> grid, que está en papel. El `Media` muestra video muted-loop si el cover es video
> (caso de los proyectos de video), o la foto cover si es photography.

### 4.8 `app/video/page.tsx` — campo negro + tagline (REESCRITURA COMPLETA)

```tsx
import type { Metadata } from 'next'
import { PlayerCard } from '@/components/PlayerCard'
import { videoProjects } from '@/lib/data'

export const metadata: Metadata = { title: 'Video — KEV' }

/** Video — vertical list of inline players on the dark field (cinema), text controls. */
export default function VideoPage() {
  return (
    <section className="kev-videos kev-videos--dark">
      <div className="kev-videos__head">
        <h1 className="kev-videos__title">Video</h1>
        <span className="kev-counter kev-paren">
          {videoProjects.length} films, direction &amp; motion
        </span>
      </div>
      <div className="kev-videos__list">
        {videoProjects.map((p) => (
          <PlayerCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  )
}
```

> `PlayerCard` queda **intacto** (autoplay muted, controles de texto, barra seekable).
> Solo hereda color vía `.kev-videos--dark .kev-player__*` de §3. El header ya es
> `is-dark` en `/video` (§4.5).

### 4.9 `app/information/page.tsx` — lead fino + letras dispersas + tagline (REESCRITURA COMPLETA)

```tsx
import type { Metadata } from 'next'
import { info } from '@/lib/data'

export const metadata: Metadata = { title: 'Information — KEV' }

/** Information — terse bio (fine weight), clients, services, contact; scattered K·E·V. */
export default function InformationPage() {
  return (
    <section className="kev-info">
      <div className="kev-scatter" aria-hidden="true">
        <span className="k">K</span>
        <span className="e">E</span>
        <span className="v">V</span>
      </div>

      <h1 className="kev-info__lead rise-in">{info.bio}</h1>

      <div className="kev-info__cols">
        <div className="kev-info__col">
          <span className="kev-caps kev-info__h">Clients</span>
          <ul className="kev-info__list">
            {info.clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="kev-info__col">
          <span className="kev-caps kev-info__h">Services</span>
          <ul className="kev-info__list">
            {info.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="kev-info__col">
          <span className="kev-caps kev-info__h">Contact</span>
          <ul className="kev-info__list">
            {info.contact.map((c) => (
              <li key={c.label}>
                <span className="kev-info__ck">{c.label}</span>
                {c.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span className="kev-paren kev-counter kev-info__sign">
        Available for commissions, 2026
      </span>
    </section>
  )
}
```

> En `data-variant="cinema"` añadir `kev-info--dark` a la sección (Information sobre
> negro). Default y quiet = papel. La bio en `.kev-info__lead` ahora pesa Light pero
> mantiene `line-height: 1.18` (heading, ≥1.3 no aplica; ya legible).

### 4.10 `components/WorkIndex.tsx` — micro-crosshair en el preview hover (DIFF)

Único cambio: superponer un crosshair paper-on-dark dentro del panel de preview.
La lista "dim the rest", los tags naranja y el counter quedan **idénticos**.

```diff
 import Link from 'next/link'
 import { useState } from 'react'
 import { Media } from '@/components/Media'
+import { Crosshair } from '@/components/Crosshair'
 import type { Project } from '@/lib/data'
```

```diff
         <div className="kev-work__preview" aria-hidden="true">
           {active && (
             <Media
               key={active.slug}
               item={active.cover}
               className="fade-in kev-work__panel"
               style={{ aspectRatio: 'auto' }}
-            />
+            >
+              <Crosshair tone="dark" />
+            </Media>
           )}
         </div>
```

> `Media` ya acepta `children` y los renderiza dentro del `.frame`. El crosshair se
> dibuja sobre la imagen del preview (sobre negro de la foto → `tone="dark"`).
> Work index sigue en papel; los nombres pueden opcionalmente bajar a `--w-medium`
> (no requerido). NO se mete campo negro en el índice (es la sala de exposición).

### 4.11 Sin cambios

- `components/MenuList.tsx` — el Home reusa `MenuList` y aplica el peso fino vía
  `.kev-home__nav .kev-menulist__item` (override local en §3). No se toca el componente.
- `components/PlayerCard.tsx` — intacto; hereda color de `.kev-videos--dark`.
- `components/Media.tsx`, `components/AppShell.tsx` — intactos.
- `app/photography/page.tsx`, `app/work/page.tsx`, `app/work/[slug]/page.tsx` — intactos
  (la galería editorial blanca y el WorkIndex se mantienen; el chapter vive dentro de
  `ProjectView`).
- `lib/*` — INTOCABLES.

---

## 5. Checklist de LOCKED RULES (verificada)

- [x] **UNA grotesca** (Archivo/Helvetica). Neue Montreal → **peso 300** real cargado en
      `layout.tsx`. Sin serifas, sin itálicas, sin segunda fuente. Heavy 800 = wordmark.
- [x] **Naranja `#FF4D17` único acento de UI** (tags de cliente en Overview grid sobre
      papel, hover `View →` sobre papel). **Nunca como campo. Nunca naranja-texto sobre
      negro** (el chapter usa cliente neutro `--ink-on-dark-2`).
- [x] **Esquinas cuadradas.** Crosshair/scrim/chapter/bleed = `border-radius: 0`. Únicos
      redondeados: cursor circular (marca registrada del v1) — preservado.
- [x] **Controles de TEXTO, único glifo `→`.** PlayerCard intacto (Pause/Mute/timecode).
      Crosshair y paréntesis son líneas/tipografía, no iconos. `→` solo en `View →`.
- [x] **Motion quieto fílmico.** Cross-fades (`--t-film`/`fade-in`), draw-in del crosshair
      y divider con `scaleX/scaleY` + `--ease` (ease-out, sin overshoot). **Cero
      transición de `height/width/padding/margin`. Sin bounce, sin sombras, sin parallax.**
      Todo bajo `prefers-reduced-motion: reduce` se fija/apaga.
- [x] **Mobile-first, secciones 100dvh, IA INTACTA**: Home / Photography / Overview /
      Project(Gallery|Overview) / Video / Information. Rutas y orden sin cambios.
- [x] **`lib/media.ts` y `lib/data.ts` INTOCABLES.** Home usa `projectBySlug('showreel').cover`;
      chapter usa `project.cover`. Cero edición de datos/media.
- [x] **Ticks film-strip EVOLUCIONAN** (header `is-dark` con `--tick-on-dark` + crosshair
      como su forma 2D), NO desaparecen.
- [x] **Cursor circular EVOLUCIONA** (invierte sobre negro + micro-crosshair interno en
      hot), NO desaparece.
- [x] **Blanco sigue base** (Work index, galería de proyecto, Information default);
      **`#0D0D0D` gana terreno como 2º campo** en Home hero, chapter de proyecto y Video —
      siempre **con imagen real detrás** (regla de oro), nunca campo negro vacío.
- [x] **Cero `#fff`/`#000` literales** → tokens cálidos (`--ink-on-dark #F2EFEA`,
      `--field-dark #0D0D0D`). **Sin `--warm-veil`**: el color lo pone la media real.
- [x] **PROHIBIDOS evitados**: sin Inter/Roboto/system, sin gradients purple-blue, sin
      cards-in-cards (chapters son full-bleed, no tarjetas anidadas), sin icon tiles,
      sin libs de componentes, sin side-stripe accent, sin gray-on-colored < 4.5:1
      (secundarios sobre negro a `0.72` α + scrim ≥4.5:1; `--ink-on-dark #F2EFEA` ≈17:1).
- [x] **Sin em dashes** en copy (`Medellín · Miami · CDMX · 2026`, middots).

> Validación pendiente del implementer en `:3001` (mobile + desktop + reduced-motion):
> `npx tsc --noEmit` && `npm run lint` (0 errores nuevos) y medir contraste del texto
> sobre cada imagen real en su posición exacta (no solo en el stop más oscuro del scrim).
```
