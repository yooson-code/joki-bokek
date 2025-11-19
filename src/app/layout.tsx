import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OrderProvider } from "@/contexts/OrderContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joki Bokek - Bantuan Tugas Profesional",
  description: "Layanan bantuan tugas terpercaya dengan harga kompetitif",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <OrderProvider>{children}</OrderProvider>
      </body>
    </html>
  );
}
