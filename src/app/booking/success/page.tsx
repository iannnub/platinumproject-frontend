'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  ExternalLink,
  PackageCheck,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { ADMIN_WHATSAPP, generateWhatsAppLink } from '@/lib/constants';
import { CreateBookingResponse } from '@/types';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingCodeFromUrl = searchParams.get('code') || '';

  const [bookingData, setBookingData] = useState<CreateBookingResponse | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('last_booking');
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as CreateBookingResponse;
          setBookingData(parsed);
        } catch (e) {
          console.error('Failed to parse last booking', e);
        }
      }
    }
  }, []);

  const bookingCode =
    bookingData?.data.booking_code || bookingCodeFromUrl || '#PB2026';
  const brideNames = bookingData?.data.bride_names || 'Mempelai Terhormat';
  const eventDate =
    bookingData?.data.event_date_formatted ||
    bookingData?.data.event_date ||
    '-';
  const packageName = bookingData?.data.package_type || '-';
  const dpAmount = bookingData?.data.dp_amount || 1000000;
  const address = bookingData?.data.address || '';
  const mapsUrl = bookingData?.data.maps_url || '';

  const copyBookingCode = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    toast.success('Kode Booking Disalin!', {
      description: bookingCode,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // WhatsApp links from API response or generated from fallback
  const adminLinks = ADMIN_WHATSAPP.map((admin) => {
    // Check if API returned direct wa_links
    const apiMatch = bookingData?.wa_links?.find(
      (l) => l.phone.includes(admin.phone) || l.admin.includes(admin.name)
    );
    const url =
      apiMatch?.url ||
      generateWhatsAppLink(admin.phone, {
        code: bookingCode,
        bride_names: brideNames,
        event_date: eventDate,
        package_name: packageName,
        dp_amount: dpAmount,
        address,
        maps_url: mapsUrl,
      });

    return {
      ...admin,
      url,
    };
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      {/* ─── SUCCESS CELEBRATION HEADER ─────────────────────────── */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/30 shadow-sm animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
          Pemesanan Berhasil Terdaftar
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white">
          Terima Kasih, {brideNames}!
        </h1>
        <p className="text-xs sm:text-sm text-silver-300 max-w-lg mx-auto leading-relaxed">
          Formulir booking dekorasi Anda telah tersimpan di sistem kami. Langkah selanjutnya adalah konfirmasi via WhatsApp ke salah satu admin kami untuk verifikasi jadwal dan rekening DP.
        </p>
      </div>

      {/* ─── BOOKING CODE BADGE ─────────────────────────────────── */}
      <div className="luxury-card p-6 sm:p-8 bg-gradient-to-r from-silver-950 via-silver-900 to-silver-950 text-white border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs text-silver-400 font-medium">
            KODE BOOKING RESMI ANDA
          </span>
          <div className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-gold-light">
            {bookingCode}
          </div>
          <span className="text-[11px] text-silver-400">
            Tunjukkan kode ini saat berkonsultasi dengan customer support kami
          </span>
        </div>

        <button
          onClick={copyBookingCode}
          className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold flex items-center gap-2 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-silver-300" />
              <span>Salin Kode Booking</span>
            </>
          )}
        </button>
      </div>

      {/* ─── 3 WHATSAPP ADMIN BUTTONS ───────────────────────────── */}
      <div className="luxury-card p-6 sm:p-8 border-gold/40 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-silver-700">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-white">
              Konfirmasi WhatsApp Sekarang
            </h2>
            <p className="text-xs text-silver-400">
              Klik salah satu tombol admin di bawah untuk membuka chat dengan format booking otomatis:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {adminLinks.map((admin) => (
            <a
              key={admin.id}
              href={admin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-900/30 hover:border-emerald-400 hover:shadow-md transition-all group"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  {admin.name}
                </span>
                <span className="text-xs font-mono font-medium text-silver-300 group-hover:text-white">
                  {admin.label}
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-500/30 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Kirim Format WA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ─── DETAIL SUMMARY CARD ────────────────────────────────── */}
      <div className="luxury-card p-6 sm:p-8 space-y-5">
        <h3 className="font-heading text-lg font-bold text-white pb-3 border-b border-silver-700">
          Rincian Informasi Booking
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-silver-850 rounded-xl border border-silver-700 space-y-1">
            <span className="text-silver-400 block">Nama Mempelai:</span>
            <span className="font-bold text-white text-sm block">
              {brideNames}
            </span>
          </div>

          <div className="p-3.5 bg-silver-850 rounded-xl border border-silver-700 space-y-1">
            <span className="text-silver-400 block">Tanggal Acara:</span>
            <span className="font-bold text-white text-sm block">
              {eventDate}
            </span>
          </div>

          <div className="p-3.5 bg-silver-850 rounded-xl border border-silver-700 space-y-1">
            <span className="text-silver-400 block">Paket Pilihan:</span>
            <span className="font-bold text-white text-sm block">
              {packageName}
            </span>
          </div>

          <div className="p-3.5 bg-silver-850 rounded-xl border border-silver-700 space-y-1">
            <span className="text-silver-400 block">Komitmen DP Minimal:</span>
            <span className="font-bold text-gold-light text-sm block">
              Rp {dpAmount.toLocaleString('id-ID')}
            </span>
          </div>

          {address && (
            <div className="p-3.5 bg-silver-850 rounded-xl border border-silver-700 space-y-1 sm:col-span-2">
              <span className="text-silver-400 block">Alamat Acara:</span>
              <span className="text-silver-200 leading-relaxed block">
                {address}
              </span>
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-gold-light hover:text-gold hover:underline inline-flex items-center gap-1 font-semibold pt-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Buka Peta Lokasi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-secondary text-xs !py-2.5 text-silver-200">
            Kembali ke Beranda
          </Link>
          <Link href="/paket" className="btn-outline text-xs !py-2.5 text-silver-300">
            Lihat Paket Lainnya
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <p className="text-xs text-silver-500">Memuat rincian booking...</p>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}

