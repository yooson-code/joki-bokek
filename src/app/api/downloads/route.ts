import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    // Ambil fileName dari query parameter
    const fileName = request.nextUrl.searchParams.get("file");

    if (!fileName) {
      return NextResponse.json(
        { error: "Parameter file tidak ditemukan" },
        { status: 400 }
      );
    }

    // Security: Cegah path traversal attack
    if (
      fileName.includes("..") ||
      fileName.includes("/") ||
      fileName.includes("\\")
    ) {
      return NextResponse.json(
        { error: "Nama file tidak valid" },
        { status: 400 }
      );
    }

    // Path ke file yang tersimpan
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "orders",
      fileName
    );

    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File tidak ditemukan" },
        { status: 404 }
      );
    }

    // Baca file
    const fileBuffer = fs.readFileSync(filePath);
    const fileExtension = path.extname(fileName).toLowerCase();

    // Set mime type berdasarkan extension
    let mimeType = "application/octet-stream";
    if (fileExtension === ".pdf") mimeType = "application/pdf";
    else if (fileExtension === ".doc" || fileExtension === ".docx")
      mimeType = "application/msword";
    else if (fileExtension === ".xls" || fileExtension === ".xlsx")
      mimeType = "application/vnd.ms-excel";
    else if (fileExtension === ".txt") mimeType = "text/plain";
    else if (fileExtension === ".jpg" || fileExtension === ".jpeg")
      mimeType = "image/jpeg";
    else if (fileExtension === ".png") mimeType = "image/png";

    // Return file dengan headers yang tepat
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json(
      { error: "Gagal mendownload file" },
      { status: 500 }
    );
  }
}
