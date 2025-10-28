import { render, screen } from '@testing-library/react'
import Layout from '../components/Layout'

describe('Layout', () => {
  it('renders header with title', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )
    
    expect(screen.getByText('CollectionPro Admin')).toBeInTheDocument()
    expect(screen.getByText('Real-time Dashboard')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <Layout>
        <div data-testid="test-content">Test content</div>
      </Layout>
    )
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  it('shows connection indicator', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )
    
    const statusIndicator = screen.getByText('Real-time Dashboard').nextElementSibling
    expect(statusIndicator).toHaveClass('bg-green-500', 'rounded-full', 'animate-pulse')
  })
})
