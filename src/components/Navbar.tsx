import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { site } from '../data/site'
import { useScrolled } from '../hooks/useScrollSpy'
import { trackEvent } from '../lib/analytics'
import { Button } from './ui/Button'
import { ThemeToggle } from './ui/ThemeToggle'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()

  const handleCta = () => {
    trackEvent('cta_click', { label: 'book_call_nav' })
    setOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 navbar ${scrolled ? 'scrolled' : ''}`}
      role="banner"
    >
      <nav
        className="section-container flex h-16 items-center justify-between gap-4 md:h-[4.5rem]"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="group flex flex-col leading-none shrink-0"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-lg font-medium tracking-tight text-paper transition-colors group-hover:text-terracotta">
            {site.brand.name}
          </span>
          <span className="mt-0.5 font-mono text-[10px] tracking-wider text-warm-gray">
            {site.brand.descriptor}
          </span>
        </a>

        <div className="hidden md:flex md:items-center md:gap-8 ml-auto">
          <ul className="flex items-center gap-6">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-warm-gray transition-colors hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <Button
            href="#contact"
            variant="primary"
            className="!py-2.5 !px-5 !text-sm"
            onClick={handleCta}
          >
            Book a Free Call
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-warm-border p-2.5 text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-warm-border bg-ink/95 backdrop-blur-xl md:hidden"
        >
          <ul className="section-container flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-lg px-3 py-3 text-sm text-warm-gray transition-colors hover:bg-ink-light hover:text-paper"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button
                href="#contact"
                variant="primary"
                className="w-full py-3"
                onClick={handleCta}
              >
                Book a Free Call
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}