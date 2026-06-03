# Crítica cruzada — Proposer "Cámara Oscura" (dualidad papel/negro cálido con crosshair de visor)

> front-tool Round 2. Crítico: el proposer de `proposal-aesthetic.md` evaluando las
> 4 propuestas rivales contra la **rúbrica combinada**, las **LOCKED RULES** y la
> **fidelidad a los 7 referentes Numinous** (releídos: 01, 04, 05, 06).
> Honestidad obligada: señalo lo que cada rival hace mejor que yo, lo que roba-mérito,
> lo que viola reglas, y qué fusionaría.

---

## 0. Hallazgos de verificación (afectan a TODAS las propuestas, la mía incluida)

Antes de criticar, validé el worktree. Tres hechos que ninguna propuesta (ni la mía)
trató con suficiente rigor:

1. **`font-synthesis: none` está activo globalmente** (`globals.css:108`). El brief dice
   *"preferencia Helvetica del sistema"*. La Helvetica de macOS **no tiene un peso 300 real**;
   con `font-synthesis: none` NO se sintetiza faux-light → `--w-light: 300` **cae a 400** en
   el navegador del cliente (Safari/macOS). Archivo vía next/font SÍ trae 300 real, así que
   funciona cuando Archivo gana; pero el "ADN Light protagonista" se degrada justo en el
   entorno principal del usuario. **Solo `components` lo confirma explícitamente y lo asume como
   degradación señalada.** Las demás (styles, variants, references) lo dan por hecho. Mi
   propuesta también lo asumió. → Quien sintetice debe heredar el disclaimer de `components`.

2. **`.kev-app` SÍ recibe `is-ready`** (AppShell.tsx, `setTimeout 40ms`). Por tanto el reveal
   del crosshair gated en `.kev-app.is-ready` / `.kev-app:not(.is-ready)` (styles, variants,
   references, y el mío) es **técnicamente correcto**. El `useEffect`+`requestAnimationFrame`
   con `is-drawn` por-componente de `components` es **redundante** (reimplementa lo que AppShell
   ya da) — funciona, pero añade JS innecesario y un `'use client'` extra.

3. **Los slugs `showreel` y `j-balvin` existen**; `showreel.cover` es el `reel-kev.mp4` (video).
   Mi Home (`projectBySlug('showreel')`) y el de `components` (`projectBySlug('j-balvin')`)
   son ambos válidos. `references` usa `projects[0].items[6] ?? projects[0].cover` — **frágil**:
   asume que balvin tiene ≥7 items; si `data.ts` cambiara el orden o el conteo, rompe en silencio.
   `styles`/`variants` usan `projects[0].cover` — válido pero menos intencional que nombrar el slug.

4. **Fidelidad de referente que casi todos erramos:** en `04-mobile-cards-4up` y `05-poster-grid-blur`,
   la "micro-marca de la intersección" **NO es un texto "Kev."** — es el **lockup circular de
   paréntesis `( N Λ )`**, y las "diagonales" son una **X (ambas diagonales)**, no una sola.
   Todas las propuestas (incluida la mía) traducimos eso a un "Kev." de texto en la intersección
   + una sola diagonal. Es una traducción legítima (LOCKED prohíbe segunda fuente/glifos exóticos),
   pero **nadie ancló el `( )` curvo al wordmark mismo** como hace el referente. `references` (R2)
   es quien mejor lo razona conceptualmente, aunque tampoco lo dibuja.

---

## 1. Crítica: **proposal-styles** — "Numinous Editorial Monochrome"

### Lo que hace mejor que la mía (honesto)
- **Trazabilidad a un sistema.** Mapea la fusión a 3 estilos del corpus de 67 (Minimalist
  Monochrome + Swiss 2.0 + Motion-Driven) y **declara los anti-patrones rechazados** (serif de
  Minimalist Monochrome, glassmorphism del "Photography Studio"). Eso es defensa de rúbrica
  criterio 1 (Bold commitment + Anti-slop) más fuerte que mi narrativa "cuarto oscuro": yo cuento
  una historia, ellos demuestran *por qué* cada decisión evita slop. **Roba-mérito en el eje
  "anti-slop justificado".**
- **El `.kev-bleed` con 4 anclas explícitas (`__tl/__tr/__bl/__br`)** es más limpio y reusable que
  mi mezcla de `grid-template-rows` + clases ad-hoc por pantalla. Es directamente el patrón R1 de
  corner-anchoring del referente, y lo aplica idéntico en Home/Project/poster. Mi Home usa un
  `grid` de 3 filas que NO generaliza a las 4 esquinas tan bien.
- **`--ink-on-field #E8E8E8`** usa **la paleta exacta del referente** (`03-tokens`), mientras yo
  inventé `#F2EFEA` "cálido". El brief dice "el contenedor calla; el color viene de la foto" →
  un texto neutro `#E8E8E8` es más fiel que mi blanco-cálido inventado. **Mi `#F2EFEA` es un
  micro-desvío que no justifiqué bien; el suyo es canónico.**

### Lo que es más débil
- **Crosshair siempre al 50%/50% (centro muerto).** Su `.kev-grid__h { top: 50% }` ignora la
  **regla de tercios** que los referentes 01 y 06 muestran claramente (intersección a ~55-58%,
  bajo el centro óptico). Mi `--crosshair-y: 62%` / `58%` mobile y el `--crosshair-y: 58%` de
  `references` son **más fieles**. El centro geométrico exacto se siente template.
- **Home "Variante B" pone las 4 palabras del menú abajo-izquierda (`.kev-bleed__bl`)** sobre la
  imagen — pero en `06-hero-desktop-crosshair` la nav va **arriba-derecha** y es **fina horizontal**,
  no un stack de mega-palabras abajo. Su propio §5 mete un "mini-nav fino opcional" arriba-der pero
  deja el menú-protagonista abajo-izq: hay ambigüedad de a dónde mira el ojo. Mi Home tiene el mismo
  pecado (menú a la derecha en columna), así que **empate en infidelidad**, pero el referente es claro.
- **Overview "celda a sangre sobre negro cada 4" (`i % 4 === 0`)** es el toque más arriesgado y el
  menos defendido: ¿qué pasa con el masonry cuando una celda cambia de campo? Puede romper el ritmo
  de alturas. Es un eco de `04-mobile-cards` pero el referente alterna **pantallas completas**, no
  celdas dentro de un grid. Riesgo de "cards-in-cards" visual aunque técnicamente no lo sea.

### Violaciones de reglas
- Ninguna dura. El scrim `rgba(0,0,0,.34)` es el permitido. `.kev-paren` usa `--fg2` como color
  → **OJO**: sobre campo negro `--fg2` (gris medio del v1) podría caer < 4.5:1. No lo verificó
  para on-field; yo separé `--ink-on-dark-2` justo para eso. **MEDIUM.**

### Veredicto styles
Sólida, la más "sistematizada" y la de **mejor defensa anti-slop**. Su debilidad es el crosshair
centrado y un Home con jerarquía de mirada confusa. **7.5/10.**

---

## 2. Crítica: **proposal-variants** — "Hara / Field.io / Pentagram"

### Lo que hace mejor que la mía (honesto)
- **Diagnóstico de riesgo invertido (§0):** *"el riesgo del rediseño NO es añadir Numinous, es
  diluir la disciplina del v1 con ruido."* Es la frase más lúcida de todas las propuestas y la que
  yo debí escribir. Mi propuesta empuja el negro a los heros con entusiasmo; **variants me recuerda
  que el peligro real es sobre-decorar.** Roba-mérito en madurez de criterio.
- **Tres filosofías genuinamente distintas (Hara/Field.io/Pentagram)**, no tres diales de la misma
  perilla. Mis "Darkroom/Gallery/Cinema" son **la misma idea con más o menos velo ámbar** (lo admito
  en mi §7: "comparten 95% del código; solo cambian 4 variables"). Las suyas tienen **tesis estéticas
  separadas** — Hara (vacío), Field.io (retícula), Pentagram (poster). Eso da al orquestador
  opciones reales, no matices. **Mejor que mis variantes en diversidad.**
- **Variante C "Pentagram" con índice numerado `01…15` zero-padded** en el Work index y números de
  cartel gigantes en Gallery: es un gesto editorial fuerte, memorable y **100% on-brand grotesca**,
  que ninguna otra propuesta tiene. Aumenta el score de "Bold commitment" (rúbrica 1) por encima del mío.

### Lo que es más débil
- **Hara (Variante A) bordea el "safe minimal" que la rúbrica penaliza** (criterio 1: "NO safe
  minimal"). Es bonita pero es "v1 + peso Light"; como propuesta de rediseño es casi un no-op.
  Útil como skin, débil como dirección.
- **Pentagram "una palabra del menú gigantísima que rota entre las 4 con cross-fade"** en Home: es
  un hero tipográfico rotativo. **Riesgo de motion:** la rúbrica pide "1 hero animation, no 20
  micro-interactions" — una palabra que rota en loop es un loop de atención que puede chocar con
  "motion quieto fílmico". Lo marca como cross-fade sin bounce (bien), pero un texto que cambia solo
  es inquieto por naturaleza. **MEDIUM de fidelidad al "quieto".**
- **Menos código de pantalla concreto que styles/components/el mío.** Da CSS de tokens y crosshair,
  pero las pantallas se describen en prosa ("la imagen invade desde el borde", "banda lateral").
  Para el implementer del pipeline es **menos accionable** que styles o components.

### Violaciones de reglas
- Ninguna dura. Variante C Pentagram con "films pares sobre negro, impares sobre blanco" es la
  alternancia `04` más fiel de todas. Limpio.

### Veredicto variants
La más **estratégica y diversa**; su Field.io (B) coincide casi exactamente con mi Darkroom y con
references-B, lo que confirma que **ese es el centro de gravedad de toda la ronda**. Pentagram
aporta el gesto editorial más memorable. **8/10** — me gana en framing y en diversidad de variantes.

---

## 3. Crítica: **proposal-references** — "Crosshair Atlas"

### Lo que hace mejor que la mía (honesto)
- **La Parte A (lectura imagen-por-imagen → R1…R7) es, de lejos, el mejor análisis de
  referentes de la ronda.** Destila cada imagen en una **regla de composición trasladable** y la
  cruza con lo que el v1 ya hace. Mi propuesta cita los referentes; **references los disecciona.**
  R6 ("crosshair = la regla de ticks llevada de 1D a 2D") es **la mejor justificación conceptual de
  por qué el crosshair NO viola la LOCKED RULE de ticks** que existe en toda la ronda. Roba-mérito
  total en el eje "fidelidad razonada al referente".
- **`--crosshair-y: 58%`** — clava la regla de tercios del referente (yo puse 62%/58%, él 58% fijo
  y lo justifica con R1 "intersección por debajo del centro óptico"). Más limpio que mi doble valor.
- **Honestidad de desvíos (Parte E.1-2):** declara explícitamente que **descarta la diagonal** para
  no competir con el crosshair, y que el peso 300 no estaba en el `colors_and_type.css` v1. Esa
  transparencia es ejemplar y sube su credibilidad. Yo metí la diagonal sin preguntarme si compite
  con el crosshair — **tiene razón: en mi propuesta crosshair + diagonal pueden saturar.**

### Lo que es más débil
- **El `.kev-hero` con `grid-template-columns: 1fr 1fr` fijo** es elegante en desktop pero el
  colapso mobile (`grid-template-rows: auto 1fr auto auto`) reubica TR→fila 1 izquierda y BR→fila 4:
  el resultado es que en mobile **las 4 esquinas dejan de ser esquinas** y se vuelven un stack
  vertical. El referente `01-hero-mobile` mantiene título ↖ y párrafo ↙ como **esquinas reales**,
  no como filas apiladas centradas. El `.kev-bleed` de styles (posición absoluta por esquina)
  preserva mejor el anclaje en mobile. **MEDIUM.**
- **`--w-light` sin disclaimer de `font-synthesis`.** Igual que styles/variants/yo: asume que 300
  renderiza. (Ver §0.1.)
- **Mismo "Kev." de texto en la intersección** en vez del lockup `( )` del referente. Coherente con
  el resto pero, dado que su Parte A es tan rigurosa, **se le nota más la simplificación** que a los
  demás: razona R2 (brackets as brand punctuation) brillantemente y luego no lo aplica a la marca de
  la intersección. Inconsistencia interna.

### Violaciones de reglas
- Ninguna. La más escrupulosa de la ronda en autoauditoría (Parte E + desvíos señalados).

### Veredicto references
**El mejor reference-board y la mejor justificación conceptual del crosshair.** Comparte el centro
de gravedad (Atlas-chapters = Field.io = mi Darkroom). Su debilidad es ejecución mobile del hero-grid.
**8.5/10** — me supera en rigor de fidelidad al referente, que es exactamente lo que mide esta ronda.

---

## 4. Crítica: **proposal-components** — "Crosshair atmosférico + campo cálido full-bleed"

### Lo que hace mejor que la mía (honesto)
- **Es la única que trata el `font-synthesis: none` honestamente** (§1, nota): *"Helvetica del
  sistema no tiene 300 real; `font-synthesis: none` cae a 400 limpio sin falso-bold... Acepta la
  degradación."* **Esto es lo más correcto técnicamente de toda la ronda** y yo no lo vi. Roba-mérito
  en rigor de implementación.
- **El único que diseña el motion del crosshair como "draw-in" real** (`scaleY/scaleX` de centro a
  bordes con `--ease-draw: cubic-bezier(0.16,1,0.3,1)`), no como simple opacity-fade. Es más fílmico
  y más fiel al "logo system en construcción progresiva" de `02-logo-system-eye`. Mi reveal también
  usa scaleX/scaleY pero sin el ease dedicado; el suyo está mejor afinado.
- **Cross-fade de ruta con View Transitions API nativa** (§4) + fallback degradable. Es la única que
  aborda la transición **entre** pantallas (no solo la entrada de cada una), que es lo que de verdad
  da la sensación de "carrete" que yo solo prometí en prosa. Cero libs, API nativa de Next 15.
  **Es el aporte más original de la ronda** y eleva su score de Motion (rúbrica 5).
- **El estado de pausa del PlayerCard con crosshair + "Play" de texto centrado** y el cabezal
  circular en la barra de progreso (eco del cursor dot) son los **micro-detalles de componente más
  finos** y los más coherentes con "controles de texto, círculo del cursor evoluciona".

### Lo que es más débil
- **Sobre-ingeniería del Crosshair** como `'use client'` con `useEffect`/`requestAnimationFrame`
  para añadir `is-drawn`, cuando `.kev-app.is-ready` ya existe (ver §0.2). Es JS evitable; styles y
  references lo hacen 100% CSS gated en `is-ready`. **MEDIUM de calidad de código** (rúbrica 8: el
  componente extra introduce un client boundary innecesario).
- **El mark de la intersección con `mix-blend-mode: normal` y sin caja de respiro**: en el referente
  06 el `N U Λ` tiene aire (la línea se interrumpe). Mi `.kev-crosshair__mark` con
  `background: var(--field-dark); padding` y el de styles/variants (background paper/field) crean ese
  "respiro" donde la marca corta la línea. El de components deja la línea pasar por detrás del texto
  → menos limpio. **LOW.**
- **Information sobre campo oscuro como "el lugar más seguro para probar el campo oscuro"**: discrepo.
  Information es el colofón-documento; oscurecerlo reduce legibilidad de una pantalla densa de texto
  (bio + 3 columnas). El referente nunca pone un bloque largo de prosa sobre negro. Mi propuesta y
  references mantienen Information en **papel** justamente por eso. **MEDIUM de fidelidad.**

### Violaciones de reglas
- **`®` en el titular del Home** (`KEV<span>®</span>`): introduce un **glifo nuevo** además del `→`
  permitido. La LOCKED RULE dice *"Único glifo: →"*. El `®` es defendible como parte del wordmark
  (Numinous usa `®` en "Numinous Agency®", ref 06), pero **técnicamente añade un glifo no listado**.
  Debe declararse como desvío o quitarse. **HIGH** (es la única violación de regla dura de la ronda).
- View Transitions: requiere interceptar `<Link onClick>` con `preventDefault` — hay que cuidar que
  no rompa middle-click/SEO (él lo menciona, bien), pero es **superficie de regresión** mayor que el
  resto (rúbrica 8: "No regression").

### Veredicto components
La más **rica en componentes e interacción**, la única con cross-fade de ruta real y la única honesta
con el `font-synthesis`. Su `®` es la única violación dura de la ronda y su Crosshair está
sobre-ingenierizado. **8/10** — me gana en profundidad de interacción y rigor tipográfico.

---

## 5. Tabla comparativa (mi lectura honesta)

| Eje (rúbrica/locked/referente) | styles | variants | references | components | **mía (aesthetic)** |
|---|---|---|---|---|---|
| Anti-slop justificado (R1) | **★ mejor** | alto | alto | alto | narrativo |
| Diversidad real de variantes (R1) | media | **★ mejor** | media | media | baja (4 vars) |
| Fidelidad al referente razonada | alta | media | **★ mejor** | alta | media |
| Crosshair a regla de tercios | ✗ (50%) | parcial | **★ 58%** | parcial | ✓ (62/58%) |
| Corner-anchoring en mobile | **★ absoluto** | prosa | grid-colapso débil | absoluto | grid 3-filas débil |
| Motion (rúbrica 5) | sólido | rotación inquieta | sólido | **★ route-fade** | sólido |
| Rigor tipográfico (font-synthesis) | ✗ | ✗ | ✗ | **★ único honesto** | ✗ |
| Calidad de código (rúbrica 8) | alta | media | alta | media (`'use client'` extra, `®`) | alta |
| Accionable para el implementer | **★ alta** | media | alta | **★ alta** | alta |
| Violación dura de LOCKED | — | — | — | **`®` (HIGH)** | — |

---

## 6. Qué fusionaría (la síntesis que recomiendo al meta-agente)

El centro de gravedad de la ronda es inequívoco: **mi "Darkroom" = Field.io (variants-B) =
Atlas-chapters (references-B) = Chapters (styles-B)** son la misma propuesta descubierta cinco veces.
Eso es señal fuerte: **esa es la base.** La síntesis ganadora debería ser:

1. **Base: el "chapters" canónico** (Home full-bleed cálido + crosshair + capítulos negros de
   entrada de proyecto + Video en campo negro + Information y galería en papel). Todos convergen aquí.

2. **Tomar de `references`:** las **R1-R7 como gramática documentada** (es el mejor marco mental) y
   el **`--crosshair-y: 58%`** (regla de tercios). Su Parte A debería ser el README del sistema.

3. **Tomar de `styles`:** el **`.kev-bleed` con 4 anclas absolutas (`__tl/__tr/__bl/__br`)** como el
   layout reusable de corner-anchoring (gana a mi grid y al grid-colapso de references en mobile), y
   el token **`--ink-on-field #E8E8E8`** (paleta canónica del referente, no mi `#F2EFEA` inventado).

4. **Tomar de `components`:** el **disclaimer de `font-synthesis`** (obligatorio — define la realidad
   del Light en macOS), el **draw-in del crosshair con `--ease-draw`**, el **cross-fade de ruta con
   View Transitions** (degradable, sin libs) y los **detalles del PlayerCard en pausa**.
   **Descartar su `®`** (violación de glifo) y reemplazar su Crosshair `'use client'` por el CSS-only
   gated en `.kev-app.is-ready`.

5. **Tomar de `variants`:** su **diagnóstico de riesgo** ("no diluir con ruido") como principio rector,
   y el **gesto Pentagram (numeración editorial `01…15`)** como **variante audaz opcional** vía
   `data-variant`, para dar al orquestador un salto memorable sin comprometer la base segura.

6. **De la mía, lo que defiendo que sobrevive:** la **dualidad papel/negro como narrativa** (sala de
   exposición ↔ cuarto oscuro) que da *significado* al cuándo-negro-cuándo-blanco; el **header
   bicampo `is-dark` por pathname**; y el **micro-crosshair dentro del cursor circular** (evolución
   del ADN film-strip dentro del dot). **Cedo** mi `#F2EFEA` (→ `#E8E8E8` de styles), mi crosshair-y
   doble (→ 58% de references) y mi diagonal de tarjeta (references tiene razón: compite con el
   crosshair; dejarla opt-in o fuera).

**Recomendación final:** sintetizar sobre la base "chapters", con el **marco R1-R7 de references**,
el **layout `.kev-bleed` + token `#E8E8E8` de styles**, el **rigor tipográfico + route-fade de
components (sin `®`)**, y mi **narrativa de dualidad + header bicampo + cursor-crosshair**. Pentagram
de variants queda como variante audaz vía `data-variant`. Es la fusión que maximiza rúbrica
(anti-slop + motion + fidelidad) sin ninguna violación dura.
