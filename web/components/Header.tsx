'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { KEV_MENU } from '@/lib/nav'
import { MenuList } from '@/components/MenuList'

/** Persistent header (wordmark · film-strip ruler · Menu) + full-screen menu overlay. */
export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // dark fields: Home, Video, and any project page (the chapter sits at top)
  const onDark =
    pathname === '/' || pathname === '/video' || pathname.startsWith('/work/')

  // close the overlay on navigation
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // which menu word is "current" for the overlay highlight
  const current =
    KEV_MENU.find(
      (m) => pathname === m.href || (m.href === '/work' && pathname.startsWith('/work')),
    )?.label ?? null

  return (
    <>
      <header className={'kev-header' + (onDark && !menuOpen ? ' is-dark' : '')}>
        <Link href="/" className="kev-header__mark" aria-label="KEV — home">
          Kev.
        </Link>
        <span className="kev-ticks" aria-hidden="true"></span>
        <button
          className="kev-header__menu kev-label"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {menuOpen && (
        <div className="kev-overlay fade-in" onClick={() => setMenuOpen(false)}>
          <div className="kev-overlay__inner" onClick={(e) => e.stopPropagation()}>
            <MenuList current={current} onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
