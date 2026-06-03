# Evaluación visual — KEV × Numinous "Darkroom Atlas" (Round 5, iteración 2/3)

> Evaluador visual del pipeline front-tool. Capturas full-page en `:3001` (mobile 390×844 + desktop 1440×900),
> contrastadas con los 7 referentes Numinous, las LOCKED RULES, la rúbrica combined.md, la SYNTHESIS y los shots v1.
> Capturas: `/Users/thmeza/Developer/Kev/.worktrees/redesign/design-refs/proposals/shots-iter2/`
> Script de captura: `design-refs/proposals/capture-iter2.mjs` (playwright cacheado + chromium-1223).

## Veredicto: PASS

La fusión "Darkroom Atlas" está **resuelta y sin defectos visuales bloqueantes**. Los cuatro issues de iter1
se corrigieron o quedaron justificados, y `tsc --noEmit` pasa limpio sin regresiones. El sitio se siente
inequívocamente NUEVO (atmósfera Numinous: heros full-bleed `#0D0D0D` con media real, crosshair hairline con
micro-`Kev.`, pesos Light, paréntesis de marca, letras dispersas K·E·V) y a la vez reconociblemente KEV
(ticks film-strip, cursor circular, naranja `#FF4D17` solo sobre papel, esquinas cuadradas, IA intacta,
white field editorial). Es shippable como propuesta.

## Score: 31/32 (✅ Ship it)

| Criterio (rúbrica) | Pts | Nota |
|---|---|---|
| 1. Aesthetic direction (bold commit + anti-slop) | 4/4 | Commit total "galería blanca ↔ cuarto oscuro". Cero gradients AI, cero Inter, cero icon tiles. Home/chapter/video son momentos atmosféricos reales con media de KEV; sin velo de color inventado. |
| 2. Typography (display + escala) | 4/4 | UNA grotesca (Archivo). Peso 300 cargado: titulares Light (Photographer & Director, J Balvin, En Otra Vida, Video, bio Information) contra el Heavy del wordmark y los nombres de proyecto. Jerarquía por tamaño. |
| 3. Color & contrast | 4/4 | Tokens cálidos (`--field-dark #0D0D0D`, `--ink-on-dark #F2EFEA`). Naranja solo sobre papel. **iter1 #2 resuelto**: el cover del Home es ahora un still cinematográfico oscuro (retrato studio teal/azul) → el título Light TL cae sobre zona oscura, contraste pleno. Todos los titulares on-dark legibles. |
| 4. Spatial composition | 4/4 | **iter1 #1 (CRITICAL) FIXED**: en mobile Home el menú, el tagline `( Latin music culture, fashion editorial )` y el credit `Medellín · Miami · CDMX · 2026` están vertical y limpiamente separados — cero colisión. Anclas de esquina correctas en ambos viewports. Ritmo 8/16/24 consistente. |
| 5. Motion | 4/4 | Draw-in del crosshair/divider con scaleX/scaleY (visible en capturas), cross-fades; `prefers-reduced-motion` respetado en CSS. Sin bounce/sombras. Orquestación page-load presente. |
| 6. Project tokens (adaptado a KEV) | 4/4 | Helvetica/Archivo + `#FF4D17` + `#0D0D0D` + blanco, exclusivamente. **iter1 #3 FIXED en bio**: la bio de Information ahora normaliza el em dash a middot ("fashion editorial · campaigns"). Los em dashes restantes ("Maisak — Shooting", "Create — OVY Madrid", "UP+ — Behind The Scenes") son TÍTULOS de proyecto de `lib/data.ts` (INTOCABLE) → conflicto regla-vs-dato bloqueado, no atribuible al diseño. |
| 7. Component reuse / layout consistency | 4/4 | MenuList, Media, PlayerCard, WorkIndex, ProjectView reutilizados sin duplicar. Header `is-dark` conmuta por ruta; cursor invierte on-dark; ticks evolucionan a on-dark. IA intacta (Home/Photography/Overview/Project[Gallery|Overview]/Video/Information). |
| 8. Code quality | 3/4 | **`npx tsc --noEmit` pasa limpio (0 errores)**. `npm run lint` reporta 2 errores + 1 warning, pero TODOS en `ProjectView.tsx:107` (`react-hooks/set-state-in-effect`) que es **pre-existente en v1** (idéntico en `/Users/thmeza/Developer/Kev/web/components/ProjectView.tsx`) → cero regresiones nuevas del rediseño. Medio punto retenido porque el lint del proyecto no queda en verde absoluto, aunque la deuda no es del rediseño. |

## Fidelidad a los 7 referentes Numinous

- **01/06 (hero crosshair)**: ✅ Home replica fielmente — full-bleed cálido/cinematográfico, titular fino TL (3 líneas implícitas), nav editorial BL, credit BR, crosshair V+H con micro-marca `Kev.` en la intersección (~58% alto). Desktop y mobile coherentes.
- **02 (logo paréntesis)**: ⚠️→✅ traducido a la puntuación `( … )` en taglines (Home, Video, Information). No se construye un logotipo `( N Λ )` nuevo (correcto: una sola grotesca).
- **03 (tokens / Light-Normal-Medium)**: ✅ pesos finos protagonistas; near-white cálido.
- **04 (cards 4-up alternancia negro/imagen/blanco)**: ✅ el ritmo "chapter negro → galería blanca" en proyectos es la lectura más directa de la lámina.
- **05 (posters motion-blur + línea divisoria + tagline en parens)**: ✅ el chapter = poster (título Light TL + `kev-chapter__divider` + créditos neutros). El calor lo pone la media real (regla de oro respetada).
- **07 (letras dispersas)**: ✅ K·E·V dispersas en Information (visibles tenues en esquinas).

## Comparación vs v1

Inequívocamente nuevo: v1 Home era blanco con menú mega heavy negro; ahora es hero cinematográfico full-bleed.
v1 Information tenía bio Heavy; ahora Light con scatter K·E·V y tagline en parens. v1 Video era blanco; ahora
cuarto oscuro pleno con players de texto. La marca KEV persiste (ticks, cursor circular "N", naranja, wordmark
"Kev.", IA, esquinas cuadradas). Fusión reconocible y diferenciada. ✅

## Cambios verificados desde iter1

| iter1 issue | Estado iter2 | Evidencia |
|---|---|---|
| #1 CRITICAL — colisión mobile Home (BL ↔ BR) | ✅ FIXED | `shots-iter2/mobile-home.png`: menú → tagline → credit apilados, sin solape. |
| #2 MEDIUM — contraste título Home sobre cielo claro | ✅ RESUELTO | `shots-iter2/desktop-home.png` + `mobile-home.png`: cover oscuro, título sobre zona oscura. |
| #3 LOW — em dash en bio Information | ✅ FIXED (bio) | `shots-iter2/desktop-information.png`: "fashion editorial · campaigns" (middot). Em dashes restantes = títulos de `lib/data.ts` (intocable). |
| #4 LOW — tracking tagline Video "10films" | ✅ FIXED | `shots-iter2/mobile-video-fold.png` + `desktop-video-fold.png`: "10 films" con espacio correcto. |

---

## ISSUES (residuales, no bloqueantes)

### #1 — LOW · Em dashes en títulos de proyecto (regla vs dato bloqueado)
- **Pantalla/archivo**: `shots-iter2/desktop-work.png`, `desktop-photography.png` — "Maisak — Shooting", "Create — OVY Madrid", "UP+ — Behind The Scenes".
- **Qué pasa**: la SYNTHESIS §2 prohíbe em dashes en copy; estos vienen de `lib/data.ts` (INTOCABLE). Conflicto regla-vs-dato. Si se quisiera cumplir el ban sin tocar el dato, se podría normalizar en render (replace " — " → " · ") en `WorkIndex`/Photography como se hizo en la bio. Desvío opcional, no obligatorio. No atribuible al diseño.

### #2 — LOW · Letra dispersa "E" cerca del bloque Clients en mobile Information
- **Pantalla/archivo**: `shots-iter2/mobile-information.png` — la `E` de `.kev-scatter` (bottom-left, `bottom: 24vh; left: pad-x`) queda muy próxima a la fila "OVY On The Drums" de la lista Clients. Es tenue (`--ink-3`) y decorativa (`aria-hidden`), pero en mobile el lienzo es estrecho y casi se toca. (El "N" sobre "OVY" en la captura es el cursor en reposo, transitorio, no un defecto de layout.)
- **Fix sugerido**: en `@media (max-width:720px)` mover `.kev-scatter .e` a un hueco sin lista debajo (p.ej. `bottom: 6vh; right: pad-x`) o reducir aún más su opacidad en mobile. Cosmético, no bloquea.

### #3 — NOTE · lint del proyecto no en verde absoluto (deuda pre-existente)
- **Archivo**: `components/ProjectView.tsx:107` — `react-hooks/set-state-in-effect` (reset de view/count + scrollTo en cambio de slug).
- **Qué pasa**: error **pre-existente en v1** (idéntico en `/Users/thmeza/Developer/Kev/web/components/ProjectView.tsx`); el rediseño no lo introdujo. `tsc --noEmit` pasa limpio. Si se quiere dejar el lint en verde, mover el reset a un handler/`key` por slug en el padre, pero es deuda heredada fuera del alcance de la fusión Numinous.

---

## HIGHLIGHTS (lo que funciona y debe conservarse)

- **Home hero (desktop + mobile)**: la mejor traducción del referente 01/06 — full-bleed cinematográfico + crosshair + micro-`Kev.` + anclas de esquina, ahora SIN colisión de texto en mobile. Cover oscuro que da contraste pleno al título Light.
- **Chapter de proyecto (j-balvin, en-otra-vida)**: el "poster Numinous" (título Light TL + crosshair + divider + créditos neutros BL) sobre cover negro, seguido del bar blanco editorial con Gallery/Overview. La transición cuarto-oscuro → galería-blanca es el ADN del concepto y se lee perfecta en ambos viewports.
- **Video como cuarto oscuro pleno**: campo `#0D0D0D`, título Light, tagline `( 10 films, direction & motion )` con tracking correcto, header/ticks/cursor on-dark, PlayerCard con controles de texto (Pause/Unmute/timecode/seek) legibles.
- **Overview / Photography (sala de exposición blanca)**: lista editorial, nombres heavy, tags `#FF4D17` solo sobre papel, años a la derecha, hairlines. Regla de naranja respetada al 100%.
- **Information**: bio Light con em dash normalizado a middot, letras dispersas K·E·V, columnas Clients/Services/Contact, tagline `( Available for commissions, 2026 )`.
- **Pesos Light realmente cargados + paréntesis de marca consistentes**: jerarquía-por-tamaño visible vs el v1 heavy; puntuación Numinous absorbida sin segunda fuente.
