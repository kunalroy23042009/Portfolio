import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type BaseProps = {
  variant?: Variant
  size?: Size
  children: ReactNode
  icon?: ReactNode
  className?: string
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

const variants: Record<Variant, string> = {
  primary:
    'bg-terracotta text-paper hover:bg-terracotta-light border border-terracotta shadow-[0_0_24px_rgba(196,69,54,0.2)]',
  secondary:
    'bg-transparent text-paper border border-warm-border-strong hover:border-terracotta/40 hover:bg-terracotta-muted',
  ghost: 'bg-transparent text-warm-gray hover:text-paper border border-transparent',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    const { ...anchorProps } = props as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
        {icon}
      </a>
    )
  }

  const { ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
      {icon}
    </button>
  )
}