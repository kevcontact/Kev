import { MenuList } from '@/components/MenuList'

/** Home — the bare editorial menu. Four bold words on white. */
export default function Home() {
  return (
    <section className="kev-home">
      <div className="kev-home__top kev-caps rise-in">
        Photographer &amp; Director
      </div>
      <div className="kev-home__menu rise-in">
        <MenuList />
      </div>
      <div className="kev-home__foot kev-counter">
        Medellín · Miami · CDMX — 2026
      </div>
    </section>
  )
}
