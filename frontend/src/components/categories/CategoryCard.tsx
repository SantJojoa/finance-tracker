import { Pencil, Trash2 } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

interface Category {
    id: string
    name: string
    type: 'income' | 'expense'
    color?: string
    icon?: string
}

interface CategoryCardProps {
    category: Category
    onEdit: (category: Category) => void
    onDelete: (id: string) => void
}

export default function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
    return (
        <GlassCard className='p-6 hover:border-primary/50 transition-all group'>
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div
                        className="size-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${category.color}20` }}
                    >
                        {category.icon || '💰'}
                    </div>
                    <div>
                        <h3 className='font-bold text-lg'>{category.name}</h3>
                        <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${category.type === 'income'
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-red-500/10 text-red-500'
                                }`}
                        >
                            {category.type === 'income' ? '💰 Ingreso' : '💸 Gasto'}
                        </span>
                    </div>
                </div>

                <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button
                        onClick={() => onEdit(category)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-text-dim hover:text-primary transition-colors"
                        title="Edit"
                    >
                        <Pencil className="size-4" />
                    </button>
                    <button
                        onClick={() => onDelete(category.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-text-dim hover:text-red-500 transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="size-4" />
                    </button>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <div
                    className="size-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-text-dim">{category.color}</span>
            </div>
        </GlassCard>
    )
}