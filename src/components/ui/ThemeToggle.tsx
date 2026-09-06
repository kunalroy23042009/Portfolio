import { useTheme } from '../../context/useTheme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Theme selection">
      {(['dark', 'light', 'system'] as const).map((t) => (
        <button
          key={t}
          type="button"
          className={`relative px-3 py-1.5 rounded-full text-xs font-medium font-mono uppercase tracking-wider transition-all duration-200 ${
            theme === t
              ? 'bg-terracotta text-paper shadow-[0_4px_16px_-4px_rgba(196,69,54,0.4)]'
              : 'bg-ink-light text-warm-gray hover:bg-warm-border hover:text-paper'
          }`}
          onClick={() => setTheme(t)}
          aria-pressed={theme === t}
        >
          {t === 'dark' && '🌙'}
          {t === 'light' && '☀️'}
          {t === 'system' && '💻'}
        </button>
      ))}
    </div>
  );
}