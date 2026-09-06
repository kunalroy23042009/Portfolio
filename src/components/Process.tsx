import { processSteps } from '../data/process'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'

export function Process() {
  return (
    <section
      id="process"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="process-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader title="From Bottleneck to Automated System." />
        </ScrollReveal>

        <div className="relative">
          <div
            className="absolute top-12 hidden h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent lg:block lg:inset-x-[8%]"
            aria-hidden="true"
          />

          <ol className="relative grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.id} delay={i * 80}>
                <li className="relative list-none">
                  <div className="relative z-10">
                    <Card className="h-full relative z-10 group text-center" padding="lg">
                      <div className="relative mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-ink font-mono text-xs font-semibold text-terracotta mx-auto group-hover:border-terracotta group-hover:bg-terracotta/10 transition-colors duration-300">
                        <span className="relative z-10">{step.number}</span>
                        {!i && (
                          <span
                            className="absolute inset-0 rounded-full border-terracotta/30 animate-pulse-soft"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <h3 className="font-display text-base font-medium text-paper" style={{ fontWeight: 500 }}>
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-warm-gray">{step.description}</p>
                    </Card>
                  </div>

                  {i < processSteps.length - 1 && (
                    <div
                      className="absolute top-[3rem] left-1/2 hidden w-full lg:block"
                      style={{ transform: 'translateX(-50%)' }}
                      aria-hidden="true"
                    >
                      <div className="h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
                    </div>
                  )}
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}