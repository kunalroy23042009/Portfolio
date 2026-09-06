import { Building2 } from 'lucide-react'
import { clients } from '../data/clients'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { PlaceholderBadge } from './ui/PlaceholderBadge'
import { Card } from './ui/Card'

export function ClientLogos() {
  const hasLogos = clients.some((c) => c.logo)

  return (
    <section
      id="clients"
      className="border-t border-warm-border py-16 md:py-20 lg:py-24"
      aria-labelledby="clients-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="Trusted By"
            align="center"
            description={hasLogos
              ? undefined
              : 'No client logos yet. We earn trust one project at a time.'}
          />
        </ScrollReveal>

        {hasLogos ? (
          <ScrollReveal delay={80}>
            <ul className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {clients.map(
                (client) =>
                  client.logo && (
                    <li key={client.id}>
                      <img
                        src={client.logo}
                        alt={client.name ?? 'Client logo'}
                        className="h-8 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-10"
                        loading="lazy"
                      />
                    </li>
                  ),
              )}
            </ul>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={80}>
            <Card className="mx-auto max-w-2xl text-center asymmetric-card" padding="xl">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-warm-border bg-ink">
                <Building2 size={28} className="text-warm-gray/40" aria-hidden="true" />
              </div>
              <PlaceholderBadge className="text-base mb-3">[CLIENT LOGOS]</PlaceholderBadge>
              <p className="font-mono text-sm text-warm-gray">
                Client logos appear here as partnerships are established.
              </p>
              <p className="mt-2 font-mono text-xs text-warm-gray/50">
                We don't display logos without permission. Ever.
              </p>
            </Card>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}