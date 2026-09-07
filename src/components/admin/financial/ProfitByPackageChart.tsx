'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';

interface PackageData {
  name: string;
  expected_profit: number;
  booking_count: number;
  profit_margin: number;
}

interface ProfitByPackageChartProps {
  data: PackageData[] | null;
}

const COLORS = ['#D4AF37', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

const formatCurrency = (value: number) =>
  `Rp ${(value / 1_000_000).toFixed(1)}jt`;

export default function ProfitByPackageChart({ data }: ProfitByPackageChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-silver-500 text-xs">
        Belum ada data per paket
      </div>
    );
  }

  const chartData = data.map((pkg) => ({
    name: pkg.name.length > 18 ? pkg.name.substring(0, 18) + '…' : pkg.name,
    profit: pkg.expected_profit,
    bookings: pkg.booking_count,
    margin: pkg.profit_margin,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={chartData}
        margin={{ top: 5, right: 10, left: 10, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#3d3d3d" />
        <XAxis
          dataKey="name"
          stroke="#6B6B6B"
          style={{ fontSize: '11px' }}
          angle={-35}
          textAnchor="end"
          interval={0}
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
          formatter={(value: any, name: any) => {
            if (name === 'Profit') return [formatCurrency(Number(value) || 0), name];
            return [value, name];
          }}
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
        <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '12px', color: '#C0C0C0' }} />
        <Bar dataKey="profit" name="Profit" radius={[6, 6, 0, 0]}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
