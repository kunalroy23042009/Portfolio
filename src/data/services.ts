import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'workflow',
    number: '01',
    title: 'Workflow Automation',
    description: 'Connect applications and automate repetitive processes.',
    examples: [
      'Forms → CRM',
      'CRM → Email',
      'Payment → Invoice',
      'Lead → WhatsApp',
      'Database → Reports',
    ],
  },
  {
    id: 'ai',
    number: '02',
    title: 'AI Automation',
    description:
      'Use AI for processes requiring understanding or decision-making.',
    examples: [
      'AI assistants',
      'Document processing',
      'Classification',
      'Extraction',
      'Summarization',
      'Intelligent routing',
    ],
  },
  {
    id: 'lead-sales',
    number: '03',
    title: 'Lead & Sales Automation',
    description: 'Automate lead capture, qualification and follow-up.',
    examples: [
      'Lead capture',
      'AI qualification',
      'CRM updates',
      'Follow-ups',
      'Appointment booking',
    ],
  },
  {
    id: 'whatsapp',
    number: '04',
    title: 'WhatsApp Automation',
    description: 'Build practical WhatsApp workflows.',
    examples: [
      'Customer notifications',
      'Lead responses',
      'Appointment reminders',
      'FAQs',
      'Follow-ups',
    ],
  },
  {
    id: 'document-data',
    number: '05',
    title: 'Document & Data Automation',
    description:
      'Convert unstructured information into structured business data.',
    examples: [
      'PDFs → structured data',
      'Emails → database',
      'Forms → records',
      'Documents → reports',
    ],
  },
  {
    id: 'custom',
    number: '06',
    title: 'Custom Automation Systems',
    description:
      "Build custom software when no-code/low-code tools aren't enough.",
    examples: [
      'Python',
      'FastAPI',
      'APIs',
      'Databases',
      'Docker',
      'Cloud infrastructure',
      'Custom dashboards',
    ],
  },
]
