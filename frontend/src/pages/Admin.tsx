import { Link } from 'react-router-dom'
import { FolderCog, CreditCard, ShieldCheck, Sparkles } from 'lucide-react'

import Container from '@/components/ui/Container'
import GlassCard from '@/components/ui/GlassCard'

const adminSections = [
    {
        title: 'Categorías',
        description: 'Configura categorías de ingresos y gastos para mantener tus finanzas organizadas.',
        href: '/categories',
        icon: FolderCog,
        accent: 'from-pink-500/30 via-purple-500/10 to-transparent',
        chips: ['Personaliza íconos', 'Tipos ingreso/gasto'],
    },
    {
        title: 'Métodos de Pago',
        description: 'Administra tarjetas, cuentas y billeteras que podrás usar al registrar transacciones.',
        href: '/payment-methods',
        icon: CreditCard,
        accent: 'from-sky-500/30 via-cyan-500/10 to-transparent',
        chips: ['Tarjetas', 'Billeteras', 'Efectivo'],
    },
    {
        title: 'Próximamente',
        description: 'Muy pronto podrás gestionar cuentas bancarias, usuarios y reglas inteligentes.',
        icon: ShieldCheck,
        accent: 'from-emerald-500/20 via-primary/5 to-transparent',
        chips: ['Cuentas', 'Automatizaciones'],
        comingSoon: true,
    },
] as const

export default function Admin() {
    return (
        <div className="py-10">
            <Container className="max-w-[1300px] space-y-10">
                <div className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-primary/80 font-semibold">Panel</p>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <div className="max-w-3xl space-y-4">
                            <h1 className="text-4xl md:text-5xl font-black">Centro de Administración</h1>
                            <p className="text-text-dim text-lg">
                                Accede a las configuraciones clave de Monely. Empieza gestionando categorías y métodos de pago;
                                pronto podrás sumar más módulos a este hub administrativo.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-dark-border/60 px-5 py-2 text-sm text-text-dim">
                            <Sparkles className="size-4 text-primary" />
                            Configura tu sistema en minutos
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminSections.map((section) => {
                        const Icon = section.icon
                        const CardContent = (
                            <GlassCard
                                key={section.title}
                                className={`p-6 relative overflow-hidden`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${section.accent} pointer-events-none`} />

                                <div className="relative flex flex-col h-full gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-2xl bg-black/30 flex items-center justify-center border border-white/5">
                                            <Icon className="size-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-primary/80 font-semibold">Módulo</p>
                                            <h2 className="text-2xl font-bold">{section.title}</h2>
                                        </div>
                                    </div>

                                    <p className="text-text-dim flex-1">{section.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {section.chips.map((chip) => (
                                            <span
                                                key={chip}
                                                className="text-xs uppercase tracking-wide bg-white/5 border border-white/10 rounded-full px-3 py-1 text-text-dim"
                                            >
                                                {chip}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-2">
                                        <span className="inline-flex items-center text-sm font-semibold text-primary gap-2">
                                            Explorar
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="size-4"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </span>

                                    </div>
                                </div>
                            </GlassCard>
                        )


                        return (
                            <Link key={section.title} to={''} className="group">
                                {CardContent}
                            </Link>
                        )
                    })}
                </div>
            </Container>
        </div>
    )
}
