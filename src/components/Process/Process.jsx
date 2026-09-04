import { process } from '../../data/process'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import './Process.css'

/**
 * Process — the designer-mode counterpart to the experience timeline (spec §21).
 *
 * Four steps, Research → Concept → Exploration → Final Identity. A client
 * hiring a designer is buying a way of working, so this section is doing the
 * same job Experience does for a recruiter.
 */
export function Process() {
  return (
    <section
      className="section section-divider process"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Process"
          title="How the work happens"
          support="Every project runs through the same four steps, whether it is a full identity or a single poster."
          id="process-title"
        />

        <ol className="process__list">
          {process.map((step, index) => (
            <Reveal
              as="li"
              className="process__step"
              key={step.step}
              delay={index * 0.07}
            >
              <span className="process__index">{step.step}</span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__body">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process
