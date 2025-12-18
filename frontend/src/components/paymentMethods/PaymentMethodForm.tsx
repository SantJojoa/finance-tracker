import { useState, type FormEvent } from 'react'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/ui/Input'
import Button from '@/components/Button'
import { paymentMethodService, type CreatePaymentMethodData } from '@/services/paymentMethod.service'

interface PaymentMethodFormProps {
    paymentMethod?: any
    onSuccess: () => void
    onCancel: () => void
}

const PAYMENT_TYPES = [
    { value: 'cash', label: 'Efectivo', icon: '💵' },
    { value: 'debit_card', label: 'Tarjeta Débito', icon: '💳' },
    { value: 'credit_card', label: 'Tarjeta Crédito', icon: '💎' },
    { value: 'digital_wallet', label: 'Billetera Virtual', icon: '📱' },
]

export default function PaymentMethodForm({
    paymentMethod,
    onSuccess,
    onCancel,
}: PaymentMethodFormProps) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        name: paymentMethod?.name || '',
        type: paymentMethod?.type || 'cash',
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)
        setError('')

        try {
            const data: CreatePaymentMethodData = {
                name: formData.name,
                type: formData.type as any,
            }

            if (paymentMethod) {
                await paymentMethodService.update(paymentMethod.id, user.id, data)
            } else {
                await paymentMethodService.create(user.id, data)
            }

            onSuccess()
        } catch (err: any) {
            setError(err.message || 'Failed to save payment method')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {error}
                </div>
            )}

            {/* Name */}
            <Input
                type="text"
                label="Nombre del método de pago"
                placeholder="e.g., Tarjeta Visa, Nequi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />

            {/* Type */}
            <div>
                <label className="block text-sm font-medium mb-3">Tipo</label>
                <div className="grid grid-cols-2 gap-3">
                    {PAYMENT_TYPES.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, type: type.value })}
                            className={`p-4 rounded-lg border-2 transition-all font-semibold flex items-center gap-2 justify-center ${formData.type === type.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-dark-border hover:border-dark-border/50'
                                }`}
                        >
                            <span className="text-2xl">{type.icon}</span>
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
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
                    {loading ? 'Guardando...' : paymentMethod ? 'Actualizar' : 'Crear'}
                </Button>
            </div>
        </form>
    )
}