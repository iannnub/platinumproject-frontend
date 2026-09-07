'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  Eye,
  X,
  FileText,
  ExternalLink,
  LayoutGrid,
  Info,
  Download,
  Loader2,
  FolderOpen,
} from 'lucide-react';
import { GOOGLE_DRIVE_RESOURCES } from '@/lib/constants';

interface PortfolioItem {
  id: number;
  title: string;
  category: 'rumah' | 'layos' | 'gedung' | 'photobooth';
  categoryLabel: string;
  location: string;
  palette: string;
  description: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: 'Modern Silver & White Luxury Pelaminan',
    category: 'rumah',
    categoryLabel: 'Dekor Rumah',
    location: 'Bandar, Batang',
    palette: 'Silver, Pure White, Light Gold',
    description: 'Pelaminan 6 meter dengan susunan artificial roses premium, standing chandelier lamp, dan backdrop tekstur elegan.',
  },
  {
    id: 2,
    title: 'Grand Ballroom Romantic Rose Gold',
    category: 'gedung',
    categoryLabel: 'Gedung Ballroom',
    location: 'Batang Convention Hall',
    palette: 'Rose Gold, Champagne, Warm White',
    description: 'Dekorasi panggung 12 meter dengan pilar ukir modern, karpet jalan motif kelopak bunga, dan lighting dramatis.',
  },
  {
    id: 3,
    title: 'VIP Tenda Layos Plafon Serut Silver',
    category: 'layos',
    categoryLabel: 'Tenda Layos',
    location: 'Pekalongan Timur',
    palette: 'Silver 400, Broken White',
    description: 'Tenda layos VIP full kain serut dengan lampu gantung kristal dan pelaminan panggung luas tahan angin dan cuaca.',
  },
  {
    id: 4,
    title: 'Minimalist Garden Engagement Backdrop',
    category: 'photobooth',
    categoryLabel: 'Engagement & Photobooth',
    location: 'Harjosari, Bandar',
    palette: 'Gold, Champagne, Sage Green',
    description: 'Backdrop lamaran lengkung asimetris dengan welcome sign akrilik transparan dan standing mirror photobooth.',
  },
  {
    id: 5,
    title: 'Akad Nikah Lesehan Suci & Intim',
    category: 'rumah',
    categoryLabel: 'Dekor Rumah',
    location: 'Batang Kota',
    palette: 'White & Emerald Accent',
    description: 'Meja akad lesehan kayu jati dengan permadani tebal permata, taburan kelopak melati, dan partisi rotan minimalis.',
  },
  {
    id: 6,
    title: 'Arch Dome Welcome Gate & Gallery',
    category: 'photobooth',
    categoryLabel: 'Engagement & Photobooth',
    location: 'Kecamatan Bandar',
    palette: 'Gold & Ivory',
    description: 'Pintu masuk lengkung dome ganda dengan standing foto mempelai 2D display dan lampu sorot warm spot.',
  },
];

function PortfolioContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'pdf' ? 'pdf' : 'gallery';

  const [activeTab, setActiveTab] = useState<'gallery' | 'pdf'>(initialTab);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = useMemo(
    () =>
      portfolioData.filter(
        (item) => selectedFilter === 'all' || item.category === selectedFilter
      ),
    [selectedFilter]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* ─── HEADER ────────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
          Galeri & Katalog Desain
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white">
          Portfolio Dekorasi Platinum Project
        </h1>
        <p className="text-xs sm:text-sm text-silver-300 max-w-xl mx-auto leading-relaxed">
          Setiap detail dirangkai penuh dedikasi. Jelajahi dokumentasi penataan dekorasi nyata serta katalog desain resmi kami.
        </p>
      </div>

      {/* ─── MAIN VIEW SWITCHER TABS ───────────────────────────── */}
      <div className="flex justify-center">
        <div className="p-1.5 rounded-2xl bg-silver-800 border border-silver-700/80 shadow-md inline-flex items-center gap-1.5 max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'gallery'
                ? 'bg-gold text-white shadow-gold/25'
                : 'text-silver-300 hover:text-white hover:bg-silver-700/60'
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
            <span>Galeri Dokumentasi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pdf')}
            className={`min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'pdf'
                ? 'bg-gold text-white shadow-gold/25'
                : 'text-silver-300 hover:text-white hover:bg-silver-700/60'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Katalog Desain Reality (PDF)</span>
          </button>

          <a
            href={GOOGLE_DRIVE_RESOURCES.projectUpdates.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 text-silver-300 hover:text-white hover:bg-silver-700/60 group"
            title="Buka Folder Google Drive Project Updates Pelanggan"
          >
            <FolderOpen className="w-4 h-4 shrink-0 text-gold group-hover:scale-110 transition-transform" />
            <span>Project Updates Drive</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>

      {/* ─── TAB 1: GOOGLE DRIVE PDF VIEWER ─────────────────────── */}
      {activeTab === 'pdf' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="luxury-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-silver-700">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-gold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-gold uppercase tracking-wider">
                    E-Katalog Visual Resmi
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  Katalog Desain Reality
                </h2>
                <p className="text-xs sm:text-sm text-silver-300 max-w-2xl leading-relaxed">
                  Lihat kompilasi showcase foto asli dan konsep tata panggung pelaminan, tenda layos VIP, serta detail pencahayaan dekorasi kami dalam format dokumen PDF interaktif.
                </p>
              </div>

              <a
                href={GOOGLE_DRIVE_RESOURCES.katalogDesainReality.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary min-h-[44px] !px-5 !py-2.5 text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-gold shrink-0 w-full sm:w-auto"
              >
                <span>Buka di Google Drive</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Google Drive PDF Embed Iframe */}
            <div className="relative w-full h-[550px] sm:h-[680px] lg:h-[800px] rounded-2xl overflow-hidden border border-silver-700 bg-silver-950 shadow-2xl">
              <iframe
                src={GOOGLE_DRIVE_RESOURCES.katalogDesainReality.previewUrl}
                className="w-full h-full border-0 rounded-2xl"
                allow="autoplay"
                title="Katalog Desain Reality PDF Viewer"
              />
            </div>

            {/* Tip Notice Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-silver-850 border border-silver-700/80 text-xs text-silver-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Gunakan kursor atau scroll untuk menelusuri halaman dokumen. Jika pratinjau di atas tidak termuat optimal pada perangkat Anda, silakan klik tombol <span className="text-gold font-semibold">Buka di Google Drive</span> di sudut kanan atas untuk membaca dalam tampilan layar penuh.
                </p>
              </div>
              <a
                href={GOOGLE_DRIVE_RESOURCES.projectUpdates.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold hover:text-gold-light font-semibold shrink-0"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Lihat Project Updates Klien</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: PORTFOLIO GALLERY GRID ──────────────────────── */}
      {activeTab === 'gallery' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { key: 'all', label: 'Semua Karya' },
              { key: 'rumah', label: 'Pelaminan Rumah' },
              { key: 'layos', label: 'Tenda Layos VIP' },
              { key: 'gedung', label: 'Ballroom Gedung' },
              { key: 'photobooth', label: 'Photobooth & Akad' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedFilter(tab.key)}
                className={`min-h-[44px] px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center transition-all ${
                  selectedFilter === tab.key
                    ? 'bg-gold text-white shadow-gold/20'
                    : 'bg-silver-800 text-silver-300 hover:bg-silver-700 border border-silver-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="luxury-card overflow-hidden flex flex-col justify-between group hover:border-gold/50 hover:shadow-gold/15 transition-all"
              >
                {/* Visual Graphic Representation */}
                <div className="relative h-48 bg-silver-850 flex flex-col items-center justify-center p-6 border-b border-silver-700 group-hover:scale-[1.01] transition-transform">
                  <div className="w-14 h-14 rounded-full bg-silver-800 border border-gold/40 flex items-center justify-center text-gold shadow-sm">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-semibold text-silver-300 uppercase tracking-widest mt-3">
                    {item.categoryLabel}
                  </span>
                  <span className="text-xs text-silver-400 font-medium">
                    {item.location}
                  </span>

                  <button
                    onClick={() => setSelectedItem(item)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-[2px] transition-opacity"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Lihat Spesifikasi</span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-silver-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-silver-700 space-y-3">
                    <div className="text-[11px] text-silver-400">
                      <span className="font-semibold text-silver-300">Palet Warna: </span>
                      <span>{item.palette}</span>
                    </div>

                    <Link
                      href={`/booking`}
                      className="w-full btn-primary min-h-[44px] !py-2.5 text-xs flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Request Konsep Seperti Ini</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ─── RESOURCE CALLOUTS: PDF & PROJECT UPDATES FOLDER ───── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: PDF Catalog */}
            <div className="luxury-card p-6 sm:p-7 rounded-2xl border border-gold/30 flex flex-col justify-between gap-5 bg-silver-850/90 shadow-lg">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gold uppercase tracking-wider block mb-1">
                    Dokumen Showcase Resmi
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Katalog Desain Reality (PDF)
                  </h3>
                </div>
                <p className="text-xs text-silver-300 leading-relaxed">
                  Lihat kompilasi showcase foto asli dan konsep tata panggung pelaminan, tenda layos VIP, serta detail pencahayaan dekorasi dalam dokumen PDF interaktif.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('pdf');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="min-h-[44px] btn-outline !py-2.5 !px-5 text-xs font-semibold flex items-center justify-center gap-2 border-gold text-gold hover:bg-gold hover:text-white shrink-0 w-full transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Buka Katalog PDF</span>
              </button>
            </div>

            {/* Card 2: Project Updates Folder */}
            <div className="luxury-card p-6 sm:p-7 rounded-2xl border border-gold/30 flex flex-col justify-between gap-5 bg-gradient-to-br from-silver-900 via-silver-850 to-silver-900 shadow-xl">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gold uppercase tracking-wider block mb-1">
                    Dokumentasi Riil Pelanggan
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Arsip Project Updates Pelanggan
                  </h3>
                </div>
                <p className="text-xs text-silver-300 leading-relaxed">
                  Folder Google Drive dokumentasi hasil riil pengerjaan dekorasi dari wedding sebelumnya, terorganisir rapi per tahun, bulan, dan nama mempelai.
                </p>
              </div>
              <a
                href={GOOGLE_DRIVE_RESOURCES.projectUpdates.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] btn-primary !py-2.5 !px-5 text-xs font-semibold flex items-center justify-center gap-2 shadow-gold shrink-0 w-full"
              >
                <FolderOpen className="w-4 h-4" />
                <span>Buka Folder Project Updates</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL DETAIL ITEM ─────────────────────────────────── */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-silver-900 rounded-t-2xl sm:rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 sm:p-8 space-y-6 shadow-2xl border border-silver-700 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-silver-800 text-silver-400 hover:text-white"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gold px-2 py-0.5 rounded bg-silver-800 border border-gold/30 inline-block mb-2">
                {selectedItem.categoryLabel}
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                {selectedItem.title}
              </h3>
              <span className="text-xs text-silver-400 block mt-1">
                Lokasi: {selectedItem.location}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-silver-300 leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="p-3.5 bg-silver-800 rounded-xl border border-silver-700 text-xs space-y-1">
              <span className="font-semibold text-silver-200 block">Tema & Palet:</span>
              <span className="text-silver-300">{selectedItem.palette}</span>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="min-h-[44px] btn-outline !py-2.5 text-xs w-full sm:w-auto"
              >
                Tutup
              </button>
              <Link
                href="/booking"
                className="min-h-[44px] btn-primary !py-2.5 text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Konsultasi Konsep Ini</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <p className="text-xs text-silver-500">Memuat galeri portfolio...</p>
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
