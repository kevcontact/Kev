# KEV — Brief de rediseño (propuesta "Numinous")

> **Regla de oro:** el rediseño es una PROPUESTA en la rama `redesign/numinous`.
> `main` (diseño v1) no se toca. El usuario decide cuál (o qué mezcla) será el definitivo.

## Referentes visuales

Carpeta `design-refs/numinous/` — Numinous Agency brand identity (Behance,
proyecto "Numinous Brand Identity UX/UI"):

| Archivo | Qué muestra |
|---|---|
| `01-hero-mobile-brown.png` | Hero mobile: imagen full-bleed cálida (marrón/ámbar, motion-blur), titular blanco fino arriba-izq en 3 líneas, párrafo pequeño abajo-izq, **retícula de líneas finas (crosshair) que divide la pantalla en cuadrantes** con micro-logo en la intersección. |
| `02-logo-system-eye.png` | Sistema de logo: paréntesis curvos abiertos `( N Λ )` en construcción progresiva, blanco sobre macro-foto de un ojo desenfocado. |
| `03-tokens-neue-montreal-icons.png` | Tokens: paleta `#0d0d0d / #e8e8e8 / #ffffff`; tipografía **Neue Montreal** en Light / Normal / Medium; iconos de línea fina sobre tiles negros redondeados. |
| `04-mobile-cards-4up.png` | 4 pantallas mobile: alternancia negro/imagen/blanco/imagen, texto fino arriba-izq, micro-logo centrado, líneas diagonales finas cruzando el lienzo, créditos minúsculos abajo. |
| `05-poster-grid-blur.png` | Sistema de posters: fotografía motion-blur (cálida, abstracta), claim fino arriba-izq, **línea horizontal divisoria**, créditos pequeños; tagline entre paréntesis curvos `( Less Noise. More Meaning. )`. |
| `06-hero-desktop-crosshair.jpeg` | Hero desktop: full-bleed cálido, titular fino 3 líneas arriba-izq, nav fina arriba-der, párrafo abajo-izq, crosshair completo con micro-logo en el centro. |
| `07-business-cards.png` | Papelería: B/N, letras del logo dispersas por las esquinas (N / U / Λ), jerarquía tipográfica mínima. |

### ADN de los referentes (lo que se quiere absorber)
- **Atmósfera**: cálida, onírica, "numinosa" — imágenes motion-blur full-bleed como campos de color (ámbar, sepia, verde oliva) en momentos clave.
- **Tipografía**: pesos **Light/Regular** protagonistas (vs. solo heavy), titulares finos y grandes con tracking normal; jerarquía por tamaño y no por peso.
- **Retícula visible**: líneas hairline de 1px que cruzan la pantalla (vertical + horizontal = crosshair; diagonales en tarjetas), con micro-marca en la intersección.
- **Texto sobre imagen**: blanco fino sobre full-bleed, esquinas como puntos de anclaje (titular arriba-izq, nav arriba-der, párrafo abajo-izq, créditos abajo-der).
- **Tagline entre paréntesis curvos**: `( … )` como recurso gráfico de marca.
- **Letras dispersas**: caracteres de la marca distribuidos en las esquinas del lienzo.

## Identidad KEV que NO se negocia (v1, `KEV Design System/`)

- Una sola tipografía grotesca (Helvetica Now / Archivo). Sin serifas ni itálicas.
- Naranja `#FF4D17` como único acento de UI (tags de cliente, hover de View →).
- Esquinas cuadradas. Controles de texto, no iconos. Único glifo: `→`.
- Movimiento quieto y fílmico: cross-fades, ease-out suave, sin bounce ni sombras.
- Mobile-first, secciones 100dvh, blanco como papel base del recorrido editorial.
- IA del sitio: Home (menú editorial) → Work index → Project (Gallery/Overview) → Video → Information.
- El header con regla de ticks (film-strip) y el cursor circular son marca registrada del v1 — pueden evolucionar, no desaparecer.
- **El contenedor calla; la imagen habla.** El color viene de las fotos/videos de KEV.

## Dirección de fusión sugerida (punto de partida, no dogma)

1. **Home**: de menú sobre blanco → hero full-bleed con un still/video cálido de KEV
   (motion-blur), las 4 palabras del menú en peso más fino sobre la imagen,
   crosshair hairline con micro-"Kev." en la intersección.
2. **Tipografía**: introducir pesos Light/Regular para titulares atmosféricos;
   conservar Heavy para el wordmark y acentos editoriales.
3. **Retícula**: llevar la "regla de ticks" del v1 a un sistema de hairlines
   (ticks + crosshair conviven — el ADN film-strip se mantiene).
4. **Project/Video**: mantener la galería blanca editorial; permitir "capítulos"
   full-bleed entre secciones (entrada de proyecto = poster Numinous con título
   fino + línea divisoria + créditos).
5. **Paleta**: blanco sigue siendo base; el negro `#0d0d0d` puede ganar terreno
   como segundo campo (pantallas alternas tipo `04-mobile-cards-4up`).
   El naranja KEV sigue siendo el único acento de UI.
