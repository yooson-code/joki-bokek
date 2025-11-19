import { NextRequest, NextResponse } from 'next/server';
import { generateInvoiceHTML } from '@/utils/invoice';
import { OrderData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    const order = orderData as OrderData;

    // Validate required fields
    if (!order.email || !order.fullName) {
      return NextResponse.json(
        { ok: false, error: 'Email dan nama tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Generate invoice HTML
    const invoiceHTML = generateInvoiceHTML(order);

    // Return HTML invoice that can be printed to PDF
    return new NextResponse(invoiceHTML, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="Invoice-Joki-Bokek-${Date.now()}.html"`,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating invoice:', errorMessage);
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
