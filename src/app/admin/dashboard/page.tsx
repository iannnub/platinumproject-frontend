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
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Ringkasan Operasional
          </h2>
          <p className="text-xs text-silver-400 mt-1">
            Data pemesanan dekorasi masuk bulan ini secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="btn-secondary !py-2.5 !px-4 text-xs flex items-center gap-2 border-emerald-500/40 text-emerald-400 bg-emerald-950/30 hover:bg-emerald-900/40"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export Excel</span>
          </button>
          <Link
            href="/admin/bookings"
            className="btn-primary !py-2.5 !px-4 text-xs flex items-center gap-2 shadow-gold"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Kelola Semua Booking</span>
          </Link>
        </div>
      </div>

      {/* ─── 4 STAT CARDS ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Bookings */}
        <div className="p-6 rounded-2xl bg-silver-800/90 border border-silver-700/80 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-silver-400">
              Total Booking Bulan Ini
            </span>
            <div className="font-mono text-3xl font-bold text-white">
              {stats.total_bookings}
            </div>
            <span className="text-[11px] text-silver-400">Pemesanan terdaftar</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-950/40 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <CalendarDays className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Pending Bookings */}
        <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-amber-400">
              Menunggu Konfirmasi
            </span>
            <div className="font-mono text-3xl font-bold text-amber-300">
              {stats.pending_bookings}
            </div>
            <span className="text-[11px] text-amber-400/80">Perlu cek WA & DP</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-900/30 text-amber-400 border border-amber-500/40 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Confirmed Bookings */}
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-400">
              Jadwal Dikonfirmasi
            </span>
            <div className="font-mono text-3xl font-bold text-emerald-300">
              {stats.confirmed_bookings}
            </div>
            <span className="text-[11px] text-emerald-400/80">Jadwal H siap pasang</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-900/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="p-6 rounded-2xl border border-gold/40 bg-gold/10 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gold">
              Total Omset Pelunasan
            </span>
            <div className="font-mono text-2xl font-bold text-gold-light">
              Rp {Number(stats.total_revenue || 0).toLocaleString('id-ID')}
            </div>
            <span className="text-[11px] text-silver-300">Status lunas tercatat</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold border border-gold/40 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ─── RECENT BOOKINGS TABLE ──────────────────────────────── */}
      <div className="bg-silver-800/90 border border-silver-700/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-silver-700/80 bg-silver-850/40 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              Pemesanan Terbaru Masuk
            </h3>
            <p className="text-xs text-silver-400">
              Daftar 10 booking paling akhir yang dikirim calon pengantin.
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-semibold text-gold hover:text-gold-light flex items-center gap-1 transition-colors"
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
              <thead className="bg-silver-850/80 border-b border-silver-700 text-silver-300 uppercase tracking-wider font-semibold">
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
              <tbody className="divide-y divide-silver-700/50 bg-transparent">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-silver-750/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-gold-light whitespace-nowrap">
                      {b.booking_code}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {b.bride_names}
                    </td>
                    <td className="px-6 py-4 text-silver-300 whitespace-nowrap">
                      {b.event_date}
                    </td>
                    <td className="px-6 py-4 text-silver-200 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-silver-700/60 border border-silver-600/50 font-medium">
                        {b.package_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : b.status === 'completed'
                            ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                            : b.status === 'cancelled'
                            ? 'bg-red-950/60 text-red-300 border-red-500/40'
                            : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {b.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          b.payment_status === 'paid'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : b.payment_status === 'dp_paid'
                            ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                            : 'bg-silver-700/60 text-silver-300 border-silver-600/40'
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
                        className="text-xs font-semibold text-gold hover:text-gold-light hover:underline"
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
