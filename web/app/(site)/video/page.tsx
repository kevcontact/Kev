import type { Metadata } from 'next'
import { PlayerCard } from '@/components/PlayerCard'
import { getProjects } from '@/lib/content/repository'
import { brandVideos, musicVideos, videoProjectsOf } from '@/lib/content/select'
import type { Project } from '@/lib/content/types'

export const metadata: Metadata = { title: 'Video — KEV' }

/** Un bloque de la pestaña Video (Music videos / Brands). */
function VideoSection({ label, items }: { label: string; items: Project[] }) {
  if (items.length === 0) return null

  return (
    <div className="kev-videos__section">
      <div className="kev-videos__sechead">
        <h2 className="kev-videos__seclabel">{label}</h2>
        <span className="kev-counter kev-paren">
          {String(items.length).padStart(2, '0')}
        </span>
      </div>
      <div className="kev-videos__list">
        {items.map((p) => (
          <PlayerCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  )
}

/** Video — dos bloques (clips musicales / marcas) de players inline sobre el
 *  campo oscuro (cinema), con controles de texto. */
export default async function VideoPage() {
  const projects = await getProjects()
  const videoProjects = videoProjectsOf(projects)
  return (
    <section className="kev-videos kev-videos--dark">
      <div className="kev-videos__head">
        <h1 className="kev-videos__title">Video</h1>
        <span className="kev-counter kev-paren">
          {videoProjects.length}
          {' '}films, direction &amp; motion
        </span>
      </div>

      <VideoSection label="Music videos" items={musicVideos(projects)} />
      <VideoSection label="Brands" items={brandVideos(projects)} />
    </section>
  )
}
