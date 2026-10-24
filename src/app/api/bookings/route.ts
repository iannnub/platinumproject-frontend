import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { ADMIN_WHATSAPP, generateWhatsAppLink } from '@/lib/constants';

function generateBookingCode(todayCount: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const seq = String(todayCount + 1).padStart(3, '0');
  return `#PB${dateStr}${seq}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      bride_names,
      initials,
      phone,
      event_date,
      event_type = 'Wedding',
      decoration_type = 'Dalam',
      package_type,
      dp_amount = 1000000,
      lat = -7.0252,
      lng = 109.8285,
      address,
      notes = '',
    } = body;

    if (!bride_names || !initials || !phone || !event_date || !package_type || !address) {
      return NextResponse.json(
        {
          success: false,
          message: 'Mohon lengkapi seluruh kolom formulir yang wajib diisi.',
        },
        { status: 422 }
      );
    }

    const cleanPhone = String(phone).replace(/[\s\-]/g, '');
    const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

    // Count today's bookings for sequence
    const today = new Date().toISOString().split('T')[0];
    const { count } = await supabaseServer
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${today}T00:00:00.000Z`);

    const bookingCode = generateBookingCode(count || 0);

    const newBookingData = {
      booking_code: bookingCode,
      bride_names,
      initials,
      phone: cleanPhone,
      event_date,
      event_type,
      decoration_type,
      package_type,
      dp_amount: Number(dp_amount) || 1000000,
      total_amount: null,
      total_paid: 0,
      remaining_amount: null,
      payment_status: 'pending',
      status: 'pending',
      lat: Number(lat),
      lng: Number(lng),
      address,
      maps_url: mapsUrl,
      notes: notes || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: inserted, error: insertError } = await supabaseServer
      .from('bookings')
      .insert(newBookingData)
      .select()
      .single();

    if (insertError) {
      console.error('Supabase booking insert error:', insertError);
      throw new Error(insertError.message);
    }

    const waLinks = ADMIN_WHATSAPP.map((admin) => ({
      admin: admin.name,
      phone: admin.phone,
      is_primary: admin.phone === '6285707752030',
      url: generateWhatsAppLink(admin.phone, {
        code: bookingCode,
        bride_names,
        initials,
        phone_number: cleanPhone,
        event_date,
        event_type,
        decoration_type,
        package_name: package_type,
        dp_amount: Number(dp_amount) || 1000000,
        address,
        maps_url: mapsUrl,
        notes: notes || '',
      }),
    }));

    // Admin 3 adalah admin utama untuk direct booking WhatsApp
    const directAdmin3Link =
      waLinks.find((l) => l.phone === '6285707752030' || l.admin.includes('3'))?.url || waLinks[2]?.url;

    return NextResponse.json(
      {
        success: true,
        message: 'Booking berhasil dibuat! Menghubungkan langsung ke WhatsApp Admin 3.',
        data: inserted,
        direct_wa_url: directAdmin3Link,
        direct_admin: {
          id: 3,
          name: 'Admin 3',
          phone: '6285707752030',
          label: '0857-0775-2030',
        },
        wa_links: waLinks,
        whatsapp_links: waLinks.map((l) => l.url),
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error in /api/bookings:', err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || 'Terjadi kesalahan pada server saat membuat booking.',
      },
      { status: 500 }
    );
  }
}
