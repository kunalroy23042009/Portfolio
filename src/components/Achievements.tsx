import { Award, BadgeCheck } from 'lucide-react'
import { achievements } from '../data/achievements'
import { certifications } from '../data/certifications'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'

type UnifiedItem = {
  id: string
  name: string | null
  organization: string | null
  date: string | null
  type: 'achievement' | 'certification'
  icon: typeof Award | typeof BadgeCheck
  credentialId?: string | null
  verificationUrl?: string | null
}

const allItems: UnifiedItem[] = [
  ...achievements.map(a => ({ ...a, type: 'achievement' as const, icon: Award, date: a.year, credentialId: null, verificationUrl: null })),
  ...certifications.map(c => ({ ...c, type: 'certification' as const, icon: BadgeCheck })),
]

export function Achievements() {
  const hasContent = allItems.some(item => item.name)

  return (
    <section
      id="achievements"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="achievements-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="Proof Points"
            description="Achievements and certifications earned — not claimed. Empty by design until verified."
          />
        </ScrollReveal>

        {hasContent ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {allItems.map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.id} delay={i * 60}>
                  <Card className="group relative overflow-hidden asymmetric-card" padding="lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    <div className="relative flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta-muted text-terracotta group-hover:scale-110 transition-transform duration-300">
                        <Icon size={18} aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider text-terracotta">
                        {item.type === 'achievement' ? 'Achievement' : 'Certification'}
                      </span>
                    </div>
                    <h3 className="relative font-display text-base font-medium text-paper" style={{ fontWeight: 500 }}>
                      {item.name ?? (item.type === 'achievement' ? '[ADD ACHIEVEMENT NAME]' : '[ADD VERIFIED CERTIFICATION]')}
                    </h3>
                    <div className="relative mt-3 space-y-2 text-sm text-warm-gray">
                      {item.organization && <p>{item.organization}</p>}
                      {item.date && <p className="font-mono text-xs">{item.date}</p>}
                      {item.type === 'certification' && item.credentialId && (
                        <p className="font-mono text-xs">ID: {item.credentialId}</p>
                      )}
                      {item.type === 'certification' && item.verificationUrl && (
                        <a
                          href={item.verificationUrl}
                          className="inline-flex items-center gap-1.5 text-xs text-terracotta hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Verify
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                      )}
                    </div>
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>
        ) : (
          <ScrollReveal delay={100}>
            <Card className="relative overflow-hidden asymmetric-card" padding="lg">
              <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent" aria-hidden="true" />
              <div className="relative text-center py-8 md:py-12">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-warm-border bg-ink">
                  <Award size={28} className="text-warm-gray" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-medium text-paper mb-2" style={{ fontWeight: 500 }}>
                  Nothing to show yet — and that's honest
                </h3>
                <p className="text-warm-gray max-w-md mx-auto mb-6">
                  We don't manufacture credentials. This section stays empty until we earn
                  something worth showing — client recognition, platform certifications, industry awards.
                </p>
                <div className="flex items-center justify-center gap-4 font-mono text-xs text-warm-gray/60">
                  <span className="flex items-center gap-1.5">
                    <BadgeCheck size={12} aria-hidden="true" />
                    0 Verified
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award size={12} aria-hidden="true" />
                    0 Earned
                  </span>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}