import { type ReactNode } from 'react'

interface GlassCardProps {
    children: ReactNode
    className?: string
    hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
    return (
        <div
            className={`
        relative overflow-hidden
        backdrop-blur-xl
        bg-linear-to-br from-dark-surface/90 to-dark-elevated/90
        border border-dark-border
        rounded-xl
        shadow-lg
        transition-all duration-300
        ${hover ? 'hover:border-primary/50 hover:shadow-primary/10' : ''}
        ${className}
        `}
        >
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

            {children}
        </div>
    )
}