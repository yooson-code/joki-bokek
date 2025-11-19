"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";
import { TASK_TYPES, PAYMENT_METHODS } from "@/utils/constants";
import { calculatePrice, formatCurrency } from "@/utils/helpers";
import { Stepper } from "@/components/common/Stepper";
import { Card } from "@/components/common/Card";
import { NavigationButtons } from "@/components/common/NavigationButtons";

export default function ReviewPage() {
  const router = useRouter();
  const { order, resetOrder } = useOrder();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  // Redirect if required data not complete
  if (
    !order.taskType ||
    !order.duration ||
    !order.fullName ||
    !order.paymentMethod
  ) {
    router.push("/steps/task");
    return null;
  }

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      setError("");

      // Prepare form data (untuk support file upload)
      const formData = new FormData();
      formData.append("taskType", TASK_TYPES[order.taskType!].label);
      formData.append("duration", String(order.duration));
      formData.append("fullName", order.fullName);
      formData.append("phoneNumber", order.phoneNumber);
      formData.append("email", order.email);
      formData.append("address", order.address);
      formData.append("description", order.description);
      formData.append(
        "totalPrice",
        String(calculatePrice(order.taskType!, order.duration!))
      );
      formData.append("attachmentFileName", order.attachmentFileName || "");

      // Tambahkan file jika ada
      if (order.attachmentFile) {
        formData.append("file", order.attachmentFile);
      }

      // Send to API
      const response = await fetch("/api/orders", {
        method: "POST",
        body: formData,
        // Jangan set Content-Type header, biarkan browser set dengan boundary yang benar
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim pesanan");
      }

      const result = await response.json();

      // Show success message
      alert(
        `✅ Pesanan Anda telah diterima!\n\nTotal: ${formatCurrency(
          calculatePrice(order.taskType!, order.duration!)
        )}\n\n📧 Konfirmasi telah dikirim ke email Anda\n📱 Admin akan segera menghubungi melalui WhatsApp ke ${
          order.phoneNumber
        }`
      );

      // Reset and redirect
      resetOrder();
      router.push("/steps/task");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
      console.error("Order submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    "Pilih Jenis Tugas",
    "Pilih Durasi",
    "Data Pribadi",
    "Metode Bayar",
    "Review",
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 border-b border-gray-200 pb-8">
          <h1 className="text-3xl font-light tracking-wide mb-2">Joki Bokek</h1>
          <p className="text-sm text-gray-500 font-light">
            Solusi Tugas Akademik
          </p>
        </div>

        {/* Stepper */}
        <Stepper currentStep={5} totalSteps={5} steps={steps} />

        {/* Main Content */}
        <Card className="mb-6">
          <h2 className="text-3xl font-light mb-4">Review Pesanan</h2>
          <p className="text-gray-600 font-light mb-8">
            Periksa kembali data Anda sebelum melakukan pembayaran
          </p>

          {/* Jenis Tugas */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Jenis Tugas</h3>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <p className="text-gray-900 font-medium">
                {TASK_TYPES[order.taskType].label}
              </p>
              <p className="text-sm text-gray-600 font-light">
                {TASK_TYPES[order.taskType].description}
              </p>
            </div>
          </div>

          {/* Durasi */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">
              Durasi Pengerjaan
            </h3>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <p className="text-gray-900 font-medium">{order.duration} Hari</p>
            </div>
          </div>

          {/* Data Pribadi */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Data Pribadi</h3>
            <div className="bg-gray-50 p-4 border border-gray-200 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Nama:</span>
                <span className="text-gray-900 font-medium">
                  {order.fullName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">No. HP:</span>
                <span className="text-gray-900 font-medium">
                  {order.phoneNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Email:</span>
                <span className="text-gray-900 font-medium">{order.email}</span>
              </div>
              <div>
                <span className="text-gray-600 font-light">Alamat:</span>
                <p className="text-gray-900 font-medium">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Deskripsi Tugas */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Deskripsi Tugas</h3>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <p className="text-gray-900 font-light whitespace-pre-wrap">
                {order.description}
              </p>
            </div>
          </div>

          {/* File Attachment */}
          {order.attachmentFileName && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">File Tugas</h3>
              <div className="bg-gray-50 p-4 border border-gray-200">
                <p className="text-gray-900 font-medium">
                  ✓ {order.attachmentFileName}
                </p>
                <p className="text-sm text-gray-600 font-light mt-1">
                  {order.attachmentFile && (
                    <>
                      Ukuran: {(order.attachmentFile.size / 1024).toFixed(2)} KB
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Metode Pembayaran */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">
              Metode Pembayaran
            </h3>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <p className="text-gray-900 font-medium">
                {PAYMENT_METHODS[order.paymentMethod].label}
              </p>
            </div>
          </div>

          {/* Total Price */}
          <div className="bg-gray-900 text-white p-6 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-light">Total Pembayaran:</span>
              <span className="text-3xl font-medium">
                {formatCurrency(calculatePrice(order.taskType, order.duration))}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200">
              <p className="text-red-600 font-light">❌ {error}</p>
            </div>
          )}

          {/* Invoice Preview Button */}
          <div className="mb-6">
            <button
              onClick={async () => {
                try {
                  const formData = new FormData();
                  formData.append("taskType", TASK_TYPES[order.taskType!].label);
                  formData.append("duration", String(order.duration));
                  formData.append("fullName", order.fullName);
                  formData.append("phoneNumber", order.phoneNumber);
                  formData.append("email", order.email);
                  formData.append("address", order.address);
                  formData.append("description", order.description);
                  formData.append(
                    "totalPrice",
                    String(calculatePrice(order.taskType!, order.duration!))
                  );

                  const response = await fetch("/api/invoice/generate", {
                    method: "POST",
                    body: JSON.stringify({
                      taskType: order.taskType,
                      duration: order.duration,
                      fullName: order.fullName,
                      phoneNumber: order.phoneNumber,
                      email: order.email,
                      address: order.address,
                      description: order.description,
                      attachmentFileName: order.attachmentFileName || "",
                      totalPrice: calculatePrice(order.taskType!, order.duration!),
                      paymentMethod: order.paymentMethod,
                      attachmentFile: null,
                      basePrice: 0,
                      multiplier: 0,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  if (response.ok) {
                    const html = await response.text();
                    const newWindow = window.open("", "", "width=1000,height=800");
                    if (newWindow) {
                      newWindow.document.write(html);
                      newWindow.document.close();
                    }
                  }
                } catch (err) {
                  console.error("Error opening invoice:", err);
                }
              }}
              className="w-full px-4 py-3 border border-gray-900 text-gray-900 font-light hover:bg-gray-50 transition mb-3"
            >
              👁️ Preview Invoice
            </button>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/steps/payment")}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 border border-gray-900 text-gray-900 font-light hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Edit Data
            </button>
            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 font-light text-white bg-gray-900 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "⏳ Mengirim..." : "✓ Konfirmasi & Bayar"}
            </button>
          </div>
        </Card>

        {/* Terms Box */}
        <Card className="bg-linear-to-r from-blue-50 to-indigo-50">
          <h3 className="font-bold text-gray-800 mb-2">
            📋 Syarat & Ketentuan
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Hasil kerja original dan tidak diplagiat</li>
            <li>✓ Revisi gratis 1x jika tidak sesuai</li>
            <li>✓ Garansi uang kembali jika deadline tidak terpenuhi</li>
            <li>✓ Hasil dikirim melalui email dan WhatsApp</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
