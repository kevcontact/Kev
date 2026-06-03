'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Media } from '@/components/Media'
import { Crosshair } from '@/components/Crosshair'
import type { Project } from '@/lib/data'

/** Darkroom index — dark-field list with the home's full-bleed vibe:
 *  hovering a row floods the background with that project's cover. */
export function WorkIndex({
  title,
  items,
}: {
  title: string
  items: Project[]
}) {
  const [hover, setHover] = useState(-1)
  const active = hover >= 0 ? items[hover] : null

  return (
    <section className="kev-work kev-work--dark">
      <div className="kev-work__bg" aria-hidden="true">
        {active && (
          <Media
            key={active.slug}
            item={active.cover}
            className="fade-in"
            style={{ aspectRatio: 'auto' }}
          />
        )}
      </div>
      <div className="kev-work__scrim" aria-hidden="true" />
      <Crosshair tone="dark" />

      <div className="kev-work__head">
        <h1 className="kev-work__title kev-atmos">{title}</h1>
        <span className="kev-paren kev-counter">
          {String(items.length).padStart(2, '0')} projects
        </span>
      </div>

      <div className="kev-work__body">
        <ol className="kev-work__list" onMouseLeave={() => setHover(-1)}>
          {items.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="kev-work__row"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
              >
                <span className="kev-work__name">{p.title}</span>
                <span className="kev-tag kev-work__tag">{p.client}</span>
                <span className="kev-work__year kev-counter">{p.year}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
