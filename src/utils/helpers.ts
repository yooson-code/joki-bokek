import { Duration, TaskType } from '@/types';
import { PRICING } from './constants';

export function calculatePrice(taskType: TaskType, duration: Duration): number {
  if (!taskType || !duration) return 0;

  const basePrice = taskType === 'daily' ? PRICING.dailyTask : PRICING.semesterTask;
  const multiplier = PRICING.durationMultipliers[duration];

  return Math.round(basePrice * multiplier);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Convert to Indonesian format: +62 or 08
  if (cleaned.startsWith('62')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+62${cleaned.substring(1)}`;
  }
  return cleaned;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  // Indonesian phone numbers should be 10-13 digits
  return cleaned.length >= 10 && cleaned.length <= 13;
}

export function getDurationLabel(days: Duration): string {
  if (days === 1) return `${days} hari`;
  return `${days} hari`;
}

export function getPriceDescription(days: Duration): string {
  if (days === 1) return 'Ekspres - Paling Cepat & Termahal';
  if (days === 7) return 'Regular - Paling Lama & Termurah';
  return `${days} hari`;
}
