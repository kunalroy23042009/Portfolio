import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { faqItems } from '../data/faq'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null)
  const baseId = useId()

  return (
    <section
      id="faq"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="faq-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader title="Frequently Asked Questions" />
        </ScrollReveal>

        <div className="mx-auto max-w-3xl divide-y divide-warm-border rounded-2xl border border-warm-border bg-ink-light overflow-hidden">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id
            const panelId = `${baseId}-${item.id}-panel`
            const buttonId = `${baseId}-${item.id}-button`

            return (
              <ScrollReveal key={item.id} delay={i * 40}>
                <div className="bg-ink-light first:rounded-t-2xl last:rounded-b-2xl">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-ink"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenId(isOpen ? null : item.id)
                      }
                    >
                      <span className="text-sm font-medium text-paper md:text-base pr-8">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-warm-gray transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="px-6 pb-5"
                  >
                    <p className="text-sm leading-relaxed text-warm-gray">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}