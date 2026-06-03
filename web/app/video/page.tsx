import type { Metadata } from 'next'
import { PlayerCard } from '@/components/PlayerCard'
import { videoProjects } from '@/lib/data'

export const metadata: Metadata = { title: 'Video — KEV' }

/** Video — vertical list of inline players on the dark field (cinema), text controls. */
export default function VideoPage() {
  return (
    <section className="kev-videos kev-videos--dark">
      <div className="kev-videos__head">
        <h1 className="kev-videos__title">Video</h1>
        <span className="kev-counter kev-paren">
          {videoProjects.length}
          {' '}films, direction &amp; motion
        </span>
      </div>
      <div className="kev-videos__list">
        {videoProjects.map((p) => (
          <PlayerCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  )
}
