# Crítica cruzada — desde "Numinous Editorial Monochrome" (proposer `styles`)

> Round 2 del pipeline front-tool. Critico las 4 propuestas rivales contra la rúbrica
> `combined.md`, las LOCKED RULES y la fidelidad a los 7 referentes Numinous (re-leídos).
> Incluye autocrítica honesta: dónde un rival me gana y qué fusionaría.
>
> **Nota metodológica sobre la rúbrica:** `combined.md` es la rúbrica genérica de
> `pyp` (Pan y Pedazo) — habla de `pyp-gold`, Urbanist/Neulis/Wild Youth y shadcn/ui,
> nada de lo cual aplica a KEV. La traduzco a su *intención* para este proyecto:
> § Project tokens = tokens KEV (`--ink/--paper/--accent/--hair/--tick`), § Fonts =
> "una sola grotesca Archivo + pesos", § Component reuse = "reutilizar `Media`,
> `Header`, `WorkIndex`, `ProjectView`, `PlayerCard`, no duplicar AppShell". Puntúo
> 0/1/2 por criterio (max 32) bajo esa lectura.

---

## Hechos verificados en el código (base de toda la crítica)

Antes de juzgar, anclé las afirmaciones técnicas leyendo el worktree:

1. **`app/layout.tsx` carga Archivo con `weight: ['400','500','600','700','800','900']` — NO incluye `300`.** Esto es decisivo: cualquier `--w-light: 300` en CSS **cae a 400** salvo que se añada `'300'` al array de `next/font`. Lo verifiqué directamente.
2. **`projectBySlug('showreel')` existe** y su `cover`/`src` apunta a `video-clips/reel-kev.mp4` — es la media cálida en movimiento real de KEV. `projectBySlug('j-balvin')` también existe (proyecto de foto).
3. **`MenuList` hoy sólo acepta `{ current, onNavigate }`** — cualquier `variant`/`onDark` exige editarlo (cambio menor, retrocompatible).
4. **`globals.css` no tiene `--w-light`, ni `--field`, ni crosshair, ni 4-anclas, ni `is-ready` en `.kev-app`** (sólo `.kev-app:not(.is-ready)` en `.rise-in`). Toda propuesta que use `.kev-app.is-ready` asume que ese estado ya se togglea — hay que confirmar en `AppShell`.
5. **`web/AGENTS.md` advierte que este Next.js NO es el estándar** ("breaking changes — read `node_modules/next/dist/docs/`"). Penaliza cualquier propuesta que dependa de APIs de Next sin verificarlas.
6. **Referentes re-leídos** — correcciones de fidelidad que afectan a varias propuestas:
   - En `06` y `01` la **horizontal del crosshair está cerca del centro óptico (~52–58%)**, NO a "62%" ni en `flex-end`. La micro-marca `N U Λ` va **apilada en un pequeño hueco de la línea, sin caja de fondo sólida**.
   - El titular de `06` es **Regular/Medium legible, no ultra-light 300** — "Branding that Defines / Design that Endures" tiene cuerpo. Traducir TODO a peso 300 puede quedar más anémico que el referente.
   - En `04`/`05` el badge de marca es **circular / pill redondeado** (`( N Λ )`) — eso **chocaría con la LOCKED rule de esquinas cuadradas** si alguien lo replica literal. Las diagonales de `04` son una **X completa** sobre la imagen, no una sola diagonal.

---

## 1. Cámara Oscura (`proposal-aesthetic.md`) — el rival más fuerte

**Score estimado: 27/32 → 🟡 (top del lote).**

| Criterio | Pts | Nota |
|---|---|---|
| Aesthetic direction | 4 | "galería iluminada / cuarto oscuro" es el concepto **más memorable y mejor verbalizado** de los cinco. Bold, anti-slop explícito. |
| Typography | 3 | Pesos finos + paréntesis bien; pierde 1 por el riesgo "todo light". |
| Color & contrast | 4 | Único que **calcula** contraste del naranja sobre negro (`#FF4D17`/`#0D0D0D` ≈ 4.7:1) y lo resuelve con tag sólido. Riguroso. |
| Spatial | 3 | Corner-anchoring y chapter sólidos; algo menos sistematizado que un grid formal. |
| Motion | 4 | Reveal de líneas scaleX/scaleY + reduced-motion en todo. |
| Project tokens | 3 | Introduce `--warm-veil` ámbar y `--ink-on-dark #F2EFEA` (blanco cálido, no `#FFF`). Defendible pero ver "viola reglas". |
| Component reuse | 4 | `is-dark` por `usePathname` sin duplicar Header; deja Work/Overview/PlayerCard intactos. |
| Code quality | 2 | Bien tipado; el `--warm-veil` es el único riesgo de regla. |

**Qué me roba mérito (honesto):**
- El **concepto narrativo** ("galería iluminada vs cuarto oscuro; negro = hay imagen, blanco = imagen matada") es más fuerte que mi marco "Minimalist Monochrome + Swiss + Motion". El suyo se *recuerda*; el mío *justifica*. Si fuera cliente, el pitch de Cámara Oscura me convence antes.
- La **regla de oro "negro = hay imagen full-bleed; blanco = imagen colgada"** es una heurística operativa más clara que mi "el campo negro ocupa el segundo acento de Swiss". Le da disciplina a la alternancia que a mí me faltaba enunciar.
- Es **el único que verifica el contraste naranja-sobre-negro numéricamente** — yo lo afirmé sin el cálculo en el umbral crítico (Variante C). Eso es un agujero real en mi propuesta.
- Defiende **NO meter negro en el Work index** ("romperlo sería diluir la marca"). Es una decisión de criterio que mi Variante C (que sí oscurece índices) no protege igual de bien.

**Qué viola / arriesga reglas:**
- **`--warm-veil: rgba(74,38,18,0.18)` con `mix-blend-mode: multiply` sobre los heros.** Esto es el desvío más serio del lote frente a la LOCKED rule **"el contenedor calla; la imagen habla; el color viene de las fotos"**. Un velo ámbar a 18% **inventa color de contenedor** sobre la foto — exactamente lo que el brief prohíbe. Mi propuesta deliberadamente NO añade velo (el calor lo pone la media real). Aquí yo estoy más limpio. El multiply a 18% además puede tumbar el contraste del texto en zonas medias de la foto, contradiciendo su propio cálculo.
- **`--ink-on-dark #F2EFEA` (blanco cálido)** es defendible (la paleta Numinous es `#e8e8e8`), pero introduce un blanco que NO está en los tokens KEV. Es un color nuevo de bajo riesgo, pero técnicamente un token fuera del sistema v1.
- El **micro-crosshair *dentro* del cursor** (`is-hot::before/::after`) es bonito pero suma dos pseudo-elementos a un cursor que ya tiene transición de tamaño; hay riesgo de jitter. Es un "nice-to-have" que yo no incluí y no echo de menos.

**Fidelidad a referentes:** alta. Pone la horizontal a 62% (mi corrección: el referente está más cerca del centro, ~52–58%; 62% es defendible como regla de tercios pero se aleja un poco de `06`). El velo ámbar es su intento de capturar la "atmósfera cálida" del referente — comprensible, pero el referente logra ese calor con **foto cálida real**, no con un overlay de color. Mi lectura (usar `reel-kev`/`balvin` que YA son cálidos) es más fiel al espíritu "la imagen habla".

**Qué fusionaría de él a lo mío:** (a) su **concepto narrativo** como capa de comunicación encima de mi sistema de tokens; (b) su **cálculo de contraste naranja/negro** y la solución de tag sólido — debo adoptarlo en mi Variante C; (c) su **regla de oro "negro sólo con imagen detrás, nunca negro decorativo vacío"** — es mejor que mi enunciado y elimina el riesgo de un campo negro hueco. Lo que **rechazaría**: el `--warm-veil` (viola "el contenedor calla").

---

## 2. variants — Hara / Field.io / Pentagram (`proposal-variants.md`)

**Score estimado: 26/32 → 🟡.**

| Criterio | Pts | Nota |
|---|---|---|
| Aesthetic direction | 4 | Tres filosofías nombradas (Hara/Field.io/Pentagram) genuinamente distintas, no tres tintes del mismo. |
| Typography | 3 | Pesos finos OK; Pentagram empuja `--fs-poster clamp(3rem,18vw,12rem)` — gran impacto. |
| Color & contrast | 3 | `--field-ink #E8E8E8` sobre negro ≈15:1 verificado; no aborda naranja/negro. |
| Spatial | 4 | Field.io articula la **retícula como estructura, no decoración** — el mejor encuadre conceptual del crosshair. |
| Motion | 3 | Cross-fade de palabras (Pentagram) con reduced-motion; menos detalle de draw-in. |
| Project tokens | 4 | Delta limpio sobre v1 vía `data-variant`; reusa `--hair`. |
| Component reuse | 3 | Reusa todo; Pentagram numerado exige más markup. |
| Code quality | 2 | Correcto; las 3 variantes en un archivo aumentan superficie a mantener. |

**Qué me roba mérito:**
- **Las tres variantes son de verdad distintas filosóficamente.** Las mías (Frame/Chapters/Numinous) son *tres dosis del mismo sistema* — más fáciles de implementar (comparten 100% del CSS), pero menos exploratorias. Hara (vacío, imagen *matted* no full-bleed) es una tesis que yo ni consideré y que es legítimamente "alta gama". Pentagram (poster, jerarquía por tamaño con número editorial `01…15`) abre un territorio de autor que mi propuesta no toca. **En diversidad de exploración, variants me gana.**
- **"El riesgo del rediseño NO es añadir Numinous, es diluir la disciplina del v1 con ruido."** Es el mejor diagnóstico de una sola frase de todo el lote. Es la advertencia que yo debería haber puesto al frente.
- Field.io enuncia **"la hairline no decora: estructura"** — exactamente mi tesis Swiss, pero dicha mejor.

**Qué viola / arriesga:**
- **Mismo bug que comparte casi todo el lote pero que ELLOS sí evitan:** variants es de los pocos que **explícitamente añade `'300'` al `weight` de `layout.tsx`** (lo dice en §0 y en "Notas comunes 1"). Esto es correcto — y es donde **yo fallo** (ver autocrítica).
- En Field.io, el `.kev-crosshair__mark` usa `background: var(--paper)` (caja blanca sólida tras "Kev.") — el referente lo hace con un **hueco en la línea sin caja**. Mismo pecado leve que el mío.
- Pentagram `--fs-poster clamp(3rem,18vw,12rem)` y la palabra-hero que rota entre las 4 del menú con cross-fade roza el límite de "motion quieto" — es un gimmick tipográfico que, mal calibrado, grita más que el referente fino. Riesgo de over-decoración que el propio autor admite.

**Fidelidad a referentes:** Field.io es muy fiel (es básicamente `06` con media de KEV, lo dice). Hara se aleja conscientemente (matted vs full-bleed) — es una *interpretación*, no una *traducción*, y eso es válido pero menos "Numinous a primera vista". Pentagram añade numeración editorial que NO está en los referentes Numinous (es más Pentagram que Numinous) — desvío señalado por el propio autor, honesto.

**Qué fusionaría:** la **filosofía Hara como mi Variante A** (mejor que mi "Frame": imagen *matted* flotando en blanco es más KEV-puro que superponer crosshair a un menú blanco). Y su **frase-diagnóstico** ("no diluir el v1") como principio rector. Field.io es esencialmente mi Variante B con mejor naming — convergemos, lo cual valida ambas.

---

## 3. Crosshair Atlas (`proposal-references.md`) — el más metódico

**Score estimado: 26/32 → 🟡.**

| Criterio | Pts | Nota |
|---|---|---|
| Aesthetic direction | 3 | "Atlas editorial + capítulos atmosféricos" sólido pero menos punzante que Cámara Oscura. |
| Typography | 3 | R3 (inversión de peso) bien argumentada; señala que falta el 300 en v1. |
| Color & contrast | 3 | `--paper-on-ink #F2F0EC`, `--hair-on-media .34`; verifica >4.5:1 sin el caso naranja/negro. |
| Spatial | 4 | `.kev-hero` con **grid de 12 zonas explícito** (TL/TR/BL/BR mapeadas a `grid-column/row`) — la composición más rigurosa del lote. |
| Motion | 3 | Crosshair por cross-fade (no draw-in); `--t-chapter`; reduced-motion OK. |
| Project tokens | 4 | Estrictamente aditivo, reusa `--hair`, un solo color nuevo (negro). |
| Component reuse | 3 | Reusa todo; firmas reales citadas. |
| Code quality | 3 | El más "implementable hoy"; cita las firmas exactas de `Media`/`ProjectView`. |

**Qué me roba mérito:**
- **La PARTE A "lectura imagen por imagen" (R1–R7) es el mejor trabajo de fundamentación del lote.** Destila cada referente a una *regla de composición* (anclaje a esquinas, paréntesis como puntuación, inversión de peso, alternancia de campo, divider spine, crosshair = grid visible, letras dispersas) y la cruza con lo que el v1 ya hace. Mi tabla "ADN→token" es buena, pero su mapeo regla-por-imagen es más exhaustivo y *enseñable*. Si alguien tiene que defender el rediseño ante el cliente, este documento es la munición.
- **R6: "ticks (1D) → crosshair (2D), misma familia hairline"** es la mejor justificación de por qué el crosshair NO traiciona el film-strip. Yo dije "evoluciona los ticks"; él **explica el mecanismo** (regla horizontal → cruz vertical+horizontal). Más convincente.
- **`.kev-hero` como CSS Grid de zonas** (no `position:absolute` por esquina) es técnicamente superior a mi enfoque de 4 anclas absolutas: colapsa a 1 columna en mobile de forma declarativa. **Mi `.kev-bleed__tl/tr/bl/br` con `position:absolute` es más frágil en mobile** (riesgo de solapamiento de texto). Aquí me gana en arquitectura CSS.
- Es **el único que nombra el desvío del `colors_and_type.css` v1** (que empieza en 400) Y lo conecta con el `next/font` — diligencia técnica que yo no mostré.

**Qué viola / arriesga:**
- `--paper-on-ink #F2F0EC` — otro blanco cálido fuera de tokens KEV (mismo punto que aesthetic).
- La micro-marca a `font-size: 13px` `--w-heavy` sin caja, color `--paper-on-ink`: correcto y fiel al referente (mejor que mi caja sólida).
- **No prioriza una variante para implementar tan claramente como yo** ("recomendada: B" lo dice, pero el documento es más catálogo que decisión). En un pipeline que va a *implementar*, mi recomendación tajante de "Variante B" es operativamente más útil.

**Fidelidad a referentes:** la más alta del lote, por construcción (deriva las reglas DE los referentes). Único reparo: pone `--crosshair-y: 58%` (correcto, coincide con mi corrección) pero su `.kev-hero` mapea BL/BR a `grid-row: 3` con la imagen al centro — bien. Reconoce explícitamente que descarta la diagonal de `04` para no competir con el crosshair (desvío honesto y, creo, acertado).

**Qué fusionaría — esto es lo más importante de toda mi crítica:**
- **Adoptaría su `.kev-hero` CSS-Grid de zonas en lugar de mis 4 anclas absolutas.** Es objetivamente mejor para mobile. Mi propuesta debería incorporarlo.
- **Pegaría su tabla R1–R7 como "Parte A" de la síntesis final** — es la fundamentación que conecta cada decisión con un referente concreto, algo que el implementer y el cliente necesitan.
- **R6 (ticks→crosshair 1D→2D)** debe ser EL argumento canónico para la LOCKED rule "ticks evolucionan, no desaparecen".

---

## 4. components (`proposal-components.md`) — el más ambicioso técnicamente, el más arriesgado

**Score estimado: 22/32 → 🟡 (borde inferior).**

| Criterio | Pts | Nota |
|---|---|---|
| Aesthetic direction | 3 | Concepto OK pero centrado en interacción, no en dirección estética. |
| Typography | 3 | Pesos finos; señala honestamente que Helvetica del sistema no tiene 300 real y caerá a 400 (transparencia valiosa). |
| Color & contrast | 3 | `--on-dark-1 #F4F2EF` ≈17:1, `--on-dark-2 .62` ≈9:1 verificado; no naranja/negro. |
| Spatial | 3 | Corner-anchoring por `position:absolute` (mismo frágil que el mío). |
| Motion | 3 | Draw-in scaleX/scaleY bien; pero añade **View Transitions + IntersectionObserver + cabezal de progreso** = mucha superficie de movimiento. |
| Project tokens | 3 | Aditivo; muchos tokens nuevos (`--on-dark-1/2/3`, `--cursor-on-dark`, scrims, `--ease-draw`). |
| Component reuse | 2 | Reusa, pero **añade `lib/useRouteFade.ts` + estado `is-paused` en PlayerCard + `data-cross`/`data-field` en Cursor** = más invasivo. |
| Code quality | 2 | **El `'use client'` + `useEffect` + `requestAnimationFrame` en `Crosshair` es JS innecesario**: el draw-in puede ser 100% CSS (como hago yo y como hacen references/variants). Y View Transitions choca con el aviso de `AGENTS.md`. |

**Qué me roba mérito:**
- **El estado de pausa del `PlayerCard`** (crosshair pale sobre el poster + "Play" central de **texto**, no icono) es un detalle de producto genuinamente bueno y 100% LOCKED-compliant. Yo no toqué el player más allá del color; este toque es superior y on-brand.
- La **detección `data-field="dark"` en el Cursor para invertir color** es más limpia que mi selector `.kev-app[data-field="dark"] .kev-cursor` porque lee el ancestro real bajo el puntero.
- Reconoce con honestidad brutal que **Helvetica del sistema no tiene peso 300 y `font-synthesis: none` lo dejará en 400** — es el único que aborda la consecuencia real de mi propio token `--w-light` en la fuente preferida del sistema. Eso es un agujero compartido que él al menos nombra.

**Qué viola / arriesga (lo más grave del lote):**
- **`Crosshair` como Client Component con `useEffect`/`rAF` para añadir `.is-drawn`.** Es JS de cliente para un efecto puramente decorativo que se hace con CSS (`.kev-app.is-ready` o `@starting-style`). Viola el espíritu "many small files / mínima superficie" y mete un componente client donde podría ser server/CSS. **Mi `Grid.tsx` es CSS puro** — aquí yo estoy mejor.
- **View Transitions API + `lib/useRouteFade.ts`.** `web/AGENTS.md` advierte explícitamente "This is NOT the Next.js you know — read the docs before writing code". Apostar a `document.startViewTransition` + `router.push` envuelto, en un Next modificado, **sin verificar la doc local**, es el riesgo de regresión más alto de las cinco propuestas. El propio autor lo marca como "desvío señalado / degradable", pero sigue siendo la pieza con más probabilidad de romper el build o la navegación.
- **Cabezal circular en la barra de progreso** (`prog span::after`, `border-radius:999px`) — añade un segundo elemento redondeado además del cursor. La LOCKED rule permite el cursor redondo como excepción; multiplicar redondeces erosiona "esquinas cuadradas". Riesgo bajo pero es deriva.
- Replica el `background: var(--paper)`-less mark bien, pero la **densidad total de mecanismos** (crosshair + cross-fade de ruta + reveal por esquina con IntersectionObserver + pausa con crosshair + cabezal + cursor con micro-cruz) contradice la rúbrica §5 "1 high-impact moment, NO 20 micro-interactions". **Es la propuesta que más se acerca a violar la regla anti-over-engineering.**

**Fidelidad a referentes:** correcta en lo esencial (crosshair, esquinas, paréntesis, campo negro). Pero su valor está en *interacción*, no en *traducción visual del referente* — y los referentes Numinous son notablemente **quietos** (heros estáticos con motion-blur fotográfico, no microinteracciones). Añadir View Transitions + reveal + pausa-animada va en dirección contraria a la calma del referente.

**Qué fusionaría:** **sólo dos cosas, quirúrgicamente** — (a) el **estado de pausa del PlayerCard con "Play" de texto** (excelente, lo adopto); (b) la **detección de `data-field` en el Cursor**. Todo lo demás (View Transitions, Crosshair como client, cabezal redondo, IntersectionObserver) lo **dejaría fuera** por riesgo/over-engineering. El draw-in del crosshair lo mantengo en CSS puro (mi versión y la de references).

---

## Autocrítica honesta — dónde MI propuesta (`styles`) falla

Releyéndome con la misma vara:

1. **BUG REAL: no añado `'300'` a `layout.tsx`.** Mi §2 declara `--w-light: 300` y mi §0 entera depende de "jerarquía por peso fino", pero **nunca digo que hay que editar `app/layout.tsx`** para cargar el peso 300 de Archivo. Verificado: hoy carga `400–900`. Sin ese cambio, **todo mi sistema de pesos finos cae a 400 y mi propuesta no se ve como la pinto.** Cuatro de cuatro rivales (aesthetic, variants, references, components) SÍ lo señalan. Es mi peor fallo y debo corregirlo.
2. **No verifico el contraste naranja sobre negro** en mi Variante C ("celdas alternas sobre negro con tag naranja"). Cámara Oscura demuestra que está en el umbral (≈4.7:1) y exige tag sólido. Mi propuesta lo asume sin el cálculo.
3. **Mis 4 anclas son `position:absolute` (`.kev-bleed__tl/tr/bl/br`)** — frágiles en mobile. El `.kev-hero` CSS-Grid de references es arquitectónicamente mejor y debería reemplazarlas.
4. **Mi `.kev-grid__mark` usa caja sólida `background: var(--paper)`** — el referente usa un hueco en la línea sin caja. Detalle de fidelidad que references/components clavan mejor.
5. **Mis tres variantes son la misma dosis escalada**, no tres tesis. variants demuestra que se puede explorar más (Hara vs Pentagram). Mi pragmatismo (comparten 100% del CSS) es una virtud de implementación pero una pobreza de exploración.
6. **Donde SÍ gano:** soy (junto con references) de los que **NO inventa color de contenedor** — rechazo explícitamente el velo ámbar y el blanco cálido `#F2EFEA/#F2F0EC/#F4F2EF` que aesthetic/references/components introducen. Mantengo blanco/negro/`#E8E8E8` puros de la paleta Numinous. En "el contenedor calla", soy el más estricto. Y mi `Grid.tsx` es CSS puro (vs components, que lo hace client).

---

## Veredicto comparativo y ruta de síntesis

| Propuesta | Score | Fortaleza única | Riesgo de regla mayor |
|---|---|---|---|
| **Cámara Oscura** (aesthetic) | **27** | Concepto narrativo + contraste naranja/negro calculado | `--warm-veil` inventa color de contenedor |
| variants (Hara/Field/Pentagram) | 26 | Diversidad real de exploración + diagnóstico "no diluir v1" | Pentagram roza over-decoración |
| Crosshair Atlas (references) | 26 | Fundamentación R1–R7 + `.kev-hero` CSS-Grid | blanco cálido fuera de tokens |
| **styles (la mía)** | ~25 | Más estricto en "contenedor calla" + CSS puro + recomendación tajante | **no añade 300 a layout.tsx** |
| components | 22 | Pausa de player con "Play" texto + cursor data-field | View Transitions/client Crosshair = riesgo de regresión |

**La síntesis ganadora NO es una sola propuesta — es un ensamblaje:**

1. **Esqueleto = mi sistema de tokens (styles)** — el más estricto con la paleta KEV pura (sin velos ámbar, sin blancos cálidos inventados) — **CORREGIDO con el `'300'` en `layout.tsx`** que tomo de los rivales.
2. **Composición = `.kev-hero` CSS-Grid de zonas (references)** en vez de mis anclas absolutas.
3. **Fundamentación = la Parte A R1–R7 (references)** como capa de comunicación.
4. **Concepto/comunicación = "galería iluminada vs cuarto oscuro" (aesthetic)** + su **regla de oro "negro sólo con imagen detrás"** + su **cálculo de contraste naranja/negro**, pero **sin el `--warm-veil`** (uso media cálida real, como defiendo).
5. **Diversidad de variantes = Hara como Variante-A (variants)** sustituyendo mi "Frame".
6. **Detalle de producto = pausa del PlayerCard con "Play" texto (components)** y **cursor `data-field` (components)** — y NADA MÁS de components (fuera View Transitions y el Crosshair client).
7. **Variante a implementar = "Chapters/Field.io/atlas-chapters"** — las tres propuestas medias convergen en lo mismo: hero full-bleed cálido + crosshair + chapters negros en Project + Video en negro + Information blanca. Esa convergencia entre tres autores independientes es la señal más fuerte de que ESA es la fusión correcta.

**Recomendación para Round 3 (síntesis):** construir sobre styles+references (tokens puros + grid riguroso), envolver con el concepto y el rigor de contraste de aesthetic (menos el velo), ofrecer Hara como dosis mínima, y robar sólo dos detalles de components. El crosshair se queda en **CSS puro**, la micro-marca en **hueco sin caja**, la horizontal a **~55%**, y el peso fino **realmente cargado (300 en layout.tsx)**.
