import {
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react'
import { site } from '../../data/site'
import './SocialLinks.css'

/* Behance has no Lucide equivalent, so the mark is drawn here. */
function BehanceIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 5h5.2a3 3 0 0 1 0 6H3V5Z" />
      <path d="M3 11h5.8a3.2 3.2 0 0 1 0 6.4H3V11Z" />
      <path d="M14.6 13.8h6.4a3.2 3.2 0 0 0-6.4 0v.6a3.2 3.2 0 0 0 5.7 2" />
    </svg>
  )
}

const icons = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  behance: BehanceIcon,
  whatsapp: MessageCircle,
}

/**
 * Renders whatever is in site.socials — delete an entry in the data file and
 * it disappears from the footer and the contact section together.
 */
export function SocialLinks({
  variant = 'row',
  size = 18,
  showLabels = true,
  className = '',
}) {
  return (
    <ul className={`socials socials--${variant} ${className}`}>
      {site.socials.map((social) => {
        const Icon = icons[social.icon] ?? ExternalLink
        const isMail = social.href.startsWith('mailto:')

        return (
          <li key={social.label}>
            <a
              className="socials__link"
              href={social.href}
              {...(isMail
                ? {}
                : { target: '_blank', rel: 'noreferrer noopener' })}
            >
              <Icon size={size} aria-hidden="true" />
              {showLabels && (
                <span className="socials__label">{social.label}</span>
              )}
              {!showLabels && (
                <span className="visually-hidden">{social.label}</span>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks
