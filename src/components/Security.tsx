import { Shield } from 'lucide-react'
import { securityPoints } from '../data/security'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'

export function Security() {
  return (
    <section
      id="security"
      className="border-t border-wire py-20 md:py-28 lg:py-30"
      aria-labelledby="security-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="Automation You Can Trust."
            description="Reliable systems require deliberate security and operational practices\u2014not marketing claims."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {securityPoints.map((point, i) => (
            <ScrollReveal key={point.id} delay={i * 50}>
              <Card className="group relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-signal-muted/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-signal-muted text-signal group-hover:bg-signal/20 transition-colors duration-300">
                  <Shield size={18} aria-hidden="true" />
                </div>
                <h3 className="relative font-display text-base font-semibold text-paper">
                  {point.title}
                </h3>
                <p className="relative mt-3 text-sm text-mist">{point.description}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}