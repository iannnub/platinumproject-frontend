import Link from 'next/link';
import { Sparkles, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Palette, MapPin, Star, Heart, Phone } from 'lucide-react';
import { api } from '@/lib/api';
import { Package } from '@/types';
import { DEFAULT_PACKAGES } from '@/lib/constants';

async function getFeaturedPackages(): Promise<Package[]> {
  try {
    const packages = await api.getPackages();
    if (Array.isArray(packages) && packages.length > 0) {
      return packages.slice(0, 3);
    }
    return DEFAULT_PACKAGES.slice(0, 3);
  } catch {
    return DEFAULT_PACKAGES.slice(0, 3);
  }
}

export default async function HomePage() {
  const featuredPackages = await getFeaturedPackages();

  const categories = [
    { title: 'Dekor Rumah', desc: 'Cocok untuk akad & resepsi intim halaman rumah', count: '7 Pilihan Paket', link: '/paket?cat=rumah' },
    { title: 'Tenda Layos VIP', desc: 'Dekorasi plafon layos eksklusif & pelaminan outdoor', count: '2 Pilihan Paket', link: '/paket?cat=layos' },
    { title: 'Gedung / Aula Kecil', desc: 'Penataan venue indoor compact & estetika rapi', count: '1 Pilihan Paket', link: '/paket?cat=gedung_kecil' },
    { title: 'Grand Ballroom Gedung', desc: 'Pelaminan luas megah panggung 12-15 meter', count: '1 Pilihan Paket', link: '/paket?cat=gedung_besar' },
    { title: 'Engagement & Akad', desc: 'Backdrop lamaran & akad simpel minimalis', count: '2 Pilihan Paket', link: '/paket?cat=engagement' },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* ─── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge (Apple Morphing Liquid Glass) */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.08] border border-white/25 backdrop-blur-2xl shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.45),0_8px_24px_rgba(0,0,0,0.4)] text-xs font-semibold text-zinc-200 tracking-wide animate-morph-badge">
              <Sparkles className="w-3.5 h-3.5 text-gold-light" />
              <span>Wedding Decoration Specialist</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Wujudkan Dekorasi Pernikahan Impian Bersama{' '}
              <span className="text-gold-light">
                Platinum Project
              </span>
            </h1>

            {/* Subheading */}
            <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Kombinasi estetika Silver, Platinum Titanium, dan Rose Gold dengan artificial flowers premium serta konsep desain 2D terencana. Setiap sudut pelaminan dirancang presisi untuk momen sakral Anda.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto btn-primary min-h-[48px] !px-8 !py-3.5 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Booking Tanggal Acara</span>
              </Link>
              <Link
                href="/paket"
                className="w-full sm:w-auto btn-secondary min-h-[48px] !px-8 !py-3.5 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <span>Lihat 13 Paket Dekorasi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-3.5 luxury-card rounded-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-white fill-white/80" />
                </div>
                <div>
                  <span className="font-bold text-white text-sm block">100+ Acara</span>
                  <span className="text-xs text-zinc-400">Terselenggara Sukses</span>
                </div>
              </div>

              <div className="p-3.5 luxury-card rounded-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0">
                  <Palette className="w-4 h-4 text-gold-light" />
                </div>
                <div>
                  <span className="font-bold text-white text-sm block">Desain 2D</span>
                  <span className="text-xs text-zinc-400">Preview Sebelum Pasang</span>
                </div>
              </div>

              <div className="p-3.5 luxury-card rounded-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gold-light" />
                </div>
                <div>
                  <span className="font-bold text-white text-sm block">Survei Lokasi</span>
                  <span className="text-xs text-zinc-400">Seluruh Area Terjangkau</span>
                </div>
              </div>

              <div className="p-3.5 luxury-card rounded-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-gold-light" />
                </div>
                <div>
                  <span className="font-bold text-white text-sm block">Bunga Premium</span>
                  <span className="text-xs text-zinc-400">Artificial Grade A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KATEGORI SECTION ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-light block mb-2">
            Kategori Dekorasi
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Pilihan Paket untuk Berbagai Skala Acara
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            Tersedia 13 paket spesifik yang dirancang sesuai jenis lokasi dan preferensi anggaran Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className="group luxury-card p-6 flex flex-col justify-between hover:border-white/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.06] text-zinc-300 border border-white/10">
                    {cat.count}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-gold-light transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.08] text-xs font-semibold text-gold-light flex items-center gap-1 group-hover:text-white transition-colors">
                <span>Eksplor Pilihan Paket</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PACKAGES ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light block mb-2">
              Paket Unggulan
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Paket Favorit Pilihan Mempelai
            </h2>
          </div>
          <Link
            href="/paket"
            className="text-sm font-semibold text-gold-light hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Lihat Semua 13 Paket</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="luxury-card overflow-hidden flex flex-col justify-between"
            >
              {/* Card Top */}
              <div className="p-6 border-b border-white/[0.08] bg-white/[0.02]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-light px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 inline-block mb-3">
                  Paket {pkg.category.replace('_', ' ')}
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">
                  {pkg.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                  {pkg.description}
                </p>
              </div>

              {/* Card Features */}
              <div className="p-6 flex-1 space-y-3">
                <span className="text-xs font-semibold text-zinc-300 block">
                  Termasuk dalam paket:
                </span>
                <ul className="space-y-2">
                  {pkg.features.slice(0, 6).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {pkg.features.length > 6 && (
                    <li className="text-[11px] text-zinc-400 pl-6 italic">
                      + {pkg.features.length - 6} item fasilitas lainnya
                    </li>
                  )}
                </ul>
              </div>

              {/* Card Bottom CTA */}
              <div className="p-6 pt-0 space-y-2.5">
                <Link
                  href={`/booking?package=${encodeURIComponent(pkg.name)}`}
                  className="w-full btn-primary !py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Pilih Paket Ini</span>
                </Link>
                <Link
                  href="/paket"
                  className="w-full btn-secondary !py-2 text-xs flex items-center justify-center text-zinc-300"
                >
                  <span>Detail Spesifikasi</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY CHOOSE US ──────────────────────────────────────── */}
      <section className="border-y border-white/[0.07] py-16 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light block mb-2">
              Keunggulan Layanan
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Mengapa Memilih Platinum Project?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 luxury-card rounded-2xl space-y-3">
              <div className="w-11 h-11 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-gold-light">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Visualisasi 2D Presisi
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Anda mendapatkan rancangan denah layout 2D sebelum hari H, memastikan ukuran pelaminan pas dengan ruangan.
              </p>
            </div>

            <div className="p-6 luxury-card rounded-2xl space-y-3">
              <div className="w-11 h-11 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-gold-light">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Artificial Premium Flower
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Koleksi bunga artificial berkualitas tinggi yang tetap mekar segar, rapi, dan menawan di bawah sorot tata lampu.
              </p>
            </div>

            <div className="p-6 luxury-card rounded-2xl space-y-3">
              <div className="w-11 h-11 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-gold-light">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Survei Lokasi & Konsultasi
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tim kami siap melakukan survei lokasi acara untuk mengukur dimensi panggung dan akses logistik.
              </p>
            </div>

            <div className="p-6 luxury-card rounded-2xl space-y-3">
              <div className="w-11 h-11 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-gold-light">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Transparansi & Tepat Waktu
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pemasangan selesai rapi sebelum prosesi adat dimulai. Konfirmasi booking instan terhubung langsung ke 3 nomor WhatsApp admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden luxury-card p-8 sm:p-12 lg:p-16 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light block">
              Booking Mudah & Fleksibel
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Kunci Tanggal Bahagia Anda Sekarang
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Jadwal tanggal pernikahan sangat cepat terisi. Pilih paket dekorasi Anda hari ini dan dapatkan survei lokasi serta rancangan 2D eksklusif.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto btn-primary min-h-[48px] !px-8 !py-3.5 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Mulai Isi Form Booking</span>
              </Link>
              <a
                href="https://wa.me/6285707752030?text=Halo%20Admin%203%20Platinum%20Project%2C%20saya%20ingin%20konsultasi%20mengenai%20booking%20dekorasi%20pernikahan."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-secondary min-h-[48px] !px-6 !py-3.5 text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Tanya Admin 3 via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
