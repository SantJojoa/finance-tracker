import { useState, type FormEvent } from 'react'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/ui/Input'
import Button from '@/components/Button'
import { transactionService, type CreateTransactionData } from '@/services/transaction.service'

interface TransactionFormProps {
    transaction?: any
    onSuccess: () => void
    onCancel: () => void
    categories: any[]
    paymentMethods: any[]
    accounts: any[]
}

export default function TransactionForm({
    transaction,
    onSuccess,
    onCancel,
    categories,
    paymentMethods,
    accounts }: TransactionFormProps) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        amount: transaction?.amount || '',
        type: transaction?.type || 'expense',
        description: transaction?.description || '',
        categoryId: transaction?.categoryId || '',
        paymentMethodId: transaction?.paymentMethodId || '',
        accountId: transaction?.accountId || '',
        date: transaction?.date ? new Date(transaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    })

    const filteredCategories = categories.filter(
        (cat) => cat.type === formData.type
    )

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)
        setError('')

        try {
            const data: CreateTransactionData = {
                amount: parseFloat(formData.amount),
                type: formData.type as 'income' | 'expense',
                description: formData.description,
                categoryId: formData.categoryId,
                paymentMethodId: formData.paymentMethodId,
                accountId: formData.accountId || undefined,
                date: new Date(formData.date)
            }

            if (transaction) {
                await transactionService.update(transaction.id, user.id, data)
            } else {
                await transactionService.create(user.id, data)
            }
            onSuccess()
        } catch (err: any) {
            setError(err.message || 'Error al guardar la transacción')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-5'>
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {error}
                </div>
            )}

            <div className='grid grid-cols-2 gap-3'>
                <button
                    type='button'
                    onClick={() => setFormData({ ...formData, type: 'expense', categoryId: '' })}
                    className={`p-4 rounded-lg border-2 transition-all font-bold ${formData.type === 'expense' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-dark-border hover:border-dark-border/50'
                        }`}
                >
                    💸 Gasto
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'income', categoryId: '' })}
                    className={`p-4 rounded-lg border-2 transition-all font-bold ${formData.type === 'income'
                        ? 'border-green-500 bg-green-500/10 text-green-500'
                        : 'border-dark-border hover:border-dark-border/50'
                        }`}
                >
                    💰 Ingreso
                </button>
            </div>

            <Input
                type="number"
                step="0.01"
                label="Monto*"
                placeholder="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
            />
            <Input
                type="text"
                label="Descripción"
                placeholder="Gasolina, Supermercado ...."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <div>
                <label className='block text-sm font-medium mb-2'>Categoría*</label>
                <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg bg-dark-surface border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                >

                    <option
                        value="">Selecciona una categoría</option>
                    {filteredCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Método de pago*</label>
                <select
                    value={formData.paymentMethodId}
                    onChange={(e) => setFormData({ ...formData, paymentMethodId: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg bg-dark-surface border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                >
                    <option value="">Selecciona un método de pago</option>
                    {paymentMethods.map((pm) => (
                        <option key={pm.id} value={pm.id}>
                            {pm.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Cuenta</label>
                <select
                    value={formData.accountId}
                    onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg bg-dark-surface border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    <option value="">Selecciona una cuenta</option>
                    {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                            {acc.name}
                        </option>
                    ))}
                </select>
            </div>
            <Input
                type="date"
                label="Fecha"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
            />
            <div className="flex gap-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={onCancel}
                    className="flex-1"
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    className="flex-1"
                >
                    {loading ? 'Guardando...' : transaction ? 'Actualizar' : 'Crear'}
                </Button>
            </div>

        </form>
    )
}