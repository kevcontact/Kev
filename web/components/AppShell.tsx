'use client'

import { useEffect, useState } from 'react'
import { Cursor } from '@/components/Cursor'
import { Header } from '@/components/Header'

/** App chrome + entrance-reveal gate (`.is-ready`), as in the design-system kit. */
type AppShellProps = {
  children: React.ReactNode
  /** URL del Instagram de KEV; null mientras el productor no la cargue */
  instagram: string | null
}

export function AppShell({ children, instagram }: AppShellProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 40)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={'kev-app' + (ready ? ' is-ready' : '')}>
      <Cursor />
      <Header instagram={instagram} />
      <main>{children}</main>
    </div>
  )
}
