export const site = {
  brand: {
    name: 'FlowForge',
    descriptor: 'AI • Automation • Systems',
    tagline: 'Turn Repetitive Work Into Automated Systems.',
    description:
      'We design and deploy AI-powered workflows that connect your tools, eliminate repetitive tasks, and help your team operate more efficiently.',
  },
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Privacy', href: '#privacy' },
  ],
  contact: {
    email: null as string | null,
    whatsapp: null as string | null,
    bookingUrl: null as string | null,
    webhookUrl: null as string | null,
  },
  social: {
    github: null as string | null,
    linkedin: null as string | null,
    whatsapp: null as string | null,
  },
  seo: {
    title: 'FlowForge Automation | AI & Business Automation Systems',
    description:
      'We design and deploy AI-powered workflow automation systems that eliminate repetitive business processes and connect the tools your team already uses.',
    url: 'https://flowforge.example.com',
    ogImage: '/og-image.png',
  },
  hero: {
    pipeline: ['Strategy', 'Build', 'Deploy', 'Support'],
    workflowNodes: [
      'Lead Form',
      'AI Qualification',
      'CRM',
      'WhatsApp',
      'Email',
      'Sales Notification',
      'Analytics',
    ],
  },
} as const
