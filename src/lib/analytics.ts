type AnalyticsEvent =
  | 'cta_click'
  | 'contact_submit'
  | 'consultation_book'
  | 'whatsapp_click'
  | 'email_click'
  | 'case_study_view'
  | 'scroll_depth'

interface AnalyticsPayload {
  label?: string
  section?: string
  depth?: number
}

const handlers: Array<
  (event: AnalyticsEvent, payload?: AnalyticsPayload) => void
> = []

export function trackEvent(
  event: AnalyticsEvent,
  payload?: AnalyticsPayload,
): void {
  handlers.forEach((handler) => handler(event, payload))

  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, payload)
  }
}

export function registerAnalyticsHandler(
  handler: (event: AnalyticsEvent, payload?: AnalyticsPayload) => void,
): () => void {
  handlers.push(handler)
  return () => {
    const index = handlers.indexOf(handler)
    if (index >= 0) handlers.splice(index, 1)
  }
}
