'use client';

import { useState } from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { exportToExcel, exportToPDF, type ExportData } from '@/lib/export/financialExport';

interface ExportButtonProps {
  data: ExportData;
  filename?: string;
}

export default function ExportButton({ data, filename }: ExportButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async (format: 'excel' | 'pdf') => {
    setExporting(true);
    setShowMenu(false);
    try {
      const ts = new Date().toISOString().split('T')[0];
      const base = filename || `financial-report-${ts}`;
      if (format === 'excel') {
        exportToExcel(data, `${base}.xlsx`);
      } else {
        exportToPDF(data, `${base}.pdf`);
      }
    } catch (err) {
      console.error('Export error:', err);
      alert('Gagal export laporan. Silakan coba lagi.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={exporting}
        className="flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-gold-light text-silver-950 font-bold rounded-xl shadow-gold transition-all text-xs disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        {exporting ? 'Exporting…' : 'Export Laporan'}
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-silver-850 rounded-xl shadow-2xl border border-silver-800 py-2 z-50">
            <button
              onClick={() => handleExport('excel')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-silver-800 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white text-xs">Excel (.xlsx)</p>
                <p className="text-[10px] text-silver-400">3 sheet: Summary, Bookings, RAB</p>
              </div>
            </button>

            <button
              onClick={() => handleExport('pdf')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-silver-800 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <FileText className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white text-xs">PDF (.pdf)</p>
                <p className="text-[10px] text-silver-400">Print-ready document</p>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
