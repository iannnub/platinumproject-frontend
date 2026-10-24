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

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.trim() || '';
  const status = searchParams.get('status')?.trim() || '';
  const paymentStatus = searchParams.get('payment_status')?.trim() || '';
  const packageType = searchParams.get('package_type')?.trim() || '';
  const dateFrom = searchParams.get('date_from')?.trim() || '';
  const dateTo = searchParams.get('date_to')?.trim() || '';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const perPage = Math.max(1, parseInt(searchParams.get('per_page') || '20', 10));

  try {
    let query = supabaseServer
      .from('bookings')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(
        `bride_names.ilike.%${search}%,phone.ilike.%${search}%,booking_code.ilike.%${search}%`
      );
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (paymentStatus) {
      query = query.eq('payment_status', paymentStatus);
    }

    if (packageType) {
      query = query.eq('package_type', packageType);
    }

    if (dateFrom) {
      query = query.gte('event_date', dateFrom);
    }

    if (dateTo) {
      query = query.lte('event_date', dateTo);
    }

    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error querying bookings:', error);
      throw new Error(error.message);
    }

    const total = count || 0;
    const lastPage = Math.ceil(total / perPage) || 1;

    return NextResponse.json({
      success: true,
      data: data || [],
      meta: {
        current_page: page,
        last_page: lastPage,
        per_page: perPage,
        total,
      },
    });
  } catch (err: any) {
    console.error('Failed to get bookings:', err);
    return NextResponse.json(
      { success: false, message: 'Gagal memuat data booking.' },
      { status: 500 }
    );
  }
}
