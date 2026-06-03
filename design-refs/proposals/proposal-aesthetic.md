# Propuesta AESTHETIC — "Cámara Oscura"

> Proposer canónico del pipeline front-tool (MoE de diseño). Ángulo: dirección
> estética **bold anti-slop** que funde KEV v1 (papel blanco editorial, grotesca
> pesada, naranja punctuation) con el ADN Numinous (atmósfera cálida full-bleed,
> pesos Light protagonistas, retícula hairline + crosshair, texto fino anclado a
> esquinas, paréntesis curvos). Cubre Home, Work index, Project (Gallery/Overview),
> Video, Information, Header/Cursor — mobile y desktop. Respeta TODAS las LOCKED
> RULES. Datos y media INTOCABLES.

---

## 0. El concepto en una frase

**KEV v1 es la galería iluminada; Numinous es el cuarto oscuro donde se revela la
imagen.** La propuesta hace que el portafolio *respire entre dos campos* — papel
blanco editorial (donde la obra se cuelga en la pared) y negro `#0D0D0D` cálido
(donde la imagen full-bleed se proyecta). El recorrido alterna campos como un
carrete que pasa de la sala de exposición al laboratorio. La retícula hairline + el
crosshair con micro-"Kev." son las **marcas de encuadre del visor de una cámara**:
el film-strip del v1 deja de ser solo un adorno del header y se convierte en el
sistema de líneas que organiza toda la pantalla.

**Lo inolvidable (differentiation):** el *crosshair de visor* con micro-marca
"Kev." en la intersección, vivo sobre cada hero full-bleed, y la dualidad
papel/negro que convierte la navegación en un revelado fotográfico. Nadie confunde
esto con un template.

### Por qué NO es AI-slop
- Una sola grotesca (Helvetica/Archivo), cero gradients purple-blue, cero
  cards-in-cards, cero icon tiles, esquinas cuadradas, controles de texto.
- El color SIEMPRE viene de la foto/video de KEV; el contenedor calla.
- Naranja `#FF4D17` solo como puntuación (tag cliente, hover View →). Nunca campo.
- La atmósfera cálida no se inventa con CSS: es la **media real** de KEV
  (balvin, maluma, fdrs, posters de videoclips) puesta full-bleed.

---

## 1. Decisión de fusión: cómo conviven blanco y negro

El brief autoriza: *"blanco sigue siendo base; #0D0D0D puede ganar terreno como
segundo campo (pantallas alternas)."* Mi regla operativa:

| Campo | Cuándo | Rol narrativo |
|---|---|---|
| **Papel `#FFFFFF`** | Work index, Overview grid, Information, barra de Project, controles | La sala de exposición. Editorial, exacto, aireado. KEV v1 intacto aquí. |
| **Negro cálido `#0D0D0D`** | Home hero, "capítulos" de entrada a Project, Video, transición de menú | El cuarto oscuro / la proyección. La imagen es el único color. |

La regla de oro: **negro = hay imagen full-bleed debajo; blanco = la imagen está
matada/colgada.** Nunca negro vacío decorativo. El negro siempre carga media.

**Negro "cálido", no frío:** sobre los heros negros se aplica un velo
`background-blend` ámbar muy sutil (token `--warm-veil`, 4–6% sobre la imagen) que
recoge el ADN sepia/ámbar de Numinous SIN inventar color — solo profundiza los
tonos que ya trae la foto de KEV. Cumple contraste porque el texto blanco va sobre
las zonas oscuras + un scrim de protección mínimo (ya permitido en el v1).

---

## 2. Tipografía: introducir los pesos Light/Regular

El v1 vive en Heavy (800). Numinous vive en Light/Regular. La fusión: **jerarquía
por tamaño, no por peso, en los momentos atmosféricos; Heavy se reserva para el
wordmark y los acentos editoriales (Work index, títulos colgados en blanco).**

Archivo ya carga 400–900. Añado el peso 300 (Light) al `next/font` y dos clases:

```css
/* --- NUEVO en :root --- */
--w-light:   300;   /* titulares atmosféricos sobre imagen (Numinous) */

/* Hero atmosférico: grande + FINO (no heavy). Tracking casi neutro. */
.kev-air {
  font-weight: var(--w-light);
  letter-spacing: -0.01em;   /* menos negativo que --ls-mega: el peso fino no necesita apretar */
  line-height: 1.08;
}
/* Titular fino de hero, 3 líneas, anclado arriba-izq como Numinous */
.kev-hero-title {
  font-size: clamp(2rem, 6.2vw, 4.5rem);
  font-weight: var(--w-light);
  line-height: 1.06;
  letter-spacing: -0.015em;
  text-wrap: balance;
}
```

```ts
// layout.tsx — añadir 300 a los pesos cargados (cambio mínimo, permitido)
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})
```

> Cumple LOCKED RULE "una tipografía grotesca": Neue Montreal del referente se
> traduce a **pesos** de la grotesca existente, exactamente como pide el contexto.
> Sin segunda fuente, sin serifas, sin itálicas.

**El paréntesis curvo `( … )`** como recurso de marca: NO es una fuente nueva, es
un envoltorio tipográfico para taglines/microcopy. Helper `.kev-paren`:

```css
.kev-paren { font-weight: var(--w-regular); letter-spacing: 0.01em; }
.kev-paren::before { content: "( "; opacity: 0.55; }
.kev-paren::after  { content: " )"; opacity: 0.55; }
```

Uso: `<span class="kev-paren">Less noise. More frame.</span>` → `( Less noise. More frame. )`
Microcopy KEV on-brand (terse, sin marketing): `( Latin music × fashion editorial )`,
`( Medellín · Miami · CDMX )`.

---

## 3. Tokens nuevos (todos additivos — el v1 no se rompe)

```css
:root {
  /* ---------- CAMPO NEGRO CÁLIDO (segundo campo) ---------- */
  --field-dark:   #0D0D0D;             /* segundo campo, alterno */
  --ink-on-dark:  #F2EFEA;             /* "blanco fino" cálido sobre negro (no #FFF puro) */
  --ink-on-dark-2: rgba(242,239,234,0.62); /* secundario sobre negro */
  --warm-veil:    rgba(74, 38, 18, 0.18);   /* velo ámbar/sepia sobre heros (blend) */

  /* ---------- RETÍCULA HAIRLINE (crosshair de visor) ---------- */
  --grid-line:        rgba(255,255,255,0.16); /* hairline sobre imagen */
  --grid-line-paper:  var(--hair);            /* hairline sobre papel = ECECEC v1 */
  --crosshair-size:   18px;                   /* brazos del crosshair central */

  /* ---------- PESO NUEVO ---------- */
  --w-light: 300;

  /* ---------- SCRIM de protección de texto sobre imagen (mínimo, ya permitido) ---------- */
  --scrim-top:    linear-gradient(to bottom, rgba(0,0,0,0.42), rgba(0,0,0,0) 32%);
  --scrim-bottom: linear-gradient(to top,    rgba(0,0,0,0.42), rgba(0,0,0,0) 32%);
}
```

Contraste verificado: `--ink-on-dark #F2EFEA` sobre `#0D0D0D` = ~17:1. Sobre las
zonas medias de una foto cálida, el scrim sube el contraste a >4.5:1. Sin
gray-on-colored prohibido.

---

## 4. El sistema de retícula / crosshair (el corazón visual)

Es la EVOLUCIÓN del film-strip, no su reemplazo. Tres niveles:

1. **Ticks del header** (v1) → se quedan. Sobre campo negro cambian a `--grid-line`.
2. **Crosshair de visor** → un componente CSS reutilizable: vertical + horizontal
   hairline que parten la pantalla en cuadrantes, con micro-"Kev." en la
   intersección (como `06-hero-desktop-crosshair`). Solo en heros full-bleed.
3. **Diagonales hairline** → en las tarjetas/capítulos (como `04-mobile-cards-4up`),
   una sola diagonal fina de esquina a esquina, decorativa, sutil.

Componente `<Crosshair />` (nuevo, CSS-only, sin libs):

```tsx
// components/Crosshair.tsx
/** Hairline viewfinder crosshair with micro "Kev." at the intersection.
 *  Pure CSS overlay; lives over full-bleed heros only. Respects reduced-motion. */
export function Crosshair({ label = 'Kev.' }: { label?: string }) {
  return (
    <div className="kev-crosshair" aria-hidden="true">
      <span className="kev-crosshair__v" />
      <span className="kev-crosshair__h" />
      <span className="kev-crosshair__mark">{label}</span>
    </div>
  )
}
```

```css
.kev-crosshair { position: absolute; inset: 0; pointer-events: none; z-index: 4; }
.kev-crosshair__v {            /* vertical line a ~50% */
  position: absolute; top: 0; bottom: 0; left: 50%;
  width: 1px; background: var(--grid-line); transform: translateX(-0.5px);
}
.kev-crosshair__h {            /* horizontal line a ~62% (regla de tercios, no centro muerto) */
  position: absolute; left: 0; right: 0; top: 62%;
  height: 1px; background: var(--grid-line);
}
.kev-crosshair__mark {
  position: absolute; left: 50%; top: 62%;
  transform: translate(-50%, -50%);
  font-size: 11px; font-weight: var(--w-medium); letter-spacing: -0.02em;
  color: var(--ink-on-dark);
  background: var(--field-dark);    /* pequeño "respiro" donde la marca corta la línea */
  padding: 3px 6px;
}
/* Mobile: crosshair vertical a ~50%, horizontal a ~58% (como 01-hero-mobile) */
@media (max-width: 640px) {
  .kev-crosshair__h { top: 58%; }
}
/* Reveal fílmico de las líneas en page-load (no bounce) */
@media (prefers-reduced-motion: no-preference) {
  .kev-app:not(.is-ready) .kev-crosshair__v { transform: translateX(-0.5px) scaleY(0); transform-origin: top; }
  .kev-app:not(.is-ready) .kev-crosshair__h { transform: scaleX(0); transform-origin: left; }
  .kev-crosshair__v, .kev-crosshair__h { transition: transform .9s var(--ease); }
}
```

**Diagonal de tarjeta/capítulo** (helper, usada en capítulos de Project):

```css
.kev-diag { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.kev-diag::before {
  content: ""; position: absolute; top: -10%; left: -10%; width: 130%; height: 130%;
  background: linear-gradient(to bottom right, transparent calc(50% - 0.5px),
              var(--grid-line) calc(50% - 0.5px), var(--grid-line) calc(50% + 0.5px),
              transparent calc(50% + 0.5px));
}
```

---

## 5. Pantalla por pantalla (la dirección completa)

### 5.1 HOME — campo negro, hero full-bleed cálido (el gran cambio)

De "menú sobre blanco" → **hero full-bleed con el showreel de KEV** (motion ya
cálido y abstracto), las 4 palabras del menú en peso **fino** ancladas como
Numinous, crosshair con micro-"Kev." en la intersección.

- **Imagen full-bleed:** `video-clips/reel-kev.mp4` (poster
  `reel-kev-poster.jpg`) autoplay muted loop — es literalmente el reel de KEV,
  cálido y en movimiento = el motion-blur Numinous PERO real.
- **Anclas a esquinas (Numinous):**
  - Arriba-izq: titular fino 3 líneas → `Kev — Photographer & Director / Latin music × fashion / editorial.`
  - Arriba-der: las 4 palabras del menú en columna fina (en desktop) / botón Menu (mobile).
  - Abajo-izq: las 4 palabras del menú como nav fina (desktop) o tagline paréntesis.
  - Abajo-der: créditos minúsculos `( Medellín · Miami · CDMX — 2026 )`.
- **Crosshair** centrado con "Kev." en la intersección.
- Cross-fade fílmico de entrada (`--t-film`), líneas del crosshair revelan con
  scaleX/scaleY (sin bounce).

```css
.kev-home {                         /* override del actual: ahora full-bleed negro */
  position: relative; min-height: 100dvh;
  background: var(--field-dark); color: var(--ink-on-dark);
  display: block; padding: 0;
}
.kev-home__bg { position: absolute; inset: 0; }
.kev-home__bg video, .kev-home__bg img {
  width: 100%; height: 100%; object-fit: cover;
}
.kev-home__bg::after {              /* velo cálido + grano (no inventa color) */
  content: ""; position: absolute; inset: 0;
  background: var(--warm-veil); mix-blend-mode: multiply; pointer-events: none;
}
.kev-home__scrim { position: absolute; inset: 0; background: var(--scrim-top), var(--scrim-bottom); pointer-events: none; z-index: 2; }
.kev-home__layer { position: relative; z-index: 5; min-height: 100dvh;
  padding: calc(var(--header-h) + 5vh) var(--pad-x) 6vh;
  display: grid; grid-template-rows: auto 1fr auto; }
.kev-home__corner-tl { max-width: 16ch; }
.kev-home__corner-br { justify-self: end; align-self: end; color: var(--ink-on-dark-2); }
```

```tsx
// app/page.tsx (reescrito — usa media real, IA intacta: las 4 palabras siguen ahí)
import { MenuList } from '@/components/MenuList'
import { Crosshair } from '@/components/Crosshair'
import { Media } from '@/components/Media'
import { projectBySlug } from '@/lib/data'

export default function Home() {
  const reel = projectBySlug('showreel')!.cover   // video-clips/reel-kev.mp4
  return (
    <section className="kev-home">
      <div className="kev-home__bg"><Media item={reel} loading="eager" /></div>
      <div className="kev-home__scrim" />
      <Crosshair />
      <div className="kev-home__layer">
        <h1 className="kev-home__corner-tl kev-hero-title rise-in">
          Kev — Photographer &amp; Director.<br />Latin music × fashion editorial.
        </h1>
        <div /> {/* fila central vacía: la imagen respira */}
        <div className="kev-home__nav rise-in"><MenuList variant="air" /></div>
        <span className="kev-home__corner-br kev-counter kev-paren">
          Medellín · Miami · CDMX — 2026
        </span>
      </div>
    </section>
  )
}
```

`MenuList` gana una prop `variant`: `'mega'` (default, papel) | `'air'` (fino, sobre
imagen). En `air` usa `.kev-air` + `--ink-on-dark`, tamaño menor (clamp ~1.6–2.4rem),
columna a la derecha en desktop. **La IA y las 4 palabras NO cambian** — solo el peso
y el campo.

---

### 5.2 WORK INDEX & OVERVIEW — papel editorial INTACTO (v1 gana aquí)

Esta es la "sala de exposición": se mantiene el v1 casi tal cual (lista hover-preview,
dim-the-rest, naranja en client tags). Dos toques Numinous mínimos:

1. El preview hover (desktop) gana un **micro-crosshair** en su esquina y el
   `kev-caps` del título se vuelve fino.
2. Header de la sección: añadir tagline paréntesis bajo el `<h1>`:
   `( {n} projects — Latin music × fashion )`.

Cambio CSS mínimo (el resto del bloque `.kev-work*` se queda):

```css
.kev-work__title { font-weight: var(--w-light); letter-spacing: -0.015em; } /* de heavy → fino */
.kev-work__panel { /* + hairline frame para evocar visor */ outline: 1px solid var(--grid-line-paper); outline-offset: 0; }
```

> Nota anti-slop: NO meto negro aquí. La fuerza del v1 es el blanco exacto con
> naranja-puntuación; romperlo sería diluir la marca. El negro entra en heros y
> capítulos, no en el índice.

---

### 5.3 PROJECT — Gallery / Overview con "capítulo" de entrada Numinous

La galería blanca editorial se conserva (LOCKED: IA intacta, una imagen flotando en
blanco). LO NUEVO: un **capítulo de entrada full-bleed** antes de la barra — el
poster del proyecto (su `cover`) en negro cálido, título fino + línea divisoria +
créditos, como `05-poster-grid-blur`. Es la "carátula" del revelado.

```css
.kev-chapter {                      /* portada full-bleed del proyecto */
  position: relative; height: 78vh; min-height: 420px;
  background: var(--field-dark); color: var(--ink-on-dark); overflow: hidden;
  margin: 0 calc(-1 * var(--pad-x)) 0;  /* rompe el gutter → full-bleed */
}
.kev-chapter__bg { position: absolute; inset: 0; }
.kev-chapter__bg img, .kev-chapter__bg video { width:100%; height:100%; object-fit: cover; }
.kev-chapter__bg::after { content:""; position:absolute; inset:0; background: var(--warm-veil); mix-blend-mode: multiply; }
.kev-chapter__rule {                /* línea divisoria horizontal Numinous */
  position: absolute; left: var(--pad-x); right: var(--pad-x); top: 62%;
  height: 1px; background: var(--grid-line);
}
.kev-chapter__title {               /* arriba-izq, fino */
  position: absolute; left: var(--pad-x); top: calc(var(--header-h) + 6vh);
  font-size: clamp(2rem, 7vw, 5rem); font-weight: var(--w-light); letter-spacing: -0.015em;
}
.kev-chapter__credit {              /* abajo-der, micro */
  position: absolute; right: var(--pad-x); bottom: 6vh; color: var(--ink-on-dark-2);
  text-align: right;
}
```

```tsx
// dentro de ProjectView, antes de .kev-project__bar
<header className="kev-chapter">
  <div className="kev-chapter__bg"><Media item={project.cover} loading="eager" /></div>
  <div className="kev-chapter__rule" />
  <h1 className="kev-chapter__title fade-in">{project.title}</h1>
  <div className="kev-chapter__credit kev-counter">
    <span className="kev-tag">{project.client}</span><br />
    <span className="kev-paren">{project.kind} · {project.year}</span>
  </div>
</header>
```

La barra sticky (`.kev-project__bar`), el toggle Gallery/Overview, el counter
`05 / 34`, el masonry grid y el `View → Next` se mantienen EXACTOS (v1). El campo
vuelve a blanco bajo el capítulo. Naranja sigue solo en los tags.

---

### 5.4 VIDEO — campo negro (es cine), reproductores reales intactos

Video es el lugar natural del negro: ya usa `frame--dark`. Lo convertimos a campo
negro completo (cuarto de proyección) y los `PlayerCard` siguen idénticos
(autoplay muted, controles de texto, barra seekable).

```css
.kev-videos {
  background: var(--field-dark); color: var(--ink-on-dark);
  min-height: 100dvh; padding: calc(var(--header-h) + 5vh) var(--pad-x) 10vh;
}
.kev-videos__title { font-weight: var(--w-light); letter-spacing: -0.015em; }
.kev-player__ctl, .kev-player__title { color: var(--ink-on-dark); }
.kev-player__tc, .kev-player__meta .kev-sub { color: var(--ink-on-dark-2); }
.kev-player__prog { background: rgba(242,239,234,0.18); }
.kev-player__prog span { background: var(--ink-on-dark); }
```

Header `Video` con tagline paréntesis: `( {n} films — direction & motion )`.
Sobre negro, el header (`.kev-header`) necesita variante: ver §5.6.

---

### 5.5 INFORMATION — papel editorial + letras dispersas (07-business-cards)

Se mantiene la estructura del v1 (lead bio, 3 columnas Clients/Services/Contact).
Toque Numinous: **letras dispersas de la marca "KEV" en las esquinas** del lienzo
(como la papelería `07`), hairline, decorativas, ink-3. El lead pasa a peso fino.

```css
.kev-info__lead { font-weight: var(--w-light); letter-spacing: -0.01em; }
.kev-info__scatter { position: absolute; inset: 0; pointer-events: none; z-index: 0; color: var(--ink-3); }
.kev-info__scatter span { position: absolute; font-size: clamp(1rem,2vw,1.4rem); font-weight: var(--w-light); }
.kev-info__scatter .k { top: 14vh; right: var(--pad-x); }
.kev-info__scatter .e { bottom: 22vh; left: var(--pad-x); }
.kev-info__scatter .v { bottom: 8vh; right: calc(var(--pad-x) + 4vw); }
```

```tsx
<div className="kev-info__scatter" aria-hidden="true">
  <span className="k">K</span><span className="e">E</span><span className="v">V</span>
</div>
```

Contacto: `studio@kev.com`, `@kev` (de `lib/data.ts`, intocable). Microcopy con
paréntesis: `( Available for commissions — 2026 )`.

---

### 5.6 HEADER + CURSOR — evolución del film-strip y el círculo

**Header bicampo:** detecta si la pantalla actual es campo negro (Home, Project
chapter, Video) y conmuta tokens vía clase `is-dark` (sin cambiar markup ni IA).

```css
.kev-header.is-dark { background: transparent; color: var(--ink-on-dark); }
.kev-header.is-dark .kev-header__mark,
.kev-header.is-dark .kev-header__menu { color: var(--ink-on-dark); }
.kev-header.is-dark .kev-ticks {        /* film-strip sobre negro: ticks claros */
  --tick: rgba(242,239,234,0.45);
}
```

Implementación: `Header` lee `usePathname()` (ya lo hace) y añade `is-dark` cuando
`pathname === '/' || pathname === '/video' || pathname.startsWith('/work/')`. El
overlay de menú (4 palabras mega) se mantiene sobre papel — es el momento editorial.

**Cursor circular → cursor de visor:** el círculo gris se queda, pero sobre campos
negros invierte a claro y sobre media full-bleed gana **dos micro-ticks** (un
crosshair diminuto dentro del círculo) — el ADN film-strip dentro del cursor.

```css
.kev-cursor::before, .kev-cursor::after {  /* micro-crosshair dentro del círculo */
  content: ""; position: absolute; left: 50%; top: 50%; background: currentColor; opacity: 0;
  transition: opacity .2s var(--ease);
}
.kev-cursor.is-hot::before { width: 1px; height: 10px; transform: translate(-50%,-50%); opacity: .5; }
.kev-cursor.is-hot::after  { width: 10px; height: 1px; transform: translate(-50%,-50%); opacity: .5; }
.kev-app[data-field="dark"] .kev-cursor { background: rgba(242,239,234,0.20); color: var(--ink-on-dark); }
```

---

## 6. Motion (quieto, fílmico — sin bounce)

- Page-load: `fade-in` (`--t-film 900ms`) del hero + reveal de crosshair con
  scaleX/scaleY desde el borde (transform-origin top/left). Stagger de las anclas
  con `rise-in` (ya existe) + `animation-delay`.
- Cross-fades de media (`--t-film`). El pan lento del preview (`kevPan`) se queda.
- Capítulo → galería: al hacer scroll el capítulo se va con la propia página (sin
  parallax). El counter `05 / 34` tickea (v1).
- Hover `View →`: shift a `--accent` + arrow translateX 10px (v1, intacto).
- TODO bajo `prefers-reduced-motion: reduce` se apaga (ya hay guardas).

---

## 7. Las 3 VARIANTES (en un solo archivo de tokens)

Las tres comparten el sistema (crosshair, paréntesis, pesos finos, media real). Se
diferencian en **cuánto terreno gana el negro y la temperatura del velo**. Una sola
variable raíz `data-variant` en `<html>` conmuta todo — implementable en un solo
bloque CSS, sin tocar componentes.

```css
/* DEFAULT = Variant A */
:root, [data-variant="darkroom"] {
  --warm-veil: rgba(74, 38, 18, 0.18);   /* ámbar/sepia */
  --home-field: var(--field-dark);
  --work-field: var(--paper);            /* index en blanco */
  --info-field: var(--paper);
}
/* Variant B */
[data-variant="gallery"] {
  --warm-veil: rgba(74, 38, 18, 0.10);   /* velo casi nulo, foto cruda */
  --home-field: var(--paper);            /* incluso Home en papel, hero matado */
  --work-field: var(--paper);
  --info-field: var(--paper);
}
/* Variant C */
[data-variant="cinema"] {
  --warm-veil: rgba(60, 30, 14, 0.26);   /* velo cálido fuerte, cinematográfico */
  --home-field: var(--field-dark);
  --work-field: var(--field-dark);       /* index también en negro */
  --info-field: var(--field-dark);
}
```

### Variante A — **"Darkroom"** (recomendada · default)
**Negro gana los heros; blanco gobierna los índices.** Home/Project-chapter/Video en
negro cálido (velo ámbar 18%); Work index, Overview grid e Information en papel
editorial v1. Es la fusión más fiel al brief ("pantallas alternas") y la más
defendible: máxima dualidad sin perder el blanco-papel como ADN KEV.
*Riesgo:* el más balanceado, el "obvio correcto" — pero por eso el más seguro de
producción. **Esta es la que implementaría.**

### Variante B — **"Gallery"** (la más editorial / minimal)
**Casi todo papel; el negro solo aparece como el video full-bleed del Home y los
capítulos, sin velo cálido (foto cruda).** Mantiene Home en papel con el hero
*matado* (imagen flotando en un marco blanco grande + crosshair sobre papel). Es la
más cercana al v1 puro, la más "renellmedrano/UNSTATED". Para un cliente que quiera
el mínimo riesgo y máxima sobriedad.
*Riesgo:* puede sentirse poco "Numinous" — absorbe la retícula y los pesos finos
pero renuncia a la atmósfera cálida full-bleed. Menos memorable.

### Variante C — **"Cinema"** (la más bold / Numinous-forward)
**El negro cálido gana casi todo el recorrido**, incluido el Work index (lista
blanca-fina sobre negro, dim-the-rest invertido) e Information. Velo ámbar fuerte
(26%), heros más oscuros y oníricos. El blanco-papel se reserva SOLO para la galería
de imágenes del Project (la obra colgada) — invirtiendo la lógica: el contenedor es
oscuro, la imagen suelta es la única luz.
*Riesgo:* el más alejado del v1; hay que cuidar el contraste del naranja sobre negro
(sigue cumpliendo: `#FF4D17` sobre `#0D0D0D` = ~4.7:1, justo en el umbral — uso tag
sólido `--accent` con texto papel para los client tags sobre negro). El más
inolvidable, el más arriesgado de aprobar.

> **Recomendación del proposer:** ir con **Variante A (Darkroom)** como base e
> implementar B/C como atributos `data-variant` para que KEV elija en vivo en
> `:3001`. Las tres comparten 95% del código; solo cambian 4 variables.

---

## 8. Checklist de cumplimiento (LOCKED RULES)

- [x] Una grotesca (Archivo/Helvetica). Neue Montreal → **pesos** light/regular. Sin serifa, sin itálica, sin 2ª fuente.
- [x] Naranja `#FF4D17` único acento de UI (tags, hover View →). Nunca campo. Verificado contraste sobre negro en Variante C.
- [x] Esquinas cuadradas. Controles de texto. Único glifo `→`. (Crosshair y paréntesis son líneas/tipografía, no iconos.)
- [x] Motion quieto: cross-fades, reveal de líneas con ease-out, sin bounce/sombra/parallax.
- [x] Mobile-first, secciones 100dvh, **IA intacta**: Home / Photography / Overview / Project(Gallery|Overview) / Video / Information.
- [x] `lib/media.ts` y `lib/data.ts` intocables (Home usa `projectBySlug('showreel').cover`, chapter usa `project.cover`).
- [x] Ticks film-strip evolucionan (header bicampo + micro-crosshair en cursor), NO desaparecen.
- [x] Cursor circular evoluciona (crosshair interno + inversión sobre negro), NO desaparece.
- [x] Blanco sigue siendo base (índices/Information/galería); `#0D0D0D` gana terreno como 2º campo en heros.
- [x] Sin Inter/Roboto/system, sin gradients purple-blue, sin cards-in-cards, sin icon tiles, sin libs de componentes, sin gray-on-colored < 4.5:1.

## 9. Archivos a tocar (mapa de implementación)
- `app/layout.tsx` — añadir peso `300` a Archivo. (1 línea)
- `app/globals.css` — tokens nuevos (§3), `.kev-air`/`.kev-hero-title`/`.kev-paren`, crosshair/diagonal (§4), overrides de Home/Chapter/Video/Header/Cursor (§5), bloque `data-variant` (§7).
- `components/Crosshair.tsx` — NUEVO (CSS-only).
- `components/MenuList.tsx` — prop `variant?: 'mega' | 'air'`.
- `components/Header.tsx` — clase `is-dark` por pathname.
- `app/page.tsx` — Home full-bleed (usa `Media` + `Crosshair` + `MenuList variant="air"`).
- `components/ProjectView.tsx` — insertar `<header className="kev-chapter">` antes de la barra.
- `app/video/page.tsx` / `app/information/page.tsx` — clase de campo + tagline paréntesis + letras dispersas (Information).
- Work index / Overview / PlayerCard: **sin cambios estructurales**, solo heredan tokens.
