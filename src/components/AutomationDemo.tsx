import { automationDemo } from '../data/automationDemo'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { PlaceholderBadge } from './ui/PlaceholderBadge'

function FlowColumn({
  label,
  steps,
  variant,
}: {
  label: string
  steps: readonly string[]
  variant: 'before' | 'after'
}) {
  const isAfter = variant === 'after'

  return (
    <div
      className={`rounded-2xl asymmetric-card p-6 md:p-8 ${
        isAfter
          ? 'border-terracotta/20 bg-terracotta-muted'
          : 'border-warm-border bg-ink-light'
      }`}
    >
      <h3
        className={`font-display text-sm font-medium uppercase tracking-wider ${
          isAfter ? 'text-terracotta' : 'text-warm-gray'
        }`} style={{ fontWeight: 500 }}
      >
        {label}
      </h3>
      <ol className="mt-6 space-y-0">
        {steps.map((step, i) => (
          <li key={step} className="relative">
            <div
              className={`rounded-lg border px-4 py-3 font-mono text-xs md:text-sm ${
                isAfter
                  ? 'border-terracotta/20 bg-ink text-paper'
                  : 'border-warm-border bg-ink text-warm-gray'
              }`}
            >
              {step}
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex justify-center py-1.5 text-terracotta/40"
                aria-hidden="true"
              >
                ↓
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function AutomationDemo() {
  return (
    <section
      id="demo"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="demo-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              title="See What Automation Changes."
              description="A typical lead handling process—before and after automation connects your systems."
            />
            <PlaceholderBadge>Illustrative Example</PlaceholderBadge>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <ScrollReveal delay={0}>
            <FlowColumn
              label={automationDemo.before.label}
              steps={automationDemo.before.steps}
              variant="before"
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FlowColumn
              label={automationDemo.after.label}
              steps={automationDemo.after.steps}
              variant="after"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}