'use client'

import { useEffect, useState } from 'react'
import { Cursor } from '@/components/Cursor'
import { Header } from '@/components/Header'

/** App chrome + entrance-reveal gate (`.is-ready`), as in the design-system kit. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 40)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={'kev-app' + (ready ? ' is-ready' : '')}>
      <Cursor />
      <Header />
      <main>{children}</main>
    </div>
  )
}
