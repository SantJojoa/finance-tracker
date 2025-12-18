import { useState } from 'react'
import { ArrowLeft, ArrowRight, Play, Layers, CreditCard, Receipt, Target, Bot, Sparkles } from 'lucide-react'

import Button from '@/components/Button'
import Container from '@/components/ui/Container'
import { Link } from 'react-router-dom'
import Modal from '@/components/ui/Modal'
import GlassCard from '@/components/ui/GlassCard'

export default function HeroSection() {
    const demoFeatures = [
        {
            key: 'categories',
            icon: Layers,

            title: 'Crea categorías inteligentes',
            description: 'Organiza tus gastos e ingresos con colores, íconos y reglas personalizadas para verlo todo de un vistazo.',
            accent: 'text-primary',
        },
        {
            key: 'payments',
            icon: CreditCard,
            title: 'Gestiona métodos de pago',
            description: 'Registra tarjetas, efectivo o billeteras digitales y asigna cada transacción a su origen real.',
            accent: 'text-emerald-400',
        },
        {
            key: 'transactions',
            icon: Receipt,
            title: 'Registra transacciones con contexto',
            description: 'Añade ingresos y gastos con etiquetas, notas y cuentas vinculadas en segundos.',
            accent: 'text-amber-300',
        },
        {
            key: 'budgets',
            icon: Target,
            title: 'Crea presupuestos visuales',
            description: 'Define límites mensuales y ve el progreso en tiempo real antes de excederte.',
            accent: 'text-rose-400',
        },
        {
            key: 'telegram',
            icon: Bot,
            title: 'Bot de Telegram',
            description: 'Envía un mensaje rápido al bot y registra transacciones sin abrir la app.',
            accent: 'text-sky-400',
        },
        {
            key: 'ai',
            icon: Sparkles,
            title: 'Agente IA (Pro)',
            description: 'Recibe consejos personalizados para optimizar tus finanzas y detectar patrones.',
            accent: 'text-purple-400',
        },
    ]
    const [isDemoOpen, setIsDemoOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    const activeFeature = demoFeatures[activeIndex]

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? demoFeatures.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev === demoFeatures.length - 1 ? 0 : prev + 1))
    }

    const renderExample = (featureKey: string) => {
        switch (featureKey) {
            case 'categories':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-dim">Panel de categorías</p>
                                <h4 className="text-xl font-bold">Tus etiquetas a color</h4>
                            </div>
                            <span className="text-xs text-text-dim">Vista ficticia</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                { icon: '🍔', name: 'Foodies', color: '#ef4444', amount: '-$320' },
                                { icon: '🚗', name: 'Movilidad', color: '#f97316', amount: '-$140' },
                                { icon: '🏠', name: 'Renta', color: '#a855f7', amount: '-$750' },
                                { icon: '💡', name: 'Servicios', color: '#22d3ee', amount: '-$90' },
                                { icon: '💼', name: 'Sueldo', color: '#22c55e', amount: '+$2,500' },
                                { icon: '🎯', name: 'Side Hustle', color: '#facc15', amount: '+$640' },
                            ].map((cat) => (
                                <div
                                    key={cat.name}
                                    className="rounded-xl p-4 border border-dark-border/70 bg-dark-elevated/60 flex flex-col gap-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-10 rounded-lg flex items-center justify-center text-xl"
                                            style={{ backgroundColor: `${cat.color}22` }}
                                        >
                                            {cat.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-dim">Categoría</p>
                                            <p className="font-semibold">{cat.name}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-bold">{cat.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case 'payments':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-dim">Manejo de métodos</p>
                                <h4 className="text-xl font-bold">Tarjetas y cuentas</h4>
                            </div>
                            <span className="text-xs text-text-dim">Vista ficticia</span>
                        </div>
                        <div className="grid gap-3">
                            {[
                                { name: 'Visa Black **** 9821', type: 'Tarjeta crédito', balance: '$4,200', color: 'from-purple-500/20 to-purple-500/5' },
                                { name: 'Billetera Digital NovaPay', type: 'Wallet', balance: '$860', color: 'from-sky-500/20 to-sky-500/5' },
                                { name: 'Efectivo', type: 'Cash', balance: '$120', color: 'from-emerald-500/20 to-emerald-500/5' },
                            ].map((method) => (
                                <div
                                    key={method.name}
                                    className={`rounded-2xl p-4 border border-dark-border/70 bg-gradient-to-r ${method.color}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-text-dim">{method.type}</p>
                                            <p className="font-semibold">{method.name}</p>
                                        </div>
                                        <p className="text-2xl font-black">{method.balance}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case 'transactions':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-dim">Timeline</p>
                                <h4 className="text-xl font-bold">Historial enriquecido</h4>
                            </div>
                            <span className="text-xs text-text-dim">Vista ficticia</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { icon: '🍣', desc: 'Cena japonesa', category: 'Foodies', amount: '-$48.90', method: 'Visa Black', date: 'Hoy · 7:32 PM' },
                                { icon: '🏋️', desc: 'Membresía gym', category: 'Bienestar', amount: '-$35.00', method: 'Nequi', date: 'Ayer · 6:10 PM' },
                                { icon: '💼', desc: 'Pago freelance UX', category: 'Ingreso', amount: '+$980.00', method: 'Débito Bancolombia', date: 'Hace 2 días · 11:00 AM' },
                            ].map((tx) => (
                                <div key={tx.desc} className="flex items-center justify-between rounded-xl border border-dark-border/60 bg-dark-elevated/60 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                                            {tx.icon}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{tx.desc}</p>
                                            <p className="text-xs text-text-dim">{tx.category} · {tx.method}</p>
                                            <p className="text-[11px] text-text-dim/70">{tx.date}</p>
                                        </div>
                                    </div>
                                    <p className={`text-lg font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {tx.amount}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case 'budgets':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-dim">Control proactivo</p>
                                <h4 className="text-xl font-bold">Presupuestos mensuales</h4>
                            </div>
                            <span className="text-xs text-text-dim">Vista ficticia</span>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: 'Comida', spent: 420, limit: 600, color: 'bg-orange-400' },
                                { name: 'Transporte', spent: 180, limit: 250, color: 'bg-sky-400' },
                                { name: 'Entretenimiento', spent: 90, limit: 200, color: 'bg-fuchsia-400' },
                            ].map((budget) => {
                                const progress = Math.min((budget.spent / budget.limit) * 100, 100)
                                return (
                                    <div key={budget.name} className="rounded-2xl border border-dark-border/70 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-text-dim">{budget.name}</p>
                                                <p className="text-lg font-bold">${budget.spent.toFixed(2)} / ${budget.limit}</p>
                                            </div>
                                            <span className="text-sm font-medium text-text-dim">{progress.toFixed(0)}%</span>
                                        </div>
                                        <div className="mt-3 h-2 w-full rounded-full bg-dark-elevated overflow-hidden">
                                            <div
                                                className={`${budget.color} h-full rounded-full transition-all`}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            case 'telegram':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-dim">Bot Telegram</p>
                                <h4 className="text-xl font-bold">@MonelyBot</h4>
                            </div>
                            <span className="text-xs text-text-dim">Simulación</span>
                        </div>
                        <div className="rounded-2xl border border-dark-border/60 bg-dark-elevated/60 p-4 space-y-3">
                            <div className="flex flex-col gap-2">
                                <div className="self-start max-w-[80%] rounded-2xl rounded-bl-sm bg-dark-bg/80 px-4 py-2 text-sm">
                                    Hola Bot, registra “$12 café Starbucks con Visa”.
                                </div>
                                <div className="self-end max-w-[80%] rounded-2xl rounded-br-sm bg-primary/20 px-4 py-2 text-sm">
                                    ✅ Café registrado en categoría “Foodies” con Visa Black. ¿Agregar nota?
                                </div>
                                <div className="self-start max-w-[80%] rounded-2xl rounded-bl-sm bg-dark-bg/80 px-4 py-2 text-sm">
                                    Añade nota “reunión con cliente”.
                                </div>
                                <div className="self-end max-w-[80%] rounded-2xl rounded-br-sm bg-primary/20 px-4 py-2 text-sm">
                                    ☕️ Perfecto. Todo listo y sincronizado.
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 'ai':
            default:
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-dim">Agente financiero</p>
                                <h4 className="text-xl font-bold">Insights impulsados por IA</h4>
                            </div>
                            <span className="text-xs text-text-dim">Vista ficticia</span>
                        </div>
                        <div className="rounded-2xl border border-dark-border/60 bg-gradient-to-br from-purple-500/10 via-dark-elevated to-dark-bg p-5 space-y-3">
                            <p className="text-sm text-text-dim uppercase tracking-[0.2em]">Resumen semanal</p>
                            <h5 className="text-2xl font-black">Tu ahorro podría crecer 18% este mes 👇</h5>
                            <ul className="space-y-2 text-sm text-text-dim">
                                <li>• Gastaste $120 menos en “Foodies” vs semana pasada. Mantén ese ritmo.</li>
                                <li>• Transfiere $200 desde “Entretenimiento” a tu objetivo “Viaje Japón”.</li>
                                <li>• Configura un presupuesto automático para “Movilidad” antes del día 10.</li>
                            </ul>
                            <div className="rounded-xl border border-purple-400/30 bg-purple-400/10 px-4 py-3 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-200">Siguiente paso sugerido</p>
                                    <p className="font-semibold">Activa alertas predictivas 📡</p>
                                </div>
                                <button className="text-sm font-bold text-white/80 hover:text-white transition-colors">
                                    Activar →
                                </button>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <section className="w-full py-12 md:py-20 relative overflow-hidden">
            {/* Background decorative gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <Container>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center relative z-10">
                    {/* Hero Content */}
                    <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 w-fit mx-auto lg:mx-0 rounded-full bg-dark-surface border border-dark-border px-3 py-1 text-xs font-medium text-primary backdrop-blur-xl">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            Version Beta en desarrollo
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
                            Controla Tu Dinero Con{' '}
                            <span className="text-primary">Precision</span>.
                        </h1>

                        {/* Subheading */}
                        <p className="text-text-dim text-base sm:text-lg leading-relaxed max-w-[540px] mx-auto lg:mx-0">
                            La plataforma todo en uno para seguir, presupuestar y hacer crecer tu dinero en tiempo real.
                            Únete a miles que ya están tomando el control de sus finanzas hoy mismo.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                            <Link to='/register'>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full sm:w-auto"
                                >

                                    <span className="flex items-center gap-2">
                                        Empieza Gratis
                                        <ArrowRight className="size-5" />
                                    </span>
                                </Button>
                            </Link>

                            <button
                                onClick={() => setIsDemoOpen(true)}
                                className="group flex items-center justify-center gap-3 rounded-lg h-12 px-8 bg-dark-surface border border-dark-border hover:border-primary/50 transition-all text-base font-bold w-full sm:w-auto backdrop-blur-xl"
                            >
                                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                                    <Play className="size-5 text-primary group-hover:text-dark-bg transition-colors fill-current" />
                                </div>
                                <span>Mira como funciona</span>
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-4 text-sm text-text-dim pt-4 justify-center lg:justify-start">
                            <div className="flex -space-x-2">
                                <div
                                    className="w-8 h-8 rounded-full border-2 border-dark-bg bg-gradient-to-br from-blue-500 to-purple-600"
                                    title="User 1"
                                />
                                <div
                                    className="w-8 h-8 rounded-full border-2 border-dark-bg bg-gradient-to-br from-green-500 to-emerald-600"
                                    title="User 2"
                                />
                                <div
                                    className="w-8 h-8 rounded-full border-2 border-dark-bg bg-gradient-to-br from-pink-500 to-rose-600"
                                    title="User 3"
                                />
                                <div
                                    className="w-8 h-8 rounded-full border-2 border-dark-bg bg-gradient-to-br from-yellow-500 to-orange-600"
                                    title="User 4"
                                />
                            </div>
                            <p>
                                Usado por <span className="text-white font-semibold">10,000+</span> usuarios
                            </p>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex-1 w-full max-w-[600px] relative group">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000" />

                        {/* Image container with glass effect */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-dark-border bg-dark-surface backdrop-blur-xl shadow-2xl">
                            {/* Placeholder for dashboard image */}
                            <div className="w-full h-full bg-gradient-to-br from-dark-surface via-dark-elevated to-dark-surface flex items-center justify-center">
                                {/* You can replace this with an actual dashboard screenshot */}
                                <div className="text-center space-y-4 p-8">
                                    <div className="size-20 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                                        <svg
                                            className="size-12 text-primary"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xl font-bold">Vista de Dashboard</p>
                                        <p className="text-sm text-text-dim">
                                            Estadísticas en la palma de tu mano
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Glass overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 via-transparent to-transparent pointer-events-none" />

                            {/* Top glass reflection */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </Container>

            <Modal
                isOpen={isDemoOpen}
                onClose={() => setIsDemoOpen(false)}
                title="Así te ayudamos a dominar tus finanzas"
                size="xl"
            >
                <GlassCard className="p-6 border border-primary/30 bg-dark-surface/80 backdrop-blur space-y-5">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <activeFeature.icon className={`size-6 ${activeFeature.accent}`} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-text-dim">Función</p>
                                <h3 className="text-2xl font-black">{activeFeature.title}</h3>
                            </div>
                        </div>
                        <p className="text-sm text-text-dim leading-relaxed">
                            {activeFeature.description}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-dark-border/60 bg-dark-elevated/60 p-5">
                        {renderExample(activeFeature.key)}
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handlePrev}
                                className="inline-flex items-center gap-2 rounded-full border border-dark-border px-4 py-2 text-sm font-semibold hover:border-primary/50 transition-colors"
                            >
                                <ArrowLeft className="size-4" />
                                Anterior
                            </button>
                            <span className="text-xs text-text-dim uppercase tracking-[0.4em]">
                                {String(activeIndex + 1).padStart(2, '0')} / {String(demoFeatures.length).padStart(2, '0')}
                            </span>
                            <button
                                onClick={handleNext}
                                className="inline-flex items-center gap-2 rounded-full border border-dark-border px-4 py-2 text-sm font-semibold hover:border-primary/50 transition-colors"
                            >
                                Siguiente
                                <ArrowRight className="size-4" />
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            {demoFeatures.map((feature, index) => (
                                <button
                                    key={feature.key}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 rounded-full transition-all ${index === activeIndex
                                        ? 'bg-primary w-8'
                                        : 'bg-dark-border w-2 hover:bg-primary/60'
                                        }`}
                                    aria-label={`Ver demo de ${feature.title}`}
                                />
                            ))}
                        </div>
                    </div>
                </GlassCard>

                <div className="mt-6 flex flex-col gap-3 text-sm text-text-dim">
                    <p className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary animate-pulse" />
                        Todas las funciones se muestran con datos ficticios sólo para explicar cómo
                        funciona la app.
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary animate-pulse" />
                        No necesitas conectar cuentas reales para probar la demo.
                    </p>
                </div>
            </Modal>
        </section>
    )
}