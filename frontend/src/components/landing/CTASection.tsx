import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/Button'
import { Link } from 'react-router-dom'

export default function CTASection() {
    return (
        <section className="w-full py-24 relative overflow-hidden">
            {/* Background decorative gradients */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

            <Container>
                <div className="flex flex-col items-center text-center max-w-[800px] mx-auto gap-8 relative z-10">
                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-black leading-tight">
                        ¿Listo para tomar el control?
                    </h2>

                    {/* Description */}
                    <p className="text-text-dim text-lg leading-relaxed">
                        Únete a Monely hoy y empieza a construir el futuro que deseas. No necesitas tarjeta de crédito para la prueba gratuita de 14 dias.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-4">
                        {/* Primary CTA with glow effect */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-primary rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-300 animate-pulse-slow" />
                            <Link to="/register">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="relative w-full sm:w-auto min-w-[200px]"
                                >
                                    <span className="flex items-center gap-2">
                                        Comienza Ahora
                                        <ArrowRight className="size-5" />
                                    </span>
                                </Button>
                            </Link>
                        </div>

                        {/* Secondary CTA */}

                    </div>

                    {/* Trust badges / Features */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-text-dim">
                        <div className="flex items-center gap-2">
                            <svg className="size-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Prueba de 14 días</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <svg className="size-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>No necesitas tarjeta de crédito</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <svg className="size-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Cancela en cualquier momento</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}