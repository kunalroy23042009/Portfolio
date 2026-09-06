import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useEffect, useRef, useState } from 'react'

interface Node {
  id: string
  label: string
  x: number
  y: number
  type: 'trigger' | 'process' | 'action' | 'notify'
}

const nodes: Node[] = [
  { id: 'form', label: 'Form Submit', x: 10, y: 20, type: 'trigger' },
  { id: 'qualify', label: 'AI Qualify', x: 50, y: 15, type: 'process' },
  { id: 'crm', label: 'CRM', x: 50, y: 50, type: 'action' },
  { id: 'whatsapp', label: 'WhatsApp', x: 90, y: 15, type: 'notify' },
  { id: 'email', label: 'Email', x: 90, y: 50, type: 'notify' },
  { id: 'slack', label: 'Slack Alert', x: 70, y: 80, type: 'notify' },
  { id: 'analytics', label: 'Analytics', x: 30, y: 80, type: 'action' },
]

const edges = [
  { from: 'form', to: 'qualify' },
  { from: 'form', to: 'crm' },
  { from: 'qualify', to: 'whatsapp' },
  { from: 'qualify', to: 'email' },
  { from: 'crm', to: 'slack' },
  { from: 'crm', to: 'analytics' },
  { from: 'whatsapp', to: 'analytics' },
  { from: 'email', to: 'analytics' },
]

const typeColors = {
  trigger: { main: '#c44536', glow: 'rgba(196,69,54,0.4)', label: '#c44536' },
  process: { main: '#6b8e7a', glow: 'rgba(107,142,122,0.4)', label: '#8ab998' },
  action: { main: '#6b8e7a', glow: 'rgba(107,142,122,0.4)', label: '#8ab998' },
  notify: { main: '#d4a574', glow: 'rgba(212,165,116,0.4)', label: '#e8c49a' },
}

export function FlowVisualization() {
  const reduced = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [activePath, setActivePath] = useState<number | null>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (reduced) return
    let current = 0
    const paths = edges.map((_, i) => i)
    const interval = setInterval(() => {
      setActivePath(paths[current])
      current = (current + 1) % paths.length
    }, 2200)
    return () => clearInterval(interval)
  }, [reduced])

  const getNodePos = (id: string) => {
    const node = nodes.find(n => n.id === id)
    if (!node || !dimensions.width) return { x: 0, y: 0 }
    return {
      x: (node.x / 100) * dimensions.width,
      y: (node.y / 100) * dimensions.height,
    }
  }

  const drawPath = (fromId: string, toId: string, index: number) => {
    const from = getNodePos(fromId)
    const to = getNodePos(toId)
    const isActive = activePath === index && !reduced

    const midX = (from.x + to.x) / 2
    const midY = (from.y + to.y) / 2
    const dx = to.x - from.x
    const dy = to.y - from.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const offset = Math.min(distance * 0.25, 35)
    const controlX = midX + (dy / distance) * offset
    const controlY = midY - (dx / distance) * offset

    const pathLength = distance * 1.2

    return (
      <path
        key={`${fromId}-${toId}`}
        d={`M${from.x},${from.y} Q${controlX},${controlY} ${to.x},${to.y}`}
        stroke={isActive ? '#c44536' : 'rgba(26,24,22,0.08)'}
        strokeWidth={isActive ? 2.5 : 1}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={isActive ? `${pathLength * 0.3} ${pathLength * 0.4}` : 'none'}
        style={{
          filter: isActive ? 'drop-shadow(0 0 8px rgba(196,69,54,0.5))' : 'none',
          transition: 'all 0.4s ease',
        }}
        markerEnd={isActive ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
        className={isActive && !reduced ? 'path-flow' : ''}
      />
    )
  }

  return (
    <div className="relative aspect-[4/3] min-h-[320px] md:min-h-[400px] lg:min-h-[480px]">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
        aria-label="Automation system flow visualization"
        role="img"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,7 L9,3.5 Z" fill="rgba(26,24,22,0.12)" />
          </marker>
          <marker
            id="arrowhead-active"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,7 L9,3.5 Z" fill="#c44536" />
          </marker>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style dangerouslySetInnerHTML={{
          __html: `
            .path-flow { animation: dash-flow 1.5s linear infinite; }
            @keyframes dash-flow { to { stroke-dashoffset: -80; } }
            .node-group:hover .node-bg { stroke: rgba(196,69,54,0.6); stroke-width: 1.5; }
            .node-dot { transform-origin: center; animation: pulse-soft 2.5s ease-out infinite; }
            .node-label { font-family: var(--font-mono), monospace; pointer-events: none; }
          `
        }} />

        <g className="edges">
          {edges.map((edge, i) => drawPath(edge.from, edge.to, i))}
        </g>

        <g className="nodes">
          {nodes.map((node, nodeIndex) => {
            const colors = typeColors[node.type]
            const pos = getNodePos(node.id)
            const isNodeActive = edges.some(
              (e, i) => (e.from === node.id || e.to === node.id) && activePath === i
            ) && !reduced

            const labelParts = node.label.split(' ')

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="node-group"
                style={{ filter: isNodeActive ? 'url(#glow)' : 'none' }}
              >
                <circle
                  r="22"
                  fill={isNodeActive ? 'rgba(196,69,54,0.12)' : 'rgba(26,24,22,0.02)'}
                  stroke={isNodeActive ? colors.main : 'rgba(26,24,22,0.1)'}
                  strokeWidth={isNodeActive ? 2 : 1}
                  className="node-bg transition-all duration-300"
                />
                <circle
                  r="6"
                  fill={colors.main}
                  className="node-dot"
                  style={{
                    animationDelay: `${nodeIndex * 0.15}s`,
                    animationDuration: reduced ? '0.01ms' : '2.5s',
                  }}
                />
                <text
                  x="0"
                  y="36"
                  textAnchor="middle"
                  className="node-label"
                  style={{ fontSize: '9px', lineHeight: '1.1' }}
                >
                  <tspan x="0" dy="0" fill={colors.label} fontWeight="500">
                    {labelParts[0]}
                  </tspan>
                  {labelParts[1] && (
                    <tspan x="0" dy="10" fill="rgba(250,248,245,0.35)">
                      {labelParts[1]}
                    </tspan>
                  )}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}