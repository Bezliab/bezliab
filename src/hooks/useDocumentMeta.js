import { useEffect } from 'react'

function setMeta(selector, attribute, value) {
  const element = document.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

/**
 * Per-mode metadata. The reason /developer and /designer are real routes and
 * not client-side state on / is precisely so these can differ — a recruiter
 * and a design client should be able to share different links.
 */
export function useDocumentMeta({ title, description, path }) {
  useEffect(() => {
    if (title) {
      document.title = title
      setMeta('meta[property="og:title"]', 'content', title)
    }

    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }

    if (path) {
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        canonical.setAttribute('href', `${window.location.origin}${path}`)
      }
    }
  }, [title, description, path])
}
