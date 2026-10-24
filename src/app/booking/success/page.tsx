'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
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
  const initials = bookingData?.data.initials || '';
  const phone = bookingData?.data.phone || '';
  const eventDate =
    bookingData?.data.event_date_formatted ||
    bookingData?.data.event_date ||
    '-';
  const eventType = bookingData?.data.event_type || 'Wedding';
  const decorationType = bookingData?.data.decoration_type || 'Dalam';
  const packageName = bookingData?.data.package_type || '-';
  const dpAmount = 1000000;
  const address = bookingData?.data.address || '';
  const mapsUrl = bookingData?.data.maps_url || '';
  const notes = bookingData?.data.notes || '';

  const copyBookingCode = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    toast.success('Kode Booking Disalin!', {
      description: bookingCode,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // WhatsApp links from API response or generated from fallback
  const adminLinks = useMemo(() => {
    return ADMIN_WHATSAPP.map((admin) => {
      // Check if API returned direct wa_links
      const apiMatch = bookingData?.wa_links?.find(
        (l) => l.phone.includes(admin.phone) || l.admin.includes(admin.name)
      );
      const url =
        apiMatch?.url ||
        generateWhatsAppLink(admin.phone, {
          code: bookingCode,
          bride_names: brideNames,
          initials,
          phone_number: phone,
          event_date: eventDate,
          event_type: eventType,
          decoration_type: decorationType,
          package_name: packageName,
          dp_amount: dpAmount,
          address,
          maps_url: mapsUrl,
          notes,
        });

      return {
        ...admin,
        url,
      };
    });
  }, [bookingData, bookingCode, brideNames, initials, phone, eventDate, eventType, decorationType, packageName, dpAmount, address, mapsUrl, notes]);

  // Admin 3 adalah admin utama untuk direct booking WhatsApp
  const admin3 = useMemo(() => {
    return adminLinks.find((a) => a.id === 3 || a.phone.includes('6285707752030')) || adminLinks[2];
  }, [adminLinks]);

  const backupAdmins = useMemo(() => {
    return adminLinks.filter((a) => a.id !== 3 && !a.phone.includes('6285707752030'));
  }, [adminLinks]);

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
      <div className="luxury-card rounded-3xl p-6 sm:p-8 text-white border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs text-zinc-400 font-medium">
            KODE BOOKING RESMI ANDA
          </span>
          <div className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-gold-light">
            {bookingCode}
          </div>
          <span className="text-[11px] text-zinc-400">
            Tunjukkan kode ini saat berkonsultasi dengan customer support kami
          </span>
        </div>

        <button
          onClick={copyBookingCode}
          className="min-h-[44px] px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-zinc-300" />
              <span>Salin Kode Booking</span>
            </>
          )}
        </button>
      </div>

      {/* ─── DIRECT WHATSAPP KE ADMIN 3 (UTAMA) ─────────────────── */}
      <div className="luxury-card rounded-3xl p-6 sm:p-8 border border-emerald-500/35 bg-emerald-950/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-white/10">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0 mt-0.5 sm:mt-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  Admin Utama Direct Booking
                </span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Konfirmasi Langsung ke Admin 3
              </h2>
              <p className="text-xs text-zinc-300 mt-0.5">
                Nomor: <span className="font-mono text-white font-bold">{admin3?.label || '0857-0775-2030'}</span> • Penanggung jawab penguncian tanggal & rekening DP
              </p>
            </div>
          </div>

          {admin3 && (
            <a
              href={admin3.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !bg-emerald-500 hover:!bg-emerald-400 !text-black min-h-[48px] !px-6 !py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 shadow-[0_4px_24px_rgba(16,185,129,0.35)] w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Buka Chat WhatsApp Admin 3</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Alternative backup admins */}
        <div className="space-y-2.5 pt-1">
          <span className="text-xs text-zinc-400 font-medium block">
            Admin Cadangan (Alternatif jika Admin 3 sedang slow respons):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {backupAdmins.map((admin) => (
              <a
                key={admin.id}
                href={admin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 transition-all group"
              >
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
                    {admin.name} (Cadangan)
                  </span>
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-white">
                    {admin.label}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-400 group-hover:text-emerald-400 font-medium">
                  <span>Chat</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─── DETAIL SUMMARY CARD ────────────────────────────────── */}
      <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-5 border border-white/15">
        <h3 className="font-heading text-lg font-bold text-white pb-3 border-b border-white/10">
          Rincian Informasi Booking
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-1">
            <span className="text-zinc-400 block">Nama Mempelai:</span>
            <span className="font-bold text-white text-sm block">
              {brideNames}
            </span>
          </div>

          <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-1">
            <span className="text-zinc-400 block">Inisial & No. WhatsApp:</span>
            <span className="font-bold text-white text-sm block">
              {initials ? `${initials} • ` : ''}{phone || '-'}
            </span>
          </div>

          <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-1">
            <span className="text-zinc-400 block">Tanggal Acara:</span>
            <span className="font-bold text-white text-sm block">
              {eventDate}
            </span>
          </div>

          <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-1">
            <span className="text-zinc-400 block">Paket & Penempatan Akad:</span>
            <span className="font-bold text-white text-sm block">
              {packageName} (Akad: {decorationType})
            </span>
          </div>

          <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-1 sm:col-span-2">
            <span className="text-zinc-400 block">DP Booking (Fix / Terkunci):</span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gold-light text-base font-mono block">
                Rp {dpAmount.toLocaleString('id-ID')}
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30">
                Fix Rp 1.000.000
              </span>
            </div>
          </div>

          {address && (
            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-1 sm:col-span-2">
              <span className="text-zinc-400 block">Alamat Lengkap Acara:</span>
              <span className="text-zinc-200 leading-relaxed block font-medium">
                {address}
              </span>
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] text-[11px] text-gold-light hover:text-gold hover:underline inline-flex items-center gap-1 font-semibold pt-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Buka Peta Lokasi Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {notes && (
            <div className="p-3.5 bg-silver-850 rounded-xl border border-silver-700 space-y-1 sm:col-span-2">
              <span className="text-silver-400 block">Catatan Tambahan:</span>
              <span className="text-silver-300 italic block">{notes}</span>
            </div>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-secondary min-h-[44px] text-xs !py-2.5 flex items-center justify-center text-silver-200 w-full sm:w-auto">
            Kembali ke Beranda
          </Link>
          <Link href="/paket" className="btn-outline min-h-[44px] text-xs !py-2.5 flex items-center justify-center text-silver-300 w-full sm:w-auto">
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

