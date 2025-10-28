# CollectionPro Admin Dashboard

Real-time admin dashboard for CollectionPro bill collection management system.

## Features

### 🔄 Real-time Updates
- **Live Payment Feed**: Instant updates when workers collect payments
- **Real-time Statistics**: Dashboard metrics update automatically
- **Status Indicators**: Visual connection status to Supabase Realtime
- **Auto-refresh**: No manual refresh required

### 📊 Dashboard Metrics
- **Total Collection Today**: Sum of all payments collected today
- **Total Pending Amount**: Outstanding payment amounts
- **Active Workers**: Number of currently active field workers
- **Recent Activity**: Payments from the last hour

### 💳 Payment Management
- **Customer Information**: Name and contact details
- **Worker Assignment**: Which worker collected the payment
- **Payment Status**: Paid, pending, or overdue
- **Photo Proofs**: View attached payment proof images
- **Timestamp**: Exact time of payment collection

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Supabase Realtime Subscriptions
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth (ready for integration)

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Copy `.env.local.example` to `.env.local` and configure:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Access Dashboard**:
   - Main Dashboard: http://localhost:3000
   - Detailed Dashboard: http://localhost:3000/dashboard

## Database Schema

The dashboard expects these tables in your Supabase database:

### `payments` Table
```sql
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL,
  worker_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  payment_date TIMESTAMP,
  proof_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### `customers` Table
```sql
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### `workers` Table
```sql
CREATE TABLE workers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_duty')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Real-time Configuration

To enable real-time updates, run this SQL in your Supabase database:

```sql
-- Add payments table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE payments;

-- Enable Row Level Security (optional, for production)
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
```

## Performance Features

- **Optimized Queries**: Efficient database queries with proper indexing
- **Real-time Efficiency**: Smart subscription management
- **Auto-cleanup**: Limits displayed records for performance
- **Connection Health**: Automatic reconnection handling

## Future Enhancements

- [ ] Worker location tracking on map
- [ ] Advanced filtering and search
- [ ] Payment analytics and reports
- [ ] Multi-location support
- [ ] Mobile responsive improvements
- [ ] Export functionality
- [ ] Email notifications for large payments

## Troubleshooting

### Real-time Not Working
1. Check Supabase project settings
2. Verify database publication configuration
3. Check browser console for connection errors
4. Ensure proper table permissions

### Dashboard Not Loading
1. Verify environment variables
2. Check Supabase connection
3. Review browser console for errors

## License

CollectionPro Admin Dashboard - Part of the CollectionPro ecosystem.