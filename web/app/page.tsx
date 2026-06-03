import { MenuList } from '@/components/MenuList'
import { Media } from '@/components/Media'
import { Crosshair } from '@/components/Crosshair'
import { projectBySlug } from '@/lib/data'

/** Home — full-bleed warm field with KEV's showreel; the four menu words in a
 *  fine weight anchored to the corners, crosshair with micro "Kev." in the center. */
export default function Home() {
  const reel = projectBySlug('showreel')!.cover // video-clips/reel-kev.mp4 (cálido, en movimiento)

  return (
    <section className="kev-home kev-home--bleed kev-bleed">
      <div className="kev-bleed__bg">
        <Media item={reel} alt="" loading="eager" />
      </div>
      <div className="kev-bleed__scrim" aria-hidden="true" />
      <Crosshair tone="dark" />

      <h1 className="kev-bleed__tl kev-atmos kev-home__title rise-in">
        Photographer<br />&amp; Director.
      </h1>

      <nav className="kev-bleed__bl kev-home__nav rise-in">
        <MenuList />
        <span
          className="kev-paren kev-sub"
          style={{ display: 'block', marginTop: '1.2em', color: 'var(--ink-on-dark-2)' }}
        >
          Latin music culture, fashion editorial
        </span>
      </nav>

      <span className="kev-bleed__br kev-counter">
        Medellín · Miami · CDMX · 2026
      </span>
    </section>
  )
}
