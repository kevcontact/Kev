# Propuesta — proposer **styles** (front-tool · Mixture-of-Experts)

> Ángulo: **el style-guide exacto** que fusiona editorial-fashion-portfolio con la atmósfera Numinous, derivado de la base de 67 UI styles de `ui-ux-pro-max`, traducido a tokens KEV concretos.
> Entrega: **una propuesta con 3 variantes** (un solo archivo de tokens + reglas), implementable hoy sobre el worktree `redesign/numinous`.

---

## 0. El style-guide exacto (de los 67)

La búsqueda en `ui-ux-pro-max` apunta sin ambigüedad a una **tríada**, no a un solo estilo. KEV v1 ya *es* el primero; Numinous aporta el segundo y el tercero:

| # | Style Category (CSV) | Rol en la fusión | Qué aporta exactamente |
|---|---|---|---|
| 1 | **Minimalist Monochrome** (Mobile/editorial) | **Espina dorsal** (ya es KEV v1) | `border-radius: 0`, sin sombras (profundidad = hairline + inversión), **inversión por sección** blanco↔negro, paper-noise `opacity .03`, full-bleed `100dvh`, tipografía como visual primario. Sus tokens propios: `--border-hairline: 1px #E5E5E5`, `--border-thin: 1px #000`. |
| 2 | **Swiss Modernism 2.0** | **Sistema de retícula** (Numinous) | Grid matemático, `base-unit 8px`, jerarquía clara, **un solo acento**. Justifica formalmente el **crosshair hairline** y las diagonales de tarjeta. |
| 3 | **Motion-Driven + Minimalism** | **Movimiento** (recomendado por el CSV para *Photography Studio* y *Portfolio/Personal*) | Cross-fades filmicos, reveal-on-scroll suave, sin parallax-gimmick. Es exactamente `--t-film 900ms` + `--ease` que KEV ya tiene. |

**Decisión de estilo:** mantener Minimalist Monochrome como base **pero invertir la regla de Swiss "single accent"** hacia los **pesos** en vez del color. Numinous traduce su Neue Montreal Light/Normal/Medium → en KEV se vuelve **jerarquía por TAMAÑO+PESO-FINO**, no por heavy. El naranja sigue siendo el único acento de color (LOCKED). El "segundo acento" que Swiss permitiría lo ocupa el **campo negro `#0D0D0D`** (pantallas alternas), no un color nuevo.

Anti-patrones del CSV que esto evita (y que el brief prohíbe): nada de Inter/Playfair (Minimalist Monochrome sugiere serif → **rechazado**, LOCKED una sola grotesca), nada de glassmorphism/aurora del "Photography Studio secondary" → **rechazado** (LOCKED opaco/flat).

---

## 1. ADN Numinous → token KEV (tabla de traducción)

| ADN del referente | Traducción literal a KEV (sin romper LOCKED) |
|---|---|
| Neue Montreal **Light/Normal/Medium** en titulares | Pesos **300/400/500** de Archivo en titulares atmosféricos; Heavy 800 se reserva al wordmark `Kev.` y al menú-home. Jerarquía por **tamaño**, no por peso. |
| Paleta `#0d0d0d / #e8e8e8 / #ffffff` | KEV ya tiene `#0D0D0D` y `#FFFFFF`. Se añade `--field` (= `#0D0D0D`) como **segundo campo** y `--ink-on-field` (`#E8E8E8`) para texto fino sobre negro. |
| Crosshair vertical+horizontal con micro-marca en la intersección | Nuevo sistema `.kev-grid` (overlay hairline) + `.kev-grid__mark` con `Kev.` minúsculo. **Evoluciona** los ticks film-strip, no los borra. |
| Texto blanco fino anclado a esquinas sobre imagen | Layout de 4 anclas (`.kev-bleed__tl / __tr / __bl / __br`) reutilizable en Home-hero, entrada de proyecto y posters. |
| Tagline entre paréntesis curvos `( … )` | Helper `.kev-paren` (los paréntesis son glifos de la grotesca, no segunda fuente). Único uso de paréntesis como recurso gráfico. |
| Motion-blur full-bleed cálido | Se usa **media real de KEV** (stills/posters de video) full-bleed; el color lo pone la foto (LOCKED "el contenedor calla"). |
| Letras dispersas de la marca en esquinas (`N U Λ`) | KEV → `K E V` dispersas, **solo** en la pantalla de entrada de proyecto / Information desktop, en `--ink-3`, decorativas. |

---

## 2. TOKENS NUEVOS (añadir a `app/globals.css`, bloque `:root`)

> Solo **adiciones**. No se toca ningún token existente (compatibilidad total con v1). Nada de libs, nada de segunda fuente.

```css
:root {
  /* ───────── CAMPO NEGRO (segundo campo Numinous, alterno) ───────── */
  --field:          #0D0D0D;   /* pantallas/secciones alternas */
  --field-2:        #131313;   /* sub-superficie sobre negro (= frame-dark) */
  --ink-on-field:   #E8E8E8;   /* texto fino sobre negro (paleta Numinous) */
  --ink-on-field-2: #8A8A8A;   /* secundario sobre negro */
  --hair-on-field:  rgba(232,232,232,0.16); /* hairline sobre negro */
  --tick-on-field:  rgba(232,232,232,0.34); /* ticks sobre negro */

  /* ───────── PESOS FINOS (traducción Neue Montreal Light/Normal) ───────── */
  --w-light:   300;   /* titulares atmosféricos Numinous */
  --w-regular: 400;   /* (ya existe) cuerpo y subtítulos finos */
  /* --w-heavy 800 (ya existe) → SOLO wordmark + home-menu */

  /* ───────── ESCALA FINA (titulares ligeros, anclados a esquina) ─────────
     Más contenida que --fs-mega: titular Numinous es fino y se lee, no grita. */
  --fs-fine-xl: clamp(2rem, 5.5vw, 4rem);    /* hero/poster headline (light) */
  --fs-fine-lg: clamp(1.5rem, 3.4vw, 2.5rem);/* entrada de proyecto         */
  --fs-fine-md: clamp(1.05rem, 1.8vw, 1.35rem);/* claim/párrafo de ancla    */

  /* ───────── SISTEMA HAIRLINE / CROSSHAIR (Swiss grid → KEV) ───────── */
  --hairline:   1px;
  --grid-mark:  10px;          /* tamaño del micro-"Kev." en la intersección */
  --grid-inset: var(--pad-x);  /* el crosshair respeta el gutter editorial   */

  /* ───────── MOTION (extiende, no reemplaza) ───────── */
  --t-grid: 1200ms;            /* dibujado del crosshair (scaleX/scaleY) */
}
```

### Helpers tipográficos nuevos

```css
/* Titular fino atmosférico (Numinous), tracking casi neutro */
.kev-fine {
  font-weight: var(--w-light);
  letter-spacing: -0.01em;
  line-height: 1.08;
  text-wrap: balance;
}
.kev-fine--xl { font-size: var(--fs-fine-xl); }
.kev-fine--lg { font-size: var(--fs-fine-lg); }
.kev-fine--md { font-size: var(--fs-fine-md); font-weight: var(--w-regular); }

/* Tagline entre paréntesis curvos — recurso gráfico de marca */
.kev-paren { color: var(--fg2); font-weight: var(--w-regular); }
.kev-paren::before { content: "( "; }
.kev-paren::after  { content: " )"; }

/* Texto fino blanco sobre campo negro */
.on-field   { color: var(--ink-on-field); }
.on-field-2 { color: var(--ink-on-field-2); }
```

---

## 3. EL SISTEMA HAIRLINE/CROSSHAIR (la pieza central de la fusión)

Componente nuevo `components/Grid.tsx` — overlay puramente decorativo, `pointer-events: none`, reutilizable en cualquier full-bleed. Evoluciona los ticks: el film-strip vive arriba (header), el crosshair lo extiende a toda la pantalla.

```tsx
// components/Grid.tsx
/** Crosshair hairline Numinous: línea V+H que parte el lienzo en cuadrantes,
 *  con micro-"Kev." en la intersección. Decorativo, no captura puntero. */
export function Grid({ onField = false }: { onField?: boolean }) {
  return (
    <div className={'kev-grid' + (onField ? ' kev-grid--on-field' : '')} aria-hidden="true">
      <span className="kev-grid__v" />
      <span className="kev-grid__h" />
      <span className="kev-grid__mark">Kev.</span>
    </div>
  )
}
```

```css
/* Crosshair que respeta el gutter editorial; se dibuja al entrar */
.kev-grid { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
.kev-grid__v, .kev-grid__h { position: absolute; background: var(--hair); }
.kev-grid__v {
  top: 0; bottom: 0; left: 50%; width: var(--hairline);
  transform-origin: top; transform: scaleY(0);
}
.kev-grid__h {
  left: var(--grid-inset); right: var(--grid-inset); top: 50%; height: var(--hairline);
  transform-origin: left; transform: scaleX(0);
}
.kev-app.is-ready .kev-grid__v { transform: scaleY(1); transition: transform var(--t-grid) var(--ease) 120ms; }
.kev-app.is-ready .kev-grid__h { transform: scaleX(1); transition: transform var(--t-grid) var(--ease) 260ms; }
.kev-grid__mark {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
  font-size: var(--grid-mark); font-weight: var(--w-heavy); letter-spacing: -0.02em;
  color: var(--fg2); background: var(--paper); padding: 2px 4px; line-height: 1;
}
/* Variante sobre campo negro (pantallas alternas) */
.kev-grid--on-field .kev-grid__v,
.kev-grid--on-field .kev-grid__h { background: var(--hair-on-field); }
.kev-grid--on-field .kev-grid__mark { color: var(--ink-on-field-2); background: var(--field); }

@media (prefers-reduced-motion: reduce) {
  .kev-grid__v { transform: scaleY(1) !important; transition: none !important; }
  .kev-grid__h { transform: scaleX(1) !important; transition: none !important; }
}
```

### Layout de 4 anclas (texto fino blanco en esquinas, sobre full-bleed)

```css
.kev-bleed { position: relative; min-height: 100dvh; overflow: hidden; }
.kev-bleed > .frame, .kev-bleed > .frame > img, .kev-bleed > .frame > video {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
}
/* scrim mínimo SOLO bajo texto (LOCKED: sin blur, opaco/flat) */
.kev-bleed::after {
  content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    linear-gradient(to bottom, rgba(0,0,0,.34), transparent 24%, transparent 72%, rgba(0,0,0,.40));
}
.kev-bleed__layer { position: absolute; inset: 0; z-index: 3;
  padding: calc(var(--header-h) + 4vh) var(--pad-x) 5vh; }
.kev-bleed__tl { position: absolute; top: calc(var(--header-h) + 4vh); left: var(--pad-x);
  max-width: min(72vw, 18ch); }
.kev-bleed__tr { position: absolute; top: calc(var(--header-h) + 4vh); right: var(--pad-x); text-align: right; }
.kev-bleed__bl { position: absolute; bottom: 5vh; left: var(--pad-x); max-width: min(80vw, 40ch); }
.kev-bleed__br { position: absolute; bottom: 5vh; right: var(--pad-x); text-align: right; }
.kev-bleed__tl, .kev-bleed__tr, .kev-bleed__bl, .kev-bleed__br { color: var(--ink-on-field); }

/* Letras dispersas K E V (decorativas, esquinas) */
.kev-scatter { position: absolute; inset: 0; z-index: 2; pointer-events: none;
  color: rgba(232,232,232,.5); font-weight: var(--w-regular); font-size: 12px; letter-spacing: .12em; }
.kev-scatter span { position: absolute; }
.kev-scatter span:nth-child(1){ top: 18%; left: 7%; }   /* K */
.kev-scatter span:nth-child(2){ top: 64%; right: 9%; }  /* E */
.kev-scatter span:nth-child(3){ bottom: 12%; left: 38%; } /* V */
```

---

## 4. LAS 3 VARIANTES

Las tres comparten **todos los tokens y helpers de §2–3**. Difieren solo en **cuánto** del ADN Numinous se inyecta y **dónde**. La IA del sitio queda INTACTA en las tres (Home / Photography / Overview / Project[Gallery|Overview] / Video / Information).

> Implementación: una sola flag de campo por pantalla. Recomiendo `data-variant` en `<html>` o, mejor, decidirlo por pantalla con la flag `onField`. Las tres son seleccionables sin reescribir componentes — solo props/clases.

### Variante A — **"Frame"** (conservadora · 80% v1)
*El blanco manda; Numinous entra como acento estructural.*

- **Home:** sigue siendo el menú editorial sobre **blanco**, PERO se le superpone el **crosshair `.kev-grid`** (micro-`Kev.` en el centro) y el top-label pasa a `.kev-paren`: `( Photographer & Director )`. Los ticks del header se mantienen idénticos.
- **Pesos:** titulares de sección (`Photography`, `Overview`, `Video`) bajan a `--w-light` 300 a `--fs-h1`. Wordmark/menú-home siguen Heavy 800.
- **Project entry:** una **lámina full-bleed** (`.kev-bleed`) con el `cover` del proyecto antes de la galería blanca: título `.kev-fine--lg` arriba-izq, `cliente · año` abajo-izq, crosshair on-field. Luego la galería editorial blanca **sin cambios**.
- **Negro:** mínimo — solo la lámina de entrada de proyecto y los players de Video (ya son `frame--dark`).
- **Riesgo:** el más seguro; casi no rompe nada de v1. Para clientes que quieran "v1 pero más Numinous".

### Variante B — **"Chapters"** (equilibrada · RECOMENDADA)
*Blanco como papel del recorrido + capítulos full-bleed entre secciones (alineado al brief §4).*

- **Home:** **hero full-bleed cálido** con un still/poster de KEV (p. ej. `artistas/balvin` o `video-clips/*-poster.jpg`) detrás del menú. Las 4 palabras en `--w-light` 300 **sobre la imagen** en blanco (`on-field`), ancladas abajo-izq (`.kev-bleed__bl`); top-der lleva un mini-nav fino opcional; crosshair on-field con `Kev.` al centro (réplica directa de `06-hero-desktop-crosshair`).
- **Work index (Photography/Overview):** **fondo blanco** editorial (la lista hover-preview se mantiene), pero el preview desktop ahora aparece dentro de un **cuadrante del crosshair** (la línea V divide lista | preview).
- **Project:** **entrada full-bleed tipo poster** (`05-poster-grid-blur`): claim fino arriba-izq + `.kev-paren` con micro-tagline + línea divisoria hairline + créditos abajo. La galería sigue blanca; la **Overview grid** alterna: cada N celdas, una celda **a sangre sobre campo negro** con su tag naranja (eco de `04-mobile-cards-4up`).
- **Video:** lista sobre **campo negro `--field`** (los videos viven mejor sobre negro, cine), controles de texto `on-field`, progress bar `--ink-on-field`. Crosshair on-field sutil.
- **Information:** blanco; lead en `--w-light`; columnas con hairlines; letras `K E V` dispersas en desktop.
- **Riesgo:** medio. Es la lectura más fiel del brief ("permitir capítulos full-bleed entre secciones"). **Mi recomendación.**

### Variante C — **"Numinous"** (audaz · 60% Numinous)
*Inversión de campo agresiva: el negro gana terreno como base alterna.*

- **Home:** hero full-bleed como B, pero **el menú entero es fino** (`--w-light`, tamaño `--fs-fine-xl`, no `--fs-mega` heavy) — jerarquía 100% por tamaño, Numinous puro. Heavy solo sobrevive en el wordmark del header.
- **Alternancia de campo por pantalla** (patrón `04-mobile-cards-4up`): Home=imagen, Photography=blanco, Overview=**negro**, Video=**negro**, Information=blanco. El recorrido respira blanco↔negro como las 4 tarjetas del referente.
- **Project:** entrada poster full-bleed + galería que **hereda el campo del proyecto** (proyectos de video → galería sobre negro; foto → blanco).
- **Crosshair + letras dispersas** presentes en cada full-bleed.
- **Riesgo:** alto respecto a v1 ("blanco como base" se relaja — el brief lo permite explícitamente: *"#0d0d0d puede ganar terreno como segundo campo"*). Para quien quiera el salto estético máximo manteniendo LOCKED (una grotesca, naranja único, cuadrado, texto-no-icono).

| | A · Frame | B · Chapters | C · Numinous |
|---|---|---|---|
| Home | menú blanco + crosshair | hero full-bleed + menú fino | hero + menú 100% light |
| Campo negro | mínimo | Video + celdas alternas | pantallas alternas completas |
| Pesos finos | sección heads | heads + hero | todo titular (incl. menú) |
| Fidelidad brief | parcial | **alta** | alta (audaz) |
| Riesgo vs v1 | bajo | medio | alto |

---

## 5. APLICACIÓN POR PANTALLA (Variante B, mobile-first + desktop)

### Home — `app/page.tsx`
```tsx
import { MenuList } from '@/components/MenuList'
import { Media } from '@/components/Media'
import { Grid } from '@/components/Grid'
import { projects } from '@/lib/data'

export default function Home() {
  const hero = projects[0].cover // still cálido real de KEV
  return (
    <section className="kev-bleed kev-home--bleed">
      <Media item={hero} className="kev-home__bg" loading="eager" style={{ aspectRatio: 'auto' }} />
      <Grid onField />
      <div className="kev-scatter"><span>K</span><span>E</span><span>V</span></div>

      <div className="kev-bleed__tl">
        <span className="kev-caps on-field-2">( Photographer &amp; Director )</span>
      </div>
      <nav className="kev-bleed__tr kev-home__nav">{/* mini-nav fino opcional, desktop */}</nav>

      <div className="kev-bleed__bl kev-home__menu rise-in">
        <MenuList variant="fine" />{/* fine = --w-light, on-field */}
      </div>
      <div className="kev-bleed__br kev-counter on-field-2">Medellín · Miami · CDMX — 2026</div>
    </section>
  )
}
```
> `MenuList` gana prop `variant?: 'mega' | 'fine'`. `fine` aplica `.kev-menulist--fine` (peso 300, `color: var(--ink-on-field)`, hover sube a 500 en vez de full-black). El comportamiento "dim the rest" se conserva.

```css
.kev-home--bleed { display: block; }            /* override del flex de .kev-home */
.kev-menulist--fine .kev-menulist__item {
  font-weight: var(--w-light); color: var(--ink-on-field);
  font-size: var(--fs-fine-xl); letter-spacing: -0.01em;
}
.kev-menulist--fine:hover .kev-menulist__item { opacity: .38; }
.kev-menulist--fine .kev-menulist__item:hover { opacity: 1 !important; font-weight: var(--w-regular); }
```

### Project entry (poster) — extensión de `ProjectView.tsx`
Insertar **antes** de `.kev-project__bar` una lámina de entrada (solo en scroll-top, fade-out al avanzar — o estática como capítulo):
```tsx
<header className="kev-bleed kev-project__entry">
  <Media item={project.cover} loading="eager" style={{ aspectRatio: 'auto' }} />
  <Grid onField />
  <div className="kev-bleed__tl">
    <h1 className="kev-fine kev-fine--lg on-field">{project.title}</h1>
    <span className="kev-paren on-field-2">{project.client}</span>
  </div>
  <div className="kev-bleed__bl">
    <span className="kev-caps on-field-2">{project.kind} · {project.year}</span>
  </div>
</header>
```
La galería blanca y el toggle Gallery/Overview siguen **idénticos** debajo. La línea divisoria hairline del poster = `border-bottom: 1px solid var(--hair-on-field)` bajo el claim.

### Overview grid — celda alterna sobre negro (`OverviewView`)
```css
/* cada 4ª celda a sangre sobre campo negro, eco de 04-mobile-cards */
.kev-overview-grid__cell--field { background: var(--field); padding: 18px; }
.kev-overview-grid__cell--field .kev-tag { color: var(--accent); } /* naranja se mantiene */
```
```tsx
const onField = i % 4 === 0
<div className={'kev-overview-grid__cell' + (onField ? ' kev-overview-grid__cell--field' : '')}>
```

### Video — campo negro
```css
.kev-videos--field { background: var(--field); }
.kev-videos--field .kev-videos__title,
.kev-videos--field .kev-player__title { color: var(--ink-on-field); font-weight: var(--w-light); }
.kev-videos--field .kev-player__ctl { color: var(--ink-on-field); }
.kev-videos--field .kev-player__prog { background: var(--hair-on-field); }
.kev-videos--field .kev-player__prog span { background: var(--ink-on-field); }
.kev-videos--field .kev-sub, .kev-videos--field .kev-counter { color: var(--ink-on-field-2); }
```
> Title de Video baja a `--w-light`; controles de texto (Pause/Mute) intactos (LOCKED text-no-icon). Único glifo sigue siendo `→`.

### Information — blanco, lead fino, letras dispersas (desktop)
```css
.kev-info__lead { font-weight: var(--w-light); }  /* Numinous: lead fino, no bold */
.kev-info { position: relative; }
@media (min-width: 880px) {
  .kev-info .kev-scatter { color: var(--ink-3); }  /* K E V tenues sobre blanco */
}
```

### Header / Cursor (evolución, no reemplazo)
- **Header:** los `.kev-ticks` se mantienen. Cuando la pantalla activa es full-bleed (Home-hero, project-entry), el header gana `.kev-header--over` → `background: transparent`, wordmark y `Menu` en `--ink-on-field`, ticks usan `--tick-on-field`. Scrim mínimo del `.kev-bleed::after` garantiza contraste ≥ 4.5:1.
```css
.kev-header--over { background: transparent; }
.kev-header--over .kev-header__mark,
.kev-header--over .kev-header__menu { color: var(--ink-on-field); }
.kev-header--over .kev-ticks {
  background-image: repeating-linear-gradient(to right,
    var(--tick-on-field) 0, var(--tick-on-field) 1px, transparent 1px, transparent var(--tick-gap));
}
```
- **Cursor:** el círculo gris se conserva. Sobre campo negro invierte a claro: `.kev-app[data-field="dark"] .kev-cursor { background: rgba(232,232,232,0.18); }` y `.is-hot` → `rgba(232,232,232,0.12)`. Misma física de easing.

---

## 6. CHECKLIST DE LOCKED RULES (verificación)

- [x] Una sola grotesca — solo se añaden **pesos** (300/400/500/800) de Archivo. Cero segunda fuente, cero serif, cero itálica.
- [x] Naranja `#FF4D17` = único acento de color (tags, hover `View →`). El negro es **campo**, no acento.
- [x] Esquinas cuadradas — `--r-0` en todo lo nuevo; solo cursor/dot redondos.
- [x] Controles de texto, único glifo `→` (Pause/Mute/Menu/Close intactos).
- [x] Motion quieto: crosshair se dibuja con `scaleX/scaleY` ease-out, cross-fades `--t-film`. Sin bounce, sin parallax, sin sombras. `prefers-reduced-motion` cubierto.
- [x] Mobile-first, `100dvh`, IA intacta (6 pantallas, mismas rutas).
- [x] `lib/media.ts` y `lib/data.ts` **no se tocan** — todo consume `cover`/`items` reales.
- [x] Ticks y cursor **evolucionan** (over-image, on-field), no desaparecen.
- [x] Blanco sigue base; `#0D0D0D` gana terreno como **segundo campo** (Video + celdas/pantallas alternas).
- [x] Contraste: texto sobre full-bleed siempre con scrim mínimo → blanco `#E8E8E8` sobre `rgba(0,0,0,.34+)` ≫ 4.5:1. Naranja sobre blanco/negro ≫ 4.5:1.
- [x] Sin gradients purple-blue, sin cards-in-cards, sin icon-tiles, sin libs.

---

## 7. Orden de implementación sugerido (para el implementer del pipeline)

1. Añadir tokens §2 a `globals.css` (solo adiciones — riesgo cero).
2. Crear `components/Grid.tsx` + CSS crosshair §3.
3. Añadir layout `.kev-bleed` + 4 anclas + `.kev-scatter` §3.
4. `MenuList`: prop `variant`. `Header`: clase `--over`. `Cursor`: variante on-field.
5. Aplicar Variante B pantalla por pantalla §5 (Home → Project-entry → Overview celdas → Video field → Information lead).
6. Validar en `http://localhost:3001` (no arrancar otro server) mobile + desktop, y `prefers-reduced-motion`.

**Variante recomendada para el visual-eval del pipeline: B (Chapters).** Es la lectura más fiel del brief y la que mejor fusiona el "papel editorial blanco" de KEV con los "capítulos full-bleed numinosos", sin sacrificar ninguna LOCKED rule.
