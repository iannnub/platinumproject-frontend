'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  FileSpreadsheet,
  Loader2,
  AlertCircle,
  ExternalLink,
  MapPin,
  CalendarCheck,
} from 'lucide-react';
import { api, AdminStatsResponse } from '@/lib/api';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.getAdminStats();
      setData(res);
    } catch (err: any) {
      toast.error('Gagal memuat statistik dashboard: ' + (err.message || 'Error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleExport = async () => {
    try {
      toast.info('Menyiapkan file Excel...');
      await api.exportBookingsExcel();
      toast.success('File Excel berhasil diunduh');
    } catch (e: any) {
      toast.error('Gagal unduh Excel: ' + (e.message || 'Error server'));
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
        <span className="text-xs text-silver-500">Memuat data statistik...</span>
      </div>
    );
  }

  const stats = data?.stats || {
    total_bookings: 0,
    pending_bookings: 0,
    confirmed_bookings: 0,
    total_revenue: 0,
  };
  const recentBookings = data?.recent_bookings || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ─── GREETING & QUICK ACTIONS ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-silver-900">
            Ringkasan Operasional
          </h2>
          <p className="text-xs text-silver-600 mt-1">
            Data pemesanan dekorasi masuk bulan ini secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="btn-secondary !py-2.5 !px-4 text-xs flex items-center gap-2 border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export Excel</span>
          </button>
          <Link
            href="/admin/bookings"
            className="btn-primary !py-2.5 !px-4 text-xs flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Kelola Semua Booking</span>
          </Link>
        </div>
      </div>

      {/* ─── 4 STAT CARDS ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Bookings */}
        <div className="luxury-card p-6 border-silver-200 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-silver-500">
              Total Booking Bulan Ini
            </span>
            <div className="font-mono text-3xl font-bold text-silver-900">
              {stats.total_bookings}
            </div>
            <span className="text-[11px] text-silver-400">Pemesanan terdaftar</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CalendarDays className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Pending Bookings */}
        <div className="luxury-card p-6 border-amber-200 bg-amber-50/20 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-amber-700">
              Menunggu Konfirmasi
            </span>
            <div className="font-mono text-3xl font-bold text-amber-900">
              {stats.pending_bookings}
            </div>
            <span className="text-[11px] text-amber-600">Perlu cek WA & DP</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Confirmed Bookings */}
        <div className="luxury-card p-6 border-emerald-200 bg-emerald-50/20 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-700">
              Jadwal Dikonfirmasi
            </span>
            <div className="font-mono text-3xl font-bold text-emerald-900">
              {stats.confirmed_bookings}
            </div>
            <span className="text-[11px] text-emerald-600">Jadwal H siap pasang</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="luxury-card p-6 border-gold/30 bg-gold/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gold-dark">
              Total Omset Pelunasan
            </span>
            <div className="font-mono text-2xl font-bold text-silver-900">
              Rp {Number(stats.total_revenue || 0).toLocaleString('id-ID')}
            </div>
            <span className="text-[11px] text-silver-500">Status lunas tercatat</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ─── RECENT BOOKINGS TABLE ──────────────────────────────── */}
      <div className="luxury-card overflow-hidden">
        <div className="p-6 border-b border-silver-200 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-silver-900">
              Pemesanan Terbaru Masuk
            </h3>
            <p className="text-xs text-silver-500">
              Daftar 10 booking paling akhir yang dikirim calon pengantin.
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-semibold text-gold hover:text-gold-dark flex items-center gap-1"
          >
            <span>Buka Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-12 text-center text-xs text-silver-400">
            Belum ada booking yang tercatat di sistem.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-silver-50 border-b border-silver-200 text-silver-600 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-3.5">Kode</th>
                  <th className="px-6 py-3.5">Nama Mempelai</th>
                  <th className="px-6 py-3.5">Tgl Acara</th>
                  <th className="px-6 py-3.5">Paket</th>
                  <th className="px-6 py-3.5">Status Booking</th>
                  <th className="px-6 py-3.5">Status Bayar</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silver-100 bg-white">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-silver-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-silver-900 whitespace-nowrap">
                      {b.booking_code}
                    </td>
                    <td className="px-6 py-4 font-medium text-silver-900">
                      {b.bride_names}
                    </td>
                    <td className="px-6 py-4 text-silver-600 whitespace-nowrap">
                      {b.event_date}
                    </td>
                    <td className="px-6 py-4 text-silver-700 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-silver-100 font-medium">
                        {b.package_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : b.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          b.payment_status === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.payment_status === 'dp_paid'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-silver-200 text-silver-700'
                        }`}
                      >
                        {b.payment_status === 'paid'
                          ? 'Lunas'
                          : b.payment_status === 'dp_paid'
                          ? 'DP Terbayar'
                          : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/bookings?search=${encodeURIComponent(
                          b.booking_code
                        )}`}
                        className="text-xs font-semibold text-gold hover:underline"
                      >
                        Kelola
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
