import { Mail, User } from 'lucide-react'
import { founders } from '../data/founders'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { PlaceholderBadge } from './ui/PlaceholderBadge'
import { Card } from './ui/Card'

export function Founders() {
  return (
    <section
      id="about"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="about-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader title="Built by Engineers. Focused on Business Outcomes." />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {founders.map((founder, i) => (
            <ScrollReveal key={founder.id} delay={i * 80}>
              <Card className="flex flex-col sm:flex-row sm:gap-8 group relative overflow-hidden asymmetric-card" padding="lg">
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="mb-6 flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border border-dashed border-warm-border bg-ink sm:mb-0">
                  {founder.image ? (
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="h-full w-full rounded-2xl object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-warm-gray">
                      <User size={28} aria-hidden="true" />
                      <PlaceholderBadge>[PROFESSIONAL PHOTO]</PlaceholderBadge>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl font-medium text-paper" style={{ fontWeight: 500 }}>
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-sm text-terracotta">{founder.role}</p>

                  <p className="mt-4 text-sm leading-relaxed text-warm-gray">
                    {founder.bio ? (
                      founder.bio.startsWith('[') ? (
                        <PlaceholderBadge>{founder.bio}</PlaceholderBadge>
                      ) : (
                        founder.bio
                      )
                    ) : (
                      <PlaceholderBadge>[ADD FINAL PROFESSIONAL BIO]</PlaceholderBadge>
                    )}
                  </p>

                  <div className="mt-5 flex gap-4">
                    {founder.github ? (
                      <a
                        href={founder.github}
                        className="text-warm-gray transition-colors hover:text-terracotta"
                        aria-label={`${founder.name} on GitHub`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-warm-gray/30" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </span>
                    )}
                    {founder.linkedin ? (
                      <a
                        href={founder.linkedin}
                        className="text-warm-gray transition-colors hover:text-terracotta"
                        aria-label={`${founder.name} on LinkedIn`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.062 2.062 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-warm-gray/30" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.062 2.062 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </span>
                    )}
                    {founder.email ? (
                      <a
                        href={`mailto:${founder.email}`}
                        className="text-warm-gray transition-colors hover:text-terracotta"
                        aria-label={`Email ${founder.name}`}
                      >
                        <Mail size={20} />
                      </a>
                    ) : (
                      <span className="text-warm-gray/30" aria-hidden="true">
                        <Mail size={20} />
                      </span>
                    )}
                  </div>

                  {founder.skills.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {founder.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-lg border border-warm-border bg-ink px-2.5 py-1 font-mono text-[11px] text-warm-gray hover:border-terracotta/40 hover:bg-ink-light hover:text-paper transition-all duration-200"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5">
                      <PlaceholderBadge>[ADD VERIFIED SKILLS]</PlaceholderBadge>
                    </p>
                  )}

                  {founder.achievements.length > 0 ? (
                    <ul className="mt-4 space-y-1.5">
                      {founder.achievements.map((a) => (
                        <li key={a} className="text-xs text-warm-gray">
                          {a}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4">
                      <PlaceholderBadge>[ADD VERIFIED ACHIEVEMENTS]</PlaceholderBadge>
                    </p>
                  )}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}