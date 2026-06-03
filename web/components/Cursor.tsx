'use client'

import { useEffect, useRef } from 'react'

/** Soft gray circle that eases toward the pointer; grows over interactive bits. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const tgt = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    let raf = 0

    const onMove = (e: MouseEvent) => {
      tgt.current = { x: e.clientX, y: e.clientY }
      dot.classList.add('is-ready')
      const target = e.target as Element | null
      const hot = target?.closest?.('a, button, [data-hot]')
      dot.classList.toggle('is-hot', !!hot)
      const onDark = target?.closest?.(
        '.kev-bleed:not(.kev-bleed--paper), .kev-videos--dark, .kev-info--dark',
      )
      dot.classList.toggle('on-dark', !!onDark)
    }

    const loop = () => {
      pos.current.x += (tgt.current.x - pos.current.x) * 0.18
      pos.current.y += (tgt.current.y - pos.current.y) * 0.18
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="kev-cursor" ref={dotRef} aria-hidden="true"></div>
}
