import { Shield, CheckCircle } from 'lucide-react'
import { trustPoints, securityPoints } from '../data/trust'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'

const trustWithSecurity = [
  ...trustPoints.map(p => ({ ...p, category: 'trust' as const })),
  ...securityPoints.map(p => ({ ...p, category: 'security' as const })),
]

const categoryIcons = {
  trust: CheckCircle,
  security: Shield,
}

const categoryLabels = {
  trust: 'Principle',
  security: 'Practice',
}

export function Trust() {
  return (
    <section
      id="trust"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="trust-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="How We Work. What We Guarantee."
            description="Six principles that guide every engagement. Five practices that keep your systems reliable."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustWithSecurity.map((point, i) => {
            const Icon = categoryIcons[point.category]
            return (
              <ScrollReveal key={point.id} delay={i * 50}>
                <Card className="group relative overflow-hidden asymmetric-card h-full" padding="lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  <div className="relative flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta-muted text-terracotta group-hover:scale-110 transition-transform duration-300">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-terracotta">
                      {categoryLabels[point.category]}
                    </span>
                  </div>
                  <h3 className="relative font-display text-base font-medium text-paper" style={{ fontWeight: 500 }}>
                    {point.title}
                  </h3>
                  <p className="relative mt-3 text-sm text-warm-gray">{point.description}</p>
                </Card>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}