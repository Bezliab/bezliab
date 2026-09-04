import { designTools } from '../../data/designCapabilities'
import { getSkills } from '../../data'
import { usePortfolio } from '../../context/PortfolioContext'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import './Skills.css'

/**
 * Capabilities — grouped lists, never progress bars (spec §17).
 *
 * The two modes need genuinely different shapes here, so this is the one
 * section that branches on content rather than on tokens alone:
 *
 *   developer → what I reach for, grouped by where it sits in a system
 *   designer  → what you can hire me to do, a sentence each, plus the tools
 */
export function Skills() {
  const { mode, config } = usePortfolio()
  const groups = getSkills(mode)

  return (
    <section
      className="section section--surface skills"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow={config.skills.eyebrow}
          title={config.skills.title}
          support={config.skills.support}
          id="skills-title"
        />

        {mode === 'developer' ? (
          <div className="skills__grid">
            {groups.map((group, index) => (
              <Reveal
                className="skill-group"
                key={group.group}
                delay={index * 0.05}
              >
                <h3 className="skill-group__title">{group.group}</h3>
                <ul className="skill-group__list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        ) : (
          <>
            <div className="capabilities">
              {groups.map((group, index) => (
                <Reveal
                  className="capability"
                  key={group.group}
                  delay={index * 0.06}
                >
                  <span className="capability__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="capability__content">
                    <h3 className="capability__title">{group.title}</h3>
                    <p className="capability__body">{group.body}</p>
                    <ul className="capability__items">
                      {group.items.map((item) => (
                        <li className="tag" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="skills__tools" delay={0.1}>
              {designTools.map((group) => (
                <div className="skills__tool-group" key={group.group}>
                  <span className="skills__tool-label">{group.group}</span>
                  <ul className="skills__tool-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </>
        )}
      </div>
    </section>
  )
}

export default Skills
