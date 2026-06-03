# Cross-critique — desde "Crosshair atmosférico + campo cálido full-bleed (Numinous × KEV)"

> Crítico: el proposer **components** (`proposal-components.md`), actuando como crítico cruzado en front-tool Round 2.
> Evalúo cada propuesta rival contra la rúbrica `combined.md`, las LOCKED RULES del Context Pack/brief, y la fidelidad a los 7 referentes Numinous (re-leídos: `01`, `04`, `06`). Soy honesto sobre lo que es mejor que lo mío y lo que fusionaría.

---

## 0. Hallazgos transversales (afectan a TODAS, incluida la mía)

Antes de criticar una por una, tres hechos verificados en el código que ninguna propuesta debería ignorar y que reescalan los puntajes:

1. **La rúbrica `combined.md` está calibrada para OTRO proyecto (Pan y Pedazo).** Sus criterios literales hablan de tokens `pyp-gold/pyp-black`, fuentes `Urbanist/Neulis/Wild Youth`, y `shadcn/ui` (Button/Card/Dialog) + `SiteLayout/MiniCart`. **Nada de eso existe en KEV** (CSS vanilla, sin component lib — Context Pack lo prohíbe). Por tanto los criterios 6 (Project tokens) y 7 (Component reuse) deben **reinterpretarse** a los términos KEV: "tokens del proyecto" = `--paper/--ink/--accent/--hair/--tick`; "reuse" = reutilizar `Media/Header/MenuList/WorkIndex/ProjectView/PlayerCard` sin duplicarlos ni romper la IA. Cualquier puntaje que asigne abajo aplica esta traducción explícitamente. Esto castiga a quien **reescribe** componentes/pantallas de cero y premia a quien **extiende** con props/clases aditivas.

2. **`layout.tsx` carga hoy `['400'…'900']` — falta el peso 300.** Las CINCO propuestas piden añadir `300`. Es correcto y necesario para "Light protagonista", y NO viola la regla de datos (lo locked es `lib/data.ts` y `lib/media.ts`, no `layout.tsx`). Pero **ninguna** verifica el riesgo real: Helvetica del sistema (preferencia macOS del Context Pack) **no tiene un 300 real** → con `font-synthesis: none` cae a 400 limpio; sin esa guarda, sintetiza un falso-light. Mi propuesta es la única que lo nombra (§1, nota `font-synthesis`). Las rivales asumen el 300 como gratis. Es un punto fino pero load-bearing para el ADN "fino".

3. **Re-lectura de referentes — correcciones de fidelidad que aplican a varias:**
   - `06-hero-desktop-crosshair`: la intersección del crosshair está **cerca del centro vertical** (~50%), NO a 62%. La micro-marca es el logo `N U Λ` **apilado, minúsculo y muy tenue** sin caja de fondo sólida. La nav top-right es **dim/desactivada** (gris), no blanco pleno.
   - `01-hero-mobile-brown`: intersección **bajo el centro** (~55–58%), texto SOLO arriba-izq + párrafo abajo-izq (no las 4 esquinas pobladas).
   - `04-mobile-cards-4up`: las líneas son **diagonales en X de esquina a esquina** + un **badge circular** con el logo centrado, NO un crosshair recto. Texto arriba-izq, créditos abajo.
   Conclusión: el "62%" y la "caja sólida bajo la marca" son invenciones; el centro óptico real ronda 50–58% y la marca **respira sobre la línea sin caja opaca**. Esto afecta a **aesthetic** (h a 62% con caja `--field-dark`) y a mi propia §2 (cy default 0.5 — correcto; pero mi `mark` con `padding` y fondo implícito hay que dejarlo transparente).

---

## 1. "Cámara Oscura" (`proposal-aesthetic.md`)

**Tesis:** dualidad papel/negro como "sala de exposición ↔ cuarto oscuro"; crosshair de visor con micro-Kev.; velo cálido `--warm-veil` ámbar sobre los heros.

### Qué roba-mérito (lo mejor que lo mío — honesto)
- **El concepto narrativo "galería iluminada ↔ cuarto oscuro" es superior al mío.** Yo justifico el crosshair como "ticks desplegados" (estructural, frío); ella le da un **relato fotográfico** que un fotógrafo-director entiende de inmediato y que hace memorable la alternancia de campos. En el criterio 1 (Bold commitment) **gana**: tiene flavor con nombre y mitología. Lo absorbería tal cual como naming del sistema.
- **`--warm-veil` (velo ámbar 4–6% en `mix-blend-mode: multiply`)** es la mejor traducción honesta del "motion-blur cálido/sepia" de `01/05/06` SIN inventar color: profundiza los tonos que ya trae la foto. Mi propuesta usa scrims neutros (negros) que protegen texto pero **no aportan la temperatura ámbar** del referente. Esto es fidelidad-Numinous que a mí me falta. **Lo fusiono.**
- **Letras dispersas K·E·V (§5.5)** y **diagonal de tarjeta `.kev-diag` (§4)** — yo omití ambas. Son ADN explícito del brief (`07` y `04`). Punto a su favor en fidelidad.
- **`data-variant` con solo 4 variables cambiando** (§7) es más limpio que mi enfoque de `data-hero` por-sección: una palanca raíz para que KEV elija en vivo.

### Qué viola reglas / riesgos
- **CRITICAL de contraste (auto-declarado y subestimado):** en Variante C admite naranja `#FF4D17` sobre `#0D0D0D` = **~4.7:1** "justo en el umbral". Para **texto normal pequeño** (tags de cliente) 4.7:1 pasa AA por los pelos, pero su mitigación ("tag sólido con texto papel") cambia el tag de texto-naranja a **fill naranja** — y la LOCKED RULE dice *"naranja nunca como campo/fill"*. Hay una colisión real: o el tag es texto naranja (4.7:1, frágil sobre fotos con zonas claras detrás) o es fill (viola "nunca campo"). No la resuelve. **HIGH.**
- **`--ink-on-dark #F2EFEA`** define un blanco-cálido distinto al `#E8E8E8` exacto del token Numinous (`03`). No es violación, pero se aleja del referente de paleta que el brief cita literalmente. Menor.
- **Reescribe `app/page.tsx` entero** (§5.1) en vez de extender — más superficie de regresión que mi enfoque aditivo. En el criterio 7-traducido (reuse) pierde algo.
- **Crosshair h a 62% con `background: var(--field-dark)` bajo la marca** (§4) — el referente `06` no tiene caja sólida y la intersección está ~50%. Fidelidad imperfecta (ver §0.3). Menor.

### Veredicto vs rúbrica (traducida)
Aesthetic 4/4 · Typography 3/4 (no explicita modular scale ni el riesgo del 300 sintético) · Color 3/4 (warm-veil excelente, pero el naranja-en-C es frágil) · Spatial 4/4 · Motion 4/4 · Tokens 4/4 · Reuse 3/4 (reescribe Home) · Code 3/4 (sin verificación tsc, Variante C contraste). **~28/32** — la más fuerte de las rivales por concepto + warm-veil.

---

## 2. "Numinous Editorial Monochrome" (`proposal-styles.md`)

**Tesis:** derivar el style-guide de 3 estilos del catálogo `ui-ux-pro-max` (Minimalist Monochrome + Swiss Modernism 2.0 + Motion-Driven), traducidos a tokens KEV; 3 variantes Frame/Chapters/Numinous.

### Qué roba-mérito
- **La justificación formal del crosshair como "Swiss grid hecho visible"** es la fundamentación teórica más sólida de las cinco. Donde yo digo "ticks desplegados" y aesthetic dice "visor de cámara", styles ancla el crosshair en un **sistema reticular matemático (base-unit 8px)** — eso le da rigor de spatial-rhythm (criterio 4) que a las demás les falta documentar.
- **Token `--ink-on-field #E8E8E8` exacto del referente `03`** — es el único que usa el blanco-sobre-negro **literal** de la paleta Numinous citada en el brief, en vez de inventar un cálido. Más fiel al token board.
- **El crosshair `.kev-grid__h` que respeta el gutter (`left/right: var(--grid-inset)`)** en vez de borde-a-borde es un detalle Swiss correcto y más editorial que mi línea full-width. Lo consideraría.
- **`.kev-overview-grid__cell--field` (celda alterna a sangre cada 4ª)** traduce `04-mobile-cards-4up` mejor que mi capítulo único: introduce el **ritmo de alternancia dentro de una grilla**, que es exactamente lo que muestra el referente. A mí me falta ese latido. **Lo fusiono.**

### Qué viola reglas / riesgos
- **`--field-2 #131313` como "sub-superficie sobre negro"** roza el patrón **cards-in-cards** (superficie sobre superficie) que el Context Pack PROHÍBE. Si se usa como panel anidado dentro del campo negro, es violación. No lo aclara. **MEDIUM.**
- **El crosshair vertical SIEMPRE a `left: 50%`** (`.kev-grid__v`) — el referente `06` lo tiene ~50% pero las composiciones mobile `01/04` lo desplazan. Rigidez que reduce fidelidad. Menor.
- **Procedencia "67 UI styles / CSV"** es ruido de proceso, no diseño: el criterio 1 premia *commitment a un flavor*, y enumerar 3 categorías de catálogo diluye el commitment (suena a "tres estilos mezclados" en vez de "una dirección"). El mismo doc lo reconoce ("una tríada, no un solo estilo"). Es honesto pero le resta boldness.
- **Variante C** relaja "blanco como base" tanto como la C de aesthetic, con el mismo riesgo de naranja-sobre-negro, que styles **no** verifica numéricamente (aesthetic al menos da el 4.7:1). **MEDIUM.**

### Veredicto vs rúbrica (traducida)
Aesthetic 3/4 (rigor alto pero commitment diluido por la tríada) · Typography 3/4 (escala fina explícita `--fs-fine-*`, buen modular; no nombra riesgo 300) · Color 4/4 (token `#E8E8E8` literal, scrims) · Spatial 4/4 (el más Swiss/8px) · Motion 4/4 · Tokens 4/4 · Reuse 3/4 (extiende vía props, bien; `--field-2` dudoso) · Code 3/4 (sin tsc; `--field-2` riesgo). **~28/32** — empata con aesthetic; gana en rigor reticular, pierde en commitment.

---

## 3. "3 variantes KEV×Numinous: Hara / Field.io / Pentagram" (`proposal-variants.md`)

**Tesis:** tres filosofías de fusión radicalmente distintas (vacío cálido / retícula habitada / poster editorial), recomendando Field.io (B).

### Qué roba-mérito
- **Variante A "Hara / vacío cálido" es un ángulo que NINGUNA otra propuesta tiene** y es legítimamente fuerte: "Numinous no es imagen full-bleed por todas partes, es UN momento numinoso rodeado de vacío." Esa lectura es **más fiel al `05-poster-grid-blur`** (mucho aire, una foto matada) que mi insistencia en full-bleed. Para un cliente de alta gama puede ser la mejor. Me obliga a admitir que mi "full-bleed en cada momento clave" puede ser exceso. **Punto honesto a su favor.**
- **El diagnóstico inicial es el más sabio de todos:** *"el riesgo del rediseño NO es añadir cosas Numinous, es diluir la disciplina del v1 con ruido."* Es la frase que todo el pipeline debería tener pegada en el monitor. Mi propuesta acumula 7 mecanismos nuevos; variants me recuerda que la contención ES el diseño KEV.
- **Crosshair como pseudo-elementos `::before/::after` (sin `<span>` por línea)** es más limpio en markup que mi triple-span. Detalle de implementación que adoptaría para reducir DOM.
- **Variante B alinea con mi propuesta casi 1:1** (crosshair + chapters negros + corner-anchoring + tagline + Video sobre negro) y lo recomienda como base — coincidencia que valida la dirección compartida.

### Qué viola reglas / riesgos
- **Crosshair de B con `transition` pero sin estado inicial `scaleX/Y(0)` claro fuera de reduced-motion** — el draw-in fílmico (que el brief pide como "motion quieto") queda implícito; mi §2 lo especifica con `is-drawn` + origins. Menor (implementable).
- **Variante C "alternancia agresiva" con Overview/Video/Information en negro** repite el riesgo de naranja-sobre-negro sin verificación numérica. Igual que las dos anteriores. **MEDIUM.**
- **Es la propuesta menos "código-lista":** ofrece 3 filosofías pero el TSX/CSS concreto es más esquemático que aesthetic/styles/el mío. En el criterio 8 (code quality / no-regression) está por detrás: hay que rellenar mucho antes de `tsc`. Para un Round de implementación, es dirección, no entrega.
- **Pentagram (C) con `--fs-poster: clamp(3rem, 18vw, 12rem)` y palabra-de-menú gigante rotando** roza el gimmick que el brief evita ("motion quieto"); una palabra que rota entre 4 puede leerse como carrusel. Riesgo de alejarse del "stillness". Menor.

### Veredicto vs rúbrica (traducida)
Aesthetic 4/4 (tres flavors con commitment cada uno; Hara es bold-por-contención) · Typography 3/4 · Color 3/4 (tokens ok; C frágil) · Spatial 3/4 (menos detalle de rhythm que styles) · Motion 3/4 (draw-in implícito) · Tokens 4/4 · Reuse 4/4 (extiende, no reescribe; markup limpio) · Code 2/4 (más esquemático, lejos de tsc). **~26/32** — gran dirección estratégica, menor madurez de código.

---

## 4. "Crosshair Atlas" (`proposal-references.md`)

**Tesis:** lectura imagen-por-imagen → 7 reglas de composición (R1–R7) → 4 mecanismos; sistema "atlas editorial blanco + capítulos atmosféricos", 3 dosis vía clase raíz `atlas-quiet|chapters|numinous`.

### Qué roba-mérito (probablemente la más fuerte del set, honesto)
- **La Parte A (reference board, regla-por-imagen R1–R7) es la mejor pieza de análisis de fidelidad de las cinco propuestas, sin discusión.** Destila *gramática* (no estética prestada) de cada referente y la cruza con lo que el v1 ya hace. Mi propuesta salta directo a componentes sin esta trazabilidad. Si el orquestador quiere defender CADA decisión ante el cliente contra el referente, este doc es la munición. **Esto es superior a lo mío en el eje fidelidad.**
- **R6 "Crosshair = grid made visible" + el puente explícito ticks-1D → crosshair-2D** es la articulación más precisa del mandato del brief ("ticks + crosshair conviven"). Coincide con mi tesis pero la **documenta mejor**.
- **`--crosshair-y: 58%`** (intersección bajo el centro óptico) es **más fiel a `01`** que mi default 0.5 y que el 62% de aesthetic. Detalle verificado en la re-lectura (§0.3): el centro real ronda 55–58% en mobile. **Lo fusiono.**
- **Honestidad de desvíos (Parte E):** declara explícitamente que NO adopta la diagonal `04` para no competir con el crosshair, y marca el peso 300 como ampliación deliberada. Esa transparencia es exactamente lo que el Context Pack pide ("puedes proponer fuera de los docs señalando el desvío"). Modélico.
- **`.kev-hero` como CSS Grid de zonas (TL/TR/BL/BR) que colapsa a 1 columna en mobile** es una implementación de corner-anchoring **más robusta** que mis `position:absolute` por esquina (que pueden solaparse en viewports estrechos). Mejor ingeniería. **Lo fusiono.**

### Qué viola reglas / riesgos
- **`.kev-crosshair` entra solo por `opacity` (cross-fade), NO por draw-in `scaleX/scaleY`.** Es válido ("motion quieto") pero **pierde el gesto de "trazar la línea"** que `02-logo-system-eye` muestra (construcción progresiva) y que mi §2 captura. Aquí mi propuesta es más fiel al "logo en construcción". Trade-off, no violación.
- **`grid-template-columns: 1fr 1fr` fijo en `.kev-hero`** asume composición a dos columnas también para chapters de Project, donde el título largo de un proyecto puede romper el balance. Menos flexible que un grid de zonas con `auto`. Menor.
- **Decir "He leído los 7 referentes Y las capturas v1 `scripts/v1-shots/*.png`"** — no verifiqué que esos shots existan en el worktree; si no existen, es una afirmación de proceso no comprobable. No afecta el diseño, pero es un flag de rigor. Menor.
- **Sin verificación `tsc`/lint** como todas. Y la firma `Media({ item, alt, className, style, children, loading })` que cita hay que confirmarla contra el componente real antes de implementar.

### Veredicto vs rúbrica (traducida)
Aesthetic 4/4 · Typography 4/4 (R3 weight-inversion bien argumentada, escala explícita) · Color 4/4 (`--paper-on-ink #F2F0EC`, scrims, hairlines tintadas) · Spatial 4/4 (grid de zonas, lo más sólido en composición real) · Motion 3/4 (solo opacity, sin draw-in) · Tokens 4/4 · Reuse 4/4 (additive, grid colapsable, no reescribe) · Code 3/4 (sin tsc; firma a confirmar). **~30/32** — la más alta. Gana por fidelidad documentada + ingeniería de layout.

---

## 5. Mi propia propuesta (`proposal-components.md`) — autocrítica honesta

Para no hacer trampa, dónde **pierdo** frente a las rivales:
- **Sin reference board.** references me supera en trazabilidad imagen→regla. Debería haber anclado cada mecanismo a un referente concreto.
- **Sin warm-veil.** aesthetic captura la temperatura ámbar; mis scrims son neutros y "fríos". Pierdo atmósfera Numinous.
- **Sin diagonales ni letras dispersas K·E·V.** aesthetic, styles, variants y references las incluyen (ADN explícito del brief `04`/`07`). Yo las omití.
- **Corner-anchoring con `position:absolute`** es más frágil que el CSS Grid de zonas de references en mobile estrecho.
- **`cx/cy` default 0.5** está bien para desktop pero el referente mobile pide ~58% → debería defaultear a `--crosshair-y: 58%` como references.
- **Mi micro-`Kev.` tiene `padding` + peso heavy** — la re-lectura muestra que la marca Numinous es **minúscula, tenue, sin caja**. Debo bajar opacidad y quitar fondo.

Dónde **gano** (lo que aportaría a la síntesis):
- **Draw-in `scaleX/scaleY` con `is-drawn` + `--ease-draw`** — el único que captura el "logo en construcción" de `02` como movimiento. references solo hace opacity.
- **View Transitions API nativa para cross-fade de ruta** (`lib/useRouteFade.ts`) — el único que resuelve el cross-fade **entre páginas** sin libs, con fallback degradable. Las rivales solo hacen entrada por-página. El brief pide "cross-fades fílmicos" y la transición de ruta es el momento de mayor impacto (criterio 5: "1 page-load orchestration").
- **`font-synthesis: none` para el riesgo del 300 sintético** — el único que protege contra el falso-light de Helvetica del sistema.
- **Estado de pausa del PlayerCard con crosshair + "Play" de texto + cabezal circular (eco del cursor)** — el detalle de interacción más concreto de Video; las rivales dejan Video casi sin tocar más que el color.
- **Mapa de cumplimiento LOCKED con contraste numérico** (`#F4F2EF/#0D0D0D ≈ 17:1`, `0.62 ≈ 9:1`).

Honestamente mi puntaje propio: **~28/32** — fuerte en motion/interacción, débil en fidelidad documentada y atmósfera cálida. Empato con aesthetic/styles, por **debajo de references**.

---

## 6. Ranking y síntesis recomendada

| # | Propuesta | Score (traducido) | Su superpoder | Su debilidad |
|---|---|---|---|---|
| 1 | **references (Crosshair Atlas)** | ~30 | Reference board R1–R7 + grid de zonas + dosis por clase raíz | Motion solo opacity (sin draw-in) |
| 2= | **aesthetic (Cámara Oscura)** | ~28 | Relato papel/cuarto-oscuro + `--warm-veil` cálido | Naranja-sobre-negro frágil (C), reescribe Home |
| 2= | **styles (Editorial Monochrome)** | ~28 | Rigor Swiss/8px + `#E8E8E8` literal + celdas alternas | Commitment diluido por la "tríada", `--field-2` cards-in-cards |
| 2= | **components (la mía)** | ~28 | Draw-in + View Transitions + pausa-player + font-synthesis | Sin reference board, sin warm-veil, anclaje absolute frágil |
| 5 | **variants (Hara/Field/Pentagram)** | ~26 | Tres flavors + diagnóstico "no diluir el v1" + Hara único | Código esquemático, lejos de tsc |

### Lo que fusionaría (el "Frankenstein" óptimo para Round 3 — síntesis)
1. **Base de análisis y layout: references.** Adoptar el **reference board R1–R7** como justificación, el **`.kev-hero` CSS Grid de zonas colapsable** y `--crosshair-y: 58%`.
2. **Atmósfera: aesthetic.** Inyectar **`--warm-veil`** (ámbar 4–6% `multiply`) sobre los heros — la única traducción honesta del sepia Numinous. Y el **relato "galería ↔ cuarto oscuro"** como naming del sistema.
3. **Ritmo y rigor: styles.** Token **`#E8E8E8` literal** del board, **crosshair que respeta el gutter**, y **celda alterna a sangre cada Nª** en Overview (latido de `04`). Descartar `--field-2` para no caer en cards-in-cards.
4. **Contención y opciones: variants.** Conservar la **dosis graduada** (Hara/Field/Pentagram ≈ quiet/chapters/numinous de references — son el mismo eje; unificar en UNA escala por clase raíz). Tatuarse el diagnóstico "no diluir el v1".
5. **Motion e interacción: la mía (components).** Aportar el **draw-in `scaleX/scaleY`** del crosshair (fidelidad a `02`), **View Transitions** para el cross-fade de ruta, **`font-synthesis: none`**, y la **interacción de pausa del PlayerCard**.
6. **Detalles de fidelidad cerrados (verificados en re-lectura):** micro-marca **minúscula, tenue, sin caja** (no heavy con padding sólido); diagonales de `04` solo opt-in en chapters; letras dispersas K·E·V opt-in en Information/entrada de proyecto.

### Riesgo común a resolver ANTES de implementar (todas lo arrastran)
- **Contraste del naranja `#FF4D17` sobre `#0D0D0D` ≈ 4.7:1.** En cualquier variante donde un tag de cliente caiga sobre campo negro, está al filo de AA y se rompe si detrás hay una foto con zonas claras. **Decisión obligada de síntesis:** los tags de cliente viven SOLO sobre papel blanco (donde `#FF4D17/#FFF` da contraste holgado), o se aceptan como fill sólido naranja con texto papel — pero eso **colisiona con "naranja nunca como campo"**. La síntesis debe elegir y documentarlo. Mi recomendación: **tags de cliente nunca sobre negro**; sobre campos oscuros, el cliente va en `--ink-on-field` neutro y el naranja se reserva al `View →` (que vive en el papel).
- **Ningún proposer corrió `tsc --noEmit`/lint** (criterio 8). El implementer debe hacerlo: confirmar firma real de `Media`, añadir `300` a `layout.tsx`, y validar que `prefers-reduced-motion` apaga draw-in + autoplay + pan.
