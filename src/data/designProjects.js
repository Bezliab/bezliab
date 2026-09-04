/* ==========================================================================
   DESIGN PROJECTS

   Deliberately a different shape to developerProjects.js — the work is
   different, so the fields are different. The modal adapts per project.type.

   Adding a project:
     1. Drop images in  public/projects/design/<id>/
     2. Add one object below
     3. Save.

   Schema
   ------
   id           string   unique, url-safe
   type         'design'      (drives which detail view the modal renders)
   title        string
   category     string   human label shown under the title
   categories   string[] filter slugs — must exist in data/filters.js
   year         string
   featured     boolean
   order        number
   size         'large' | 'wide' | 'tall' | 'standard'   grid weight (optional)
   image        string   cover
   description  string
   client       string?  or 'Personal project' / 'Concept'
   services     string[]
   tools        string[]
   deliverables string[]?
   gallery      string[] the case study images — this is the main event
   challenge    string
   solution     string
   process      { step, title, body }[]?   overrides the default 4-step process
   ========================================================================== */

export const designProjects = [
  {
    id: 'bezliab-branding',
    type: 'design',
    title: 'Brand Identity Design',
    category: 'Branding',
    categories: ['brand-identity', 'logo'],
    year: '2026',
    featured: true,
    order: 1,
    size: 'large',
    image: '/projects/design/bezliab-branding/cover.webp',
    description:
      'A complete visual identity created for a modern digital brand — mark, type system, colour rules and the social kit that carries it.',
    client: 'Personal project',
    services: [
      'Logo Design',
      'Brand Identity',
      'Typography',
      'Social Media Design',
    ],
    tools: ['Adobe Illustrator', 'Photoshop', 'Figma'],
    deliverables: [
      'Primary and secondary marks',
      'Colour system with usage ratios',
      'Type scale',
      'Social templates',
      'Brand guidelines PDF',
    ],
    gallery: [
      '/projects/design/bezliab-branding/1.webp',
      '/projects/design/bezliab-branding/2.webp',
      '/projects/design/bezliab-branding/3.webp',
      '/projects/design/bezliab-branding/4.webp',
    ],
    challenge:
      'The brand needed a visual identity that could hold two very different kinds of work — engineering and visual design — without splitting into two personalities.',
    solution:
      'I built the identity around a single deep green with one high-energy yellow held back to roughly ten percent of any surface. The green carries the structure; the yellow only ever marks the thing you should act on. That ratio is what makes the same identity read as precise in one context and expressive in another.',
  },

  {
    id: 'poster-series',
    type: 'design',
    title: 'Poster Series',
    category: 'Poster Design',
    categories: ['posters', 'print'],
    year: '2025',
    featured: true,
    order: 2,
    size: 'wide',
    image: '/projects/design/poster-series/cover.webp',
    description:
      'A set of typographic posters exploring scale, negative space and how far a grid can be pushed before it stops holding.',
    client: 'Self-initiated',
    services: ['Art Direction', 'Typography', 'Print Design'],
    tools: ['Adobe Illustrator', 'InDesign'],
    deliverables: ['Six A2 posters', 'Print-ready artwork'],
    gallery: [
      '/projects/design/poster-series/1.webp',
      '/projects/design/poster-series/2.webp',
      '/projects/design/poster-series/3.webp',
    ],
    challenge:
      'A weekly self-brief: one idea per poster, type only, no illustration to hide behind.',
    solution:
      'Each poster starts from a single sentence and removes everything that is not load-bearing. The constraint made the type do the work.',
  },

  {
    id: 'social-campaign',
    type: 'design',
    title: 'Launch Campaign',
    category: 'Social Media Design',
    categories: ['social-media', 'brand-identity'],
    year: '2025',
    featured: true,
    order: 3,
    size: 'standard',
    image: '/projects/design/social-campaign/cover.webp',
    description:
      'A three-week launch campaign: templates, motion-ready assets and a posting system the client could run without a designer.',
    client: 'Client work', // TODO(you): name the client if you have permission
    services: ['Campaign Design', 'Social Media Design', 'Art Direction'],
    tools: ['Figma', 'Photoshop', 'After Effects'],
    deliverables: [
      'Feed and story templates',
      'Motion cutdowns',
      'Caption and posting guide',
    ],
    gallery: [
      '/projects/design/social-campaign/1.webp',
      '/projects/design/social-campaign/2.webp',
      '/projects/design/social-campaign/3.webp',
    ],
    challenge:
      'The client had no designer after launch week, so anything I made had to survive being edited by someone else.',
    solution:
      'I built the campaign as a small set of locked templates with named text layers and a one-page rule sheet. Three weeks of posts came out of five components.',
  },

  /* ---- Non-featured: only inside the View More browser ---- */

  {
    id: 'logo-collection',
    type: 'design',
    title: 'Logo Collection',
    category: 'Logo Design',
    categories: ['logo', 'brand-identity'],
    year: '2024',
    featured: false,
    order: 4,
    size: 'standard',
    image: '/projects/design/logo-collection/cover.webp',
    description:
      'Selected marks from client and concept work, shown with the construction behind them.',
    client: 'Various',
    services: ['Logo Design', 'Mark Construction'],
    tools: ['Adobe Illustrator'],
    gallery: [
      '/projects/design/logo-collection/1.webp',
      '/projects/design/logo-collection/2.webp',
    ],
    challenge:
      'Marks have to survive being small, single-colour and embroidered.',
    solution:
      'Every mark here was drawn on a grid and tested at 16px before any colour was applied.',
  },

  {
    id: 'editorial-layout',
    type: 'design',
    title: 'Editorial Layout',
    category: 'Print Design',
    categories: ['print'],
    year: '2024',
    featured: false,
    order: 5,
    size: 'tall',
    image: '/projects/design/editorial-layout/cover.webp',
    description:
      'A 24-page publication layout: baseline grid, pull quotes and a type hierarchy that survives long copy.',
    client: 'Concept',
    services: ['Editorial Design', 'Typesetting'],
    tools: ['Adobe InDesign'],
    gallery: ['/projects/design/editorial-layout/1.webp'],
    challenge:
      'Long-form copy with no photography budget.',
    solution:
      'The hierarchy became the imagery — scale changes and generous margins carry the pages instead of pictures.',
  },

  {
    id: 'app-ui-concept',
    type: 'design',
    title: 'App UI Concept',
    category: 'UI Design',
    categories: ['ui-design'],
    year: '2026',
    featured: false,
    order: 6,
    size: 'standard',
    image: '/projects/design/app-ui-concept/cover.webp',
    description:
      'An interface concept designed the way I would want it handed to me as a developer: real tokens, real states, no invented components.',
    client: 'Concept',
    services: ['UI Design', 'Design System'],
    tools: ['Figma'],
    deliverables: ['Component library', 'Token sheet', 'Empty and error states'],
    gallery: [
      '/projects/design/app-ui-concept/1.webp',
      '/projects/design/app-ui-concept/2.webp',
    ],
    challenge:
      'Most concept UI ignores the states that actually take development time.',
    solution:
      'I designed the loading, empty, error and too-much-content states first, then the happy path.',
  },
]
