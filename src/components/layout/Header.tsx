'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Phone, Sparkles, ShieldCheck } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/paket', label: 'Paket Dekorasi' },
  { href: '/portfolio', label: 'Portfolio' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:scale-105 group-hover:border-white/40 transition-all shrink-0">
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-zinc-200 group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="font-heading text-lg sm:text-xl lg:text-2xl font-bold tracking-wider text-white block leading-tight">
                PLATINUM
              </span>
              <span className="font-sans text-[9px] lg:text-[10px] tracking-[0.25em] text-zinc-400 font-medium uppercase block">
                Project
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (≥ 1024px) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1.5 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/90 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons (≥ 1024px) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/booking"
              className="btn-primary text-sm !px-6 !py-2.5 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Booking Sekarang</span>
            </Link>
          </div>

          {/* Mobile Actions (< 1024px) */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/booking"
              className="btn-primary text-xs font-semibold !px-4 !py-2 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Booking</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors touch-target"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu & Backdrop Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="lg:hidden fixed inset-0 top-16 bg-black/80 backdrop-blur-md z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in Menu */}
          <div className="lg:hidden relative z-50 border-b border-white/10 bg-[#121214]/95 backdrop-blur-2xl px-4 py-4 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between min-h-[48px] px-4 py-3 rounded-2xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-white/10 text-white font-semibold border border-white/15'
                        : 'text-zinc-300 hover:bg-white/5 active:bg-white/10'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-primary min-h-[48px] !py-3 flex items-center justify-center gap-2 text-sm font-semibold"
              >
                <Calendar className="w-4 h-4" />
                <span>Mulai Booking Sekarang</span>
              </Link>
              <a
                href="https://wa.me/6285700751642"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-secondary min-h-[48px] !py-3 flex items-center justify-center gap-2 text-sm text-zinc-200"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Konsultasi Cepat WhatsApp</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
