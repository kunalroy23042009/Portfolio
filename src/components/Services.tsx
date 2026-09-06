import {
  Workflow,
  Bot,
  Users,
  MessageSquare,
  FileText,
  Code,
} from 'lucide-react'
import { services } from '../data/services'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'

const serviceIcons = {
  workflow: Workflow,
  ai: Bot,
  'lead-sales': Users,
  whatsapp: MessageSquare,
  'document-data': FileText,
  custom: Code,
} as const

const serviceColors = {
  workflow: { accent: 'terracotta', bg: 'terracotta-muted', icon: 'terracotta' },
  ai: { accent: 'sage', bg: 'sage-muted', icon: 'sage' },
  'lead-sales': { accent: 'sage', bg: 'sage-muted', icon: 'sage' },
  whatsapp: { accent: 'terracotta', bg: 'terracotta-muted', icon: 'terracotta' },
  'document-data': { accent: 'sage', bg: 'sage-muted', icon: 'sage' },
  custom: { accent: 'terracotta', bg: 'terracotta-muted', icon: 'terracotta' },
} as const

export function Services() {
  return (
    <section
      id="services"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="services-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="What We Build"
            description="We understand business processes first, then choose the right technology to automate them."
          />
        </ScrollReveal>

        <div className="relative">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.id as keyof typeof serviceIcons] ?? Workflow
              const colors = serviceColors[service.id as keyof typeof serviceColors] ?? serviceColors.workflow
              return (
                <ScrollReveal key={service.id} delay={i * 60}>
                  <Card
                    className="group relative overflow-hidden asymmetric-card transition-all duration-500"
                    padding="lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                    <div className="relative flex items-center gap-3 mb-5">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300 bg-${colors.bg} text-${colors.icon}`}>
                        <Icon size={19} aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider text-terracotta">
                        {service.number}
                      </span>
                    </div>
                    <h3 className="relative font-display text-lg font-medium text-paper" style={{ fontWeight: 500 }}>
                      {service.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-warm-gray">
                      {service.description}
                    </p>
                    <ul className="relative mt-6 flex flex-1 flex-wrap gap-2">
                      {service.examples.map((ex) => (
                        <li
                          key={ex}
                          className="rounded-lg border border-warm-border bg-ink px-3 py-1.5 font-mono text-[11px] text-warm-gray hover:border-terracotta/40 hover:bg-ink-light hover:text-paper transition-all duration-200"
                        >
                          {ex}
                        </li>
                      ))}
                    </ul>
                    <div className="relative mt-6 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}