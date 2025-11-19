import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { generateInvoiceHTML } from "@/utils/invoice";

// Type untuk order data
interface OrderRequest {
  taskType: string;
  duration: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  description: string;
  attachmentFileName?: string;
  totalPrice: number;
}

// Helper untuk mengirim email
async function sendEmail(
  orderData: OrderRequest
): Promise<{ ok: boolean; error?: string }> {
  try {
    // Cek konfigurasi Gmail
    if (!process.env.GMAIL_SENDER_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
      console.warn("Gmail configuration is not complete");
      return { ok: false, error: "Gmail configuration is not complete" };
    }

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_SENDER_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Format harga
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(price);
    };

    // Email ke admin
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2563eb;">🎉 Pesanan Baru Masuk!</h2>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>📋 Detail Pesanan:</h3>
          
          <p><strong>Nama:</strong> ${orderData.fullName}</p>
          <p><strong>No. HP:</strong> <a href="https://wa.me/${orderData.phoneNumber.replace(
            /\D/g,
            ""
          )}">+${orderData.phoneNumber.replace(/\D/g, "")}</a></p>
          <p><strong>Email:</strong> <a href="mailto:${orderData.email}">${
      orderData.email
    }</a></p>
          <p><strong>Alamat:</strong> ${orderData.address}</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p><strong>Jenis Tugas:</strong> ${orderData.taskType}</p>
          <p><strong>Durasi:</strong> ${orderData.duration} hari</p>
          <p><strong>File Soal:</strong> ${
            orderData.attachmentFileName
              ? "✓ " + orderData.attachmentFileName
              : "Tidak ada"
          }</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p><strong>Deskripsi Tugas:</strong></p>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #2563eb; margin: 10px 0;">
            ${orderData.description.replace(/\n/g, "<br>")}
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e;">
            <h3 style="color: #15803d; margin-top: 0;">💰 Total Pembayaran: ${formatPrice(
              orderData.totalPrice
            )}</h3>
          </div>
        </div>
        
        <div style="background-color: #fff7ed; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>⚡ Action:</strong> Hubungi customer melalui WhatsApp untuk konfirmasi dan pembayaran.</p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">Email ini dikirim otomatis dari Joki Bokek Platform</p>
      </div>
    `;

    // Kirim email ke admin
    await transporter.sendMail({
      from: process.env.GMAIL_SENDER_EMAIL,
      // If recipient not provided, fallback to sender email
      to: process.env.GMAIL_RECIPIENT_EMAIL || process.env.GMAIL_SENDER_EMAIL,
      subject: `🎉 Pesanan Baru - ${orderData.fullName} (Rp ${orderData.totalPrice})`,
      html: adminEmailContent,
    });

    // Kirim invoice ke customer
    const invoiceHTML = generateInvoiceHTML({
      taskType: orderData.taskType.includes("harian") ? "daily" : "semester",
      duration: orderData.duration as any,
      fullName: orderData.fullName,
      phoneNumber: orderData.phoneNumber,
      email: orderData.email,
      address: orderData.address,
      description: orderData.description,
      attachmentFile: null,
      attachmentFileName: orderData.attachmentFileName || "",
      paymentMethod: "transfer",
      totalPrice: orderData.totalPrice,
      basePrice: 0,
      multiplier: 0,
    });

    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Terima kasih telah memesan layanan kami!</h2>
        <p>Halo <strong>${orderData.fullName}</strong>,</p>
        
        <p>Pesanan Anda telah kami terima dengan baik. Di bawah ini adalah detail invoice Anda:</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <p><strong>Jenis Tugas:</strong> ${orderData.taskType}</p>
        <p><strong>Durasi:</strong> ${orderData.duration} hari</p>
        <p><strong>Total Pembayaran:</strong> <span style="font-size: 18px; font-weight: bold; color: #000;">Rp ${(orderData.totalPrice || 0).toLocaleString('id-ID')}</span></p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid #000; margin: 20px 0;">
          <strong>📄 Invoice PDF lengkap dengan format profesional telah kami lampirkan dalam email ini.</strong><br>
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
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_SENDER_EMAIL,
      to: orderData.email,
      subject: `Invoice Pesanan Anda - Joki Bokek (Rp ${orderData.totalPrice})`,
      html: customerEmailContent,
      attachments: [
        {
          filename: `Invoice-Joki-Bokek-${Date.now()}.html`,
          content: invoiceHTML,
          contentType: 'text/html',
        },
      ],
    });

    console.log("Invoice email sent successfully to customer");
    return { ok: true };
  } catch (error) {
    console.error("Error sending email:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return { ok: false, error: errMsg };
  }
}

// Helper untuk mengirim WhatsApp
async function sendWhatsApp(
  orderData: OrderRequest
): Promise<{ ok: boolean; error?: string }> {
  try {
    // Ini adalah template untuk integrasi WhatsApp
    // Anda bisa gunakan Twilio, MessageBird, atau service lain

    if (!process.env.ADMIN_WHATSAPP_NUMBER) {
      console.warn("Admin WhatsApp number is not configured");
      return { ok: false, error: "Admin WhatsApp number is not configured" };
    }

    const message = `
🎉 *PESANAN BARU MASUK!*

👤 *Nama:* ${orderData.fullName}
📱 *No. HP:* ${orderData.phoneNumber}
📧 *Email:* ${orderData.email}

📚 *Jenis Tugas:* ${orderData.taskType}
⏱️ *Durasi:* ${orderData.duration} hari
💰 *Total:* Rp ${orderData.totalPrice.toLocaleString("id-ID")}

📝 *Deskripsi:*
${orderData.description}

${
  orderData.attachmentFileName
    ? `📎 *File:* ${orderData.attachmentFileName}`
    : ""
}

---
Hubungi customer untuk konfirmasi & pembayaran!
    `.trim();

    // Jika Twilio tersedia, kirim lewat Twilio WhatsApp
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_WHATSAPP_NUMBER;
    const adminTo = process.env.ADMIN_WHATSAPP_NUMBER;

    if (sid && token && twilioFrom && adminTo) {
      try {
        const twilio = require("twilio");
        const client = twilio(sid, token);
        const msg = await client.messages.create({
          body: message,
          from: `whatsapp:${twilioFrom}`,
          to: `whatsapp:${adminTo}`,
        });
        console.log("WhatsApp sent via Twilio, sid:", msg.sid);
        return { ok: true };
      } catch (err) {
        console.error("Error sending WhatsApp via Twilio:", err);
        const errMsg = err instanceof Error ? err.message : String(err);
        return { ok: false, error: errMsg };
      }
    }

    // Jika tidak ada Twilio, hanya log message (fallback)
    console.log(
      "WhatsApp message prepared (not sent - no Twilio config):",
      message
    );
    return { ok: false, error: "Twilio not configured" };
  } catch (error) {
    console.error("Error sending WhatsApp:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return { ok: false, error: errMsg };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data (untuk support file upload)
    const contentType = request.headers.get("content-type") || "";
    let body: OrderRequest;
    let file: Buffer | null = null;
    let fileName = "";

    if (contentType.includes("multipart/form-data")) {
      // Handle multipart form data (dengan file)
      const formData = await request.formData();
      body = {
        taskType: formData.get("taskType") as string,
        duration: parseInt(formData.get("duration") as string),
        fullName: formData.get("fullName") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        description: formData.get("description") as string,
        attachmentFileName: formData.get("attachmentFileName") as string,
        totalPrice: parseInt(formData.get("totalPrice") as string),
      };

      // Ambil file jika ada
      const fileField = formData.get("file");
      if (fileField && fileField instanceof File) {
        file = Buffer.from(await fileField.arrayBuffer());
        fileName = fileField.name;
      }
    } else {
      // Handle JSON (tanpa file)
      body = (await request.json()) as OrderRequest;
    }

    // Validasi data
    if (!body.fullName || !body.email || !body.phoneNumber) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    console.log("Order received:", body);

    // Simpan file jika ada
    if (file && fileName) {
      try {
        // Buat direktori untuk uploads jika belum ada
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          "orders"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Generate unique filename dengan timestamp
        const timestamp = Date.now();
        const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
        const uniqueFileName = `${timestamp}_${sanitizedName}`;
        const filePath = path.join(uploadDir, uniqueFileName);

        // Simpan file
        fs.writeFileSync(filePath, file);

        console.log("File saved:", {
          originalName: fileName,
          savedName: uniqueFileName,
          path: filePath,
          size: file.length,
        });

        // Update body dengan informasi file
        body.attachmentFileName = uniqueFileName;
      } catch (err) {
        console.error("Error saving file:", err);
        return NextResponse.json(
          { error: "Gagal menyimpan file" },
          { status: 500 }
        );
      }
    }

    // Kirim notifikasi (parallel) dan kumpulkan hasil
    const [emailResult, whatsappResult] = await Promise.all([
      sendEmail(body),
      sendWhatsApp(body),
    ]);

    // Log hasil
    console.log("Notification results:", {
      email: emailResult,
      whatsapp: whatsappResult,
    });

    // Response ke client dengan detail error jika ada
    return NextResponse.json(
      {
        success: true,
        message: "Pesanan berhasil dikirim",
        notifications: {
          email: emailResult,
          whatsapp: whatsappResult,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses pesanan" },
      { status: 500 }
    );
  }
}
