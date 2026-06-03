# Evaluación visual — KEV × Numinous "Darkroom Atlas" (Round 5, iteración 1/3)

> Evaluador visual del pipeline front-tool. Capturas full-page en `:3001` (mobile 390×844 + desktop 1440×900),
> contrastadas con los 7 referentes Numinous, las LOCKED RULES, la rúbrica combined.md, la SYNTHESIS y los shots v1.
> Capturas: `/Users/thmeza/Developer/Kev/.worktrees/redesign/design-refs/proposals/shots-iter1/`

## Veredicto: NEEDS_ITERATION

La fusión "Darkroom Atlas" es **convincente y bien commiteada**: el sitio se siente claramente NUEVO (atmósfera Numinous: heros full-bleed negros con media real, crosshair hairline con micro-`Kev.`, pesos Light, paréntesis de marca, letras dispersas K·E·V) y a la vez reconociblemente KEV (ticks film-strip, cursor circular, naranja #FF4D17, esquinas cuadradas, IA intacta, white field editorial). Se va a iterar por **un defecto de colisión de texto en mobile Home** (CRITICAL, accionable) y dos retoques menores. Sin esa colisión sería PASS.

## Score: 27/32 (🟡 iterar 1 round)

| Criterio (rúbrica) | Pts | Nota |
|---|---|---|
| 1. Aesthetic direction (bold commit + anti-slop) | 4/4 | Commit total al concepto "galería blanca ↔ cuarto oscuro". Cero slop: sin gradients AI, sin Inter, sin icon tiles. Home/chapter/video son momentos atmosféricos reales con media de KEV. |
| 2. Typography (display + escala) | 4/4 | UNA grotesca (Archivo). Peso 300 realmente cargado — los titulares Light (Photographer & Director, J Balvin, En Otra Vida, Video, bio) contrastan con el Heavy del wordmark y los nombres de proyecto. Jerarquía por tamaño. |
| 3. Color & contrast | 3/4 | Tokens cálidos correctos (`--field-dark #0D0D0D`, `--ink-on-dark #F2EFEA`). Naranja solo sobre papel. **−1**: el titular Light TL del Home mobile/desktop cae sobre la zona clara del cielo del still y el scrim superior es tenue ahí — el contraste del título sobre el cielo brillante es marginal (ver issue #2). |
| 4. Spatial composition | 3/4 | Anclas de esquina bien resueltas en desktop (TL título, BL menú+tagline, BR credit). **−1**: la regla mobile colapsa BL y BR al mismo punto → colisión (issue #1). |
| 5. Motion | 4/4 | Draw-in del crosshair/divider con scaleX/scaleY (visible "dibujado" en las capturas), cross-fades; `prefers-reduced-motion` respetado en CSS. Sin bounce/sombras. Las capturas se tomaron con motion habilitado y se ve la orquestación de page-load. |
| 6. Project tokens (adaptado a KEV) | 3/4 | Helvetica/Archivo + #FF4D17 + #0D0D0D + blanco, exclusivamente. **−1**: la bio (Information) conserva un em dash ("editorial — campaigns") que viola el ban cualitativo de em dashes; viene de `lib/data.ts` (INTOCABLE), conflicto entre regla y dato bloqueado — señalar, no bloquear. |
| 7. Component reuse / layout consistency | 4/4 | MenuList, Media, PlayerCard, WorkIndex, ProjectView reutilizados sin duplicar. Header is-dark conmuta por ruta; cursor invierte on-dark; ticks evolucionan a on-dark. IA intacta (Home/Photography/Overview/Project[Gallery|Overview]/Video/Information). |
| 8. Code quality | 2/4 | No verificado en esta ronda (eval visual). Se asume `tsc`/`lint` del implementer; no medido aquí → no se puede acreditar el segundo punto. |

## Fidelidad a los 7 referentes Numinous

- **01/06 (hero crosshair)**: ✅ Home replica fielmente — full-bleed cálido (still cinematográfico de costa), titular fino TL, crosshair V+H con micro-marca en la intersección, párrafo/credit en esquinas. Muy logrado en desktop.
- **02 (logo paréntesis)**: ⚠️ traducido a la puntuación `( … )` en taglines (Home, Video, Information). No se intentó el sistema `( N Λ )` literal (correcto: una sola grotesca, sin construir un logotipo nuevo).
- **03 (tokens / Light-Normal-Medium)**: ✅ pesos finos protagonistas; la paleta 0d0d0d/near-white se respeta con near-white cálido.
- **04 (cards 4-up alternancia negro/imagen/blanco)**: ✅ el ritmo "chapter negro → galería blanca" en las páginas de proyecto es la lectura más directa de esta lámina. Las diagonales hairline se omitieron (decisión de restraint de la SYNTHESIS — aceptable).
- **05 (posters motion-blur + línea divisoria + tagline en parens)**: ✅ el chapter de proyecto = poster (título fino + `kev-chapter__divider` + créditos). Falta el motion-blur cálido literal porque la regla de oro prohíbe velo de color inventado; el calor lo pone la media real (correcto).
- **07 (letras dispersas)**: ✅ K·E·V dispersas en Information (visibles tenues en esquinas).

## Comparación vs v1

El rediseño es inequívocamente nuevo: v1 Home era blanco con menú mega heavy negro; ahora es un hero cinematográfico full-bleed. v1 Information tenía bio en Heavy; ahora en Light con scatter K·E·V. v1 Video era blanco; ahora cuarto oscuro pleno. La marca KEV persiste (ticks, cursor "N", naranja, wordmark "Kev.", IA). Fusión reconocible y diferenciada. ✅

---

## ISSUES (accionables)

### #1 — CRITICAL · Colisión de texto en mobile Home (BL menú+tagline ↔ BR credit)
- **Pantalla/archivo**: mobile Home — `shots-iter1/mobile-home.png` + `_mobile-home-bottom.png`. CSS en `app/globals.css` líneas 595–605.
- **Qué pasa**: `.kev-bleed__bl` (MenuList + `( Latin music culture, fashion editorial )`) está en `bottom: 6vh; left: pad-x`. La media query `@media (max-width:720px)` reubica `.kev-bleed__br` (el credit `Medellín · Miami · CDMX · 2026`) también a `left: pad-x; bottom: 6vh`. Ambos quedan en el MISMO ancla → el tagline en parens y el credit de ubicación se imprimen superpuestos e ilegibles, y el cursor "N" cae encima.
- **Fix**: en `@media (max-width:720px)`, separar verticalmente los dos bloques. Opciones: (a) mover `.kev-bleed__br` a `bottom: 2.5vh` y subir el bloque BL para que el tagline termine antes (p.ej. `.kev-home__nav` con `bottom: 11vh` o reducir el `margin-top` del tagline); o (b) en mobile, integrar el credit como una línea más dentro del bloque BL (flujo normal, no absoluto) bajo el tagline, con un gap explícito. Verificar que ni el tagline ni el credit toquen el cursor en reposo (esquina inferior-izq).

### #2 — MEDIUM · Contraste marginal del titular Home sobre el cielo claro
- **Pantalla/archivo**: Home mobile y desktop — `mobile-home.png`, `desktop-home.png`.
- **Qué pasa**: "Photographer & Director." (Light, near-white) se ancla TL sobre la zona superior del still, que en este cover (costa al atardecer) tiene cielo claro/medio. El `--scrim-top` (0.46→0 al 34%) protege poco en esa franja; el título Light queda con contraste bajo en la mitad clara.
- **Fix**: reforzar levemente el scrim superior SOLO bajo el bloque TL (un radial/linear localizado a la izquierda, sin teñir toda la imagen — respeta "el contenedor calla"), o subir `--ink-on-dark` a opacidad plena en el título (ya está) y aumentar el stop del `--scrim-top` a ~0.55 hasta el 24%. Medir ≥4.5:1 en la posición real del título sobre ESTE cover.

### #3 — LOW · Em dash en la bio de Information (regla vs dato bloqueado)
- **Pantalla/archivo**: Information — `desktop-information.png`, `mobile-information.png`.
- **Qué pasa**: la bio muestra "fashion editorial — campaigns"; la SYNTHESIS §2 prohíbe em dashes en copy, pero el texto viene de `lib/data.ts` (INTOCABLE).
- **Fix**: como `lib/data.ts` no se toca, dejar constancia del conflicto. Si se quisiera cumplir el ban sin tocar el dato, se podría normalizar el em dash en render (replace " — " → " · ") en el componente — desvío opcional, no obligatorio. Mantener si se prioriza "datos intocables".

### #4 — LOW · Verificación de tracking pendiente en tagline Video ("10films")
- **Pantalla/archivo**: Video — `desktop-video-top.png`, `mobile-video-top.png`.
- **Qué pasa**: el tagline `( 10films, direction & motion )` se ve muy apretado entre "10" y "films" por el tracking de `.kev-paren`/conteo dinámico. Probable que el espacio exista pero el `letter-spacing` lo comprime visualmente.
- **Fix**: confirmar que `{videoProjects.length} films` renderiza el espacio; si el kerning lo come, añadir un `&nbsp;` o subir `word-spacing` mínimo en `.kev-paren`. Cosmético.

---

## HIGHLIGHTS (lo que funciona y debe conservarse)

- **Home hero (desktop)**: la mejor traducción del referente 01/06 — full-bleed + crosshair + micro-`Kev.` + anclas de esquina. Atmósfera Numinous lograda con media real, cero velo de color inventado.
- **Chapter de proyecto (j-balvin, en-otra-vida)**: el "poster Numinous" (título Light TL + crosshair + divider + créditos neutros BL) sobre cover negro, seguido del bar blanco editorial. La transición cuarto-oscuro → galería-blanca es el ADN del concepto y se lee perfecto.
- **Video como cuarto oscuro pleno**: campo `#0D0D0D`, título Light, tagline en parens, header/ticks/cursor on-dark, PlayerCard con controles de texto legibles. Comprometido y cinematográfico.
- **Work index hover**: dim del resto + preview con micro-crosshair (`Kev.` en la intersección sobre la foto). Interacción de marca elegante (verificada con hover en `desktop-work-hover.png`).
- **Regla de naranja respetada**: tags `#FF4D17` solo sobre papel (Photography, Overview index). Cero naranja-texto sobre negro (el chapter usa credit neutro `--ink-on-dark-2`).
- **Pesos Light realmente cargados**: la bio de Information y los titulares atmosféricos prueban que el peso 300 está en next/font; el cambio de jerarquía-por-tamaño (vs v1 heavy) es visible y refinado.
- **Letras dispersas K·E·V** en Information y **paréntesis de marca** consistentes: puntuación Numinous absorbida sin segunda fuente.
