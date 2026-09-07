'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, CheckCircle2, Calendar, Sparkles, Filter, X, ArrowRight, Loader2, Info, FileText, ExternalLink } from 'lucide-react';
import { api } from '@/lib/api';
import { Package } from '@/types';
import { GOOGLE_DRIVE_RESOURCES } from '@/lib/constants';

const categoryLabels: Record<string, string> = {
  all: 'Semua Paket (13)',
  rumah: 'Dekor Rumah',
  layos: 'Tenda Layos',
  gedung_kecil: 'Gedung Kecil',
  gedung_besar: 'Gedung Besar',
  engagement: 'Lamaran / Engagement',
};

function PaketContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedModalPackage, setSelectedModalPackage] = useState<Package | null>(null);

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await api.getPackages();
        setPackages(data);
      } catch (err) {
        console.error('Failed to load packages', err);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  const filteredPackages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return packages.filter((pkg) => {
      const matchesCategory =
        selectedCategory === 'all' || pkg.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        pkg.name.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q) ||
        pkg.features.some((f) => f.toLowerCase().includes(q))
      );
    });
  }, [packages, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* ─── PAGE HEADER ────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
          Katalog Lengkap
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white">
          Pilihan Paket Dekorasi Pernikahan
        </h1>
        <p className="text-sm sm:text-base text-silver-300 leading-relaxed">
          Temukan paket dekorasi yang dirancang khusus untuk mewujudkan konsep pernikahan impian Anda, dari skala rumah hingga grand ballroom.
        </p>
      </div>

      {/* ─── GOOGLE DRIVE RESOURCE: DETAIL PAKET PDF ─────────────── */}
      <div className="luxury-card p-5 sm:p-6 border border-gold/30 bg-gradient-to-r from-silver-900 via-silver-850 to-silver-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-gold uppercase tracking-wider">
                Dokumen Resmi PDF
              </span>
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
              {GOOGLE_DRIVE_RESOURCES.detailPaket.title}
            </h2>
            <p className="text-xs text-silver-300">
              {GOOGLE_DRIVE_RESOURCES.detailPaket.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/portfolio?tab=pdf"
            className="btn-outline min-h-[44px] !px-4 !py-2 text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto"
          >
            <span>Katalog Reality</span>
          </Link>
          <a
            href={GOOGLE_DRIVE_RESOURCES.detailPaket.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-h-[44px] !px-4 !py-2 text-xs sm:text-sm flex items-center justify-center gap-2 w-full sm:w-auto shadow-gold"
          >
            <span>Buka di Google Drive</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ─── FILTER & SEARCH BAR ────────────────────────────────── */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {Object.entries(categoryLabels).map(([catKey, label]) => {
            const isActive = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`min-h-[44px] px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center transition-all ${
                  isActive
                    ? 'bg-gold text-white shadow-gold/20'
                    : 'bg-silver-800 text-silver-300 hover:bg-silver-700 border border-silver-700'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari fasilitas paket (cth: karpet, lighting, standing mirror)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-silver-800 border border-silver-700 rounded-lg text-white placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-silver-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ─── PACKAGE CARDS GRID ─────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="luxury-card overflow-hidden h-[450px] animate-pulse flex flex-col justify-between border-silver-700/60"
            >
              <div className="bg-silver-800 p-6 border-b border-silver-700/80 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-silver-700 rounded" />
                  <div className="h-3 w-12 bg-silver-700 rounded" />
                </div>
                <div className="h-7 w-48 bg-silver-700 rounded" />
                <div className="h-3 w-full bg-silver-700/60 rounded mt-2" />
              </div>
              <div className="p-6 space-y-3 flex-1">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-3.5 w-5/6 bg-silver-700/50 rounded" />
                ))}
              </div>
              <div className="p-6 pt-0">
                <div className="h-10 w-full bg-silver-700/80 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="py-20 text-center bg-silver-800 rounded-2xl border border-silver-700 p-8 space-y-4">
          <Info className="w-8 h-8 text-silver-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">
            Tidak ada paket yang sesuai pencarian
          </h3>
          <p className="text-xs text-silver-400 max-w-md mx-auto">
            Coba ganti kata kunci pencarian atau pilih kategori lain untuk melihat pilihan paket kami.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="btn-secondary !py-2 !px-4 text-xs"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="luxury-card overflow-hidden flex flex-col justify-between hover:shadow-gold/20"
            >
              {/* Header Box */}
              <div className="bg-silver-800 p-6 border-b border-silver-700/80">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gold px-2 py-0.5 rounded bg-silver-900 border border-gold/30">
                    {pkg.category.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-silver-400 font-mono">
                    #{pkg.slug}
                  </span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  {pkg.name}
                </h3>
                <p className="text-xs text-silver-300 mt-2 line-clamp-2">
                  {pkg.description}
                </p>
              </div>

              {/* Features List */}
              <div className="p-6 flex-1 space-y-3">
                <span className="text-xs font-semibold text-silver-200 block">
                  Daftar Fasilitas ({pkg.features.length} item):
                </span>
                <ul className="space-y-2">
                  {pkg.features.slice(0, 6).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-silver-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {pkg.features.length > 6 && (
                    <li className="text-[11px] text-gold-light font-medium pl-6">
                      + {pkg.features.length - 6} item fasilitas tambahan
                    </li>
                  )}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2.5">
                <Link
                  href={`/booking?package=${encodeURIComponent(pkg.name)}`}
                  className="w-full btn-primary min-h-[44px] !py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Pilih Paket Ini</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedModalPackage(pkg)}
                  className="w-full btn-secondary min-h-[44px] !py-2 text-xs flex items-center justify-center gap-1 text-silver-200"
                >
                  <span>Lihat Detail Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── PACKAGE DETAIL MODAL ───────────────────────────────── */}
      {selectedModalPackage && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-silver-900 rounded-t-2xl sm:rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-silver-700 flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-silver-700 flex items-start justify-between bg-silver-800 rounded-t-2xl">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold px-2 py-0.5 rounded bg-silver-900 border border-gold/30">
                  {selectedModalPackage.category.replace('_', ' ')}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-2">
                  Paket {selectedModalPackage.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedModalPackage(null)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-silver-700 text-silver-400 hover:text-white transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 flex-1">
              <p className="text-xs sm:text-sm text-silver-300 leading-relaxed">
                {selectedModalPackage.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold-light mb-3">
                  Kelengkapan Fasilitas ({selectedModalPackage.features.length} Item):
                </h4>
                <div className="bg-silver-800 rounded-xl p-4 border border-silver-700">
                  <ul className="space-y-2.5">
                    {selectedModalPackage.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-silver-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-silver-800 border border-silver-700 text-xs">
                <span className="text-silver-300">File spesifikasi & rincian paket:</span>
                <a
                  href={GOOGLE_DRIVE_RESOURCES.detailPaket.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light font-medium inline-flex items-center gap-1 min-h-[44px] py-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Buka PDF Dokumen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-silver-800 border border-gold/30 text-xs text-silver-200 space-y-1">
                <span className="font-semibold text-gold-light block">Ketentuan Booking:</span>
                <p className="text-silver-300">
                  DP minimal Rp 1.000.000 untuk mengunci tanggal. Pelunasan maksimal H-1 sebelum hari acara.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-silver-700 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end bg-silver-800">
              <button
                onClick={() => setSelectedModalPackage(null)}
                className="min-h-[44px] btn-outline !py-2.5 text-xs w-full sm:w-auto"
              >
                Tutup
              </button>
              <Link
                href={`/booking?package=${encodeURIComponent(selectedModalPackage.name)}`}
                className="min-h-[44px] btn-primary !py-2.5 text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Booking Paket Ini</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaketPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <p className="text-xs text-silver-500">Memuat katalog paket...</p>
        </div>
      }
    >
      <PaketContent />
    </Suspense>
  );
}

