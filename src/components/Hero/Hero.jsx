import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { site } from '../../data/site'
import { usePortfolio } from '../../context/PortfolioContext'
import BrowserMock from '../ui/BrowserMock'
import Collage from '../ui/Collage'
import './Hero.css'

/* the two hero visuals, keyed by the `visual` field in site.js */
const VISUALS = {
  browser: BrowserMock,
  collage: Collage,
}

/**
 * The hero, for both modes.
 *
 * There is one component because the structure is identical — eyebrow,
 * headline, support, two CTAs, a quiet tool row, one visual. What changes is
 * the copy (from `modes[mode].hero`), the visual, and the type/colour
 * treatment, which comes entirely from the mode's tokens. That's how the two
 * portfolios end up with different personalities without becoming two
 * different websites.
 */
export function Hero() {
  const { config, mode } = usePortfolio()
  const { hero } = config
  const Visual = VISUALS[hero.visual] ?? null

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__top anim-fade-up">
            <p className="eyebrow">{hero.eyebrow}</p>
            {site.contact.availability && (
              <span className="hero__status">
                <i aria-hidden="true" />
                {site.contact.availability}
              </span>
            )}
          </div>

          <h1 className="hero__title anim-fade-up anim-delay-1" id="hero-title">
            {hero.headline}
          </h1>

          <p className="lead hero__support anim-fade-up anim-delay-2">
            {hero.support}
          </p>

          <div className="hero__actions anim-fade-up anim-delay-3">
            <a className="btn btn--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          {hero.stack?.length > 0 && (
            <div className="hero__stack anim-fade-up anim-delay-4">
              <span className="hero__stack-label">
                {mode === 'developer' ? 'Working with' : 'Tools'}
              </span>
              <ul className="hero__stack-list">
                {hero.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {Visual && (
          <div className="hero__visual anim-fade-in anim-delay-3">
            <Visual />
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
