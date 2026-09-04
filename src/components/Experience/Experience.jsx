import { ExternalLink } from 'lucide-react'
import { certificates } from '../../data/certificates'
import { experience } from '../../data/experience'
import { usePortfolio } from '../../context/PortfolioContext'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import './Experience.css'

/**
 * Experience — a vertical timeline (spec §18).
 *
 * Developer mode only; designer mode shows Process in this slot instead,
 * because "where I worked" is the wrong question to ask of design work.
 *
 * The certifications block below only exists when data/certificates.js has
 * something in it — an empty "Certifications" heading is worse than none.
 */
export function Experience() {
  const { config } = usePortfolio()

  return (
    <section
      className="section experience"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          support={`${config.navLabel} · most recent first`}
          id="experience-title"
        />

        <ol className="timeline">
          {experience.map((item, index) => (
            <Reveal as="li" className="timeline__item" key={item.id} delay={index * 0.05}>
              <div className="timeline__marker" aria-hidden="true">
                <span className="timeline__dot" />
              </div>

              <div className="timeline__content">
                <p className="timeline__period">{item.period}</p>

                <h3 className="timeline__role">
                  {item.role}
                  <span className="timeline__company"> · {item.company}</span>
                </h3>

                <p className="timeline__meta">
                  {[item.type, item.location].filter(Boolean).join(' · ')}
                </p>

                <p className="timeline__body">{item.body}</p>

                {item.highlights?.length > 0 && (
                  <ul className="timeline__highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}

                {item.stack?.length > 0 && (
                  <ul className="tag-list timeline__stack">
                    {item.stack.map((tech) => (
                      <li className="tag" key={tech}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        {certificates.length > 0 && (
          <Reveal className="certificates">
            <h3 className="certificates__title">Certifications</h3>
            <ul className="certificates__list">
              {certificates.map((cert) => (
                <li className="certificate" key={cert.id}>
                  <div>
                    <p className="certificate__name">{cert.title}</p>
                    <p className="certificate__issuer">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                  {cert.url && (
                    <a
                      className="certificate__link"
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`View ${cert.title} credential`}
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export default Experience
