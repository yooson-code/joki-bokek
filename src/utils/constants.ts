import { PricingConfig, Duration } from "@/types";

// ============================================
// HARGA TUGAS HARIAN (SMA/SMK semua jurusan & Kuliah TIF)
// Ubah nilai di bawah untuk mengubah harga
// ============================================
export const DAILY_TASK_PRICING = {
  price1Day: 80000, // 1 hari
  price2Day: 65000, // 2 hari
  price3Day: 50000, // 3 hari
  price4Day: 40000, // 4 hari
  price5Day: 30000, // 5 hari
  price6Day: 20000, // 6 hari
  price7Day: 15000, // 7 hari
};

// ============================================
// HARGA TUGAS AKHIR / CAPSTONE / SKRIPSI
// Ubah nilai di bawah untuk mengubah harga
// ============================================
export const SEMESTER_TASK_PRICING = {
  price1Day: 150000, // 1 hari
  price2Day: 140000, // 2 hari
  price3Day: 120000, // 3 hari
  price4Day: 80000, // 4 hari
  price5Day: 60000, // 5 hari
  price6Day: 40000, // 6 hari
  price7Day: 30000, // 7 hari
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
