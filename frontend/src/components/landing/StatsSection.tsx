import { TrendingUp, Users, Zap } from 'lucide-react'
import Container from '@/components/ui/Container'
import GlassCard from '@/components/ui/GlassCard'

interface StatCardProps {
    icon: React.ReactNode
    label: string
    value: string
    change: string
}

function StatCard({ icon, label, value, change }: StatCardProps) {
    return (
        <GlassCard className="flex-1 min-w-[250px] p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="text-primary">
                    {icon}
                </div>
                <p className="text-text-dim text-sm font-medium uppercase tracking-wider">
                    {label}
                </p>
            </div>
            <div className="flex items-end gap-3">
                <p className="text-3xl font-bold tracking-tight">
                    {value}
                </p>
                <span className="text-primary text-sm font-bold bg-primary/10 px-2 py-0.5 rounded-full mb-1">
                    {change}
                </span>
            </div>
        </GlassCard>
    )
}

export default function StatsSection() {
    const stats = [
        {
            icon: <TrendingUp className="size-6" />,
            label: 'Activos Gestionados',
            value: '$50M+',
            change: '+15%'
        },
        {
            icon: <Users className="size-6" />,
            label: 'Usuarios Satisfechos',
            value: '10,000+',
            change: '+20%'
        },
        {
            icon: <Zap className="size-6" />,
            label: 'Tiempo ahorrado',
            value: '99.9%',
            change: '+0.1%'
        }
    ]

    return (
        <section className="w-full py-10 bg-dark-surface/30 border-y border-dark-border">
            <Container>
                <div className="flex flex-wrap gap-6 justify-center">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </Container>
        </section>
    )
}