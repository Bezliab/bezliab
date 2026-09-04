import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { site } from '../../data/site'
import { usePortfolio } from '../../context/PortfolioContext'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SocialLinks from '../ui/SocialLinks'
import './Contact.css'

/* The "What can I help you with?" options (spec §26). The default is
   whichever portfolio the visitor is currently reading. */
const TOPICS = [
  { value: 'development', label: 'Software development' },
  { value: 'design', label: 'Graphic design / branding' },
  { value: 'both', label: 'Design and development' },
  { value: 'other', label: 'Something else' },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Contact — a short form and the direct links.
 *
 * There is no backend, so submitting composes a pre-filled email and hands it
 * to the visitor's mail client. That keeps the site a static deploy with no
 * secrets and nothing to maintain, and it never silently swallows a message
 * the way a form posting to nowhere does.
 *
 * TODO(you): to collect submissions instead, either
 *   - point `action` at a form service (Formspree, Basin, Netlify Forms), or
 *   - replace `handleSubmit` with a fetch POST to your own endpoint.
 * The markup, validation and states below work either way.
 */
export function Contact() {
  const { mode, config } = usePortfolio()

  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: mode === 'designer' ? 'design' : 'development',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSent(false)
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Please add your name.'
    if (!EMAIL_PATTERN.test(form.email.trim()))
      next.email = 'Please add a valid email address.'
    if (form.message.trim().length < 10)
      next.message = 'A sentence or two is plenty — just not empty.'
    return next
  }

  function handleSubmit(event) {
    event.preventDefault()

    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const topic = TOPICS.find((item) => item.value === form.topic)?.label ?? ''
    const subject = `${topic} enquiry — ${form.name.trim()}`
    const body = `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
  }

  return (
    <section
      className="section section-divider contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title={
            mode === 'designer'
              ? 'Let’s make something worth looking at.'
              : 'Let’s build something that works.'
          }
          support={config.hero.secondaryCta.label + ' — the form or the inbox, either is fine.'}
          id="contact-title"
        />

        <div className="contact__grid">
          <Reveal className="contact__form-wrap">
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="field__error" id="contact-name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? 'contact-email-error' : undefined
                  }
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="field__error" id="contact-email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-topic">What can I help you with?</label>
                <select
                  id="contact-topic"
                  name="topic"
                  value={form.topic}
                  onChange={(event) => update('topic', event.target.value)}
                >
                  {TOPICS.map((topic) => (
                    <option value={topic.value} key={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(event) => update('message', event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : undefined
                  }
                  placeholder="What are you working on?"
                />
                {errors.message && (
                  <p className="field__error" id="contact-message-error">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="contact__submit">
                <button type="submit" className="btn btn--primary">
                  Send message
                  <ArrowRight size={17} aria-hidden="true" />
                </button>

                <p className="contact__status" role="status">
                  {sent ? (
                    <>
                      <Check size={14} aria-hidden="true" />
                      Your mail app should be open with this ready to send.
                    </>
                  ) : (
                    site.contact.responseTime
                  )}
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal className="contact__direct" delay={0.08}>
            <div className="contact__block">
              <h3 className="contact__block-title">Email</h3>
              <a className="contact__email" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </div>

            <div className="contact__block">
              <h3 className="contact__block-title">Elsewhere</h3>
              <SocialLinks variant="stack" />
            </div>

            <div className="contact__block">
              <h3 className="contact__block-title">Based in</h3>
              <p className="contact__note">{site.contact.location}</p>
              <p className="contact__note contact__note--accent">
                {site.contact.availability}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
