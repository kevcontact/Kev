'use client'

import { PendingButton } from '@/components/admin/PendingButton'

/** Botón de envío que pide confirmación (acciones destructivas). */
export function ConfirmButton({
  message,
  children,
  className = 'adm-btn adm-btn--danger',
  pendingLabel = 'Borrando…',
  'aria-label': ariaLabel,
}: {
  message: string
  children: React.ReactNode
  className?: string
  pendingLabel?: React.ReactNode
  'aria-label'?: string
}) {
  return (
    <PendingButton className={className} confirm={message} pendingLabel={pendingLabel} aria-label={ariaLabel}>
      {children}
    </PendingButton>
  )
}
