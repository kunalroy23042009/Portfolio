import { ExternalLink } from 'lucide-react'
import { certifications } from '../data/certifications'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { PlaceholderBadge } from './ui/PlaceholderBadge'
import { Card } from './ui/Card'

export function Certifications() {
  return (
    <section
      id="certifications"
      className="border-t border-wire py-20 md:py-28 lg:py-30"
      aria-labelledby="certifications-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="Certifications & Credentials"
            description="Verified credentials will appear here as they are obtained."
          />
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.id} delay={i * 60}>
              <Card className="flex gap-5 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-signal-muted/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-dashed border-wire-strong bg-void-panel group-hover:border-signal/30 transition-colors duration-300">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.name ?? 'Certificate'}
                      className="h-full w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-mono text-[10px] text-mist">[CERTIFICATE IMAGE]</span>
                  )}
                </div>
                <div className="relative min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold text-paper">
                    Certificate
                  </h3>
                  <div className="mt-3 space-y-2">
                    <PlaceholderBadge>
                      {cert.name ?? '[ADD VERIFIED CERTIFICATION]'}
                    </PlaceholderBadge>
                    {cert.organization && (
                      <p className="text-sm text-mist">{cert.organization}</p>
                    )}
                    {cert.date && (
                      <p className="font-mono text-xs text-mist">{cert.date}</p>
                    )}
                    {cert.credentialId && (
                      <p className="font-mono text-xs text-mist">
                        ID: {cert.credentialId}
                      </p>
                    )}
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        className="inline-flex items-center gap-1.5 text-xs text-signal hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Verify
                        <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}