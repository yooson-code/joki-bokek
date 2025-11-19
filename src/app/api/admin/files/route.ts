import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "orders");

    // Check if directory exists
    if (!fs.existsSync(uploadsDir)) {
      return NextResponse.json({ files: [] });
    }

    // Read all files from uploads directory
    const fileNames = fs.readdirSync(uploadsDir);

    const files = fileNames.map((fileName) => {
      const filePath = path.join(uploadsDir, fileName);
      const stats = fs.statSync(filePath);

      return {
        name: fileName,
        size: stats.size,
        uploadedAt: new Date(stats.mtime).toLocaleString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
    });

    // Sort by upload date (newest first)
    files.sort((a, b) => {
      const dateA = new Date(a.uploadedAt);
      const dateB = new Date(b.uploadedAt);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error reading uploads directory:", error);
    return NextResponse.json(
      { error: "Gagal membaca file", files: [] },
      { status: 500 }
    );
  }
}
