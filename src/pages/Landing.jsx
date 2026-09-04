import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { modeList, modes, site } from '../data/site'
import { usePortfolio } from '../context/PortfolioContext'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import SocialLinks from '../components/ui/SocialLinks'
import Wordmark from '../components/ui/Wordmark'
import './Landing.css'

const QUICK_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

/**
 * The landing page — the shared brand entrance (spec §2, §3).
 *
 * One personal brand, two doors. Nothing here belongs to either discipline:
 * the wordmark, the statement and the type are the same whichever side you
 * pick, which is what stops the site reading as two portfolios in a trench
 * coat.
 *
 * Hovering one door expands it and lets the other recede. That is the whole
 * interaction — no page transition, no loader, no reveal animation.
 *
 * The top-right links point into whichever side the visitor last read
 * (developer by default), because those sections don't exist on this page.
 */
export function Landing() {
  const { lastMode } = usePortfolio()
  const [hovered, setHovered] = useState(null)

  useDocumentMeta({
    title: `${site.owner} — ${site.role}`,
    description: site.landing.support,
    path: '/',
  })

  const lastPath = modes[lastMode]?.path ?? '/developer'

  return (
    <div className="landing">
      <header className="landing__bar">
        <Wordmark to={null} showTagline />

        <nav className="landing__nav" aria-label="Jump into the portfolio">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.id}
              to={`${lastPath}#${link.id}`}
              className="landing__nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="landing__main" id="main">
        <div className="landing__intro">
          <h1 className="landing__headline">
            {site.landing.headline.map((line, index) => (
              <span
                className={`landing__line anim-fade-up anim-delay-${index + 1}`}
                key={line}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="landing__support anim-fade-up anim-delay-4">
            {site.landing.support}
          </p>
        </div>

        <div
          className="landing__choices"
          data-hovered={hovered ?? undefined}
          onMouseLeave={() => setHovered(null)}
        >
          {modeList.map((mode, index) => (
            <Link
              key={mode.key}
              to={mode.path}
              className="choice anim-fade-up anim-delay-5"
              data-mode-key={mode.key}
              data-state={
                hovered ? (hovered === mode.key ? 'active' : 'muted') : undefined
              }
              onMouseEnter={() => setHovered(mode.key)}
              onFocus={() => setHovered(mode.key)}
              onBlur={() => setHovered(null)}
            >
              <span className="choice__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* h2 rather than a span: these two are the page's only
                  destinations, so they should appear when someone navigates
                  this page by headings. */}
              <div className="choice__body">
                <h2 className="choice__title">{mode.cardTitle}</h2>
                <span className="choice__blurb">{mode.cardBlurb}</span>
              </div>

              <span className="choice__action">
                {mode.cardAction}
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="landing__foot">
        <p className="landing__copy">
          © {new Date().getFullYear()} {site.owner}
        </p>
        <SocialLinks variant="icons" />
      </footer>
    </div>
  )
}

export default Landing
