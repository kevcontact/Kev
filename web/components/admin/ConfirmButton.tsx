'use client'

/** Botón de envío que pide confirmación (acciones destructivas). */
export function ConfirmButton({
  message,
  children,
  className = 'adm-btn adm-btn--danger',
}: {
  message: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault()
      }}
    >
      {children}
    </button>
  )
}
