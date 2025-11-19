"use client";

import { useRouter } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";
import { TASK_TYPES } from "@/utils/constants";
import { Stepper } from "@/components/common/Stepper";
import { Card } from "@/components/common/Card";
import { NavigationButtons } from "@/components/common/NavigationButtons";

export default function TaskSelectionPage() {
  const router = useRouter();
  const { order, setTaskType } = useOrder();

  const handleSelectTask = (taskType: "daily" | "semester") => {
    setTaskType(taskType);
    router.push("/steps/duration");
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
        <Stepper currentStep={1} totalSteps={5} steps={steps} />

        {/* Main Content */}
        <Card className="mb-6">
          <h2 className="text-3xl font-light mb-2">Pilih Jenis Tugas</h2>
          <p className="text-gray-600 font-light mb-8">
            Pilih tipe tugas yang Anda butuhkan
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {Object.entries(TASK_TYPES).map(([key, task]) => (
              <button
                key={key}
                onClick={() => handleSelectTask(key as "daily" | "semester")}
                className={`p-6 border transition text-left ${
                  order.taskType === key
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <h3 className="font-medium text-lg mb-2">{task.label}</h3>
                <p className="text-sm font-light">{task.description}</p>
              </button>
            ))}
          </div>

          {order.taskType && (
            <div className="bg-gray-50 p-4 border border-gray-200">
              <p className="text-gray-700 font-light">
                ✓ Anda memilih:{" "}
                <strong>{TASK_TYPES[order.taskType].label}</strong>
              </p>
            </div>
          )}

          <NavigationButtons
            showPrevious={false}
            nextDisabled={!order.taskType}
            nextHref={order.taskType ? "/steps/duration" : undefined}
            nextLabel="Pilih Durasi →"
          />
        </Card>

        {/* Info Box */}
        <Card className="bg-gray-50 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Untuk Siapa?</h4>
          <ul className="text-sm text-gray-600 font-light space-y-2">
            <li>✓ Siswa SMA/SMK <strong>semua jurusan</strong></li>
            <li>✓ Mahasiswa Kuliah <strong>Teknik Informatika</strong></li>
            <li>✓ Tugas: PR, soal, makalah, praktik, proyek, skripsi</li>
            <li>✓ Harga kompetitif dari Rp 10.000 - Rp 200.000</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
