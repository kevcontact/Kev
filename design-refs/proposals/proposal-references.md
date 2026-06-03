# Propuesta "references" — Crosshair Atlas

> Proposer: **references** (reference-board angle) del pipeline front-tool.
> Fusión KEV v1 + Numinous. Una propuesta concreta, implementable, con 3 variantes
> en un solo archivo de tokens + reglas de composición destiladas imagen-por-imagen.
> Respeta TODAS las LOCKED RULES. Mobile-first. IA intacta.

---

## PARTE A — Reference Board: lectura imagen por imagen

He leído los 7 referentes Numinous y las capturas v1 (`scripts/v1-shots/*.png`).
De cada referente destilo **reglas de composición trasladables** (no estética prestada,
sino gramática), y las cruzo con lo que el v1 ya hace bien.

### 01 · hero-mobile-brown.png — *la regla del anclaje a esquinas*
Lo que veo: imagen full-bleed ámbar/sepia motion-blur ocupa el 100% del viewport.
El texto NO está centrado: tres anclas en esquinas — titular fino arriba-izquierda
(3 líneas, peso ~Light), un crosshair hairline 1px (vertical + horizontal) que
divide la pantalla en 4 cuadrantes con la intersección **por debajo del centro** (≈58% alto),
micro-marca en la intersección, párrafo pequeño abajo-izquierda.
**Regla destilada (R1 — Corner Anchoring):** sobre cualquier full-bleed, el texto vive
en las 4 esquinas, nunca centrado. Jerarquía: TL = identidad/título, TR = nav/contador,
BL = descriptor/párrafo, BR = créditos/año. El centro queda para la imagen + crosshair.
**Cruce KEV:** el v1 Home ya ancla el menú abajo-izquierda y el descriptor arriba-izquierda
(`.kev-home` usa `justify-content: flex-end`). El anclaje ya es ADN KEV; Numinous solo lo
formaliza a las 4 esquinas y lo pone sobre imagen.

### 02 · logo-system-eye.png — *construcción progresiva = el crosshair como marca, no decoración*
Lo que veo: paréntesis curvos `( )` que se construyen en pasos sobre macro-foto desenfocada.
**Regla destilada (R2 — Brackets as brand punctuation):** los paréntesis envuelven una
sola unidad de significado (un tagline, un nombre). KEV traduce esto SIN curvas exóticas:
usamos los paréntesis tipográficos de la propia grotesca, `( … )`, como recurso de marca
para taglines y para el contador. Esto cumple la LOCKED RULE de una sola tipografía.
**Cruce KEV:** el "Kev." con su punto es ya la "unidad mínima". El paréntesis es el siguiente
nivel: `( Photographer & Director )`, `( 05 / 22 )`.

### 03 · tokens-neue-montreal-icons.png — *jerarquía por TAMAÑO+PESO LIGERO, no por bold*
Lo que veo: paleta `#0d0d0d / #e8e8e8 / #ffffff`, tres pesos rotulados Light / Normal / Medium.
Los titulares grandes del sistema NO son heavy: son Light/Normal a gran tamaño.
**Regla destilada (R3 — Weight inversion en titulares atmosféricos):** cuando el título
va SOBRE imagen full-bleed, baja a peso 300–400 y sube el tamaño. El bold heavy (800) se
reserva para el wordmark "Kev." y para títulos sobre blanco (modo editorial).
**Cruce KEV:** el v1 es 700–800 en todo el display. Aquí está el desvío más jugoso:
introducir un peso Light (300) de Archivo — ya disponible vía next/font con solo añadir el
weight — para los titulares-sobre-imagen. Convive con el heavy del wordmark. Cero segunda fuente.
NOTA: el `colors_and_type.css` v1 importa Archivo `400;500;600;700;800;900` — falta el 300;
hay que añadirlo al `next/font` de la propuesta (ver Parte D, paso 0).

### 04 · mobile-cards-4up.png — *el RITMO de alternancia de campos*
Lo que veo: cuatro pantallas en secuencia negro / imagen-verde / blanco / imagen-cálida.
Texto fino arriba-izq, micro-marca centrada en cada una, **diagonales hairline** cruzando
el lienzo, créditos minúsculos abajo.
**Regla destilada (R4 — Field alternation rhythm):** las pantallas alternan campo
(blanco → negro → imagen → blanco…) creando un latido visual. NUNCA dos campos sólidos
iguales seguidos. El blanco sigue siendo base, pero el negro `#0D0D0D` gana las pantallas
de "respiro" (entradas de proyecto, Video).
**Cruce KEV:** el v1 ya tiene Video sobre negro implícito (`--frame-dark`). Formalizamos
el negro como SEGUNDO campo legítimo. Diagonal hairline → es nueva, pero deriva del crosshair
y de los ticks (familia hairline), así que no rompe el ADN: la propongo SOLO en las entradas
de proyecto (chapter cards), opt-in, no global.

### 05 · poster-grid-blur.png — *la línea divisoria + tagline entre paréntesis*
Lo que veo: cada poster = foto motion-blur + claim fino arriba-izq + **línea horizontal
divisoria 1px** + créditos pequeños; tagline `( Less Noise. More Meaning. )`.
**Regla destilada (R5 — Divider line as composition spine):** una sola hairline horizontal
organiza claim arriba / créditos abajo. Es la misma hairline `--hair #ECECEC` del v1 (dividers
de lista), reusada como columna vertebral de las "chapter cards".
**Cruce KEV:** el v1 ya usa `border-bottom: 1px solid var(--hair)` en filas de Work index y
en `.kev-project__bar`. R5 es literalmente el mismo token aplicado a un nuevo contexto.

### 06 · hero-desktop-crosshair.jpeg — *el crosshair COMPLETO con micro-marca*
Lo que veo: full-bleed cálido, titular fino 3 líneas TL, nav fina TR (Work · About · Stories ·
Contact, peso ligero, dim), párrafo BL, crosshair de borde-a-borde con micro-logo `N U Λ`
apilado en la intersección.
**Regla destilada (R6 — Crosshair = grid made visible):** el crosshair no es adorno; es la
retícula del layout hecha visible. Las esquinas de texto se alinean a sus cuadrantes.
La intersección lleva la micro-marca "Kev." (apilada o en línea).
**Cruce KEV:** ESTE es el puente con la "regla de ticks" film-strip del v1. La regla de ticks
es una hairline horizontal punteada en el header; el crosshair es su hermana vertical+horizontal
sobre la imagen. **Ticks (header) + crosshair (full-bleed) = misma familia hairline.** El ADN
film-strip no desaparece: se expande de 1D (ruler) a 2D (crosshair). Coherente con la LOCKED RULE.

### 07 · business-cards.png — *letras dispersas en las esquinas*
Lo que veo: B/N, las letras del logo (N / U / Λ) dispersas individualmente en las esquinas.
**Regla destilada (R7 — Scattered wordmark letters):** los caracteres de la marca pueblan
las esquinas como marcas de registro/recorte. Para KEV: `K · E · V · .` dispersos en las
cuatro esquinas de la entrada de proyecto y del overlay de menú, peso fino, color `--ink-3`.
**Cruce KEV:** es la versión gráfica del wordmark. Uso ligero y opt-in para no saturar.

### Síntesis del board (las 7 reglas → 4 mecanismos KEV)

| Mecanismo KEV nuevo | Reglas que lo alimentan | Token/clase |
|---|---|---|
| **Crosshair hairline + micro-marca** | R1, R6, (familia ticks v1) | `.kev-crosshair`, `--hair` |
| **Hero/chapter full-bleed con corner-anchoring** | R1, R3, R4 | `.kev-hero`, `--w-light` |
| **Bracket tagline + divider spine** | R2, R5 | `.kev-bracket`, `--hair` |
| **Field alternation (blanco↔#0D0D0D) + letras dispersas** | R4, R7 | `--bg-ink`, `.kev-scatter` |

Todo se construye con tokens YA existentes (`--hair`, `--ink`, `--paper`, `--accent`,
`--tick`, motion vars) + **un solo token nuevo de peso (`--w-light: 300`)** y helpers de layout.
Cero libs, cero segunda fuente, cero color nuevo. El naranja sigue siendo único acento de UI.

---

## PARTE B — La propuesta: "Crosshair Atlas" (con 3 variantes)

Concepto: el sitio v1 es un **atlas editorial blanco**; Numinous le añade **capítulos
atmosféricos full-bleed** gobernados por un **crosshair** que es la misma retícula hairline
del film-strip llevada a 2D. El blanco manda el recorrido; el `#0D0D0D` y las imágenes cálidas
son los respiros. Las 3 variantes son **un mismo sistema con tres intensidades de Numinous**,
seleccionables por una sola clase raíz — así el usuario decide la dosis sin reescribir nada.

- **Variante A — `atlas-quiet`** (mínima invasión): v1 intacto + crosshair en Home y entradas
  de proyecto, peso Light solo en titulares-sobre-imagen. Es el v1 con un velo Numinous.
- **Variante B — `atlas-chapters`** (recomendada): A + las entradas de proyecto y Video pasan a
  campo `#0D0D0D` full-bleed con corner-anchoring; Photography gana hero full-bleed.
- **Variante C — `atlas-numinous`** (máxima): B + Home es full-bleed con still cálido de KEV
  detrás del menú, field-alternation entre secciones, letras dispersas en overlays.

Las tres comparten tokens y clases; cambia qué pantallas adoptan campo oscuro/full-bleed.
Implementación: clase en `<html>` o en `.kev-app` (`atlas-quiet|atlas-chapters|atlas-numinous`).

---

## PARTE C — Tokens y CSS clave (añadir a `app/globals.css`)

> Todo lo nuevo va DESPUÉS de los tokens existentes; nada se borra. El v1 sigue funcionando
> sin tocar `lib/`. Las clases nuevas conviven con las `.kev-*` actuales.

```css
/* ============================================================
   NUMINOUS LAYER — tokens nuevos (additive)
   ============================================================ */
:root {
  /* peso ligero para titulares atmosféricos (R3) — requiere Archivo 300 en next/font */
  --w-light: 300;

  /* segundo campo: negro editorial (R4). Blanco sigue siendo --bg por defecto. */
  --bg-ink:        #0D0D0D;
  --paper-on-ink:  #F2F0EC;   /* texto base sobre campo oscuro (no #fff puro: cálido) */

  /* hairline sobre imagen / sobre negro: el crosshair necesita su propio tinte */
  --hair-on-media: rgba(242,240,236,0.34);  /* contraste suficiente sin gritar */
  --hair-on-ink:   rgba(242,240,236,0.16);

  /* scrim mínimo de protección de texto sobre full-bleed (LOCKED: blur≈none) */
  --scrim-top:    linear-gradient(180deg, rgba(13,13,13,0.42) 0%, transparent 26%);
  --scrim-bottom: linear-gradient(0deg,   rgba(13,13,13,0.46) 0%, transparent 24%);

  /* intersección del crosshair, ligeramente bajo el centro óptico (R1) */
  --crosshair-y:  58%;

  --t-chapter: 1100ms;  /* cross-fade de capítulo, más lento que --t-film */
}

/* Campo oscuro: opt-in por sección, no global. Mantiene blanco como base del atlas. */
.kev-field-ink {
  background: var(--bg-ink);
  color: var(--paper-on-ink);
}
.kev-field-ink .kev-sub,
.kev-field-ink .kev-counter { color: rgba(242,240,236,0.62); }
.kev-field-ink .kev-caps    { color: rgba(242,240,236,0.5); }

/* ============================================================
   CROSSHAIR — la retícula hecha visible (R6). Familia de los ticks.
   ============================================================ */
.kev-crosshair {
  position: absolute; inset: 0; pointer-events: none; z-index: 2;
}
/* línea vertical (centrada) + horizontal (a --crosshair-y) en una sola capa */
.kev-crosshair::before,
.kev-crosshair::after {
  content: ""; position: absolute; background: var(--hair-on-media);
}
.kev-crosshair::before { left: 50%; top: 0; bottom: 0; width: 1px; transform: translateX(-0.5px); }
.kev-crosshair::after  { top: var(--crosshair-y); left: 0; right: 0; height: 1px; }
/* sobre campo blanco editorial, el crosshair usa la hairline normal */
.kev-on-paper .kev-crosshair::before,
.kev-on-paper .kev-crosshair::after { background: var(--hair); }

/* micro-marca en la intersección (R6) — la "Kev." chiquita */
.kev-crosshair__mark {
  position: absolute; left: 50%; top: var(--crosshair-y);
  transform: translate(-50%, -50%);
  font-weight: var(--w-heavy); font-size: 13px; letter-spacing: -0.03em;
  color: var(--paper-on-ink); line-height: 1;
  padding: 0 7px; background: transparent;
}

/* entrada/salida del crosshair: cross-fade quieto, sin slide (LOCKED: no bounce) */
.kev-crosshair { opacity: 0; transition: opacity var(--t-chapter) var(--ease-io); }
.kev-app.is-ready .kev-crosshair { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .kev-crosshair { transition: none; } }

/* ============================================================
   HERO / CHAPTER — full-bleed con corner anchoring (R1, R3)
   ============================================================ */
.kev-hero {
  position: relative; min-height: 100dvh; overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  /* zonas: TL título, TR nav/contador, centro imagen, BL párrafo, BR créditos */
  padding: calc(var(--header-h) + 4vh) var(--pad-x) 5vh;
  color: var(--paper-on-ink);
}
.kev-hero__media { position: absolute; inset: 0; z-index: 0; }
.kev-hero__media .frame,
.kev-hero__media img,
.kev-hero__media video { width: 100%; height: 100%; object-fit: cover; }
.kev-hero::before { content: ""; position: absolute; inset: 0; z-index: 1;
  background: var(--scrim-top), var(--scrim-bottom); pointer-events: none; }

.kev-hero > * { position: relative; z-index: 3; }
.kev-hero__tl { grid-column: 1; grid-row: 1; align-self: start; }   /* título */
.kev-hero__tr { grid-column: 2; grid-row: 1; justify-self: end; text-align: right; } /* nav/contador */
.kev-hero__bl { grid-column: 1; grid-row: 3; align-self: end; max-width: 34ch; }     /* párrafo */
.kev-hero__br { grid-column: 2; grid-row: 3; justify-self: end; align-self: end; text-align: right; } /* créditos */

/* TITULAR ATMOSFÉRICO: peso Light a gran tamaño (R3) — la inversión */
.kev-hero__title {
  font-size: clamp(2.4rem, 7vw, 5.5rem);
  font-weight: var(--w-light);          /* 300, NO 800 — esta es la clave Numinous */
  line-height: 1.04; letter-spacing: -0.02em;
  max-width: 18ch; text-wrap: balance;
}

/* Mobile: el grid full-bleed colapsa a una columna, anclas se apilan TL→BL */
@media (max-width: 720px) {
  .kev-hero { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto auto; }
  .kev-hero__tr { grid-column: 1; grid-row: 1; justify-self: start; text-align: left; margin-top: 10px; }
  .kev-hero__br { grid-column: 1; grid-row: 4; justify-self: start; text-align: left; }
  .kev-hero__title { font-size: clamp(2.2rem, 12vw, 3.4rem); }
}

/* ============================================================
   BRACKET TAGLINE + DIVIDER SPINE (R2, R5)
   ============================================================ */
.kev-bracket { display: inline-flex; gap: 0.5ch; align-items: baseline; }
.kev-bracket::before { content: "("; }
.kev-bracket::after  { content: ")"; }
.kev-bracket::before, .kev-bracket::after { color: var(--fg3); font-weight: var(--w-regular); }

/* divider spine reusa --hair, igual que las filas del Work index v1 */
.kev-spine { height: 1px; background: var(--hair); border: 0; margin: 0; }
.kev-field-ink .kev-spine, .kev-hero .kev-spine { background: var(--hair-on-media); }

/* ============================================================
   SCATTERED LETTERS (R7) — opt-in, ligero
   ============================================================ */
.kev-scatter { position: absolute; inset: 0; pointer-events: none; z-index: 2;
  color: var(--ink-3); font-weight: var(--w-light); font-size: 14px; letter-spacing: 0.02em; }
.kev-field-ink .kev-scatter { color: rgba(242,240,236,0.28); }
.kev-scatter > span { position: absolute; }
.kev-scatter > span:nth-child(1) { top: 18px;  left: var(--pad-x); }     /* K */
.kev-scatter > span:nth-child(2) { top: 18px;  right: var(--pad-x); }    /* E */
.kev-scatter > span:nth-child(3) { bottom: 18px; left: var(--pad-x); }   /* V */
.kev-scatter > span:nth-child(4) { bottom: 18px; right: var(--pad-x); }  /* . */

/* ============================================================
   TICKS → evolución: el header ruler puede ganar un tick más alto
   en la posición de la columna del crosshair (vínculo 1D↔2D). Opt-in.
   ============================================================ */
.kev-ticks--anchored {
  background-image:
    repeating-linear-gradient(to right, var(--tick) 0, var(--tick) 1px, transparent 1px, transparent var(--tick-gap)),
    linear-gradient(var(--tick), var(--tick));
  background-size: auto 100%, 1px 16px;
  background-position: 0 0, 50% center;
  background-repeat: repeat-x, no-repeat;
}
```

---

## PARTE D — Estructura por pantalla (TSX clave)

> Firmas reales del worktree: `Media({ item, alt, className, style, children, loading })`,
> `ProjectView({ project, next })`, `projects/info` desde `lib/data.ts`. NO se toca `lib/`.

### Paso 0 — añadir el peso Light a next/font (prerequisito R3)
En `app/layout.tsx`, el `next/font/google` de Archivo debe incluir `300`:
```ts
// Archivo({ weight: ['300','400','500','600','700','800'], variable: '--font-archivo', ... })
```
Sin esto, `--w-light: 300` cae a 400. Es el único cambio fuera de CSS para que la inversión de peso funcione.

### Home — `app/page.tsx`
**Variante A/B:** queda el v1 (menú sobre blanco) pero gana crosshair tenue + bracket en el descriptor.
**Variante C:** full-bleed con still cálido de KEV detrás del menú.

```tsx
// Variante C — Home como hero. cover real desde projects (p.ej. balvin[n]).
import { MenuList } from '@/components/MenuList'
import { Media } from '@/components/Media'
import { projects } from '@/lib/data'

export default function Home() {
  const still = projects[0].items[6] ?? projects[0].cover // un still cálido de J Balvin

  return (
    <section className="kev-hero kev-field-ink">
      <div className="kev-hero__media">
        <Media item={still} alt="KEV" loading="eager" />
      </div>
      <div className="kev-crosshair" aria-hidden>
        <span className="kev-crosshair__mark">Kev.</span>
      </div>

      <div className="kev-hero__tl rise-in">
        <span className="kev-caps"><span className="kev-bracket">Photographer &amp; Director</span></span>
      </div>
      <nav className="kev-hero__tr">{/* nav fina opcional o vacío en mobile */}</nav>

      {/* el menú vive abajo-izquierda, como el anclaje BL de Numinous,
          pero a peso Light sobre imagen (R3) en vez de heavy */}
      <div className="kev-hero__bl kev-home__menu rise-in">
        <MenuList />
      </div>
      <div className="kev-hero__br kev-counter">Medellín · Miami · CDMX — 2026</div>
    </section>
  )
}
```
Para que el menú-sobre-imagen use peso Light, override local de `.kev-menulist__item`
dentro de `.kev-hero` (NO global): `font-weight: var(--w-light)` y color `--paper-on-ink`.
El wordmark "Kev." del header sigue heavy → coexistencia de pesos sin segunda fuente.

### Photography — `app/photography/page.tsx`
Hero full-bleed de entrada (un still cálido) + debajo, la grilla editorial blanca v1.
Es el patrón **chapter → atlas**: capítulo atmosférico, luego respiro blanco con las fotos.
```tsx
<section className="kev-hero kev-field-ink">
  <div className="kev-hero__media"><Media item={cover} alt="Photography" loading="eager" /></div>
  <div className="kev-crosshair"><span className="kev-crosshair__mark">Kev.</span></div>
  <h1 className="kev-hero__tl kev-hero__title">Photography</h1>
  <p className="kev-hero__bl kev-sub">Campaigns · album cycles · editorial.</p>
  <span className="kev-hero__br kev-counter">{photoProjects.length} series</span>
</section>
{/* debajo, grilla blanca v1 sin cambios */}
```

### Work index (Overview) — `app/work/page.tsx` + `WorkIndex`
Se conserva la lista hover-preview del v1 (es excelente y muy KEV). Añadidos mínimos:
- el título "Overview" entre brackets: `<span className="kev-bracket">Overview</span>`
- el contador "15 projects" → `( 15 )` con la clase bracket
- en **desktop**, el panel de preview (`.kev-work__panel`) gana un crosshair tenue
  superpuesto sobre la imagen que aparece al hover, para hilar la retícula. Token `--hair-on-media`.
NO se toca el patrón "dim the rest" (`.kev-work__list:hover .kev-work__row { opacity:.32 }`).

### Project (Gallery / Overview) — `ProjectView.tsx`
El **bar sticky** v1 se mantiene. Lo nuevo es la **entrada de proyecto** opcional (chapter card)
antes del bar, en Variante B/C: un full-bleed `#0D0D0D` con el cover del proyecto, título Light,
divider spine y créditos — exactamente el poster Numinous (R5).
```tsx
{/* chapter card — solo Variantes B/C; usa el cover real del proyecto */}
<header className="kev-hero kev-field-ink kev-project__chapter">
  <div className="kev-hero__media"><Media item={project.cover} alt={project.title} loading="eager" /></div>
  <div className="kev-crosshair"><span className="kev-crosshair__mark">Kev.</span></div>
  <h1 className="kev-hero__tl kev-hero__title">{project.title}</h1>
  <div className="kev-hero__br" style={{ display:'grid', gap:8 }}>
    <hr className="kev-spine" />
    <span className="kev-sub">{project.client} · {project.year}</span>
  </div>
</header>
```
- **Gallery**: sin cambios (una imagen centrada por scroll). El contador `.kev-project__counter`
  pasa a bracket: `( 05 / 22 )`.
- **Overview**: la grilla masonry v1 se mantiene; los tags naranjas siguen siendo el único color.
- **Next project**: `View → {next.title}` intacto (hover naranja, flecha que avanza). Es perfecto.

### Video — `app/video/page.tsx` + `PlayerCard`
Esta pantalla ADOPTA campo `#0D0D0D` completo (R4) — es el respiro oscuro natural del atlas
(coincide con el v1 que ya usa `--frame-dark`). La cabecera "Video" pasa a peso Light sobre negro
con crosshair; los `PlayerCard` (video real + controles de texto) van sobre el campo oscuro.
Los controles de texto (`Pause`, `Unmute`, timecode) ya son LOCKED-compliant; solo cambian de
color a `--paper-on-ink`. La barra de progreso `--ink` → `--paper-on-ink`.
```tsx
<section className="kev-videos kev-field-ink">
  <div className="kev-videos__head">
    <h1 className="kev-videos__title" style={{ fontWeight:'var(--w-light)' }}>Video</h1>
    <span className="kev-counter"><span className="kev-bracket">{videoProjects.length} films</span></span>
  </div>
  {/* lista de PlayerCard sin cambios estructurales */}
</section>
```

### Information — `app/information/page.tsx`
Se mantiene sobre blanco (es el "índice" del atlas, debe leerse como documento).
Único toque Numinous: el lead bio gana peso Light (`--w-light`) en lugar de bold, y el
encabezado de cada columna (CLIENTS / SERVICES / CONTACT) gana brackets. Es el contraste
deliberado: tras los capítulos atmosféricos, Information es el colofón sobrio.

### Header + Cursor — `Header.tsx` / `Cursor.tsx`
- **Ticks → crosshair, misma familia:** el header conserva la regla de ticks; en pantallas con
  hero full-bleed el header se vuelve transparente sobre la imagen (`background: transparent`,
  wordmark y "Menu" en `--paper-on-ink`) con un scrim mínimo. La clase `.kev-ticks--anchored`
  (opt-in) marca con un tick más alto la columna del crosshair, hilando 1D↔2D.
- **Cursor circular:** se conserva. Evolución sutil: sobre campo `#0D0D0D` el cursor invierte a
  `rgba(242,240,236,0.18)` para mantener visibilidad. Sigue siendo círculo, sigue creciendo en hot.
- **Menu overlay:** en Variante C gana letras dispersas `.kev-scatter` (K·E·V·.) en las esquinas.

---

## PARTE E — Cumplimiento de LOCKED RULES (auto-check)

- [x] **Una sola grotesca.** Solo añadimos el peso **300** de Archivo (misma familia). Sin serifas,
      sin itálicas, sin segunda fuente. Neue Montreal → traducido a pesos Light/Regular.
- [x] **Naranja único acento de UI.** No se introduce ningún color de UI nuevo. Los campos cálidos
      vienen de las FOTOS (R: "la imagen habla"), no de fills. El negro `#0D0D0D` es campo, no acento.
- [x] **Esquinas cuadradas, controles de texto, único glifo →.** Crosshair y divider son líneas,
      no formas redondeadas. Cero iconos nuevos. `View →`, `Pause`, brackets `( )` son texto.
- [x] **Motion quieto fílmico.** Crosshair y capítulos entran por cross-fade (`--t-chapter`/`--ease-io`),
      sin bounce, sin slide, sin parallax, sin sombras. `prefers-reduced-motion` respetado.
- [x] **Mobile-first, 100dvh, IA intacta.** `.kev-hero` colapsa a 1 columna en mobile; el grid de
      anclas se apila TL→BL. Las 6 pantallas y su orden se conservan exactamente.
- [x] **`lib/media.ts` y `lib/data.ts` intocables.** Todo consume `projects`, `info`, `Media`,
      `mediaUrl` tal cual. Cero edición de datos/media.
- [x] **Ticks + cursor evolucionan, no desaparecen.** Ticks → crosshair (misma familia hairline);
      cursor → invierte color sobre negro, sigue circular.
- [x] **Blanco base; #0D0D0D segundo campo.** Variantes graduadas: A casi todo blanco; C alterna.
- [x] **Prohibidos evitados.** Sin Inter/Roboto, sin gradients purple-blue, sin cards-in-cards
      (las chapter cards son full-bleed, no tarjetas anidadas), sin icon tiles, sin libs.
      El único scrim es la "protección mínima de texto sobre full-bleed" que el propio v1 README permite.

### Desvíos señalados (transparencia)
1. **Diagonal hairline (R4 de la img 04):** NO la adopto globalmente; la dejo fuera para no
   competir con el crosshair. Si se quiere, sería opt-in en chapter cards. Desvío consciente del referente.
2. **Peso Light 300:** no estaba en el `colors_and_type.css` v1 (que empieza en 400). Es una
   ampliación deliberada de la escala de pesos, justificada por el ADN Numinous (R3) y avalada por
   el brief ("introducir pesos Light/Regular para titulares atmosféricos").

---

## PARTE F — Orden de implementación sugerido
1. Añadir weight `300` a Archivo en `app/layout.tsx`.
2. Pegar la "NUMINOUS LAYER" en `globals.css` (additive).
3. Implementar `.kev-hero` + `.kev-crosshair` y aplicar a **Home (Variante C)** como prueba de fuego.
4. Llevar Video a `.kev-field-ink`.
5. Chapter cards en `ProjectView` (Variante B/C) + brackets en contadores.
6. Toques finos: brackets en Work/Information, header transparente sobre hero, cursor invertido.
7. Validar con Playwright contra los 7 referentes en `localhost:3001`.

La gracia: una sola clase raíz (`atlas-quiet|atlas-chapters|atlas-numinous`) escala la dosis de
Numinous sin reescribir pantallas — el usuario elige el punto exacto de la fusión.
