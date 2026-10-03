'use client'

import { useActionState } from 'react'
import type { ActionResult } from '@/lib/admin/result'
import { splitContact } from '@/lib/admin/contact-fields'
import type { SiteSettings } from '@/lib/content/types'

/** Enlaces extra además de correo e Instagram (Vimeo, WhatsApp…). */
const OTHER_SLOTS = 2

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
  const { email, instagram, others } = splitContact(initial.contact)
  const slots = Array.from({ length: OTHER_SLOTS }, (_, i) => others[i])

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
        <legend>Contacto</legend>
        <p className="adm-hint">
          Se muestran en la página Information. Instagram además queda fijo en el menú de todo el sitio.
          Deja un campo vacío para no mostrarlo.
        </p>
        <div className="adm-row">
          <label>
            Correo
            <input name="contact_email" type="email" defaultValue={email} placeholder="ej.: hola@kevfilm.com" autoComplete="off" />
          </label>
          <label>
            Instagram <small>(usuario o enlace)</small>
            <input name="contact_instagram" defaultValue={instagram} placeholder="ej.: @kevfilm" autoComplete="off" />
          </label>
        </div>
        <p className="adm-hint adm-hint--tight">Otros enlaces (opcional)</p>
        {slots.map((c, i) => (
          <div key={i} className="adm-contact">
            <input name={`contact_label_${i}`} defaultValue={c?.label ?? ''} placeholder="Nombre (ej.: Vimeo)" aria-label={`Nombre del enlace ${i + 1}`} />
            <input name={`contact_value_${i}`} defaultValue={c?.value ?? ''} placeholder="Texto visible" aria-label={`Texto visible ${i + 1}`} />
            <input name={`contact_href_${i}`} defaultValue={c?.href ?? ''} placeholder="https://…" aria-label={`Enlace ${i + 1}`} />
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
