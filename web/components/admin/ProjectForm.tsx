'use client'

import { useActionState, useState } from 'react'
import type { ActionResult } from '@/lib/admin/result'
import { slugify } from '@/lib/content/validation'
import { PROJECT_KINDS, type ProjectKind } from '@/lib/content/types'

export type ProjectFormValues = {
  title: string
  slug: string
  client: string
  year: string
  kind: ProjectKind
  blurb: string
  published: boolean
}

const KIND_LABEL: Record<ProjectKind, string> = {
  Photography: 'Fotografía (pestaña Photography)',
  Video: 'Video musical (Video → Music videos)',
  Brand: 'Marca (Video → Brands si es video)',
}

export const EMPTY_PROJECT: ProjectFormValues = {
  title: '', slug: '', client: '', year: '', kind: 'Photography', blurb: '', published: true,
}

export function ProjectForm({
  action,
  initial,
  submitLabel,
}: {
  action: (prev: ActionResult | null, fd: FormData) => Promise<ActionResult>
  initial: ProjectFormValues
  submitLabel: string
}) {
  const [state, formAction, pending] = useActionState(action, null)
  // el slug sigue al título hasta que el productor lo edita a mano
  const [slug, setSlug] = useState(initial.slug)
  const [slugTouched, setSlugTouched] = useState(initial.slug !== '')

  return (
    <form action={formAction} className="adm-form">
      <label>
        Título
        <input
          name="title"
          defaultValue={initial.title}
          required
          maxLength={120}
          onChange={(e) => !slugTouched && setSlug(slugify(e.target.value))}
        />
      </label>
      <label>
        URL (slug)
        <input
          name="slug"
          value={slug}
          required
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          onChange={(e) => {
            setSlugTouched(true)
            setSlug(e.target.value)
          }}
        />
        <small>kev…/work/{slug || '…'}</small>
      </label>
      <label>
        Cliente / artista
        <input name="client" defaultValue={initial.client} maxLength={120} />
      </label>
      <label>
        Tipo
        <select name="kind" defaultValue={initial.kind}>
          {PROJECT_KINDS.map((k) => (
            <option key={k} value={k}>{KIND_LABEL[k]}</option>
          ))}
        </select>
      </label>
      <label>
        Año <small>(interno, no se muestra en el sitio)</small>
        <input name="year" defaultValue={initial.year} inputMode="numeric" pattern="\d{4}" maxLength={4} />
      </label>
      <label>
        Descripción <small>(opcional)</small>
        <textarea name="blurb" defaultValue={initial.blurb} rows={3} maxLength={2000} />
      </label>
      <label className="adm-check">
        <input type="checkbox" name="published" defaultChecked={initial.published} />
        Publicado (visible en el sitio)
      </label>
      {state && !state.ok && <p className="adm-error" role="alert">{state.error}</p>}
      {state?.ok && state.message && <p className="adm-ok" role="status">{state.message}</p>}
      <button type="submit" className="adm-btn" disabled={pending}>
        {pending ? 'Guardando…' : submitLabel}
      </button>
    </form>
  )
}
