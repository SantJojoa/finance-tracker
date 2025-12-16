import { supabase } from "@/lib/supabase";

export interface DashboardStats {
    totalBalance: number
    monthlyIncome: number
    monthlyExpenses: number
    savings: number
}

export interface MonthlyData {
    month: string
    income: number
    expenses: number
}

export interface CategoryExpense {
    name: string
    value: number
    color: string
}

export const dashboardService = {
    async getStats(userId: string): Promise<DashboardStats> {
        const now = new Date()
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        const { data: transactions } = await supabase
            .from('Transaction')
            .select('amount,type, date')
            .eq('userId', userId)

        const { data: monthlyTransactions } = await supabase
            .from('Transaction')
            .select('amount,type')
            .eq('userId', userId)
            .gte('date', firstDayOfMonth.toISOString())

        const totalIncome = transactions?.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) || 0
        const totalExpenses = transactions?.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) || 0

        const monthlyIncome = monthlyTransactions?.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) || 0
        const monthlyExpenses = monthlyTransactions?.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) || 0

        return {
            totalBalance: totalIncome - totalExpenses,
            monthlyIncome,
            monthlyExpenses,
            savings: monthlyIncome - monthlyExpenses
        }
    },

    async getMonthlyData(userId: string): Promise<MonthlyData[]> {
        const sixMonthAgo = new Date()
        sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6)

        const { data: transactions } = await supabase
            .from('Transaction')
            .select('amount, type, date')
            .eq('userId', userId)
            .gte('date', sixMonthAgo.toISOString())
            .order('date', { ascending: true })

        const monthlyMap = new Map<string, { income: number; expenses: number }>()

        transactions?.forEach(t => {
            const date = new Date(t.date)
            const monthKey = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })

            if (!monthlyMap.has(monthKey)) {
                monthlyMap.set(monthKey, { income: 0, expenses: 0 })
            }

            const monthData = monthlyMap.get(monthKey)!
            if (t.type === 'income') {
                monthData.income += t.amount
            } else {
                monthData.expenses += t.amount
            }
        });

        return Array.from(monthlyMap.entries()).map(([month, data]) => ({
            month,
            ...data,
        }))
    },

    async getCategoryExpenses(userId: string): Promise<CategoryExpense[]> {
        const now = new Date()
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        const { data: transactions } = await supabase
            .from('Transaction')
            .select(` 
                amount,
                category:Category(name, color)
                `)
            .eq('userId', userId)
            .eq('type', 'expense')
            .gte('date', firstDayOfMonth.toISOString())

        const categoryMap = new Map<string, { value: number, color: string }>()

        transactions?.forEach((t: any) => {
            const categoryName = t.category?.name || 'Sin coincidencia'
            const color = t.category?.color || '#9ca3af'

            if (!categoryName.has(categoryName)) {
                categoryMap.set(categoryName, { value: 0, color })
            }
            categoryMap.get(categoryName)!.value += t.amount
        })

        return Array.from(categoryMap.entries()).map(([name, data]) => ({
            name,
            ...data
        }))
    },

    async getRecentTransactions(userId: string, limit = 10) {
        const { data: transactions } = await supabase
            .from('Transactions')
            .select(`
        *,
        category:Category(name, icon, color),
        paymentMethod:PaymentMethod(name),
        account:Account(name)
        `)
            .eq('userId', userId)
            .order('date', { ascending: false })
            .limit(limit)
        return transactions || []
    }
}