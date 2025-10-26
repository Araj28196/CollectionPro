# CollectionPro

A modern bill collection management system consisting of a user-friendly Android app for field workers and a comprehensive web-based admin panel for business owners.

## 🏗️ Architecture

- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Admin Panel**: Next.js (React) hosted on Vercel
- **Worker App**: Native Android (Kotlin) on Google Play Store
- **Real-time**: Supabase Realtime subscriptions
- **File Storage**: Supabase Storage for payment proofs

## 📱 Key Features

### Worker Mobile App
- Simple, intuitive interface for field workers
- Bill search by number or customer name
- Payment collection with image proof capture
- Daily cash reconciliation with discrepancy flagging
- Offline-first design considerations

### Admin Web Panel
- Real-time payment tracking dashboard
- Bill and customer management with CSV import
- Worker account management
- Daily submission review and approval
- Comprehensive reporting and analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ for admin panel development
- Android Studio for mobile app development
- Supabase account for backend services

### Setup Instructions
1. Clone the repository
2. Set up Supabase project
3. Configure environment variables
4. Follow the implementation plan in `PRPs/collectionpro-implementation.md`

## 📋 Development Workflow

This project follows a structured development process:
1. **Task Management**: Uses Archon MCP for task tracking
2. **Git Workflow**: Feature branch workflow with PR reviews
3. **Code Quality**: Automated testing and linting
4. **Documentation**: Updated through knowledge base

See `CLAUDE.md` for detailed development guidelines.

## 🗂️ Project Structure

```
├── docs/                    # Documentation
│   └── plan/               # Requirements and planning
├── PRPs/                   # Implementation plans
├── admin-panel/            # Next.js web application
├── android-app/            # Android Kotlin application
├── supabase/               # Database migrations and functions
├── .claude/                # Claude Code configuration
└── CLAUDE.md              # Development guidelines
```

## 📖 Documentation

- **Requirements**: `docs/plan/initial.md`
- **Implementation Plan**: `PRPs/collectionpro-implementation.md`
- **Development Guidelines**: `CLAUDE.md`

## 🤝 Contributing

1. Create feature branch from main
2. Implement changes with comprehensive testing
3. Create pull request with detailed description
4. Wait for code review and approval
5. Merge after successful validation

## 📄 License

[Add your license information here]

---

*Generated with [Claude Code](https://claude.com/claude-code)*