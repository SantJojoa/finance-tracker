import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export interface CreatePaymentMethodData {
    name: string
    type: 'cash' | 'debit_card' | 'credit_card' | 'digital_wallet'
}

export interface UpdatePaymentMethodData extends Partial<CreatePaymentMethodData> { }

export const paymentMethodService = {
    async getAll(userId: string) {
        const { data, error } = await supabase
            .from('PaymentMethod')
            .select('*')
            .eq('userId', userId)
            .order('name', { ascending: true })

        if (error) throw error
        return data || []
    },

    async getById(id: string, userId: string) {
        const { data, error } = await supabase
            .from('PaymentMethod')
            .select('*')
            .eq('id', id)
            .eq('userId', userId)
            .single()

        if (error) throw error
        return data
    },

    async create(userId: string, data: CreatePaymentMethodData) {
        const now = new Date().toISOString()

        const { data: paymentMethod, error } = await supabase
            .from('PaymentMethod')
            .insert({
                id: uuidv4(),
                userId,
                name: data.name,
                type: data.type,
                createdAt: now,
                updatedAt: now,
            })
            .select()
            .single()

        if (error) throw error
        return paymentMethod
    },

    async update(id: string, userId: string, data: UpdatePaymentMethodData) {
        const { data: paymentMethod, error } = await supabase
            .from('PaymentMethod')
            .update({
                ...data,
                updatedAt: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('userId', userId)
            .select()
            .single()

        if (error) throw error
        return paymentMethod
    },

    async delete(id: string, userId: string) {
        // Check if payment method has transactions
        const { data: transactions } = await supabase
            .from('Transaction')
            .select('id')
            .eq('paymentMethodId', id)
            .limit(1)

        if (transactions && transactions.length > 0) {
            throw new Error('Cannot delete payment method with existing transactions')
        }

        const { error } = await supabase
            .from('PaymentMethod')
            .delete()
            .eq('id', id)
            .eq('userId', userId)

        if (error) throw error
    },
}