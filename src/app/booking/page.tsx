'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Calendar,
  User,
  Phone,
  Clock,
  Sparkles,
  MapPin,
  FileText,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  HelpCircle,
} from 'lucide-react';
import { bookingSchema, BookingFormValues } from '@/lib/validations/booking';
import { api } from '@/lib/api';
import { Package } from '@/types';

// Dynamic import Leaflet LocationPicker to avoid Next.js SSR window error
const LocationPicker = dynamic(
  () => import('@/components/maps/LocationPicker'),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-3">
        <div className="h-10 w-full bg-silver-800/90 rounded-lg border border-silver-700 animate-pulse" />
        <div className="w-full h-[360px] md:h-[400px] bg-silver-850 rounded-xl border border-silver-700 animate-pulse flex flex-col items-center justify-center text-silver-400 gap-2">
          <MapPin className="w-8 h-8 text-gold animate-bounce" />
          <span className="text-xs text-silver-400 font-medium">Memuat peta lokasi...</span>
        </div>
      </div>
    ),
  }
);

function BookingFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPackage = searchParams.get('package') || '';

  const [packages, setPackages] = useState<Package[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Calculate default min date: today + 7 days
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);
  const minDateString = minDate.toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema) as any,
    defaultValues: {
      bride_names: '',
      initials: '',
      phone: '',
      event_date: '',
      event_type: 'Wedding',
      decoration_type: 'Dalam',
      package_type: preselectedPackage || '',
      dp_amount: 1000000,
      lat: -7.0252,
      lng: 109.8285,
      address: '',
      notes: '',
    },
  });

  const selectedPackageName = watch('package_type');
  const selectedDpAmount = watch('dp_amount');
  const selectedDate = watch('event_date');
  const currentAddress = watch('address');

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data = await api.getPackages();
        setPackages(data);
        if (preselectedPackage && data.some((p) => p.name === preselectedPackage)) {
          setValue('package_type', preselectedPackage);
        } else if (data.length > 0 && !selectedPackageName) {
          setValue('package_type', data[0].name);
        }
      } catch (err) {
        console.error('Failed to fetch packages', err);
      } finally {
        setLoadingPackages(false);
      }
    }
    fetchPackages();
  }, [preselectedPackage, setValue, selectedPackageName]);

  const handleLocationChange = (lat: number, lng: number, address: string) => {
    setValue('lat', lat, { shouldValidate: true });
    setValue('lng', lng, { shouldValidate: true });
    if (address && !currentAddress) {
      setValue('address', address, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: BookingFormValues) => {
    setSubmitting(true);
    try {
      const cleanPhone = data.phone.replace(/[\s\-]/g, '');
      const response = await api.createBooking({
        ...data,
        phone: cleanPhone,
        dp_amount: 1000000,
        notes: data.notes || '',
      });

      toast.success('Booking Berhasil Dibuat!', {
        description: 'Silakan konfirmasi ke admin via WhatsApp.',
      });

      // Store in sessionStorage for success page recovery
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('last_booking', JSON.stringify(response));
      }

      router.push(`/booking/success?code=${encodeURIComponent(response.data.booking_code)}`);
    } catch (err: any) {
      toast.error('Gagal Mengirim Booking', {
        description: err.message || 'Terjadi kesalahan pada server. Coba lagi.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onInvalid = (formErrors: any) => {
    const errorKeys = Object.keys(formErrors);
    if (errorKeys.length > 0) {
      const firstField = errorKeys[0];
      const firstError = formErrors[firstField];
      toast.error('Formulir Belum Lengkap', {
        description: firstError?.message || 'Mohon periksa kolom yang ditandai merah.',
      });
      const el = document.querySelector(`[name="${firstField}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const selectedPackageObj = packages.find((p) => p.name === selectedPackageName);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* ─── PAGE HEADER ────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
          Pemesanan Online
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Formulir Booking Dekorasi
        </h1>
        <p className="text-xs sm:text-sm text-silver-300 max-w-xl mx-auto">
          Lengkapi data acara Anda di bawah ini. Setelah formulir dikirim, Anda dapat langsung mengonfirmasi dan terhubung ke 3 nomor admin WhatsApp kami.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit as any, onInvalid)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ─── LEFT COLUMN: FORM FIELDS ───────────────────────── */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Data Mempelai */}
            <div className="luxury-card p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-silver-700">
                <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-gold">
                  <User className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl font-bold text-white">
                  1. Informasi Mempelai
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nama Mempelai */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-silver-200 flex items-center gap-1">
                    <span>Nama Lengkap Mempelai</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('bride_names')}
                    placeholder="Contoh: Sarah Angelina & John Wicaksono"
                    className="w-full px-4 py-3 min-h-[48px] text-sm bg-silver-800 border border-silver-700 rounded-lg text-white placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                  />
                  {errors.bride_names && (
                    <p className="text-xs text-red-400">{errors.bride_names.message}</p>
                  )}
                  <p className="text-[11px] text-silver-400">
                    Masukkan nama lengkap kedua mempelai (minimal 5 karakter)
                  </p>
                </div>

                {/* Inisial Nama */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-silver-200 flex items-center gap-1">
                    <span>Inisial Nama</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('initials')}
                    placeholder="Contoh: S & J"
                    className="w-full px-4 py-3 min-h-[48px] text-sm bg-silver-800 border border-silver-700 rounded-lg text-white placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all uppercase"
                  />
                  {errors.initials && (
                    <p className="text-xs text-red-400">{errors.initials.message}</p>
                  )}
                  <p className="text-[11px] text-silver-400">
                    Untuk tulisan inisial pada dekorasi pelaminan (maks. 10 karakter)
                  </p>
                </div>

                {/* Nomor WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-silver-200 flex items-center gap-1">
                    <span>Nomor WhatsApp Aktif</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-3 min-h-[48px] text-sm bg-silver-800 border border-silver-700 rounded-lg text-white placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400">{errors.phone.message}</p>
                  )}
                  <p className="text-[11px] text-silver-400">
                    Gunakan awalan 08 atau +62 untuk konfirmasi pemesanan
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Detail Acara */}
            <div className="luxury-card p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-silver-700">
                <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-gold">
                  <Calendar className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl font-bold text-white">
                  2. Detail Acara & Paket
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Tanggal Acara */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-silver-200 flex items-center gap-1">
                    <span>Tanggal Hari H Acara</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    min={minDateString}
                    {...register('event_date')}
                    className="w-full px-4 py-3 min-h-[48px] text-sm bg-silver-800 border border-silver-700 rounded-lg text-white placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                  />
                  {errors.event_date && (
                    <p className="text-xs text-red-400">{errors.event_date.message}</p>
                  )}
                  <p className="text-[11px] text-silver-400">
                    Minimal H+7 hari dari sekarang untuk persiapan logistik
                  </p>
                </div>

                {/* Jenis Acara */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-silver-200 flex items-center gap-1">
                    <span>Jenis Acara</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('event_type')}
                    className="w-full px-4 py-3 min-h-[48px] text-sm bg-silver-800 border border-silver-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                  >
                    <option value="Wedding" className="bg-silver-900 text-white">Pernikahan (Wedding)</option>
                    <option value="Birthday" className="bg-silver-900 text-white">Ulang Tahun (Birthday)</option>
                    <option value="Corporate" className="bg-silver-900 text-white">Acara Perusahaan (Corporate)</option>
                    <option value="Other" className="bg-silver-900 text-white">Lainnya (Other)</option>
                  </select>
                  {errors.event_type && (
                    <p className="text-xs text-red-400">{errors.event_type.message}</p>
                  )}
                </div>

                {/* Pilihan Paket */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-silver-200 flex items-center gap-1">
                    <span>Pilihan Paket Dekorasi</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('package_type')}
                    disabled={loadingPackages}
                    className="w-full px-4 py-3 min-h-[48px] text-sm bg-silver-800 border border-silver-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all disabled:bg-silver-900"
                  >
                    <option value="" className="bg-silver-900 text-white">Pilih Paket Dekorasi</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.name} className="bg-silver-900 text-white">
                        {pkg.name} ({pkg.category.replace('_', ' ')})
                      </option>
                    ))}
                  </select>
                  {errors.package_type && (
                    <p className="text-xs text-red-400">{errors.package_type.message}</p>
                  )}
                </div>

                {/* Dekor Akad: Dalam / Luar */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-semibold text-silver-200 block">
                    Penempatan Dekorasi Akad / Ijab
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <label className="flex items-center gap-3 p-3.5 border border-silver-700 rounded-xl cursor-pointer bg-silver-800/80 hover:bg-silver-700/80 has-[:checked]:border-gold has-[:checked]:bg-gold/15 transition-all min-h-[52px]">
                      <input
                        type="radio"
                        value="Dalam"
                        {...register('decoration_type')}
                        className="w-4 h-4 text-gold focus:ring-gold shrink-0"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Dekor Akad Dalam
                        </span>
                        <span className="text-[11px] text-silver-400">
                          Indoor / Di dalam ruangan
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3.5 border border-silver-700 rounded-xl cursor-pointer bg-silver-800/80 hover:bg-silver-700/80 has-[:checked]:border-gold has-[:checked]:bg-gold/15 transition-all min-h-[52px]">
                      <input
                        type="radio"
                        value="Luar"
                        {...register('decoration_type')}
                        className="w-4 h-4 text-gold focus:ring-gold shrink-0"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Dekor Akad Luar
                        </span>
                        <span className="text-[11px] text-silver-400">
                          Outdoor / Halaman tenda
                        </span>
                      </div>
                    </label>
                  </div>
                  {errors.decoration_type && (
                    <p className="text-xs text-red-400">{errors.decoration_type.message}</p>
                  )}
                </div>

                {/* Komitmen DP Minimal */}
                <div className="space-y-1.5 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-silver-200 flex items-center gap-1">
                      <span>Komitmen DP Minimal (Rp)</span>
                      <span className="text-red-400">*</span>
                    </label>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30 px-2 py-0.5 rounded-full">
                      Fix Terkunci
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gold">
                      Rp
                    </span>
                    <input
                      type="text"
                      readOnly
                      value="1.000.000 (Fix)"
                      className="w-full pl-12 pr-4 py-3 min-h-[48px] text-sm bg-silver-900/90 border border-silver-700 rounded-lg text-gold font-bold cursor-not-allowed select-none focus:outline-none"
                    />
                    <input type="hidden" {...register('dp_amount')} value={1000000} />
                  </div>
                  <p className="text-[11px] text-silver-400">
                    Standar komitmen DP terkunci Rp 1.000.000 untuk penguncian tanggal dan penjadwalan survei lokasi.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Lokasi Peta Leaflet */}
            <div className="luxury-card p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-silver-700">
                <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-gold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">
                    3. Lokasi Acara (Peta Interaktif Leaflet)
                  </h2>
                  <p className="text-xs text-silver-400 mt-0.5">
                    Tentukan titik lokasi acara Anda dengan mengeklik atau menggeser pin marker.
                  </p>
                </div>
              </div>

              {/* Map Component */}
              <div className="space-y-3">
                <LocationPicker
                  onLocationChange={handleLocationChange}
                  initialAddress={currentAddress}
                />
                {(errors.lat || errors.lng) && (
                  <p className="text-xs text-red-400">
                    Silakan tentukan titik lokasi acara pada peta.
                  </p>
                )}
              </div>

              {/* Detail Alamat Textarea */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-silver-200 flex items-center gap-1">
                  <span>Alamat Lengkap Acara</span>
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  {...register('address')}
                  placeholder="Contoh: Jl. Diponegoro No. 88, RT 02/04 (patokan dekat masjid/lapangan)"
                  className="w-full px-4 py-3 min-h-[88px] text-sm bg-silver-800 border border-silver-700 rounded-lg text-white placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all resize-none"
                />
                {errors.address && (
                  <p className="text-xs text-red-400">{errors.address.message}</p>
                )}
                <p className="text-[11px] text-silver-400">
                  Alamat dapat terisi otomatis dari klik peta, Anda dapat melengkapinya dengan patokan gang/rumah.
                </p>
              </div>

              {/* Catatan Tambahan */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-silver-200 block">
                  Catatan Khusus / Permintaan Tema Warna (Opsional)
                </label>
                <textarea
                  rows={2}
                  {...register('notes')}
                  placeholder="Contoh: Tema warna dominan White & Rose Gold, akad jam 08.00 WIB..."
                  className="w-full px-4 py-3 min-h-[64px] text-sm bg-silver-800 border border-silver-700 rounded-lg text-white placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: STICKY BOOKING SUMMARY ───────────── */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="luxury-card p-5 sm:p-6 border-gold/40 bg-silver-800/95 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-silver-700">
                <h3 className="font-heading text-lg font-bold text-white">
                  Ringkasan Booking
                </h3>
                <span className="text-[11px] font-semibold text-gold-light px-2 py-0.5 rounded bg-gold/15 border border-gold/30">
                  Draft
                </span>
              </div>

              {/* Package Detail */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-silver-700/60">
                  <span className="text-silver-400">Pilihan Paket:</span>
                  <span className="font-bold text-white">
                    {selectedPackageName || '-'}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-silver-700/60">
                  <span className="text-silver-400">Tanggal Acara:</span>
                  <span className="font-medium text-white">
                    {selectedDate || 'Belum dipilih'}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-silver-700/60">
                  <span className="text-silver-400">Penempatan Akad:</span>
                  <span className="font-medium text-white">
                    {watch('decoration_type')}
                  </span>
                </div>

                <div className="pt-2 flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-silver-300 block">DP Booking:</span>
                    <span className="text-[10px] text-emerald-400 font-medium">Fix / Terkunci</span>
                  </div>
                  <span className="font-mono text-base font-bold text-gold-light">
                    Rp 1.000.000
                  </span>
                </div>
              </div>

              {/* Info Box */}
              <div className="p-3.5 rounded-xl bg-silver-850 border border-silver-700 text-xs text-silver-300 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Free Konsultasi & Survei Lokasi</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Rancangan Visual 2D Presisi</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Pelunasan maksimal H-1 sebelum Hari H</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary min-h-[48px] !py-3.5 text-sm flex items-center justify-center gap-2 shadow-gold"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memproses Booking...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Kirim & Konfirmasi via WhatsApp</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-silver-400">
                Data Anda aman dan langsung tersambung ke database & customer support Platinum Project.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <p className="text-xs text-silver-500">Memuat formulir booking...</p>
        </div>
      }
    >
      <BookingFormContent />
    </Suspense>
  );
}

