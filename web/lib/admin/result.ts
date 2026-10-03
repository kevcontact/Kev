import type { ZodError } from 'zod'

export type ActionResult = { ok: true; message?: string } | { ok: false; error: string }

export const fail = (error: string): ActionResult => ({ ok: false, error })

export const zodMessage = (e: ZodError): string =>
  e.issues.map((i) => `${i.path.join('.') || 'dato'}: ${i.message}`).join(' · ')

/** Log detallado en servidor, mensaje genérico al usuario. */
export const dbFail = (where: string, message: string): ActionResult => {
  console.error(`[kev-admin] ${where}: ${message}`)
  return fail(
    message.includes('duplicate key') ? 'Ya existe un proyecto con ese slug.' : 'No se pudo guardar. Intenta de nuevo.',
  )
}
