'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { financialApi } from '@/lib/api/financial';
import PaymentModal from '@/components/admin/financial/PaymentModal';
import {
  ArrowLeft, Search, Filter, CreditCard, ChevronRight,
  TrendingUp, Wallet, DollarSign, Calendar
} from 'lucide-react';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    pending:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dp_paid:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
    paid:       'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    fully_paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };
  const labelMap: Record<string, string> = {
    pending:    'Pending',
    dp_paid:    'DP Paid',
    paid:       'Lunas',
    fully_paid: 'Lunas',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${map[status] || 'bg-silver-800 text-silver-400 border-silver-700'}`}>
      {labelMap[status] || status}
    </span>
  );
};

interface Booking {
  id: number;
  booking_code: string;
  customer: string;
  package: { name: string; price: number };
  event_date: string;
  payment_status: string;
  financial: {
    dp_amount: number;
    total_paid: number;
    remaining_amount: number;
    total_expenses: number;
    cash_position: number;
    expected_profit: number;
    profit_margin: number;
  };
}

export default function FinancialBookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    try {
      const filters: Record<string, string> = {};
      if (paymentStatus !== 'all') filters.payment_status = paymentStatus;
      if (startDate) filters.start_date = startDate;
      if (endDate) filters.end_date = endDate;
      
      const res = await financialApi.getBookings(filters);
      if (res.success) {
        let filtered = res.data;
        if (search.trim()) {
          const q = search.toLowerCase();
          filtered = filtered.filter((b: Booking) =>
            b.booking_code.toLowerCase().includes(q) ||
            b.customer.toLowerCase().includes(q) ||
            b.package.name.toLowerCase().includes(q)
          );
        }
        setBookings(filtered);
      }
    } catch (err) {
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [paymentStatus, startDate, endDate, search]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // Aggregate stats
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.financial?.total_paid || 0), 0);
  const totalExpenses = bookings.reduce((sum, b) => sum + (b.financial?.total_expenses || 0), 0);
  const totalCashPosition = totalRevenue - totalExpenses;
  const totalExpectedProfit = bookings.reduce((sum, b) => sum + (b.financial?.expected_profit || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-silver-850 border border-silver-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/financial"
              className="p-2 bg-silver-800 hover:bg-silver-700 text-silver-300 hover:text-white rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gold" />
                Semua Booking &amp; Keuangan
              </h1>
              <p className="text-xs text-silver-400">
                Detail transaksi, status pelunasan, dan rekap margin per booking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/financial/reports"
              className="px-3.5 py-2 bg-silver-800 hover:bg-silver-750 text-gold border border-gold/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              Laporan &amp; Ekspor
            </Link>
          </div>
        </div>

        {/* Quick Summary Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-silver-800">
          <div className="bg-silver-900/60 p-3.5 rounded-xl border border-silver-800/80">
            <span className="text-[11px] font-medium text-silver-400 block">Total Diterima (Kas)</span>
            <span className="text-sm sm:text-base font-bold text-emerald-400">{formatCurrency(totalRevenue)}</span>
          </div>
          <div className="bg-silver-900/60 p-3.5 rounded-xl border border-silver-800/80">
            <span className="text-[11px] font-medium text-silver-400 block">Total Pengeluaran (RAB)</span>
            <span className="text-sm sm:text-base font-bold text-red-400">{formatCurrency(totalExpenses)}</span>
          </div>
          <div className="bg-silver-900/60 p-3.5 rounded-xl border border-silver-800/80">
            <span className="text-[11px] font-medium text-silver-400 block">Posisi Kas Bersih</span>
            <span className={`text-sm sm:text-base font-bold ${totalCashPosition >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
              {formatCurrency(totalCashPosition)}
            </span>
          </div>
          <div className="bg-silver-900/60 p-3.5 rounded-xl border border-silver-800/80">
            <span className="text-[11px] font-medium text-silver-400 block">Expected Profit (Potensial)</span>
            <span className="text-sm sm:text-base font-bold text-gold">{formatCurrency(totalExpectedProfit)}</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-silver-850 border border-silver-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
          <input
            type="text"
            placeholder="Cari kode booking, nama mempelai, paket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-silver-900 border border-silver-750 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-gold placeholder-silver-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="px-3 py-2 bg-silver-900 border border-silver-750 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="all">Semua Status Bayar</option>
            <option value="pending">Pending (Belum DP)</option>
            <option value="dp_paid">DP Terbayar</option>
            <option value="fully_paid">Lunas Penuh</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2.5 py-1.5 bg-silver-900 border border-silver-750 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-gold"
            title="Tanggal Awal"
          />
          <span className="text-xs text-silver-500">-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2.5 py-1.5 bg-silver-900 border border-silver-750 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-gold"
            title="Tanggal Akhir"
          />
        </div>
      </div>

      {/* Bookings Table Card */}
      <div className="bg-silver-850 border border-silver-800 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-silver-400">
            <div className="w-8 h-8 border-3 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs">Memuat data booking keuangan...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-16 text-center text-silver-400">
            <p className="text-sm">Tidak ada booking yang sesuai dengan filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-silver-900/80 border-b border-silver-800 text-silver-400 uppercase font-semibold">
                  <th className="px-4 py-3 whitespace-nowrap">Kode Booking</th>
                  <th className="px-4 py-3 whitespace-nowrap">Mempelai</th>
                  <th className="px-4 py-3 whitespace-nowrap">Paket</th>
                  <th className="px-4 py-3 whitespace-nowrap">Harga Paket</th>
                  <th className="px-4 py-3 whitespace-nowrap">Total Dibayar</th>
                  <th className="px-4 py-3 whitespace-nowrap">Pengeluaran (RAB)</th>
                  <th className="px-4 py-3 whitespace-nowrap">Cash Pos</th>
                  <th className="px-4 py-3 whitespace-nowrap">Expected Profit</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silver-800/60">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-silver-800/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-gold whitespace-nowrap">
                      {b.booking_code}
                    </td>
                    <td className="px-4 py-3 text-white font-medium max-w-[140px] truncate">
                      {b.customer}
                    </td>
                    <td className="px-4 py-3 text-silver-300 max-w-[130px] truncate">
                      {b.package?.name}
                    </td>
                    <td className="px-4 py-3 text-silver-300 whitespace-nowrap">
                      {formatCurrency(b.package?.price || 0)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-400 whitespace-nowrap">
                      {formatCurrency(b.financial?.total_paid || 0)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-400 whitespace-nowrap">
                      {formatCurrency(b.financial?.total_expenses || 0)}
                    </td>
                    <td className={`px-4 py-3 font-semibold whitespace-nowrap ${(b.financial?.cash_position || 0) >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                      {formatCurrency(b.financial?.cash_position || 0)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gold whitespace-nowrap">
                      {formatCurrency(b.financial?.expected_profit || 0)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {statusBadge(b.payment_status)}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-1.5 bg-silver-800 hover:bg-gold hover:text-silver-950 text-gold rounded-lg transition-colors"
                          title="Catat Pembayaran"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={`/admin/financial/bookings/${b.id}`}
                          className="p-1.5 bg-silver-800 hover:bg-silver-700 text-silver-300 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold px-2"
                        >
                          <span>RAB</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {selectedBooking && (
        <PaymentModal
          isOpen={true}
          onClose={() => setSelectedBooking(null)}
          onSuccess={() => {
            setSelectedBooking(null);
            loadBookings();
          }}
          booking={{
            id: selectedBooking.id,
            booking_code: selectedBooking.booking_code,
            customer: selectedBooking.customer,
            package_price: selectedBooking.package?.price || 0,
            dp_amount: selectedBooking.financial?.dp_amount || 1000000,
            total_paid: selectedBooking.financial?.total_paid || 0,
            remaining_amount: selectedBooking.financial?.remaining_amount || 0,
          }}
        />
      )}
    </div>
  );
}
