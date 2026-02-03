# 💍 Morango E-commerce - Frontend

> Customer-facing and admin e-commerce platform for jewelry sales built with **Next.js 15**, **React 19**, and **TailwindCSS**.

## Overview

This is the frontend application for **Morango Joyas**, a full-stack e-commerce platform featuring:

- 🛍️ Product browsing and cart management
- 🛒 Checkout flow with MercadoPago integration
- 👤 User authentication & account management
- 📦 Order tracking and history
- 🔐 Admin dashboard for order and product management
- 🌙 Dark mode support
- 📱 Mobile-responsive design

**See also:** [Backend Repository](https://github.com/Thomas465xd/morango-backend)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:3000` (or configure via `NEXT_PUBLIC_BACKEND_API_URL`)

### Installation & Development

```bash
# Clone and install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:4000/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="asdfgh"
NEXT_PUBLIC_CLOUDINARY_API_KEY=cloudinary-key
NEXT_PUBLIC_MP_PUBLIC_KEY=mp-public-key
NEXT_PUBLIC_FREE_SHIPPING=public-shipping-value
```

---

## 📁 Project Structure

```txt
client/
├── app/                      # Next.js App Router pages
│   ├── home/                 # Public customer pages
│   │   ├── page.tsx          # Home/product listing
│   │   ├── products/         # Product details
│   │   ├── cart/             # Shopping cart
│   │   ├── orders/           # Order history
│   │   └── profile/          # User account
│   ├── admin/                # Protected admin routes
│   │   ├── orders/           # Order management
│   │   ├── products/         # Product management
│   │   ├── users/            # User management
│   │   └── analytics/        # Sales analytics
│   ├── auth/                 # Authentication
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── checkout/             # Checkout & payment
│   │   ├── page.tsx
│   │   ├── success/
│   │   ├── failure/
│   │   └── pending/
│   └── layout.tsx            # Root layout with providers
├── components/               # Reusable React components
│   ├── providers/            # Context providers (Query, Theme, Toast, MercadoPago)
│   ├── admin/                # Admin-specific components
│   ├── checkout/             # Checkout flow components
│   ├── home/                 # Customer UI components
│   ├── auth/                 # Authentication forms
│   ├── payment/              # Payment status views
│   ├── products/             # Product display components
│   ├── ui/                   # Generic UI components
│   └── skeletons/            # Loading skeletons
├── src/
│   ├── api/                  # Axios API clients
│   │   ├── AuthAPI.ts
│   │   ├── ProductAPI.ts
│   │   ├── OrderAPI.ts
│   │   └── PaymentAPI.ts
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts        # Authentication state
│   │   ├── useTimer.ts       # Countdown timers
│   │   ├── useMobile.ts      # Mobile detection
│   │   └── useFilters.ts     # Query parameter filters
│   ├── store/                # Zustand state stores
│   │   └── useCartStore.ts
│   ├── types/                # TypeScript interfaces
│   │   └── index.ts          # Centralized types
│   └── utils/                # Utility functions
│       ├── date.ts           # Date formatting
│       ├── price.ts          # Currency formatting (CLP)
│       ├── text.ts           # Text transformations
│       └── copy.ts           # Clipboard utilities
├── lib/
│   └── axios.ts              # Shared axios instance
├── public/                   # Static assets
├── globals.css               # Global styles
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # TailwindCSS config
└── package.json
```

---

## 🔨 Available Scripts

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🏗️ Architecture

### Technology Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Styling:** TailwindCSS 4 with dark mode
- **State Management:**
  - Server State: React Query (TanStack Query)
  - Client State: Zustand
  - Async Forms: react-hook-form + zod
- **HTTP Client:** Axios (shared instance with credentials)
- **Payment:** MercadoPago SDK
- **Icons:** Lucide React
- **Notifications:** React Toastify + SweetAlert2
- **Theming:** next-themes

### Key Data Flows

**Authentication Flow:**

1. User logs in via `LoginForm` → calls `AuthAPI.login()`
2. Backend issues JWT in httpOnly cookie
3. Subsequent requests auto-include cookie
4. `useAuth()` hook verifies session on app load
5. Protected routes redirect unauthenticated users to `/auth/login`

**Shopping Flow:**

1. User browses products (fetched via `ProductAPI`)
2. Adds items to cart (stored in `useCartStore`)
3. Proceeds to checkout → `CheckoutForm` captures shipping address
4. Payment collected via `CheckoutPayment` (MercadoPago)
5. Backend webhook updates order status
6. Redirect to success/failure page with order tracking

**State Management:**

- **useQuery:** Product lists, user orders, admin data (cached + auto-refetch)
- **useMutation:** Form submissions with error/success handlers
- **Zustand:** Cart items (persists across page navigation)

---

## 💻 Development Guidelines

### Adding a New Feature

1. **Create API client** in `src/api/FeatureAPI.ts`

   ```typescript
   export const fetchData = async (params) => {
     const response = await api.get('/endpoint', { params });
     return response.data;
   };
   ```

2. **Create components** in `components/feature/`
   - Use functional components with hooks
   - Keep components focused and single-responsibility

3. **Create pages** in `app/feature/page.tsx`
   - Leverage Next.js App Router layout nesting
   - Use `useQuery`/`useMutation` for data fetching

4. **Add types** to `src/types/index.ts`

   ```typescript
   export interface Feature {
     id: string;
     name: string;
   }
   ```

### Styling Patterns

Use the status badge pattern from `components/admin/orders/OrderEntry.tsx`:

```typescript
const statusConfig: Record<StatusType, { color: string; bgColor: string }> = {
  "Active": { 
    color: "text-green-800 dark:text-green-300", 
    bgColor: "bg-green-100 dark:bg-green-900/30" 
  },
};

<div className={`${statusConfig[status].bgColor} ${statusConfig[status].color}`}>
  {status}
</div>
```

### Data Fetching Patterns

**Reading data:**

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: () => ProductAPI.getProducts()
});
```

**Mutating data:**

```typescript
const { mutate } = useMutation({
  mutationFn: (data) => ProductAPI.updateProduct(data),
  onSuccess: () => {
    toast.success('Updated!');
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
  onError: (error) => toast.error(error.message)
});
```

### Dark Mode

All new components should support dark mode:

```typescript
className="text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900"
```

---

## 📦 Deployment

### Docker Build

```bash
docker build -t morango-frontend .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_BACKEND_API_URL=https://api.morango.com \
  -e NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=your_key \
  morango-frontend
```

---

## 🔗 Integration Points

- **Backend API:** `NEXT_PUBLIC_BACKEND_API_URL` (Express.js server)
- **MercadoPago:** SDK initialization in `MercadoPagoProvider`
- **Cloudinary:** Image hosting via `remotePatterns` in `next.config.ts`
- **EmailJS:** Contact form submissions (client-side)

---

## 📝 Important Notes

- **Language:** All UI text is in **Spanish** (es-ES)
- **Currency:** Chilean Peso (CLP) - use `formatToCLP()` utility
- **Date Format:** Use `formatDate()` from `src/utils/date.ts`
- **Authentication:** Always verify routes with `useAuth()` before rendering protected content
- **Caching:** Invalidate React Query on mutations: `queryClient.invalidateQueries({ queryKey: [...] })`

---

**Made with ♥️ Thomas Schrödinger.**
