# Crítica cruzada — proposer "3 variantes KEV×Numinous (Hara / Field.io / Pentagram)"

> **Crítico:** `variants` (front-tool Round 2), actuando como revisor adversarial.
> **Base de juicio:** rúbrica `combined.md` (32 pts) + LOCKED RULES + fidelidad a los 7 referentes Numinous (releídos: `01`, `04`, `05`, `06`).
> **Alcance:** critico las 4 propuestas rivales y soy honesto sobre dónde superan a la mía.

---

## 0. Hallazgo transversal (afecta a las 5 propuestas, la mía incluida)

Las 5 propuestas convergen casi sin querer en el **mismo núcleo**: componente `Crosshair`/`Grid` con micro-`Kev.` en la intersección + peso `--w-light: 300` (que hay que añadir a `app/layout.tsx`, hoy carga `['400'…'900']`, verificado) + campo `#0D0D0D` alterno + tagline `( … )` + letras dispersas + 3 variantes graduadas por `data-variant`. Esto es **buena señal de convergencia**, pero significa que la diferenciación NO está en "qué mecanismos" sino en **dónde se aplica el centro del crosshair, cuánto terreno gana el negro, y cómo se traduce el peso fino**. Ahí es donde las propuestas se separan — y donde tres de ellas pisan detalles de los referentes que la mía y otra resuelven mejor.

**Dato de referente que casi nadie acertó:** en `06-hero-desktop-crosshair` la intersección está **exactamente en el centro geométrico (50%/50%)** con micro-marca `N U Λ` apilada; en `01-hero-mobile` la intersección baja a **~58%** (regla de tercios óptica). Es decir: el crosshair NO está siempre centrado — desktop centro, mobile bajo-centro. Y en `04-mobile-cards-4up` las líneas hairline son **diagonales (Xs de esquina a esquina)**, no crosshairs ortogonales. Esta distinción (crosshair ortogonal en heros vs. diagonal en tarjetas) es un detalle que separa las propuestas fieles de las que improvisan.

---

## 1. Cámara Oscura (`proposal-aesthetic.md`)

### Qué roba mérito (lo mejor, honestamente)
- **El concepto narrativo es el más fuerte de las 5.** "KEV v1 = galería iluminada; Numinous = cuarto oscuro donde se revela la imagen" + la regla de oro *"negro = hay imagen full-bleed debajo; blanco = la imagen está matada"* es una **regla operativa accionable**, no una metáfora decorativa. Mi propuesta justifica el negro como "alternancia/chapters"; la suya da una *ley* de cuándo aparece. Más defendible ante un cliente. **Esto supera a mi Field.io.**
- **`--warm-veil` (velo ámbar `rgba(74,38,18,0.18)` con `mix-blend-mode: multiply`)** es la única propuesta que aborda el problema real: la media de KEV (balvin, maluma) NO es necesariamente sepia, y el ADN Numinous ES cálido. Profundizar tonos existentes con un blend en vez de inventar color es elegante y respeta "el contenedor calla". Mi propuesta asume que el poster ya es cálido — frágil. **Robo esto.**
- **Crosshair horizontal a 62% (regla de tercios) y a 58% en mobile** = la única propuesta que clava la composición real de `01`/`06`. La mía pone el crosshair a 50%/50% plano, que solo es correcto en desktop. Punto factual a su favor.
- `--ink-on-dark #F2EFEA` (blanco cálido, no `#FFF` puro) es más Numinous que mi `#E8E8E8` plano.

### Qué viola / dónde flaquea
- **Inconsistencia con el referente que ella misma cita:** dice "crosshair = `06-hero-desktop-crosshair`" pero pone la horizontal a 62%. En `06` (desktop) la intersección está al **centro (50%)**; el 62% es de `01` (mobile). Mezcla las dos reglas en un solo valor. Menor, pero es el tipo de detalle que el visual-eval de Playwright cazará contra los assets.
- **Riesgo de contraste auto-confesado (Variante C):** `#FF4D17` sobre `#0D0D0D` = ~4.7:1 — lo admite "justo en el umbral". Para large text pasa (3:1), pero si el tag naranja lleva texto pequeño sobre negro está al filo de AA. Lo resuelve con tag sólido + texto papel, pero es deuda que mi Field.io evita (naranja solo sobre blanco/tags en celdas).
- **Las 3 variantes se diferencian solo por `--warm-veil` + qué campo es blanco/negro** (4 variables). Es eficiente, pero las tres se sienten como **una sola dirección con dimmer**, no como tres filosofías. Mis 3 variantes (Hara/Field/Pentagram) son ontológicamente distintas (vacío vs. retícula vs. poster). Su set ofrece menos rango de decisión al cliente. *(Contrapunto honesto: para producción, su enfoque "95% del código compartido, cambian 4 vars" es MÁS implementable que el mío.)*
- Rúbrica **Motion (criterio 5):** describe reveal de crosshair con `scaleX/scaleY` y stagger de anclas — bien — pero no especifica un único momento orquestado de page-load vs. micro-interacciones. Riesgo de dispersión. Mi propuesta es igual de vaga aquí; empate a debilidad.

### Veredicto vs. la mía
**Me supera en concepto y en fidelidad cromática/compositiva (velo cálido + crosshair a tercios).** Yo la supero en **rango de variantes** y en que mi Field.io ataca explícitamente las diagonales de `04` (ella no menciona la diagonal de tarjeta, solo crosshair). **Fusión:** robar su `--warm-veil`, su regla de oro negro/blanco y el crosshair a 58%/62% (mobile/desktop, no 50% plano), y mantener mi sistema de diagonales en celdas Overview + mis 3 variantes ontológicas.

---

## 2. Numinous Editorial Monochrome (`proposal-styles.md`)

### Qué roba mérito
- **Es la única propuesta con fundamentación formal de estilo:** mapea la fusión a una tríada concreta de la base de 67 estilos (Minimalist Monochrome + Swiss Modernism 2.0 + Motion-Driven). Esto le da a la rúbrica **criterio 1 (Bold commitment)** una respuesta argumentada, no intuitiva. *"Invertir la regla Swiss de single-accent hacia los PESOS en vez de un segundo color"* es la frase más inteligente de las 5 propuestas para resolver la tensión "Swiss quiere 2º acento / LOCKED prohíbe 2º color". **Esto enmarca mejor mi propio argumento de "jerarquía por peso".**
- **Rechaza explícitamente los anti-patrones del CSV** (serif de Minimalist Monochrome, glassmorphism/aurora de "Photography Studio") citándolos por nombre. Es la única que demuestra haber considerado y descartado opciones — exactamente lo que pide la rúbrica anti-slop (criterio 1.2).
- **`.kev-bleed` con 4 anclas TL/TR/BL/BR como layout reutilizable** es la abstracción más limpia: un solo contenedor sirve Home, project-entry y posters. Mi propuesta repite la maquetación por pantalla; la suya la factoriza. Más DRY.
- Escala fina nombrada (`--fs-fine-xl/lg/md` con clamp) responde al criterio **2.2 (modular scale)** mejor que mi propuesta, que reusa `--fs-display`/`--fs-h1` sin definir una escala fina propia.

### Qué viola / dónde flaquea
- **Su crosshair pone la horizontal y vertical ambas a 50%** (`top: 50%`, `left: 50%`) — mismo error plano que el mío, ignora el 58% de `01`. Cámara Oscura le gana aquí.
- **`.kev-scatter` posiciona K/E/V por porcentajes arbitrarios** (`top:18% left:7%`, `top:64% right:9%`, `bottom:12% left:38%`) — `references` las ancla limpiamente a las 4 esquinas con `--pad-x` (más fiel a `07-business-cards`, donde las letras están en esquinas/registro, no flotando). Detalle pero el referente manda.
- **El crosshair respeta el gutter en la horizontal (`left/right: var(--grid-inset)`) pero la vertical va full-height (`top:0 bottom:0`).** Asimetría no justificada — en `06` ambas líneas van borde a borde. Inconsistencia interna.
- Rúbrica **criterio 7 (component reuse / SiteLayout consistency):** describe `Grid.tsx` nuevo + `.kev-bleed` + variante de `MenuList`/`Header`/`Cursor`, bien, pero igual que el resto **no aborda `AppShell`** (el wrapper real del worktree) ni cómo el `data-field` llega del page al Header sin prop-drilling. Problema compartido por las 5; ninguna resuelve el plumbing del estado de campo limpiamente.
- Las 3 variantes (Frame/Chapters/Numinous) son una escala de dosis, no filosofías distintas — misma crítica que a Cámara Oscura, pero al menos están bien delimitadas por pantalla.

### Veredicto vs. la mía
**Me supera en rigor de estilo (fundamentación en los 67), en la abstracción `.kev-bleed` y en la escala tipográfica fina nombrada.** Yo la supero en que mis 3 variantes son verdaderas alternativas de dirección (no un dimmer) y en que mi Field.io trata las diagonales de tarjeta. **Fusión:** adoptar su `.kev-bleed` de 4 anclas como el contenedor base (sustituye mi maquetación ad-hoc), su escala `--fs-fine-*`, y su framing "Swiss single-accent → peso". Corregir su crosshair a 58%/50% según pantalla.

---

## 3. Crosshair Atlas (`proposal-references.md`)

### Qué roba mérito (la rival más fuerte del lote)
- **El reference board imagen-por-imagen (R1–R7) es trabajo que ninguna otra hizo.** Destila 7 reglas de composición *trasladables* y las cruza con lo que el v1 ya hace bien. Esto es exactamente el método correcto: no estética prestada, sino **gramática**. La rúbrica entera se beneficia de tener cada decisión trazada a un referente concreto. **Es el documento que yo citaría para defender el rediseño.**
- **R6 "Crosshair = grid made visible" + el insight "ticks (1D ruler) → crosshair (2D)"** es la mejor justificación de las 5 para por qué el crosshair NO viola la LOCKED RULE de "ticks evolucionan, no desaparecen". Es la misma familia hairline expandida de 1 a 2 dimensiones. Mi propuesta afirma esto; la suya lo *demuestra* con la relación dimensional. **Más sólido que lo mío.**
- **`--crosshair-y: 58%` (intersección bajo el centro óptico)** — es, junto con Cámara Oscura, la única que clava el detalle de `01`. Punto factual.
- **`.kev-ticks--anchored`** (un tick más alto en la columna del crosshair, hilando header↔hero) es el detalle más fino de todas las propuestas: cose literalmente el film-strip del header con el crosshair de la pantalla. Nadie más pensó en esto. **Es superior a mi tratamiento del header.**
- **Transparencia de desvíos (Parte E):** declara explícitamente que NO adopta la diagonal de `04` (para no competir con el crosshair) y que el peso 300 es una ampliación deliberada. Honestidad metodológica que la rúbrica valora.
- Usa firmas reales del worktree (`Media({item,alt,className,style,children,loading})`, `ProjectView({project,next})`) — la única que verificó la API de componentes. Menor riesgo de regresión (criterio 8).

### Qué viola / dónde flaquea
- **`.kev-hero` usa `grid-template-columns: 1fr 1fr` (dos columnas) en el hero full-bleed.** En `06` el texto vive en esquinas sobre UNA imagen continua, no en dos columnas. El grid de 2 columnas es maquinaria de layout que no corresponde a la composición del referente (las anclas son `position:absolute` en `proposal-aesthetic`/`styles`/`components`, más fiel). Sobre-ingeniería.
- **Renuncia a la diagonal de tarjeta de `04`** — lo declara honestamente, pero `04` ES un referente del brief y la diagonal es su firma. Mi Field.io SÍ la implementa (`.kev-overview-grid__cell--marked`). En fidelidad pura a `04`, **mi propuesta gana este punto.**
- Las 3 variantes (`atlas-quiet/chapters/numinous`) son, de nuevo, una escala de dosis. Misma limitación que styles/aesthetic.
- Rúbrica **Motion:** cross-fade de crosshair con `opacity` (`--t-chapter`) — más quieto que el `scaleX/scaleY` de las otras, pero menos "filmico-revelado". Decisión defendible; menos memorable que un draw-in.

### Veredicto vs. la mía
**Es la rival que más claramente me supera en metodología (reference board) y en dos detalles (crosshair a 58%, `.kev-ticks--anchored`).** Yo la supero en: (a) implementar la diagonal de `04` que ella descarta; (b) ofrecer 3 variantes que son filosofías reales; (c) su `grid 1fr 1fr` es peor que las anclas absolutas. **Fusión:** este es el documento del que más robaría. Tomar su reference board R1–R7 como justificación, su `--crosshair-y:58%`, su `.kev-ticks--anchored`, y descartar su `.kev-hero` de 2 columnas a favor de anclas absolutas (de `styles`/`components`). Re-incorporar mi diagonal de `04`.

---

## 4. Crosshair atmosférico + campo cálido (`proposal-components.md`)

### Qué roba mérito
- **La única que aborda los componentes de interacción reales:** cross-fade de ruta vía **View Transitions API nativa de Next 15** (`document.startViewTransition` con fallback) es la respuesta correcta y sin-libs al criterio Motion + a la LOCKED RULE de "cross-fades fílmicos entre pantallas". Ninguna otra propuesta resuelve la transición *entre* rutas — todas se quedan en page-load. **Esto cubre un hueco que mi propuesta deja abierto.**
- **`Crosshair` con props `cx`/`cy` (0–1)** — la única implementación parametrizable de la posición de la intersección. Permite 50% en desktop y 0.58 en mobile/project SIN duplicar CSS. Resuelve elegantemente el detalle de `01` vs `06` que las demás hardcodean. **Superior a mi crosshair fijo.**
- **Estado de pausa del PlayerCard con crosshair + "Play" de texto centrado** y cabezal circular en la barra (eco del cursor dot) — el detalle de interacción más rico, y respeta "controles de texto, no iconos". Mi propuesta deja el Video casi intacto; la suya lo evoluciona coherentemente.
- Honestidad sobre **`font-synthesis: none`**: reconoce que Helvetica de sistema (macOS) no tiene 300 real y caerá a 400 limpio sin falso-bold. Es el único que piensa en la degradación de la fuente del sistema. Detalle de craft que nadie más vio.
- Las 3 variantes (`quiet`/`drift`/`poster`) son las únicas centradas en **movimiento** (estático / pan lento reusando `kevPan` / poster con divider draw-in), un eje distinto al de campo. Refrescante.

### Qué viola / dónde flaquea
- **Sobre-ingeniería de JS:** `Crosshair` es `'use client'` con `useRef`/`useEffect`/`requestAnimationFrame` solo para añadir `.is-drawn`. Las versiones de `styles`/`references` logran el mismo draw-in con CSS puro (`.kev-app.is-ready`), sin componente cliente. Para un overlay decorativo, JS es innecesario y añade peso. Mi propuesta y las CSS-only ganan en simplicidad (criterio 8 code quality).
- **Riesgo de "20 micro-interacciones" (criterio Motion 5.1):** acumula crosshair draw-in + reveal por esquina (`rise-cnr` stagger TL→TR→BL→BR) + cross-fade de ruta + pan drift + divider draw-in + pausa de player + cabezal de progreso + cursor micro-crosshair. Es MUCHO. La rúbrica pide *"1 page-load orchestration o 1 hero animation, no 20 micro-interactions"*. **Esta propuesta está en el borde de violar ese criterio por exceso.** La mía (Hara especialmente) es más disciplinada aquí.
- El `<span>®</span>` en `KEV®` del Home introduce un glifo nuevo (`®`) que no está en las LOCKED RULES (único glifo permitido: `→`). Desvío no señalado. Menor, pero es exactamente el tipo de adición silenciosa que la regla prohíbe.
- View Transitions: requiere interceptar `<Link>` con `preventDefault` en `MenuList`/`WorkIndex` — toca componentes de navegación y añade complejidad de mantenimiento. Lo declara como desvío opcional/degradable (bien), pero es la pieza de mayor riesgo de regresión.

### Veredicto vs. la mía
**Me supera en componentes de interacción (route fade, crosshair parametrizable cx/cy, estado de pausa del player) y en el detalle `font-synthesis`.** Yo la supero claramente en **disciplina de motion** (su acumulación de micro-interacciones roza el anti-patrón de la rúbrica) y en simplicidad (su Crosshair-cliente vs. mi/otras CSS-only). **Fusión:** robar su `cx`/`cy` parametrizable (PERO en versión CSS-only via custom props, no `'use client'`), su View Transitions de ruta (como capa opcional), su estado de pausa del player; recortar agresivamente la pila de micro-animaciones a 1–2 momentos; eliminar el `®`.

---

## 5. Tabla de fuerzas y plan de fusión

| Pieza | Mejor propuesta | Por qué |
|---|---|---|
| Concepto narrativo | **Cámara Oscura** | regla de oro negro=imagen / blanco=matada |
| Color cálido sin inventar | **Cámara Oscura** | `--warm-veil` blend multiply |
| Posición del crosshair (fidelidad `01`/`06`) | **Cámara Oscura + Atlas** | 58% mobile / 50% desktop, no plano |
| Crosshair parametrizable | **Components** | `cx`/`cy` props |
| Fundamentación de estilo | **Editorial Monochrome** | tríada de los 67 + Swiss→peso |
| Layout reutilizable | **Editorial Monochrome** | `.kev-bleed` 4 anclas |
| Escala tipográfica fina | **Editorial Monochrome** | `--fs-fine-*` nombrada |
| Reference board / gramática | **Crosshair Atlas** | R1–R7 imagen-por-imagen |
| Header↔hero stitching | **Crosshair Atlas** | `.kev-ticks--anchored` |
| Diagonal de tarjeta (`04`) | **Mi Field.io** | única que la implementa fiel |
| 3 variantes como filosofías | **Mi Field.io (A/B/C)** | vacío/retícula/poster, no dimmer |
| Route transition | **Components** | View Transitions nativas |
| Player en pausa | **Components** | crosshair + Play texto |
| Disciplina de motion | **Mi Hara / Editorial Monochrome** | menos es más |

### Síntesis recomendada para Round 3
La columna vertebral debe ser **Crosshair Atlas (reference board + ticks-anchored) + Cámara Oscura (regla negro/blanco + warm-veil)**, vestida con **`.kev-bleed` y escala fina de Editorial Monochrome**, los **componentes de interacción de Components** (recortados a 1–2 momentos de motion, CSS-only, sin `®`, crosshair `cx/cy` via custom props), y de **mi propuesta** conservar las **3 variantes ontológicas** (Hara/Field/Pentagram como auténticas alternativas, no dosis) y la **diagonal de `04`** que solo yo defiendo.

### Correcciones obligatorias para cualquier síntesis (cero tolerancia)
1. **Crosshair NO a 50%/50% plano:** desktop 50%, mobile/project ~58% (regla de tercios de `01`). Parametrizar `cy`.
2. **Diagonal ≠ crosshair:** en celdas Overview / tarjetas usar diagonal de esquina a esquina (`04`); el crosshair ortogonal es solo para heros full-bleed (`06`). No confundirlos.
3. **Naranja sobre negro:** evitar texto pequeño naranja sobre `#0D0D0D` (≈4.7:1, al filo). Usar tag sólido naranja + texto papel.
4. **Motion presupuestado:** 1 page-load orchestration + 1 hero gesture máximo. Podar la pila de Components.
5. **Glifo único `→`:** eliminar `®` y cualquier otro glifo.
6. **Plumbing del campo:** ninguna propuesta resuelve cómo el `data-field` oscuro llega del page al `Header`/`Cursor` sin prop-drilling. Definirlo en `AppShell` vía `usePathname()` (las 5 lo asumen pero no lo cierran).
