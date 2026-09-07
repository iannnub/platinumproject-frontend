'use client';

import { Edit, Trash2, Receipt } from 'lucide-react';

interface ExpenseItem {
  id: number;
  item_name: string;
  description: string;
  amount: number;
  date: string;
  created_by: string;
}

interface ExpenseListProps {
  expenses: ExpenseItem[];
  onEdit: (expense: ExpenseItem) => void;
  onDelete: (id: number) => void;
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

export default function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (expenses.length === 0) {
    return (
      <div className="text-center py-10 text-silver-500">
        <Receipt className="w-10 h-10 mx-auto mb-2 opacity-40 text-silver-500" />
        <p className="text-xs">Belum ada pengeluaran tercatat</p>
      </div>
    );
  }

  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-silver-900/80 border-b border-silver-800 text-silver-400 uppercase font-semibold">
              <th className="px-4 py-3 text-left w-8">#</th>
              <th className="px-4 py-3 text-left">Item</th>
              <th className="px-4 py-3 text-left">Deskripsi</th>
              <th className="px-4 py-3 text-right">Jumlah</th>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-silver-800/60">
            {expenses.map((expense, index) => (
              <tr key={expense.id} className="hover:bg-silver-800/40 transition-colors">
                <td className="px-4 py-3 text-silver-500">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-white">{expense.item_name}</td>
                <td className="px-4 py-3 text-silver-400 max-w-[200px] truncate">{expense.description || '—'}</td>
                <td className="px-4 py-3 text-right font-semibold text-red-400">{formatCurrency(expense.amount)}</td>
                <td className="px-4 py-3 text-silver-400">
                  {new Date(expense.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => onEdit(expense)}
                      className="p-1.5 bg-silver-800 hover:bg-silver-700 text-blue-400 hover:text-blue-300 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Hapus pengeluaran ini?')) onDelete(expense.id);
                      }}
                      className="p-1.5 bg-silver-800 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-silver-900/90 border-t-2 border-gold/40 font-semibold text-xs text-white">
              <td colSpan={3} className="px-4 py-3 text-gold">TOTAL PENGELUARAN</td>
              <td className="px-4 py-3 text-right text-red-400 font-bold text-sm">{formatCurrency(totalExpenses)}</td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {expenses.map((expense, index) => (
          <div key={expense.id} className="bg-silver-900/70 border border-silver-800 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-silver-500 uppercase font-mono">#{index + 1}</p>
                <h4 className="font-semibold text-white text-sm mt-0.5">{expense.item_name}</h4>
                {expense.description && (
                  <p className="text-xs text-silver-400 mt-1 line-clamp-2">{expense.description}</p>
                )}
              </div>
              <div className="flex gap-1.5 ml-2">
                <button
                  onClick={() => onEdit(expense)}
                  className="p-1.5 bg-silver-800 text-blue-400 hover:bg-silver-750 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Hapus pengeluaran ini?')) onDelete(expense.id);
                  }}
                  className="p-1.5 bg-silver-800 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2.5 border-t border-silver-800/80 mt-2">
              <span className="text-[11px] text-silver-500">
                {new Date(expense.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
              <span className="font-bold text-red-400 text-sm">{formatCurrency(expense.amount)}</span>
            </div>
          </div>
        ))}

        {/* Mobile Total */}
        <div className="bg-silver-900 border border-gold/40 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <span className="font-bold text-gold text-xs uppercase tracking-wider">TOTAL PENGELUARAN</span>
          <span className="text-lg font-bold text-red-400">{formatCurrency(totalExpenses)}</span>
        </div>
      </div>
    </div>
  );
}
