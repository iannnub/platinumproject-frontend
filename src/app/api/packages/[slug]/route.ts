import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { DEFAULT_PACKAGES } from '@/lib/constants';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const { data, error } = await supabaseServer
      .from('packages')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      const fallback = DEFAULT_PACKAGES.find((p) => p.slug === slug);
      if (fallback) {
        return NextResponse.json({ success: true, data: fallback });
      }
      return NextResponse.json(
        { success: false, message: 'Paket tidak ditemukan' },
        { status: 404 }
      );
    }

    const formatted = {
      ...data,
      features:
        typeof data.features === 'string'
          ? JSON.parse(data.features)
          : data.features || [],
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (err: any) {
    const fallback = DEFAULT_PACKAGES.find((p) => p.slug === slug);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback });
    }
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
