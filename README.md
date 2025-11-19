# Joki Bokek - Platform Bantuan Tugas Online

Platform web untuk layanan bantuan tugas profesional yang dibangun dengan Next.js 16, React, TypeScript, dan Tailwind CSS.

## 🎯 Konsep

**Joki Bokek** adalah platform yang memudahkan siswa/mahasiswa untuk memesan bantuan tugas dengan sistem yang user-friendly dan transparan. Sistem harga kami dinamis berdasarkan jenis tugas dan durasi pengerjaan.

## ✨ Fitur Utama

### 1. **Pemilihan Jenis Tugas** 📚
   - **Tugas Harian**: PR, soal latihan, ringkasan, jurnal
   - **Tugas Besar**: Makalah, presentasi, skripsi, proyek semester

### 2. **Sistem Durasi & Pricing** ⏰💰
   - Durasi: 1-7 hari
   - **Pricing dinamis**: 
     - 1 hari: 3.5x lipat (Ekspres/Termahal)
     - 7 hari: 1.0x lipat (Regular/Termurah)
   - Semakin lama durasi, semakin murah harganya!

### 3. **Formulir Data Pribadi** 👤
   - Nama lengkap
   - Nomor HP/WhatsApp
   - Email
   - Alamat lengkap
   - Deskripsi detail tugas

### 4. **Metode Pembayaran** 💳
   - GoPay
   - ShopeePay
   - Transfer Bank

### 5. **Review & Konfirmasi** ✓
   - Halaman review lengkap semua data
   - Konfirmasi sebelum pembayaran
   - Ringkasan harga transparan

## 🏗️ Struktur Project

```
src/
├── app/
│   ├── page.tsx                 # Landing page homepage
│   ├── layout.tsx              # Root layout dengan OrderProvider
│   ├── globals.css
│   └── steps/
│       ├── task/               # Step 1: Pilih jenis tugas
│       ├── duration/           # Step 2: Pilih durasi
│       ├── details/            # Step 3: Isi data pribadi
│       ├── payment/            # Step 4: Pilih metode pembayaran
│       └── review/             # Step 5: Review & konfirmasi
├── components/
│   ├── common/
│   │   ├── Stepper.tsx         # Progress stepper
│   │   ├── NavigationButtons.tsx # Tombol navigasi
│   │   └── Card.tsx            # Reusable card component
│   └── forms/                  # Form components
├── contexts/
│   └── OrderContext.tsx        # Global state management
├── types/
│   └── index.ts               # Type definitions
└── utils/
    ├── constants.ts           # Konstanta (pricing, task types, payment methods)
    └── helpers.ts             # Helper functions (validasi, format, kalkulasi)
```

## 🔄 User Flow

```
Landing Page (/)
    ↓
Step 1: Pilih Jenis Tugas (/steps/task)
    ↓
Step 2: Pilih Durasi (/steps/duration)
    ↓
Step 3: Isi Data Pribadi (/steps/details)
    ↓
Step 4: Pilih Metode Bayar (/steps/payment)
    ↓
Step 5: Review & Konfirmasi (/steps/review)
    ↓
Pesanan Berhasil!
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Validation**: Custom helpers

## 🚀 Cara Menggunakan

### Setup Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

### Build untuk Production

```bash
# Build optimized production build
npm run build

# Start production server
npm start
```

## 💡 Fitur Pricing

### Base Price Calculation

```
Harga Akhir = Base Price × Jenis Tugas × Duration Multiplier

Contoh:
- Tugas Harian + 1 hari: Rp 50.000 × 1 × 3.5 = Rp 175.000
- Tugas Harian + 7 hari: Rp 50.000 × 1 × 1.0 = Rp 50.000
- Tugas Semester + 1 hari: Rp 150.000 × 1 × 3.5 = Rp 525.000
- Tugas Semester + 7 hari: Rp 150.000 × 1 × 1.0 = Rp 150.000
```

### Duration Multiplier

| Durasi | Multiplier | Label |
|--------|-----------|-------|
| 1 hari | 3.5x | Ekspres (Termahal) |
| 2 hari | 3.0x | |
| 3 hari | 2.5x | |
| 4 hari | 2.0x | |
| 5 hari | 1.5x | |
| 6 hari | 1.2x | |
| 7 hari | 1.0x | Regular (Termurah) |

## 🔐 Validasi Input

### Email
- Format: `user@domain.com`
- Validasi regex sederhana

### Nomor HP
- Format: `08xx xxxx xxxx` atau `+62xxx`
- Panjang: 10-13 digit
- Support konversi otomatis dari 0 ke +62

## 📝 State Management (Context API)

Context menyimpan data order selama user navigasi antar halaman.

## 🎨 Design Features

- Responsive Mobile-First
- Gradient backgrounds
- Emoji icons untuk visual
- Stepper visual progress
- Real-time form validation
- Auto price calculation

## 📞 Fitur yang Sudah Diimplementasikan

✅ Pilihan jenis tugas (Tugas Harian & Besar)
✅ Durasi 1-7 hari dengan dynamic pricing
✅ Form data pribadi dengan validasi
✅ Metode pembayaran (GoPay, ShopeePay, Transfer)
✅ Review page lengkap
✅ Sistem harga transparan
✅ Landing page profesional
✅ Smooth navigation antar steps
✅ Error handling & validation messages

---

**Dibuat dengan ❤️ menggunakan Next.js**
