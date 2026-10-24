'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, MessageCircle, Calendar, X, ChevronUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { ADMIN_WHATSAPP } from '@/lib/constants';

export default function DynamicIsland() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      aria-label="Apple Dynamic Island Quick Access"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      {/* Morphing Capsule Container */}
      <div
        className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded
            ? 'w-[92vw] max-w-md p-5 rounded-[2rem] bg-[#0C0C0E]/90 border border-white/25 shadow-[0_24px_64px_rgba(0,0,0,0.85),inset_0_1.5px_1.5px_rgba(255,255,255,0.45)] backdrop-blur-3xl'
            : 'w-auto px-4 py-2.5 rounded-full bg-black/80 border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-2xl hover:border-white/40 hover:scale-[1.03] active:scale-[0.97]'
        }`}
      >
        {!isExpanded ? (
          /* ─── COLLAPSED STATE (Apple Capsule) ─────────────────── */
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-3 text-xs text-white select-none focus:outline-none"
            aria-expanded="false"
            aria-label="Buka iPhone Dynamic Island Concierge"
          >
            {/* Live Indicator Dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>

            <span className="font-medium tracking-wide flex items-center gap-1.5">
              <span className="font-semibold text-white">3 Admin Online</span>
              <span className="text-zinc-400 hidden sm:inline">• Tanya Konsep & Jadwal</span>
            </span>

            <div className="flex items-center gap-1 pl-2 border-l border-white/15 text-zinc-300 font-semibold text-[11px]">
              <span>Konsultasi</span>
              <ChevronUp className="w-3.5 h-3.5 text-zinc-400 animate-bounce" />
            </div>
          </button>
        ) : (
          /* ─── EXPANDED STATE (Apple Liquid Card) ─────────────── */
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    Platinum Concierge
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    Apple Dynamic Island • Respon Cepat
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="w-7 h-7 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                aria-label="Tutup Dynamic Island"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Admin Buttons Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
                Pilih Konsultan WhatsApp:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {ADMIN_WHATSAPP.map((admin, idx) => {
                  const isPrimary = admin.phone === '6285707752030';
                  const role =
                    isPrimary
                      ? 'Booking Utama'
                      : idx === 0
                      ? 'Jadwal Acara'
                      : 'Spesifikasi';
                  const text = encodeURIComponent(
                    `Halo ${admin.name} Platinum Project, saya ingin konsultasi mengenai booking dekorasi pernikahan.`
                  );

                  return (
                    <a
                      key={admin.id}
                      href={`https://wa.me/${admin.phone}?text=${text}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-2xl transition-all flex flex-col justify-between group ${
                        isPrimary
                          ? 'bg-emerald-950/30 border border-emerald-500/40 hover:bg-emerald-900/40'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                        <span className="text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                          {admin.name}
                        </span>
                      </div>
                      <span className={`text-[10px] ${isPrimary ? 'text-emerald-400 font-semibold' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                        {role}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-2 flex items-center gap-2">
              <Link
                href="/booking"
                onClick={() => setIsExpanded(false)}
                className="flex-1 btn-primary !py-2.5 text-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Isi Form Booking Online</span>
              </Link>
              <Link
                href="/paket"
                onClick={() => setIsExpanded(false)}
                className="btn-secondary !py-2.5 !px-3 text-xs flex items-center justify-center gap-1"
              >
                <span>Lihat Paket</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
