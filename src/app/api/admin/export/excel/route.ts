import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { supabaseServer, getAdminFromRequest } from '@/lib/supabaseServer';

export async function GET(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthenticated' }, { status: 401 });
  }

  try {
    const { data: bookings, error } = await supabaseServer
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !bookings) {
      throw new Error(error?.message || 'Data tidak ditemukan');
    }

    const rows = bookings.map((b) => ({
      'Kode Booking': b.booking_code,
      'Nama Mempelai': b.bride_names,
      Inisial: b.initials,
      WhatsApp: b.phone,
      'Tanggal Acara': b.event_date,
      'Jenis Acara': b.event_type,
      'Dekorasi': b.decoration_type,
      'Paket': b.package_type,
      'DP (Rp)': b.dp_amount || 0,
      'Total Biaya (Rp)': b.total_amount || 0,
      'Status Booking': b.status,
      'Status Pembayaran': b.payment_status,
      'Alamat': b.address,
      'Google Maps': b.maps_url,
      'Catatan': b.notes || '-',
      'Tanggal Dibuat': b.created_at,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Booking');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=platinum_bookings_${new Date()
          .toISOString()
          .slice(0, 10)}.xlsx`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengekspor data ke Excel' },
      { status: 500 }
    );
  }
}
