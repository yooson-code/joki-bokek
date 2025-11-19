"use client";

import { useRouter } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";
import { PAYMENT_METHODS, TASK_TYPES } from "@/utils/constants";
import { calculatePrice, formatCurrency } from "@/utils/helpers";
import { Stepper } from "@/components/common/Stepper";
import { Card } from "@/components/common/Card";
import { NavigationButtons } from "@/components/common/NavigationButtons";

export default function PaymentPage() {
  const router = useRouter();
  const { order, setPaymentMethod } = useOrder();

  // Redirect if required data not complete
  if (!order.taskType || !order.duration || !order.fullName) {
    router.push("/steps/task");
    return null;
  }

  const handleSelectPayment = (method: "gopay" | "shopeepay" | "transfer") => {
    setPaymentMethod(method);
    router.push("/steps/review");
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
        <Stepper currentStep={4} totalSteps={5} steps={steps} />

        {/* Main Content */}
        <Card className="mb-6">
          <h2 className="text-3xl font-light mb-2">Pilih Metode Pembayaran</h2>
          <p className="text-gray-600 font-light mb-8">
            Pilih cara pembayaran yang Anda inginkan
          </p>

          {/* Price Summary */}
          <div className="bg-gray-50 p-6 mb-8 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-light">Jenis Tugas:</span>
              <span className="font-medium text-gray-900">
                {TASK_TYPES[order.taskType!].label}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-light">Durasi:</span>
              <span className="font-medium text-gray-900">
                {order.duration} hari
              </span>
            </div>
            <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
              <span className="font-medium text-gray-900">
                Total Pembayaran:
              </span>
              <span className="text-xl font-medium text-gray-900">
                {formatCurrency(
                  calculatePrice(order.taskType!, order.duration!)
                )}
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3 mb-8">
            {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
              <button
                key={key}
                onClick={() =>
                  handleSelectPayment(key as "gopay" | "shopeepay" | "transfer")
                }
                className={`w-full p-4 border transition text-left ${
                  order.paymentMethod === key
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{method.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {method.label}
                    </h3>
                    <p className="text-sm text-gray-600 font-light">
                      Pembayaran instan
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {order.paymentMethod && (
            <div className="bg-gray-50 p-4 border border-gray-200 mb-6">
              <p className="text-gray-700 font-light">
                ✓ Metode:{" "}
                <strong>{PAYMENT_METHODS[order.paymentMethod].label}</strong>{" "}
                dipilih
              </p>
            </div>
          )}

          <NavigationButtons
            nextDisabled={!order.paymentMethod}
            previousHref="/steps/details"
            nextLabel="Lanjut ke Review →"
            previousLabel="← Kembali"
          />
        </Card>

        {/* Info Box */}
        <Card className="bg-gray-50 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">
            Informasi Pembayaran
          </h4>
          <ul className="text-sm text-gray-600 font-light space-y-2">
            <li>• Pembayaran diproses melalui platform resmi</li>
            <li>• Dana langsung masuk ke admin joki-bokek</li>
            <li>• Proses pengerjaan dimulai setelah konfirmasi pembayaran</li>
            <li>
              • Garansi uang kembali jika tidak puas (syarat & ketentuan
              berlaku)
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
