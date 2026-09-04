import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { getFeaturedProjects } from '../../data'
import ProjectMedia from './ProjectMedia'
import './Collage.css'

/**
 * The designer hero visual — an editorial collage of real work.
 *
 * The developer hero shows a product surface; this shows artwork. Same
 * restraint, different personality: two staggered columns that drift gently
 * in opposite directions as the page scrolls, plus one brand artefact
 * (type specimen + palette chips) so the collage says something about the
 * work rather than just filling space.
 *
 * Fully data-driven: it renders whatever the first three featured design
 * projects are. Reorder them in designProjects.js and this reorders too.
 */

/* ratio per slot, so the collage keeps its shape whatever the images are */
const SLOTS = ['4 / 5', '1 / 1', '4 / 3']

export function Collage() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const spring = { stiffness: 60, damping: 20, restDelta: 0.4 }
  const driftUp = useSpring(useTransform(scrollYProgress, [0, 1], [30, -40]), spring)
  const driftDown = useSpring(useTransform(scrollYProgress, [0, 1], [-16, 26]), spring)

  const projects = getFeaturedProjects('designer').slice(0, 3)
  const [first, second, third] = projects

  const style = (value) => (reduceMotion ? undefined : { y: value })

  return (
    <div className="collage" ref={ref}>
      <motion.div className="collage__col collage__col--lead" style={style(driftUp)}>
        {first && (
          <figure className="collage__frame collage__frame--tall">
            <ProjectMedia
              src={first.image}
              alt={first.title}
              ratio={SLOTS[0]}
              priority
              sizes="(max-width: 900px) 55vw, 30vw"
            />
          </figure>
        )}

        {third && (
          <figure className="collage__frame">
            <ProjectMedia
              src={third.image}
              alt={third.title}
              ratio={SLOTS[2]}
              sizes="(max-width: 900px) 55vw, 30vw"
            />
          </figure>
        )}
      </motion.div>

      <motion.div className="collage__col collage__col--trail" style={style(driftDown)}>
        {/* brand artefact — the one place yellow leads */}
        <div className="collage__specimen" aria-hidden="true">
          <span className="collage__specimen-glyph">Aa</span>
          <span className="collage__specimen-meta">Bricolage · Manrope</span>
          <span className="collage__swatches">
            <i className="collage__swatch collage__swatch--green" />
            <i className="collage__swatch collage__swatch--yellow" />
            <i className="collage__swatch collage__swatch--paper" />
          </span>
        </div>

        {second && (
          <figure className="collage__frame">
            <ProjectMedia
              src={second.image}
              alt={second.title}
              ratio={SLOTS[1]}
              priority
              sizes="(max-width: 900px) 40vw, 22vw"
            />
          </figure>
        )}
      </motion.div>
    </div>
  )
}

export default Collage
