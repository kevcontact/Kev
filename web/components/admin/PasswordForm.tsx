'use client'

import { useState } from 'react'
import { createBrowserSupabase } from '@/lib/supabase/browser'

const MIN_PASSWORD = 10

export function PasswordForm() {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const password = String(fd.get('password') ?? '')
    if (password.length < MIN_PASSWORD) return setMsg({ ok: false, text: `Mínimo ${MIN_PASSWORD} caracteres.` })
    if (password !== fd.get('confirm')) return setMsg({ ok: false, text: 'Las contraseñas no coinciden.' })

    setBusy(true)
    const { error } = await createBrowserSupabase().auth.updateUser({ password })
    setBusy(false)
    if (error) return setMsg({ ok: false, text: 'No se pudo cambiar la contraseña.' })
    form.reset()
    setMsg({ ok: true, text: 'Contraseña actualizada.' })
  }

  return (
    <form onSubmit={onSubmit} className="adm-form adm-form--narrow">
      <label>
        Nueva contraseña
        <input name="password" type="password" autoComplete="new-password" minLength={MIN_PASSWORD} required />
      </label>
      <label>
        Repetir contraseña
        <input name="confirm" type="password" autoComplete="new-password" minLength={MIN_PASSWORD} required />
      </label>
      {msg && <p className={msg.ok ? 'adm-ok' : 'adm-error'} role="status">{msg.text}</p>}
      <button type="submit" className="adm-btn" disabled={busy}>{busy ? 'Guardando…' : 'Cambiar contraseña'}</button>
    </form>
  )
}
