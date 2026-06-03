import type { Metadata } from 'next'
import { PlayerCard } from '@/components/PlayerCard'
import { videoProjects } from '@/lib/data'

export const metadata: Metadata = { title: 'Video — KEV' }

/** Video — vertical list of inline players, text-only controls. */
export default function VideoPage() {
  return (
    <section className="kev-videos">
      <div className="kev-videos__head">
        <h1 className="kev-videos__title">Video</h1>
        <span className="kev-counter">
          {String(videoProjects.length).padStart(2, '0')} films
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
