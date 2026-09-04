/* ==========================================================================
   FILTERS — the category taxonomy for the View More browser.

   Project `categories` arrays must use these slugs. In development, any slug
   that isn't listed here logs a warning (see data/index.js) so a typo shows
   up immediately instead of silently hiding a project from a filter.
   ========================================================================== */

export const filters = {
  developer: [
    { slug: 'all', label: 'All' },
    { slug: 'web', label: 'Web' },
    { slug: 'mobile', label: 'Mobile' },
    { slug: 'backend', label: 'Backend' },
    { slug: 'full-stack', label: 'Full Stack' },
    { slug: 'ui-ux', label: 'UI/UX' },
  ],
  designer: [
    { slug: 'all', label: 'All' },
    { slug: 'brand-identity', label: 'Brand Identity' },
    { slug: 'logo', label: 'Logo Design' },
    { slug: 'social-media', label: 'Social Media' },
    { slug: 'print', label: 'Print' },
    { slug: 'posters', label: 'Posters' },
    { slug: 'ui-design', label: 'UI Design' },
  ],
}
