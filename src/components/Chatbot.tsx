import { useState, useRef, useEffect, type FormEvent } from 'react'
import { trackEvent } from '../lib/analytics'
import { sendChatMessage } from '../lib/chatbot'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)
    setError(null)

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await sendChatMessage(userMessage, messages)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
      trackEvent('contact_submit', { label: 'chatbot_message' })
    } catch {
      setError('Failed to send message. Please try again.')
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again or contact us directly.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
    if (!isOpen) {
      trackEvent('contact_submit', { label: 'chatbot_open' })
    }
  }

  const initialMessage = "Hi! I'm FlowForge's AI assistant. Ask me about our automation services, book a consultation, or tell me about a process you'd like to automate."

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="chatbot-toggle"
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat with FlowForge assistant'}
        aria-expanded={isOpen}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {isOpen ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M15 9h.01M9 9h.01" />
            </>
          )}
        </svg>
      </button>

      <div
        className={`chatbot-window ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="FlowForge AI Assistant"
        aria-modal="true"
      >
        <div className="chatbot-header">
          <div className="chatbot-title">
            <div className="chatbot-avatar" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span>FlowForge Assistant</span>
          </div>
          <button
            type="button"
            className="chatbot-close"
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="chatbot-messages" role="log" aria-live="polite">
          {messages.length === 0 && (
            <div className="chatbot-message assistant">
              <div className="chatbot-message-avatar" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="chatbot-message-content">{initialMessage}</div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-message ${msg.role}`}>
              <div className="chatbot-message-avatar" aria-hidden="true">
                {msg.role === 'assistant' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" x2="9.01" y1="9" y2="9" />
                    <line x1="15" x2="15.01" y1="9" y2="9" />
                  </svg>
                )}
              </div>
              <div className="chatbot-message-content">{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message assistant">
              <div className="chatbot-message-avatar" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="chatbot-typing" aria-label="Assistant is typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="chatbot-input-area" style={{ borderTopColor: '#dc3545' }}>
            <p style={{ color: '#dc3545', fontSize: '12px', margin: '0 0 8px', fontFamily: 'var(--font-mono)' }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="chatbot-input-area">
          <div className="chatbot-input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chatbot-input"
              placeholder="Ask about automation..."
              disabled={isLoading}
              aria-label="Your message"
              autoComplete="off"
            />
            <button
              type="submit"
              className="chatbot-send"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 22-2z" />
              </svg>
            </button>
          </div>
        </form>

        <p className="chatbot-disclaimer">
          AI assistant • Not a human • <a href="#contact" style={{ color: 'var(--color-terracotta)' }}>Talk to our team</a>
        </p>
      </div>
    </>
  )
}