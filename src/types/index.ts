// Task Types
export type TaskType = "daily" | "semester";

// Duration in days
export type Duration = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Payment Methods
export type PaymentMethod = "gopay" | "shopeepay" | "transfer";

// Order State
export interface OrderData {
  // Step 1: Task Type Selection
  taskType: TaskType | null;

  // Step 2: Duration Selection
  duration: Duration | null;

  // Step 3: User Details
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  description: string;
  attachmentFile: File | null;
  attachmentFileName: string;

  // Step 4: Payment Method
  paymentMethod: PaymentMethod | null;

  // Calculated Price
  basePrice: number;
  multiplier: number;
  totalPrice: number;
}

// Pricing Configuration
export interface PricingConfig {
  basePrice: number;
  dailyTask: number;
  semesterTask: number;
  durationMultipliers: Record<Duration, number>;
}
