import 'server-only'
import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase/server'

export type AdminContext = {
  supabase: Awaited<ReturnType<typeof createSessionClient>>
  userId: string
  email: string
}

/**
 * Exige sesión Y pertenencia a kev.admins. auth.users es compartido con BistronomIA:
 * estar logueado no basta. RLS vuelve a comprobarlo en cada escritura.
 */
export async function requireAdmin(): Promise<AdminContext> {
  const supabase = await createSessionClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data, error } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()
  if (error) throw new Error(`kev.admins: ${error.message}`)
  if (!data) redirect('/admin/login?e=forbidden')

  return { supabase, userId: user.id, email: user.email ?? '' }
}
