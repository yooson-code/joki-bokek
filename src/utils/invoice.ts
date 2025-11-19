import { OrderData } from "@/types";

export function generateInvoiceHTML(order: OrderData): string {
  const invoiceDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dueDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const invoiceNumber = `INV-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;

  return `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice - ${invoiceNumber}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #ffffff;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background-color: #ffffff;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
        }
        
        .company-info h1 {
            font-size: 28px;
            font-weight: 300;
            letter-spacing: 2px;
            margin-bottom: 5px;
        }
        
        .company-info p {
            color: #666;
            font-size: 13px;
        }
        
        .invoice-meta {
            text-align: right;
        }
        
        .invoice-meta h2 {
            font-size: 24px;
            font-weight: 300;
            margin-bottom: 15px;
            letter-spacing: 1px;
        }
        
        .invoice-meta p {
            font-size: 13px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .invoice-meta .number {
            font-weight: 600;
            color: #000;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #000;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #ddd;
        }
        
        .customer-info, .service-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 30px;
        }
        
        .info-block {
            font-size: 13px;
            line-height: 1.8;
        }
        
        .info-block strong {
            display: block;
            margin-bottom: 3px;
            color: #000;
        }
        
        .info-block p {
            color: #666;
            margin-bottom: 3px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            font-size: 13px;
        }
        
        table thead {
            background-color: #f5f5f5;
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
        }
        
        table th {
            padding: 12px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 11px;
        }
        
        table td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }
        
        table tbody tr:last-child td {
            border-bottom: 2px solid #000;
        }
        
        .text-right {
            text-align: right;
        }
        
        .text-center {
            text-align: center;
        }
        
        .summary {
            margin-left: auto;
            width: 300px;
            margin-bottom: 30px;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 13px;
            border-bottom: 1px solid #eee;
        }
        
        .summary-row.total {
            border-bottom: 2px solid #000;
            border-top: 2px solid #000;
            padding: 12px 0;
            font-weight: 600;
            font-size: 15px;
        }
        
        .summary-row strong {
            font-weight: 600;
        }
        
        .payment-info {
            background-color: #f5f5f5;
            padding: 15px;
            border-left: 3px solid #000;
            font-size: 12px;
            margin-bottom: 30px;
        }
        
        .payment-info strong {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .footer {
            border-top: 1px solid #ddd;
            padding-top: 20px;
            text-align: center;
            font-size: 11px;
            color: #999;
        }
        
        .thank-you {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-bottom: 20px;
            font-style: italic;
        }
        
        .badge {
            display: inline-block;
            background-color: #f0f0f0;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="company-info">
                <h1>Joki Bokek</h1>
                <p>Platform Bantuan Tugas Programming</p>
                <p>untuk SMA/SMK Teknik Informatika</p>
            </div>
            <div class="invoice-meta">
                <h2>INVOICE</h2>
                <p>Nomor: <span class="number">${invoiceNumber}</span></p>
                <p>Tanggal: <span class="number">${invoiceDate}</span></p>
                <p>Jatuh Tempo: <span class="number">${dueDate}</span></p>
            </div>
        </div>
        
        <!-- Customer Info -->
        <div class="customer-info">
            <div class="info-block">
                <strong>PENAGIHAN KEPADA:</strong>
                <p>${order.fullName}</p>
                <p>${order.email}</p>
                <p>${order.phoneNumber}</p>
                <p>${order.address}</p>
            </div>
            <div class="info-block">
                <strong>DETAIL LAYANAN:</strong>
                <p><strong>Jenis Tugas:</strong></p>
                <p>${
                  order.taskType === "daily"
                    ? "Tugas Harian"
                    : "Tugas Akhir / Capstone"
                }</p>
                <p><strong>Durasi:</strong></p>
                <p>${order.duration} hari</p>
            </div>
        </div>
        
        <!-- Services Table -->
        <table>
            <thead>
                <tr>
                    <th>DESKRIPSI LAYANAN</th>
                    <th class="text-right">HARGA</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <strong>${
                          order.taskType === "daily"
                            ? "Tugas Harian"
                            : "Tugas Akhir / Capstone"
                        }</strong><br>
                        <small>${order.description}</small>
                    </td>
                    <td class="text-right"><strong>Rp ${(
                      order.totalPrice || 0
                    ).toLocaleString("id-ID")}</strong></td>
                </tr>
                <tr>
                    <td class="text-right"><strong>Durasi Pengerjaan</strong></td>
                    <td class="text-right">${order.duration} hari</td>
                </tr>
            </tbody>
        </table>
        
        <!-- Summary -->
        <div class="summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>Rp ${(order.totalPrice || 0).toLocaleString(
                  "id-ID"
                )}</span>
            </div>
            <div class="summary-row">
                <span>Pajak (0%):</span>
                <span>Rp 0</span>
            </div>
            <div class="summary-row total">
                <span>TOTAL PEMBAYARAN:</span>
                <span>Rp ${(order.totalPrice || 0).toLocaleString(
                  "id-ID"
                )}</span>
            </div>
        </div>
        
        <!-- Payment Method -->
        <div class="payment-info">
            <strong>METODE PEMBAYARAN:</strong>
            ${
              order.paymentMethod === "gopay"
                ? "GoPay"
                : order.paymentMethod === "shopeepay"
                ? "ShopeePay"
                : "Transfer Bank"
            }
        </div>
        
        <!-- Notes -->
        <div class="section">
            <div class="section-title">CATATAN PENTING</div>
            <p style="font-size: 12px; color: #666; line-height: 1.8;">
                ✓ Invoice ini berlaku sebagai bukti pembayaran Anda<br>
                ✓ Simpan invoice ini untuk keperluan administrasi<br>
                ✓ Pembayaran harus dilakukan dalam waktu 7 hari<br>
                ✓ Setelah pembayaran, hubungi kami untuk memulai pengerjaan
            </p>
        </div>
        
        <div class="thank-you">
            Terima kasih telah mempercayai Joki Bokek!
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>Joki Bokek | Platform Bantuan Tugas Programming untuk SMA/SMK Teknik Informatika</p>
            <p style="margin-top: 5px;">Email: info@jokibokek.com | WhatsApp: 08xx xxxx xxxx</p>
            <p style="margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px;">
                Dokumen ini dihasilkan secara otomatis dan sah tanpa tanda tangan asli.
            </p>
        </div>
    </div>
</body>
</html>
  `;
}
