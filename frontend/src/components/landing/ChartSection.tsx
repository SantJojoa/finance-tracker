import { Check, ArrowUpRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import GlassCard from '@/components/ui/GlassCard'

export default function ChartSection() {
    return (
        <section className="w-full py-10 bg-dark-surface/20">
            <Container>
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left Content */}
                    <div className="flex-1 flex flex-col gap-6">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Diseña tu camino hacia la{' '}
                            <span className="text-primary">libertad financiera</span>
                        </h2>
                        <p className="text-text-dim text-lg leading-relaxed">
                            Tu dinero, sin suposiciones.
                            Descubre patrones, controla tus finanzas y encuentra oportunidades de crecimiento con visualizaciones claras e inteligentes.
                        </p>

                        {/* Feature List */}
                        <ul className="flex flex-col gap-3 mt-2">
                            <li className="flex items-center gap-3">
                                <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                    <Check className="size-3 text-primary" strokeWidth={3} />
                                </div>
                                <span className="text-base">Intervalos de tiempo personalizados</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                    <Check className="size-3 text-primary" strokeWidth={3} />
                                </div>
                                <span className="text-base">Detalle por categorías</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                    <Check className="size-3 text-primary" strokeWidth={3} />
                                </div>
                                <span className="text-base">Reportes exportables (PDF/CSV)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right Chart */}
                    <div className="flex-1 w-full">
                        <GlassCard className="p-6 sm:p-8" hover={false}>
                            {/* Chart Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-text-dim text-sm font-medium">Evolución del presupuesto</p>
                                    <p className="text-3xl font-bold mt-1">$124,500.00</p>
                                </div>
                                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                                    <ArrowUpRight className="size-4 text-primary" />
                                    <span className="text-primary text-sm font-bold">12.5%</span>
                                </div>
                            </div>

                            {/* Chart SVG */}
                            <div className="w-full h-[200px] sm:h-[250px] relative">
                                <svg
                                    className="w-full h-full overflow-visible"
                                    fill="none"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 478 150"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Gradient Fill */}
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear"
                                            x1="239"
                                            y1="0"
                                            x2="239"
                                            y2="150"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#2bee5b" stopOpacity="0.2" />
                                            <stop offset="1" stopColor="#2bee5b" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>

                                    {/* Area */}
                                    <path
                                        d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V150H0V109Z"
                                        fill="url(#paint0_linear)"
                                    />

                                    {/* Line */}
                                    <path
                                        d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                                        stroke="#2bee5b"
                                        strokeLinecap="round"
                                        strokeWidth="3"
                                    />

                                    {/* Interactive Point */}
                                    <circle
                                        cx="217.846"
                                        cy="61"
                                        r="6"
                                        fill="#0a0a0f"
                                        stroke="#2bee5b"
                                        strokeWidth="3"
                                    />

                                    {/* Tooltip */}
                                    <rect
                                        x="180"
                                        y="20"
                                        width="80"
                                        height="30"
                                        rx="4"
                                        fill="#2bee5b"
                                    />
                                    <text
                                        x="220"
                                        y="40"
                                        fill="#0a0a0f"
                                        fontSize="12"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        $84,320
                                    </text>
                                </svg>
                            </div>

                            {/* Chart Labels */}
                            <div className="flex justify-between mt-4 px-2">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                                    <p
                                        key={month}
                                        className={`text-xs font-bold uppercase tracking-wider ${index === 3 ? 'text-white' : 'text-text-dim'
                                            }`}
                                    >
                                        {month}
                                    </p>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </Container>
        </section>
    )
}