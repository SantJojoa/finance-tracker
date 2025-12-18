import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export interface CreateCategoryData {
    name: string
    type: 'income' | 'expense'
    color?: string
    icon?: string
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> { }

export const categoryService = {
    async getAll(userId: string) {
        const { data, error } = await supabase
            .from('Category')
            .select('*')
            .eq('userId', userId)
            .order('name', { ascending: true })

        if (error) throw error
        return data || []
    },

    async getById(id: string, userId: string) {
        const { data, error } = await supabase
            .from('Category')
            .select('*')
            .eq('id', id)
            .eq('userId', userId)
            .single()

        if (error) throw error
        return data
    },

    async create(userId: string, data: CreateCategoryData) {
        const now = new Date().toISOString()

        const { data: category, error } = await supabase
            .from('Category')
            .insert({
                id: uuidv4(),
                userId,
                name: data.name,
                type: data.type,
                color: data.color,
                icon: data.icon,
                createdAt: now,
                updatedAt: now,
            })
            .select()
            .single()

        if (error) throw error
        return category
    },

    async update(id: string, userId: string, data: UpdateCategoryData) {
        const { data: category, error } = await supabase
            .from('Category')
            .update({
                ...data,
                updatedAt: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('userId', userId)
            .select()
            .single()

        if (error) throw error
        return category
    },

    async delete(id: string, userId: string) {
        // Check if category has transactions
        const { data: transactions } = await supabase
            .from('Transaction')
            .select('id')
            .eq('categoryId', id)
            .limit(1)

        if (transactions && transactions.length > 0) {
            throw new Error('Cannot delete category with existing transactions')
        }

        const { error } = await supabase
            .from('Category')
            .delete()
            .eq('id', id)
            .eq('userId', userId)

        if (error) throw error
    },
}