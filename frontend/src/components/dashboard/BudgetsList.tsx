import { Link } from 'react-router-dom'
import GlassCard from "../ui/GlassCard"

interface Budget {
    name: string
    spent: number
    limit: number
}

interface BudgetsListProps {
    budgets: Budget[]
}


export default function BudgetsList({ budgets }: BudgetsListProps) {
    const getProgressColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-red-500'
        if (percentage >= 75) return 'bg-yellow-500'
        return 'bg-primary'
    }
    return (
        <GlassCard className='p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-bold'>Presupuestos</h3>
                <Link to='/budgets' className='text-primary text-sm font-bold hover:underline'>
                    Ver todos
                </Link>
            </div>

            <div className='space-y-4'>
                {budgets.map((budget) => {
                    const percentage = (budget.spent / budget.limit) * 100

                    return (
                        <div key={budget.name}>
                            <div className='flex justify-between text-sm mb-1'>
                                <span>{budget.name}</span>
                                <span className='font-bold'>
                                    ${budget.spent}/${budget.limit}
                                </span>
                            </div>
                            <div className='w-full bg-dark-border rounded-full h-2'>
                                <div
                                    className={`${getProgressColor(percentage)} h-2 rounded-full transition-all duration-500`}
                                    style={{ width: `${Math.min(percentage, 100)}%` }}
                                />
                            </div>
                        </div>
                    )

                })}
            </div>
        </GlassCard>
    )
}