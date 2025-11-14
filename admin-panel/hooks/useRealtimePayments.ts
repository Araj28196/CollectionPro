import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'

type Payment = Database['public']['Tables']['payments']['Row'] & {
  customers: { name: string; phone: string }
  workers: { name: string; status: string }
}

export const useRealtimePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchPayments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          customers:customer_id(name, phone),
          workers:worker_id(name, status)
        `)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error fetching payments:', error)
        return
      }

      setPayments(data as Payment[])
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error fetching payments:', error)
    }
  }, [])

  useEffect(() => {
    fetchPayments()

    const channel = supabase
      .channel('payment-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payments',
        },
        (payload) => {
          console.log('Real-time payment change:', payload)
          fetchPayments()
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED')
        if (status === 'SUBSCRIBED') {
          console.log('Connected to real-time payment updates')
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchPayments])

  return {
    payments,
    isConnected,
    lastUpdate,
    refetch: fetchPayments,
  }
}