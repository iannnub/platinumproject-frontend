'use client';

import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { financialApi } from '@/lib/api/financial';

interface BookingInfo {
  id: number;
  booking_code: string;
  customer: string;
  package_price: number;
  dp_amount: number;
  total_paid: number;
  remaining_amount: number;
}

interface PaymentModalProps {
  booking: BookingInfo;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

export default function PaymentModal({ booking, isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    payment_type: 'dp',
    amount: booking.dp_amount,
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'transfer',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleQuickAction = (type: 'dp' | 'pelunasan') => {
    setFormData((prev) => ({
      ...prev,
      payment_type: type,
      amount: type === 'dp' ? booking.dp_amount : booking.remaining_amount,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await financialApi.recordPayment({
        booking_id: booking.id,
        ...formData,
      });
      if (response.success) {
        onSuccess();
        onClose();
      } else {
        setError(response.message || 'Failed to record payment');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-silver-900 border border-silver-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-silver-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gold" />
              Record Pembayaran
            </h3>
            <p className="text-xs text-silver-400 mt-0.5">
              {booking.booking_code} — {booking.customer}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-silver-400 hover:text-white hover:bg-silver-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Quick Actions */}
          <div className="mb-6 p-4 bg-silver-850 border border-silver-800 rounded-xl">
            <p className="text-[11px] font-semibold text-silver-400 uppercase tracking-wider mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickAction('dp')}
                className="px-4 py-3 bg-silver-900 border border-amber-500/40 text-amber-400 rounded-xl hover:bg-amber-500/10 transition-all font-semibold text-xs text-left"
              >
                <span className="block text-[10px] text-silver-400 mb-0.5">Konfirmasi DP (Rp 1 Juta)</span>
                <span className="text-sm font-bold">Rp 1.000.000</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickAction('pelunasan')}
                className="px-4 py-3 bg-silver-900 border border-emerald-500/40 text-emerald-400 rounded-xl hover:bg-emerald-500/10 transition-all font-semibold text-xs text-left"
              >
                <span className="block text-[10px] text-silver-400 mb-0.5">Konfirmasi Pelunasan Sisa</span>
                <span className="text-sm font-bold">{formatCurrency(booking.remaining_amount)}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Payment Type */}
            <div>
              <label className="block text-xs font-semibold text-silver-300 mb-1.5">Jenis Pembayaran</label>
              <select
                value={formData.payment_type}
                onChange={(e) => setFormData({ ...formData, payment_type: e.target.value })}
                className="w-full px-4 py-2.5 bg-silver-850 border border-silver-750 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none text-xs text-white"
                required
              >
                <option value="dp">DP (Down Payment) - Rp 1.000.000</option>
                <option value="pelunasan">Pelunasan</option>
                <option value="lainnya">Lainnya / Angsuran</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-silver-300 mb-1.5">Jumlah (Rp)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-silver-850 border border-silver-750 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none text-xs text-white placeholder-silver-500"
                min="0"
                step="1000"
                required
              />
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-xs font-semibold text-silver-300 mb-1.5">Tanggal Pembayaran</label>
              <input
                type="date"
                value={formData.payment_date}
                onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                className="w-full px-4 py-2.5 bg-silver-850 border border-silver-750 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none text-xs text-white"
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-silver-300 mb-1.5">Metode Pembayaran</label>
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                className="w-full px-4 py-2.5 bg-silver-850 border border-silver-750 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none text-xs text-white"
                required
              >
                <option value="transfer">Transfer Bank</option>
                <option value="cash">Cash / Tunai</option>
                <option value="ewallet">E-Wallet (QRIS / OVO / GoPay)</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-silver-300 mb-1.5">Catatan (Opsional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 bg-silver-850 border border-silver-750 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none text-xs text-white placeholder-silver-500 resize-none"
                rows={2}
                placeholder="Contoh: Transfer BCA sudah dikonfirmasi"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-5 py-2.5 bg-silver-800 text-silver-300 rounded-xl hover:bg-silver-750 hover:text-white transition-colors font-semibold text-xs"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-5 py-2.5 bg-gold hover:bg-gold-light text-silver-950 font-bold rounded-xl shadow-gold transition-all text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Menyimpan…' : 'Simpan Pembayaran'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
