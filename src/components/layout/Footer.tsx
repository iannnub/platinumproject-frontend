'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, MessageSquare, Heart, ExternalLink, Sparkles } from 'lucide-react';
import { ADMIN_WHATSAPP, COMPANY_INFO } from '@/lib/constants';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="bg-silver-900 text-white border-t border-silver-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-gold/50 flex items-center justify-center bg-silver-800">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="font-heading text-lg font-bold tracking-wider text-white block">
                  PLATINUM PROJECT
                </span>
                <span className="font-sans text-[10px] tracking-widest text-gold font-medium uppercase block">
                  Wedding Decoration Bali
                </span>
              </div>
            </div>
            <p className="text-silver-400 text-sm leading-relaxed">
              Mewujudkan dekorasi impian Anda dengan sentuhan elegan Silver & Gold, Artificial Premium Flowers, dan Desain 2D terencana untuk momen terindah.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-silver-800 hover:bg-gold/20 hover:text-gold flex items-center justify-center text-silver-300 transition-colors"
                title="Instagram @platinumproject.deco"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href={COMPANY_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-silver-800 hover:bg-gold/20 hover:text-gold flex items-center justify-center text-silver-300 transition-colors text-xs font-bold"
                title="TikTok @platinumproject.deco"
              >
                TT
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gold uppercase mb-4">
              Navigasi Cepat
            </h3>
            <ul className="space-y-2.5 text-sm text-silver-300">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/paket" className="hover:text-gold transition-colors">
                  Katalog 13 Paket Dekorasi
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gold transition-colors">
                  Galeri Portfolio Acara
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-gold transition-colors">
                  Formulir Booking Online
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-silver-800">
              <span className="text-xs text-silver-400 block mb-1">MUA & Bridal Partner:</span>
              <a
                href={COMPANY_INFO.muaPartner}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold hover:underline flex items-center gap-1.5"
              >
                <span>@diahtriswoto.makeup</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Location & Workshop */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gold uppercase mb-4">
              Lokasi Workshop
            </h3>
            <ul className="space-y-3 text-sm text-silver-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline font-medium ml-8"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* 3 WhatsApp Admin Contacts */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gold uppercase mb-4">
              Hubungi Admin Kami
            </h3>
            <p className="text-xs text-silver-400 mb-3">
              Tersedia 3 customer support untuk respon cepat WhatsApp:
            </p>
            <div className="space-y-2">
              {ADMIN_WHATSAPP.map((admin) => (
                <a
                  key={admin.id}
                  href={`https://wa.me/${admin.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-silver-800/80 hover:bg-silver-800 border border-silver-700/60 hover:border-gold/50 transition-all text-xs group"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-silver-200 font-medium group-hover:text-white">
                      {admin.name}
                    </span>
                  </div>
                  <span className="text-silver-400 font-mono group-hover:text-gold transition-colors">
                    {admin.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-silver-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-silver-500">
          <p>© 2026 Platinum Project Bali. All rights reserved.</p>
          <div className="flex items-center gap-1 text-silver-400">
            <span>Dirancang dengan</span>
            <Heart className="w-3.5 h-3.5 text-rosegold fill-rosegold inline" />
            <span>untuk pernikahan istimewa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
