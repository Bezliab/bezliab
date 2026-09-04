import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { footer, site } from '../../data/site'
import { usePortfolio } from '../../context/PortfolioContext'
import Reveal from '../ui/Reveal'
import SocialLinks from '../ui/SocialLinks'
import './Footer.css'

/**
 * Footer — the closing invitation, plus the cross-link to the other portfolio.
 *
 * That cross-link matters: someone who reached the bottom of the developer
 * side has read everything there is to read on it, and the single most useful
 * thing to offer them next is the other half of the same person.
 */
export function Footer() {
  const { otherMode } = usePortfolio()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="footer__top">
          <div className="footer__headline">
            <p className="footer__eyebrow">{footer.headline}</p>
            <h2 className="footer__title">{footer.support}</h2>
          </div>

          <div className="footer__actions">
            <a
              className="btn btn--highlight"
              href={`mailto:${site.contact.email}`}
            >
              {site.contact.email}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <SocialLinks variant="icons" />
          </div>
        </Reveal>

        <div className="footer__switch">
          <span className="footer__switch-label">Also</span>
          <Link className="footer__switch-link" to={otherMode.path}>
            See the {otherMode.label.toLowerCase()} side
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.owner}
          </p>
          <p>{site.role}</p>
          <p>{footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
