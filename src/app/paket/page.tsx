'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, CheckCircle2, Calendar, Sparkles, Filter, X, ArrowRight, Loader2, Info } from 'lucide-react';
import { api } from '@/lib/api';
import { Package } from '@/types';

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

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory =
      selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
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
        <div className="py-24 text-center space-y-4">
          <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto" />
          <p className="text-sm text-silver-400">Memuat katalog paket dari server...</p>
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
                  className="w-full btn-primary !py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Pilih Paket Ini</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedModalPackage(pkg)}
                  className="w-full btn-secondary !py-2 text-xs flex items-center justify-center gap-1 text-silver-200"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-silver-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-silver-700 flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-silver-700 flex items-start justify-between bg-silver-800 rounded-t-2xl">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold px-2 py-0.5 rounded bg-silver-900 border border-gold/30">
                  {selectedModalPackage.category.replace('_', ' ')}
                </span>
                <h3 className="font-heading text-2xl font-bold text-white mt-2">
                  Paket {selectedModalPackage.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedModalPackage(null)}
                className="p-1.5 rounded-full hover:bg-silver-700 text-silver-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 flex-1">
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

              <div className="p-3.5 rounded-xl bg-silver-800 border border-gold/30 text-xs text-silver-200 space-y-1">
                <span className="font-semibold text-gold-light block">Ketentuan Booking:</span>
                <p className="text-silver-300">
                  DP minimal Rp 1.000.000 untuk mengunci tanggal. Pelunasan maksimal H-1 sebelum hari acara.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-silver-700 flex gap-3 justify-end bg-silver-800 rounded-b-2xl">
              <button
                onClick={() => setSelectedModalPackage(null)}
                className="btn-outline !py-2.5 text-xs"
              >
                Tutup
              </button>
              <Link
                href={`/booking?package=${encodeURIComponent(selectedModalPackage.name)}`}
                className="btn-primary !py-2.5 text-xs flex items-center gap-1.5"
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

