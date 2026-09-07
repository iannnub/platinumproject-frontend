'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { financialApi } from '@/lib/api/financial';
import ExpenseList from '@/components/admin/financial/ExpenseList';
import ExpenseModal from '@/components/admin/financial/ExpenseModal';
import PaymentModal from '@/components/admin/financial/PaymentModal';
import {
  ArrowLeft, CreditCard, Plus, TrendingUp,
  Wallet, AlertCircle, CheckCircle2,
} from 'lucide-react';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const ProfitCard = ({
  title, value, subtitle, positive,
}: { title: string; value: number; subtitle: string; positive: boolean }) => (
  <div className={`rounded-xl p-4 border ${positive ? 'border-blue-500/20 bg-blue-500/10' : 'border-red-500/20 bg-red-500/10'}`}>
    <p className="text-[11px] font-semibold uppercase tracking-wider text-silver-400 mb-1">{title}</p>
    <p className={`text-xl font-bold ${positive ? 'text-blue-400' : 'text-red-400'} tracking-tight`}>
      {formatCurrency(value)}
    </p>
    <p className="text-[11px] text-silver-500 mt-0.5">{subtitle}</p>
  </div>
);

export default function BookingFinancialDetail() {
  const urlParams = useParams();
  const id = typeof urlParams?.id === 'string' ? parseInt(urlParams.id, 10) : Number(urlParams?.id || 0);

  const [data, setData]                 = useState<any>(null);
  const [loading, setLoading]           = useState(true);
  const [expenseModal, setExpenseModal] = useState<{ open: boolean; expense?: any }>({ open: false });
  const [paymentOpen, setPaymentOpen]   = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await financialApi.getBookingDetail(id);
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleDeleteExpense = async (expenseId: number) => {
    const res = await financialApi.deleteExpense(expenseId);
    if (res.success) await loadData();
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-silver-400 text-xs font-medium">Memuat detail keuangan booking…</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center space-y-3">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
        <p className="text-white text-sm font-medium">Booking tidak ditemukan</p>
        <Link href="/admin/financial" className="text-gold text-xs font-semibold hover:underline">
          ← Kembali ke Dashboard Keuangan
        </Link>
      </div>
    );
  }

  const { booking, payment, expenses, profit_analysis } = data;
  const expenseItems = expenses.items.map((e: any) => ({ ...e, date: e.date }));

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/financial/bookings"
            className="p-2 bg-silver-850 hover:bg-silver-800 text-silver-300 hover:text-white rounded-xl transition-colors border border-silver-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-gold">{booking.booking_code}</span>
              <span className="text-silver-600">·</span>
              <h1 className="text-lg sm:text-xl font-bold font-heading text-white">{booking.bride_names}</h1>
            </div>
            <p className="text-xs text-silver-400 mt-0.5">Paket {booking.package.name}</p>
          </div>
        </div>

        <button
          onClick={() => setPaymentOpen(true)}
          className="px-4 py-2.5 bg-gold hover:bg-gold-light text-silver-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-gold self-start sm:self-auto"
        >
          <CreditCard className="w-4 h-4" />
          <span>Record Pembayaran</span>
        </button>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Booking Info */}
        <div className="bg-silver-850 rounded-2xl border border-silver-800 p-5 shadow-sm">
          <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-wider">
            Info Booking
          </h3>
          <dl className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-silver-800/60">
              <dt className="text-silver-400">Nama Mempelai</dt>
              <dd className="font-medium text-white text-right">{booking.bride_names}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-silver-800/60">
              <dt className="text-silver-400">Paket</dt>
              <dd className="font-medium text-silver-200 text-right">{booking.package.name}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-silver-800/60">
              <dt className="text-silver-400">Harga Paket</dt>
              <dd className="font-semibold text-gold">{formatCurrency(booking.package.price)}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-silver-800/60">
              <dt className="text-silver-400">Tanggal Acara</dt>
              <dd className="font-medium text-white">
                {new Date(booking.event_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
              </dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-silver-400">No. WhatsApp</dt>
              <dd className="font-medium text-white">{booking.phone}</dd>
            </div>
          </dl>
        </div>

        {/* Payment Status */}
        <div className="bg-silver-850 rounded-2xl border border-silver-800 p-5 shadow-sm">
          <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
            <Wallet className="w-4 h-4 text-gold" />
            Status Pembayaran
          </h3>

          <div className="mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              payment.status === 'fully_paid' || payment.status === 'paid'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : payment.status === 'dp_paid'
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              {payment.status === 'fully_paid' || payment.status === 'paid' ? (
                <><CheckCircle2 className="w-3.5 h-3.5" /> Lunas</>
              ) : payment.status === 'dp_paid' ? (
                'DP Terbayar'
              ) : (
                'Pending'
              )}
            </span>
          </div>

          <dl className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-silver-800/60">
              <dt className="text-silver-400">DP Fixed</dt>
              <dd className="font-semibold text-white">{formatCurrency(payment.dp_amount)}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-silver-800/60">
              <dt className="text-silver-400">Total Dibayar</dt>
              <dd className="font-semibold text-emerald-400">{formatCurrency(payment.total_paid)}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-silver-400">Sisa Tagihan</dt>
              <dd className={`font-semibold ${payment.remaining_amount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {formatCurrency(payment.remaining_amount)}
              </dd>
            </div>
          </dl>

          {/* Payment Logs */}
          {payment.payment_logs.length > 0 && (
            <div className="mt-4 pt-3 border-t border-silver-800">
              <p className="text-[10px] font-semibold text-silver-400 uppercase tracking-wider mb-2">Riwayat Pembayaran</p>
              <div className="space-y-2">
                {payment.payment_logs.map((log: any) => (
                  <div key={log.id} className="flex items-center justify-between text-xs bg-silver-900 rounded-xl p-2.5 border border-silver-800/60">
                    <div>
                      <span className="font-semibold capitalize text-white">{log.type}</span>
                      <span className="text-silver-400 ml-1.5 text-[11px]">· {log.method}</span>
                      {log.notes && <p className="text-silver-500 text-[10px] mt-0.5">{log.notes}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-400">{formatCurrency(log.amount)}</p>
                      <p className="text-silver-500 text-[10px]">{new Date(log.date).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profit Analysis */}
        <div className="bg-silver-850 rounded-2xl border border-silver-800 p-5 shadow-sm">
          <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gold" />
            Analisis Profit
          </h3>
          <div className="space-y-3">
            <ProfitCard
              title="Cash Position (Kas Riil)"
              value={profit_analysis.cash_position.value}
              subtitle="Total Paid − Total Expenses"
              positive={profit_analysis.cash_position.value >= 0}
            />
            <ProfitCard
              title="Expected Profit (Potensial)"
              value={profit_analysis.expected_profit.value}
              subtitle="Harga Paket − Total Expenses"
              positive={profit_analysis.expected_profit.value >= 0}
            />
            <div className="flex items-center justify-between px-4 py-3 bg-gold/10 border border-gold/20 rounded-xl">
              <span className="text-xs font-semibold text-silver-300">Profit Margin</span>
              <span className="text-base font-bold text-gold">
                {profit_analysis.profit_margin.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses / RAB Section */}
      <div className="bg-silver-850 rounded-2xl border border-silver-800 overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-silver-800">
          <div>
            <h3 className="font-semibold text-white text-sm sm:text-base">Pengeluaran / RAB</h3>
            <p className="text-xs text-silver-400 mt-0.5">
              Total Pengeluaran: <strong className="text-red-400">{formatCurrency(expenses.total)}</strong>
            </p>
          </div>
          <button
            onClick={() => setExpenseModal({ open: true, expense: null })}
            className="px-3.5 py-2 bg-gold hover:bg-gold-light text-silver-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-gold self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Tambah Pengeluaran
          </button>
        </div>
        <div className="p-4 sm:p-6">
          <ExpenseList
            expenses={expenseItems}
            onEdit={(expense) => setExpenseModal({ open: true, expense })}
            onDelete={handleDeleteExpense}
          />
        </div>
      </div>

      {/* Expense Modal */}
      <ExpenseModal
        booking={{ id, booking_code: booking.booking_code, customer: booking.bride_names }}
        expense={expenseModal.expense}
        isOpen={expenseModal.open}
        onClose={() => setExpenseModal({ open: false })}
        onSuccess={loadData}
      />

      {/* Payment Modal */}
      <PaymentModal
        booking={{
          id,
          booking_code:     booking.booking_code,
          customer:         booking.bride_names,
          package_price:    booking.package.price,
          dp_amount:        payment.dp_amount,
          total_paid:       payment.total_paid,
          remaining_amount: payment.remaining_amount,
        }}
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
