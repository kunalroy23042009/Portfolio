import { useReducedMotion } from '../../hooks/useReducedMotion'

interface WorkflowVisualizationProps {
  nodes: readonly string[]
  compact?: boolean
}

export function WorkflowVisualization({
  nodes,
  compact = false,
}: WorkflowVisualizationProps) {
  const reduced = useReducedMotion()

  return (
    <div
      className={`relative ${compact ? 'py-3' : 'py-6'}`}
      aria-label="Workflow visualization showing connected business systems"
      role="img"
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-signal/30 to-transparent" aria-hidden="true" />

      <ol className="relative flex flex-col gap-4">
        {nodes.map((node, index) => (
          <li key={node} className="relative flex items-center gap-4 group">
            <div
              className={`relative z-10 flex shrink-0 items-center justify-center rounded-xl border bg-void-panel font-mono text-xs text-paper transition-all duration-300 group-hover:border-signal/40 group-hover:bg-void-panel-hover ${
                compact ? 'h-10 min-w-[10rem] px-4' : 'h-12 min-w-[12rem] px-5'
              }`}
              style={
                !reduced
                  ? { animationDelay: `${index * 0.2}s` }
                  : undefined
              }
            >
              {!reduced && (
                <>
                  <span
                    className="absolute -inset-1 rounded-xl border border-signal/0"
                    style={{
                      animation: `flow-pulse 3s ease-in-out ${index * 0.2}s infinite`,
                      borderColor: 'rgba(74, 158, 255, 0.2)',
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -inset-2 rounded-xl border border-signal/0"
                    style={{
                      animation: `pulse-ring 2.5s ease-out ${index * 0.2}s infinite`,
                      borderColor: 'rgba(74, 158, 255, 0.3)',
                    }}
                    aria-hidden="true"
                  />
                </>
              )}
              <span className="relative z-10 whitespace-nowrap">{node}</span>
            </div>

            {index < nodes.length - 1 && (
              <div className="absolute left-[5rem] top-full flex h-4 w-px items-center justify-center md:left-[6rem]">
                <svg
                  width="2"
                  height="16"
                  viewBox="0 0 2 16"
                  className="text-signal/50"
                  aria-hidden="true"
                >
                  {!reduced && (
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      style={{
                        animation: `signal-travel 2.5s ease-in-out ${index * 0.2}s infinite`,
                      }}
                    />
                  )}
                  {reduced && (
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="16"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.4"
                    />
                  )}
                </svg>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}