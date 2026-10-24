import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { DEFAULT_PACKAGES } from '@/lib/constants';

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json({
        success: true,
        data: DEFAULT_PACKAGES,
      });
    }

    const formatted = data.map((item) => ({
      ...item,
      features:
        typeof item.features === 'string'
          ? JSON.parse(item.features)
          : item.features || [],
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
    });
  } catch (err: any) {
    console.error('Failed to fetch packages from Supabase:', err);
    return NextResponse.json({
      success: true,
      data: DEFAULT_PACKAGES,
    });
  }
}
