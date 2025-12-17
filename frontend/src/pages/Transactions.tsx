import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { transactionService } from '@/services/transaction.service'
import { categoryService } from '@/services/category.service'
import { paymentMethodService } from '@/services/paymentMethod.service'
import { accountService } from '@/services/account.service'
import Container from '@/components/ui/Container'
import Button from '@/components/Button'
import Modal from '@/components/ui/Modal'
import TransactionFilters from '@/components/transactions/TransactionFilters'
import TransactionForm from '@/components/transactions/TransactionForm'
import TransactionList from '@/components/transactions/TransactionList'

export default function Transactions() {

    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [paymentMethods, setPaymentMethods] = useState<any[]>([])
    const [accounts, setAccounts] = useState<any[]>([])


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
    const [filters, setFilters] = useState<any>({})

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return

            try {
                setLoading(true)
                const [transData, catData, pmData, accData] = await Promise.all([
                    transactionService.getAll(user.id),
                    categoryService.getAll(user.id),
                    paymentMethodService.getAll(user.id),
                    accountService.getAll(user.id),
                ])
                setTransactions(transData)
                setCategories(catData)
                setPaymentMethods(pmData)
                setAccounts(accData)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [user])

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!user) return

            try {
                const data = await transactionService.getAll(user.id, filters)
                setTransactions(data)
            } catch (error) {
                console.error('Error fetching transactions:', error)
            }
        }

        fetchTransactions()
    }, [user, filters])

    const handleFilterChange = (newFilters: any) => {
        const cleanFilters = Object.entries(newFilters).reduce((acc, [key, value]) => {
            if (value) acc[key] = value
            return acc
        }, {} as any)

        setFilters(cleanFilters)
    }

    const handleCreateNew = () => {
        setSelectedTransaction(null)
        setIsModalOpen(true)
    }

    const handleEdit = (transaction: any) => {
        setSelectedTransaction(transaction)
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (!user) return
        const confirmed = window.confirm(
            'Estas seguro de que quieres eliminar esta transacción'
        )
        if (!confirmed) return
        try {
            await transactionService.delete(id, user.id)
            setTransactions(transactions.filter((t) => t.id !== id))
        } catch (error) {
            console.error('Error deleting transaction', error)
            alert('No se pudo eliminar la transacción')
        }
    }

    const handleFormSuccess = async () => {
        if (!user) return

        setIsModalOpen(false)
        setSelectedTransaction(null)

        try {
            const data = await transactionService.getAll(user.id, filters)
            setTransactions(data)
        } catch (error) {
            console.error('Error refreshing transactions:', error)
        }
    }

    const handleFormCancel = () => {
        setIsModalOpen(false)
        setSelectedTransaction(null)
    }

    return (
        <div className='py-8'>
            <Container className='max-w-[1400px]'>
                <div className='space-y-6'>
                    <div className='flex flex-wrap justify-between gap-4 items-start'>
                        <div>
                            <h1 className='text-4xl font-black mb-2'>Transacciones</h1>
                            <p className='text-text-dim'>
                                Maneja tus ingresos y gastos en un solo lugar.
                            </p>
                        </div>
                        <Button
                            variant='primary'
                            size='lg'
                            onClick={handleCreateNew}
                            className='gap-2'
                        >
                            <Plus className='size-5' />
                            Nueva Transacción
                        </Button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div className="bg-dark-surface border border-dark-border rounded-xl p-4">
                            <p className='text-text-dim text-sm mb-1'>Transacciones Totales</p>
                            <p>{transactions.length}</p>
                        </div>

                        <div className='bg-dark-surface border border-dark-border rounded-xl p-4'>
                            <p className='text-shadow-text-dim text-sm mb-1'>Ingresos</p>
                            <p className="text-2xl font-bold text-green-500">
                                {transactions
                                    .filter((t) => t.type === 'income')
                                    .reduce((sum, t) => sum + t.amount, 0)
                                    .toFixed(2)}
                            </p>
                        </div>
                        <div className='bg-dark-surface border border-dark-border rounded-xl p-4'>
                            <p className='text-shadow-text-dim text-sm mb-1'>Gastos</p>
                            <p className="text-2xl font-bold text-red-500">
                                $
                                {transactions
                                    .filter((t) => t.type === 'expense')
                                    .reduce((sum, t) => sum + t.amount, 0)
                                    .toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <TransactionFilters
                        onFilterChange={handleFilterChange}
                        categories={categories}
                        paymentMethods={paymentMethods}
                    />

                    <TransactionList
                        transactions={transactions}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        loading={loading}
                    />
                </div>
            </Container>

            <Modal
                isOpen={isModalOpen}
                onClose={handleFormCancel}
                title={selectedTransaction ? 'Editar Transacción' : 'Nueva Transacción'}
                size="lg"
            >
                <TransactionForm
                    transaction={selectedTransaction}
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                    categories={categories}
                    paymentMethods={paymentMethods}
                    accounts={accounts}
                />
            </Modal>
        </div>
    )
}