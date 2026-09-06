import { problems } from '../data/problems'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'

export function ProblemSection() {
  return (
    <section
      id="problems"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="problems-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="Your Team Shouldn't Be the Integration Layer."
            description="When people become the glue between your tools, errors increase, speed drops, and growth stalls."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => (
            <ScrollReveal key={problem.id} delay={i * 60}>
              <Card className="group relative overflow-hidden asymmetric-card" padding="lg">
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <h3 className="relative font-display text-lg font-medium text-paper" style={{ fontWeight: 500 }}>
                  {problem.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-warm-gray">
                  {problem.description}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <blockquote className="mt-14 border-l-2 border-terracotta pl-5 text-base font-medium text-paper/90 italic md:text-lg">
            If a process happens repeatedly, it may be a candidate for automation.
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  )
}