import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Menu } from 'lucide-react'
import { navSections } from '../../data/site'
import { usePortfolio } from '../../context/PortfolioContext'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import Wordmark from '../ui/Wordmark'
import ModeSwitch from './ModeSwitch'
import MobileMenu from './MobileMenu'
import './Navbar.css'

/**
 * Sticky navigation, shared by both modes.
 *
 * Transparent over the hero, then a blurred background once the page moves
 * (spec §14). The mode switch is never hidden at any breakpoint — the section
 * links collapse into the menu first, because being able to switch portfolios
 * matters more on a phone than a shortcut to "Experience".
 */
export function Navbar() {
  const { mode } = usePortfolio()
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)

  const sections = navSections[mode] ?? []
  const ids = useMemo(() => sections.map((section) => section.id), [sections])
  const active = useActiveSection(ids)

  /* Close the menu if the viewport grows past the mobile breakpoint while
     it's open — otherwise the page stays scroll-locked behind a hidden panel. */
  useEffect(() => {
    if (!open) return undefined
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = (event) => event.matches && setOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [open])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav__inner">
        <div className="nav__left">
          <Wordmark to="/" />
        </div>

        <div className="nav__center">
          <ModeSwitch />
        </div>

        <div className="nav__right">
          <nav className="nav__sections" aria-label="Sections">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="nav__link"
                data-active={active === section.id || undefined}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <a className="btn btn--primary btn--sm nav__cta" href="#contact">
            Let&apos;s Talk
            <ArrowRight size={15} aria-hidden="true" />
          </a>

          <button
            type="button"
            className="nav__burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        sections={sections}
        active={active}
      />
    </header>
  )
}

export default Navbar
