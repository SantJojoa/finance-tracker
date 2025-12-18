import { useState, type FormEvent } from 'react'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/ui/Input'
import Button from '@/components/Button'
import ColorPicker from '@/components/ui/ColorPicker'
import EmojiPicker from '@/components/ui/EmojiPicker'
import { categoryService, type CreateCategoryData } from '@/services/category.service'

interface CategoryFormProps {
    category?: any
    onSuccess: () => void
    onCancel: () => void
}


export default function CategoryForm({ category, onSuccess, onCancel }: CategoryFormProps) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        name: category?.name || '',
        type: category?.type || 'expense',
        color: category?.color || '#ef4444',
        icon: category?.icon || '💰',
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)
        setError('')

        try {
            const data: CreateCategoryData = {
                name: formData.name,
                type: formData.type as 'income' | 'expense',
                color: formData.color,
                icon: formData.icon,
            }

            if (category) {
                await categoryService.update(category.id, user.id, data)
            } else {
                await categoryService.create(user.id, data)
            }

            onSuccess()
        } catch (err: any) {
            setError(err.message || 'Failed to save category')
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

            <div>
                <label className='block text-sm font-medium mb-2'>Tipo</label>
                <div className='grid grid-cols-2 gap-3'>
                    <button
                        type='button'
                        onClick={() => setFormData({ ...formData, type: 'expense' })}
                        className={`p-4 rounded-lg border-2 transition-all font-bold ${formData.type === 'expense' ? 'border-red-500 bg-red-500/10' : 'border-dark-border hover:border-dark-border/50'
                            }`}
                    >
                        💸 Gasto
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'income' })}
                        className={`p-4 rounded-lg border-2 transition-all font-bold ${formData.type === 'income'
                            ? 'border-green-500 bg-green-500/10 text-green-500'
                            : 'border-dark-border hover:border-dark-border/50'
                            }`}
                    >
                        💰 Ingreso
                    </button>
                </div>
            </div>
            <Input
                type="text"
                label="Nombre de categoría"
                placeholder="ej: Salario, Gasolina, Pareja"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />
            <EmojiPicker
                label="Icono"
                value={formData.icon}
                onChange={(icon) => setFormData({ ...formData, icon })}
            />
            <ColorPicker
                label="Color"
                value={formData.color}
                onChange={(color) => setFormData({ ...formData, color })}
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
                    {loading ? 'Guardando...' : category ? 'Actualizar' : 'Crear'}
                </Button>
            </div>

        </form>
    )

}