# Wachno Engineering - Backend Setup Guide

This document provides comprehensive instructions for setting up and using the modernized backend with Prisma, PostgreSQL, and Zustand.

## New Features

### Backend Infrastructure
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand for efficient client-side state
- **Validation**: Zod schemas for type-safe data validation
- **API Routes**: RESTful API endpoints for all resources

### Admin Dashboard
A comprehensive admin panel at `/admin` with management interfaces for:
- Products (CRUD operations)
- Services (CRUD operations)
- Quotations (view, update status, delete)
- Messages (view, update status, delete)

### Frontend Forms
- **Quotation Request Form**: `/quotation` - Customers can request quotes
- **Contact Form**: Enhanced contact page with message submission to database

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or remote)
- npm or yarn package manager

## Environment Setup

1. **Copy the environment template**
   ```bash
   cp .env.example .env
   ```

2. **Configure your database connection**

   Edit `.env` and update the `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/wachno_eng?schema=public"
   ```

   Replace:
   - `user` with your PostgreSQL username
   - `password` with your PostgreSQL password
   - `localhost:5432` with your database host and port
   - `wachno_eng` with your database name

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

3. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

   This will create all necessary tables in your database.

4. **Seed the database** (optional but recommended)
   ```bash
   npm run db:seed
   ```

   This will populate the database with the existing products and services data.

## Development

### Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Useful Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Database Schema

### Models

#### Product
- id, title, slug, description, paragraph
- image, images (array)
- category, price, featured, inStock
- timestamps

#### Service
- id, title, slug, description, paragraph
- image, images (array)
- category, featured
- timestamps

#### Quotation
- id, name, email, phone, company, message
- status (PENDING, REVIEWING, QUOTED, ACCEPTED, REJECTED, COMPLETED)
- totalAmount, notes
- timestamps, respondedAt

#### QuotationItem
- id, quotationId, productId, serviceId
- quantity, description, price

#### Message
- id, name, email, phone, subject, message
- status (UNREAD, READ, REPLIED, ARCHIVED)
- notes, timestamps, readAt

## API Routes

### Products
- `GET /api/products` - List all products (supports filtering by category, featured, inStock)
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Services
- `GET /api/services` - List all services (supports filtering by category, featured)
- `GET /api/services/[id]` - Get single service
- `POST /api/services` - Create service (admin)
- `PUT /api/services/[id]` - Update service (admin)
- `DELETE /api/services/[id]` - Delete service (admin)

### Quotations
- `GET /api/quotations` - List all quotations (supports filtering by status, email)
- `GET /api/quotations/[id]` - Get single quotation with items
- `POST /api/quotations` - Create quotation request
- `PUT /api/quotations/[id]` - Update quotation (admin - status, amount, notes)
- `DELETE /api/quotations/[id]` - Delete quotation (admin)

### Messages
- `GET /api/messages` - List all messages (supports filtering by status, email)
- `GET /api/messages/[id]` - Get single message
- `POST /api/messages` - Create message (contact form)
- `PUT /api/messages/[id]` - Update message (admin - status, notes)
- `DELETE /api/messages/[id]` - Delete message (admin)

## Admin Dashboard

Access the admin dashboard at `/admin`

### Features:
1. **Dashboard Overview** - Statistics and recent activity
2. **Products Management** - Add, edit, delete products with image galleries
3. **Services Management** - Add, edit, delete services
4. **Quotations** - View requests, update status, manage quotations
5. **Messages** - View contact form submissions, mark as read/replied

### Navigation:
- `/admin` - Dashboard home
- `/admin/products` - Products management
- `/admin/services` - Services management
- `/admin/quotations` - Quotations management
- `/admin/messages` - Messages management

## Frontend Integration

### Using Zustand Stores

```typescript
import { useProductStore } from '@/store/useProductStore'

function MyComponent() {
  const { products, loading, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      {loading ? 'Loading...' : products.map(product => ...)}
    </div>
  )
}
```

### Available Stores:
- `useProductStore` - Product management
- `useServiceStore` - Service management
- `useQuotationStore` - Quotation management
- `useMessageStore` - Message management

## Migration from Static Data

The static data from `ProductsData.tsx` and `servicesData.tsx` has been migrated to the database via the seed script. The original data files can be kept for reference or removed if desired.

### Dynamic Data Loading

Components now fetch data from the API instead of using static imports:

```typescript
// Old approach
import productData from '@/components/Products/ProductsData'

// New approach
const { products, fetchProducts } = useProductStore()
useEffect(() => { fetchProducts() }, [])
```

## Production Deployment

### Environment Variables

Ensure the following are set in your production environment:

```env
DATABASE_URL="your_production_database_url"
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="https://yourdomain.com"
NODE_ENV="production"
```

### Build and Deploy

```bash
npm run build
npm run start
```

Or deploy to Vercel/other platforms that support Next.js.

## Troubleshooting

### Prisma Client Issues
If you encounter Prisma Client errors:
```bash
npm run db:generate
```

### Migration Errors
Reset the database (WARNING: This will delete all data):
```bash
npx prisma migrate reset
npm run db:seed
```

### Database Connection Issues
- Verify DATABASE_URL in .env is correct
- Ensure PostgreSQL is running
- Check firewall/network settings

## Support

For issues or questions, please contact the Wachno Engineering development team.

## Tech Stack Summary

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Radix UI
- **State Management**: Zustand
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Icons**: Lucide React
- **Date Handling**: date-fns
