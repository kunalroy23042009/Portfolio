import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react'
import { site } from '../data/site'
import { trackEvent } from '../lib/analytics'
import { Button } from './ui/Button'
import { FlowVisualization } from './ui/FlowVisualization'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-[10rem] lg:pb-[7rem]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 gradient-warm" aria-hidden="true" />
      <div className="absolute inset-0 bg-grain" aria-hidden="true" />

      <div className="section-container relative">
        <div className="max-w-4xl mx-auto text-center lg:max-w-none lg:mx-0 lg:text-left">
          <p className="mb-5 inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-terracotta lg:justify-start">
            <Sparkles size={12} aria-hidden="true" />
            AI-powered business automation
          </p>

          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-[1.02] tracking-tight text-paper md:text-5xl lg:text-[3.75rem] xl:text-[4.5rem] text-balance scribble-underline"
            style={{ fontWeight: 500 }}
          >
            <span className="block">Turn Repetitive Work</span>
            <span className="block relative inline-flex items-baseline gap-3">
              Into Automated
              <span className="relative text-terracotta">Systems.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-warm-gray lg:mx-0">
            We design and deploy AI-powered workflows that connect your tools,
            eliminate repetitive tasks, and give your team more time to focus on
            work that actually matters.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center lg:justify-start">
            <Button
              href="#contact"
              variant="primary"
              icon={<ArrowRight size={16} aria-hidden="true" />}
              onClick={() =>
                trackEvent('cta_click', {
                  label: 'book_consultation_hero',
                })
              }
              className="w-full sm:w-auto lg:w-auto"
            >
              Book a Free Automation Consultation
            </Button>
            <Button
              href="#work"
              variant="secondary"
              icon={<ArrowDown size={16} aria-hidden="true" />}
              onClick={() =>
                trackEvent('cta_click', { label: 'explore_work_hero' })
              }
              className="w-full sm:w-auto lg:w-auto"
            >
              Explore Our Work
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 font-mono text-xs text-warm-gray lg:justify-start">
            {site.hero.pipeline.map((step, i) => (
              <span key={step} className="flex items-center gap-2.5">
                <span className="text-paper/90">{step}</span>
                {i < site.hero.pipeline.length - 1 && (
                  <span className="text-terracotta/50" aria-hidden="true">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 relative lg:mt-20">
          <div className="rounded-2xl border border-warm-border bg-ink-light/60 p-4 backdrop-blur-xl panel-strong overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-widest text-warm-gray">
                Live system flow
              </p>
              <div className="flex items-center gap-2 font-mono text-[11px] text-terracotta/70">
                <span className="relative flex h-2 w-2 rounded-full bg-terracotta animate-pulse-soft" aria-hidden="true" />
                Active
              </div>
            </div>
            <FlowVisualization />
          </div>
        </div>
      </div>
    </section>
  )
}