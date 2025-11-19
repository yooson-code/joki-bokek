# Setup & Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm atau yarn

### Installation

```bash
# 1. Navigate to project directory
cd /home/yooson/Documents/joki-bokek

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

## 📁 Project Structure

### Pages & Routes

```
/                           → Landing page & homepage
/steps/task                 → Step 1: Select task type
/steps/duration             → Step 2: Select duration & see price
/steps/details              → Step 3: Fill personal details
/steps/payment              → Step 4: Select payment method
/steps/review               → Step 5: Review & confirm order
```

### Components

**Common Components** (`src/components/common/`)
- `Stepper.tsx` - Progress indicator
- `NavigationButtons.tsx` - Previous/Next buttons
- `Card.tsx` - Reusable card wrapper

### State Management

`src/contexts/OrderContext.tsx` - Global state management
- `useOrder()` hook to access order data
- Persists data across page navigation

### Types

`src/types/index.ts` - TypeScript types
- `OrderData` interface
- `TaskType`, `Duration`, `PaymentMethod` types
- `PricingConfig` interface

### Utilities

`src/utils/constants.ts` - Configuration constants
- `PRICING` - Base prices and multipliers
- `TASK_TYPES` - Task options
- `DURATIONS` - Duration options
- `PAYMENT_METHODS` - Payment options

`src/utils/helpers.ts` - Helper functions
- `calculatePrice()` - Calculate total price
- `formatCurrency()` - Format to IDR currency
- `validateEmail()` - Validate email format
- `validatePhoneNumber()` - Validate phone number
- `formatPhoneNumber()` - Convert to +62 format

## 🛠️ Development Commands

```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript type checker
npm run tsc

# Run linter
npm run lint
```

## 📝 Key Files to Customize

### 1. Pricing Configuration
**File**: `src/utils/constants.ts`

```typescript
export const PRICING: PricingConfig = {
  basePrice: 50000,              // Base price
  dailyTask: 50000,              // Daily task base
  semesterTask: 150000,          // Semester task base
  durationMultipliers: {
    1: 3.5, 2: 3.0, 3: 2.5, // ... adjust these values
    4: 2.0, 5: 1.5, 6: 1.2, 7: 1.0
  },
};
```

### 2. Task Types
**File**: `src/utils/constants.ts`

```typescript
export const TASK_TYPES = {
  daily: {
    id: 'daily',
    label: 'Tugas Harian',
    description: '...',
    icon: '📚',
  },
  semester: { /* ... */ }
};
```

### 3. Payment Methods
**File**: `src/utils/constants.ts`

```typescript
export const PAYMENT_METHODS = {
  gopay: { id: 'gopay', label: 'GoPay', icon: '💳', color: 'bg-blue-500' },
  shopeepay: { /* ... */ },
  transfer: { /* ... */ }
};
```

## 🔗 Integration Points

### Backend API Integration

To connect with backend, modify `/steps/review/page.tsx`:

```typescript
const handleConfirm = async () => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Success - show message, redirect, etc
      router.push('/success/' + data.orderId);
    } else {
      // Handle error
      alert('Error: ' + data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Network error occurred');
  }
};
```

### Required API Endpoints

```
POST /api/orders
- Body: OrderData
- Response: { orderId, status, message }

POST /api/validate-phone
- Body: { phoneNumber }
- Response: { valid, formatted }

POST /api/validate-email  
- Body: { email }
- Response: { valid }

GET /api/pricing
- Response: { pricing, taskTypes, durations }
```

## 🎨 Styling & Tailwind CSS

All components use Tailwind CSS utility classes.

### Custom Colors Used
- Blue: Primary action (`bg-blue-500`, `text-blue-600`)
- Green: Success (`bg-green-500`)
- Red: Danger/Error (`text-red-500`)
- Gray: Neutral elements

### Responsive Classes
- Mobile: Default classes
- Tablet: `md:` prefix
- Desktop: `lg:` prefix

Example:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* 1 col mobile, 2 cols tablet, 4 cols desktop */}
</div>
```

## 📦 Adding New Dependencies

```bash
# Add a package
npm install package-name

# Add dev dependency
npm install --save-dev package-name

# Remove a package
npm uninstall package-name
```

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### TypeScript errors
```bash
# Generate fresh types
npm run build
```

### Cache issues
```bash
# Clear Next.js cache
rm -rf .next

# Then rebuild
npm run dev
```

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🔐 Environment Variables

Create `.env.local` file:

```env
# Payment Gateway Keys (if needed)
NEXT_PUBLIC_PAYMENT_KEY=xxxxx
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Backend URL
NEXT_PUBLIC_BACKEND_URL=https://your-backend.com
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Vercel auto-detects Next.js
5. Click Deploy

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod
```

**Docker:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

**Questions or issues? Check the documentation or create an issue!**
