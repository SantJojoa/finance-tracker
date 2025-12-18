import { Check, Sparkles, Zap } from 'lucide-react'

import Button from '@/components/Button'
import Container from '@/components/ui/Container'
import GlassCard from '@/components/ui/GlassCard'

const plans = [
    {
        name: 'Free',
        price: '$0',
        tagline: 'Perfecto para validar Monely sin fricción',
        accent: 'from-dark-surface via-dark-elevated to-dark-surface',
        highlight: false,
        ctaLabel: 'Empieza hoy',
        ctaHref: '/register',
        icon: Zap,
        features: [
            'Crear hasta 10 categorías personalizadas',
            'Registra hasta 5 métodos de pago',
            'Configura hasta 5 presupuestos activos',
            'Bot de Telegram (10 mensajes al mes)'
        ]
    },
    {
        name: 'Pro',
        price: '$20',
        priceSuffix: '/trimestre',
        tagline: 'Todo ilimitado + automatización inteligente',
        accent: 'from-primary/20 via-purple-500/10 to-transparent',
        highlight: true,
        ctaLabel: 'Quiero Monely Pro',
        ctaHref: '/register',
        icon: Sparkles,
        features: [
            'Categorías, métodos y presupuestos ilimitados',
            'Bot de Telegram con consejos de IA sin límite',
            'Asistente de IA para optimizar tu dinero',
            'Descarga reportes en PDF y Excel',
            'Incluye todo lo del plan Free'
        ]
    }
]

export default function PricingSection() {
    return (
        <section id="pricing" className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_55%)]" />
            <Container className="relative">
                <div className="text-center space-y-4 mb-12">
                    <p className="text-sm font-semibold text-primary uppercase tracking-[0.4em]">Planes</p>
                    <h2 className="text-4xl font-black">Precios simples para crecer sin límites</h2>
                    <p className="text-text-dim max-w-2xl mx-auto">
                        Elige el plan que mejor se adapte a tu etapa. Siempre podrás cambiar cuando estés listo.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {plans.map((plan) => (
                        <GlassCard
                            key={plan.name}
                            className={`relative p-8 border border-dark-border/70 bg-gradient-to-br ${plan.accent} ${plan.highlight ? 'ring-2 ring-primary shadow-primary/20' : ''} flex flex-col h-full`}
                        >

                            <div className="flex items-center gap-4 mb-6">
                                <div className="size-12 rounded-2xl bg-dark-bg/40 flex items-center justify-center">
                                    <plan.icon className="size-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-text-dim">{plan.name}</p>
                                    <h3 className="text-3xl font-black">{plan.price}<span className="text-base font-semibold text-text-dim">{plan.priceSuffix}</span></h3>
                                </div>
                            </div>

                            <p className="text-text-dim text-sm mb-8">{plan.tagline}</p>

                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                        <div className="mt-1 rounded-full bg-primary/10 p-1">
                                            <Check className="size-4 text-primary" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.highlight ? 'primary' : 'secondary'}
                                size="lg"
                                className="w-full mt-auto"
                            >
                                <a href={plan.ctaHref}>{plan.ctaLabel}</a>
                            </Button>
                        </GlassCard>
                    ))}
                </div>
            </Container>
        </section>
    )
}
