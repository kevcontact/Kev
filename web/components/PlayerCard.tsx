'use client'

import { useEffect, useRef, useState } from 'react'
import { mediaUrl } from '@/lib/media'
import type { Project } from '@/lib/data'

const fmt = (t: number) => {
  if (!Number.isFinite(t) || t < 0) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Real inline player — autoplay muted, text-only controls, seekable thin bar. */
export function PlayerCard({ project }: { project: Project }) {
  const item = project.items[0]
  const videoRef = useRef<HTMLVideoElement>(null)
  // start as paused: autoplay can be blocked/deferred; onPlay reconciles
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [t, setT] = useState(0)
  const [duration, setDuration] = useState(item.duration ?? 0)

  // reconcile with the real element state after mount (autoplay may have started)
  useEffect(() => {
    const v = videoRef.current
    if (v && !v.paused) setPlaying(true)
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => setPlaying(false))
    } else {
      v.pause()
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v || !duration) return
    const r = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - r.left) / r.width) * duration
  }

  const pct = duration ? (t / duration) * 100 : 0

  return (
    <article className="kev-player">
      <div
        className="frame frame--dark kev-player__screen"
        style={{ aspectRatio: `${item.w} / ${item.h}` }}
      >
        <video
          ref={videoRef}
          src={mediaUrl(item.src)}
          poster={item.poster ? mediaUrl(item.poster) : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration
            if (Number.isFinite(d) && d > 0) setDuration(d)
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <button
          className="kev-player__hit"
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
        ></button>
      </div>

      <div className="kev-player__bar">
        <button className="kev-player__ctl" onClick={togglePlay}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button className="kev-player__ctl" onClick={toggleMute}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
        <div className="kev-player__prog" onClick={seek} data-hot>
          <span style={{ width: `${pct}%` }}></span>
        </div>
        <span className="kev-player__tc">
          {fmt(t)} / {fmt(duration)}
        </span>
      </div>

      <div className="kev-player__meta">
        <h2 className="kev-player__title">{project.title}</h2>
        <span className="kev-sub">{project.client}</span>
      </div>
    </article>
  )
}
