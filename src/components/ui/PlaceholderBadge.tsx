import { type ReactNode } from 'react'

interface PlaceholderBadgeProps {
  children: ReactNode
  className?: string
}

export function PlaceholderBadge({ children, className = '' }: PlaceholderBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-md border border-dashed border-warm-border bg-terracotta-muted px-2.5 py-1 font-mono text-xs text-warm-gray ${className}`}>
      {children}
    </span>
  )
}