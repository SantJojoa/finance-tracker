import { supabase } from '@/lib/supabase'

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
}