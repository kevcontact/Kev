# Propuesta — COMPONENTS (proposer "components" del pipeline front-tool)

> **Ángulo:** los componentes y patrones de interacción del rediseño, en CSS vanilla.
> Fusión **KEV v1 + Numinous** respetando todas las LOCKED RULES. Mobile-first,
> 100dvh, IA intacta. Reutiliza los componentes existentes (`Media`, `Cursor`,
> `Header`, `WorkIndex`, `ProjectView`, `PlayerCard`) — solo añade props/markup y
> tokens; nunca toca `lib/data.ts` ni `lib/media.ts`.

---

## 0. Tesis de interacción

El v1 es **papel blanco + tipografía heavy + ticks film-strip**. Numinous aporta
**campo cálido full-bleed + crosshair hairline + pesos Light/Regular + paréntesis**.
La fusión no es "poner una foto de fondo": es un **sistema de crosshair** que ya
vive latente en KEV (los ticks son media-cruz horizontal). Lo extendemos a una
retícula 1px de cuadrantes con micro-marca `Kev.` en la intersección, y dejamos
que ese mismo sistema reaparezca en cada pantalla como firma.

Tres mecanismos de interacción nuevos, todos CSS-first (cero libs):

1. **Crosshair atmosférico** — vertical + horizontal hairline sobre full-bleed,
   con micro-`Kev.` en el centro. Trazado de líneas con `transform: scaleY/scaleX`
   en la entrada (draw-in fílmico, no bounce). Es el "logo system" de KEV
   traducido del `( N Λ )` de Numinous.
2. **Cross-fade de ruta** — overlay `--paper`/`--ink` que cubre y revela en cambios
   de página (View Transitions API nativa de Next 15 con fallback a un gate CSS).
3. **Reveal escalonado por esquina** — texto anclado a las 4 esquinas
   (titular ↖, nav ↗, párrafo ↙, créditos ↘) que sube con `IntersectionObserver`
   (port vanilla del `FadeInStagger` de cult-ui, sin `motion/react`).

El cursor circular y los ticks **evolucionan, no desaparecen**: el cursor gana un
micro-crosshair interno sobre targets `data-cross`; los ticks ahora pueden teñirse
de blanco (`--tick-on-dark`) cuando viven sobre campo oscuro/imagen.

---

## 1. Tokens nuevos (append a `app/globals.css`)

Todos aditivos. Nada se renombra. El blanco sigue siendo base; `#0D0D0D` gana
terreno como segundo campo; el naranja sigue siendo el único acento de UI.

```css
:root {
  /* ---------- TYPE — pesos atmosféricos Numinous (Light/Regular protagonistas) ---------- */
  /* Neue Montreal del referente → PESOS de la grotesca existente. NO segunda fuente. */
  --w-light:    300;   /* titulares atmosféricos full-bleed (hero, capítulos)   */
  /* (--w-regular 400 … --w-heavy 800 ya existen; Heavy se reserva al wordmark) */

  /* Escala "fina": titulares grandes pero de bajo peso, tracking normal.        */
  --fs-atmos:   clamp(2rem, 5.2vw, 4.25rem);  /* hero / capítulo Numinous        */
  --lh-atmos:   1.04;
  --ls-atmos:   -0.01em;                       /* casi neutro (vs -0.03 del mega) */

  /* ---------- CAMPO OSCURO (segundo papel) ---------- */
  --field-dark:   #0D0D0D;     /* segundo campo, pantallas alternas             */
  --on-dark-1:    #F4F2EF;     /* texto primario sobre oscuro / imagen (cálido) */
  --on-dark-2:    rgba(244,242,239,0.62);
  --on-dark-3:    rgba(244,242,239,0.34);
  --hair-on-dark: rgba(244,242,239,0.18);
  --tick-on-dark: rgba(244,242,239,0.30);
  --cursor-on-dark: rgba(244,242,239,0.22);

  /* ---------- CROSSHAIR / RETÍCULA ---------- */
  --cross-line:      var(--hair-on-dark);  /* sobre imagen/oscuro              */
  --cross-line-pale: rgba(13,13,13,0.10);  /* sobre papel blanco              */
  --cross-w:         1px;
  --cross-mark:      11px;                  /* tamaño micro-Kev. en intersección */
  --cross-draw:      1100ms;                /* draw-in fílmico                  */

  /* ---------- SCRIM de protección bajo texto sobre imagen ---------- */
  --scrim-top:    linear-gradient(180deg, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0) 42%);
  --scrim-bottom: linear-gradient(0deg,   rgba(13,13,13,0.50) 0%, rgba(13,13,13,0) 38%);

  /* ---------- MOTION — ya existe --ease/--t-film; añadimos draw ---------- */
  --ease-draw: cubic-bezier(0.16, 1, 0.3, 1);  /* ease-out muy suave, sin overshoot */
}
```

**Por qué `--w-light: 300`:** Archivo (vía next/font) ya carga 400–900. Para 300
hay que añadir `'300'` al array de pesos en `app/layout.tsx` (única edición fuera
de CSS necesaria para los titulares finos):

```ts
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})
```

> Helvetica del sistema (macOS) no tiene un peso 300 real; `font-synthesis: none`
> hace que caiga a 400 limpio sin falso-bold. En Windows/Linux Archivo 300 entrega
> el peso fino. Acepta la degradación: el ADN "fino" se cumple donde la fuente lo
> permite, y nunca se sintetiza. **Desvío señalado del brief:** el brief pide
> Light/Regular; lo respetamos vía peso real, no vía segunda fuente.

---

## 2. El componente firma: `<Crosshair>` (NUEVO, CSS-first)

Tradúce el `( N Λ )` de `02-logo-system-eye` y la retícula de
`01/06-hero-crosshair` al lenguaje KEV. Dos líneas hairline que dividen el lienzo
en cuadrantes + micro-`Kev.` en la intersección. Se dibuja con `scaleX/scaleY` en
la entrada (no opacity-pop): la línea **se traza** desde el centro hacia afuera,
movimiento quieto y fílmico.

```tsx
// components/Crosshair.tsx
'use client'
import { useEffect, useRef } from 'react'

/**
 * Retícula hairline de cuadrantes con micro-marca "Kev." en la intersección.
 * `tone` decide el color de línea (pale = sobre papel; line = sobre imagen/oscuro).
 * `mark` opcional: posición vertical/horizontal de la cruz (0–1, default 0.5).
 */
export function Crosshair({
  tone = 'line',
  cx = 0.5,
  cy = 0.5,
}: {
  tone?: 'line' | 'pale'
  cx?: number
  cy?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  // draw-in al montar (respeta reduced-motion vía CSS)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const id = requestAnimationFrame(() => el.classList.add('is-drawn'))
    return () => cancelAnimationFrame(id)
  }, [])
  return (
    <div
      ref={ref}
      className={`kev-cross kev-cross--${tone}`}
      style={{ ['--cx' as string]: `${cx * 100}%`, ['--cy' as string]: `${cy * 100}%` }}
      aria-hidden="true"
    >
      <span className="kev-cross__v" />
      <span className="kev-cross__h" />
      <span className="kev-cross__mark">Kev.</span>
    </div>
  )
}
```

```css
/* ---- CROSSHAIR ---- */
.kev-cross { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
.kev-cross--pale { --c: var(--cross-line-pale); --m: var(--ink); }
.kev-cross--line { --c: var(--cross-line);      --m: var(--on-dark-1); }

.kev-cross__v, .kev-cross__h {
  position: absolute; background: var(--c);
  transition: transform var(--cross-draw) var(--ease-draw);
}
/* vertical: línea fina a la altura --cx, dibujada de centro→bordes */
.kev-cross__v {
  top: 0; bottom: 0; left: var(--cx); width: var(--cross-w);
  transform: scaleY(0); transform-origin: center;
}
/* horizontal: línea fina a la altura --cy */
.kev-cross__h {
  left: 0; right: 0; top: var(--cy); height: var(--cross-w);
  transform: scaleX(0); transform-origin: center;
}
.kev-cross.is-drawn .kev-cross__v { transform: scaleY(1); }
.kev-cross.is-drawn .kev-cross__h { transform: scaleX(1); transition-delay: 120ms; }

/* micro-marca en la intersección: el wordmark KEV en miniatura */
.kev-cross__mark {
  position: absolute; left: var(--cx); top: var(--cy);
  transform: translate(-50%, -50%);
  font-size: var(--cross-mark); font-weight: var(--w-heavy);
  letter-spacing: -.03em; color: var(--m);
  opacity: 0; transition: opacity .5s var(--ease) .5s;
  /* anillo de respiro tipo "( )" Numinous, sin caja: solo aire */
  padding: 0 6px; mix-blend-mode: normal;
}
.kev-cross.is-drawn .kev-cross__mark { opacity: .9; }

@media (prefers-reduced-motion: reduce) {
  .kev-cross__v { transform: scaleY(1); }
  .kev-cross__h { transform: scaleX(1); }
  .kev-cross__mark { opacity: .9; transition: none; }
  .kev-cross__v, .kev-cross__h { transition: none; }
}
```

> **Evolución del ticks-ruler, no reemplazo:** los ticks del header siguen siendo
> la "regla horizontal"; el crosshair es su forma desplegada en pantallas full-bleed.
> Conviven (brief §3). En Home/capítulos vemos el crosshair; en el header persisten
> los ticks.

---

## 3. Hero full-bleed con campo cálido (Home) — VARIANTE A/B/C

El brief pide: Home pasa de "menú sobre blanco" a **hero full-bleed con still/video
cálido de KEV**, las 4 palabras del menú en peso fino sobre la imagen, crosshair
con micro-`Kev.`. Texto anclado a esquinas. Tagline entre paréntesis.

Reutiliza `Media` (acepta `MediaItem`, ya hace `object-fit: cover` + grain) y
`MenuList` (añadimos un `variant` para el peso fino). El still cálido se elige de
los datos reales sin tocar `data.ts` (p. ej. `projectBySlug('j-balvin').cover` o
el poster de un videoclip). **No** se inventa media.

### Markup (Home — `app/page.tsx`)

```tsx
import { MenuList } from '@/components/MenuList'
import { Media } from '@/components/Media'
import { Crosshair } from '@/components/Crosshair'
import { projectBySlug } from '@/lib/data'

export default function Home() {
  // still/video cálido REAL (sin tocar data.ts): cover de un proyecto cálido
  const hero = projectBySlug('j-balvin')!.cover

  return (
    <section className="kev-hero" data-field="dark">
      <Media item={hero} alt="" loading="eager" className="kev-hero__bg" />
      <div className="kev-hero__scrim" aria-hidden="true" />
      <Crosshair tone="line" />

      {/* ↖ titular fino 3 líneas */}
      <header className="kev-hero__lede rise-cnr" data-cnr="tl">
        <h1 className="kev-atmos">
          KEV<span className="kev-hero__reg">®</span><br />
          Photographer<br />&amp; Director
        </h1>
      </header>

      {/* ↗ nav fina (las 4 palabras como menú, peso fino) */}
      <nav className="kev-hero__nav rise-cnr" data-cnr="tr">
        <MenuList variant="fine" onDark />
      </nav>

      {/* ↙ párrafo + tagline entre paréntesis */}
      <div className="kev-hero__para rise-cnr" data-cnr="bl">
        <p className="kev-onpara">
          Latin music culture meets fashion editorial.
        </p>
        <p className="kev-paren">( Less noise. More frame. )</p>
      </div>

      {/* ↘ créditos minúsculos */}
      <div className="kev-hero__credit rise-cnr" data-cnr="br">
        Medellín · Miami · CDMX — 2026
      </div>
    </section>
  )
}
```

### CSS Home

```css
/* ---- HERO full-bleed (campo oscuro) ---- */
.kev-hero {
  position: relative; min-height: 100dvh; overflow: hidden;
  background: var(--field-dark); color: var(--on-dark-1);
}
.kev-hero__bg { position: absolute; inset: 0; aspect-ratio: auto !important; }
.kev-hero__bg > img, .kev-hero__bg > video { width: 100%; height: 100%; object-fit: cover; }
.kev-hero__scrim {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: var(--scrim-top), var(--scrim-bottom);
}
/* anclajes de esquina (mobile: stack en columna respetando 4 zonas) */
.kev-hero__lede   { position: absolute; left: var(--pad-x); top: calc(var(--header-h) + 4vh); z-index: 3; }
.kev-hero__nav    { position: absolute; right: var(--pad-x); top: calc(var(--header-h) + 4vh); z-index: 3; }
.kev-hero__para   { position: absolute; left: var(--pad-x); bottom: clamp(28px, 8vh, 64px); z-index: 3; max-width: 34ch; }
.kev-hero__credit { position: absolute; right: var(--pad-x); bottom: clamp(28px, 8vh, 64px); z-index: 3;
                    font-size: var(--fs-counter); color: var(--on-dark-2); font-variant-numeric: tabular-nums; }

.kev-atmos {
  font-size: var(--fs-atmos); font-weight: var(--w-light);
  line-height: var(--lh-atmos); letter-spacing: var(--ls-atmos);
  color: var(--on-dark-1); margin: 0;
}
.kev-hero__reg { font-size: .42em; vertical-align: super; font-weight: var(--w-regular); }
.kev-onpara { color: var(--on-dark-1); font-weight: var(--w-regular); margin: 0 0 .4em; }
.kev-paren  { color: var(--on-dark-2); font-weight: var(--w-regular); letter-spacing: .01em; margin: 0; }

@media (max-width: 640px) {
  /* mobile: nav fina debajo del titular (no en esquina superior derecha) */
  .kev-hero__nav { position: static; }
  .kev-hero__lede { right: var(--pad-x); }
  .kev-hero__lede .kev-hero__nav { margin-top: 5vh; }
}
```

### Reveal por esquina (port vanilla de cult-ui FadeInStagger, sin motion)

```css
.rise-cnr { transition: opacity .7s var(--ease), transform .7s var(--ease); }
@media (prefers-reduced-motion: no-preference) {
  .kev-app:not(.is-ready) .rise-cnr { opacity: 0; transform: translateY(12px); }
}
/* escalonado por esquina: TL → TR → BL → BR */
.rise-cnr[data-cnr="tr"] { transition-delay: .10s; }
.rise-cnr[data-cnr="bl"] { transition-delay: .18s; }
.rise-cnr[data-cnr="br"] { transition-delay: .26s; }
@media (prefers-reduced-motion: reduce) { .rise-cnr { transition: none; } }
```

`MenuList` gana dos props opcionales (cambio mínimo, retrocompatible):

```tsx
export function MenuList({
  current, onNavigate, variant = 'mega', onDark = false,
}: {
  current?: string | null
  onNavigate?: () => void
  variant?: 'mega' | 'fine'
  onDark?: boolean
}) {
  return (
    <nav className={`kev-menulist kev-menulist--${variant}${onDark ? ' on-dark' : ''}`}>
      {/* …igual… */}
    </nav>
  )
}
```

```css
/* variante fina: las 4 palabras como nav atmosférica (hero/overlay sobre imagen) */
.kev-menulist--fine .kev-menulist__item {
  font-size: var(--fs-h3); font-weight: var(--w-regular);
  letter-spacing: 0; line-height: 1.7;
}
.kev-menulist.on-dark .kev-menulist__item { color: var(--on-dark-1); }
.kev-menulist.on-dark:hover .kev-menulist__item { opacity: .42; }
.kev-menulist.on-dark .kev-menulist__item:hover { opacity: 1 !important; }
```

### LAS TRES VARIANTES (deliverable de variants, un solo archivo)

Atributo `data-hero` en `.kev-hero` selecciona la composición. Todas comparten
crosshair + esquinas + tagline; cambian densidad/movimiento.

```css
/* —— Variante A · "Quieto" (default): still cálido, crosshair fijo, texto estático.
      La más cercana al v1; el campo oscuro solo enmarca la foto. —— */
.kev-hero[data-hero="quiet"] .kev-hero__bg > img { transform: none; }

/* —— Variante B · "Deriva": el still hace un pan/scale lentísimo (9s alterno),
      como el motion-blur Numinous pero con foto real. Hereda kevPan del WorkIndex. —— */
.kev-hero[data-hero="drift"] .kev-hero__bg > img,
.kev-hero[data-hero="drift"] .kev-hero__bg > video {
  animation: kevPan 14s linear infinite alternate;
}

/* —— Variante C · "Capítulo": el hero es un POSTER (estilo 05-poster-grid):
      claim fino ↖, línea divisoria horizontal, créditos pequeños; el menú entra
      tras un beat. Campo oscuro pleno, foto matada con padding. —— */
.kev-hero[data-hero="poster"] { display: grid; place-items: stretch; }
.kev-hero[data-hero="poster"] .kev-hero__bg { inset: clamp(48px,10vh,120px) var(--pad-x); }
.kev-hero[data-hero="poster"] .kev-hero__divider {
  position: absolute; left: var(--pad-x); right: var(--pad-x);
  top: 52%; height: 1px; background: var(--hair-on-dark); z-index: 3;
  transform: scaleX(0); transform-origin: left;
  transition: transform var(--cross-draw) var(--ease-draw) .3s;
}
.kev-app.is-ready .kev-hero[data-hero="poster"] .kev-hero__divider { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) {
  .kev-hero[data-hero="drift"] .kev-hero__bg > img,
  .kev-hero[data-hero="drift"] .kev-hero__bg > video { animation: none; }
  .kev-hero[data-hero="poster"] .kev-hero__divider { transform: scaleX(1); transition: none; }
}
```

> **Recomendación:** **Variante B (Deriva)** por defecto — es la que mejor traduce
> el motion-blur Numinous usando media real de KEV sin gimmick, y reusa `kevPan`.

---

## 4. Cross-fade de ruta (transición entre pantallas)

El brief exige cross-fades fílmicos. Next 15 App Router soporta **View Transitions
API** nativa. Patrón: envolver navegaciones en `document.startViewTransition`. Como
fallback (Safari sin soporte) hay un gate CSS que pinta un velo `--paper`/`--ink`.

### Opción nativa (preferida) — hook reutilizable

```ts
// lib/useRouteFade.ts  (NUEVO — no toca data/media)
'use client'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/** Navega con cross-fade vía View Transitions; degrada a push normal. */
export function useRouteFade() {
  const router = useRouter()
  return useCallback((href: string) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
    if (typeof doc.startViewTransition === 'function'
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(() => router.push(href))
    } else {
      router.push(href)
    }
  }, [router])
}
```

```css
/* cross-fade de página: filmic, sin slide. Aplica a la raíz del documento. */
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: var(--t-film);
    animation-timing-function: var(--ease-io);
  }
  ::view-transition-old(root) { animation-name: kevFadeOut; }
  ::view-transition-new(root) { animation-name: kevFade; }
}
@keyframes kevFadeOut { from { opacity: 1 } to { opacity: 0 } }
/* kevFade ya existe en globals.css */
```

`MenuList` y `WorkIndex` usan `useRouteFade()` en `onClick` (con
`e.preventDefault()` sobre el `<Link>`), conservando `href` para SEO/middle-click.

> **Desvío señalado:** View Transitions es la vía limpia de cross-fade de ruta sin
> libs. Si el equipo prefiere cero JS extra, el `fade-in`/`rise-in` existente ya
> da una entrada suave por página y se puede dejar solo eso (la transición de
> salida se pierde, pero no se viola ninguna regla).

---

## 5. Work index — preview cálido + crosshair de hover

Mantiene la lista "dim the rest" del v1. Dos evoluciones Numinous:
(a) el panel de preview gana un **mini-crosshair** y un scrim cálido;
(b) en mobile (donde el preview está oculto) la fila activa muestra un hairline
naranja a la izquierda — el único toque de acento, coherente con la regla.

```css
/* panel de preview: campo cálido enmarcado + crosshair fijo */
.kev-work__panel { /* …igual… */ background: var(--field-dark); }
.kev-work__panel::after {        /* scrim cálido inferior, texto-legible */
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: var(--scrim-bottom); z-index: 2;
}
.kev-work__cross {               /* crosshair pale-on-dark dentro del panel */
  position: absolute; inset: 0; z-index: 3; pointer-events: none;
}

/* fila activa (mobile, sin preview): hairline de acento a la izquierda */
@media (max-width: 879px) {
  .kev-work__row { padding-left: 14px; position: relative; }
  .kev-work__row::before {
    content: ""; position: absolute; left: 0; top: 50%; width: 2px; height: 0;
    background: var(--accent); transform: translateY(-50%);
    transition: height .25s var(--ease);
  }
  .kev-work__row:active::before,
  .kev-work__row:focus-visible::before { height: 60%; }
}
```

`WorkIndex` añade `<Crosshair tone="pale" />` dentro del `Media` del panel
(children prop ya soportada por `Media`):

```tsx
{active && (
  <Media key={active.slug} item={active.cover}
    className="fade-in kev-work__panel" style={{ aspectRatio: 'auto' }}>
    <Crosshair tone="pale" />
  </Media>
)}
```

---

## 6. Project (Gallery / Overview) — capítulo de entrada Numinous

El brief §4 quiere: **galería blanca editorial intacta**, pero permitir un
"capítulo" full-bleed de **entrada de proyecto** (poster Numinous: título fino +
línea divisoria + créditos). Se añade una banda superior `.kev-project__chapter`
ANTES del bar sticky, sin alterar la galería ni el toggle.

```tsx
// dentro de ProjectView, antes de .kev-project__bar
<div className="kev-project__chapter" data-field="dark">
  <Media item={project.cover} alt="" loading="eager" className="kev-chapter__bg" />
  <div className="kev-hero__scrim" aria-hidden="true" />
  <Crosshair tone="line" cy={0.62} />
  <div className="kev-chapter__lede">
    <h1 className="kev-atmos">{project.title}</h1>
    <span className="kev-chapter__divider" aria-hidden="true" />
    <span className="kev-onpara">{project.client} · {project.year}</span>
  </div>
</div>
```

```css
.kev-project__chapter {
  position: relative; height: 64vh; overflow: hidden;
  margin: 0 calc(var(--pad-x) * -1); background: var(--field-dark);
}
.kev-chapter__bg { position: absolute; inset: 0; aspect-ratio: auto !important; }
.kev-chapter__bg > img, .kev-chapter__bg > video { width: 100%; height: 100%; object-fit: cover; }
.kev-chapter__lede {
  position: absolute; left: var(--pad-x); bottom: clamp(28px, 7vh, 56px);
  z-index: 3; color: var(--on-dark-1); display: flex; flex-direction: column; gap: 14px;
}
.kev-chapter__divider {
  width: clamp(120px, 22vw, 320px); height: 1px; background: var(--hair-on-dark);
  transform: scaleX(0); transform-origin: left;
  transition: transform var(--cross-draw) var(--ease-draw) .25s;
}
.kev-app.is-ready .kev-chapter__divider { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) { .kev-chapter__divider { transform: scaleX(1); transition: none; } }
```

La galería (`.kev-gallery`, `.kev-overview-grid`), el counter `05 / 34`, el toggle
Gallery/Overview y el bloque `.kev-next` (View → naranja en hover) quedan **idénticos**.
El "capítulo" es un prefacio cálido; al hacer scroll entras en el papel blanco.
Coherente con "alternancia negro/imagen/blanco" de `04-mobile-cards-4up`.

---

## 7. Video — player con poster cálido + crosshair en pausa

`PlayerCard` ya es un video real con controles de texto. Evoluciones:
(a) cuando el video está **pausado/no-iniciado**, el poster cálido recibe un
crosshair pale-on-dark y el control central `Play` aparece como texto centrado
(no icono); (b) el progreso fino gana un punto-cabezal circular (eco del cursor).

```css
/* estado pausa: crosshair sobre el poster + control de texto central */
.kev-player__screen { position: relative; }
.kev-player__cross {                 /* visible solo en pausa */
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  opacity: 0; transition: opacity .4s var(--ease);
}
.kev-player.is-paused .kev-player__cross { opacity: 1; }
.kev-player__center {                /* "Play" centrado, texto no icono */
  position: absolute; inset: 0; display: grid; place-items: center; z-index: 4;
  color: var(--on-dark-1); font-size: var(--fs-h3); font-weight: var(--w-regular);
  letter-spacing: .02em; opacity: 0; transition: opacity .3s var(--ease);
}
.kev-player.is-paused .kev-player__center { opacity: 1; }

/* cabezal circular en la barra de progreso (eco del cursor dot) */
.kev-player__prog span::after {
  content: ""; position: absolute; right: -3px; top: 50%;
  width: 9px; height: 9px; border-radius: 999px; background: var(--ink);
  transform: translateY(-50%);
}
```

```tsx
// PlayerCard: añade clase de estado + capa de pausa
<article className={'kev-player' + (playing ? '' : ' is-paused')}>
  <div className="frame frame--dark kev-player__screen" style={{ aspectRatio: `${item.w} / ${item.h}` }}>
    <video /* …igual… */ />
    <div className="kev-player__cross"><Crosshair tone="line" /></div>
    <span className="kev-player__center" aria-hidden="true">Play</span>
    <button className="kev-player__hit" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} />
  </div>
  {/* …barra igual… */}
</article>
```

El header de Video, los controles `Pause/Unmute`, el timecode `0:42 / 3:18` y la
lista vertical quedan iguales. Único glifo sigue siendo `→`; aquí ni eso.

---

## 8. Information — campo alterno + paréntesis

Pantalla candidata a **segundo campo oscuro** (alternancia `04-mobile-cards-4up`).
La prosa bio en peso fino, columnas Clients/Services/Contact con hairlines sobre
oscuro, y un crosshair pale en una esquina. La tagline entre paréntesis cierra.

```css
.kev-info[data-field="dark"] {
  background: var(--field-dark); color: var(--on-dark-1); position: relative;
}
.kev-info[data-field="dark"] .kev-info__lead { font-weight: var(--w-light); color: var(--on-dark-1); }
.kev-info[data-field="dark"] .kev-info__h    { color: var(--on-dark-2); }
.kev-info[data-field="dark"] .kev-info__list li { border-bottom-color: var(--hair-on-dark); }
.kev-info[data-field="dark"] .kev-info__ck   { color: var(--on-dark-2); }
.kev-info__sign { margin-top: clamp(48px,10vh,120px); color: var(--on-dark-2); }
```

```tsx
<section className="kev-info" data-field="dark">
  <Crosshair tone="line" cx={0.78} cy={0.30} />
  <h1 className="kev-info__lead rise-in">{info.bio}</h1>
  {/* …columnas igual… */}
  <p className="kev-paren kev-info__sign">( Brands made human — and warm. )</p>
</section>
```

> Information **puede** quedarse en papel blanco si el equipo prefiere; el `data-field`
> es un switch de una línea. Es el lugar más seguro para probar el campo oscuro.

---

## 9. Cursor + ticks — evolución (no desaparición)

```css
/* CURSOR: micro-crosshair interno sobre targets marcados data-cross */
.kev-cursor::before, .kev-cursor::after {
  content: ""; position: absolute; left: 50%; top: 50%; background: var(--ink);
  opacity: 0; transition: opacity .2s var(--ease);
}
.kev-cursor::before { width: 1px; height: 14px; transform: translate(-50%,-50%); }
.kev-cursor::after  { width: 14px; height: 1px; transform: translate(-50%,-50%); }
.kev-cursor.is-cross::before, .kev-cursor.is-cross::after { opacity: .5; }
.kev-cursor.is-cross { background: transparent; }

/* sobre campo oscuro, el cursor se invierte (cálido) */
[data-field="dark"] .kev-cursor,
.kev-cursor.on-dark { background: var(--cursor-on-dark); }

/* TICKS: variante sobre oscuro/imagen (header puede flotar sobre hero) */
.kev-ticks--on-dark {
  background-image: repeating-linear-gradient(to right,
    var(--tick-on-dark) 0, var(--tick-on-dark) 1px, transparent 1px, transparent var(--tick-gap));
}
```

`Cursor.tsx` ya detecta `a, button, [data-hot]`. Añadir detección de `[data-cross]`
para el micro-crosshair y leer el `data-field` del ancestro para `on-dark`:

```ts
const cross = target?.closest?.('[data-cross]')
dot.classList.toggle('is-cross', !!cross)
const onDark = target?.closest?.('[data-field="dark"]')
dot.classList.toggle('on-dark', !!onDark)
```

El **header** sobre el hero: hacerlo transparente con scrim mínimo (regla del v1:
"scrim mínimo bajo header sobre full-bleed") y ticks en variante on-dark.

```css
.kev-app[data-on-hero="1"] .kev-header { background: transparent; color: var(--on-dark-1); }
.kev-app[data-on-hero="1"] .kev-header__mark,
.kev-app[data-on-hero="1"] .kev-header__menu { color: var(--on-dark-1); }
.kev-app[data-on-hero="1"] .kev-ticks { /* aplica --tick-on-dark vía clase */ }
```

---

## 10. Mapa de cumplimiento de LOCKED RULES

| Regla | Cómo se cumple |
|---|---|
| Una sola grotesca | Solo Archivo/Helvetica. "Neue Montreal" → **pesos** 300/400. Sin segunda fuente, sin itálicas, sin serifas. |
| Naranja único acento | `--accent` solo en: tags cliente (`kev-tag`), hover `View →`, hairline activo en work-row mobile. Nunca como campo. |
| Esquinas cuadradas | Crosshair, scrims, chapters, posters: `border-radius: 0`. Únicos redondeados: cursor dot + cabezal de progreso (eco del dot). |
| Controles de texto, glifo `→` | Player gana `Play` central de **texto**; cero iconos nuevos. `→` sigue solo en `View →`. |
| Motion quieto fílmico | Draw-in con `scaleX/scaleY` + `--ease-draw`/`--ease-io`; cross-fade `--t-film`; sin bounce/slide/parallax/sombras. `prefers-reduced-motion` cubierto en todo. |
| Mobile-first, 100dvh, IA intacta | Hero/Info `100dvh`; rutas y páginas sin cambios; menú = 4 palabras. |
| `data.ts`/`media.ts` intocables | Hero/chapter usan `project.cover` existente; cero ediciones a datos/capa media. |
| Ticks + cursor evolucionan | Ticks ganan variante on-dark; cursor gana micro-crosshair + inversión on-dark. Ambos persisten. |
| Blanco base, `#0D0D0D` segundo campo | Papel sigue siendo base (Work/Project-galería/Video-lista); oscuro en Hero/Chapter/Information. |
| Sin libs de componentes / sin AI-slop | Cero deps nuevas (View Transitions es API nativa). Patrones cult-ui (FadeInStagger, dot-grid, noise) **portados a CSS vanilla**. Sin gradients purple-blue, sin cards-in-cards, sin icon tiles. Contraste: `--on-dark-1 #F4F2EF` sobre `#0D0D0D` ≈ 17:1; `--on-dark-2` 0.62 ≈ 9:1 (≥ 4.5:1). |

---

## 11. Orden de implementación sugerido

1. Tokens (§1) + peso 300 en `layout.tsx`.
2. `components/Crosshair.tsx` (§2) — la firma reutilizable.
3. Home hero con 3 variantes (§3) — el cambio de mayor impacto visual.
4. `Cursor.tsx` + ticks on-dark + header sobre hero (§9).
5. Work preview crosshair (§5) — bajo riesgo, reutiliza `Media`.
6. Project chapter (§6) y Video player pausa (§7).
7. Information campo oscuro (§8) — switch de una línea.
8. Cross-fade de ruta (§4) — última capa, opcional/degradable.

Todo es aditivo: cada paso es revertible y no rompe pantallas no tocadas. La
galería blanca editorial, el counter, los tags naranja y `View →` sobreviven
intactos — el rediseño **enmarca** la obra de KEV con la atmósfera Numinous sin
sacrificar el papel blanco que define el recorrido.
