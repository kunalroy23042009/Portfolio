import { MessageSquareQuote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { PlaceholderBadge } from './ui/PlaceholderBadge'
import { Card } from './ui/Card'
import type { Testimonial } from '../types'

const hasRealTestimonials = testimonials.some(t => t.quote)

interface EmptySlot {
  id: string
  label: string
}

const emptySlots: EmptySlot[] = [
  { id: 'slot-1', label: 'First client' },
  { id: 'slot-2', label: 'Second client' },
  { id: 'slot-3', label: 'Third client' },
]

type DisplayItem = Testimonial | EmptySlot

export function Testimonials() {
  const items: DisplayItem[] = hasRealTestimonials
    ? testimonials.filter((t): t is Testimonial => !!t.quote)
    : emptySlots

  return (
    <section
      id="testimonials"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="testimonials-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="What Clients Say"
            description={hasRealTestimonials
              ? "Verbatim feedback from people we've worked with."
              : "No testimonials yet. We'll add them when clients have something to say."}
          />
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, i) => {
            const isReal = 'quote' in item
            return (
              <ScrollReveal key={item.id} delay={i * 60}>
                <Card className="flex h-full flex-col group relative overflow-hidden asymmetric-card" padding="lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  {isReal ? (
                    <>
                      <MessageSquareQuote size={20} className="text-terracotta/60" aria-hidden="true" />
                      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-paper">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                      <footer className="mt-6 border-t border-warm-border pt-4">
                        <p className="text-sm font-medium text-paper">{item.clientName}</p>
                        <p className="mt-0.5 text-xs text-warm-gray">
                          {item.role}{item.company && ` \u00b7 {item.company}`}
                        </p>
                      </footer>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-warm-border bg-ink">
                          <MessageSquareQuote size={24} className="text-warm-gray/40" aria-hidden="true" />
                        </div>
                        <p className="text-sm italic text-warm-gray/60 mb-4">
                          &ldquo;This space is reserved for a real client who has a real problem we really solved.&rdquo;
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <PlaceholderBadge className="text-xs">[Client Name]</PlaceholderBadge>
                          <span className="text-warm-gray/40">\u00b7</span>
                          <PlaceholderBadge className="text-xs">[Role]</PlaceholderBadge>
                          <span className="text-warm-gray/40">\u00b7</span>
                          <PlaceholderBadge className="text-xs">[Company]</PlaceholderBadge>
                        </div>
                        <p className="mt-3 font-mono text-xs text-warm-gray/50">
                          Reserved for {item.label}
                        </p>
                      </div>
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