import { supabase } from '@/lib/supabase'

export const accountService = {
    async getAll(userId: string) {
        const { data, error } = await supabase
            .from('Account')
            .select('*')
            .eq('userId', userId)
            .order('name', { ascending: true })

        if (error) throw error
        return data || []
    },
}