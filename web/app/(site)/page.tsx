import { Media } from '@/components/Media'
import { Crosshair } from '@/components/Crosshair'
import { getProjects, getSettings } from '@/lib/content/repository'
import { bySlug, videoProjectsOf } from '@/lib/content/select'

/** Home — full-bleed warm field with KEV's showreel; crosshair with micro
 *  "Kev." in the center. Navigation hides behind the Menu button (slide-in panel). */
export default async function Home() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()])
  // proyecto de portada elegido en /admin; si no existe, el primer video publicado
  const hero =
    (settings.homeProjectSlug && bySlug(projects, settings.homeProjectSlug)) ||
    videoProjectsOf(projects)[0] ||
    projects[0]

  return (
    <section className="kev-home kev-home--bleed kev-bleed">
      <div className="kev-bleed__bg">
        {hero && <Media item={hero.cover} alt="" loading="eager" />}
      </div>
      <div className="kev-bleed__scrim" aria-hidden="true" />
      <Crosshair tone="dark" />

      <h1 className="kev-bleed__tl kev-atmos kev-home__title rise-in">
        Photographer<br />&amp; Director.
      </h1>

      <span
        className="kev-bleed__bl kev-paren kev-sub rise-in"
        style={{ color: 'var(--ink-on-dark-2)' }}
      >
        Latin music culture, fashion editorial
      </span>

      <span className="kev-bleed__br kev-counter">
        Medellín · Miami · CDMX · 2026
      </span>
    </section>
  )
}
