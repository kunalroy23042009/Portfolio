import { metrics } from '../data/metrics'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'

export function Metrics() {
  const hasVerified = metrics.some(m => m.verified)

  return (
    <section
      id="metrics"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="metrics-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="Our Track Record"
            description={hasVerified
              ? 'Verified numbers from delivered work.'
              : 'No verified metrics yet. We measure what matters — and only publish what we can prove.'}
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.id} delay={i * 50}>
              <Card className="relative text-center group overflow-hidden asymmetric-card" padding="lg">
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <p className="relative font-display text-4xl font-medium text-paper md:text-5xl lg:text-6xl" style={{ fontWeight: 500 }}>
                  {metric.verified && metric.value ? metric.value : '—'}
                </p>
                {!metric.verified && (
                  <p className="relative mt-2 font-mono text-xs text-terracotta">
                    Unverified
                  </p>
                )}
                <h3 className="relative mt-4 text-sm font-medium text-paper">
                  {metric.label}
                </h3>
                <p className="relative mt-1.5 text-xs text-warm-gray">{metric.description}</p>
                {!metric.verified && (
                  <div className="relative mt-4 h-px bg-gradient-to-r from-transparent via-warm-border to-transparent w-24 mx-auto" aria-hidden="true" />
                )}
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {!hasVerified && (
          <ScrollReveal delay={300}>
            <p className="text-center text-xs text-warm-gray/60 font-mono">
              Metrics unlock after first 3 delivered projects with client sign-off
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}