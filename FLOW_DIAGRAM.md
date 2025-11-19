# Flow Diagram - Joki Bokek Platform

## User Journey Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         LANDING PAGE (/)                        │
│                                                                 │
│  - Welcome & Introduction                                      │
│  - Features showcase                                           │
│  - Pricing overview                                            │
│  - Task types explanation                                      │
│  - CTA: "Mulai Pesan Tugas Sekarang"                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              STEP 1: PILIH JENIS TUGAS (/steps/task)            │
│                                                                 │
│  [📚 Tugas Harian]          [🎓 Tugas Besar]                  │
│  - PR & Latihan             - Makalah                          │
│  - Ringkasan Materi         - Presentasi                       │
│  - Jurnal                   - Skripsi/Tesis                    │
│  - Quiz                     - Proyek Semester                  │
│                                                                 │
│  Status: Order.taskType = selected                            │
│  Next: Button "Pilih Durasi →"                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│           STEP 2: PILIH DURASI (/steps/duration)               │
│                                                                 │
│  ┌─ 1 hari  ────── Rp 175.000 (3.5x) - EKSPRES ────┐          │
│  ├─ 2 hari  ────── Rp 150.000 (3.0x)               │          │
│  ├─ 3 hari  ────── Rp 125.000 (2.5x)               │          │
│  ├─ 4 hari  ────── Rp 100.000 (2.0x)               │          │
│  ├─ 5 hari  ────── Rp 75.000  (1.5x)               │          │
│  ├─ 6 hari  ────── Rp 60.000  (1.2x)               │          │
│  └─ 7 hari  ────── Rp 50.000  (1.0x) - REGULER ────┘          │
│                                                                 │
│  Price Calc: Base × TaskType × DurationMultiplier             │
│  Status: Order.duration + Order.totalPrice = calculated       │
│  Navigation: [← Kembali] [Isi Data Pribadi →]                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│          STEP 3: ISI DATA PRIBADI (/steps/details)              │
│                                                                 │
│  [Nama Lengkap]           Input: string                        │
│  [Nomor HP/WhatsApp]      Validasi: 10-13 digit               │
│  [Email]                  Validasi: regex email               │
│  [Alamat Lengkap]         Textarea untuk address              │
│  [Deskripsi Tugas]        Detail requirements                  │
│                                                                 │
│  Validasi Real-time:                                          │
│  - Nama: not empty                                            │
│  - Phone: valid format 10-13 digits                           │
│  - Email: valid email format                                  │
│  - Address: not empty                                         │
│  - Description: not empty                                     │
│                                                                 │
│  Status: Order = filled with all details                      │
│  Navigation: [← Kembali] [Pilih Metode Bayar →]               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│        STEP 4: PILIH METODE PEMBAYARAN (/steps/payment)        │
│                                                                 │
│  Payment Summary:                                              │
│  ┌─────────────────────────────┐                              │
│  │ Jenis Tugas: Tugas Harian  │                              │
│  │ Durasi: 1 hari            │                              │
│  │ ─────────────────────────  │                              │
│  │ Total: Rp 175.000         │                              │
│  └─────────────────────────────┘                              │
│                                                                 │
│  [💳 GoPay]    [🛍️ ShopeePay]    [🏦 Transfer Bank]           │
│                                                                 │
│  Status: Order.paymentMethod = selected                       │
│  Navigation: [← Kembali] [Lanjut ke Review →]                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│          STEP 5: REVIEW & KONFIRMASI (/steps/review)            │
│                                                                 │
│  📚 JENIS TUGAS:                                                │
│     Tugas Harian                                               │
│                                                                 │
│  ⏰ DURASI:                                                      │
│     1 Hari                                                      │
│                                                                 │
│  👤 DATA PRIBADI:                                               │
│     Nama: Budi Santoso                                         │
│     No. HP: 08123456789                                        │
│     Email: budi@email.com                                      │
│     Alamat: Jl. Contoh No. 123, Jakarta                       │
│     Deskripsi: Tugas Matematika bab integral...                │
│                                                                 │
│  💳 METODE PEMBAYARAN:                                          │
│     GoPay                                                       │
│                                                                 │
│  ┌──────────────────────────────────┐                         │
│  │  TOTAL PEMBAYARAN: Rp 175.000   │                         │
│  └──────────────────────────────────┘                         │
│                                                                 │
│  [← Edit Data] [✓ Konfirmasi & Bayar]                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                   ORDER SUCCESSFUL! ✅                          │
│                                                                 │
│  ✓ Pesanan Anda telah diterima!                                │
│  ✓ Admin akan menghubungi melalui WhatsApp                     │
│  ✓ Hasil dikirim melalui Email & WhatsApp                      │
│                                                                 │
│  Durasi: 1 hari                                                │
│  Total: Rp 175.000                                             │
│  No. Admin: 08xx xxxx xxxx                                     │
└─────────────────────────────────────────────────────────────────┘
```

## State Management Flow (Context API)

```
┌──────────────────────────────────────────────────────┐
│         OrderContext (Global State)                  │
├──────────────────────────────────────────────────────┤
│ order: OrderData = {                                 │
│   taskType: null,                                    │
│   duration: null,                                    │
│   fullName: '',                                      │
│   phoneNumber: '',                                   │
│   email: '',                                         │
│   address: '',                                       │
│   description: '',                                   │
│   paymentMethod: null,                               │
│   basePrice: 0,                                      │
│   multiplier: 0,                                     │
│   totalPrice: 0                                      │
│ }                                                    │
└──────────────────────────────────────────────────────┘
         │         │         │         │
         ↓         ↓         ↓         ↓
    [Step 1]   [Step 2]   [Step 3]   [Step 4]
   set Task   setDuration setDetails setPayment
```

## Pricing Calculation Flow

```
User Selects Task Type & Duration
         │
         ↓
┌─────────────────────────────────────────┐
│  calculatePrice(taskType, duration)    │
├─────────────────────────────────────────┤
│  1. Get Base Price                      │
│     - Daily: Rp 50.000                  │
│     - Semester: Rp 150.000              │
│                                          │
│  2. Get Duration Multiplier             │
│     - 1 day: 3.5x                       │
│     - 7 days: 1.0x                      │
│                                          │
│  3. Calculate                           │
│     Total = Base × Multiplier           │
│     Total = 50.000 × 3.5 = 175.000      │
└─────────────────────────────────────────┘
         │
         ↓
Update Order.totalPrice in Context
         │
         ↓
Display in Duration & Payment Pages
```

## Form Validation Flow

```
User Input → Validation Check → Error Message → Clear on Type Again
                                                  │
                                                  ↓ If Invalid
                                          Show Red Border
                                          + Error Message
                                          + Disable Next Button
                                                  │
                                                  ↓ If Fixed
                                          Green Border
                                          Enable Next Button
```

## Navigation Flow

```
Each page checks required data:
- Task page: No check (entry point)
- Duration page: Check taskType
- Details page: Check taskType + duration
- Payment page: Check taskType + duration + fullName
- Review page: Check ALL fields

If validation fails → Redirect to previous incomplete step
```
