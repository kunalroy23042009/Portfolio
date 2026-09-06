import type { ProcessStep } from '../types'

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    description: 'Understand the current process.',
  },
  {
    id: 'map',
    number: '02',
    title: 'Map',
    description: 'Visualize how information moves.',
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    description: 'Create the automation architecture.',
  },
  {
    id: 'build',
    number: '04',
    title: 'Build',
    description: 'Implement, test and integrate.',
  },
  {
    id: 'deploy',
    number: '05',
    title: 'Deploy & Support',
    description: 'Deploy, document, monitor and maintain.',
  },
]
