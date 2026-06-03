# Crítica cruzada — desde "Crosshair Atlas"

> Crítico: **references / Crosshair Atlas** (fusión KEV v1 + Numinous, crosshair hairline + capítulos full-bleed).
> Round 2 del pipeline front-tool. Evalúo cada propuesta RIVAL contra la rúbrica `combined.md`, las LOCKED RULES
> y la fidelidad a los 7 referentes Numinous (re-mirados). Verifiqué claims contra el código real del worktree
> (`globals.css`, `lib/data.ts`, `app/layout.tsx`). Soy honesto sobre dónde los rivales me ganan.

---

## 0. Ground-truth verificado (para que esta crítica no especule)

Antes de criticar, confirmé en el worktree real:

- **Tokens existentes** (`globals.css`): `--paper #FFFFFF`, `--ink #0D0D0D`, `--ink-2 #8A8A8A`, `--ink-3 #BDBDBD`,
  `--hair #ECECEC`, `--tick #D6D6D6`, `--accent #FF4D17`, `--frame-dark #131313`, `--cursor rgba(13,13,13,0.16)`,
  pesos `--w-regular 400 … --w-heavy 800`, `--fs-mega/-display/-h1…`, `--ease`, `--ease-io`, `--t-film 900ms`.
  **NO existe `--w-light` ni peso 300.** Los cinco proposers (incluido yo) lo añaden — coherente.
- **`app/layout.tsx`** carga Archivo `['400','500','600','700','800','900']` — **falta 300**. Todos lo señalan; correcto.
- **`lib/data.ts`**: existe `export const projectBySlug`, existe el slug **`showreel`** (línea 196) y `reel-kev` está en el
  manifest. → Las llamadas `projectBySlug('showreel')` (variants B, Cámara Oscura) son **válidas**; `projectBySlug('j-balvin')`
  (components) también. **`projects[0]` = `j-balvin`** (no `showreel`), así que el "still cálido" de mi propuesta y de styles
  apunta a una foto de Balvin, no al reel — correcto pero menos "motion-blur" que el reel.
- **IA real:** las rutas son Home `/`, Work index `/work`, Project `/work/[slug]`, Video `/video`, Information `/information`.
  El context pack menciona `photography/page.tsx`; en el código el índice de fotos vive dentro del recorrido Work. Varias
  propuestas hablan de "Photography" como pantalla aparte — es etiqueta del menú, no una ruta distinta. No es violación, pero
  conviene no inventar una pantalla nueva.
- **AGENTS.md del worktree advierte:** "This is NOT the Next.js you know… read `node_modules/next/dist/docs/` before writing code."
  → Esto pesa fuerte sobre la propuesta **components**, que mete View Transitions API + un hook `useRouteFade` nuevo. Ver §5.

Con esto puedo separar lo defendible de lo aspiracional en cada rival.

---

## 1. Cámara Oscura — "dualidad papel/negro cálido con crosshair de visor" (proposal-aesthetic.md)

### Lo que me roba mérito (y lo hace mejor que yo)
- **La metáfora "galería iluminada vs cuarto oscuro / revelado".** Es superior a mi "atlas + capítulos" como *narrativa*.
  Da una regla de oro memorable y operativa: **"negro = hay imagen full-bleed debajo; blanco = la imagen está colgada/matada.
  Nunca negro vacío decorativo."** Eso es más disciplinado que mi field-alternation, que no prohíbe explícitamente el negro vacío.
  **Lo fusionaría a mi propuesta tal cual.**
- **El `<Crosshair />` como componente TSX real con prop `label`** + draw-in por `scaleY/scaleX` desde el borde
  (transform-origin top/left). Mi crosshair es CSS puro con `::before/::after` (más barato, menos flexible). Para reusarlo en
  Home, chapter, Video, work-preview y cursor, **el componente parametrizable gana**. Mi `.kev-crosshair` opt-in vía clase es
  más pobre en ergonomía.
- **El micro-crosshair DENTRO del cursor** (`.kev-cursor::before/::after` → cruz diminuta en `is-hot`). Es la mejor evolución
  del cursor circular de las 5 propuestas: cumple "cursor evoluciona, no desaparece" Y refuerza el ADN crosshair. Yo solo
  invertía el color del cursor sobre negro. **Me gana aquí; lo adopto.**

### Qué viola reglas / qué es frágil
- **`--warm-veil: rgba(74,38,18,0.18)` con `mix-blend-mode: multiply` sobre los heros.** Aquí hay un problema real con las
  LOCKED RULES. El brief dice: *"el color SIEMPRE viene de la foto"* y *"naranja = ÚNICO acento de UI, nunca como campo"*.
  Un velo ámbar/sepia de marca aplicado por CSS **sí introduce un tinte de color que no está en la foto** — es exactamente
  "inventar atmósfera con CSS", que el propio proposer dice evitar en su §0 pero luego hace en §3. Es un auto-gol. En la
  Variante C sube a `0.26`, agravándolo. **Recomendación: matar el `--warm-veil` o reducirlo a una capa de *luminancia*
  (negro a baja opacidad), no de croma.** Mi propuesta evita esto: uso solo scrims neutros (`rgba(13,13,13,…)`). Este es el
  punto donde yo soy más fiel a la regla.
- **Contraste naranja sobre negro en Variante C admitido en el límite (~4.7:1) "justo en el umbral".** El propio proposer lo
  reconoce. Es HIGH risk: el brief prohíbe `gray-on-colored < 4.5:1`, y 4.7 no deja margen para anti-aliasing real sobre foto.
  La mitigación (tag `--accent` sólido con texto papel) es correcta, pero entonces el tag ya no es "naranja sobre negro" sino
  "papel sobre naranja" — hay que ser explícito en TODAS las apariciones, no solo en client tags.
- **`projectBySlug('showreel').cover`** en Home: válido (verificado). Bien. Pero el reel es un `.mp4`; autoplay muted loop
  full-bleed en Home es el patrón más pesado de las 5 propuestas para el primer paint. No es violación, es un riesgo de perf
  en mobile (100dvh video). Mi "still cálido" pesa menos.
- **`MenuList variant="air"`** vs mi enfoque de override local: el suyo es más limpio (prop explícita). Le concedo el punto.

### Fidelidad a los referentes
- **Alta.** La dualidad papel/negro está literal en `04-mobile-cards-4up` (negro / verde / blanco / cálido). El crosshair de
  visor con micro-marca está en `06`. La metáfora "cuarto oscuro" justifica el negro mejor que cualquiera. **Es la propuesta
  más conceptualmente fiel al ADN, junto con la mía.**

### Score estimado vs rúbrica (32 max)
Aesthetic 4 · Typography 3 (escala modular implícita, no explícita) · Color 2 (el warm-veil baja el rigor de token y roza WCAG
en C) · Spatial 4 · Motion 4 · Project-tokens 3 (inventa `--warm-veil`/`--ink-on-dark` fuera del set canónico) · Component-reuse 3
(crea Crosshair pero reusa MenuList/Header/PlayerCard) · Code-quality 3. **≈ 26/32 → iterar 1 round (quitar warm-veil).**

---

## 2. Numinous Editorial Monochrome — "Minimalist-Monochrome + Swiss-grid + Motion-Driven" (proposal-styles.md)

### Lo que me roba mérito (y lo hace mejor)
- **La justificación por catálogo de estilos (los 67 de ui-ux-pro-max) → tríada nombrada.** Mi propuesta destila reglas
  *imagen-por-imagen*; la suya las ancla a *categorías de estilo con nombre* (Minimalist Monochrome / Swiss Modernism 2.0 /
  Motion-Driven). Para defender decisiones ante un cliente, **su andamiaje teórico es más sólido**. Además ataca anti-patrones
  del CSV explícitamente (rechaza serif de Minimalist-Mono, rechaza glassmorphism de Photography-Studio) — eso es rigor que yo
  no documenté.
- **El crosshair que respeta el gutter editorial** (`--grid-inset: var(--pad-x)`): la línea horizontal del crosshair **no va
  borde-a-borde, sino dentro del gutter**. Es más "Swiss/editorial" que mi crosshair full-bleed, y se alinea mejor con
  `05-poster-grid-blur` (donde la línea divisoria respeta márgenes). **Detalle fino que me supera para los posters.**
- **La regla "invertir el single-accent de Swiss hacia los PESOS, no el color"** es una formulación elegante de exactamente lo
  que todos intentamos. La frase es mejor que la mía.

### Qué viola / qué es débil
- **El crosshair horizontal a `top: 50%` (centro muerto).** Mi propuesta y Cámara Oscura ponen la intersección bajo el centro
  óptico (58–62%), que es **literalmente lo que muestran `01` y `06`** (la cruz está claramente por debajo del centro). Styles
  lo deja a 50% → **menos fiel al referente.** Es un fix trivial pero es un fallo de observación.
- **`--ink-on-field #E8E8E8` (gris) en vez de un blanco cálido.** El brief insiste en atmósfera *cálida*. `#E8E8E8` es neutro
  frío. Cámara Oscura (`#F2EFEA`), components (`#F4F2EF`) y yo (`#F2F0EC`) usamos blancos cálidos — más fieles al ámbar Numinous.
  Styles toma la paleta `#e8e8e8` literal del token-sheet `03`, lo cual es defendible, pero pierde la calidez que el brief pide.
- **`.kev-overview-grid__cell--field` cada 4ª celda sobre negro (Variante B/C).** Atención: la grilla Overview real es
  `columns: 4` (CSS multi-column masonry, verificado en `globals.css` línea 414). En multi-column, **no controlas qué celda cae
  en qué columna ni el orden visual** — meter un fondo negro "cada i%4===0" produce un patrón *aleatorio e impredecible* en
  masonry, no el ritmo limpio de `04`. Esto es un HIGH: la idea es buena pero **técnicamente no produce el efecto deseado con el
  layout existente.** Habría que cambiar a grid explícito (toca más que "solo tokens"). Lo señalo porque yo deliberadamente
  **dejé fuera** la alternancia de celdas por esta razón — y aquí styles tropieza donde yo me abstuve.
- **Inventa pantalla "Photography" como sección con hero propio**, igual que el context pack sugiere; en el código es Work.
  No es fatal pero es deuda de IA.

### Fidelidad
- **Media-alta.** El crosshair-con-gutter y los posters están bien observados. Pierde puntos por el centro muerto (50%) y el
  blanco frío. La alternancia de celdas es la lectura correcta de `04` pero mal implementable en el masonry actual.

### Score estimado
Aesthetic 4 · Typography 4 (escala fina modular explícita `--fs-fine-xl/lg/md` — la mejor tipografía de las 5) · Color 3
(token-rigor alto pero blanco frío) · Spatial 3 (la celda-alterna en masonry baja el control) · Motion 4 · Project-tokens 3 ·
Component-reuse 3 · Code-quality 3 (el `i%4` sobre `columns:4` es un bug latente). **≈ 27/32 → iterar 1 round.**
**Es la propuesta con mejor andamiaje tipográfico-teórico; su talón es la ejecución del field-alternation.**

---

## 3. Variantes Hara / Field.io / Pentagram (proposal-variants.md)

Esta no es una propuesta sino tres filosofías. La juzgo como conjunto y por su recomendada (**B · Field.io**).

### Lo que me roba mérito (y lo hace mejor)
- **El framing "el riesgo del rediseño NO es añadir Numinous, es diluir la disciplina del v1 con ruido".** Es la mejor frase
  de diagnóstico de las 5 propuestas. Debería encabezar la síntesis final.
- **Variante A (Hara) como concepto puro:** *"Numinous no es imagen full-bleed por todas partes — es UN solo momento numinoso
  rodeado de vacío."* Esto es una crítica implícita demoledora a TODAS las demás (incluida la mía), que reparten full-bleed por
  varias pantallas. Si el cliente quiere alta gama / mínimo riesgo, **Hara puede ser superior a mi Crosshair Atlas completo.**
  Honestamente: es el contrapunto que mi propuesta no tiene.
- **El abanico de 3 filosofías genuinamente distintas** (vacío / retícula habitada / poster de autor) da al orquestador más
  espacio de decisión que mis 3 *intensidades* (quiet/chapters/numinous), que son la misma idea con más o menos dosis. **Su eje
  es más rico que el mío.**
- **Pentagram: la numeración editorial `01…15` zero-padded en Work index y `01/08` en Video.** Es un recurso que ninguna otra
  propuesta tiene y que es 100% LOCKED-compliant (texto, una fuente, sin color). **Robable y excelente.**

### Qué viola / qué es débil
- **Es la propuesta menos "implementable hoy".** Da 3 direcciones pero ninguna con la profundidad de código de Cámara Oscura,
  styles, components o la mía. El CSS de B es bueno pero A y C son sobre todo descripción. Para Round 4 (implement) hay que
  elegir UNA y desarrollarla — está a medio camino. Esto es su mayor debilidad relativa frente a propuestas "una idea, completa".
- **Variante C (Pentagram) "una palabra del menú gigante que rota entre las 4 con cross-fade".** Cuidado: un titular que cambia
  solo, en loop, **roza el "1 hero animation, no 20 micro-interactions" de la rúbrica** y puede sentirse gimmicky / distraer del
  motion "quieto fílmico". Es el punto donde C se acerca al borde de las reglas. Defendible con `prefers-reduced-motion`, pero
  es el más arriesgado.
- **Variante B `kev-crosshair::after { top: 50% }`** — mismo pecado que styles: centro muerto, no el 58–62% de los referentes.
- **`projectBySlug('showreel')!.cover`** en B: válido (verificado). Bien.

### Fidelidad
- **B y C: alta.** B es explícitamente "`06-hero-desktop-crosshair` con media y nav de KEV" — la lectura más literal del
  referente estrella, igual que mi propuesta. A es la más *conceptual* (puede leerse como "poco Numinous" porque renuncia a la
  atmósfera full-bleed, exactamente el riesgo que el propio autor admite).

### Score estimado (de B, la recomendada)
Aesthetic 4 · Typography 3 · Color 3 · Spatial 4 · Motion 3 (la rotación de palabra en C contagia dudas; B sola es 4) ·
Project-tokens 3 · Component-reuse 4 (Crosshair component + reusa todo) · Code-quality 3. **B ≈ 27/32.**
Pero como *entrega* pierde por estar repartida en 3 medio-desarrolladas. **Su valor real es como cantera de ideas (numeración,
"un momento numinoso", el diagnóstico anti-ruido), no como propuesta única lista para implementar.**

---

## 4. Componentes — "crosshair atmosférico + campo cálido full-bleed" (proposal-components.md)

### Lo que me roba mérito (y lo hace mejor)
- **El `<Crosshair>` con `cx`/`cy` parametrizables vía CSS custom props inline** (`--cx`, `--cy` 0–1) + `tone` (`line`/`pale`).
  Es la **mejor API de crosshair de las 5**: una sola pieza sirve Home (0.5/0.5), chapter (cy 0.62), Information (0.78/0.30),
  work-preview, player. Mi `.kev-crosshair` con `--crosshair-y` fijo es rígido en comparación. **Lo adopto: el crosshair debe
  ser componente con cx/cy, no clase con posición hardcodeada.**
- **El estado de PAUSA del PlayerCard con crosshair + control "Play" central de TEXTO** (no icono). Es el toque más fiel a la
  LOCKED RULE "controles de texto, no iconos" llevado al player, y nadie más lo desarrolla. **Excelente; robable.**
- **El reveal escalonado por esquina `rise-cnr[data-cnr=tl/tr/bl/br]` con delays.** Operacionaliza el corner-anchoring de
  Numinous con motion stagger, reusando el patrón `rise-in` ya existente. Más fino que mi `rise-in` plano. Me gana.
- **El blanco cálido `#F4F2EF` + escala de opacidades `--on-dark-1/2/3`** con contrastes calculados (17:1, 9:1) es la jerarquía
  de texto-sobre-oscuro mejor especificada de las 5. Documenta WCAG mejor que yo.

### Qué viola / qué es el mayor riesgo
- **View Transitions API + `lib/useRouteFade.ts` (hook nuevo) + `document.startViewTransition`.** Aquí está el problema grave:
  el **AGENTS.md del worktree advierte explícitamente que "this is NOT the Next.js you know"** y que hay que leer los docs
  locales antes de escribir. Introducir View Transitions de ruta + override de `onClick` en `<Link>` con `preventDefault` es
  **el cambio de mayor superficie y mayor riesgo de regresión de las 5 propuestas**, y depende de comportamiento de framework
  no verificado. El propio proposer lo marca como "desvío señalado / opcional / degradable" — pero sigue siendo el ítem que más
  amenaza "No regression: `tsc --noEmit` + lint 0 errores". **Recomendación: cortarlo del MVP.** Es opt-in, pero su sola
  presencia en el plan es ruido de implementación. Mi propuesta y Hara no tocan routing — más seguras.
- **`projectBySlug('j-balvin')!.cover` como hero** → es una *foto*, no el reel; pierde el motion-blur. Menor.
- **Information sobre campo oscuro (`data-field="dark"`) con bio en Light.** Defendible, pero Information es el "colofón
  documento" — varios (yo, styles, Hara) la dejamos en blanco a propósito para cerrar en sobriedad. Ponerla en negro es la
  lectura más agresiva de `04`; no la prohíbe el brief, pero contradice el principio "blanco sigue siendo base". El proposer lo
  matiza ("puede quedarse en blanco, es un switch"), lo cual es honesto.
- **`mix-blend-mode` no usado para color aquí** (bien — components usa scrims neutros, no warm-veil; más limpio que Cámara
  Oscura en este punto).

### Fidelidad
- **Alta.** Traduce `02-logo-system-eye` (el `( N Λ )` → micro-Kev.), `05` (divider con scaleX), `04` (alternancia campo en
  Information) y `06` (crosshair). El estado de pausa del player es una extensión coherente, no en el referente pero on-brand.

### Score estimado
Aesthetic 4 · Typography 4 (escala `--fs-atmos` + opacidades on-dark bien definidas) · Color 4 (mejor doc WCAG, sin warm-veil) ·
Spatial 4 · Motion 4 (draw-in + stagger + reduced-motion exhaustivo) · Project-tokens 3 · Component-reuse 4 (Crosshair + extiende
MenuList/PlayerCard/Cursor/Header sin romper) · **Code-quality 2** (View Transitions/useRouteFade contra el aviso de AGENTS.md =
riesgo de regresión real). **≈ 29/32 pero con un asterisco grande en code-quality.**
**Técnicamente la más rica en componentes; la más expuesta a romperse por el routing. Quítale las View Transitions y es la
propuesta de implementación más fuerte de las cinco.**

---

## 5. Auto-evaluación honesta: dónde Crosshair Atlas (la mía) pierde

Para no ser juez parcial:

1. **Mi crosshair es CSS-puro con posición hardcodeada (`--crosshair-y`).** Components y Cámara Oscura tienen un *componente*
   parametrizable (cx/cy, tone, label). **Ellos ganan en reuso.** Debo adoptar su API.
2. **No tengo evolución de cursor más allá de invertir color.** El micro-crosshair-en-cursor de Cámara Oscura y components es
   mejor. Lo robo.
3. **Mi tipografía no define escala modular explícita** para los titulares finos; styles (`--fs-fine-xl/lg/md`) y components
   (`--fs-atmos`) sí. La rúbrica premia "modular scale" → **pierdo ahí.**
4. **Mis "3 variantes" son una sola idea en 3 dosis** (quiet/chapters/numinous). Variants ofrece 3 *filosofías* genuinas. Su
   eje es más interesante. Mi diferenciación es más pobre.
5. **No desarrollé el estado de pausa del player ni la numeración editorial** — components y Pentagram respectivamente los tienen
   y son LOCKED-compliant y memorables.

Donde **sí gano**: (a) soy el más fiel en mantener el color **fuera** del campo (sin warm-veil, scrims neutros), (b) el vínculo
explícito **ticks 1D → crosshair 2D = misma familia hairline** (`.kev-ticks--anchored`) es la mejor justificación de "ticks
evolucionan, no desaparecen", (c) la intersección del crosshair a 58% (bajo el centro óptico) es fiel a `01`/`06`, donde styles
y variants fallan a 50%, (d) cero riesgo de routing/framework.

---

## 6. Síntesis: qué fusionaría para la propuesta ganadora

Una sola dirección, robando lo mejor de cada una:

| Pieza | De quién | Por qué |
|---|---|---|
| **Metáfora "galería iluminada vs cuarto oscuro" + regla "negro ⇒ hay imagen full-bleed; nunca negro vacío"** | Cámara Oscura | Narrativa y disciplina superiores |
| **Diagnóstico "no diluir la disciplina del v1 con ruido" + Hara como modo 'quiet' de alta gama** | Variants A | Contrapunto que evita el exceso de full-bleed |
| **`<Crosshair cx cy tone label>` componente parametrizable** | Components + Cámara Oscura | Mejor API, un solo componente para 6 usos |
| **Micro-crosshair DENTRO del cursor circular** | Cámara Oscura / Components | Mejor evolución del cursor, refuerza ADN |
| **Reveal escalonado por esquina `rise-cnr[data-cnr]`** | Components | Operacionaliza el corner-anchoring con motion |
| **Estado de PAUSA del player con "Play" de texto + crosshair** | Components | Fiel a "controles de texto, no iconos" |
| **Numeración editorial `01…15` / `01/08`** | Variants C (Pentagram) | Recurso memorable, 100% LOCKED |
| **Escala fina modular `--fs-fine-xl/lg/md` + invertir single-accent a pesos** | Styles | Mejor rigor tipográfico/teórico |
| **Crosshair que respeta el gutter en posters** | Styles | Más fiel a `05` |
| **Intersección a 58–62% (no 50%), scrims NEUTROS sin warm-veil, vínculo ticks↔crosshair** | Crosshair Atlas (mía) | Fidelidad a `01/06` + máxima pureza de color |

### Lo que la síntesis debe DESCARTAR de los rivales
- **El `--warm-veil` de color** (Cámara Oscura) → viola "color solo de la foto / naranja único acento". Sustituir por scrim
  neutro de luminancia.
- **View Transitions API + `useRouteFade`** (Components) → contra el aviso de AGENTS.md; alto riesgo de regresión. Fuera del MVP.
- **`.kev-overview-grid__cell--field` cada i%4 sobre `columns:4`** (Styles, Variants B) → produce alternancia aleatoria en
  masonry, no el ritmo de `04`. Omitir, o rehacer la grilla a CSS Grid explícito (fuera de "solo tokens").
- **Crosshair a `top:50%`** (Styles, Variants B) → centro muerto, infiel a los referentes. Bajar a 58–62%.
- **Inventar una pantalla "Photography" con hero propio** → la IA real es Work; no añadir rutas.
- **Naranja sobre negro a 4.7:1** (Cámara Oscura C) → resolver siempre como papel-sobre-naranja, nunca naranja-sobre-negro.

---

## 7. Veredicto comparativo (estimación de scores)

| Propuesta | Score est. | Mayor fortaleza | Mayor riesgo |
|---|---|---|---|
| **Components** | ~29* | Componentes/crosshair más ricos, WCAG documentado | View Transitions vs AGENTS.md (code-quality) |
| **Numinous Editorial Monochrome (styles)** | ~27 | Andamiaje tipográfico/teórico, escala fina | Field-alternation en masonry no funciona; centro muerto |
| **Variants (B Field.io)** | ~27 | Diagnóstico, abanico de filosofías, numeración | Entrega repartida en 3 medio-hechas; centro muerto |
| **Cámara Oscura** | ~26 | Metáfora y disciplina narrativa, cursor/crosshair | `--warm-veil` de color viola regla; naranja@4.7:1 en C |
| **Crosshair Atlas (mía)** | ~26 | Pureza de color, fidelidad 58%, ticks↔crosshair | Crosshair rígido, variantes poco diferenciadas, tipografía sin escala explícita |

\* Components cae a ~26 si NO se quita View Transitions; sube a ~29 si se quita.

**Recomendación final:** la propuesta a implementar debe ser **Components SIN View Transitions** como base de arquitectura de
componentes (su `<Crosshair>` + estado de pausa + on-dark scale son los mejores), **gobernada por la disciplina narrativa de
Cámara Oscura** (galería/cuarto-oscuro, "nunca negro vacío") **pero con el color-purism de Crosshair Atlas** (scrims neutros,
nada de warm-veil), **la escala tipográfica fina de Styles**, **la numeración editorial de Pentagram** y un **modo 'quiet' tipo
Hara** para el cliente de mínimo riesgo. Crosshair a 58–62%, no a 50%. Cero cambios de routing/IA.
