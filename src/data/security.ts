import type { SecurityPoint } from '../types'

export const securityPoints: SecurityPoint[] = [
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
    description: 'Automations should handle failures gracefully.',
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    description: 'Important workflows should be observable.',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Clients receive documentation for their systems.',
  },
]
