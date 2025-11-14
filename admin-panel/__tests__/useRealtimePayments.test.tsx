import { renderHook, act } from '@testing-library/react'
import { useRealtimePayments } from '../hooks/useRealtimePayments'

// Mock supabase
jest.mock('../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          limit: jest.fn(() => Promise.resolve({
            data: [],
            error: null
          }))
        }))
      }))
    })),
    channel: jest.fn(() => ({
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn((callback) => {
        setTimeout(() => callback('SUBSCRIBED'), 0)
        return Promise.resolve()
      })
    })),
    removeChannel: jest.fn(),
  },
}))

describe('useRealtimePayments', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('initializes with empty payments and disconnected state', async () => {
    const { result } = renderHook(() => useRealtimePayments())
    
    expect(result.current.payments).toEqual([])
    expect(result.current.isConnected).toBe(false)
    expect(result.current.lastUpdate).toBe(null)

    // Wait for async effects to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.isConnected).toBe(true)
  })

  it('returns the expected structure', () => {
    const { result } = renderHook(() => useRealtimePayments())
    
    expect(result.current).toHaveProperty('payments')
    expect(result.current).toHaveProperty('isConnected')
    expect(result.current).toHaveProperty('lastUpdate')
    expect(result.current).toHaveProperty('refetch')
  })
})
