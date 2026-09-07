'use client';

import { useState, useEffect } from 'react';
import { X, Receipt } from 'lucide-react';
import { financialApi } from '@/lib/api/financial';

interface BookingRef {
  id: number;
  booking_code: string;
  customer: string;
}

interface ExpenseData {
  id: number;
  item_name: string;
  description: string;
  amount: number;
  expense_date: string;
  notes: string;
}

interface ExpenseModalProps {
  booking: BookingRef;
  expense?: ExpenseData | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ExpenseModal({ booking, expense, isOpen, onClose, onSuccess }: ExpenseModalProps) {
  const isEdit = !!expense;

  const [formData, setFormData] = useState({
    item_name:    expense?.item_name    || '',
    description:  expense?.description  || '',
    amount:       expense?.amount       || 0,
    expense_date: expense?.expense_date || new Date().toISOString().split('T')[0],
    notes:        expense?.notes        || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // Reset form when expense changes
  useEffect(() => {
    setFormData({
      item_name:    expense?.item_name    || '',
      description:  expense?.description  || '',
      amount:       expense?.amount       || 0,
      expense_date: expense?.expense_date || new Date().toISOString().split('T')[0],
      notes:        expense?.notes        || '',
    });
    setError('');
  }, [expense, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = isEdit
        ? await financialApi.updateExpense(expense.id, formData)
        : await financialApi.addExpense({ booking_id: booking.id, ...formData });

      if (response.success) {
        onSuccess();
        onClose();
      } else {
        setError(response.message || 'Gagal menyimpan pengeluaran');
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
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
              <Receipt className="w-5 h-5 text-gold" />
              {isEdit ? 'Edit' : 'Tambah'} Pengeluaran (RAB)
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Item Name */}
            <div>
              <label className="block text-xs font-semibold text-silver-300 mb-1.5">
                Nama Item <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.item_name}
                onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                className="w-full px-4 py-2.5 bg-silver-850 border border-silver-750 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none text-xs text-white placeholder-silver-500"
                placeholder="Contoh: Sewa bunga mawar 500 tangkai"
                required
              />
              <p className="text-[11px] text-silver-400 mt-1">
                💡 Bebas tulis apa saja: bunga, bensin, transport, upah kru, sewa alat, dll
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-silver-300 mb-1.5">Deskripsi Detail</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-silver-850 border border-silver-750 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none text-xs text-white placeholder-silver-500 resize-none"
                rows={2}
                placeholder="Contoh: Dari supplier Jaya Bunga Bali, warna merah dan putih"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-silver-300 mb-1.5">
                Jumlah (Rp) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-silver-850 border border-silver-750 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none text-xs text-white placeholder-silver-500"
                min="0"
                step="1000"
                placeholder="2500000"
                required
              />
            </div>

            {/* Expense Date */}
            <div>
              <label className="block text-xs font-semibold text-silver-300 mb-1.5">
                Tanggal Pengeluaran <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={formData.expense_date}
                onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                className="w-full px-4 py-2.5 bg-silver-850 border border-silver-750 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none text-xs text-white"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-silver-300 mb-1.5">Catatan Tambahan</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 bg-silver-850 border border-silver-750 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none text-xs text-white placeholder-silver-500 resize-none"
                rows={2}
                placeholder="Catatan internal (opsional)"
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
                {loading ? 'Menyimpan…' : isEdit ? 'Update Pengeluaran' : 'Simpan Pengeluaran'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
