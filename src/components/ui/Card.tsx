import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
}

export function Card({
  children,
  className = '',
  hover = true,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-warm-border bg-ink-light ${paddingClasses[padding]} ${
        hover
          ? 'transition-all duration-300 hover:border-warm-border-strong hover:bg-ink hover:shadow-card-hover'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}