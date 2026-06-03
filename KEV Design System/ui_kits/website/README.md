# KEV — Website UI kit

A high-fidelity, interactive recreation of the **KEV portfolio site**: a
mobile-first editorial gallery for photography, music videos and brand work.
Open `index.html` for the click-through demo.

> Recreation, not production code. Components are cosmetic and modular — piece
> them together for mocks. Real photographs/videos replace the tonal placeholder
> `Frame`s throughout (see `shared.jsx`).

## Run it
Open `index.html`. It loads React + Babel from CDN, then the component files.
The first paint waits ~2–3s while Babel compiles the JSX in-browser — normal.

## The flow (5 screens)
1. **Home** (`home.jsx`) — the bare editorial menu: four bold words on white.
2. **Work index** (`workindex.jsx`) — long left-aligned project list; hovering a
   row reveals a muted preview panel on the right (desktop ≥ 880px) and dims the
   other rows. `Photography` filters to photo projects; `Overview` shows all.
3. **Project** (`project.jsx`) — two switchable views:
   - **Gallery** — one large centered image per scroll with a live `05 / 12`
     counter (driven by which frame is nearest viewport-center).
   - **Overview** — masonry grid (4→3→2→1 columns) with solid orange client tags.
   - Ends with a bold **View → [next project]** link (orange on hover).
4. **Video** (`video.jsx`) — vertical list of 16:9 players, autoplay muted,
   text-only controls (`Pause` · `Unmute` · timecode · thin progress bar),
   title bold + client gray below. Playback is simulated (no real footage).
5. **Information** (`information.jsx`) — terse bio statement + Clients / Services /
   Contact columns.

Persistent across all: the **Header** (`header.jsx`) — `Kev.` wordmark · the
film-strip tick ruler · `Menu` (opens a full-screen overlay of the four words);
and the **custom Cursor** (`shared.jsx`) — a soft gray circle that eases toward
the pointer and grows over interactive targets (hidden on touch).

## Files
| File | Role |
|---|---|
| `index.html` | Mounts everything; loads React/Babel + components in order. |
| `kit.css` | Imports `../../colors_and_type.css`; adds grain, cursor, frame, reveal helpers. |
| `data.js` | `window.KEV_DATA` — projects (title/client/year/kind/cover/frames) + info. |
| `shared.jsx` | `Frame` (media placeholder) + `Cursor`. |
| `header.jsx` | `Header`, `MenuList`, `KEV_MENU`. |
| `home.jsx` | `Home`. |
| `workindex.jsx` | `WorkIndex`. |
| `project.jsx` | `Project`, `GalleryView`, `OverviewView`, `aspectFor`. |
| `video.jsx` | `Video`, `Player`, `fmt`. |
| `information.jsx` | `Information`. |
| `app.jsx` | Router state + assembly + entrance-reveal gate. |

## Swapping in real media
`Frame` renders a flat tonal fill + faint film grain as a photo/video stand-in.
Replace it with an `<img>`/`<video>` (keep `object-fit: cover`, square corners,
no border/shadow) — the layouts are built to let imagery carry all the colour.

## Conventions worth keeping
- One typeface, heavy weights, tight display tracking, generous body line-height.
- Square corners everywhere; orange only on client tags + `View →` hover.
- Text-based controls, not icons. The only glyph is `→`.
- Motion is quiet: cross-fades + soft ease-out, no bounce, no shadows.
- Entrance reveals are JS-gated (`.is-ready`) with a **visible** base state, so
  content is never stuck invisible if the animation timeline is paused.
