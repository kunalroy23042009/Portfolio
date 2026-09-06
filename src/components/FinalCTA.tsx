import { ArrowRight, Send } from 'lucide-react'
import { trackEvent } from '../lib/analytics'
import { Button } from './ui/Button'
import { ScrollReveal } from './ui/ScrollReveal'

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="final-cta-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl border border-terracotta/20 bg-gradient-to-br from-terracotta-muted to-ink-light px-6 py-12 text-center md:px-12 md:py-16 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(196,69,54,0.08) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative">
              <h2
                id="final-cta-heading"
                className="font-display text-3xl font-medium tracking-tight text-paper md:text-4xl lg:text-5xl" style={{ fontWeight: 500 }}
              >
                Have a Process You Wish Ran Itself?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-warm-gray md:text-lg">
                Tell us what your team is doing manually. We'll help you identify
                what can be automated.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  href="#contact"
                  variant="primary"
                  icon={<ArrowRight size={16} aria-hidden="true" />}
                  onClick={() =>
                    trackEvent('cta_click', {
                      label: 'book_consultation_final',
                    })
                  }
                  className="w-full sm:w-auto"
                >
                  Book a Free Consultation
                </Button>
                <Button
                  href="#contact"
                  variant="secondary"
                  icon={<Send size={16} aria-hidden="true" />}
                  onClick={() =>
                    trackEvent('cta_click', {
                      label: 'send_workflow_final',
                    })
                  }
                  className="w-full sm:w-auto"
                >
                  Send Us Your Workflow
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}