'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Media } from '@/components/Media'
import { Crosshair } from '@/components/Crosshair'
import type { Project } from '@/lib/data'

/** One large centered media per scroll; reports which is nearest viewport-center. */
function GalleryView({
  project,
  onCount,
}: {
  project: Project
  onCount: (n: number) => void
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let raf: number | null = null
    const calc = () => {
      raf = null
      const mid = window.innerHeight / 2
      let best = 0
      let bestD = Infinity
      refs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = Math.abs((r.top + r.bottom) / 2 - mid)
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      onCount(best + 1)
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(calc)
    }
    calc()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.slug])

  return (
    <div className="kev-gallery">
      {project.items.map((item, i) => (
        <div
          className="kev-gallery__slot"
          key={item.src}
          ref={(el) => {
            refs.current[i] = el
          }}
        >
          <Media
            item={item}
            alt={`${project.title} — ${String(i + 1).padStart(2, '0')}`}
            className="kev-gallery__img"
            style={{ aspectRatio: 'auto' }}
            loading={i < 2 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  )
}

/** Masonry grid (4→3→2→1 columns) with solid orange client tags. */
function OverviewView({ project }: { project: Project }) {
  return (
    <div className="kev-overview-grid">
      {project.items.map((item, i) => (
        <div className="kev-overview-grid__cell" key={item.src}>
          <Media
            item={item}
            alt={`${project.title} — ${String(i + 1).padStart(2, '0')}`}
          >
            {i % 3 === 0 && (
              <span className="kev-tag kev-tag--solid kev-overview-grid__tag">
                {project.client}
              </span>
            )}
          </Media>
        </div>
      ))}
    </div>
  )
}

export function ProjectView({
  project,
  next,
}: {
  project: Project
  next: Project
}) {
  const [view, setView] = useState<'gallery' | 'overview'>('gallery')
  const [count, setCount] = useState(1)

  useEffect(() => {
    setView('gallery')
    setCount(1)
    window.scrollTo(0, 0)
  }, [project.slug])

  return (
    <section className="kev-project" style={{ paddingTop: 'var(--header-h)' }}>
      <header className="kev-chapter kev-bleed">
        <div className="kev-bleed__bg">
          <Media item={project.cover} alt="" loading="eager" />
        </div>
        <div className="kev-bleed__scrim" aria-hidden="true" />
        <Crosshair tone="dark" />
        <h1 className="kev-bleed__tl kev-atmos fade-in">{project.title}</h1>
        <div className="kev-bleed__bl">
          <span className="kev-chapter__divider" aria-hidden="true" />
          <span className="kev-counter" style={{ color: 'var(--ink-on-dark-2)' }}>
            {project.client} · {project.year}
          </span>
        </div>
      </header>

      <div className="kev-project__bar">
        <div className="kev-project__id">
          <h1 className="kev-project__title">{project.title}</h1>
          <span className="kev-sub">
            {project.client} · {project.year}
          </span>
        </div>
        <div className="kev-project__toggle" role="tablist">
          <button
            className={'kev-seg' + (view === 'gallery' ? ' is-on' : '')}
            onClick={() => setView('gallery')}
          >
            Gallery
          </button>
          <button
            className={'kev-seg' + (view === 'overview' ? ' is-on' : '')}
            onClick={() => setView('overview')}
          >
            Overview
          </button>
        </div>
      </div>

      <div className="kev-project__stage">
        {view === 'gallery' ? (
          <GalleryView project={project} onCount={setCount} />
        ) : (
          <OverviewView project={project} />
        )}
      </div>

      {view === 'gallery' && (
        <div className="kev-project__counter kev-counter">
          {String(count).padStart(2, '0')} /{' '}
          {String(project.items.length).padStart(2, '0')}
        </div>
      )}

      <div className="kev-next">
        <span className="kev-caps kev-next__lead">Next project</span>
        <Link href={`/work/${next.slug}`} className="kev-next__link">
          View <span className="kev-next__arrow">→</span> {next.title}
        </Link>
        <span className="kev-sub kev-next__client">
          {next.client} · {next.year}
        </span>
      </div>
    </section>
  )
}
