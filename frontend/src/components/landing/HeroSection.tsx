import { ArrowRight, Play } from 'lucide-react'
import Button from '@/components/Button'
import Container from '@/components/ui/Container'

export default function HeroSection() {
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

                            <button className="group flex items-center justify-center gap-3 rounded-lg h-12 px-8 bg-dark-surface border border-dark-border hover:border-primary/50 transition-all text-base font-bold w-full sm:w-auto backdrop-blur-xl">
                                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                                    <Play className="size-5 text-primary group-hover:text-dark-bg transition-colors fill-current" />
                                </div>
                                <span>Ver Demo</span>
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
        </section>
    )
}