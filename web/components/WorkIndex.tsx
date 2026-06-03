'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Media } from '@/components/Media'
import type { Project } from '@/lib/data'

/** Long text list; hovering a line reveals a muted media preview (desktop). */
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
    <section className="kev-work">
      <div className="kev-work__head">
        <h1 className="kev-work__title">{title}</h1>
        <span className="kev-counter">
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
              >
                <span className="kev-work__name">{p.title}</span>
                <span className="kev-tag kev-work__tag">{p.client}</span>
                <span className="kev-work__year kev-counter">{p.year}</span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="kev-work__preview" aria-hidden="true">
          {active && (
            <Media
              key={active.slug}
              item={active.cover}
              className="fade-in kev-work__panel"
              style={{ aspectRatio: 'auto' }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
