const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
// Fast, low-latency model. Switch to 'llama-3.3-70b-versatile' if you need max quality.
const GROQ_MODEL = 'llama-3.1-8b-instant'
const REQUEST_TIMEOUT_MS = 12000
const MAX_TOKENS = 120
const MAX_HISTORY = 4
const MAX_CACHE_SIZE = 50

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface StreamOptions {
  signal?: AbortSignal
  onToken?: (token: string) => void
}

// Complete FlowForge context for RAG-style grounding
const SYSTEM_PROMPT = `You are FlowForge's AI assistant. You help visitors understand our automation services and guide them toward booking a consultation.

COMPANY CONTEXT:
- Name: FlowForge
- Tagline: Turn Repetitive Work Into Automated Systems
- Description: We design and deploy AI-powered workflows that connect your tools, eliminate repetitive tasks, and help your team operate more efficiently.
- Services: Workflow Automation, AI Automation, Lead & Sales Automation, WhatsApp Automation, Document & Data Automation, Custom Automation Systems
- Tools & Technologies: n8n, Make, Zapier, Python, FastAPI, JavaScript/TypeScript, LLMs, AI Agents, RAG, Embeddings, Docker, Cloud, APIs, Webhooks, PostgreSQL, Vector Databases, CRMs, Google Workspace
- Process: Discover → Map → Design → Build → Deploy & Support
- Philosophy: Honest about what we can and can't do. No pricing without consultation. Focus on practical AI, not hype.

YOUR ROLE:
- Reply like a fast chat assistant: 1-2 short sentences, under 40 words
- Be helpful, never pushy; no filler openers, no repeated greetings
- Pricing or detailed quotes → point to a free consultation
- Beyond your knowledge → say so in one line and point to a consultation

CONVERSATION STYLE:
- Short, direct, practical. Never fabricate clients, metrics, or case studies.`

const FALLBACK_ANSWER =
  "Got it — which repetitive task is eating your team's time most?"

const BUSY_ANSWER =
  'Swamped right now — retry in a bit, or book a free consult below.'

// Instant local answers for high-frequency intents: zero latency, zero API cost.
const LOCAL_ANSWERS: Array<{ test: RegExp; answer: string }> = [
  {
    test: /pric|pricing|cost|quote|budget|charge|fee/,
    answer:
      'No fixed pricing — every project differs. Book a free consult for an exact estimate.',
  },
  {
    test: /whatsapp|appointment|booking|calendar|schedul/,
    answer:
      'Our WhatsApp AI books appointments, qualifies leads, and syncs your calendar. Want a demo?',
  },
  {
    test: /\bn8n\b|make\.com|\bzapier\b|\bzap\b/,
    answer: 'We use n8n, Make, or Zapier — whichever fits your process best.',
  },
  {
    test: /\bai\b|agent|llm|gpt|rag|automat/,
    answer: 'We build practical AI agents: docs, classification, routing. No hype.',
  },
  {
    test: /book|consult|demo|call|meet|talk|contact/,
    answer: "Book a free consult below — or describe your process and I'll pre-qualify it.",
  },
  {
    test: /^(hi|hey|hello|yo|sup|namaste)\b|\bhi\b.*\bthere\b/,
    answer: 'Hi! What repetitive task should we automate first?',
  },
  {
    test: /thank|thanks|shukriya|dhanyavad/,
    answer: 'Anytime! What else?',
  },
]

export function getLocalAnswer(message: string): string | null {
  const text = message.toLowerCase()
  for (const { test, answer } of LOCAL_ANSWERS) {
    if (test.test(text)) return answer
  }
  return null
}

// Bounded in-memory cache for repeat questions (per page session).
const responseCache = new Map<string, string>()

function normalize(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 500)
}

function cacheSet(key: string, value: string): void {
  if (responseCache.size >= MAX_CACHE_SIZE) {
    const oldest = responseCache.keys().next()
    if (!oldest.done) responseCache.delete(oldest.value)
  }
  responseCache.set(key, value)
}

function buildMessages(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>
): Array<{ role: string; content: string }> {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history
      .slice(-MAX_HISTORY)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 400) })),
    { role: 'user', content: message.trim().slice(0, 600) },
  ]
}

function emitAndCache(key: string, text: string, onToken?: (token: string) => void): string {
  cacheSet(key, text)
  if (onToken) onToken(text)
  return text
}

const BUSY_MARKER = '__GROQ_BUSY__'

async function streamFromGroq(
  payload: Array<{ role: string; content: string }>,
  signal: AbortSignal,
  onToken?: (token: string) => void
): Promise<string> {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      messages: payload,
      model: GROQ_MODEL,
      temperature: 0.3,
      max_tokens: MAX_TOKENS,
      stream: true,
    }),
    signal,
  })

  if (response.status === 429) return BUSY_MARKER
  if (!response.ok || !response.body) throw new Error(`Groq error: ${response.status}`)

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let full = ''
  let finished = false

  while (!finished) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue
      const data = trimmed.slice(5).trim()
      if (data === '[DONE]') {
        finished = true
        break
      }
      try {
        const json = JSON.parse(data)
        const token = json.choices?.[0]?.delta?.content
        if (typeof token === 'string' && token) {
          full += token
          if (onToken) onToken(token)
        }
      } catch {
        // Skip malformed SSE chunks
      }
    }
  }

  if (!full.trim()) throw new Error('Empty Groq response')
  return full
}

/**
 * Streams a Groq answer token-by-token via onToken for instant perceived
 * response. Falls back to instant local answers (and cache) so the chat
 * never hangs: no key, timeout, rate-limit, or network failure.
 */
export async function streamChatMessage(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  options: StreamOptions = {}
): Promise<string> {
  const clean = message.trim().slice(0, 600)
  if (!clean) return FALLBACK_ANSWER
  const key = normalize(clean)

  const cached = responseCache.get(key)
  if (cached) {
    if (options.onToken) options.onToken(cached)
    return cached
  }

  const local = getLocalAnswer(clean)
  if (local) return emitAndCache(key, local, options.onToken)
  if (!GROQ_API_KEY) return emitAndCache(key, FALLBACK_ANSWER, options.onToken)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  if (options.signal) {
    if (options.signal.aborted) {
      clearTimeout(timer)
      const abortError = new Error('Aborted')
      abortError.name = 'AbortError'
      throw abortError
    }
    options.signal.addEventListener('abort', () => controller.abort(), { once: true })
  }

  try {
    const result = await streamFromGroq(buildMessages(clean, history), controller.signal, options.onToken)
    if (result === BUSY_MARKER) return emitAndCache(key, BUSY_ANSWER, options.onToken)
    return emitAndCache(key, result)
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') throw error
    return emitAndCache(key, FALLBACK_ANSWER, options.onToken)
  } finally {
    clearTimeout(timer)
  }
}

/** Non-streaming wrapper (kept for compatibility). Prefers the same fast path. */
export async function sendChatMessage(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  return streamChatMessage(message, history)
}
