'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { financialApi } from '@/lib/api/financial';
import dynamic from 'next/dynamic';
import DashboardCards from '@/components/admin/financial/DashboardCards';
import FilterBar from '@/components/admin/financial/FilterBar';
import PaymentModal from '@/components/admin/financial/PaymentModal';

const CashFlowChart = dynamic(() => import('@/components/admin/financial/CashFlowChart'), {
  loading: () => (
    <div className="h-80 bg-silver-850/60 border border-silver-800 animate-pulse rounded-2xl flex items-center justify-center text-xs text-silver-400">
      Memuat Grafik Arus Kas...
    </div>
  ),
  ssr: false,
});

const ProfitByPackageChart = dynamic(() => import('@/components/admin/financial/ProfitByPackageChart'), {
  loading: () => (
    <div className="h-80 bg-silver-850/60 border border-silver-800 animate-pulse rounded-2xl flex items-center justify-center text-xs text-silver-400">
      Memuat Grafik Laba Paket...
    </div>
  ),
  ssr: false,
});
import { DollarSign, TrendingUp, PieChart, ChevronRight, CreditCard, ArrowRight } from 'lucide-react';

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

export default function FinancialDashboard() {
  const [period, setPeriod]             = useState('month');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [cashFlowData, setCashFlowData]   = useState<any>(null);
  const [profitData, setProfitData]       = useState<any>(null);
  const [bookings, setBookings]           = useState<Booking[]>([]);
  const [loading, setLoading]             = useState(true);
  const [paymentBooking, setPaymentBooking] = useState<Booking | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [dash, flow, profit, bk] = await Promise.all([
        financialApi.getDashboard(period),
        financialApi.getCashFlow(new Date().getFullYear()),
        financialApi.getProfitByPackage('year'),
        financialApi.getBookings(),
      ]);
      if (dash.success)   setDashboardData(dash.data);
      if (flow.success)   setCashFlowData(flow.data);
      if (profit.success) setProfitData(profit.data);
      if (bk.success)     setBookings(bk.data.slice(0, 10));
    } catch (err) {
      console.error('Error loading financial data:', err);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => { loadData(); }, [loadData]);

  return (
    <div className="space-y-6 bg-silver-900 min-h-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-gold" />
            Financial Management
          </h1>
          <p className="text-xs text-silver-400 mt-1">
            Tracking pembayaran DP, pelunasan, pengeluaran RAB, dan analisis profit
          </p>
        </div>

        <Link
          href="/admin/financial/reports"
          className="px-4 py-2.5 bg-gold hover:bg-gold-light text-silver-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-gold self-start sm:self-auto"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Generate Laporan</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <FilterBar period={period} onPeriodChange={setPeriod} onRefresh={loadData} />

      {/* KPI Cards */}
      <DashboardCards data={dashboardData?.summary} />

      {/* Booking Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {dashboardData?.booking_stats ? (
          [
            { label: 'Total Booking', value: dashboardData.booking_stats.total, color: 'text-white' },
            { label: 'Pending', value: dashboardData.booking_stats.pending, color: 'text-amber-400' },
            { label: 'DP Paid', value: dashboardData.booking_stats.dp_paid, color: 'text-blue-400' },
            { label: 'Lunas', value: dashboardData.booking_stats.fully_paid, color: 'text-emerald-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-silver-850 rounded-2xl border border-silver-800 p-4 text-center shadow-sm">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[11px] text-silver-400 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))
        ) : (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-silver-850 rounded-2xl border border-silver-800 p-4 text-center shadow-sm animate-pulse min-h-[86px] flex flex-col justify-center items-center">
              <div className="h-7 w-12 bg-silver-800 rounded mb-2" />
              <div className="h-3 w-20 bg-silver-800/60 rounded" />
            </div>
          ))
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-silver-850 rounded-2xl border border-silver-800 p-5 sm:p-6 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Monthly Cash Flow {new Date().getFullYear()}
          </h3>
          <CashFlowChart data={cashFlowData?.months} />
        </div>

        <div className="bg-silver-850 rounded-2xl border border-silver-800 p-5 sm:p-6 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-gold" />
            Profit per Paket (Tahun Ini)
          </h3>
          <ProfitByPackageChart data={profitData} />
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-silver-850 rounded-2xl border border-silver-800 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-silver-800">
          <div>
            <h3 className="font-semibold text-white text-sm sm:text-base">Booking Terbaru — Financial Overview</h3>
            <p className="text-[11px] text-silver-400">10 data transaksi booking terbaru</p>
          </div>
          <Link
            href="/admin/financial/bookings"
            className="text-gold hover:text-gold-light text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-silver-900/80 border-b border-silver-800 text-silver-400 uppercase font-semibold">
                {['Kode', 'Customer', 'Paket', 'Harga', 'Dibayar', 'Pengeluaran', 'Expected Profit', 'Status', 'Aksi'].map((h) => (
                  <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-silver-800/60">
              {loading && bookings.length === 0 ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 w-16 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-28 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-silver-800 rounded" /></td>
                    <td className="px-4 py-3"><div className="h-5 w-16 bg-silver-800 rounded-full" /></td>
                    <td className="px-4 py-3 text-right"><div className="h-6 w-16 bg-silver-800 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-silver-500">Belum ada data booking</td>
                </tr>
              ) : bookings.map((b) => (
                <tr key={b.id} className="hover:bg-silver-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-gold whitespace-nowrap">{b.booking_code}</td>
                  <td className="px-4 py-3 font-medium text-white max-w-[140px] truncate">{b.customer}</td>
                  <td className="px-4 py-3 text-silver-300 max-w-[120px] truncate">{b.package?.name || 'Paket'}</td>
                  <td className="px-4 py-3 text-silver-300 whitespace-nowrap">{formatCurrency(b.package?.price || 0)}</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold whitespace-nowrap">{formatCurrency(b.financial?.total_paid || 0)}</td>
                  <td className="px-4 py-3 text-red-400 font-semibold whitespace-nowrap">{formatCurrency(b.financial?.total_expenses || 0)}</td>
                  <td className="px-4 py-3 text-gold font-semibold whitespace-nowrap">{formatCurrency(b.financial?.expected_profit || 0)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{statusBadge(b.payment_status)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPaymentBooking(b)}
                        className="p-1.5 bg-silver-800 hover:bg-gold hover:text-silver-950 text-gold rounded-lg transition-colors"
                        title="Record Payment"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/admin/financial/bookings/${b.id}`}
                        className="p-1.5 bg-silver-800 hover:bg-silver-700 text-silver-300 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold px-2"
                        title="Detail & RAB"
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

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-silver-800/60">
          {bookings.map((b) => (
            <div key={b.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-gold">{b.booking_code}</span>
                {statusBadge(b.payment_status)}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{b.customer}</p>
                <p className="text-xs text-silver-400">{b.package?.name || 'Paket'}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs bg-silver-900/60 p-2.5 rounded-xl border border-silver-800/60">
                <div>
                  <span className="text-silver-500 block text-[10px] uppercase">Harga</span>
                  <p className="font-semibold text-silver-300">{formatCurrency(b.package?.price || 0)}</p>
                </div>
                <div>
                  <span className="text-silver-500 block text-[10px] uppercase">Dibayar</span>
                  <p className="font-semibold text-emerald-400">{formatCurrency(b.financial?.total_paid || 0)}</p>
                </div>
                <div>
                  <span className="text-silver-500 block text-[10px] uppercase">Pengeluaran</span>
                  <p className="font-semibold text-red-400">{formatCurrency(b.financial?.total_expenses || 0)}</p>
                </div>
                <div>
                  <span className="text-silver-500 block text-[10px] uppercase">Expected Profit</span>
                  <p className="font-semibold text-gold">{formatCurrency(b.financial?.expected_profit || 0)}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setPaymentBooking(b)}
                  className="flex-1 py-2 text-xs font-semibold text-gold bg-silver-800 hover:bg-gold hover:text-silver-950 rounded-xl transition-colors border border-gold/20"
                >
                  Record Payment
                </button>
                <Link
                  href={`/admin/financial/bookings/${b.id}`}
                  className="flex-1 py-2 text-xs font-semibold text-center text-silver-200 bg-silver-800 hover:bg-silver-700 rounded-xl transition-colors"
                >
                  Detail &amp; RAB
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {paymentBooking && (
        <PaymentModal
          booking={{
            id:               paymentBooking.id,
            booking_code:     paymentBooking.booking_code,
            customer:         paymentBooking.customer,
            package_price:    paymentBooking.package?.price || 0,
            dp_amount:        paymentBooking.financial?.dp_amount || 1000000,
            total_paid:       paymentBooking.financial?.total_paid || 0,
            remaining_amount: paymentBooking.financial?.remaining_amount || 0,
          }}
          isOpen={!!paymentBooking}
          onClose={() => setPaymentBooking(null)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}
