# 📄 Sistem Invoice Profesional

## Fitur Invoice yang Telah Ditambahkan

### 1. **Generate Invoice HTML Profesional**

- File: `src/utils/invoice.ts`
- Fungsi: `generateInvoiceHTML(order: OrderData): string`
- Menghasilkan HTML invoice dengan format profesional yang siap cetak

### 2. **Kirim Invoice ke Email Customer**

- Terintegrasi di: `src/app/api/orders/route.ts`
- Invoice otomatis dikirim ke email customer dalam format HTML
- Customer bisa menyimpan dan mencetak langsung dari email

### 3. **Preview Invoice di Browser**

- Endpoint: `POST /api/invoice/generate`
- Customer bisa preview invoice sebelum konfirmasi pesanan
- Button "👁️ Preview Invoice" tersedia di review page
- Bisa langsung print ke PDF menggunakan browser's print function

### 4. **Download Invoice API**

- Endpoint: `POST /api/invoice/send`
- Untuk custom integration di masa depan

## Format Invoice

Invoice profesional mencakup:

```
┌─────────────────────────────────────────┐
│  JOKI BOKEK                  INVOICE    │
│  Platform Bantuan Tugas                │
│  Teknik Informatika SMA/SMK            │
│                                        │
│  Nomor: INV-[timestamp]-[random]       │
│  Tanggal: [tanggal hari ini]           │
│  Jatuh Tempo: [7 hari dari hari ini]   │
├─────────────────────────────────────────┤
│  PENAGIHAN KEPADA:                    │
│  Nama: [customer name]                │
│  Email: [customer email]              │
│  No. HP: [customer phone]             │
│  Alamat: [customer address]           │
│                                        │
│  DETAIL LAYANAN:                      │
│  Jenis Tugas: [Daily/Capstone]        │
│  Durasi: [duration] hari              │
├─────────────────────────────────────────┤
│  DESKRIPSI LAYANAN          HARGA    │
│  [Task Type]                Rp [...]  │
│  Durasi Pengerjaan          [days] hari
├─────────────────────────────────────────┤
│  Subtotal:              Rp [amount]    │
│  Pajak (0%):            Rp 0          │
│  TOTAL PEMBAYARAN:      Rp [total]    │
├─────────────────────────────────────────┤
│  METODE PEMBAYARAN:                   │
│  [GoPay/ShopeePay/Transfer Bank]      │
│                                        │
│  CATATAN PENTING:                     │
│  ✓ Invoice berlaku sebagai bukti      │
│  ✓ Pembayaran dalam 7 hari            │
│  ✓ Hubungi kami setelah pembayaran    │
└─────────────────────────────────────────┘
```

## Alur Invoice

```
Customer Order
    ↓
API /api/orders (POST)
    ├→ Kirim email ke Admin dengan detail order
    └→ Kirim invoice ke Customer email
         ├→ Invoice HTML di attachment
         └→ Instruksi pembayaran dalam email body
    ↓
Customer menerima di Gmail:
    ├→ Subject: Invoice Pesanan Anda - Joki Bokek
    ├→ Body: Instruksi & langkah selanjutnya
    └→ Attachment: Invoice-Joki-Bokek-[timestamp].html
    ↓
Customer bisa:
    ├→ Buka attachment untuk lihat invoice
    ├→ Print dari browser: Ctrl+P → Save as PDF
    └→ Simpan untuk administrasi
```

## Fitur Preview Invoice

Di halaman Review (Step 5), customer bisa klik button "👁️ Preview Invoice" untuk:

- Melihat invoice sebelum konfirmasi
- Print langsung ke PDF
- Verifikasi data sebelum pembayaran

## Cara Print Invoice ke PDF

### Dari Email:

1. Buka email dari Joki Bokek
2. Download attachment `Invoice-Joki-Bokek-[timestamp].html`
3. Buka file dengan browser
4. Tekan Ctrl+P (Windows) atau Cmd+P (Mac)
5. Pilih "Save as PDF"
6. Selesai!

### Dari Preview:

1. Di halaman review, klik "👁️ Preview Invoice"
2. Window baru terbuka dengan invoice
3. Tekan Ctrl+P atau Cmd+P
4. Pilih "Save as PDF"
5. Selesai!

## Struktur Data Invoice

```typescript
interface OrderData {
  taskType: "daily" | "semester";
  duration: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  description: string;
  attachmentFileName: string;
  totalPrice: number;
  paymentMethod: "gopay" | "shopeepay" | "transfer";
  basePrice: number;
  multiplier: number;
  attachmentFile: File | null;
}
```

## Email yang Dikirim

### 1. Email ke Customer

- **Subject:** Invoice Pesanan Anda - Joki Bokek (Rp [amount])
- **Body:** Instruksi pembayaran + langkah selanjutnya
- **Attachment:** Invoice HTML profesional

### 2. Email ke Admin

- **Subject:** 🎉 Pesanan Baru - [Customer Name] (Rp [amount])
- **Body:** Detail lengkap pesanan dengan link WhatsApp

## Testing

Untuk test invoice secara manual:

```bash
# 1. Start dev server
npm run dev

# 2. Navigate ke order form
# http://localhost:3000

# 3. Ikuti 5 steps order:
# - Pilih jenis tugas
# - Pilih durasi
# - Isi data pribadi
# - Pilih metode pembayaran
# - Review

# 4. Di halaman review, klik "Preview Invoice"
# 5. Print ke PDF atau save HTML

# 6. Klik "Konfirmasi & Bayar"
# 7. Check email Anda untuk invoice yang dikirim
```

## Customization

### Mengubah Template Invoice

File: `src/utils/invoice.ts`

- Ubah `generateInvoiceHTML()` function
- Edit styling di `<style>` tag
- Tambah/hapus field sesuai kebutuhan

### Mengubah Email Body

File: `src/app/api/orders/route.ts`

- Ubah `customerEmailContent` variable
- Sesuaikan instruksi pembayaran
- Update contact info

### Mengubah Tanggal Jatuh Tempo

File: `src/utils/invoice.ts` (baris ~10)

```typescript
const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 hari
```

## API Endpoints

### 1. POST /api/orders

- **Fungsi:** Terima order + kirim invoice
- **Request:** FormData (dengan atau tanpa file)
- **Response:** `{ success: true, notifications: {...} }`
- **Side effects:**
  - Simpan file ke `/public/uploads/orders/`
  - Kirim email admin
  - Kirim invoice ke customer

### 2. POST /api/invoice/generate

- **Fungsi:** Generate invoice HTML untuk preview
- **Request:** JSON dengan order data
- **Response:** HTML invoice
- **Content-Type:** `text/html`

### 3. POST /api/invoice/send

- **Fungsi:** Standalone endpoint untuk kirim invoice
- **Request:** JSON dengan order data
- **Response:** `{ ok: true }` atau `{ ok: false, error: string }`

## Catatan Penting

- ✅ Invoice sudah terintegrasi dengan system pricing terbaru
- ✅ Support untuk tugas harian (Rp 10rb-80rb) dan capstone (hingga 200rb)
- ✅ Invoice includes deskripsi untuk teknik informatika SMA/SMK
- ✅ Email notification automatic ke customer
- ✅ HTML invoice bisa di-print ke PDF langsung dari browser
- ⏳ Belum ada payment gateway integration (future: Midtrans, Stripe, etc)
- ⏳ Belum ada notifikasi pembayaran terkonfirmasi (future: webhook)

## Dependencies

- `nodemailer`: Untuk send email
- HTML5 printing: Native browser feature (built-in)

Tidak perlu external PDF library karena menggunakan native browser print-to-PDF!
