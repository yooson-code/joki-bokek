# 📬 Setup Notifikasi WhatsApp & Email

Panduan lengkap untuk mengatur notifikasi pesanan otomatis ke WhatsApp dan Gmail.

## 🚀 Quick Start

### 1. **Setup Gmail (Email Notifications)**

#### Step 1: Buat App Password di Google

1. Kunjungi: https://myaccount.google.com/apppasswords
2. Pastikan 2-Step Verification sudah diaktifkan
3. Pilih **Mail** dan **Windows Computer** (atau device lainnya)
4. Google akan generate 16-character password
5. Copy password tersebut

#### Step 2: Konfigurasi `.env.local`

Edit file `.env.local` di root project:

```env
GMAIL_SENDER_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
GMAIL_RECIPIENT_EMAIL=admin@jokibokek.com
NEXT_PUBLIC_GMAIL_ENABLED=true
```

**Contoh:**

```env
GMAIL_SENDER_EMAIL=yooson@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
GMAIL_RECIPIENT_EMAIL=yooson@gmail.com
NEXT_PUBLIC_GMAIL_ENABLED=true
```

### 2. **Setup WhatsApp Notifications**

Ada beberapa pilihan service untuk WhatsApp:

#### Option A: Twilio (Recommended - Paling Mudah)

1. **Buat Akun Twilio:**

   - Kunjungi: https://www.twilio.com/
   - Sign up dan verifikasi
   - Dapatkan Twilio WhatsApp Sandbox number

2. **Konfigurasi `.env.local`:**

   ```env
   ADMIN_WHATSAPP_NUMBER=+6281234567890
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_NUMBER=+1234567890
   NEXT_PUBLIC_WHATSAPP_ENABLED=true
   ```

3. **Install Twilio SDK:**
   ```bash
   npm install twilio
   ```

#### Option B: MessageBird

1. Kunjungi: https://www.messagebird.com/
2. Setup WhatsApp channel
3. Config di `.env.local`

#### Option C: Webhook ke WhatsApp Bot

Gunakan service seperti:

- Meta Business API (WhatsApp Official)
- Gupshup
- Clickatell

### 3. **Install Dependencies**

```bash
npm install
```

Dependencies yang ditambahkan:

- `nodemailer` - Untuk email notifications
- `@types/nodemailer` - TypeScript types

### 4. **Testing Notifikasi**

1. **Jalankan Development Server:**

   ```bash
   npm run dev
   ```

2. **Test Flow:**

   - Buka: http://localhost:3000
   - Ikuti 5 steps untuk membuat order
   - Klik "Konfirmasi & Bayar"
   - Cek email di Gmail recipient

3. **Check Console:**
   ```
   # Lihat console di browser (F12)
   # Atau terminal untuk backend logs
   ```

## 📧 Email Template

Ketika order masuk, email akan berisi:

```
🎉 Pesanan Baru Masuk!

📋 Detail Pesanan:
- Nama: [Nama Customer]
- No. HP: [Nomor dengan link WhatsApp]
- Email: [Email dengan link mailto]
- Alamat: [Alamat lengkap]

📚 Jenis Tugas: [Daily/Semester]
⏱️ Durasi: [X hari]
💰 Total: [Harga IDR]

📝 Deskripsi Tugas:
[Full description]

📎 File: [Nama file jika ada]
```

## 📱 WhatsApp Message Format

Ketika menggunakan Twilio atau service lain, message format:

```
🎉 *PESANAN BARU MASUK!*

👤 *Nama:* [Customer Name]
📱 *No. HP:* [Nomor]
📧 *Email:* [Email]

📚 *Jenis Tugas:* [Type]
⏱️ *Durasi:* [X hari]
💰 *Total:* Rp [Amount]

📝 *Deskripsi:*
[Description]

📎 *File:* [Filename jika ada]
```

## 🔧 Environment Variables Reference

| Variable                       | Contoh              | Wajib | Keterangan                       |
| ------------------------------ | ------------------- | ----- | -------------------------------- |
| `GMAIL_SENDER_EMAIL`           | yooson@gmail.com    | ✓     | Email pengirim (harus Gmail)     |
| `GMAIL_APP_PASSWORD`           | xxxx xxxx xxxx xxxx | ✓     | 16-char app password dari Google |
| `GMAIL_RECIPIENT_EMAIL`        | admin@jokibokek.com | ✓     | Email yang menerima notifikasi   |
| `ADMIN_WHATSAPP_NUMBER`        | +6281234567890      | ✓     | Nomor WhatsApp admin             |
| `TWILIO_ACCOUNT_SID`           | AC...               | ✓\*   | Jika pakai Twilio                |
| `TWILIO_AUTH_TOKEN`            | auth_token          | ✓\*   | Jika pakai Twilio                |
| `TWILIO_WHATSAPP_NUMBER`       | +1234567890         | ✓\*   | Jika pakai Twilio                |
| `NEXT_PUBLIC_GMAIL_ENABLED`    | true                | -     | Enable/disable email             |
| `NEXT_PUBLIC_WHATSAPP_ENABLED` | true                | -     | Enable/disable WhatsApp          |

\*Wajib jika menggunakan service tersebut

## 🚨 Troubleshooting

### Email tidak terkirim

- ❌ **Problem:** "Less secure app access"
  - ✅ **Solution:** Gunakan App Password, bukan password akun biasa
- ❌ **Problem:** "Gmail auth failed"

  - ✅ **Solution:** Pastikan 2-Step Verification aktif, kemudian generate App Password baru

- ❌ **Problem:** "NEXT_AUTH_SECRET" error
  - ✅ **Solution:** Email masih bisa jalan tanpa ini untuk development

### WhatsApp tidak terkirim

- ❌ **Problem:** "Twilio credentials invalid"

  - ✅ **Solution:** Verify Account SID dan Auth Token di Twilio dashboard

- ❌ **Problem:** "Message not sent"
  - ✅ **Solution:**
    1. Pastikan nomor WhatsApp format international (+62...)
    2. Nomor sudah join ke Twilio sandbox
    3. Check Twilio logs untuk error details

### Order tidak terkirim ke API

- ❌ **Problem:** "Gagal memproses pesanan"
  - ✅ **Solution:** Lihat browser console (F12) untuk error details
- ❌ **Problem:** "CORS error"
  - ✅ **Solution:** API route harus di `/app/api/` folder

## 📝 File Struktur

```
src/
  app/
    api/
      orders/
        route.ts          ← API endpoint untuk order
  utils/
    config.ts            ← Konfigurasi notifikasi
```

## 🎯 Next Steps (Production)

1. **Database:** Simpan orders ke database (Prisma + PostgreSQL)
2. **Payment Gateway:** Integrasikan dengan payment system
3. **Admin Dashboard:** Buat panel untuk manage orders
4. **WhatsApp Official:** Gunakan Meta Business API untuk WhatsApp resmi
5. **Email Templates:** Customize template HTML
6. **File Upload:** Simpan attachment ke cloud storage (S3, Google Drive, etc)

## 📞 Support

Jika ada masalah, check:

1. `.env.local` - Pastikan semua variable terisi dengan benar
2. Browser console (F12) - Lihat error message
3. Terminal logs - Lihat backend error
4. Service documentation - Twilio, Gmail, MessageBird

---

**Happy coding! 🚀**
