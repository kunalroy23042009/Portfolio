import { site } from '../data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-warm-border py-12 md:py-16" role="contentinfo">
      <div className="section-container">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="font-display text-lg font-medium text-paper" style={{ fontWeight: 500 }}>
              {site.brand.name}
            </p>
            <p className="mt-1 font-mono text-xs tracking-wider text-warm-gray">
              {site.brand.descriptor}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2">
              {[...site.nav, { label: 'Contact', href: '#contact' }].map(
                (item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-warm-gray transition-colors hover:text-paper"
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
              Social
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                {site.social.github ? (
                  <a
                    href={site.social.github}
                    className="text-sm text-warm-gray hover:text-paper transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                ) : (
                  <span className="text-sm text-warm-gray/40">GitHub</span>
                )}
              </li>
              <li>
                {site.social.linkedin ? (
                  <a
                    href={site.social.linkedin}
                    className="text-sm text-warm-gray hover:text-paper transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                ) : (
                  <span className="text-sm text-warm-gray/40">LinkedIn</span>
                )}
              </li>
              <li>
                {site.social.whatsapp ? (
                  <a
                    href={`https://wa.me/${site.social.whatsapp}`}
                    className="text-sm text-warm-gray hover:text-paper transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <span className="text-sm text-warm-gray/40">WhatsApp</span>
                )}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-warm-gray transition-colors hover:text-paper"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-warm-gray transition-colors hover:text-paper"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-warm-border pt-6 text-center text-xs text-warm-gray">
          \u00a9 {year} {site.brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}