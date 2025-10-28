import { render, screen } from '@testing-library/react'
import DashboardPage from '../pages/dashboard/index'
import { useRealtimePayments } from '../hooks/useRealtimePayments'

// Mock the hooks
jest.mock('../hooks/useRealtimePayments')
jest.mock('../lib/supabase', () => ({
  supabase: {},
}))

const mockUseRealtimePayments = useRealtimePayments as jest.MockedFunction<typeof useRealtimePayments>

describe('DashboardPage', () => {
  beforeEach(() => {
    mockUseRealtimePayments.mockReturnValue({
      payments: [],
      isConnected: true,
      lastUpdate: new Date(),
    })
  })

  it('renders dashboard header', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Payment Collection Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Live')).toBeInTheDocument()
  })

  it('renders stats cards', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Total Collection Today')).toBeInTheDocument()
    expect(screen.getByText('Total Pending Amount')).toBeInTheDocument()
    expect(screen.getByText('Active Workers')).toBeInTheDocument()
    expect(screen.getByText('Recent (1h)')).toBeInTheDocument()
  })

  it('shows no payments message when payments array is empty', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('No payments yet')).toBeInTheDocument()
    expect(screen.getByText('Real-time payment updates will appear here once workers start collecting payments.')).toBeInTheDocument()
  })

  it('displays connection status', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Connected to Supabase Realtime')).toBeInTheDocument()
    expect(screen.getByText(/Auto-refresh enabled/)).toBeInTheDocument()
  })

  it('shows alert when there are recent payments', () => {
    // Create a payment that should trigger the alert
    const now = new Date()
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000)
    
    const mockPayment = {
      id: '1',
      amount: 1000,
      status: 'paid' as const,
      payment_date: now.toISOString().split('T')[0],
      created_at: thirtyMinutesAgo.toISOString(), // 30 minutes ago
      customers: { name: 'Test Customer', phone: '1234567890' },
      workers: { name: 'Test Worker', status: 'active' as const },
      proof_image_url: null,
      worker_id: 'worker-1',
      customer_id: 'customer-1',
    }

    mockUseRealtimePayments.mockReturnValue({
      payments: [mockPayment],
      isConnected: true,
      lastUpdate: now,
    })

    render(<DashboardPage />)
    
    // Look for any text containing "new payment"
    expect(screen.getByText(/new payment/i)).toBeInTheDocument()
  })
})
