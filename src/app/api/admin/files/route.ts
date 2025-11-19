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

      // Parse filename to extract client info
      // Format: timestamp_clientName_clientEmail_clientPhone_duration_originalFileName.pdf
      const parts = fileName.replace(".pdf", "").split("_");
      const clientName =
        parts[1]?.replace(/~/g, " ").replace(/_/g, " ") || "N/A"; // Second part is client name
      const clientEmail = parts[2] || "N/A"; // Third part is email
      const clientPhone = parts[3] || "N/A"; // Fourth part is phone
      const duration = parts.length >= 5 ? parts[4] : "N/A";

      const displayName = `${parts[0]}_${parts[parts.length - 1]}`;

      return {
        name: fileName,
        displayName,
        size: stats.size,
        uploadedAt: new Date(stats.mtime).toLocaleString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        clientName,
        clientEmail,
        clientPhone,
        duration,
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
