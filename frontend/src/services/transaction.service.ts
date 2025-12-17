import { supabase } from '@/lib/supabase'

export interface CreateTransactionData {
    amount: number
    type: 'income' | 'expense'
    description?: string
    categoryId: string
    paymentMethodId: string
    accountId?: string
    date?: Date
}

export interface UpdateTransactionData extends Partial<CreateTransactionData> { }

export interface TransactionFilters {
    type?: 'income' | 'expense'
    categoryId?: string
    paymentMethodId?: string
    dateFrom?: string
    dateTo?: string
    search?: string
}

export const transactionService = {
    async getAll(userId: string, filters?: TransactionFilters) {
        let query = supabase
            .from('Transaction')
            .select(`
                *,
                category:Category(id,name,icon,color,type),
                paymentMethod:PaymentMethod(id,name,type),
                account:Account(id,name)
                `)
            .eq('userId', userId)
            .order('date', { ascending: false })

        if (filters?.type) {
            query = query.eq('type', filters.type)
        }

        if (filters?.categoryId) {
            query = query.eq('categoryId', filters.categoryId)
        }

        if (filters?.paymentMethodId) {
            query = query.eq('paymentMethodId', filters.paymentMethodId)
        }

        if (filters?.dateFrom) {
            query = query.gte('date', filters.dateFrom)
        }

        if (filters?.dateTo) {
            query = query.lte('date', filters.dateTo)
        }

        const { data, error } = await query

        if (error) throw error

        if (!data) return []

        if (filters?.search) {
            const term = filters.search.trim().toLowerCase()
            if (!term) return data

            return data.filter((transaction) => {
                const searchableValues = [
                    transaction.description || '',
                    transaction.category?.name || '',
                    transaction.account?.name || '',
                    transaction.paymentMethod?.name || '',
                    transaction.amount?.toString() || '',
                ]

                return searchableValues.some((value) =>
                    value.toLowerCase().includes(term)
                )
            })
        }

        return data
    },

    async getById(id: string, userId: string) {
        const { data, error } = await supabase
            .from('Transaction')
            .select(`
                *,
                category:Category(id, name, icon, color, type),
            paymentMethod:PaymentMethod(id, name, type),
            account:Account(id, name)
                `)
            .eq('id', id)
            .eq('userId', userId)
            .single()
        if (error) throw error
        return data
    },
    async create(userId: string, data: CreateTransactionData) {
        const { data: transaction, error } = await supabase
            .from('Transaction')
            .insert({
                userId,
                amount: data.amount,
                type: data.type,
                description: data.description,
                categoryId: data.categoryId,
                paymentMethodId: data.paymentMethodId,
                accountId: data.accountId,
                date: data.date || new Date().toISOString(),
            })
            .select(`
        *,
        category:Category(id, name, icon, color, type),
        paymentMethod:PaymentMethod(id, name, type),
        account:Account(id, name)
        `)
            .single()

        if (error) throw error
        return transaction
    },
    async update(id: string, userId: string, data: UpdateTransactionData) {
        const { data: transaction, error } = await supabase
            .from('Transaction')
            .update(data)
            .eq('id', id)
            .eq('userId', userId)
            .select(`
        *,
        category:Category(id, name, icon, color, type),
        paymentMethod:PaymentMethod(id, name, type),
        account:Account(id, name)
        `)
            .single()

        if (error) throw error
        return transaction
    },

    async delete(id: string, userId: string) {
        const { error } = await supabase
            .from('Transaction')
            .delete()
            .eq('id', id)
            .eq('userId', userId)

        if (error) throw error
    },

}