import { site } from '../../data/site'
import { usePortfolio } from '../../context/PortfolioContext'
import Reveal from '../ui/Reveal'
import './About.css'

/**
 * About — two columns and a stats row (spec §16).
 *
 * Left column carries the statement, right carries the prose, and the stats
 * sit under both on a hairline rule. The numbers come from data/site.js and
 * are deliberately conservative: an invented "50+ happy clients" is the
 * fastest way to lose a recruiter's trust.
 */
export function About() {
  const { config } = usePortfolio()
  const { about } = config

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about__grid">
          <Reveal className="about__lead">
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 className="about__statement" id="about-title">
              {about.statement}
            </h2>
          </Reveal>

          <Reveal className="about__body" delay={0.08}>
            {about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}

            <dl className="about__meta">
              <div>
                <dt>Based in</dt>
                <dd>{site.contact.location}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{config.navLabel}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {about.stats?.length > 0 && (
          <Reveal className="about__stats" delay={0.12}>
            {about.stats.map((stat) => (
              <div className="about__stat" key={stat.label}>
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}

export default About
