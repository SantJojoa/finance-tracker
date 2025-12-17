import { useEffect, useState } from 'react'
import { Wallet, TrendingUp, TrendingDown, Target } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { dashboardService } from '@/services/dashboard.service'
import Container from '@/components/ui/Container'
import StatCard from '@/components/dashboard/StatCard'
import CashFlowChart from '@/components/dashboard/CashFlowChart'
import QuickActions from '@/components/dashboard/QuickActions'
import BudgetsList from '@/components/dashboard/BudgetsList'
import RecentTransactions from '@/components/dashboard/RecentTransactions'
import Button from '@/components/Button'


export default function Dashboard() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalBalance: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        savings: 0,
    })
    const [monthlyData, setMonthlyData] = useState<any[]>([])
    const [recentTransactions, setRecentTransactions] = useState<any[]>([])

    //TODO: create bucket service instead i gonna mockup
    const budgets = [
        { name: 'Groceries', spent: 450, limit: 600 },
        { name: 'Entertainment', spent: 120, limit: 200 },
        { name: 'Transport', spent: 280, limit: 300 },
    ]


    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) return
            try {
                setLoading(true)
                const [statsData, monthlyDataResult, transactionsData] = await Promise.all([
                    dashboardService.getStats(user.id),
                    dashboardService.getMonthlyData(user.id),
                    dashboardService.getRecentTransactions(user.id, 5),
                ])
                setStats(statsData)
                setMonthlyData(monthlyDataResult)
                setRecentTransactions(transactionsData)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchDashboardData()
    }, [user])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-dim">Loading dashboard...</p>
                </div>
            </div>
        )
    }
    const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuario'


    return (
        <div className='py-8'>
            <Container className='max-w-[1400px]'>
                <div className='space-y-8'>
                    <div className='flex flex-wrap justify-between gap-4 items-start'>
                        <div>
                            <h1 className='text-4xl font-black mb-2'>
                                Bienvenido de nuevo {userName}
                            </h1>
                            <p className='text-text-dim'>
                                Este es tu overview financiero de este mes.
                            </p>
                        </div>
                        <Button variant='secondary' size='md'>
                            Descargar Reporte
                        </Button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <StatCard
                            title="Balance Total"
                            value={`$${stats.totalBalance.toFixed(2)}`}
                            change={2.5}
                            icon={Wallet}
                            iconColor="text-primary"
                            isPositive={true}
                        />
                        <StatCard
                            title='Ingresos'
                            value={`$${stats.monthlyIncome.toFixed(2)}`}
                            change={12}
                            icon={TrendingUp}
                            iconColor="text-green-500"
                            isPositive={true}
                        />
                        <StatCard
                            title="Expenses"
                            value={`$${stats.monthlyExpenses.toFixed(2)}`}
                            change={5}
                            icon={TrendingDown}
                            iconColor="text-red-500"
                            isPositive={false}
                        />
                        <StatCard
                            title="Meta de ahorro"
                            value="$10,000.00"
                            icon={Target}
                            iconColor="text-primary"
                            isGoal={true}
                            goalProgress={75}
                        />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                        <div className='lg:col-span-2'>
                            <CashFlowChart data={monthlyData} />
                        </div>

                        <div className='space-y-6'>
                            <QuickActions />
                            <BudgetsList budgets={budgets} />
                        </div>
                    </div>
                    <RecentTransactions transactions={recentTransactions} />

                </div>
            </Container>
        </div>
    )

}