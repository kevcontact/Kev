# KEV × Numinous — Propuesta "variants" (3 variantes)

> **Proposer:** `variants` (MoE de diseño, front-tool Round 0)
> **Ángulo:** tres filosofías de fusión radicalmente distintas, todas respetando las LOCKED RULES.
> Cada una cubre Home / Work index / Project (Gallery·Overview) / Video / Information / Header·Cursor, en mobile y desktop, con código CSS/TSX clave.
> **Objetivo:** que el orquestador pueda elegir una, o hacer mix-and-match (p.ej. "tokens de A + Home de C").

---

## 0. Diagnóstico del punto de partida

El v1 actual (worktree) es ya un sistema editorial sólido y limpio: blanco-papel, Helvetica/Archivo heavy, naranja `#FF4D17` como único acento, ticks film-strip, cursor circular, secciones 100dvh. **El riesgo del rediseño NO es añadir cosas Numinous, es diluir la disciplina del v1 con ruido.** Las 3 variantes parten de eso.

El ADN Numinous a absorber, traducido a los términos de KEV:

| ADN Numinous | Traducción KEV (sin romper locked rules) |
|---|---|
| Imagen cálida motion-blur full-bleed | Usar **media real de KEV** (posters de video, fotos balvin/maluma) full-bleed en momentos clave — no inventar texturas |
| Pesos Light/Regular protagonistas | Añadir peso **300 (Light)** y **400** a Archivo; titulares atmosféricos finos. Heavy (800) se reserva para wordmark + acentos |
| Retícula hairline / crosshair con micro-marca | Evolucionar `.kev-ticks` → sistema `--hair` con crosshair `Kev.` en la intersección |
| Texto blanco fino anclado a esquinas | Layout de 4 anclas (titular ↖, nav ↗, párrafo ↙, créditos ↘) sobre full-bleed |
| Tagline entre paréntesis curvos `( … )` | Recurso gráfico: `( Latin culture. Fashion frame. )` |
| Letras dispersas de la marca | `K · E · V` dispersas en esquinas (papelería / transiciones de capítulo) |
| Negro `#0d0d0d` gana terreno | Segundo campo en pantallas alternas (chapters, Video) |

### Prerrequisito común a las 3 variantes (token de fuente)

Numinous vive de los pesos finos. Hay que **añadir el peso 300** a la carga de Archivo (hoy es `['400','500','600','700','800','900']`):

```tsx
// app/layout.tsx
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'], // + 300 Light
  variable: '--font-archivo',
  display: 'swap',
})
```

```css
/* globals.css — nuevo token de peso (las 3 variantes lo usan) */
:root { --w-light: 300; }
```

Archivo no tiene cursiva → cumple "sin itálicas" de forma estructural. Bien.

---

# VARIANTE A — "Hara / El Vacío Cálido"
### Filosofía: Kenya Hara (emptiness / 余白). El blanco no es fondo, es contenido.

**Tesis:** Numinous no es "imagen full-bleed por todas partes" — es **un solo momento numinoso** rodeado de inmenso vacío. KEV ya es vacío blanco; esta variante mantiene el blanco como protagonista absoluto y deja que la atmósfera cálida entre **una vez**, como una respiración, en el Home. Todo lo demás es la galería editorial intacta, ahora con titulares en peso Light. Es la opción **segura / de alta gama**: el menor desvío del v1, el mayor refinamiento.

### Tokens (delta sobre v1)
```css
:root[data-variant="hara"] {
  --w-display: var(--w-light);     /* titulares finos, no heavy */
  --ls-mega: -0.01em;              /* tracking casi neutro, aire */
  --hair: #ECECEC;                 /* sin cambios — la hairline es sagrada */
  /* el negro NO gana terreno: blanco puro en todo el recorrido */
}
```

### Home — mobile
- 100dvh blanco. **Una sola** imagen cálida de KEV (poster de `reel-kev` o foto balvin) ocupa un rectángulo central de ~62vh, **matted** (no full-bleed) — flota en blanco con `--s-9` de aire arriba.
- Sobre/junto a la imagen: crosshair hairline finísimo con micro-`Kev.` en la intersección.
- Las 4 palabras del menú **debajo** de la imagen, en peso Light (`--w-light`), apiladas, tracking neutro. La palabra hover sube a Regular.
- Tagline `( Less noise. The frame. )` en `--fs-label`, color `--fg2`, abajo.

### Home — desktop
- Imagen matted desplazada a la **derecha** (columna 7-12 de 12), las 4 palabras Light gigantes a la izquierda alineadas a baseline inferior. Crosshair atraviesa toda la viewport en hairline `#ECECEC` (vertical + horizontal), micro-`Kev.` exacto en el centro geométrico.
- Mucho aire: `--s-11` arriba.

### Work index
- **Idéntico al v1** (es ya perfecto para Hara), salvo: nombres de proyecto pasan de `--w-bold` a `--w-medium`; el preview hover (desktop) crece a `42vw` y se centra verticalmente con más calma (pan más lento, `14s`).

### Project — Gallery
- Sin cambios estructurales. La imagen flota en 88vh de blanco. Counter `05 / 34` abajo-izq. **El vacío es el lujo.**

### Project — Overview
- Masonry intacto. Tag naranja solid. Único refinamiento: gutter sube a `clamp(12px, 1.8vw, 24px)` para más aire entre piezas.

### Video
- Lista vertical de players sobre blanco, intacta. Controles de texto. El único toque Numinous: cada player lleva un crosshair hairline corto (esquina ↖ del frame) con micro-`Kev.`.

### Information
- Intacto, pero el lead-bio pasa a `--w-light` y se agranda a `--fs-h1`, con `( … )` envolviendo la línea de servicios.

### Header / Cursor
- Ticks film-strip **intactos**. Cursor circular intacto. (Hara no toca la marca registrada.)

**Cuándo elegir A:** si el cliente quiere "Numinous pero sin perder ni un gramo de la pureza KEV". Mínimo riesgo. La fusión vive en **un solo gesto** (el Home) y en el cambio de peso a Light.

---

# VARIANTE B — "Field.io / Retícula Habitada"  ⭐ (la recomendada para implementar)
### Filosofía: Field.io + sistematismo suizo. La hairline no decora: estructura.

**Tesis:** El crosshair de Numinous es lo más fuerte y lo más portable a KEV — porque KEV **ya tiene** la regla de ticks. Esta variante eleva el film-strip a un **sistema de retícula vivo**: crosshair vertical+horizontal con micro-`Kev.` en cada pantalla clave, diagonales hairline en las tarjetas alternas, y el negro `#0d0d0d` ganando terreno como segundo campo en "chapters" full-bleed entre secciones. Es la fusión más **completa y reconociblemente KEV×Numinous**, y la que mejor respeta TODAS las locked rules a la vez.

### Tokens (delta sobre v1)
```css
:root {
  /* retícula */
  --grid-line: #ECECEC;          /* crosshair sobre blanco */
  --grid-line-dark: rgba(255,255,255,0.16); /* crosshair sobre negro/imagen */
  --field: #0D0D0D;              /* segundo campo (chapters, alternancia) */
  --field-ink: #E8E8E8;          /* texto sobre campo negro (de tokens Numinous) */
  --w-display: var(--w-light);   /* titulares atmosféricos finos */
}
```

### Sistema de retícula (componente nuevo, CSS puro — las pantallas lo invocan)
```css
/* crosshair full-screen: vertical + horizontal hairline + micro-marca centrada */
.kev-crosshair { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
.kev-crosshair::before,                 /* vertical   */
.kev-crosshair::after {                 /* horizontal */
  content: ""; position: absolute; background: var(--grid-line);
}
.kev-crosshair::before { left: 50%; top: 0; bottom: 0; width: 1px; transform: translateX(-.5px); }
.kev-crosshair::after  { top: 50%; left: 0; right: 0; height: 1px; transform: translateY(-.5px); }
.kev-crosshair[data-on-image] { --grid-line: var(--grid-line-dark); }
.kev-crosshair__mark {            /* micro-"Kev." en la intersección */
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  font-weight: var(--w-heavy); font-size: 11px; letter-spacing: -.03em;
  line-height: 1; padding: 4px 6px; background: var(--paper);
  color: var(--ink);
}
.kev-crosshair[data-on-image] .kev-crosshair__mark { background: transparent; color: var(--field-ink); }
```

```tsx
// components/Crosshair.tsx
export function Crosshair({ onImage = false }: { onImage?: boolean }) {
  return (
    <div className="kev-crosshair" data-on-image={onImage ? '' : undefined} aria-hidden>
      <span className="kev-crosshair__mark">Kev.</span>
    </div>
  )
}
```

### Home — mobile
- 100dvh, **full-bleed** con poster cálido de KEV (`reel-kev-poster` o frame balvin), `object-fit: cover`. Scrim de protección sutil arriba y abajo (gradient mínimo, permitido por la regla).
- 4 anclas Numinous:
  - ↖ titular: `Kev.` + 3 líneas Light en blanco (`Photographer / & director / Latin culture · fashion`)
  - ↗ `Menu` (abre overlay) — texto, no icono
  - ↙ las 4 palabras del menú apiladas en Light blanco
  - ↘ créditos `Medellín · Miami · CDMX — 2026`
- `<Crosshair onImage />` con `Kev.` blanco en la intersección.

### Home — desktop
- Full-bleed cálido. Titular Light 3 líneas ↖, nav fina ↗ (`Photography  Overview  Video  Information` en una fila, hover dim-the-rest), párrafo ↙, créditos ↘. Crosshair completo atraviesa la pantalla, `Kev.` centrado. **Es literalmente `06-hero-desktop-crosshair` con media de KEV y nav de KEV.**

```tsx
// app/page.tsx (Variante B)
import { MenuList } from '@/components/MenuList'
import { Crosshair } from '@/components/Crosshair'
import { Media } from '@/components/Media'
import { projectBySlug } from '@/lib/data'

export default function Home() {
  const hero = projectBySlug('showreel')! // poster cálido real de KEV
  return (
    <section className="kev-home kev-home--bleed">
      <Media item={hero.cover} className="kev-home__bg" alt="" loading="eager"
             style={{ aspectRatio: 'auto' }} />
      <div className="kev-home__scrim" />
      <Crosshair onImage />
      <div className="kev-home__tl kev-caps">Kev. — Photographer &amp; Director</div>
      <h1 className="kev-home__title">Latin culture.<br/>Fashion frame.<br/>Stillness in motion.</h1>
      <div className="kev-home__menu"><MenuList /></div>
      <div className="kev-home__foot kev-counter">Medellín · Miami · CDMX — 2026</div>
      <div className="kev-home__tagline">( Less noise. The frame. )</div>
    </section>
  )
}
```

```css
.kev-home--bleed { position: relative; min-height: 100dvh; padding: 0; overflow: hidden; }
.kev-home__bg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
.kev-home__bg > img, .kev-home__bg > video { width: 100%; height: 100%; object-fit: cover; }
.kev-home__scrim {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(to bottom, rgba(0,0,0,.28), transparent 22%, transparent 70%, rgba(0,0,0,.34));
}
.kev-home__tl, .kev-home__title, .kev-home__menu, .kev-home__foot, .kev-home__tagline {
  position: absolute; z-index: 2; color: #fff;
}
.kev-home__tl     { top: calc(var(--header-h) + 4vh); left: var(--pad-x); }
.kev-home__title  { top: calc(var(--header-h) + 9vh); left: var(--pad-x);
  font-size: var(--fs-h1); font-weight: var(--w-light); line-height: 1.18; letter-spacing: -.01em; }
.kev-home__menu   { left: var(--pad-x); bottom: 14vh; }
.kev-home__foot   { right: var(--pad-x); bottom: 5vh; color: rgba(255,255,255,.7); }
.kev-home__tagline{ left: var(--pad-x); bottom: 5vh; color: rgba(255,255,255,.7); font-size: var(--fs-label); }
/* MenuList sobre imagen → blanco fino */
.kev-home--bleed .kev-menulist__item { color: #fff; font-weight: var(--w-light); }
.kev-home--bleed .kev-menulist:hover .kev-menulist__item { opacity: .4; }
.kev-home--bleed .kev-menulist__item:hover { opacity: 1 !important; font-weight: var(--w-regular); }
@media (min-width: 880px) {
  .kev-home__menu { display: none; }            /* desktop: nav va arriba-der */
  .kev-home__title { font-size: var(--fs-display); max-width: 14ch; }
}
```

### Work index
- Base v1 (lista hairline + preview hover). **Plus:** cuando NO hay hover, el área de preview (desktop) muestra un crosshair hairline con `Kev.` — la retícula nunca está vacía. Nombres en `--w-medium`.

### Project — Gallery / Overview
- **Chapter de entrada (nuevo):** al abrir un proyecto, una pantalla 100dvh negra `--field` con título del proyecto en Light `--field-ink`, línea divisoria horizontal hairline, créditos pequeños y tagline `( client · year )` entre paréntesis — exactamente `05-poster-grid-blur`. Si el cover es video, se reproduce muted full-bleed detrás con scrim. Scroll → entra la Gallery blanca v1.
- **Gallery:** intacta (vacío blanco). Counter abajo-izq.
- **Overview:** masonry v1 + **diagonales hairline** en las celdas que llevan tag (de `04-mobile-cards-4up`): una línea fina cruza la esquina de la celda. Tag naranja solid intacto.

```css
.kev-chapter {
  min-height: 100dvh; position: relative; background: var(--field); color: var(--field-ink);
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: calc(var(--header-h) + 6vh) var(--pad-x) 8vh;
}
.kev-chapter__title { font-size: var(--fs-display); font-weight: var(--w-light); letter-spacing: -.02em; }
.kev-chapter__rule  { height: 1px; background: var(--grid-line-dark); margin: 24px 0 14px; }
.kev-chapter__meta  { color: rgba(232,232,232,.6); font-size: var(--fs-label); }
/* diagonal hairline en celda Overview con tag */
.kev-overview-grid__cell--marked .frame::before {
  content: ""; position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background: linear-gradient(to top right, transparent calc(50% - .5px), rgba(255,255,255,.5) 50%, transparent calc(50% + .5px));
}
```

### Video
- Lista de players sobre **campo negro `--field`** (alternancia Numinous: Video es la pantalla "negra"). Texto y controles en `--field-ink`. Barra de progreso en blanco. El negro hace que los videos respiren mejor. Header se vuelve transparente sobre negro (texto blanco).

### Information
- Sobre blanco. Lead-bio en Light grande. Letras dispersas `K` ↖ `E` (centro) `V` ↘ del lienzo en hairline gigante `--fg3` detrás del texto (de `07-business-cards`), opacidad baja, decorativo y reconocible.

### Header / Cursor
- **Ticks evolucionan, no desaparecen:** el film-strip sigue entre `Kev.` y `Menu`, pero ahora es conceptualmente "el eje horizontal del crosshair". Sobre Home/Chapter/Video (campos oscuros/imagen) el header se vuelve transparente con texto blanco y ticks en `--grid-line-dark`.
- Cursor circular intacto; sobre `data-hot` crece (ya lo hace).

```css
.kev-header[data-over-dark] { background: transparent; }
.kev-header[data-over-dark] .kev-header__mark,
.kev-header[data-over-dark] .kev-header__menu { color: #fff; }
.kev-header[data-over-dark] .kev-ticks { --tick: rgba(255,255,255,.4); }
```
```tsx
// Header detecta campo oscuro vía pathname o prop desde el layout de página
const overDark = pathname === '/' || pathname === '/video' || pathname.startsWith('/work/')
<header className="kev-header" data-over-dark={overDark ? '' : undefined}> … </header>
```

**Cuándo elegir B:** es la fusión **canónica** del brief — crosshair + micro-marca + chapters negros + diagonales + tagline en paréntesis + letras dispersas, todo con media real de KEV y cero violaciones de las locked rules. Es la que "se ve KEV×Numinous a primera vista". **Recomendada como base de implementación.**

---

# VARIANTE C — "Pentagram / Editorial Poster"
### Filosofía: Pentagram — tipografía como arquitectura de información; cada pantalla es un cartel.

**Tesis:** Numinous trata cada artefacto como un **poster** (ver `05-poster-grid-blur`). Esta variante es la más **audaz tipográficamente**: convierte cada pantalla en una composición editorial con jerarquía por tamaño (no por peso), el wordmark Heavy contrastando con titulares Light enormes, y la imagen cálida como "campo de color" que invade desde un borde. El naranja se usa con precisión quirúrgica de editor. Es la opción **expresiva / de portafolio de autor**.

### Tokens (delta sobre v1)
```css
:root[data-variant="pentagram"] {
  --fs-poster: clamp(3rem, 18vw, 12rem);  /* titular-cartel, aún más grande */
  --w-display: var(--w-light);
  --ls-poster: -0.04em;                    /* tracking muy cerrado en gigante */
  --field: #0D0D0D;
}
```

### Home — mobile
- Composición de cartel: `Kev.` Heavy pequeño ↖. Debajo, **una palabra del menú gigantísima** (`--fs-poster`, Light) rota lentamente entre las 4 (cross-fade `--t-film`, sin bounce) — actúa de hero tipográfico. Media cálida de KEV invade desde el borde inferior como banda full-width de ~30vh. Línea divisoria horizontal hairline entre tipo e imagen. Tagline `( … )` ↘.

### Home — desktop
- Gran titular Light a la izquierda (`Latin culture, fashion frame`), wordmark Heavy contrastando arriba. Imagen cálida ocupa la mitad derecha full-height como campo de color. Línea divisoria **vertical** hairline separa tipo / imagen. Nav fina ↗. Las 4 palabras como índice numerado `01 Photography  02 Overview …` abajo-izq.

### Work index
- **Numerado editorial:** cada fila lleva índice `01 … 15` zero-padded a la izquierda (Pentagram love). Nombre en Light grande, tracking cerrado. Hover: la fila salta a Regular y el preview entra como banda lateral. Línea divisoria entre el bloque de título y la lista.

### Project — Gallery / Overview
- **Chapter-poster de entrada:** igual que B pero con la tipografía mandando — título a `--fs-poster` Light, claim arriba-izq, línea divisoria, créditos abajo-der, tagline `( client · year )`. Negro o imagen full-bleed.
- **Gallery:** una imagen por scroll, pero acompañada de un **número de cartel gigante** (`01`, `02` …) en `--fs-poster` Light `--fg3` detrás/junto, marca de página de catálogo.
- **Overview:** masonry, pero cada pieza con micro-créditos editoriales abajo (proyecto · año) en `--fs-tag`, no solo el tag naranja. Diagonal hairline opcional.

### Video
- Cada film es un **poster de cine**: título a `--fs-h1` Light, número `01/08`, línea divisoria, créditos. El player debajo. Alternancia de campo: films impares sobre blanco, pares sobre `--field` negro (ritmo de catálogo).

### Information
- Página-colofón editorial: bio como gran bloque de texto Light justificado a una columna estrecha, clientes/servicios como índice numerado, letras dispersas `K E V` Heavy gigantes en las esquinas (papelería `07`).

### Header / Cursor
- Ticks film-strip se reinterpretan como **regla de medición tipográfica** (mismo dibujo CSS). Cursor circular intacto; sobre titulares-cartel crece más (`--is-hot` a 64px) — el cursor "lee" el cartel.

**Cuándo elegir C:** si KEV quiere un portafolio que se sienta de **autor / revista de diseño**, con la tipografía como protagonista absoluto. Mayor riesgo de alejarse del minimalismo v1, pero el más memorable. Requiere disciplina para no caer en sobre-decoración.

---

## Comparación rápida

| Eje | A · Hara | B · Field.io ⭐ | C · Pentagram |
|---|---|---|---|
| Desvío del v1 | Mínimo | Medio | Alto |
| Riesgo | Bajo | Bajo-medio | Medio |
| Negro `#0d0d0d` gana terreno | No | Sí (chapters, Video) | Sí (alternancia) |
| Full-bleed cálido | Solo Home (matted) | Home + chapters | Home (banda/mitad) + chapters |
| Crosshair + micro-marca | Discreto | **Sistema central** | Como divisoria |
| Tipografía | Light, calma | Light + retícula | **Poster gigante, jerarquía por tamaño** |
| Tagline `( … )` / letras dispersas | tagline | ambos | ambos + numeración |
| Cumple TODAS las locked rules | ✅ | ✅ | ✅ |
| Mejor para | Pureza / alta gama | Fusión canónica del brief | Autor / editorial |

---

## Notas de implementación comunes (las 3)

1. **Fuente:** añadir `300` a `weight` en `app/layout.tsx` + token `--w-light: 300`. Sin esto, los titulares "Light" caen a 400 y se pierde el ADN Numinous.
2. **Media real, no inventada:** todos los full-bleed/posters usan `Media` + `lib/data.ts` (covers reales: `showreel`, `j-balvin`, `maluma-x-maisak`, posters de video-clips). `lib/media.ts` y `lib/data.ts` quedan **intactos** — solo se consumen.
3. **Locked rules verificadas:** una sola grotesca (Archivo, sin itálicas) · naranja `#FF4D17` solo en tags/`View →` (nunca campo) · esquinas cuadradas · controles de texto + único glifo `→` · cross-fades ease-out sin bounce/sombra · 100dvh · IA intacta (Home/Photography/Overview/Project/Video/Information) · ticks y cursor evolucionan, no desaparecen · blanco base, negro como segundo campo.
4. **`prefers-reduced-motion`:** el cross-fade de palabras (C), el pan de previews y el autoplay de chapters respetan la media query ya existente en `globals.css`.
5. **Scrims:** el único uso de gradient permitido es el scrim de protección de texto sobre imagen (header + Home full-bleed) — coherente con la nota del v1 "minimal protection gradient under header text". Nada de gradients decorativos AI-slop.
6. **Accesibilidad de contraste:** texto blanco sobre imagen cálida siempre con scrim (≥4.5:1); `--field-ink #E8E8E8` sobre `#0D0D0D` = ~15:1; naranja sobre blanco solo en micro-tags (uso puntual, no body).
7. **Header data-over-dark:** patrón mínimo (prop/pathname) para que header + ticks se inviertan a blanco sobre campos oscuros sin duplicar componentes.
8. **Variante recomendada para Round siguiente: B** — es la más fiel al brief, la de menor riesgo de violar reglas, y la más reconocible como fusión. A y C son extraíbles como "skins" vía `data-variant` para mix-and-match.
