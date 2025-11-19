# 🚀 Quick Reference - Joki Bokek

## 📍 Project Location
```
/home/yooson/Documents/joki-bokek
```

## ⚡ Quick Commands

```bash
# Install & Run
npm install
npm run dev

# Build
npm run build
npm start

# Lint
npm run lint

# Type Check
npm run tsc
```

## 🔗 Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/steps/task` | Select task type |
| `/steps/duration` | Choose duration & see price |
| `/steps/details` | Fill personal details |
| `/steps/payment` | Select payment method |
| `/steps/review` | Review & confirm |

## 💾 Key Files to Modify

| File | Purpose |
|------|---------|
| `src/utils/constants.ts` | Change pricing, task types, payment methods |
| `src/app/page.tsx` | Modify landing page content |
| `src/steps/review/page.tsx` | Add backend API call for order submission |
| `.env.local` | Add environment variables |

## 📊 Pricing Configuration

**File**: `src/utils/constants.ts`

```typescript
basePrice: 50000,              // Rp 50.000
dailyTask: 50000,              // Rp 50.000
semesterTask: 150000,          // Rp 150.000
durationMultipliers: {
  1: 3.5,  // 1 day = 3.5x
  2: 3.0,
  3: 2.5,
  4: 2.0,
  5: 1.5,
  6: 1.2,
  7: 1.0   // 7 days = 1.0x (cheapest)
}
```

## 🎯 Task Types

| Type | Base Price | Use Case |
|------|-----------|----------|
| Daily | Rp 50K | PR, homework, quizzes |
| Semester | Rp 150K | Papers, projects, presentations |

## 💳 Payment Methods

- GoPay (`gopay`)
- ShopeePay (`shopeepay`)
- Transfer Bank (`transfer`)

## 📋 Form Fields

**Personal Details Page**:
- Full Name (required)
- Phone Number (required, 10-13 digits)
- Email (required, valid format)
- Address (required)
- Task Description (required)

## 🔐 Validations

```typescript
// Email: must be valid format
validateEmail(email: string): boolean

// Phone: 10-13 digits, converts 0 to +62
validatePhoneNumber(phone: string): boolean

// Both used in details page form
```

## 💰 Price Calculation

```typescript
calculatePrice(taskType: TaskType, duration: Duration): number

Example:
- Daily + 1 day = 50,000 × 3.5 = 175,000
- Semester + 7 days = 150,000 × 1.0 = 150,000
```

## 🎨 UI Components

**Reusable Components**:
- `Stepper` - Progress indicator
- `NavigationButtons` - Prev/Next buttons
- `Card` - Card wrapper

**All components in**: `src/components/common/`

## 🌐 State Management

**Hook**: `useOrder()`

```typescript
const { 
  order,                          // Current order data
  setTaskType,                    // Set task type
  setDuration,                    // Set duration
  setUserDetails,                 // Set personal info
  setPaymentMethod,               // Set payment
  resetOrder                      // Reset all
} = useOrder();
```

## 📱 Responsive Breakpoints

- **Mobile**: Default (320px+)
- **Tablet (md)**: 768px+
- **Desktop (lg)**: 1024px+

Example:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* 1 col mobile, 2 cols tablet, 4 cols desktop */}
</div>
```

## 🎨 Colors

- **Primary (Blue)**: `blue-500`, `blue-600`
- **Success (Green)**: `green-500`
- **Error (Red)**: `red-500`, `text-red-500`
- **Neutral (Gray)**: `gray-600`, `gray-700`

## 📦 Dependencies

```json
"dependencies": {
  "react": "^19.0.0-rc",
  "react-dom": "^19.0.0-rc",
  "next": "16.0.3"
}

"devDependencies": {
  "@tailwindcss/postcss": "^4",
  "tailwindcss": "^4",
  "typescript": "^5",
  "@types/react": "^19",
  "@types/react-dom": "^19"
}
```

## 🐛 Common Issues & Fixes

**Port 3000 in use**:
```bash
npm run dev -- -p 3001
```

**TypeScript errors**:
```bash
npm run build  # or npx tsc
```

**Cache issues**:
```bash
rm -rf .next
npm run dev
```

## 📚 Documentation Files

- `README.md` - Main docs
- `SETUP_GUIDE.md` - Setup instructions
- `FLOW_DIAGRAM.md` - Flow diagrams
- `ROADMAP.md` - Future features
- `PROJECT_SUMMARY.md` - Deliverables

## 🔌 Backend Integration Points

**File to modify**: `/src/app/steps/review/page.tsx`

```typescript
// Add API call in handleConfirm():
const response = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(order)
});
```

## 🚀 Deployment

**Vercel** (recommended):
1. Push to GitHub
2. Go to vercel.com
3. Import repository
4. Click Deploy

**Docker**:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Project Stats

- **Total Files**: 14 TypeScript/JavaScript
- **Total Components**: 3 reusable
- **Total Pages**: 6 pages
- **Lines of Code**: ~2500+
- **State Management**: React Context
- **Styling**: Tailwind CSS (~1000+ utilities used)

## ✨ Features Summary

✅ 5-step ordering flow
✅ Dynamic pricing (1-7 days)
✅ Form validation
✅ Payment methods (3 options)
✅ Responsive design
✅ Professional UI
✅ TypeScript strict mode
✅ Error handling

## 🎯 Next Steps

1. **Setup Backend** - Create API endpoints
2. **Add Auth** - NextAuth.js for user accounts
3. **Payment** - Integrate Midtrans/Stripe
4. **Admin Dashboard** - Track orders

See `ROADMAP.md` for full enhancement plan.

---

**🎉 Project Ready for Development!**

**Start Command**: `npm run dev` → Open `http://localhost:3000`
