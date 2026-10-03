'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addMedia } from '@/app/admin/actions/media'
import { prepareImage, prepareVideo } from '@/lib/admin/media-prep'
import { storagePathFor } from '@/lib/content/validation'
import { MEDIA_BUCKET } from '@/lib/supabase/env'
import { createBrowserSupabase } from '@/lib/supabase/browser'

type Status = { name: string; state: 'working' | 'done' | 'error'; note?: string }

/** Sube fotos/videos directo al bucket y los registra en el proyecto. */
export function MediaUploader({ projectId, projectSlug }: { projectId: string; projectSlug: string }) {
  const router = useRouter()
  const [statuses, setStatuses] = useState<Status[]>([])
  const [busy, setBusy] = useState(false)

  const setStatus = (i: number, next: Status) =>
    setStatuses((prev) => prev.map((s, k) => (k === i ? next : s)))

  async function uploadOne(file: File): Promise<void> {
    const supabase = createBrowserSupabase()
    const bucket = supabase.storage.from(MEDIA_BUCKET)
    const id = crypto.randomUUID().slice(0, 8)
    const put = async (path: string, body: Blob, contentType: string) => {
      const { error } = await bucket.upload(path, body, {
        contentType,
        cacheControl: '31536000',
        upsert: false,
      })
      if (error) throw new Error(`Subida fallida: ${error.message}`)
    }

    if (file.type.startsWith('image/')) {
      const img = await prepareImage(file)
      const path = storagePathFor(projectSlug, file.name.replace(/\.[^.]+$/, '.jpg'), id)
      await put(path, img.blob, 'image/jpeg')
      const r = await addMedia({ projectId, type: 'image', path, posterPath: null, width: img.width, height: img.height, duration: null })
      if (!r.ok) throw new Error(r.error)
      return
    }

    const vid = await prepareVideo(file)
    const path = storagePathFor(projectSlug, file.name, id)
    const posterPath = path.replace(/\.mp4$/, '-poster.jpg')
    await put(path, vid.file, 'video/mp4')
    await put(posterPath, vid.poster, 'image/jpeg')
    const r = await addMedia({
      projectId,
      type: 'video',
      path,
      posterPath,
      width: vid.width,
      height: vid.height,
      duration: Math.round(vid.duration * 100) / 100,
    })
    if (!r.ok) throw new Error(r.error)
  }

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    const list = Array.from(files)
    setBusy(true)
    setStatuses(list.map((f) => ({ name: f.name, state: 'working' })))
    // en serie: evita saturar la conexión del productor con varios videos a la vez
    for (const [i, file] of list.entries()) {
      try {
        await uploadOne(file)
        setStatus(i, { name: file.name, state: 'done' })
      } catch (e) {
        setStatus(i, { name: file.name, state: 'error', note: e instanceof Error ? e.message : 'Error' })
      }
    }
    setBusy(false)
    router.refresh()
  }

  return (
    <div className="adm-uploader">
      <label className="adm-drop">
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,video/mp4"
          disabled={busy}
          onChange={(e) => {
            void onFiles(e.target.files)
            e.target.value = ''
          }}
        />
        <strong>{busy ? 'Subiendo…' : 'Agregar fotos o videos'}</strong>
        <span>Fotos JPG/PNG/WebP (se optimizan solas) · Videos MP4 H.264 1080p hasta 300 MB</span>
      </label>
      {statuses.length > 0 && (
        <ul className="adm-status" aria-live="polite">
          {statuses.map((s, i) => (
            <li key={i} data-state={s.state}>
              {s.state === 'working' ? '…' : s.state === 'done' ? '✓' : '✕'} {s.name}
              {s.note && <em> · {s.note}</em>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
