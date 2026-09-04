/* ==========================================================================
   DEVELOPER PROJECTS

   Adding a project:
     1. Drop images in  public/projects/<id>/
     2. Add one object below
     3. Save. Done — no component, grid, modal or CSS to touch.

   Schema
   ------
   id           string   unique, url-safe, matches the public/projects folder
   type         'development'   (drives which detail view the modal renders)
   title        string
   category     string   human label shown under the title
   categories   string[] filter slugs — must exist in data/filters.js
   year         string
   featured     boolean  true = appears on the homepage grid
   order        number    lower sorts first
   image        string   cover, 16:10 works best
   description  string   one or two sentences, used on cards
   technologies string[]
   role         string
   challenge    string
   solution     string
   features     string[]
   architecture string?  optional short note on how it is put together
   gallery      string[]? optional extra screenshots in the detail view
   liveUrl      string?  omit or leave null to hide the button
   githubUrl    string?  omit or leave null to hide the button
   status       string?  e.g. 'In progress' — renders as a small badge
   ========================================================================== */

export const developerProjects = [
  {
    id: 'campusconnect',
    type: 'development',
    title: 'CampusConnect',
    category: 'Full Stack Application',
    categories: ['web', 'full-stack'],
    year: '2026',
    featured: true,
    order: 1,
    image: '/projects/campusconnect/cover.webp',
    description:
      'A platform designed to connect students with campus services, resources and communities in one place.',
    technologies: ['React', 'TypeScript', 'ASP.NET Core', 'PostgreSQL'],
    role: 'Full Stack Developer',
    challenge:
      'Campus information was scattered across notice boards, group chats and half-maintained departmental pages. Students had no single place to find services, and the people running those services had no way to reach students directly.',
    solution:
      'I designed and built a single platform where every service has an owner, a profile and a direct line to students. Role-based accounts separate students from service administrators, and everything is searchable from one field.',
    features: [
      'Authentication and role-based access',
      'Student and service profiles',
      'Direct messaging',
      'Unified search across services',
      'Notifications',
    ],
    architecture:
      'React SPA against an ASP.NET Core REST API, PostgreSQL for persistence, token auth with refresh rotation.',
    gallery: [
      '/projects/campusconnect/dashboard.webp',
      '/projects/campusconnect/messaging.webp',
      '/projects/campusconnect/search.webp',
    ],
    liveUrl: null, // TODO(you)
    githubUrl: null, // TODO(you)
  },

  {
    id: 'carenest',
    type: 'development',
    title: 'CareNest',
    category: 'Mobile Application',
    categories: ['mobile', 'full-stack'],
    year: '2025',
    featured: true,
    order: 2,
    image: '/projects/carenest/cover.webp',
    description:
      'A maternal health application that helps expectant mothers track appointments, symptoms and milestones.',
    technologies: ['Flutter', 'Dart', 'Node.js', 'MongoDB'],
    role: 'Mobile & Backend Developer',
    challenge:
      'Maternal health guidance is time-sensitive and easy to lose track of. Paper cards get lost, and generic reminder apps know nothing about where someone is in a pregnancy.',
    solution:
      'A mobile app built around the pregnancy timeline: content, reminders and check-ins change as the weeks progress, and everything works offline because connectivity cannot be assumed.',
    features: [
      'Week-by-week guidance',
      'Appointment and medication reminders',
      'Symptom logging with history',
      'Offline-first sync',
    ],
    architecture:
      'Flutter client with a local store as the source of truth, syncing to a Node.js API when a connection is available.',
    gallery: [
      '/projects/carenest/timeline.webp',
      '/projects/carenest/log.webp',
    ],
    liveUrl: null, // TODO(you)
    githubUrl: null, // TODO(you)
  },

  {
    id: 'bezliab-portfolio',
    type: 'development',
    title: 'This Website',
    category: 'Design System & Front End',
    categories: ['web', 'ui-ux'],
    year: '2026',
    featured: true,
    order: 3,
    image: '/projects/bezliab-portfolio/cover.webp',
    description:
      'A dual-profession personal site: two portfolio experiences, one brand, one shared component system.',
    technologies: ['React', 'Vite', 'CSS', 'Framer Motion'],
    role: 'Design & Development',
    challenge:
      'I needed to present two professions without looking like two unrelated people, and without maintaining two codebases.',
    solution:
      'One component system driven by a mode token. Developer and designer routes share the neutrals, type scale, navigation and footer; only the accent, display scale and layout rhythm change. Every project is a data object, so publishing new work never touches a component.',
    features: [
      'Route-level modes at /developer and /designer',
      'Data-driven projects with featured and order flags',
      'Filterable full-screen project browser',
      'Adaptive detail modal per project type',
      'Keyboard-accessible modals with focus trapping',
    ],
    architecture:
      'React + Vite, plain CSS custom properties for theming, no CSS framework.',
    liveUrl: null, // TODO(you): your deployed URL
    githubUrl: null, // TODO(you)
  },

  /* ---- Non-featured: these only appear inside the View More browser ---- */

  {
    id: 'api-gateway-service',
    type: 'development',
    title: 'Service Gateway',
    category: 'Backend Service',
    categories: ['backend'],
    year: '2025',
    featured: false,
    order: 4,
    image: '/projects/api-gateway-service/cover.webp',
    description:
      'A gateway that fronts several internal services with one authentication layer, rate limiting and request logging.',
    technologies: ['Node.js', 'Express', 'Redis', 'Docker'],
    role: 'Backend Developer',
    challenge:
      'Each internal service had reimplemented its own auth check, and none of them agreed on error shapes.',
    solution:
      'A single entry point that validates tokens once, normalises error responses and gives every request a traceable id.',
    features: [
      'Centralised token validation',
      'Per-client rate limiting',
      'Normalised error contract',
      'Request tracing',
    ],
    liveUrl: null,
    githubUrl: null,
  },

  {
    id: 'inventory-dashboard',
    type: 'development',
    title: 'Inventory Dashboard',
    category: 'Web Application',
    categories: ['web', 'ui-ux'],
    year: '2025',
    featured: false,
    order: 5,
    image: '/projects/inventory-dashboard/cover.webp',
    description:
      'A stock and reorder dashboard for a small retail operation, built to be readable at a glance on a shop counter.',
    technologies: ['React', 'TypeScript', 'PostgreSQL'],
    role: 'Full Stack Developer',
    challenge:
      'Stock was tracked in a spreadsheet that only one person understood, and reorder decisions were made from memory.',
    solution:
      'A dashboard with three numbers that matter at the top and an explicit reorder queue, designed for a wide screen at arm’s length.',
    features: [
      'Live stock levels',
      'Reorder threshold alerts',
      'Supplier records',
      'CSV export',
    ],
    liveUrl: null,
    githubUrl: null,
  },

  {
    id: 'schedule-app',
    type: 'development',
    title: 'Shift Scheduler',
    category: 'Mobile Application',
    categories: ['mobile'],
    year: '2024',
    featured: false,
    order: 6,
    image: '/projects/schedule-app/cover.webp',
    description:
      'A shift planner for small teams, with swap requests and a calendar that fits on a phone.',
    technologies: ['React Native', 'TypeScript', 'Firebase'],
    role: 'Mobile Developer',
    challenge:
      'Shift swaps happened in a group chat and were forgotten by the time the week started.',
    solution:
      'Swap requests became first-class: proposed, accepted, and reflected on everyone’s calendar immediately.',
    features: ['Team calendar', 'Swap requests', 'Push reminders'],
    status: 'In progress',
    liveUrl: null,
    githubUrl: null,
  },
]
