import type { TechnologyCategory } from '../types'

export const technologies: TechnologyCategory[] = [
  {
    id: 'automation',
    title: 'Automation',
    tools: ['n8n', 'Make', 'Zapier'],
  },
  {
    id: 'development',
    title: 'Development',
    tools: ['Python', 'FastAPI', 'JavaScript / TypeScript'],
  },
  {
    id: 'ai',
    title: 'AI',
    tools: ['LLMs', 'AI Agents', 'RAG', 'Embeddings'],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    tools: ['Docker', 'Cloud', 'APIs', 'Webhooks'],
  },
  {
    id: 'data',
    title: 'Data',
    tools: ['PostgreSQL', 'Vector Databases', 'CRMs', 'Google Workspace'],
  },
]
