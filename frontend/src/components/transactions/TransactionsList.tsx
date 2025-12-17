import { Pencil, Trash2 } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

interface Transaction {
    id: string
    amount: number
    type: 'income' | 'expense'
    description?: string
    date: string
    category: {
        name: string
        icon?: string
        color?: string
    }
    paymentMethod: {
        name: string
    }
    account?: {
        name: string
    }
}

interface TransactionListProps {
    transactions: Transaction[]
    onEdit: (transaction: Transaction) => void
    onDelete: (id: string) => void
    loading?: boolean
}

export default function TransactionList({
    transactions,
    onEdit,
    onDelete,
    loading,
}: TransactionListProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    const formatAmount = (amount: number, type: 'income' | 'expense') => {
        const formatted = `$${amount.toFixed(2)}`
        return type === 'income' ? `+${formatted}` : `-${formatted}`
    }

    if (loading) {
        return (
            <GlassCard className="p-8">
                <div className="flex items-center justify-center">
                    <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-text-dim">Cargando transacciones...</span>
                </div>
            </GlassCard>
        )
    }

    if (transactions.length === 0) {
        return (
            <GlassCard className="p-12">
                <div className="text-center">
                    <div className="size-16 mx-auto mb-4 rounded-full bg-dark-surface flex items-center justify-center">
                        <span className="text-3xl">💸</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">No se encontraron transacciones</h3>
                    <p className="text-text-dim mb-6">
                        Empieza a agregar tus primeras transacciones o ajusta tus filtros.
                    </p>
                </div>
            </GlassCard>
        )
    }

    return (
        <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-dark-surface/50 text-text-dim text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Transacción</th>
                            <th className="px-6 py-4 font-semibold">Categoría</th>
                            <th className="px-6 py-4 font-semibold">Método de pago</th>
                            <th className="px-6 py-4 font-semibold">Fecha</th>
                            <th className="px-6 py-4 font-semibold text-right">Cantidad</th>
                            <th className="px-6 py-4 font-semibold text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-border">
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="hover:bg-dark-surface/30 transition-colors group"
                            >
                                {/* Transaction */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex items-center justify-center size-10 rounded-full ${transaction.type === 'income'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-red-500/10 text-red-500'
                                                }`}
                                        >
                                            <span className="text-lg">
                                                {transaction.category.icon || '💰'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">
                                                {transaction.description || 'Sin descripción'}
                                            </p>
                                            <p className="text-text-dim text-xs">
                                                {transaction.account?.name || 'Sin cuenta'}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-dark-surface border border-dark-border text-sm">
                                        {transaction.category.icon && (
                                            <span>{transaction.category.icon}</span>
                                        )}
                                        {transaction.category.name}
                                    </span>
                                </td>

                                {/* Payment Method */}
                                <td className="px-6 py-4 text-text-dim text-sm">
                                    {transaction.paymentMethod.name}
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4 text-text-dim text-sm">
                                    {formatDate(transaction.date)}
                                </td>

                                {/* Amount */}
                                <td
                                    className={`px-6 py-4 text-right font-bold text-sm ${transaction.type === 'income'
                                        ? 'text-green-500'
                                        : 'text-white'
                                        }`}
                                >
                                    {formatAmount(transaction.amount, transaction.type)}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(transaction)}
                                            className="p-2 rounded-lg hover:bg-primary/10 text-text-dim hover:text-primary transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(transaction.id)}
                                            className="p-2 rounded-lg hover:bg-red-500/10 text-text-dim hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlassCard>
    )
}