interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <header className={`mb-12 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-terracotta">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-medium tracking-tight text-paper md:text-4xl" style={{ fontWeight: 500 }}>
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-warm-gray md:text-lg">
          {description}
        </p>
      )}
    </header>
  )
}