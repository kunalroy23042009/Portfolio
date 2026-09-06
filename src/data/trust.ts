import type { TrustPoint } from '../types'

export const trustPoints: TrustPoint[] = [
  {
    id: 'business-first',
    title: 'Business First',
    description: 'We start with the business problem.',
  },
  {
    id: 'transparent',
    title: 'Transparent',
    description: 'Clear scope, workflows and deliverables.',
  },
  {
    id: 'custom',
    title: 'Custom',
    description: "Systems are designed around the client's process.",
  },
  {
    id: 'documented',
    title: 'Documented',
    description: 'Clients understand what has been built.',
  },
  {
    id: 'maintainable',
    title: 'Maintainable',
    description: 'We avoid fragile systems.',
  },
  {
    id: 'scalable',
    title: 'Scalable',
    description: 'Systems can evolve with the business.',
  },
]

export const securityPoints: TrustPoint[] = [
  {
    id: 'least-privilege',
    title: 'Least-Privilege Access',
    description: 'Only request the access required.',
  },
  {
    id: 'secure-credentials',
    title: 'Secure Credentials',
    description: 'Never expose API keys or credentials in frontend code.',
  },
  {
    id: 'error-handling',
    title: 'Error Handling',
    description: 'Automations handle failures gracefully with alerts.',
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    description: 'Important workflows are observable in real time.',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Clients receive living docs for their systems.',
  },
]