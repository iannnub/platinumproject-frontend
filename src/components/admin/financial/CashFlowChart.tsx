'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface CashFlowChartProps {
  data: Array<{
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
  }> | null;
}

const formatCurrency = (value: number) =>
  `Rp ${(value / 1_000_000).toFixed(1)}jt`;

export default function CashFlowChart({ data }: CashFlowChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-silver-500 text-xs">
        Belum ada data cash flow
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#3d3d3d" />
        <XAxis
          dataKey="month"
          stroke="#6B6B6B"
          style={{ fontSize: '11px' }}
          tick={{ fill: '#A8A8A8' }}
        />
        <YAxis
          stroke="#6B6B6B"
          style={{ fontSize: '11px' }}
          tickFormatter={formatCurrency}
          tick={{ fill: '#A8A8A8' }}
          width={70}
        />
        <Tooltip
          formatter={(value: any) => [formatCurrency(Number(value) || 0)]}
          contentStyle={{
            backgroundColor: '#2A2A2A',
            border: '1px solid #4A4A4A',
            borderRadius: '12px',
            padding: '10px 14px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
            color: '#fff',
          }}
          labelStyle={{ fontWeight: 600, color: '#D4AF37', marginBottom: 4 }}
        />
        <Legend
          wrapperStyle={{ paddingTop: '16px', fontSize: '12px', color: '#C0C0C0' }}
          iconType="circle"
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          strokeWidth={2.5}
          name="Pemasukan"
          dot={{ fill: '#10b981', r: 3 }}
          activeDot={{ r: 5, strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#ef4444"
          strokeWidth={2.5}
          name="Pengeluaran"
          dot={{ fill: '#ef4444', r: 3 }}
          activeDot={{ r: 5, strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#3b82f6"
          strokeWidth={2.5}
          name="Profit"
          dot={{ fill: '#3b82f6', r: 3 }}
          activeDot={{ r: 5, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
