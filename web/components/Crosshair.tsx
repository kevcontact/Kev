/**
 * Hairline viewfinder crosshair with a micro "Kev." at the intersection.
 * Pure CSS overlay; lives over full-bleed fields only. The draw-in is driven
 * by `.kev-app.is-ready` (set by AppShell), so no client JS is needed here.
 */
export function Crosshair({
  tone = 'dark',
  label = 'Kev.',
}: {
  tone?: 'dark' | 'paper'
  label?: string
}) {
  return (
    <div
      className={'kev-crosshair' + (tone === 'paper' ? ' kev-crosshair--paper' : '')}
      aria-hidden="true"
    >
      <span className="kev-crosshair__v" />
      <span className="kev-crosshair__h" />
      <span className="kev-crosshair__mark">{label}</span>
    </div>
  )
}
