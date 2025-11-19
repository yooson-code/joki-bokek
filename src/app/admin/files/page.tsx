"use client";

import { useEffect, useState } from "react";
import fs from "fs";
import path from "path";

export default function AdminPage() {
  const [files, setFiles] = useState<
    Array<{ name: string; size: number; uploadedAt: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/files");

      if (!response.ok) {
        throw new Error("Gagal mengambil daftar file");
      }

      const data = await response.json();
      setFiles(data.files || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (fileName: string) => {
    window.location.href = `/api/downloads?file=${fileName}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-light tracking-wide mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-600 font-light">
            Kelola file yang diupload oleh pelanggan
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 font-light">Memuat file...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 border border-red-200">
            <p className="text-red-600 font-light">{error}</p>
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 font-light">
              Belum ada file yang diupload
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Nama File
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Ukuran
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Tanggal Upload
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 font-light text-gray-600 break-all">
                      {file.name}
                    </td>
                    <td className="py-4 px-4 font-light text-gray-600">
                      {formatFileSize(file.size)}
                    </td>
                    <td className="py-4 px-4 font-light text-gray-600">
                      {file.uploadedAt}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => downloadFile(file.name)}
                        className="px-4 py-2 bg-gray-900 text-white text-sm font-light hover:bg-gray-800 transition"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
          <p className="text-sm text-gray-600 font-light">
            💾 Total file: <strong>{files.length}</strong>
          </p>
        </div>
      </div>
    </main>
  );
}
