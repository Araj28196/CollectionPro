import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      payments: {
        Row: {
          id: string
          customer_id: string
          worker_id: string
          amount: number
          due_date: string
          status: 'pending' | 'paid' | 'overdue'
          payment_date?: string
          proof_image_url?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['payments']['Insert']>
      }
      customers: {
        Row: {
          id: string
          name: string
          phone: string
          address: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['customers']['Insert']>
      }
      workers: {
        Row: {
          id: string
          name: string
          phone: string
          location_lat?: number
          location_lng?: number
          status: 'active' | 'inactive' | 'on_duty'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['workers']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['workers']['Insert']>
      }
    }
  }
}