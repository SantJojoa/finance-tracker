import { type LucideIcon } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

interface StatCardProps {
    title: string
    value: string
    change?: number
    icon: LucideIcon
    iconColor?: string
    isPositive?: boolean
    isGoal?: boolean
    goalProgress?: number
}

export default function StatCard({
    title,
    value,
    change,
    icon: Icon,
    iconColor = 'text-primary',
    isPositive = true,
    isGoal = false,
    goalProgress,
}: StatCardProps) {
    return (
        <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
                <p className="text-text-dim text-xs font-bold uppercase tracking-wider">
                    {title}
                </p>
                <Icon className={`size-5 ${iconColor}`} />
            </div>

            <p className="text-3xl font-bold mb-2">{value}</p>

            {isGoal && goalProgress !== undefined ? (
                <>
                    <div className="w-full bg-dark-border rounded-full h-2 mb-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${goalProgress}%` }}
                        />
                    </div>
                    <p className="text-text-dim text-xs">
                        {goalProgress}% del objetivo
                    </p>
                </>
            ) : change !== undefined ? (
                <div className="flex items-center gap-1">
                    <svg
                        className={`size-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isPositive ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        )}
                    </svg>
                    <p className={`text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{change}%
                    </p>
                    <span className="text-text-dim text-xs ml-1">vs mes anterior</span>
                </div>
            ) : null}
        </GlassCard>
    )
}