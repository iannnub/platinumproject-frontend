'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, MessageSquare, Heart, ExternalLink, Sparkles } from 'lucide-react';
import { ADMIN_WHATSAPP, COMPANY_INFO } from '@/lib/constants';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#0D0D0D] text-silver-200 border-t-4 border-gold shadow-2xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center bg-black/50 shadow-gold/30">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold tracking-wider text-gold block leading-tight">
                  PLATINUM PROJECT
                </span>
                <span className="font-sans text-[11px] tracking-widest text-gold-light font-semibold uppercase block">
                  WEDDING DECORATION BALI
                </span>
              </div>
            </div>

            <p className="text-silver-300 text-sm leading-relaxed">
              Mewujudkan dekorasi impian Anda dengan sentuhan elegan Silver & Gold, Artificial Premium Flowers, dan Desain 2D terencana untuk momen sakral terindah.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-silver-900 border border-gold/40 hover:border-gold hover:bg-gold/20 text-gold-light hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="Instagram @platinumproject.deco"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-silver-900 border border-gold/40 hover:border-gold hover:bg-gold/20 text-gold-light hover:text-gold flex items-center justify-center transition-all text-xs font-bold shadow-sm"
                title="TikTok @platinumproject.deco"
              >
                TT
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-heading font-bold tracking-wider text-gold uppercase mb-4">
              NAVIGASI CEPAT
            </h3>
            <ul className="space-y-2.5 text-sm text-silver-300">
              <li>
                <Link href="/" className="hover:text-gold-light transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/paket" className="hover:text-gold-light transition-colors">
                  Katalog 13 Paket Dekorasi
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gold-light transition-colors">
                  Galeri Portfolio Acara
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-gold-light transition-colors">
                  Formulir Booking Online
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-gold/20">
              <span className="text-xs text-silver-400 block mb-1">MUA & Bridal Partner:</span>
              <a
                href={COMPANY_INFO.muaPartner}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold-light hover:text-gold hover:underline flex items-center gap-1.5 font-medium"
              >
                <span>@diahtriswoto.makeup</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Location & Workshop */}
          <div>
            <h3 className="text-sm font-heading font-bold tracking-wider text-gold uppercase mb-4">
              LOKASI WORKSHOP
            </h3>
            <ul className="space-y-3 text-sm text-silver-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed text-silver-200">{COMPANY_INFO.address}</span>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gold-light hover:text-gold hover:underline font-semibold ml-8"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* 3 WhatsApp Admin Contacts */}
          <div>
            <h3 className="text-sm font-heading font-bold tracking-wider text-gold uppercase mb-4">
              HUBUNGI ADMIN KAMI
            </h3>
            <p className="text-xs text-silver-400 mb-3">
              Tersedia 3 customer support untuk respon cepat WhatsApp:
            </p>
            <div className="space-y-2.5">
              {ADMIN_WHATSAPP.map((admin) => (
                <a
                  key={admin.id}
                  href={`https://wa.me/${admin.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white border-2 border-gold hover:border-gold-light shadow-md transition-all text-xs font-semibold group"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
                    <span className="tracking-wide">
                      {admin.name}
                    </span>
                  </div>
                  <span className="font-mono text-white text-[11px] bg-black/30 px-2 py-0.5 rounded">
                    {admin.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gold/30 my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-silver-400">
          <p>© 2026 Platinum Project Bali. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-silver-300">
            <span>Dirancang dengan</span>
            <Heart className="w-3.5 h-3.5 text-rosegold fill-rosegold inline" />
            <span>untuk pernikahan istimewa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
