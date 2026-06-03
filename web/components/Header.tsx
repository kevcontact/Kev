'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { KEV_MENU } from '@/lib/nav'
import { MenuList } from '@/components/MenuList'

/** Persistent header (wordmark · film-strip ruler · Menu) + full-screen menu overlay. */
export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // close the overlay on navigation
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // a11y: Escape to close, focus into the dialog on open, trap Tab,
  // restore focus to the toggle on close
  useEffect(() => {
    if (!menuOpen) return
    const overlay = overlayRef.current
    const links = overlay?.querySelectorAll<HTMLElement>('a')
    links?.[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key === 'Tab' && overlay) {
        const focusables = Array.from(overlay.querySelectorAll<HTMLElement>('a'))
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement as HTMLElement | null
        const inside = active ? overlay.contains(active) : false
        if (e.shiftKey && (!inside || active === first)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && (!inside || active === last)) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      toggleRef.current?.focus()
    }
  }, [menuOpen])

  // which menu word is "current" for the overlay highlight
  const current =
    KEV_MENU.find(
      (m) => pathname === m.href || (m.href === '/work' && pathname.startsWith('/work')),
    )?.label ?? null

  return (
    <>
      <header className="kev-header">
        <Link href="/" className="kev-header__mark" aria-label="KEV — home">
          Kev.
        </Link>
        <span className="kev-ticks" aria-hidden="true"></span>
        <button
          ref={toggleRef}
          type="button"
          className="kev-header__menu kev-label"
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {menuOpen && (
        <div
          ref={overlayRef}
          className="kev-overlay fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onClick={() => setMenuOpen(false)}
        >
          <div className="kev-overlay__inner" onClick={(e) => e.stopPropagation()}>
            <MenuList current={current} onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
