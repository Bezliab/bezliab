import { motion, useReducedMotion } from 'framer-motion'
import About from '../components/About/About'
import Contact from '../components/Contact/Contact'
import Experience from '../components/Experience/Experience'
import Footer from '../components/Footer/Footer'
import Hero from '../components/Hero/Hero'
import Navbar from '../components/Navbar/Navbar'
import Process from '../components/Process/Process'
import Skills from '../components/Skills/Skills'
import Work from '../components/Projects/Work'
import { usePortfolio } from '../context/PortfolioContext'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

/* The third section is the one place the two modes genuinely diverge in
   structure: a recruiter wants work history, a design client wants process. */
const THIRD_SECTIONS = {
  experience: Experience,
  process: Process,
}

/**
 * One page, rendered for both /developer and /designer.
 *
 * This is the payoff of putting everything in data/site.js: the difference
 * between the two portfolios is a config object and a set of CSS custom
 * properties, not a second implementation. Adding a third discipline later
 * would be a new entry in `modes` — not a new page.
 */
export function PortfolioPage() {
  const { mode, config } = usePortfolio()
  const reduceMotion = useReducedMotion()

  useDocumentMeta({
    title: config.seo.title,
    description: config.seo.description,
    path: config.path,
  })

  const Third = THIRD_SECTIONS[config.thirdSection] ?? null

  const content = (
    <main id="main">
      <Hero />
      <About />
      <Work />
      <Skills />
      {Third && <Third />}
      <Contact />
    </main>
  )

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      {/* the mode switch reads as a crossfade rather than a page load */}
      {reduceMotion ? (
        content
      ) : (
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {content}
        </motion.div>
      )}

      <Footer />
    </>
  )
}

export default PortfolioPage
