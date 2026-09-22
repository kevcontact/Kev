'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Media } from '@/components/Media'
import { Crosshair } from '@/components/Crosshair'
import type { Project } from '@/lib/data'

/** Horizontal rail — one photo at a time, sliding right (scroll-snap).
 *  Reports the real 1-based index of the slide in view. Ends with View → next. */
function GalleryRail({
  project,
  next,
  onCount,
}: {
  project: Project
  next: Project
  onCount: (n: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  // real counter driven by horizontal scroll position
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf: number | null = null

    const calc = () => {
      raf = null
      const w = track.clientWidth
      if (!w) return
      const i = Math.round(track.scrollLeft / w)
      onCount(Math.min(i + 1, project.items.length))
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(calc)
    }

    // desktop: translate vertical wheel into one-slide horizontal steps
    let wheelLock = false
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return // native horizontal scroll
      e.preventDefault()
      if (wheelLock || Math.abs(e.deltaY) < 8) return
      wheelLock = true
      const w = track.clientWidth
      const idx = Math.round(track.scrollLeft / w)
      const dir = e.deltaY > 0 ? 1 : -1
      track.scrollTo({ left: (idx + dir) * w, behavior: 'smooth' })
      setTimeout(() => {
        wheelLock = false
      }, 420)
    }

    calc()
    track.addEventListener('scroll', onScroll, { passive: true })
    track.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('resize', onScroll)
    return () => {
      track.removeEventListener('scroll', onScroll)
      track.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.slug])

  // click right half → next slide, left half → previous
  const step = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    const w = track.clientWidth
    const idx = Math.round(track.scrollLeft / w)
    const dir = e.clientX > window.innerWidth / 2 ? 1 : -1
    track.scrollTo({
      left: Math.max(0, idx + dir) * w,
      behavior: 'smooth',
    })
  }

  return (
    <div className="kev-gallery kev-gallery--rail" ref={trackRef}>
      {project.items.map((item, i) => (
        <div className="kev-gallery__slide" key={item.src} onClick={step}>
          <Media
            item={item}
            alt={`${project.title} — ${String(i + 1).padStart(2, '0')}`}
            className="kev-gallery__img"
            style={{ aspectRatio: 'auto' }}
            loading={i < 3 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <div className="kev-gallery__slide kev-gallery__slide--next">
        <span className="kev-caps kev-next__lead">Next project</span>
        <Link href={`/work/${next.slug}`} className="kev-next__link">
          View <span className="kev-next__arrow">→</span> {next.title}
        </Link>
        <span className="kev-sub kev-next__client">{next.client}</span>
      </div>
    </div>
  )
}

/** Masonry grid (4→3→2→1 columns) with plain white client tags. */
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
              <span className="kev-tag kev-overview-grid__tag">
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
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setView('gallery')
    setCount(1)
    window.scrollTo(0, 0)
  }, [project.slug])

  const pick = (v: 'gallery' | 'overview') => {
    setView(v)
    if (v === 'gallery') {
      // pin the viewport to the rail — photos slide right, the page stays put
      requestAnimationFrame(() => {
        stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

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
            {project.client}
          </span>
        </div>
      </header>

      <div className="kev-project__bar">
        <div className="kev-project__id">
          <h1 className="kev-project__title">{project.title}</h1>
          <span className="kev-sub">{project.client}</span>
        </div>
        <div className="kev-project__toggle" role="tablist">
          <button
            className={'kev-seg' + (view === 'gallery' ? ' is-on' : '')}
            onClick={() => pick('gallery')}
          >
            Gallery
          </button>
          <button
            className={'kev-seg' + (view === 'overview' ? ' is-on' : '')}
            onClick={() => pick('overview')}
          >
            Overview
          </button>
        </div>
      </div>

      <div className="kev-project__stage" ref={stageRef}>
        {view === 'gallery' ? (
          <GalleryRail project={project} next={next} onCount={setCount} />
        ) : (
          <OverviewView project={project} />
        )}
      </div>

      {view === 'gallery' && (
        <div className="kev-project__counter">
          <span className="kev-counter">
            {String(count).padStart(2, '0')} /{' '}
            {String(project.items.length).padStart(2, '0')}
          </span>
          <span className="kev-project__counter-title">{project.title}</span>
        </div>
      )}

      {view === 'overview' && (
        <div className="kev-next">
          <span className="kev-caps kev-next__lead">Next project</span>
          <Link href={`/work/${next.slug}`} className="kev-next__link">
            View <span className="kev-next__arrow">→</span> {next.title}
          </Link>
          <span className="kev-sub kev-next__client">{next.client}</span>
        </div>
      )}
    </section>
  )
}
