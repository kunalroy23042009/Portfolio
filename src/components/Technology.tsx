import { technologies } from '../data/technologies'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'

export function Technology() {
  return (
    <section
      id="technology"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="technology-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="Built With the Right Tools."
            description="We choose technology based on the problem\u2014not because a particular tool is trending."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {technologies.map((category, i) => (
            <ScrollReveal key={category.id} delay={i * 50}>
              <Card className="group relative overflow-hidden asymmetric-card h-full" padding="lg">
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <h3 className="relative font-display text-sm font-medium text-paper" style={{ fontWeight: 500 }}>
                  {category.title}
                </h3>
                <ul className="relative mt-3 space-y-2">
                  {category.tools.map((tool) => (
                    <li
                      key={tool}
                      className="font-mono text-xs text-warm-gray group-hover:text-paper transition-colors duration-200"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}