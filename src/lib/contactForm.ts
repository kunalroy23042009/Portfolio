import type { ContactFormData } from '../types'
import { site } from '../data/site'
import { trackEvent } from './analytics'

export interface FormSubmitResult {
  success: boolean
  message: string
}

export async function submitContactForm(
  data: ContactFormData,
): Promise<FormSubmitResult> {
  trackEvent('contact_submit', { label: 'contact_form' })

  const webhookUrl = site.contact.webhookUrl

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          source: 'flowforge_website',
        }),
      })

      if (!response.ok) {
        return {
          success: false,
          message: 'Submission failed. Please try again or contact us directly.',
        }
      }

      return {
        success: true,
        message: 'Request received. We will review your workflow and respond shortly.',
      }
    } catch {
      return {
        success: false,
        message: 'Network error. Please try again or contact us directly.',
      }
    }
  }

  return {
    success: true,
    message:
      'Form captured locally. Connect a webhook URL in site config to enable automated lead processing.',
  }
}
