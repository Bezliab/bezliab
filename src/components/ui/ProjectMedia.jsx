import { useState } from 'react'
import './ProjectMedia.css'

/* Deterministic variant per project so a card always gets the same
   placeholder treatment between reloads. */
function hash(value = '') {
  let total = 0
  for (let i = 0; i < value.length; i += 1) {
    total = (total + value.charCodeAt(i) * (i + 7)) % 997
  }
  return total
}

function initials(title = '') {
  return (
    title
      .replace(/[^a-zA-Z0-9 ]/g, '')
      // split CamelCase too, so "CareNest" gives CN rather than a lone C —
      // otherwise every project whose name starts with the same letter draws
      // the same cover while you are still exporting artwork
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('') || 'BZ'
  )
}

/**
 * Project imagery with a designed fallback.
 *
 * Portfolios are image-heavy, and a portfolio that renders broken image icons
 * while you are still exporting artwork looks worse than one with no images at
 * all. If the file is missing or fails to decode, this draws a branded cover
 * from the project's own title instead — so the layout is always intact and
 * dropping the real .webp in later needs no code change.
 */
export function ProjectMedia({
  src,
  alt,
  ratio = '16 / 10',
  priority = false,
  className = '',
  sizes,
}) {
  const [state, setState] = useState(src ? 'loading' : 'failed')

  const variant = hash(alt ?? src ?? '') % 4
  const showFallback = state === 'failed'

  return (
    <div
      className={`media media--v${variant} ${
        showFallback ? 'is-fallback' : ''
      } ${state === 'loaded' ? 'is-loaded' : ''} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {!showFallback && (
        <img
          className="media__img"
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          draggable="false"
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
        />
      )}

      {showFallback && (
        <div className="media__fallback" role="img" aria-label={alt}>
          <span className="media__initials" aria-hidden="true">
            {initials(alt)}
          </span>
          <span className="media__caption" aria-hidden="true">
            {alt}
          </span>
        </div>
      )}
    </div>
  )
}

export default ProjectMedia
