export type ProjectStatus = 'placeholder' | 'published' | 'draft'

export interface Project {
  id: string
  title: string
  client: string | null
  category: string
  problem: string | null
  solution: string | null
  technologies: string[]
  results: string | null
  image: string | null
  video: string | null
  caseStudyUrl: string | null
  featured: boolean
  status: ProjectStatus
}

export interface Metric {
  id: string
  label: string
  value: string | null
  description: string
  verified: boolean
}

export interface Testimonial {
  id: string
  quote: string | null
  clientName: string | null
  role: string | null
  company: string | null
  image: string | null
  project: string | null
  date: string | null
}

export interface Achievement {
  id: string
  name: string | null
  organization: string | null
  year: string | null
}

export interface Certification {
  id: string
  name: string | null
  organization: string | null
  date: string | null
  credentialId: string | null
  verificationUrl: string | null
  image: string | null
}

export interface Founder {
  id: string
  name: string
  role: string
  image: string | null
  bio: string | null
  github: string | null
  linkedin: string | null
  email: string | null
  skills: string[]
  achievements: string[]
}

export interface ClientLogo {
  id: string
  name: string | null
  logo: string | null
  url: string | null
}

export interface LiveSystem {
  id: string
  title: string
  placeholder: string
  status: 'empty' | 'active'
}

export interface Service {
  id: string
  number: string
  title: string
  description: string
  examples: string[]
}

export interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
}

export interface Problem {
  id: string
  title: string
  description: string
}

export interface TrustPoint {
  id: string
  title: string
  description: string
}

export interface SecurityPoint {
  id: string
  title: string
  description: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface TechnologyCategory {
  id: string
  title: string
  tools: string[]
}

export interface WorkflowNode {
  id: string
  label: string
}

export interface ContactFormData {
  name: string
  businessName: string
  email: string
  phone: string
  businessDescription: string
  processToAutomate: string
  currentTools: string
  taskVolume: string
  additionalInfo: string
}
