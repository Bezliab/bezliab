import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import './Wordmark.css'

/**
 * BEZLIAB. Type-led, with the yellow square as the only graphic element —
 * the same mark in both modes, which is the point.
 */
export function Wordmark({ to = '/', showTagline = false, size = 'md' }) {
  const content = (
    <>
      <span className="wordmark__mark" aria-hidden="true" />
      <span className="wordmark__text">
        {site.brand}
        {showTagline && (
          <span className="wordmark__tagline">{site.tagline}</span>
        )}
      </span>
    </>
  )

  if (!to) {
    return <span className={`wordmark wordmark--${size}`}>{content}</span>
  }

  return (
    <Link
      to={to}
      className={`wordmark wordmark--${size}`}
      aria-label={`${site.brand} — home`}
    >
      {content}
    </Link>
  )
}

export default Wordmark
