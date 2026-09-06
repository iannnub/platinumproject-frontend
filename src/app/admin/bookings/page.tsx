'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  FileSpreadsheet,
  Calendar,
  Phone,
  MapPin,
  Edit2,
  Trash2,
  Eye,
  X,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { api, PaginatedBookingsResponse } from '@/lib/api';
import { Booking } from '@/types';
import { toast } from 'sonner';

function BookingsManagementContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [meta, setMeta] = useState<PaginatedBookingsResponse['meta']>({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });

  // Filters
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Edit form state
  const [editStatus, setEditStatus] = useState('');
  const [editPaymentStatus, setEditPaymentStatus] = useState('');
  const [editTotalAmount, setEditTotalAmount] = useState<number | ''>('');
  const [editNotes, setEditNotes] = useState('');

  const loadBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getAdminBookings({
        search: search || undefined,
        status: status !== 'all' ? status : undefined,
        payment_status: paymentStatus !== 'all' ? paymentStatus : undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
        page,
      });
      setBookings(res.data);
      setMeta(res.meta);
    } catch (err: any) {
      toast.error('Gagal memuat booking: ' + (err.message || 'Error'));
    } finally {
      setLoading(false);
    }
  }, [search, status, paymentStatus, dateFrom, dateTo, page]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadBookings();
  };

  const handleExport = async () => {
    try {
      toast.info('Menyiapkan file Excel...');
      await api.exportBookingsExcel({
        search: search || undefined,
        status: status !== 'all' ? status : undefined,
        payment_status: paymentStatus !== 'all' ? paymentStatus : undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
      });
      toast.success('File Excel berhasil diunduh');
    } catch (e: any) {
      toast.error('Gagal export: ' + (e.message || 'Error'));
    }
  };

  const openEditModal = (b: Booking) => {
    setEditBooking(b);
    setEditStatus(b.status || 'pending');
    setEditPaymentStatus(b.payment_status || 'pending');
    setEditTotalAmount(b.total_amount || '');
    setEditNotes(b.notes || '');
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBooking) return;

    setActionLoading(true);
    try {
      await api.updateAdminBooking(editBooking.id, {
        status: editStatus,
        payment_status: editPaymentStatus,
        total_amount: editTotalAmount === '' ? undefined : Number(editTotalAmount),
        notes: editNotes,
      });
      toast.success('Status booking diperbarui');
      setEditBooking(null);
      loadBookings();
    } catch (err: any) {
      toast.error('Gagal memperbarui: ' + (err.message || 'Error'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setActionLoading(true);
    try {
      await api.deleteAdminBooking(deleteId);
      toast.success('Booking berhasil dihapus');
      setDeleteId(null);
      loadBookings();
    } catch (err: any) {
      toast.error('Gagal menghapus: ' + (err.message || 'Error'));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ─── CONTROLS HEADER ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-silver-900">
            Daftar Jadwal & Pemesanan
          </h2>
          <p className="text-xs text-silver-500 mt-0.5">
            Total {meta.total} booking terdaftar dalam database
          </p>
        </div>

        <button
          onClick={handleExport}
          className="btn-secondary !py-2.5 !px-4 text-xs flex items-center gap-2 border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>Export Excel Terfilter</span>
        </button>
      </div>

      {/* ─── FILTERS BOX ────────────────────────────────────────── */}
      <div className="luxury-card p-5 space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search text */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kode, nama mempelai, no WA..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-silver-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs bg-white border border-silver-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="all">Semua Status Booking</option>
              <option value="pending">Pending (Menunggu)</option>
              <option value="confirmed">Confirmed (Dikonfirmasi)</option>
              <option value="completed">Completed (Selesai)</option>
              <option value="cancelled">Cancelled (Batal)</option>
            </select>
          </div>

          {/* Payment Status Filter */}
          <div>
            <select
              value={paymentStatus}
              onChange={(e) => {
                setPaymentStatus(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs bg-white border border-silver-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="all">Semua Status Bayar</option>
              <option value="pending">Pending (Belum DP)</option>
              <option value="dp_paid">DP Terbayar</option>
              <option value="paid">Lunas Penuh</option>
            </select>
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="btn-primary !py-2 text-xs font-semibold"
          >
            Terapkan Filter
          </button>
        </form>

        {/* Date range filters */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-silver-100 text-xs text-silver-600">
          <span className="font-semibold text-silver-700">Rentang Tanggal Acara:</span>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
              }}
              className="px-2.5 py-1.5 bg-white border border-silver-300 rounded-lg text-xs"
            />
            <span>s/d</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
              }}
              className="px-2.5 py-1.5 bg-white border border-silver-300 rounded-lg text-xs"
            />
          </div>
          {(search || status !== 'all' || paymentStatus !== 'all' || dateFrom || dateTo) && (
            <button
              onClick={() => {
                setSearch('');
                setStatus('all');
                setPaymentStatus('all');
                setDateFrom('');
                setDateTo('');
                setPage(1);
              }}
              className="text-xs text-red-500 hover:underline font-semibold ml-auto"
            >
              Reset Semua Filter
            </button>
          )}
        </div>
      </div>

      {/* ─── DATA TABLE ─────────────────────────────────────────── */}
      <div className="luxury-card overflow-hidden">
        {loading ? (
          <div className="p-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto" />
            <span className="text-xs text-silver-500">Memuat data booking...</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-16 text-center text-xs text-silver-400 space-y-2">
            <p className="text-sm font-semibold text-silver-700">
              Tidak ada data booking yang sesuai dengan kriteria filter.
            </p>
            <p>Silakan coba reset atau sesuaikan kata kunci pencarian Anda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-silver-50 border-b border-silver-200 text-silver-600 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Kode & Tanggal</th>
                  <th className="px-5 py-3.5">Mempelai</th>
                  <th className="px-5 py-3.5">WhatsApp</th>
                  <th className="px-5 py-3.5">Paket & Akad</th>
                  <th className="px-5 py-3.5">Status Booking</th>
                  <th className="px-5 py-3.5">Status Bayar</th>
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silver-100 bg-white">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-silver-50/80 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-silver-900 block">
                        {b.booking_code}
                      </span>
                      <span className="text-[11px] text-silver-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-gold" />
                        <span>{b.event_date_formatted || b.event_date}</span>
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-semibold text-silver-900 block">
                        {b.bride_names}
                      </span>
                      <span className="text-[11px] text-silver-500">
                        Inisial: {b.initials}
                      </span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <a
                        href={`https://wa.me/${b.phone.replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{b.phone}</span>
                      </a>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-silver-800 block">
                        {b.package_type}
                      </span>
                      <span className="text-[11px] text-silver-500">
                        Akad: {b.decoration_type}
                      </span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
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

                    <td className="px-5 py-4 whitespace-nowrap">
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

                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setDetailBooking(b)}
                          title="Lihat Rincian Lengkap"
                          className="p-1.5 text-silver-600 hover:text-silver-900 hover:bg-silver-100 rounded-md transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(b)}
                          title="Ubah Status & Catatan"
                          className="p-1.5 text-gold hover:text-gold-dark hover:bg-gold/10 rounded-md transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(b.id)}
                          title="Hapus Booking"
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {meta.last_page > 1 && (
          <div className="p-4 border-t border-silver-200 flex items-center justify-between text-xs text-silver-600 bg-silver-50">
            <span>
              Halaman {meta.current_page} dari {meta.last_page} (Total {meta.total} item)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={meta.current_page <= 1}
                className="p-1.5 border border-silver-300 rounded-lg hover:bg-white disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
                disabled={meta.current_page >= meta.last_page}
                className="p-1.5 border border-silver-300 rounded-lg hover:bg-white disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── MODAL DETAIL BOOKING ───────────────────────────────── */}
      {detailBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-silver-200 relative">
            <button
              onClick={() => setDetailBooking(null)}
              className="absolute top-5 right-5 p-1.5 text-silver-400 hover:text-silver-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-silver-200 pb-4">
              <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider">
                RINCIAN PEMESANAN #{detailBooking.id}
              </span>
              <h3 className="font-heading text-2xl font-bold text-silver-900 mt-1">
                {detailBooking.booking_code}
              </h3>
              <span className="text-xs text-silver-500">
                Didaftarkan pada: {detailBooking.created_at}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-silver-50 rounded-xl border border-silver-200">
                <span className="text-silver-500 block">Nama Mempelai:</span>
                <span className="font-bold text-silver-900 block mt-0.5">
                  {detailBooking.bride_names}
                </span>
                <span className="text-[11px] text-silver-500">
                  Initial: {detailBooking.initials}
                </span>
              </div>

              <div className="p-3 bg-silver-50 rounded-xl border border-silver-200">
                <span className="text-silver-500 block">WhatsApp:</span>
                <a
                  href={`https://wa.me/${detailBooking.phone.replace(/^0/, '62')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:underline block mt-0.5"
                >
                  {detailBooking.phone}
                </a>
              </div>

              <div className="p-3 bg-silver-50 rounded-xl border border-silver-200">
                <span className="text-silver-500 block">Tanggal Acara:</span>
                <span className="font-bold text-silver-900 block mt-0.5">
                  {detailBooking.event_date_formatted || detailBooking.event_date}
                </span>
                <span className="text-[11px] text-silver-500">
                  Jenis: {detailBooking.event_type}
                </span>
              </div>

              <div className="p-3 bg-silver-50 rounded-xl border border-silver-200">
                <span className="text-silver-500 block">Paket Dekorasi:</span>
                <span className="font-bold text-silver-900 block mt-0.5">
                  {detailBooking.package_type}
                </span>
                <span className="text-[11px] text-silver-500">
                  Akad: {detailBooking.decoration_type}
                </span>
              </div>

              <div className="p-3 bg-silver-50 rounded-xl border border-silver-200">
                <span className="text-silver-500 block">Komitmen DP:</span>
                <span className="font-bold text-gold-dark block mt-0.5">
                  Rp {Number(detailBooking.dp_amount || 0).toLocaleString('id-ID')}
                </span>
              </div>

              <div className="p-3 bg-silver-50 rounded-xl border border-silver-200">
                <span className="text-silver-500 block">Total Kesepakatan:</span>
                <span className="font-bold text-silver-900 block mt-0.5">
                  {detailBooking.total_amount
                    ? `Rp ${Number(detailBooking.total_amount).toLocaleString('id-ID')}`
                    : 'Belum diisi'}
                </span>
              </div>

              <div className="p-3 bg-silver-50 rounded-xl border border-silver-200 col-span-2">
                <span className="text-silver-500 block">Alamat Acara:</span>
                <span className="text-silver-800 leading-relaxed block mt-0.5">
                  {detailBooking.address}
                </span>
                {detailBooking.maps_url && (
                  <a
                    href={detailBooking.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-gold hover:underline font-semibold mt-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Buka Google Maps ({detailBooking.lat}, {detailBooking.lng})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {detailBooking.notes && (
                <div className="p-3 bg-silver-50 rounded-xl border border-silver-200 col-span-2">
                  <span className="text-silver-500 block">Catatan Tambahan:</span>
                  <span className="text-silver-700 italic block mt-0.5">
                    "{detailBooking.notes}"
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setDetailBooking(null)}
                className="btn-outline !py-2 text-xs"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const b = detailBooking;
                  setDetailBooking(null);
                  openEditModal(b);
                }}
                className="btn-primary !py-2 text-xs flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Ubah Status</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL EDIT STATUS BOOKING ──────────────────────────── */}
      {editBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-silver-200 relative">
            <button
              onClick={() => setEditBooking(null)}
              className="absolute top-5 right-5 p-1.5 text-silver-400 hover:text-silver-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-heading text-xl font-bold text-silver-900">
                Ubah Status Booking
              </h3>
              <p className="text-xs text-silver-500">
                {editBooking.booking_code} - {editBooking.bride_names}
              </p>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {/* Status Pemesanan */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-silver-800">
                  Status Booking
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-silver-300 rounded-lg focus:ring-2 focus:ring-gold"
                >
                  <option value="pending">Pending (Menunggu)</option>
                  <option value="confirmed">Confirmed (Jadwal Terkunci)</option>
                  <option value="completed">Completed (Selesai)</option>
                  <option value="cancelled">Cancelled (Dibatalkan)</option>
                </select>
              </div>

              {/* Status Pembayaran */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-silver-800">
                  Status Pembayaran
                </label>
                <select
                  value={editPaymentStatus}
                  onChange={(e) => setEditPaymentStatus(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-silver-300 rounded-lg focus:ring-2 focus:ring-gold"
                >
                  <option value="pending">Pending (Belum Bayar)</option>
                  <option value="dp_paid">DP Paid (DP Terbayar)</option>
                  <option value="paid">Paid (Lunas Penuh)</option>
                </select>
              </div>

              {/* Total Kesepakatan Harga */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-silver-800">
                  Total Harga Kesepakatan (Rp)
                </label>
                <input
                  type="number"
                  step="100000"
                  value={editTotalAmount}
                  onChange={(e) =>
                    setEditTotalAmount(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  placeholder="Contoh: 7500000"
                  className="w-full px-3 py-2.5 text-xs bg-white border border-silver-300 rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>

              {/* Catatan Admin */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-silver-800">
                  Catatan Internal / Operasional
                </label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Catatan rekening transfer, request khusus..."
                  className="w-full px-3 py-2 text-xs bg-white border border-silver-300 rounded-lg focus:ring-2 focus:ring-gold resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setEditBooking(null)}
                  className="btn-outline !py-2 text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="btn-primary !py-2 text-xs flex items-center gap-1.5"
                >
                  {actionLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL KONFIRMASI HAPUS ─────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-silver-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-silver-900">
              Hapus Data Booking?
            </h3>
            <p className="text-xs text-silver-600 leading-relaxed">
              Tindakan ini permanen dan akan menghapus booking ini beserta riwayat lognya dari database.
            </p>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setDeleteId(null)}
                disabled={actionLoading}
                className="btn-outline !py-2 text-xs"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5"
              >
                {actionLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Ya, Hapus</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminBookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <span className="text-xs text-silver-500">Memuat data booking...</span>
        </div>
      }
    >
      <BookingsManagementContent />
    </Suspense>
  );
}
