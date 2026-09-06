'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Phone, Sparkles } from 'lucide-react';

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
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-silver-800 shadow-gold/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="font-heading text-xl font-bold tracking-wider text-white block leading-tight">
                PLATINUM
              </span>
              <span className="font-sans text-[10px] tracking-[0.25em] text-gold font-semibold uppercase block">
                Project
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? 'text-gold font-semibold'
                      : 'text-silver-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/booking"
              className="btn-primary text-sm !px-5 !py-2.5 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Booking Sekarang</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/booking"
              className="bg-gold text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              Booking
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-silver-300 hover:text-white hover:bg-silver-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-silver-800 bg-silver-900/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-silver-800 text-gold font-semibold'
                      : 'text-silver-200 hover:bg-silver-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-silver-800 space-y-2">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-primary !py-3 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Booking Sekarang</span>
            </Link>
            <a
              href="https://wa.me/6285700751642"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-secondary !py-2.5 flex items-center justify-center gap-2 text-sm text-silver-300"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Konsultasi Cepat WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
