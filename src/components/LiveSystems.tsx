import { Activity, Monitor, Play, Radio, Workflow } from 'lucide-react'
import { liveSystems } from '../data/liveSystems'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { PlaceholderBadge } from './ui/PlaceholderBadge'
import { Card } from './ui/Card'

const icons = {
  'live-demo': Monitor,
  'workflow-viz': Workflow,
  'interactive-demo': Activity,
  'system-status': Radio,
  'video-demo': Play,
} as const

const descriptions = {
  'live-demo': 'Interactive sandbox to test flows',
  'workflow-viz': 'Real-time execution graph',
  'interactive-demo': 'Click-through automation builder',
  'system-status': 'Uptime, latency, error rates',
  'video-demo': 'Recorded walkthroughs',
}

export function LiveSystems() {
  const hasActive = liveSystems.some(s => s.status === 'active')

  return (
    <section
      id="live-systems"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="live-systems-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="Automation In Action"
            description={hasActive
              ? 'Live systems you can explore.'
              : 'No live demos deployed yet. This section activates when systems go live.'}
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liveSystems.map((system, i) => {
            const Icon = icons[system.id as keyof typeof icons] ?? Monitor
            const isActive = system.status === 'active'
            return (
              <ScrollReveal key={system.id} delay={i * 60}>
                <Card
                  className={`group relative overflow-hidden h-full asymmetric-card ${
                    isActive ? 'border-terracotta/30' : 'border-dashed border-warm-border'
                  }`}
                  padding="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  <div className="relative flex items-center gap-4 mb-5">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      isActive
                        ? 'border-terracotta/40 bg-terracotta-muted text-terracotta'
                        : 'border-warm-border bg-ink text-warm-gray'
                    }`}>
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-medium text-paper" style={{ fontWeight: 500 }}>
                        {system.title}
                      </h3>
                      <p className="font-mono text-[10px] text-warm-gray">{descriptions[system.id as keyof typeof descriptions]}</p>
                    </div>
                  </div>
                  <div className={`rounded-xl transition-all duration-300 asymmetric-card ${
                    isActive
                      ? 'border border-terracotta/20 bg-terracotta-muted/30 min-h-[120px] flex items-center justify-center'
                      : 'border-2 border-dashed border-warm-border bg-ink/50 min-h-[120px] flex items-center justify-center group-hover:border-terracotta/30 group-hover:bg-terracotta-muted/10'
                  }`}>
                    {isActive ? (
                      <span className="font-mono text-sm text-terracotta">[LIVE SYSTEM EMBED]</span>
                    ) : (
                      <PlaceholderBadge className="text-sm">{system.placeholder}</PlaceholderBadge>
                    )}
                  </div>
                  {!isActive && (
                    <div className="mt-4 pt-4 border-t border-warm-border text-center">
                      <p className="font-mono text-xs text-warm-gray/60">
                        Deploys when '{system.title.toLowerCase()}' goes live
                      </p>
                    </div>
                  )}
                </Card>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}