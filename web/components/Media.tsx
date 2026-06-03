import { mediaUrl } from '@/lib/media'
import type { MediaItem } from '@/lib/data'

/**
 * A real photograph or muted looping video inside the editorial `.frame`
 * (square corners, faint film grain). Replaces the kit's tonal placeholder.
 */
export function Media({
  item,
  alt = '',
  className = '',
  style,
  children,
  loading = 'lazy',
}: {
  item: MediaItem
  alt?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  loading?: 'lazy' | 'eager'
}) {
  return (
    <div
      className={'frame ' + (item.type === 'video' ? 'frame--dark ' : '') + className}
      style={{ aspectRatio: `${item.w} / ${item.h}`, ...style }}
    >
      {item.type === 'video' ? (
        <video
          src={mediaUrl(item.src)}
          poster={item.poster ? mediaUrl(item.poster) : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={mediaUrl(item.src)}
          alt={alt}
          width={item.w}
          height={item.h}
          loading={loading}
        />
      )}
      {children}
    </div>
  )
}
