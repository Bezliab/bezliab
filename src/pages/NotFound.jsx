import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { modeList, site } from '../data/site'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import Wordmark from '../components/ui/Wordmark'
import './NotFound.css'

/**
 * 404 — on the landing page's dark ground, so a bad link still lands
 * somewhere that looks like the brand rather than a browser error.
 */
export function NotFound() {
  useDocumentMeta({
    title: `Page not found — ${site.owner}`,
    description: site.landing.support,
  })

  return (
    <div className="notfound">
      <Wordmark to="/" showTagline />

      <div className="notfound__body">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">That page doesn’t exist.</h1>
        <p className="notfound__support">
          It may have moved, or the link may have been mistyped. Both portfolios
          are one click away.
        </p>

        <div className="notfound__actions">
          {modeList.map((mode) => (
            <Link className="btn btn--inverse" to={mode.path} key={mode.key}>
              {mode.label}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ))}
          <Link className="btn btn--highlight" to="/">
            Start over
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
