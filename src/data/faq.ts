import type { FAQItem } from '../types'

export const faqItems: FAQItem[] = [
  {
    id: 'business-types',
    question: 'What kind of businesses do you work with?',
    answer:
      'We work with small businesses, startups, agencies, e-commerce companies, clinics, professional services, and any organization with repetitive operational processes. If your team does the same task more than once, we can likely help.',
  },
  {
    id: 'existing-software',
    question: 'Do I need to change my existing software?',
    answer:
      'Usually not. We connect the tools you already use—CRMs, email, WhatsApp, spreadsheets, and more—so your team keeps working in familiar systems while automation handles the repetitive parts.',
  },
  {
    id: 'tools',
    question: 'Do you only use n8n, Zapier or Make?',
    answer:
      'No. We choose technology based on your process and constraints. That might mean no-code platforms, custom Python backends, AI integrations, or a combination—whatever fits the problem best.',
  },
  {
    id: 'ai-automation',
    question: 'Can you build AI-powered automation?',
    answer:
      'Yes. We use AI where it adds real value: document processing, classification, intelligent routing, and AI assistants. We focus on practical outcomes, not AI for its own sake.',
  },
  {
    id: 'timeline',
    question: 'How long does an automation take?',
    answer:
      'It depends on complexity. Simple workflow connections may take days. Multi-system integrations with AI or custom development take longer. We scope each project individually after understanding your process.',
  },
  {
    id: 'maintenance',
    question: 'Can you maintain the system after deployment?',
    answer:
      'Yes. We offer ongoing support and monitoring so your automations stay reliable as your business and tools evolve.',
  },
  {
    id: 'failures',
    question: 'What happens if an automation fails?',
    answer:
      'We build error handling and notifications into every system. When something fails, you know immediately—not days later when data is missing.',
  },
  {
    id: 'cost',
    question: 'How much does automation cost?',
    answer:
      'Pricing depends on scope, complexity, and ongoing support needs. We provide clear estimates after a consultation where we understand your process.',
  },
  {
    id: 'getting-started',
    question: 'How do we get started?',
    answer:
      'Book a free consultation or send us details about the process you want to automate. We will review your workflow and identify what can be automated.',
  },
]
