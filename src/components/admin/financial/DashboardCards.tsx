'use client';

import { DollarSign, TrendingUp, TrendingDown, Percent } from 'lucide-react';

interface SummaryData {
  total_revenue: number;
  total_expenses: number;
  net_profit: number;
  expected_profit: number;
  average_profit_margin: number;
  outstanding_payments: number;
}

interface DashboardCardsProps {
  data: SummaryData | null;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);

export default function DashboardCards({ data }: DashboardCardsProps) {
  if (!data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-silver-850 rounded-2xl border border-silver-800 p-5 animate-pulse min-h-[126px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 bg-silver-800 rounded" />
              <div className="w-9 h-9 bg-silver-800 rounded-xl" />
            </div>
            <div className="h-7 w-36 bg-silver-800 rounded mt-3" />
            <div className="h-3 w-28 bg-silver-800/60 rounded mt-2" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Revenue (Diterima)',
      value: formatCurrency(data.total_revenue),
      subtitle: `Outstanding: ${formatCurrency(data.outstanding_payments)}`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-silver-800',
    },
    {
      title: 'Total Pengeluaran (RAB)',
      value: formatCurrency(data.total_expenses),
      subtitle: 'Semua biaya operasional tercatat',
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-silver-800',
    },
    {
      title: 'Net Profit (Posisi Kas)',
      value: formatCurrency(data.net_profit),
      subtitle: 'Revenue - Pengeluaran riil',
      icon: TrendingUp,
      color: data.net_profit >= 0 ? 'text-blue-400' : 'text-red-400',
      bgColor: data.net_profit >= 0 ? 'bg-blue-500/10' : 'bg-red-500/10',
      borderColor: 'border-silver-800',
    },
    {
      title: 'Expected Profit (Potensial)',
      value: formatCurrency(data.expected_profit),
      subtitle: `${data.average_profit_margin.toFixed(1)}% profit margin`,
      icon: Percent,
      color: 'text-gold',
      bgColor: 'bg-gold/15',
      borderColor: 'border-gold/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-silver-850 rounded-2xl border ${card.borderColor} p-5 hover:border-silver-700 transition-all duration-300 hover:-translate-y-0.5 shadow-sm`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${card.bgColor} border border-white/5`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-silver-400 mb-1">
            {card.title}
          </p>

          <p className={`text-xl lg:text-2xl font-bold ${card.color} mb-1 leading-tight tracking-tight`}>
            {card.value}
          </p>

          <p className="text-[11px] text-silver-500 mt-1">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
