"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-light tracking-wide">Joki Bokek</h1>
            <p className="text-xs text-gray-500 font-light">
              Solusi Tugas Akademik
            </p>
          </div>
          <button
            onClick={() => router.push("/steps/task")}
            className="px-8 py-2 text-sm font-light border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition duration-300"
          >
            Mulai Sekarang
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-widest text-gray-600 uppercase mb-6 font-light">
            Bantuan Tugas Akademik untuk Semua Jurusan
          </p>
          <h2 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
            Selesaikan Tugas Anda
            <br />
            <span className="font-extralight text-gray-500">
              Dengan Mudah & Cepat
            </span>
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Tugas menumpuk? Deadline terdesak? Kami siap membantu siswa SMA/SMK
            semua jurusan & mahasiswa Teknik Informatika menyelesaikan tugas
            harian, proyek, skripsi, atau capstone dengan solusi berkualitas
            tinggi.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/steps/task")}
              className="px-10 py-3 text-sm font-light bg-gray-900 text-white hover:bg-gray-800 transition duration-300"
            >
              Pesan Sekarang
            </button>
            <button className="px-10 py-3 text-sm font-light border border-gray-900 text-gray-900 hover:bg-gray-50 transition duration-300">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gray-600 uppercase mb-4 font-light">
              Mengapa Memilih Kami
            </p>
            <h3 className="text-4xl font-light">Komitmen Kami Kepada Anda</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                title: "Cepat & Terpercaya",
                description:
                  "Pengerjaan tepat waktu dengan jaminan kualitas terbaik",
              },
              {
                title: "Harga Kompetitif",
                description: "Sistem pricing yang fleksibel sesuai kebutuhan",
              },
              {
                title: "Hasil Berkualitas",
                description: "Dikerjakan oleh tim profesional berpengalaman",
              },
              {
                title: "Aman & Rahasia",
                description: "Privasi data Anda adalah prioritas kami",
              },
            ].map((feature, idx) => (
              <div key={idx} className="pb-8 border-b border-gray-200">
                <div className="text-2xl mb-4 text-gray-800">✓</div>
                <h4 className="font-medium text-lg mb-3">{feature.title}</h4>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gray-600 uppercase mb-4 font-light">
              Layanan Kami
            </p>
            <h3 className="text-4xl font-light">
              Jenis Tugas yang Kami Tangani
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Tugas Harian",
                items: [
                  "PR & Soal Latihan (Semua Jurusan)",
                  "Praktik Pemrograman (C++, Java, Python)",
                  "Tugas Makalah & Dokumentasi",
                  "Lab & Praktik Lapangan",
                ],
              },
              {
                title: "Tugas Akhir / Capstone / Skripsi",
                items: [
                  "Proyek Akhir Semester (Semua Jurusan)",
                  "Aplikasi Website & Desktop",
                  "Penelitian & Analisis Data",
                  "Dokumentasi Teknis Lengkap",
                ],
              },
            ].map((service, idx) => (
              <div key={idx} className="border border-gray-200 p-12">
                <h4 className="text-2xl font-light mb-8">{service.title}</h4>
                <ul className="space-y-3">
                  {service.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-gray-600 font-light flex items-start"
                    >
                      <span className="text-gray-400 mr-4 mt-1">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gray-600 uppercase mb-4 font-light">
              Sistem Harga
            </p>
            <h3 className="text-4xl font-light">
              Harga Fleksibel Sesuai Durasi
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                duration: "1 Hari (Ekspres)",
                amount: "Rp 80.000",
                status: "Tugas Harian",
              },
              {
                duration: "4 Hari (Normal)",
                amount: "Rp 35.000",
                status: "Tugas Harian",
              },
              {
                duration: "7 Hari (Hemat)",
                amount: "Rp 10.000",
                status: "Tugas Harian",
              },
            ].map((price, idx) => (
              <div key={idx} className="border border-gray-200 p-8 text-center">
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-4 font-light">
                  {price.status}
                </p>
                <p className="text-3xl font-light mb-3">{price.amount}</p>
                <p className="text-gray-600 font-light">{price.duration}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 font-light mt-12">
            Tugas Akhir/Capstone hingga <strong>Rp 200.000</strong> sesuai
            kompleksitas
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-light mb-6">Siap Memulai?</h3>
          <p className="text-lg text-gray-600 font-light mb-12">
            Proses yang sederhana dan cepat. Hanya 5 langkah untuk mendapatkan
            solusi tugas Anda.
          </p>

          <div className="grid grid-cols-5 gap-4 mb-12">
            {["Jenis", "Durasi", "Data", "Bayar", "Selesai"].map(
              (step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-10 h-10 border border-gray-900 rounded-full flex items-center justify-center mb-2 font-light text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-xs font-light text-gray-600">{step}</p>
                </div>
              )
            )}
          </div>

          <button
            onClick={() => router.push("/steps/task")}
            className="px-12 py-3 text-sm font-light bg-gray-900 text-white hover:bg-gray-800 transition duration-300"
          >
            Mulai Sekarang
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
            <div>
              <h4 className="font-light text-lg mb-4">Joki Bokek</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Platform bantuan tugas akademik untuk siswa SMA/SMK semua
                jurusan & mahasiswa Kuliah Teknik Informatika. Tim profesional
                berpengalaman siap membantu menyelesaikan tugas Anda.
              </p>
            </div>
            <div>
              <h4 className="font-light text-lg mb-4">Kontak</h4>
              <p className="text-sm text-gray-400 font-light mb-2">
                WhatsApp: 08xx xxxx xxxx
              </p>
              <p className="text-sm text-gray-400 font-light">
                Email: info@jokibokek.com
              </p>
            </div>
            <div>
              <h4 className="font-light text-lg mb-4">Jam Operasional</h4>
              <p className="text-sm text-gray-400 font-light mb-2">
                Senin - Jumat: 08.00 - 21.00
              </p>
              <p className="text-sm text-gray-400 font-light">
                Sabtu - Minggu: 10.00 - 20.00
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center flex justify-between items-center">
            <p className="text-sm text-gray-400 font-light">
              &copy; 2024 Joki Bokek. Semua hak dilindungi.
            </p>
            <button
              onClick={() => router.push("/admin/files")}
              className="text-xs text-gray-600 hover:text-white transition font-light"
            >
              Admin Panel
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
