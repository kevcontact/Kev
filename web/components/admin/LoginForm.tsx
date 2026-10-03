'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabase } from '@/lib/supabase/browser'

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setBusy(true)
    setError(null)
    const { error: authError } = await createBrowserSupabase().auth.signInWithPassword({
      email: String(fd.get('email') ?? '').trim(),
      password: String(fd.get('password') ?? ''),
    })
    setBusy(false)
    if (authError) {
      setError('Correo o contraseña incorrectos.')
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="adm-form adm-form--narrow">
      <label>
        Correo
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Contraseña
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {error && <p className="adm-error" role="alert">{error}</p>}
      <button type="submit" className="adm-btn" disabled={busy}>
        {busy ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  )
}
