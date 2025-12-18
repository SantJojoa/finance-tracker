import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

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
        category:Category(id, name, icon, color, type),
        paymentMethod:PaymentMethod(id, name, type),
        account:Account(id, name)
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

        if (filters?.search) {
            query = query.ilike('description', `%${filters.search}%`)
        }

        const { data, error } = await query

        if (error) throw error
        return data || []
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
        const now = new Date().toISOString()

        const { data: transaction, error } = await supabase
            .from('Transaction')
            .insert({
                id: uuidv4(),
                userId,
                amount: data.amount,
                type: data.type,
                description: data.description,
                categoryId: data.categoryId,
                paymentMethodId: data.paymentMethodId,
                accountId: data.accountId,
                date: data.date ? new Date(data.date).toISOString() : now,
                createdAt: now,
                updatedAt: now,
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
        const updateData: any = { ...data }

        if (data.date) {
            updateData.date = new Date(data.date).toISOString()
        }

        updateData.updatedAt = new Date().toISOString()

        const { data: transaction, error } = await supabase
            .from('Transaction')
            .update(updateData)
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