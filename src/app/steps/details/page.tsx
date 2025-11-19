"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";
import { validateEmail, validatePhoneNumber } from "@/utils/helpers";
import { TASK_TYPES } from "@/utils/constants";
import { Stepper } from "@/components/common/Stepper";
import { Card } from "@/components/common/Card";
import { NavigationButtons } from "@/components/common/NavigationButtons";

export default function DetailsPage() {
  const router = useRouter();
  const { order, setUserDetails } = useOrder();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState<string>("");

  // Redirect if duration not selected
  if (!order.taskType || !order.duration) {
    router.push("/steps/task");
    return null;
  }

  const handleChange = (field: string, value: string) => {
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError("");

    if (file) {
      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setFileError("Ukuran file terlalu besar (maksimal 10MB)");
        return;
      }

      // Allowed file types
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];

      if (!allowedTypes.includes(file.type)) {
        setFileError(
          "Tipe file tidak didukung. Gunakan: PDF, Word, Excel, TXT, atau gambar"
        );
        return;
      }

      setUserDetails({
        ...order,
        attachmentFile: file,
        attachmentFileName: file.name,
      });
    }
  };

  const handleRemoveFile = () => {
    setUserDetails({
      ...order,
      attachmentFile: null,
      attachmentFileName: "",
    });
    setFileError("");
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!order.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi";
    }

    if (!order.phoneNumber.trim()) {
      newErrors.phoneNumber = "Nomor HP harus diisi";
    } else if (!validatePhoneNumber(order.phoneNumber)) {
      newErrors.phoneNumber = "Format nomor HP tidak valid (10-13 digit)";
    }

    if (!order.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!validateEmail(order.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!order.address.trim()) {
      newErrors.address = "Alamat harus diisi";
    }

    if (!order.description.trim()) {
      newErrors.description = "Deskripsi tugas harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      router.push("/steps/payment");
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
        <Stepper currentStep={3} totalSteps={5} steps={steps} />

        {/* Main Content */}
        <Card className="mb-6">
          <h2 className="text-3xl font-light mb-2">Data Pribadi</h2>
          <p className="text-gray-600 font-light mb-8">
            Isi data Anda dengan benar untuk proses komunikasi
          </p>

          <form className="space-y-4">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={order.fullName}
                onChange={(e) => {
                  handleChange("fullName", e.target.value);
                  setUserDetails({
                    ...order,
                    fullName: e.target.value,
                  });
                }}
                placeholder="Contoh: Budi Santoso"
                className={`w-full px-4 py-3 border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Nomor HP */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Nomor HP / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={order.phoneNumber}
                onChange={(e) => {
                  handleChange("phoneNumber", e.target.value);
                  setUserDetails({
                    ...order,
                    phoneNumber: e.target.value,
                  });
                }}
                placeholder="Contoh: 08123456789 atau +6281234567890"
                className={`w-full px-4 py-3 border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={order.email}
                onChange={(e) => {
                  handleChange("email", e.target.value);
                  setUserDetails({
                    ...order,
                    email: e.target.value,
                  });
                }}
                placeholder="Contoh: budi@email.com"
                className={`w-full px-4 py-3 border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                value={order.address}
                onChange={(e) => {
                  handleChange("address", e.target.value);
                  setUserDetails({
                    ...order,
                    address: e.target.value,
                  });
                }}
                placeholder="Jl. Contoh No. 123, Kota, Provinsi"
                rows={3}
                className={`w-full px-4 py-3 border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                  errors.address ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Deskripsi Tugas */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Deskripsi Tugas <span className="text-red-500">*</span>
              </label>
              <textarea
                value={order.description}
                onChange={(e) => {
                  handleChange("description", e.target.value);
                  setUserDetails({
                    ...order,
                    description: e.target.value,
                  });
                }}
                placeholder="Jelaskan tugas Anda secara detail (mata pelajaran, topik, requirements, dll)"
                rows={4}
                className={`w-full px-4 py-3 border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                  errors.description ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Upload File */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Upload Soal / File Tugas{" "}
                <span className="text-gray-500">(Opsional)</span>
              </label>

              {!order.attachmentFileName ? (
                <>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="w-full block px-6 py-8 border-2 border-dashed border-gray-300 text-center cursor-pointer hover:border-gray-500 hover:bg-gray-50 transition"
                  >
                    <div className="text-gray-600">
                      <p className="text-2xl mb-2">📁</p>
                      <p className="font-medium text-gray-900">
                        Klik untuk upload atau drag & drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, Word, Excel, TXT, JPG, PNG (Maks 10MB)
                      </p>
                    </div>
                  </label>

                  {/* File Error */}
                  {fileError && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-600 text-sm">
                      {fileError}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  {/* File Preview - Success State */}
                  <div className="bg-gray-50 border-2 border-gray-300 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-gray-900 text-2xl">✓</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 break-all">
                            {order.attachmentFileName}
                          </p>
                          <p className="text-sm text-gray-600 font-light">
                            {order.attachmentFile && (
                              <>
                                Ukuran:{" "}
                                {(order.attachmentFile.size / 1024).toFixed(2)}{" "}
                                KB
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <label
                          htmlFor="file-upload"
                          className="px-3 py-2 bg-gray-900 text-white text-sm font-light hover:bg-gray-800 transition cursor-pointer"
                        >
                          Ganti
                        </label>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="px-3 py-2 bg-red-500 text-white text-sm font-light hover:bg-red-600 transition"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* File Error */}
                  {fileError && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                      {fileError}
                    </div>
                  )}
                </>
              )}
            </div>
          </form>

          <NavigationButtons
            previousHref="/steps/duration"
            onNext={handleNext}
            nextLabel="Pilih Metode Bayar →"
            previousLabel="← Kembali"
          />
        </Card>

        {/* Info Box */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
          <h3 className="font-bold text-gray-800 mb-2">📝 Info</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Data akan digunakan untuk komunikasi dan pengiriman hasil</li>
            <li>• Pastikan nomor HP aktif (WhatsApp/Telepon)</li>
            <li>• Email untuk pengiriman hasil dan invoice</li>
            <li>
              • Upload file soal untuk membantu kami memahami tugas dengan lebih
              baik
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
