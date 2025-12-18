import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { categoryService } from '@/services/category.service'
import Container from '@/components/ui/Container'
import Button from '@/components/Button'
import Modal from '@/components/ui/Modal'
import CategoryCard from '@/components/categories/CategoryCard'
import CategoryForm from '@/components/categories/CategoryForm'
import GlassCard from '@/components/ui/GlassCard'

export default function Categories() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<any[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<any>(null)

    useEffect(() => {
        const fetchCategories = async () => {
            if (!user) return

            try {
                setLoading(true)
                const data = await categoryService.getAll(user.id)
                setCategories(data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [user])

    const handleCreateNew = () => {
        setSelectedCategory(null)
        setIsModalOpen(true)
    }

    const handleEdit = (category: any) => {
        setSelectedCategory(category)
        setIsModalOpen(true)
    }
    const handleDelete = async (id: string) => {
        if (!user) return

        const confirmed = window.confirm(
            'Estas seguro de que quieres eliminar esta categoría?'
        )

        if (!confirmed) return

        try {
            await categoryService.delete(id, user.id)
            setCategories(categories.filter((c) => c.id !== id))
        } catch (error: any) {
            alert(error.message || 'Failed to delete category')
        }
    }

    const handleFormSuccess = async () => {
        if (!user) return

        setIsModalOpen(false)
        setSelectedCategory(null)

        try {
            const data = await categoryService.getAll(user.id)
            setCategories(data)
        } catch (error) {
            console.error('Error refreshing categories:', error)
        }
    }

    const handleFormCancel = () => {
        setIsModalOpen(false)
        setSelectedCategory(null)
    }

    const expenseCategories = categories.filter((c) => c.type === 'expense')
    const incomeCategories = categories.filter((c) => c.type === 'income')

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-dim">Loading categories...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='py-8'>
            <Container className='max-w-[1400px]'>
                <div className='space-y-8'>
                    <div className='flex flex-wrap justify-between gap-4 items-start'>
                        <div>
                            <h1 className='text-4xl font-black mb-2'>Categorías</h1>
                            <p className='text-text-dim'>
                                Organiza tus transacciones con categorías personalizadas.
                            </p>
                        </div>

                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleCreateNew}
                            className="gap-2"
                        >
                            <Plus className="size-5" />
                            Nueva Categoría
                        </Button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <GlassCard className='p-6'>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">💸</span>
                                <div>
                                    <p className="text-text-dim text-sm">Categorías de Gastos</p>
                                    <p className="text-3xl font-bold">{expenseCategories.length}</p>
                                </div>
                            </div>

                        </GlassCard>
                        <GlassCard className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">💰</span>
                                <div>
                                    <p className="text-text-dim text-sm">Categories de Ingresos</p>
                                    <p className="text-3xl font-bold">{incomeCategories.length}</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {expenseCategories.length > 0 && (
                        <div className='space-y-4'>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <span>💸</span> Categorías de Gastos
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {expenseCategories.map((category) => (
                                    <CategoryCard
                                        key={category.id}
                                        category={category}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {incomeCategories.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <span>💰</span> Categorías de Ingresos
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {incomeCategories.map((category) => (
                                    <CategoryCard
                                        key={category.id}
                                        category={category}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {categories.length === 0 && (
                        <GlassCard className="p-12">
                            <div className="text-center">
                                <div className="size-16 mx-auto mb-4 rounded-full bg-dark-surface flex items-center justify-center">
                                    <span className="text-3xl">📁</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Aun no hay categorías</h3>
                                <p className="text-text-dim mb-6">
                                    Empieza creando tu primera categoría para mantener tus transacciones organizadas.
                                </p>
                                <Button variant="primary" size="lg" onClick={handleCreateNew}>
                                    <Plus className="size-5 mr-2" />
                                    Crea tu primera categoría
                                </Button>
                            </div>
                        </GlassCard>
                    )}
                </div>
            </Container >

            <Modal
                isOpen={isModalOpen}
                onClose={handleFormCancel}
                title={selectedCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                size="lg"
            >
                <CategoryForm
                    category={selectedCategory}
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                />
            </Modal>
        </div >
    )

}