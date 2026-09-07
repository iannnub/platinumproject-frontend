'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { financialApi } from '@/lib/api/financial';
import ExportButton from '@/components/admin/financial/ExportButton';
import { ArrowLeft, Filter } from 'lucide-react';
import type { ExportData } from '@/lib/export/financialExport';

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

export default function FinancialReports() {
  const [period, setPeriod]         = useState('month');
  const [startDate, setStartDate]   = useState('');
  const [endDate, setEndDate]       = useState('');
  const [dashboard, setDashboard]   = useState<any>(null);
  const [bookings, setBookings]     = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);
  const [exportData, setExportData] = useState<ExportData | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const start = period === 'custom' ? startDate : undefined;
      const end   = period === 'custom' ? endDate   : undefined;

      const bookingFilters: Record<string, string> = { period };
      if (period === 'custom') {
        if (startDate) bookingFilters.start_date = startDate;
        if (endDate)   bookingFilters.end_date   = endDate;
      }

      const [dash, bk] = await Promise.all([
        financialApi.getDashboard(period, start, end),
        financialApi.getBookings(bookingFilters),
      ]);

      if (dash.success) setDashboard(dash.data);
      if (bk.success)   setBookings(bk.data);

      // Prepare export data
      if (dash.success && bk.success) {
        const allExpenses: ExportData['expenses'] = [];
        for (const b of bk.data) {
          if (Array.isArray(b.expenses)) {
            for (const exp of b.expenses) {
              allExpenses.push({
                booking_code: b.booking_code,
                item_name: exp.item_name,
                description: exp.description || '',
                amount: Number(exp.amount) || 0,
                date: exp.date || b.event_date || '',
              });
            }
          }
        }

        setExportData({
          summary: dash.data.summary,
          bookings: bk.data.map((b: any) => ({
            booking_code:   b.booking_code,
            customer:       b.customer,
            package_name:   b.package.name,
            package_price:  b.package.price,
            event_date:     b.event_date,
            payment_status: b.payment_status,
            total_paid:     b.financial.total_paid,
            total_expenses: b.financial.total_expenses,
            cash_position:  b.financial.cash_position,
            expected_profit:b.financial.expected_profit,
            profit_margin:  b.financial.profit_margin,
          })),
          expenses: allExpenses,
          period: {
            start: dash.data.period.start,
            end:   dash.data.period.end,
          },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [period, startDate, endDate]);

  useEffect(() => { loadData(); }, [loadData]);

  const periods = [
    { value: 'day',    label: 'Hari Ini' },
    { value: 'week',   label: 'Minggu Ini' },
    { value: 'month',  label: 'Bulan Ini' },
    { value: 'year',   label: 'Tahun Ini' },
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/financial"
            className="p-2 bg-silver-850 hover:bg-silver-800 text-silver-300 hover:text-white rounded-xl transition-colors border border-silver-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-white">Generate Laporan Keuangan</h1>
            <p className="text-xs text-silver-400">Filter periode, tinjau ringkasan, dan ekspor ke Excel/PDF</p>
          </div>
        </div>
        {exportData && <ExportButton data={exportData} />}
      </div>

      {/* Filter Card */}
      <div className="bg-silver-850 rounded-2xl border border-silver-800 p-5 shadow-sm">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
          <Filter className="w-4 h-4 text-gold" />
          Filter Periode Laporan
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                period === p.value
                  ? 'bg-gold text-silver-950 font-bold shadow-gold'
                  : 'bg-silver-900 border border-silver-750 text-silver-300 hover:text-white hover:bg-silver-800'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {period === 'custom' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-silver-800/80">
            <div>
              <label className="block text-xs font-medium text-silver-400 mb-1.5">Dari Tanggal</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-silver-900 border border-silver-750 text-white rounded-xl text-xs focus:ring-1 focus:ring-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-silver-400 mb-1.5">Sampai Tanggal</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-silver-900 border border-silver-750 text-white rounded-xl text-xs focus:ring-1 focus:ring-gold outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {dashboard ? (
          [
            { label: 'Total Pemasukan', value: dashboard.summary.total_revenue, color: 'text-emerald-400' },
            { label: 'Total Pengeluaran', value: dashboard.summary.total_expenses, color: 'text-red-400' },
            { label: 'Net Profit (Kas)', value: dashboard.summary.net_profit, color: dashboard.summary.net_profit >= 0 ? 'text-blue-400' : 'text-red-400' },
            { label: 'Expected Profit', value: dashboard.summary.expected_profit, color: 'text-gold' },
          ].map((card) => (
            <div key={card.label} className="bg-silver-850 rounded-2xl border border-silver-800 p-4 sm:p-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-wider text-silver-400 mb-1">{card.label}</p>
              <p className={`text-lg sm:text-xl font-bold ${card.color} tracking-tight`}>{formatCurrency(card.value)}</p>
            </div>
          ))
        ) : (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-silver-850 rounded-2xl border border-silver-800 p-4 sm:p-5 shadow-sm animate-pulse min-h-[92px] flex flex-col justify-between">
              <div className="h-3 w-28 bg-silver-800 rounded" />
              <div className="h-6 w-36 bg-silver-800 rounded mt-2" />
            </div>
          ))
        )}
      </div>

      {/* Period info */}
      <div className="flex items-center justify-between text-xs text-silver-400 px-1 min-h-[22px]">
        {dashboard?.period ? (
          <>
            <span>
              Rentang Laporan: <strong className="text-silver-200">{dashboard.period.start}</strong> s/d <strong className="text-silver-200">{dashboard.period.end}</strong>
            </span>
            <span>
              Total <strong className="text-gold">{bookings.length}</strong> booking
            </span>
          </>
        ) : (
          <div className="h-4 w-64 bg-silver-800/40 rounded animate-pulse" />
        )}
      </div>

      {/* Bookings Table */}
      <div className="bg-silver-850 rounded-2xl border border-silver-800 overflow-hidden shadow-sm">
        <div className="px-5 sm:px-6 py-4 border-b border-silver-800 flex items-center justify-between">
          <h3 className="font-semibold text-white text-sm sm:text-base">Detail Booking &amp; Rekapitulasi</h3>
          <span className="text-[11px] text-silver-400">Preview sebelum export</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-silver-900/80 border-b border-silver-800 text-silver-400 uppercase font-semibold">
                {['Kode', 'Customer', 'Paket', 'Harga', 'Paid', 'Pengeluaran', 'Cash Position', 'Expected Profit', 'Margin', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-silver-800/60">
              {loading ? (
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 w-14 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-24 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-16 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-16 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-16 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-16 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-16 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-12 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-5 w-16 bg-silver-800 rounded-full" /></td>
                  </tr>
                ))
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-silver-500">
                    Tidak ada booking pada periode ini
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-silver-800/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-gold whitespace-nowrap">{b.booking_code}</td>
                    <td className="px-4 py-3 font-medium text-white max-w-[130px] truncate">{b.customer}</td>
                    <td className="px-4 py-3 text-silver-300 max-w-[120px] truncate">{b.package.name}</td>
                    <td className="px-4 py-3 text-silver-300 whitespace-nowrap">{formatCurrency(b.package.price)}</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold whitespace-nowrap">{formatCurrency(b.financial.total_paid)}</td>
                    <td className="px-4 py-3 text-red-400 font-semibold whitespace-nowrap">{formatCurrency(b.financial.total_expenses)}</td>
                    <td className={`px-4 py-3 font-semibold whitespace-nowrap ${b.financial.cash_position >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                      {formatCurrency(b.financial.cash_position)}
                    </td>
                    <td className="px-4 py-3 text-gold font-semibold whitespace-nowrap">{formatCurrency(b.financial.expected_profit)}</td>
                    <td className="px-4 py-3 text-silver-300 font-medium whitespace-nowrap">{b.financial.profit_margin.toFixed(1)}%</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {statusBadge(b.payment_status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {bookings.length > 0 && dashboard && (
              <tfoot>
                <tr className="bg-silver-900/90 border-t-2 border-gold/40 font-semibold text-xs text-white">
                  <td colSpan={3} className="px-4 py-3 text-gold">TOTAL ({bookings.length} booking)</td>
                  <td className="px-4 py-3 text-silver-300">{formatCurrency(dashboard.summary.expected_revenue)}</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">{formatCurrency(dashboard.summary.total_revenue)}</td>
                  <td className="px-4 py-3 text-red-400 font-bold">{formatCurrency(dashboard.summary.total_expenses)}</td>
                  <td className={`px-4 py-3 font-bold ${dashboard.summary.net_profit >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                    {formatCurrency(dashboard.summary.net_profit)}
                  </td>
                  <td className="px-4 py-3 text-gold font-bold">{formatCurrency(dashboard.summary.expected_profit)}</td>
                  <td className="px-4 py-3 text-silver-300">{dashboard.summary.average_profit_margin.toFixed(1)}%</td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Export hint */}
      <p className="text-[11px] text-center text-silver-500">
        Klik tombol <span className="text-gold font-semibold">Export Laporan</span> di pojok kanan atas untuk mengunduh berkas Excel (.xlsx) atau dokumen PDF (.pdf)
      </p>
    </div>
  );
}
