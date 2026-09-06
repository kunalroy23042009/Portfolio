import { type FormEvent, useState } from 'react'
import { site } from '../data/site'
import type { ContactFormData } from '../types'
import { submitContactForm } from '../lib/contactForm'
import { trackEvent } from '../lib/analytics'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { PlaceholderBadge } from './ui/PlaceholderBadge'
import { Button } from './ui/Button'

const initialForm: ContactFormData = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  businessDescription: '',
  processToAutomate: '',
  currentTools: '',
  taskVolume: '',
  additionalInfo: '',
}

export function Contact() {
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const update = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof ContactFormData, string>> = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email address.'
    if (!form.processToAutomate.trim())
      next.processToAutomate = 'Describe the process you want to automate.'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    const result = await submitContactForm(form)

    if (result.success) {
      setStatus('success')
      setMessage(result.message)
      setForm(initialForm)
    } else {
      setStatus('error')
      setMessage(result.message)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-warm-border bg-ink px-4 py-3 text-sm text-paper placeholder:text-warm-gray/60 transition-all duration-200 focus:border-terracotta/50 focus:outline-none focus:ring-1 focus:ring-terracotta/30 hover:border-warm-border-strong'

  return (
    <section
      id="contact"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
      aria-labelledby="contact-heading"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="Request an Automation Assessment"
            description="Describe your process and we'll identify what can be automated."
          />
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <ScrollReveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
              aria-label="Contact form"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-paper">
                    Name <span className="text-terracotta" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={inputClass}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-required="true"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="businessName" className="mb-2 block text-sm font-medium text-paper">
                    Business Name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    autoComplete="organization"
                    value={form.businessName}
                    onChange={(e) => update('businessName', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-paper">
                    Email <span className="text-terracotta" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputClass}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-required="true"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-paper">
                    WhatsApp / Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessDescription" className="mb-2 block text-sm font-medium text-paper">
                  What does your business do?
                </label>
                <input
                  id="businessDescription"
                  type="text"
                  value={form.businessDescription}
                  onChange={(e) => update('businessDescription', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="processToAutomate" className="mb-2 block text-sm font-medium text-paper">
                  What process would you like to automate?{' '}
                  <span className="text-terracotta" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="processToAutomate"
                  rows={4}
                  value={form.processToAutomate}
                  onChange={(e) => update('processToAutomate', e.target.value)}
                  className={`${inputClass} resize-y min-h-[100px]`}
                  aria-invalid={!!errors.processToAutomate}
                  aria-describedby={errors.processToAutomate ? 'process-error' : undefined}
                  aria-required="true"
                />
                {errors.processToAutomate && (
                  <p id="process-error" className="mt-1.5 text-xs text-red-400" role="alert">
                    {errors.processToAutomate}
                  </p>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="currentTools" className="mb-2 block text-sm font-medium text-paper">
                    Current tools
                  </label>
                  <input
                    id="currentTools"
                    type="text"
                    placeholder="CRM, WhatsApp, Google Sheets..."
                    value={form.currentTools}
                    onChange={(e) => update('currentTools', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="taskVolume" className="mb-2 block text-sm font-medium text-paper">
                    Approximate task volume
                  </label>
                  <input
                    id="taskVolume"
                    type="text"
                    placeholder="e.g. 50 leads per week"
                    value={form.taskVolume}
                    onChange={(e) => update('taskVolume', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="mb-2 block text-sm font-medium text-paper">
                  Additional information
                </label>
                <textarea
                  id="additionalInfo"
                  rows={3}
                  value={form.additionalInfo}
                  onChange={(e) => update('additionalInfo', e.target.value)}
                  className={`${inputClass} resize-y`}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
                disabled={status === 'submitting'}
              >
                {status === 'submitting'
                  ? 'Submitting...'
                  : 'Request Automation Assessment'}
              </Button>

              {message && (
                <p
                  className={`text-sm ${status === 'success' ? 'text-terracotta' : 'text-red-400'}`}
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </p>
              )}
            </form>
          </ScrollReveal>

          <ScrollReveal delay={100} className="lg:col-span-2">
            <aside className="rounded-2xl border border-warm-border bg-ink-light p-6 lg:p-8 asymmetric-card">
              <h3 className="font-display text-base font-medium text-paper" style={{ fontWeight: 500 }}>
                Direct Contact
              </h3>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
                    Email
                  </dt>
                  <dd className="mt-1.5">
                    {site.contact.email ? (
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="text-terracotta hover:underline transition-colors"
                        onClick={() => trackEvent('email_click')}
                      >
                        {site.contact.email}
                      </a>
                    ) : (
                      <PlaceholderBadge>[ADD BUSINESS EMAIL]</PlaceholderBadge>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
                    WhatsApp
                  </dt>
                  <dd className="mt-1.5">
                    {site.contact.whatsapp ? (
                      <a
                        href={`https://wa.me/${site.contact.whatsapp}`}
                        className="text-terracotta hover:underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('whatsapp_click')}
                      >
                        {site.contact.whatsapp}
                      </a>
                    ) : (
                      <PlaceholderBadge>[ADD WHATSAPP NUMBER]</PlaceholderBadge>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
                    Booking
                  </dt>
                  <dd className="mt-1.5">
                    {site.contact.bookingUrl ? (
                      <a
                        href={site.contact.bookingUrl}
                        className="text-terracotta hover:underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('consultation_book')}
                      >
                        Schedule a call
                      </a>
                    ) : (
                      <PlaceholderBadge>[ADD BOOKING LINK]</PlaceholderBadge>
                    )}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 rounded-xl border border-dashed border-warm-border p-5 bg-ink/50">
                <p className="font-mono text-[10px] uppercase tracking-wider text-warm-gray">
                  Future automation flow
                </p>
                <pre className="mt-3 overflow-x-auto font-mono text-[10px] leading-relaxed text-warm-gray">
{`Website Form
      \u2193
Webhook / API
      \u2193
Lead Processing
      \u2193
CRM \u2192 Email \u2192 WhatsApp`}
                </pre>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}