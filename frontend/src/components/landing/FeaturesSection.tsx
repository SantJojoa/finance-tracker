import { RefreshCw, Brain, TrendingUp } from 'lucide-react'
import Container from '@/components/ui/Container'

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="group flex flex-col gap-6 rounded-xl border border-dark-border bg-dark-surface p-8 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5 backdrop-blur-xl">
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all text-white group-hover:text-dark-bg">
                {icon}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold leading-tight">
                    {title}
                </h4>
                <p className="text-text-dim text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default function FeaturesSection() {
    const features = [
        {
            icon: <RefreshCw className="size-7" />,
            title: 'Sincronización en tiempo real',
            description:
                'Registra tus transacciones desde la web, la app o Telegram. Todo se sincroniza automáticamente en tiempo real en todos tus dispositivos.'
        },
        {
            icon: <Brain className="size-7" />,
            title: 'Presupuesto inteligente',
            description:
                'Un asistente con inteligencia artificial que te ayuda a controlar tus finanzas, te alerta cuando estás por superar tus límites y te guía para ahorrar mejor.'
        },
        {
            icon: <TrendingUp className="size-7" />,
            title: 'Análisis financiero avanzado',
            description:
                'Visualiza la evolución de tus ingresos, gastos y patrimonio con gráficos claros, métricas clave y proyecciones inteligentes.'
        }
    ]


    return (
        <section className="w-full py-20 relative overflow-hidden" id="features">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <Container className="relative z-10">
                <div className="flex flex-col gap-12">
                    {/* Section Header */}
                    <div className="flex flex-col gap-4 text-center items-center">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">
                            Funciones
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-[720px]">
                            Funciones para una vida financiera moderna
                        </h2>
                        <p className="text-text-dim text-lg leading-normal max-w-[600px]">
                            Todo lo que necesitas para controlar tu vida financiera, envuelto en una interfaz hermosa.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}