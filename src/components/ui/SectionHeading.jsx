import Reveal from './Reveal'
import './SectionHeading.css'

/**
 * Every section opens the same way: eyebrow, statement, optional support line,
 * optional action on the right. Shared between both modes — this is a lot of
 * why the two experiences read as one site.
 */
export function SectionHeading({
  eyebrow,
  title,
  support,
  action,
  align = 'start',
  id,
}) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      <div className="section-heading__text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && (
          <h2 className="section-heading__title" id={id}>
            {title}
          </h2>
        )}
        {support && <p className="lead section-heading__support">{support}</p>}
      </div>
      {action && <div className="section-heading__action">{action}</div>}
    </Reveal>
  )
}

export default SectionHeading
