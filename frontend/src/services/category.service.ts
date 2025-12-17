import { supabase } from '@/lib/supabase'

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
}