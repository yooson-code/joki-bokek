# GitHub Copilot Instructions for Joki Bokek Project

## Project Overview

This is a Next.js-based web platform for homework/task assistance services called "Joki Bokek". The platform allows users to order task completion services through a 5-step process.

## Key Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API (OrderContext)
- **Form Validation**: Custom helpers

### Project Structure
- `/src/app/` - Pages and routing
- `/src/components/` - Reusable UI components
- `/src/contexts/` - React Context for state management
- `/src/types/` - TypeScript type definitions
- `/src/utils/` - Helper functions and constants

## User Flow

```
Landing Page → Task Selection → Duration → Details Form → Payment → Review
```

## Important Patterns

### 1. State Management
Use the `useOrder()` hook to access global order data:

```typescript
const { order, setTaskType, setDuration, setUserDetails, setPaymentMethod } = useOrder();
```

### 2. Page Protection
Each step page validates required data before rendering:

```typescript
if (!order.taskType || !order.duration) {
  router.push('/steps/task');
  return null;
}
```

### 3. Price Calculation
Always use `calculatePrice(taskType, duration)` from utils:

```typescript
const totalPrice = calculatePrice(order.taskType, order.duration);
```

### 4. Form Validation
Use provided validators before data submission:
- `validateEmail(email)` - Email format validation
- `validatePhoneNumber(phone)` - Phone number validation (10-13 digits)

### 5. Currency Formatting
Always format prices using `formatCurrency()`:

```typescript
<p>{formatCurrency(totalPrice)}</p> // Output: Rp 175.000
```

## File Conventions

- Page files: `page.tsx` in route directories
- Component files: PascalCase (e.g., `Stepper.tsx`)
- Utility files: camelCase (e.g., `helpers.ts`, `constants.ts`)
- Type files: All types in `src/types/index.ts`

## Constants Configuration

All business logic constants are in `src/utils/constants.ts`:
- `PRICING` - Base prices and multipliers
- `TASK_TYPES` - Task type options
- `DURATIONS` - Available durations (1-7 days)
- `PAYMENT_METHODS` - Payment method options

To modify pricing, task types, or payment methods, always edit this file.

## Common Tasks

### Adding a New Page
1. Create directory: `src/app/steps/new-step/`
2. Create `page.tsx` with `'use client'` directive
3. Import `useOrder` hook and necessary components
4. Add validation for required order data
5. Use `Stepper` component for progress
6. Use `NavigationButtons` for navigation

### Updating Pricing
Edit `PRICING` object in `src/utils/constants.ts`:

```typescript
durationMultipliers: {
  1: 3.5,  // 1 day multiplier
  7: 1.0   // 7 days multiplier
}
```

### Adding Form Validation
1. Add validation function to `src/utils/helpers.ts`
2. Call in page component's validation handler
3. Display error message if validation fails

### Styling Guidelines
- Use Tailwind CSS utility classes (no custom CSS)
- Mobile-first responsive design (sm:, md:, lg: prefixes)
- Consistent color scheme:
  - Primary: Blue (blue-500, blue-600)
  - Success: Green (green-500)
  - Error: Red (red-500)
  - Background: Gradients from blue/indigo

## API Integration Points

When integrating with backend, modify:
1. `/steps/review/page.tsx` - `handleConfirm()` function
2. Create `/src/app/api/` endpoints for:
   - POST /api/orders - Save order to database
   - Validate payment
   - Send confirmation emails

## Code Quality Guidelines

- Always add 'use client' directive to interactive components
- Use TypeScript strict mode
- Add error boundaries for async operations
- Validate all form inputs before submission
- Use React hooks (useState, useContext, useRouter)
- Keep components focused and reusable

## Common Issues & Solutions

1. **Navigation not working**: Check useRouter import from 'next/navigation'
2. **Form validation not showing**: Ensure error state is updated in handleChange
3. **Price not calculating**: Use calculatePrice() and pass both taskType AND duration
4. **Context data lost**: Ensure OrderProvider wraps all pages in layout.tsx

## Testing Scenarios

- [ ] Navigate through all 5 steps
- [ ] Try form submission with empty fields (should show errors)
- [ ] Verify price updates when selecting different durations
- [ ] Test form validation for email and phone number
- [ ] Check responsive design on mobile/tablet/desktop
- [ ] Verify stepper progress shows correctly

## Performance Considerations

- Use React Context for global state (avoid prop drilling)
- Keep components small and focused
- Lazy load heavy components if needed
- Use Next.js Image component for images (when added)
- Optimize for mobile devices (responsive design)

## Git Commit Message Format

```
feature: Add X functionality
fix: Resolve X issue
refactor: Improve X component
docs: Update X documentation
```

---

**Always refer to existing code patterns when adding new features to maintain consistency!**
