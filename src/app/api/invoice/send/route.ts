import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateInvoiceHTML } from "@/utils/invoice";
import { OrderData } from "@/types";

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || "",
    pass: process.env.GMAIL_PASSWORD || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    const order = orderData as OrderData;

    // Validate required fields
    if (!order.email || !order.fullName) {
      return NextResponse.json(
        { ok: false, error: "Email dan nama tidak boleh kosong" },
        { status: 400 }
      );
    }

    // Generate invoice HTML
    const invoiceHTML = generateInvoiceHTML(order);

    // Send email with embedded HTML invoice
    const mailOptions = {
      from: process.env.GMAIL_USER || "",
      to: order.email,
      subject: `Invoice Pesanan Anda - Joki Bokek`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Terima kasih telah memesan layanan kami!</h2>
          <p>Halo <strong>${order.fullName}</strong>,</p>
          
          <p>Pesanan Anda telah kami terima dengan baik. Di bawah ini adalah detail invoice Anda:</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p><strong>Jenis Tugas:</strong> ${
            order.taskType === "daily"
              ? "Tugas Harian"
              : "Tugas Akhir / Capstone"
          }</p>
          <p><strong>Durasi:</strong> ${order.duration} hari</p>
          <p><strong>Total Pembayaran:</strong> <span style="font-size: 18px; font-weight: bold; color: #000;">Rp ${(
            order.totalPrice || 0
          ).toLocaleString("id-ID")}</span></p>
          <p><strong>Metode Pembayaran:</strong> ${
            order.paymentMethod === "gopay"
              ? "GoPay"
              : order.paymentMethod === "shopeepay"
              ? "ShopeePay"
              : "Transfer Bank"
          }</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid #000; margin: 20px 0;">
            <strong>Invoice PDF lengkap dengan format profesional telah kami lampirkan dalam email ini.</strong><br>
            Anda dapat mengunduh dan menyimpannya untuk keperluan administrasi.
          </p>
          
          <h3 style="margin-top: 30px;">Langkah Selanjutnya:</h3>
          <ol>
            <li>Download invoice PDF dari attachment</li>
            <li>Lakukan pembayaran sesuai metode yang Anda pilih</li>
            <li>Hubungi kami via WhatsApp setelah pembayaran dikonfirmasi</li>
            <li>Kami akan segera memulai pengerjaan tugas Anda</li>
          </ol>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #666; font-size: 13px;">
            Pertanyaan? Hubungi kami:<br>
            Email: info@jokibokek.com<br>
            WhatsApp: 08xx xxxx xxxx<br>
            Jam Kerja: Senin - Minggu, 08:00 - 21:00
          </p>
          
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            Terima kasih telah mempercayai Joki Bokek untuk membantu tugas Anda!
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `Invoice-Joki-Bokek-${Date.now()}.html`,
          content: invoiceHTML,
          contentType: "text/html",
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`✓ Invoice email sent to ${order.email}`);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending invoice:", errorMessage);
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
