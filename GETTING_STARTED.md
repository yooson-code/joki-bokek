# 🎯 Getting Started - Joki Bokek

## ✨ What You've Got

A complete, production-ready Next.js web application for a homework/task assistance service platform with:

- 🎨 Professional UI with Tailwind CSS
- 📊 Dynamic pricing system (1-7 days)
- 📝 Form validation with error handling
- 💾 State management with React Context
- 📱 Fully responsive design
- ✅ 5-step guided user flow
- 💳 Multiple payment options
- 🚀 Deployment-ready code

## 🚀 Installation (5 minutes)

### Step 1: Navigate to Project
```bash
cd /home/yooson/Documents/joki-bokek
```

### Step 2: Install Dependencies
```bash
npm install
```
This installs all required packages (~40 packages, ~150MB).

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
```
http://localhost:3000
```

**That's it! 🎉 Your app is now running!**

---

## 🧭 Where to Start

### 1. Explore the Application
Visit `http://localhost:3000` and:
- [ ] Click through all 5 steps
- [ ] Try form validation
- [ ] Change task type and see price update
- [ ] Try different durations

### 2. Read the Documentation
- **`README.md`** - Project overview
- **`QUICK_REFERENCE.md`** - Cheat sheet
- **`FLOW_DIAGRAM.md`** - Visual flows
- **`SETUP_GUIDE.md`** - Development guide

### 3. Customize Your Project

#### Change Pricing
**File**: `src/utils/constants.ts`
```typescript
export const PRICING: PricingConfig = {
  basePrice: 50000,              // Change here
  dailyTask: 50000,              // Daily task base
  semesterTask: 150000,          // Semester task base
  durationMultipliers: {
    1: 3.5,   // 1 day - most expensive
    7: 1.0    // 7 days - cheapest
  },
};
```

#### Change Task Types
**File**: `src/utils/constants.ts`
```typescript
export const TASK_TYPES = {
  daily: {
    id: 'daily',
    label: 'Tugas Harian',
    description: 'Your custom description',
    icon: '📚',  // Change emoji
  },
  // Add or remove task types
};
```

#### Change Payment Methods
**File**: `src/utils/constants.ts`
```typescript
export const PAYMENT_METHODS = {
  gopay: {
    id: 'gopay',
    label: 'GoPay',
    icon: '💳',
    color: 'bg-blue-500'
  },
  // Add/remove methods
};
```

#### Modify Landing Page
**File**: `src/app/page.tsx`
- Update welcome text
- Change hero section content
- Customize features list
- Modify footer information

---

## 🎯 Key Features to Test

### 1. Task Selection
- Navigate to `/steps/task`
- Select "Tugas Harian" or "Tugas Besar"
- Click "Pilih Durasi"

### 2. Dynamic Pricing
- Go to `/steps/duration`
- Notice prices for each duration
- Observe: 1 day is 3.5x, 7 days is 1.0x

### 3. Form Validation
- Go to `/steps/details`
- Try submitting empty form → See errors
- Fill partially → See which fields need attention
- Fill completely → "Pilih Metode Bayar" button enables

### 4. Payment Selection
- Select from GoPay, ShopeePay, or Transfer Bank
- See price summary update

### 5. Order Review
- Review all information before confirming
- Click "Konfirmasi & Bayar"
- See success message
- Order data resets for new order

---

## 📚 Available Commands

```bash
# Development
npm run dev              # Start dev server on :3000

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run tsc              # TypeScript type check

# Clean
rm -rf .next             # Clear Next.js cache
npm run clean            # (if available)
```

---

## 🏗️ Project Structure Overview

```
src/
├── app/                     # Pages & routing
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout + OrderProvider
│   └── steps/              # 5-step pages
│       ├── task/
│       ├── duration/
│       ├── details/
│       ├── payment/
│       └── review/
├── components/              # Reusable UI components
│   └── common/
│       ├── Stepper.tsx
│       ├── NavigationButtons.tsx
│       └── Card.tsx
├── contexts/                # State management
│   └── OrderContext.tsx
├── types/                   # TypeScript types
│   └── index.ts
└── utils/                   # Helper functions & constants
    ├── constants.ts
    └── helpers.ts
```

---

## 💡 Common Customizations

### 1. Change Company Name
Search & replace "Joki Bokek" with your name in:
- `src/app/page.tsx` (homepage)
- `src/app/layout.tsx` (meta title)
- `README.md`
- Navigation components

### 2. Update Contact Information
**File**: `src/app/page.tsx` (footer section)
```tsx
<p className="text-gray-400">WhatsApp: YOUR_PHONE</p>
<p className="text-gray-400">Email: YOUR_EMAIL</p>
```

### 3. Add Your Logo
1. Place logo in `/public/logo.png`
2. Import in `src/app/page.tsx`
3. Replace text with `<Image src="/logo.png" />`

### 4. Change Color Scheme
Replace Tailwind classes:
- `bg-blue-500` → `bg-purple-500`
- `from-blue-50` → `from-purple-50`
Throughout components

### 5. Add More Payment Methods
**File**: `src/utils/constants.ts`
```typescript
export const PAYMENT_METHODS = {
  // ... existing methods
  dana: {
    id: 'dana',
    label: 'DANA',
    icon: '📱',
    color: 'bg-yellow-500'
  }
};
```

---

## 🔌 Next: Backend Integration

When ready to connect to backend:

### 1. Setup API Endpoint
Create `src/app/api/orders/route.ts`:
```typescript
export async function POST(request: Request) {
  const order = await request.json();
  
  // Save to database
  // Process payment
  // Send confirmation email
  
  return Response.json({ success: true });
}
```

### 2. Call API in Review Page
Modify `src/app/steps/review/page.tsx`:
```typescript
const handleConfirm = async () => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(order)
  });
  // Handle response
};
```

### 3. Add Database
```bash
npm install @prisma/client prisma
npx prisma init
```

### 4. Setup Payment Gateway
```bash
npm install midtrans-client
# or
npm install stripe
```

See `ROADMAP.md` for detailed backend implementation.

---

## 🚀 Deployment

### Quick Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repo
   - Click "Deploy"
   - Done! 🎉

### Deploy to Netlify

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### Deploy with Docker

1. **Create `Dockerfile`**:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build & run**:
   ```bash
   docker build -t joki-bokek .
   docker run -p 3000:3000 joki-bokek
   ```

---

## 📝 File a Bug / Request Feature

Found an issue? Want to add something?

1. Check `ROADMAP.md` for planned features
2. Modify code directly in `/src`
3. Test changes with `npm run dev`
4. Commit with clear message

---

## 💬 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## ✅ Checklist: Getting Started

- [ ] Navigated to project folder
- [ ] Ran `npm install`
- [ ] Started dev server with `npm run dev`
- [ ] Opened http://localhost:3000
- [ ] Clicked through all 5 steps
- [ ] Filled out complete form
- [ ] Confirmed order successfully
- [ ] Read README.md
- [ ] Reviewed project structure
- [ ] Identified customization areas

---

## 🎉 You're All Set!

Your Joki Bokek platform is ready to use. 

### Next Steps:
1. **Customize** pricing, colors, and content
2. **Integrate** backend and payment system
3. **Deploy** to production
4. **Launch** your service

---

**Happy coding! 🚀**

**Questions?** Check the documentation files or review the source code comments.

**Last Updated**: November 19, 2025
