import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, getAdminFromRequest } from '@/lib/supabaseServer';
import { ADMIN_WHATSAPP, generateWhatsAppLink } from '@/lib/constants';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthenticated' }, { status: 401 });
  }

  const { id } = await params;
  const bookingId = parseInt(id, 10);

  try {
    const { data: booking, error } = await supabaseServer
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (error || !booking) {
      return NextResponse.json(
        { success: false, message: 'Booking tidak ditemukan' },
        { status: 404 }
      );
    }

    const waLinks = ADMIN_WHATSAPP.map((adm) => ({
      admin: adm.name,
      phone: adm.phone,
      url: generateWhatsAppLink(adm.phone, {
        code: booking.booking_code,
        bride_names: booking.bride_names,
        initials: booking.initials,
        phone_number: booking.phone,
        event_date: booking.event_date,
        event_type: booking.event_type,
        decoration_type: booking.decoration_type,
        package_name: booking.package_type,
        dp_amount: booking.dp_amount,
        address: booking.address,
        maps_url: booking.maps_url,
        notes: booking.notes,
      }),
    }));

    return NextResponse.json({
      success: true,
      data: booking,
      wa_links: waLinks,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil detail booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthenticated' }, { status: 401 });
  }

  const { id } = await params;
  const bookingId = parseInt(id, 10);

  try {
    const body = await request.json();
    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (body.status !== undefined) updateData.status = body.status;
    if (body.payment_status !== undefined) updateData.payment_status = body.payment_status;
    if (body.total_amount !== undefined) updateData.total_amount = Number(body.total_amount);
    if (body.dp_amount !== undefined) updateData.dp_amount = Number(body.dp_amount);
    if (body.total_paid !== undefined) updateData.total_paid = Number(body.total_paid);
    if (body.remaining_amount !== undefined) updateData.remaining_amount = Number(body.remaining_amount);
    if (body.notes !== undefined) updateData.notes = body.notes;

    const { data: updated, error } = await supabaseServer
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Booking berhasil diperbarui.',
      data: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Gagal memperbarui booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthenticated' }, { status: 401 });
  }

  const { id } = await params;
  const bookingId = parseInt(id, 10);

  try {
    const { error } = await supabaseServer
      .from('bookings')
      .delete()
      .eq('id', bookingId);

    if (error) throw new Error(error.message);

    return NextResponse.json({
      success: true,
      message: 'Booking berhasil dihapus.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Gagal menghapus booking' },
      { status: 500 }
    );
  }
}
