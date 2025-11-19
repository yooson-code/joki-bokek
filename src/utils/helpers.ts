import { DAILY_TASK_PRICING, SEMESTER_TASK_PRICING } from "./constants";
import { TaskType, Duration } from "@/types";

export function calculatePrice(taskType: TaskType, duration: Duration): number {
  // Gunakan sistem harga baru
  if (taskType === "daily") {
    switch (duration) {
      case 1:
        return DAILY_TASK_PRICING.price1Day;
      case 2:
        return DAILY_TASK_PRICING.price2Day;
      case 3:
        return DAILY_TASK_PRICING.price3Day;
      case 4:
        return DAILY_TASK_PRICING.price4Day;
      case 5:
        return DAILY_TASK_PRICING.price5Day;
      case 6:
        return DAILY_TASK_PRICING.price6Day;
      case 7:
        return DAILY_TASK_PRICING.price7Day;
      default:
        return 0;
    }
  } else if (taskType === "semester") {
    switch (duration) {
      case 1:
        return SEMESTER_TASK_PRICING.price1Day;
      case 2:
        return SEMESTER_TASK_PRICING.price2Day;
      case 3:
        return SEMESTER_TASK_PRICING.price3Day;
      case 4:
        return SEMESTER_TASK_PRICING.price4Day;
      case 5:
        return SEMESTER_TASK_PRICING.price5Day;
      case 6:
        return SEMESTER_TASK_PRICING.price6Day;
      case 7:
        return SEMESTER_TASK_PRICING.price7Day;
      default:
        return 0;
    }
  }

  return 0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");

  // If starts with 0, replace with +62
  if (cleaned.startsWith("0")) {
    return "+62" + cleaned.slice(1);
  }

  // If already starts with +62 or 62, keep as is
  if (cleaned.startsWith("62") || cleaned.startsWith("+62")) {
    return "+" + cleaned.replace(/^(\+)?62/, "62");
  }

  // Otherwise, assume it's without country code and add +62
  return "+62" + cleaned;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  // Indonesian phone number: 10-13 digits, starting with 8
  return (
    /^8\d{8,12}$/.test(cleaned) ||
    /^\+628\d{8,11}$/.test(phone) ||
    /^628\d{8,11}$/.test(cleaned)
  );
}

export function getDurationLabel(duration: Duration): string {
  return `${duration} Hari`;
}

export function getPriceDescription(
  taskType: TaskType,
  duration: Duration
): string {
  const price = calculatePrice(taskType, duration);
  const label = taskType === "daily" ? "Tugas Harian" : "Tugas Akhir/Capstone";
  return `${label} - ${duration} hari: ${formatCurrency(price)}`;
}
