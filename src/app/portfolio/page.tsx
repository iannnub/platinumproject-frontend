'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, ArrowRight, Eye, X, Filter } from 'lucide-react';

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
    location: 'Denpasar Timur, Bali',
    palette: 'Silver, Pure White, Light Gold',
    description: 'Pelaminan 6 meter dengan susunan artificial roses premium, standing chandelier lamp, dan backdrop tekstur elegan.',
  },
  {
    id: 2,
    title: 'Grand Ballroom Romantic Rose Gold',
    category: 'gedung',
    categoryLabel: 'Gedung Ballroom',
    location: 'Nusa Dua Convention Hall, Bali',
    palette: 'Rose Gold, Champagne, Warm White',
    description: 'Dekorasi panggung 12 meter dengan pilar ukir modern, karpet jalan motif kelopak bunga, dan lighting dramatis.',
  },
  {
    id: 3,
    title: 'VIP Tenda Layos Plafon Serut Silver',
    category: 'layos',
    categoryLabel: 'Tenda Layos',
    location: 'Gianyar, Bali',
    palette: 'Silver 400, Broken White',
    description: 'Tenda layos VIP full kain serut dengan lampu gantung kristal dan pelaminan panggung luas tahan angin dan cuaca.',
  },
  {
    id: 4,
    title: 'Minimalist Garden Engagement Backdrop',
    category: 'photobooth',
    categoryLabel: 'Engagement & Photobooth',
    location: 'Sanur, Bali',
    palette: 'Gold, Champagne, Sage Green',
    description: 'Backdrop lamaran lengkung asimetris dengan welcome sign akrilik transparan dan standing mirror photobooth.',
  },
  {
    id: 5,
    title: 'Akad Nikah Lesehan Suci & Intim',
    category: 'rumah',
    categoryLabel: 'Dekor Rumah',
    location: 'Kuta Utara, Badung',
    palette: 'White & Emerald Accent',
    description: 'Meja akad lesehan kayu jati dengan permadani tebal permata, taburan kelopak melati, dan partisi rotan minimalis.',
  },
  {
    id: 6,
    title: 'Arch Dome Welcome Gate & Gallery',
    category: 'photobooth',
    categoryLabel: 'Engagement & Photobooth',
    location: 'Jimbaran, Bali',
    palette: 'Gold & Ivory',
    description: 'Pintu masuk lengkung dome ganda dengan standing foto mempelai 2D display dan lampu sorot warm spot.',
  },
];

export default function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = portfolioData.filter(
    (item) => selectedFilter === 'all' || item.category === selectedFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* ─── HEADER ────────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
          Galeri Karya Kami
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white">
          Portfolio Dekorasi Platinum Project
        </h1>
        <p className="text-xs sm:text-sm text-silver-300 max-w-xl mx-auto">
          Setiap detail dirangkai penuh dedikasi. Jelajahi dokumentasi penataan dekorasi pernikahan nyata di berbagai venue pilihan.
        </p>
      </div>

      {/* ─── CATEGORY FILTER ───────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedFilter === tab.key
                ? 'bg-gold text-white shadow-gold/20'
                : 'bg-silver-800 text-silver-300 hover:bg-silver-700 border border-silver-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── PORTFOLIO GRID ────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="w-full btn-primary !py-2 text-xs flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Konsep Seperti Ini</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── MODAL DETAIL ITEM ─────────────────────────────────── */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-silver-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-silver-700 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-silver-800 text-silver-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gold px-2 py-0.5 rounded bg-silver-800 border border-gold/30 inline-block mb-2">
                {selectedItem.categoryLabel}
              </span>
              <h3 className="font-heading text-2xl font-bold text-white">
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

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="btn-outline !py-2.5 text-xs"
              >
                Tutup
              </button>
              <Link
                href="/booking"
                className="btn-primary !py-2.5 text-xs flex items-center gap-1.5"
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
