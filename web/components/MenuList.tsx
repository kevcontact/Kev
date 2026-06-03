'use client'

import Link from 'next/link'
import { KEV_MENU } from '@/lib/nav'

/** The four mega words. `current` dims the active one; hover focuses one. */
export function MenuList({
  current,
  onNavigate,
}: {
  current?: string | null
  onNavigate?: () => void
}) {
  return (
    <nav className="kev-menulist">
      {KEV_MENU.map((m) => (
        <Link
          key={m.label}
          href={m.href}
          className={
            'kev-menulist__item' + (current === m.label ? ' is-current' : '')
          }
          onClick={onNavigate}
        >
          {m.label}
        </Link>
      ))}
    </nav>
  )
}
