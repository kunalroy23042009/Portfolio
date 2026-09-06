import { site } from '../data/site'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function sendChatMessage(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  const webhookUrl = site.contact.webhookUrl

  const systemPrompt = `You are FlowForge's AI assistant. You help visitors understand our automation services and guide them toward booking a consultation.

Our services:
- Workflow Automation (Forms → CRM, CRM → Email, Payment → Invoice, Lead → WhatsApp, Database → Reports)
- AI Automation (AI assistants, Document processing, Classification, Extraction, Summarization, Intelligent routing)
- Lead & Sales Automation (Lead capture, AI qualification, CRM updates, Follow-ups, Appointment booking)
- WhatsApp Automation (AI appointment booking, Lead qualification & routing, Customer notifications & reminders, FAQ automation with memory, CRM & Sheets sync from chat)
- Document & Data Automation (PDFs → structured data, Emails → database, Forms → records, Documents → reports)
- Custom Automation Systems (Python, FastAPI, APIs, Databases, Docker, Cloud infrastructure, Custom dashboards)

We work with: n8n, Make, Zapier, Python, FastAPI, JavaScript/TypeScript, LLMs, AI Agents, RAG, Embeddings, Docker, Cloud, APIs, Webhooks, PostgreSQL, Vector Databases, CRMs, Google Workspace.

Our process: Discover → Map → Design → Build → Deploy & Support

We don't give pricing without a consultation. We're honest about what we can and can't do.

Keep responses concise (2-3 sentences max). Be helpful but not pushy. If they want pricing or a detailed quote, direct them to book a free consultation at #contact.`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6).map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: message }
  ]

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          source: 'flowforge_chatbot',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        const data = await response.json()
        return data.response || data.message || "I'll help you with that! Could you tell me more about what you're looking to automate?"
      }
    } catch {
      // Fall through to mock response
    }
  }

  // Mock responses for demo (when no webhook configured)
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