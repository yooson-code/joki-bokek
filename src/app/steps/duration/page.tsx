"use client";

import { useRouter } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";
import { DURATIONS, TASK_TYPES } from "@/utils/constants";
import {
  calculatePrice,
  formatCurrency,
  getPriceDescription,
  getDurationLabel,
} from "@/utils/helpers";
import { Stepper } from "@/components/common/Stepper";
import { Card } from "@/components/common/Card";
import { NavigationButtons } from "@/components/common/NavigationButtons";

export default function DurationPage() {
  const router = useRouter();
  const { order, setDuration } = useOrder();

  // Redirect if task type not selected
  if (!order.taskType) {
    router.push("/steps/task");
    return null;
  }

  const handleSelectDuration = (duration: (typeof DURATIONS)[number]) => {
    setDuration(duration);
    router.push("/steps/details");
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
        <Stepper currentStep={2} totalSteps={5} steps={steps} />

        {/* Main Content */}
        <Card className="mb-6">
          <h2 className="text-3xl font-light mb-2">Pilih Durasi Pengerjaan</h2>
          <p className="text-gray-600 font-light mb-8">
            Jenis: <strong>{TASK_TYPES[order.taskType].label}</strong>
          </p>

          <div className="space-y-3 mb-8">
            {DURATIONS.map((duration) => {
              const price = calculatePrice(order.taskType!, duration);
              return (
                <button
                  key={duration}
                  onClick={() => handleSelectDuration(duration)}
                  className={`w-full p-4 border transition text-left ${
                    order.duration === duration
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {getDurationLabel(duration)}
                      </h3>
                      <p className="text-sm text-gray-600 font-light">
                        {getPriceDescription(order.taskType!, duration)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(price)}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {order.duration && (
            <div className="bg-gray-50 p-4 border border-gray-200">
              <p className="text-gray-700 font-light">
                ✓ Total Harga:{" "}
                <strong>
                  {formatCurrency(
                    calculatePrice(order.taskType, order.duration)
                  )}
                </strong>
              </p>
            </div>
          )}

          <NavigationButtons
            nextDisabled={!order.duration}
            previousHref="/steps/task"
            nextLabel="Isi Data Pribadi →"
            previousLabel="← Kembali"
          />
        </Card>

        {/* Info Box */}
        <Card className="bg-gray-50 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Sistem Harga Kami</h4>
          <ul className="text-sm text-gray-600 font-light space-y-2">
            <li>
              • <strong>Tugas Harian:</strong> Rp 15.000 - 65.000
            </li>
            <li>
              • <strong>1 hari:</strong> Rp 65.000 (ekspres)
            </li>
            <li>
              • <strong>7 hari:</strong> Rp 15.000 (hemat)
            </li>
            <li>
              • <strong>Tugas Akhir/Capstone:</strong> hingga Rp 200.000
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
