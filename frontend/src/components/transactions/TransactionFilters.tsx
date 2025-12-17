import { Search, Filter } from 'lucide-react'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/Button'

interface TransactionFiltersProps {
    onFilterChange: (filters: any) => void
    categories: any[]
    paymentMethods: any[]
}

export default function TransactionFilters({
    onFilterChange,
    categories,
    paymentMethods
}: TransactionFiltersProps) {
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        search: '',
        type: '',
        categoryId: '',
        paymentMethodId: '',
        dateFrom: '',
        dateTo: '',
    })

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const clearFilters = () => {
        const emptyFilters = {
            search: '',
            type: '',
            categoryId: '',
            paymentMethodId: '',
            dateFrom: '',
            dateTo: '',
        }
        setFilters(emptyFilters)
        onFilterChange(emptyFilters)
    }

    return (
        <div className='space-y-4'>
            <div className='flex gap-3'>
                <div className='flex-1'>
                    <Input
                        type='text'
                        placeholder='Buscar transacciones'
                        icon={<Search className='size-5' />}
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                </div>
                <Button
                    variant='secondary'
                    size='md'
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter className='size-5 mr-2' />
                    Filtros
                </Button>
            </div>

            {showFilters && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-dark-surface border border-dark-border rounded-xl'>
                    <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className='h-12 px-4 rounded-lg bg-dark-elevated border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50'
                    >
                        <option value="">Tipos</option>
                        <option value="income">Ingresos</option>
                        <option value="expense">Egreso</option>
                    </select>

                    <select
                        value={filters.categoryId}
                        onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                        className="h-12 px-4 rounded-lg bg-dark-elevated border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50"

                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.icon} {cat.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.paymentMethodId}
                        onChange={(e) => handleFilterChange('paymentMethodId', e.target.value)}
                        className="h-12 px-4 rounded-lg bg-dark-elevated border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="">Todos los métodos de pago</option>
                        {paymentMethods.map((pm) => (
                            <option key={pm.id} value={pm.id}>
                                {pm.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type='date'
                        value={filters.dateFrom}
                        onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                        className="h-12 px-4 rounded-lg bg-dark-elevated border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                        className="h-12 px-4 rounded-lg bg-dark-elevated border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <div className='md:col-span-2 lg:col-span-5'>
                        <button
                            className="text-sm text-primary hover:text-primary-hover transition-colors"
                            onClick={clearFilters}
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </div>
            )}
        </div>
    )


}

