import { BadgeCheck, Trophy, Users } from 'lucide-react'

import Container from '@/components/ui/Container'
import GlassCard from '@/components/ui/GlassCard'

const highlights = [
    {
        icon: BadgeCheck,
        title: 'Construido con obsesión por el detalle',
        description: 'Cada vista nació de la propia necesidad de Santiago por entender sus finanzas personales como emprendedor y creador de productos digitales.'
    },
    {
        icon: Users,
        title: 'Hecho para la comunidad latina',
        description: 'Monely nació en Pasto, Colombia, para personas que quieren una app moderna, en español y con procesos claros para organizar su dinero.'
    },
    {
        icon: Trophy,
        title: 'Aprendizaje continuo',
        description: 'El roadmap se nutre de feedback real: las nuevas funciones se priorizan con base en lo que la comunidad necesita para tomar mejores decisiones.'
    }
]

export default function AboutSection() {
    return (
        <section id="about" className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_transparent_60%)]" />
            <Container className="relative">
                <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
                    <div className="space-y-6">
                        <p className="text-sm font-semibold text-primary uppercase tracking-[0.4em]">Sobre nosotros</p>
                        <h2 className="text-4xl font-black leading-tight">
                            Monely es el proyecto personal de <span className="text-primary">Santiago Jojoa</span>
                        </h2>
                        <p className="text-text-dim">
                            Después de años construyendo productos y manejando múltiples fuentes de ingreso, Santiago necesitaba una herramienta más humana para seguir sus finanzas. No encontró nada que juntara claridad visual, automatización y un lenguaje cercano. Así nació Monely: una plataforma construida a mano, con cariño y obsesión por el diseño, para ayudarte a entender cada peso que entra y sale.
                        </p>
                        <p className="text-text-dim">
                            Nuestra misión es democratizar la educación financiera con software hermoso, accesible y 100% enfocado en la realidad de quienes viven en Latinoamérica. Creemos que tomar mejores decisiones de dinero empieza con datos claros y acompañamiento empático.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {highlights.map((item) => (
                            <GlassCard key={item.title} className="p-6 border border-dark-border/70">
                                <div className="flex items-start gap-4">
                                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <item.icon className="size-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                                        <p className="text-sm text-text-dim leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
