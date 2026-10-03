'use client'

import { useFormStatus } from 'react-dom'

type PendingButtonProps = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  /** lo que se lee mientras el servidor responde (por defecto, el mismo texto atenuado) */
  pendingLabel?: React.ReactNode
  'aria-label'?: string
  /** pide confirmación antes de enviar (acciones destructivas) */
  confirm?: string
}

/** Botón de envío de un <form action> que se bloquea y avisa mientras guarda:
 *  sin esto el clic no da señal y parece que el botón no sirve. */
export function PendingButton({
  children,
  className = 'adm-btn',
  disabled = false,
  pendingLabel,
  confirm,
  ...rest
}: PendingButtonProps) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className={className}
      disabled={disabled || pending}
      aria-busy={pending}
      aria-label={rest['aria-label']}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault()
      }}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  )
}
