import { ArrowRight, ImageIcon, Link, FileText } from 'lucide-react'
import { projects } from '../data/projects'
import { trackEvent } from '../lib/analytics'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { PlaceholderBadge } from './ui/PlaceholderBadge'
import { Button } from './ui/Button'

const hasRealProjects = projects.some(p => p.status === 'published')

export function CaseStudies() {
  return (
    <section
      id="work"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="work-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="Selected Work"
            description={hasRealProjects
              ? 'Real client projects with verified outcomes.'
              : 'No published case studies yet. Slots ready for when work ships.'}
          />
        </ScrollReveal>

        {hasRealProjects ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.filter(p => p.status === 'published').map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 80}>
                <article className="group relative overflow-hidden rounded-2xl border border-warm-border bg-ink-light transition-all duration-300 hover:border-terracotta/30 hover:shadow-card-hover">
                  <div className="relative aspect-video overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`Screenshot for ${project.title}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink to-ink-light">
                        <div className="flex flex-col items-center gap-3 text-center p-8">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-warm-border bg-ink">
                            <ImageIcon size={28} strokeWidth={1.5} aria-hidden="true" className="text-warm-gray" />
                          </div>
                          <PlaceholderBadge className="text-sm">[ADD PROJECT SCREENSHOT]</PlaceholderBadge>
                          <p className="font-mono text-xs text-warm-gray/70">16:9 aspect ratio recommended</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="rounded-lg border border-warm-border bg-ink/80 px-3 py-1.5 font-mono text-[10px] text-warm-gray backdrop-blur-sm">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {project.caseStudyUrl ? (
                          <Button
                            href={project.caseStudyUrl}
                            variant="primary"
                            size="sm"
                            icon={<ArrowRight size={14} aria-hidden="true" />}
                            onClick={() =>
                              trackEvent('case_study_view', {
                                label: project.id,
                              })
                            }
                          >
                            View Case Study
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled
                            className="cursor-not-allowed opacity-50"
                            icon={<Link size={14} aria-hidden="true" />}
                          >
                            Case Study
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-xs text-terracotta">
                          Project {String(i + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-1 font-display text-lg font-medium text-paper" style={{ fontWeight: 500 }}>
                          {project.title}
                        </h3>
                      </div>
                      {project.featured && (
                        <span className="shrink-0 rounded-full border border-terracotta/30 bg-terracotta-muted px-2.5 py-0.5 font-mono text-[10px] text-terracotta">
                          Featured
                        </span>
                      )}
                    </div>

                    <dl className="mt-5 space-y-4 text-sm">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
                          Problem
                        </dt>
                        <dd className="mt-1.5 text-warm-gray">
                          {project.problem ? (
                            project.problem.startsWith('[') ? (
                              <PlaceholderBadge>{project.problem}</PlaceholderBadge>
                            ) : (
                              project.problem
                            )
                          ) : (
                            <PlaceholderBadge>[Add verified client problem]</PlaceholderBadge>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
                          Solution
                        </dt>
                        <dd className="mt-1.5 text-warm-gray">
                          {project.solution ? (
                            project.solution.startsWith('[') ? (
                              <PlaceholderBadge>{project.solution}</PlaceholderBadge>
                            ) : (
                              project.solution
                            )
                          ) : (
                            <PlaceholderBadge>[Add what was built]</PlaceholderBadge>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
                          Technology
                        </dt>
                        <dd className="mt-1.5 flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-warm-border bg-ink px-2.5 py-1 font-mono text-[11px] text-warm-gray hover:border-terracotta/40 hover:bg-ink-light hover:text-paper transition-all duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
                          Result
                        </dt>
                        <dd className="mt-1.5 text-warm-gray">
                          {project.results ? (
                            project.results.startsWith('[') ? (
                              <PlaceholderBadge>{project.results}</PlaceholderBadge>
                            ) : (
                              project.results
                            )
                          ) : (
                            <PlaceholderBadge>[Add verified result]</PlaceholderBadge>
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal delay={100}>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project, i) => (
                <article
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl border border-dashed border-warm-border bg-ink-light/50 p-6 transition-all duration-300 hover:border-terracotta/30 hover:bg-terracotta-muted/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-warm-border bg-ink">
                      <FileText size={20} className="text-warm-gray/50" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-terracotta">
                        Slot {String(i + 1).padStart(2, '0')}
                      </p>
                      <p className="font-display text-sm font-medium text-paper/60" style={{ fontWeight: 500 }}>
                        {project.category}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-warm-gray/60">
                    <p><span className="font-mono text-[10px] uppercase tracking-wider">Problem:</span> Waiting for a real project</p>
                    <p><span className="font-mono text-[10px] uppercase tracking-wider">Solution:</span> Will be documented after delivery</p>
                    <p><span className="font-mono text-[10px] uppercase tracking-wider">Stack:</span> {project.technologies.join(', ')}</p>
                    <p><span className="font-mono text-[10px] uppercase tracking-wider">Result:</span> Measured, not marketed</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-warm-border flex items-center justify-between">
                    <PlaceholderBadge>Reserved for client work</PlaceholderBadge>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled
                      className="cursor-default opacity-50"
                      icon={<ArrowRight size={12} aria-hidden="true" />}
                    >
                      Coming soon
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}