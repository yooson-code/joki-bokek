import { PricingConfig, Duration } from "@/types";

// Pricing Configuration
// Tugas Harian: 10.000 - 80.000
// Tugas Akhir: hingga 200.000
export const PRICING: PricingConfig = {
  basePrice: 10000, // Rp 10.000 - base untuk tugas harian
  dailyTask: 10000, // Rp 10.000 - tugas harian minimal
  semesterTask: 50000, // Rp 50.000 - tugas akhir minimal
  durationMultipliers: {
    1: 8.0, // 1 hari - 80rb (10k x 8)
    2: 6.5, // 2 hari - 65rb
    3: 5.0, // 3 hari - 50rb
    4: 3.5, // 4 hari - 35rb
    5: 2.5, // 5 hari - 25rb
    6: 1.5, // 6 hari - 15rb
    7: 1.0, // 7 hari - 10rb (minimal)
  },
};

export const TASK_TYPES = {
  daily: {
    id: "daily",
    label: "Tugas Harian",
    description:
      "PR, soal latihan, praktik pemrograman, tugas lab, makalah, atau dokumentasi untuk SMA/SMK semua jurusan & Kuliah Teknik Informatika",
    icon: "📚",
  },
  semester: {
    id: "semester",
    label: "Tugas Akhir / Capstone / Skripsi",
    description:
      "Proyek akhir semester, aplikasi/website, penelitian, atau dokumentasi lengkap untuk SMA/SMK semua jurusan & Kuliah Teknik Informatika",
    icon: "🎓",
  },
};

export const DURATIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export const PAYMENT_METHODS = {
  gopay: {
    id: "gopay",
    label: "GoPay",
    icon: "💳",
    color: "bg-blue-500",
  },
  shopeepay: {
    id: "shopeepay",
    label: "ShopeePay",
    icon: "🛍️",
    color: "bg-red-500",
  },
  transfer: {
    id: "transfer",
    label: "Transfer Bank",
    icon: "🏦",
    color: "bg-green-500",
  },
};
