'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { ADMIN_WHATSAPP, COMPANY_INFO } from '@/lib/constants';

function FaWhatsapp({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

function FaInstagram({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

function FaTiktok({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
    </svg>
  );
}

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
                  WEDDING DECORATION
                </span>
              </div>
            </div>

            <p className="text-silver-300 text-sm leading-relaxed">
              Mewujudkan dekorasi impian Anda dengan sentuhan elegan Silver & Gold, Artificial Premium Flowers, dan Desain 2D terencana untuk momen sakral terindah.
            </p>

            {/* Quick Icon Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-silver-900 border border-gold/40 hover:border-gold hover:bg-gold/20 text-gold-light hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="Instagram Utama @platinumproject.deco"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.instagramCatalogue}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-silver-900 border border-gold/40 hover:border-gold hover:bg-gold/20 text-gold-light hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="Instagram Katalog @platinumproject.catalogue"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.instagramHouseOfPlatinum}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-silver-900 border border-gold/40 hover:border-gold hover:bg-gold/20 text-gold-light hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="Instagram @houseof_platinum"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-silver-900 border border-gold/40 hover:border-gold hover:bg-gold/20 text-gold-light hover:text-gold flex items-center justify-center transition-all shadow-sm"
                title="TikTok @platinumproject.deco"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Social Media & Partnership Links */}
          <div>
            <h3 className="text-sm font-heading font-bold tracking-wider text-gold uppercase mb-4">
              MEDIA SOSIAL RESMI
            </h3>
            <ul className="space-y-3 text-xs text-silver-300">
              <li>
                <a
                  href={COMPANY_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors flex items-center gap-2 group"
                >
                  <FaInstagram className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">IG Utama:</span>
                  <span className="text-silver-200 group-hover:text-gold-light">@platinumproject.deco</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.instagramCatalogue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors flex items-center gap-2 group"
                >
                  <FaInstagram className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">IG Katalog:</span>
                  <span className="text-silver-200 group-hover:text-gold-light">@platinumproject.catalogue</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.instagramHouseOfPlatinum}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors flex items-center gap-2 group"
                >
                  <FaInstagram className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">IG Galeri:</span>
                  <span className="text-silver-200 group-hover:text-gold-light">@houseof_platinum</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors flex items-center gap-2 group"
                >
                  <FaTiktok className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">TikTok:</span>
                  <span className="text-silver-200 group-hover:text-gold-light">@platinumproject.deco</span>
                </a>
              </li>
              <li className="pt-2 border-t border-gold/20">
                <a
                  href={COMPANY_INFO.muaPartner}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors flex items-center gap-2 group"
                >
                  <FaInstagram className="w-4 h-4 text-rosegold shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-rosegold">MUA Partner:</span>
                  <span className="text-silver-200 group-hover:text-gold-light">@diahtriswoto.makeup</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Workshop */}
          <div>
            <h3 className="text-sm font-heading font-bold tracking-wider text-gold uppercase mb-4">
              LOKASI WORKSHOP
            </h3>
            <ul className="space-y-3 text-sm text-silver-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed text-silver-200 text-xs">{COMPANY_INFO.address}</span>
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

            <div className="mt-6 pt-4 border-t border-gold/20">
              <span className="text-xs font-heading font-semibold text-gold uppercase tracking-wider block mb-2">
                Navigasi Cepat:
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-silver-300">
                <Link href="/" className="hover:text-gold-light transition-colors">Beranda</Link>
                <Link href="/paket" className="hover:text-gold-light transition-colors">Paket</Link>
                <Link href="/portfolio" className="hover:text-gold-light transition-colors">Portfolio</Link>
                <Link href="/booking" className="hover:text-gold-light transition-colors">Booking</Link>
              </div>
            </div>
          </div>

          {/* 4 WhatsApp Admin Contacts with FontAwesome WhatsApp Icon */}
          <div>
            <h3 className="text-sm font-heading font-bold tracking-wider text-gold uppercase mb-4">
              HUBUNGI ADMIN KAMI
            </h3>
            <p className="text-xs text-silver-400 mb-3">
              Tersedia 4 customer support untuk respon cepat WhatsApp:
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
                  <div className="flex items-center gap-2.5">
                    <FaWhatsapp className="w-5 h-5 fill-white shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="tracking-wide font-bold">
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

        {/* Bottom Bar with iannnub Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-silver-400">
          <p>© 2026 Platinum Project. All rights reserved.</p>
          <div className="flex items-center gap-2 text-silver-300">
            <span>
              Created by{' '}
              <a
                href="https://github.com/iannnub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-light hover:text-gold font-bold underline underline-offset-2 transition-colors"
              >
                iannnub
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
