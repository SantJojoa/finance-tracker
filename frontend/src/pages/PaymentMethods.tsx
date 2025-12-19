import { useEffect, useState } from 'react'
import { Plus, CreditCard, Edit3, Trash2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { paymentMethodService } from '@/services/paymentMethod.service'
import Container from '@/components/ui/Container'
import Button from '@/components/Button'
import GlassCard from '@/components/ui/GlassCard'
import Modal from '@/components/ui/Modal'
import PaymentMethodForm from '@/components/paymentMethods/PaymentMethodForm'

const PAYMENT_TYPE_INFO = {
    cash: {
        label: 'Efectivo',
        badge: 'bg-emerald-500/15 text-emerald-300',
        emoji: '💵',
    },
    debit_card: {
        label: 'Tarjeta Débito',
        badge: 'bg-sky-500/15 text-sky-300',
        emoji: '💳',
    },
    credit_card: {
        label: 'Tarjeta Crédito',
        badge: 'bg-purple-500/15 text-purple-300',
        emoji: '💎',
    },
    digital_wallet: {
        label: 'Billetera Digital',
        badge: 'bg-amber-500/15 text-amber-300',
        emoji: '📱',
    },
} as const

type PaymentMethod = {
    id: string
    name: string
    type: keyof typeof PAYMENT_TYPE_INFO
    createdAt?: string
}

export default function PaymentMethods() {
    const { user } = useAuth()
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            if (!user) return
            try {
                setLoading(true)
                const data = await paymentMethodService.getAll(user.id)
                setPaymentMethods(data as PaymentMethod[])
            } catch (error) {
                console.error('Error loading payment methods:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPaymentMethods()
    }, [user])

    const refreshPaymentMethods = async () => {
        if (!user) return
        const data = await paymentMethodService.getAll(user.id)
        setPaymentMethods(data as PaymentMethod[])
    }

    const handleCreateNew = () => {
        setSelectedMethod(null)
        setIsModalOpen(true)
    }

    const handleEdit = (method: PaymentMethod) => {
        setSelectedMethod(method)
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (!user) return
        const confirmed = window.confirm('¿Seguro deseas eliminar este método de pago?')
        if (!confirmed) return

        try {
            await paymentMethodService.delete(id, user.id)
            setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
        } catch (error: any) {
            alert(error.message || 'No se pudo eliminar el método de pago')
        }
    }

    const handleFormSuccess = async () => {
        await refreshPaymentMethods()
        setIsModalOpen(false)
        setSelectedMethod(null)
    }

    const handleFormCancel = () => {
        setIsModalOpen(false)
        setSelectedMethod(null)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-bg">
                <div className="text-center">
                    <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-dim">Cargando métodos de pago...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8">
            <Container className="max-w-[1300px]">
                <div className="space-y-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-black mb-2">Métodos de Pago</h1>
                            <p className="text-text-dim max-w-2xl">
                                Centraliza aquí las tarjetas, cuentas y billeteras que usas para tus transacciones.
                                Define nombres claros para identificarlos fácilmente dentro del resto de la app.
                            </p>
                        </div>
                        <Button variant="primary" size="lg" onClick={handleCreateNew} className="gap-2">
                            <Plus className="size-5" />
                            Nuevo método
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GlassCard className="p-5" hover={false}>
                            <p className="text-sm text-text-dim mb-1">Total configurados</p>
                            <p className="text-3xl font-bold">{paymentMethods.length}</p>
                        </GlassCard>
                        <GlassCard className="p-5" hover={false}>
                            <p className="text-sm text-text-dim mb-1">Tipos disponibles</p>
                            <p className="text-3xl font-bold">4</p>
                        </GlassCard>
                    </div>

                    {paymentMethods.length === 0 ? (
                        <GlassCard className="p-12 text-center">
                            <div className="mx-auto mb-4 size-16 rounded-full bg-dark-surface flex items-center justify-center">
                                <CreditCard className="size-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Aún no tienes métodos de pago</h3>
                            <p className="text-text-dim mb-6">
                                Empieza agregando tus cuentas o tarjetas para usarlas dentro de Monely.
                            </p>
                            <Button variant="primary" size="lg" onClick={handleCreateNew}>
                                <Plus className="size-5 mr-2" />
                                Crear el primero
                            </Button>
                        </GlassCard>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {paymentMethods.map((method) => {
                                const info = PAYMENT_TYPE_INFO[method.type] || PAYMENT_TYPE_INFO.cash
                                return (
                                    <GlassCard key={method.id} className="p-6 flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="size-12 rounded-full bg-primary/10 text-2xl flex items-center justify-center">
                                                    {info.emoji}
                                                </div>
                                                <div>
                                                    <p className="text-xl font-semibold">{method.name}</p>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${info.badge}`}>
                                                        {info.label}
                                                    </span>
                                                </div>
                                            </div>
                                            <CreditCard className="size-5 text-text-dim" />
                                        </div>

                                        <div className="mt-auto flex gap-2 pt-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="flex-1 gap-2"
                                                onClick={() => handleEdit(method)}
                                            >
                                                <Edit3 className="size-4" />
                                                Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="flex-1 gap-2 border border-red-500/30 text-red-400 hover:bg-red-500/10"
                                                onClick={() => handleDelete(method.id)}
                                            >
                                                <Trash2 className="size-4" />
                                                Eliminar
                                            </Button>
                                        </div>
                                    </GlassCard>
                                )
                            })}
                        </div>
                    )}
                </div>
            </Container>

            <Modal
                isOpen={isModalOpen}
                onClose={handleFormCancel}
                title={selectedMethod ? 'Editar método de pago' : 'Nuevo método de pago'}
                size="lg"
            >
                <PaymentMethodForm
                    paymentMethod={selectedMethod}
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                />
            </Modal>
        </div>
    )
}
