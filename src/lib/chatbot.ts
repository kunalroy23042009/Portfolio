const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function sendChatMessage(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  // Complete FlowForge context for RAG-style grounding
  const systemPrompt = `You are FlowForge's AI assistant. You help visitors understand our automation services and guide them toward booking a consultation.

COMPANY CONTEXT:
- Name: FlowForge
- Tagline: Turn Repetitive Work Into Automated Systems
- Description: We design and deploy AI-powered workflows that connect your tools, eliminate repetitive tasks, and help your team operate more efficiently.
- Services: Workflow Automation, AI Automation, Lead & Sales Automation, WhatsApp Automation, Document & Data Automation, Custom Automation Systems
- Tools & Technologies: n8n, Make, Zapier, Python, FastAPI, JavaScript/TypeScript, LLMs, AI Agents, RAG, Embeddings, Docker, Cloud, APIs, Webhooks, PostgreSQL, Vector Databases, CRMs, Google Workspace
- Process: Discover → Map → Design → Build → Deploy & Support
- Philosophy: Honest about what we can and can't do. No pricing without consultation. Focus on practical AI, not hype.

YOUR ROLE:
- Keep responses concise (2-3 sentences max)
- Be helpful but not pushy
- If they want pricing or a detailed quote, direct them to book a free consultation
- Answer questions about workflow automation, AI agents, WhatsApp bots, and automation in general
- If asked about specific pricing, project details, or capabilities beyond your knowledge, direct them to contact us or book a consultation

CONVERSATION STYLE:
- Friendly, professional, and practical
- Never fabricate client results, case studies, or specific metrics
- If you don't know something exact, say so and direct to consultation
- Always end responses by inviting further questions about their process`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6).map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: message }
  ]

  // Only attempt API call if key is provided
  if (!GROQ_API_KEY) {
    // Fall through to mock responses when no key configured
    const lower = message.toLowerCase()

    if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
      return "We don't publish pricing since every project is different. Book a free consultation and we'll give you a clear estimate after understanding your process."
    }

    if (lower.includes('whatsapp') || lower.includes('appointment') || lower.includes('booking')) {
      return "Our WhatsApp AI agent handles appointment booking, lead qualification, and calendar sync — all within the chat. Want to see a demo?"
    }

    if (lower.includes('n8n') || lower.includes('make') || lower.includes('zapier')) {
      return "We use n8n, Make, and Zapier depending on the project. We choose the tool based on your process, not our preference."
    }

    if (lower.includes('ai') || lower.includes('agent') || lower.includes('llm')) {
      return "We build AI agents for document processing, classification, extraction, and intelligent routing. Practical AI — not hype."
    }

    if (lower.includes('book') || lower.includes('consultation') || lower.includes('call') || lower.includes('meet')) {
      return "Great! You can book a free consultation at the bottom of the page, or I can help you describe your process first."
    }

    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return "Hi! Ask me about workflow automation, AI agents, WhatsApp bots, or tell me about a process you want to automate."
    }

    if (lower.includes('thank') || lower.includes('thanks')) {
      return "You're welcome! Let me know if you have other questions."
    }

    return "Thanks for asking! I specialize in workflow automation, AI agents, and WhatsApp automation. What repetitive process is your team dealing with?"
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        messages,
        model: 'llama-3.1-70b-versatile',
        temperature: 0.7,
        max_tokens: 500
      })
    })

    if (response.ok) {
      const data = await response.json()
      return data.choices?.[0]?.message?.content || 'I understand! Let me know if you have other questions.'
    }
    // Fall through to mock responses if API fails
  } catch {
    // Fall through to mock responses
  }

  // Mock responses for demo (when API unavailable)
  const lower = message.toLowerCase()

  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
    return "We don't publish pricing since every project is different. Book a free consultation and we'll give you a clear estimate after understanding your process."
  }

  if (lower.includes('whatsapp') || lower.includes('appointment') || lower.includes('booking')) {
    return "Our WhatsApp AI agent handles appointment booking, lead qualification, and calendar sync — all within the chat. Want to see a demo?"
  }

  if (lower.includes('n8n') || lower.includes('make') || lower.includes('zapier')) {
    return "We use n8n, Make, and Zapier depending on the project. We choose the tool based on your process, not our preference."
  }

  if (lower.includes('ai') || lower.includes('agent') || lower.includes('llm')) {
    return "We build AI agents for document processing, classification, extraction, and intelligent routing. Practical AI — not hype."
  }

  if (lower.includes('book') || lower.includes('consultation') || lower.includes('call') || lower.includes('meet')) {
    return "Great! You can book a free consultation at the bottom of the page, or I can help you describe your process first."
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hi! Ask me about workflow automation, AI agents, WhatsApp bots, or tell me about a process you want to automate."
  }

  if (lower.includes('thank') || lower.includes('thanks')) {
    return "You're welcome! Let me know if you have other questions."
  }

  return "Thanks for asking! I specialize in workflow automation, AI agents, and WhatsApp automation. What repetitive process is your team dealing with?"
}