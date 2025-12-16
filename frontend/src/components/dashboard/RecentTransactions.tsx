import { Link } from 'react-router-dom'
import GlassCard from "../ui/GlassCard";

interface Transaction {
    id: string
    description: string
    category: {
        name: string
        icon?: string
        color?: string
    }
    amount: number
    type: 'income' | 'expense'
    date: string
    status?: string
}

interface RecentTransactionsProps {
    transactions: Transaction[]
}

const getIconForCategory = (categoryName: string) => {
    const icons: Record<string, any> = {
        'Entretenimiento': '🎬',
        'Ingreso': '💼',
        'Gastos': '🛒',
        'Transporte': '⛽',
        'Alimentos': '🍔',
        'Compras': '🛍️',
        'Facturas': '📄',
    }
    return icons[categoryName] || '💰'
}
export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    const formatAmount = (amount: number, type: 'income' | 'expense') => {
        const formatted = `$${amount.toFixed(2)}`
        return type === 'income' ? `+${formatted}` : `-${formatted}`
    }

    return (
        <GlassCard className='overflow-hidden'>
            <div className='flex items-center justify-between px-6 py-5 border-b border-dark-border'>
                <h2 className='text-lg font-bold'>Transacciones Recientes</h2>
                <Link to="/transactions" className="text-primary text-sm font-bold hover:underline">
                    Ver todas
                </Link>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full text-left'>
                    <thead>
                        <tr className='bg-dark-surface/50 text-text-dim text-xs uppercase tracking-wider'>
                            <th className='px-6 py-4 font-semibold'>Transacción</th>
                            <th className='px-6 py-4 font-semibold'>Categoría</th>
                            <th className='px-6 py-4 font-semibold'>Fecha</th>
                            <th className='px-6 py-4 font-semibold text-right'>Monto</th>
                            <th className='px-6 py-4 font-semibold text-center'>Estado</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-dark-border'>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className='px-6 py-12 text-center text-text-dim'>
                                    Aun no hay transacciones. Comienza añadiendo tu primera transacción!
                                </td>
                            </tr>
                        ) : (
                            transactions.map((transaction) => (
                                <tr
                                    key={transaction.id}
                                    className='hover:bg-dark-surface/30 transition-colors group:'
                                >
                                    <td className='px-3 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <div className={`flex items-center justify-center size-10 rounded-full ${transaction.type === 'income'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-red-500/10 text-red-500'
                                                }`}>
                                                <span className='text-lg'>
                                                    {transaction.category.icon || getIconForCategory(transaction.category.name)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className='font-bold text-sm'>{transaction.description || 'Sin descripcion'}</p>
                                                <p className="text-text-dim text-xs">{transaction.category.name}</p>

                                            </div>
                                        </div>
                                    </td>

                                    <td className='px-6 py-4 text-text-dim text-sm'>
                                        {transaction.category.name}
                                    </td>

                                    <td className='px-6 py-4 text-text-dim text-sm'>
                                        {formatDate(transaction.date)}
                                    </td>

                                    <td className={`px-6 py-4 text-right font-bold text-sm ${transaction.type === 'income' ? 'text-green-500' : 'text-white'
                                        }`}>
                                        {formatAmount(transaction.amount, transaction.type)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'Pending'
                                            ? 'bg-yellow-500/10 text-yellow-500'
                                            : 'bg-green-500/10 text-green-500'
                                            }`}>
                                            {transaction.status || 'Completado'}
                                        </span>
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </GlassCard>
    )
}