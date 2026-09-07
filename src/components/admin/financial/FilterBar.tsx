'use client';

import { Calendar, RefreshCw } from 'lucide-react';

interface FilterBarProps {
  period: string;
  onPeriodChange: (period: string) => void;
  onRefresh: () => void;
}

const periods = [
  { value: 'day',   label: 'Hari Ini' },
  { value: 'week',  label: 'Minggu Ini' },
  { value: 'month', label: 'Bulan Ini' },
  { value: 'year',  label: 'Tahun Ini' },
];

export default function FilterBar({ period, onPeriodChange, onRefresh }: FilterBarProps) {
  return (
    <div className="bg-silver-850 rounded-2xl border border-silver-800 p-4 sm:p-5 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" />
            Filter Periode
          </h3>
          <p className="text-xs text-silver-400 mt-0.5">
            Pilih periode untuk melihat data keuangan
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => onPeriodChange(p.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                period === p.value
                  ? 'bg-gold text-silver-950 shadow-gold font-bold'
                  : 'bg-silver-900 border border-silver-750 text-silver-300 hover:text-white hover:bg-silver-800'
              }`}
            >
              {p.label}
            </button>
          ))}

          <button
            onClick={onRefresh}
            className="p-2 bg-silver-900 border border-silver-750 text-silver-400 hover:text-white hover:bg-silver-800 rounded-xl transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
