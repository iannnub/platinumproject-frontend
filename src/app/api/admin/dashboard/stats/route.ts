import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, getAdminFromRequest } from '@/lib/supabaseServer';

export async function GET(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Unauthenticated' },
      { status: 401 }
    );
  }

  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).toISOString();

    // Total bookings this month
    const { count: totalBookings } = await supabaseServer
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth);

    // Pending bookings
    const { count: pendingBookings } = await supabaseServer
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Confirmed bookings
    const { count: confirmedBookings } = await supabaseServer
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'confirmed');

    // Revenue from paid bookings
    const { data: paidBookings } = await supabaseServer
      .from('bookings')
      .select('total_amount, total_paid, dp_amount')
      .or('payment_status.eq.paid,payment_status.eq.dp_paid,payment_status.eq.fully_paid');

    let totalRevenue = 0;
    if (paidBookings) {
      totalRevenue = paidBookings.reduce((sum, b) => {
        return sum + (Number(b.total_paid) || Number(b.dp_amount) || 0);
      }, 0);
    }

    // Recent 10 bookings
    const { data: recentBookings } = await supabaseServer
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      success: true,
      data: {
        total_bookings: totalBookings || 0,
        pending_payment: pendingBookings || 0,
        confirmed: confirmedBookings || 0,
        stats: {
          total_bookings: totalBookings || 0,
          pending_bookings: pendingBookings || 0,
          confirmed_bookings: confirmedBookings || 0,
          total_revenue: totalRevenue,
        },
        recent_bookings: recentBookings || [],
      },
    });
  } catch (err: any) {
    console.error('Error fetching admin stats:', err);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat memuat data statistik.' },
      { status: 500 }
    );
  }
}
