/**
 * Da acceso al panel /admin a un correo (crea el usuario si no existe).
 *
 *   SUPABASE_SERVICE_ROLE_KEY=… npx tsx scripts/create-admin.ts productor@correo.com
 *
 * La service role key se pasa solo por entorno en esta ejecución; nunca se guarda.
 * auth.users es compartido con BistronomIA: el acceso a KEV lo da kev.admins, no el login.
 */
import { randomBytes } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://zsgriabdirrslpdxwlbd.supabase.co'
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

async function main() {
  const email = z.email().parse(process.argv[2]?.trim().toLowerCase())
  if (!KEY) throw new Error('Falta SUPABASE_SERVICE_ROLE_KEY en el entorno')

  const admin = createClient(URL, KEY, { auth: { persistSession: false } })
  const password = randomBytes(12).toString('base64url')

  const created = await admin.auth.admin.createUser({ email, password, email_confirm: true })
  let userId = created.data.user?.id
  let newUser = true
  if (created.error) {
    // ya existe: se busca y se conserva su contraseña actual
    const { data, error } = await admin.auth.admin.listUsers({ perPage: 1000 })
    if (error) throw error
    userId = data.users.find((u) => u.email?.toLowerCase() === email)?.id
    newUser = false
    if (!userId) throw created.error
  }

  const { error } = await admin
    .schema('kev')
    .from('admins')
    .upsert({ user_id: userId, email }, { onConflict: 'user_id' })
  if (error) throw error

  console.log(`✓ ${email} es admin de KEV`)
  if (newUser) console.log(`  contraseña inicial (compártela por un canal privado): ${password}`)
}

main().catch((e) => {
  console.error('✕', e instanceof Error ? e.message : e)
  process.exit(1)
})
