'use client'

import { useActionState } from 'react'
import type { ActionResult } from '@/lib/admin/result'
import type { ContactLink, SiteSettings } from '@/lib/content/types'

const CONTACT_SLOTS = 4
const PRESETS: ContactLink[] = [
  { label: 'Email', value: 'correo@dominio.com', href: 'mailto:correo@dominio.com' },
  { label: 'Instagram', value: '@usuario', href: 'https://www.instagram.com/usuario/' },
]

export function SettingsForm({
  action,
  initial,
  projectOptions,
}: {
  action: (prev: ActionResult | null, fd: FormData) => Promise<ActionResult>
  initial: SiteSettings
  projectOptions: { slug: string; title: string }[]
}) {
  const [state, formAction, pending] = useActionState(action, null)
  const slots = Array.from({ length: CONTACT_SLOTS }, (_, i) => initial.contact[i])

  return (
    <form action={formAction} className="adm-form">
      <label>
        Bio
        <textarea name="bio" defaultValue={initial.bio} rows={4} maxLength={2000} />
      </label>
      <div className="adm-row">
        <label>
          Clientes <small>(uno por línea)</small>
          <textarea name="clients" defaultValue={initial.clients.join('\n')} rows={8} />
        </label>
        <label>
          Servicios <small>(uno por línea)</small>
          <textarea name="services" defaultValue={initial.services.join('\n')} rows={8} />
        </label>
      </div>

      <fieldset className="adm-fieldset">
        <legend>Contacto (botones directos en Information)</legend>
        <p className="adm-hint">
          Correo: enlace <code>mailto:correo@dominio.com</code>. Instagram: <code>https://www.instagram.com/usuario/</code>.
          Deja una fila vacía para no mostrarla.
        </p>
        {slots.map((c, i) => (
          <div key={i} className="adm-contact">
            <input name={`contact_label_${i}`} defaultValue={c?.label ?? ''} placeholder={PRESETS[i]?.label ?? 'Etiqueta'} aria-label={`Etiqueta ${i + 1}`} />
            <input name={`contact_value_${i}`} defaultValue={c?.value ?? ''} placeholder={PRESETS[i]?.value ?? 'Texto visible'} aria-label={`Texto visible ${i + 1}`} />
            <input name={`contact_href_${i}`} defaultValue={c?.href ?? ''} placeholder={PRESETS[i]?.href ?? 'https://…'} aria-label={`Enlace ${i + 1}`} />
          </div>
        ))}
      </fieldset>

      <label>
        Video de portada (home)
        <select name="home_project_slug" defaultValue={initial.homeProjectSlug ?? ''}>
          <option value="">Automático (primer video)</option>
          {projectOptions.map((p) => (
            <option key={p.slug} value={p.slug}>{p.title}</option>
          ))}
        </select>
      </label>

      {state && !state.ok && <p className="adm-error" role="alert">{state.error}</p>}
      {state?.ok && state.message && <p className="adm-ok" role="status">{state.message}</p>}
      <button type="submit" className="adm-btn" disabled={pending}>
        {pending ? 'Guardando…' : 'Guardar'}
      </button>
    </form>
  )
}
