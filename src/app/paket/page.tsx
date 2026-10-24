'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, CheckCircle2, Calendar, Sparkles, Filter, X, ArrowRight, Loader2, Info, FileText, ExternalLink } from 'lucide-react';
import { api } from '@/lib/api';
import { Package } from '@/types';
import { GOOGLE_DRIVE_RESOURCES, DEFAULT_PACKAGES } from '@/lib/constants';

const categoryLabels: Record<string, string> = {
  all: 'Semua Paket',
  rumah: 'Dekor Rumah',
  layos: 'Tenda Layos',
  gedung_kecil: 'Gedung Kecil',
  gedung_besar: 'Gedung Besar',
  engagement: 'Lamaran / Engagement',
};

function PaketContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [packages, setPackages] = useState<Package[]>(DEFAULT_PACKAGES);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModalPackage, setSelectedModalPackage] = useState<Package | null>(null);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    async function loadPackages() {
      try {
        const data = await api.getPackages();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setPackages(data);
        }
      } catch (err) {
        console.warn('Backend API unavailable, using offline package catalog', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadPackages();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPackages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return packages.filter((pkg) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        pkg.category === selectedCategory ||
        (selectedCategory === 'gedung' &&
          (pkg.category === 'gedung_kecil' || pkg.category === 'gedung_besar'));
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
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-light block">
          Katalog Lengkap
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white">
          Pilihan Paket Dekorasi Pernikahan
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Temukan 13 paket dekorasi yang dirancang khusus untuk mewujudkan konsep pernikahan impian Anda, dari skala rumah intim hingga grand ballroom.
        </p>
      </div>

      {/* ─── GOOGLE DRIVE RESOURCE: DETAIL PAKET PDF ─────────────── */}
      <div className="luxury-card p-5 sm:p-6 border border-white/15 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-gold-light shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-gold-light uppercase tracking-wider">
                Dokumen Resmi PDF
              </span>
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
              {GOOGLE_DRIVE_RESOURCES.detailPaket.title}
            </h2>
            <p className="text-xs text-zinc-400">
              {GOOGLE_DRIVE_RESOURCES.detailPaket.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/portfolio?tab=pdf"
            className="btn-secondary min-h-[44px] !px-4 !py-2 text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto"
          >
            <span>Katalog Reality</span>
          </Link>
          <a
            href={GOOGLE_DRIVE_RESOURCES.detailPaket.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-h-[44px] !px-4 !py-2 text-xs sm:text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>Buka di Google Drive</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ─── FILTER & SEARCH BAR ────────────────────────────────── */}
      <div className="space-y-4">
        {/* Apple Segmented Liquid Glass Pill Track for Categories */}
        <div className="p-2 rounded-full bg-white/[0.06] border border-white/20 backdrop-blur-3xl shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.35),0_12px_36px_rgba(0,0,0,0.5)] inline-flex items-center gap-1.5 overflow-x-auto max-w-full scrollbar-none">
          {Object.entries(categoryLabels).map(([catKey, label]) => {
            const count =
              catKey === 'all'
                ? packages.length
                : catKey === 'gedung'
                ? packages.filter(
                    (p) =>
                      p.category === 'gedung_kecil' ||
                      p.category === 'gedung_besar'
                  ).length
                : packages.filter((p) => p.category === catKey).length;
            const isActive =
              selectedCategory === catKey ||
              (catKey === 'gedung_kecil' && selectedCategory === 'gedung');

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`min-h-[42px] px-4 sm:px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? 'bg-white text-zinc-950 font-bold shadow-[0_4px_24px_rgba(255,255,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.8)] scale-[1.02]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:scale-[1.01]'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isActive
                      ? 'bg-zinc-950/15 text-zinc-950'
                      : 'bg-white/[0.08] text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari fasilitas paket (cth: karpet, lighting, standing mirror)..."
            className="w-full pl-11 pr-10 py-2.5 text-xs sm:text-sm bg-white/[0.04] border border-white/10 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all backdrop-blur-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
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
              className="luxury-card overflow-hidden flex flex-col justify-between"
            >
              {/* Header Box */}
              <div className="p-6 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-light px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10">
                    {pkg.category.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    #{pkg.slug}
                  </span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  {pkg.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                  {pkg.description}
                </p>
              </div>

              {/* Features List */}
              <div className="p-6 flex-1 space-y-3">
                <span className="text-xs font-semibold text-zinc-300 block">
                  Daftar Fasilitas ({pkg.features.length} item):
                </span>
                <ul className="space-y-2">
                  {pkg.features.slice(0, 6).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
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
                  className="w-full btn-secondary min-h-[44px] !py-2 text-xs flex items-center justify-center gap-1 text-zinc-300"
                >
                  <span>Lihat Detail Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── PACKAGE DETAIL MODAL (Apple Liquid Glass Sheet) ─────── */}
      {selectedModalPackage && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="luxury-card rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/20 flex flex-col bg-[#121214]/95 backdrop-blur-2xl">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between bg-white/[0.03] rounded-t-3xl">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-light px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/10">
                  {selectedModalPackage.category.replace('_', ' ')}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-2">
                  Paket {selectedModalPackage.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedModalPackage(null)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 flex-1">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedModalPackage.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
                  Kelengkapan Fasilitas ({selectedModalPackage.features.length} Item):
                </h4>
                <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/10">
                  <ul className="space-y-2.5">
                    {selectedModalPackage.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs">
                <span className="text-zinc-300">File spesifikasi & rincian paket:</span>
                <a
                  href={GOOGLE_DRIVE_RESOURCES.detailPaket.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-light hover:text-white font-medium inline-flex items-center gap-1 min-h-[44px] py-1 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Buka PDF Dokumen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-zinc-300 space-y-1">
                <span className="font-semibold text-white block">Ketentuan Booking:</span>
                <p className="text-zinc-400">
                  DP minimal Rp 1.000.000 untuk mengunci tanggal. Pelunasan maksimal H-1 sebelum hari acara.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-white/10 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end bg-white/[0.03]">
              <button
                onClick={() => setSelectedModalPackage(null)}
                className="min-h-[44px] btn-secondary !py-2.5 text-xs w-full sm:w-auto"
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

