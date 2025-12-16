import { Plus, ArrowRightLeft, Receipt, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import GlassCard from "../ui/GlassCard";

export default function () {
    const actions = [
        {
            icon: Plus,
            label: 'Añadir transacción',
            href: '/transactions/new',
        },
        {
            icon: ArrowRightLeft,
            label: 'Transferencia',
            href: '/transfers',
        },
        {
            icon: Receipt,
            label: 'Pago de facturas',
            href: '/bills',
        },
        {
            icon: BarChart3,
            label: 'Reportes',
            href: '/reports',
        },
    ]
    return (
        <GlassCard className='p-6'>
            <h3 className='text-lg font-bold mb-4'>Acciones Rápidas</h3>
            <div className='grid grid-cols-2 gap-4'>
                {actions.map((action) => (
                    <Link
                        key={action.label}
                        to={action.href}
                        className='flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-dark-surface hover:bg-dark-elevated transition-all group border border-dark-border hover:border-primary/50'
                    >
                        <div className='p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 text-primary transition-colors'>
                            <action.icon className='size-5' />
                        </div>
                        <span className='text-sm font-semibold text-center'>{action.label}</span>
                    </Link>
                ))}
            </div>
        </GlassCard>
    )
}