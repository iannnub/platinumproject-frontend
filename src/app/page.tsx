import Link from 'next/link';
import { Sparkles, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Palette, MapPin, Star, Heart } from 'lucide-react';
import { api } from '@/lib/api';
import { Package } from '@/types';

async function getFeaturedPackages(): Promise<Package[]> {
  try {
    const packages = await api.getPackages();
    return packages.slice(0, 3);
  } catch (err) {
    return [
      {
        id: 1,
        name: 'LITE',
        slug: 'lite',
        category: 'rumah',
        description: 'Paket dekorasi rumah ekonomis dengan tampilan elegant dan elegan.',
        features: [
          'Dekor Pelaminan 6m x 3m',
          '1 Set Kursi Pelaminan',
          'Meja Akad Lesehan + Permadani',
          'Dekor Pintu Masuk',
          'Welcome Sign',
          'Survey Lokasi',
          'Implementasi Design 2D',
        ],
      },
      {
        id: 2,
        name: 'PURE',
        slug: 'pure',
        category: 'rumah',
        description: 'Paket dekorasi rumah menengah dengan elemen estetika floral modern.',
        features: [
          'Dekor Pelaminan 6-8m x 3m',
          '1 Set Kursi Pelaminan Mewah',
          'Meja Akad Kursi / Lesehan',
          'Mini Gallery Photo',
          'Gate Masuk Full Flowers',
          'Lighting Accent Pro',
          'Implementasi Design 2D',
        ],
      },
      {
        id: 3,
        name: 'GRACE',
        slug: 'grace',
        category: 'gedung_besar',
        description: 'Paket dekorasi ballroom megah dengan panggung luas dan ornamen platinum.',
        features: [
          'Dekor Pelaminan hingga 12m',
          'Kursi Pelaminan Exclusive',
          'Photobooth 3D Backdrop',
          'Karpet Jalan & Standing Flowers',
          'Welcome Gate Dome',
          'Lighting Grand Concept',
          'Design 2D & 3D Preview',
        ],
      },
    ];
  }
}

export default async function HomePage() {
  const featuredPackages = await getFeaturedPackages();

  const categories = [
    { title: 'Dekor Rumah', desc: 'Cocok untuk akad & resepsi intim halaman rumah', count: '4 Pilihan Paket', link: '/paket?cat=rumah' },
    { title: 'Tenda Layos VIP', desc: 'Dekorasi plafon layos eksklusif & pelaminan outdoor', count: '2 Pilihan Paket', link: '/paket?cat=layos' },
    { title: 'Gedung / Aula Kecil', desc: 'Penataan venue indoor compact & estetika rapi', count: '3 Pilihan Paket', link: '/paket?cat=gedung_kecil' },
    { title: 'Grand Ballroom Gedung', desc: 'Pelaminan luas megah panggung 10-12 meter', count: '2 Pilihan Paket', link: '/paket?cat=gedung_besar' },
    { title: 'Engagement & Akad', desc: 'Backdrop lamaran & akad simpel minimalis', count: '2 Pilihan Paket', link: '/paket?cat=engagement' },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* ─── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-champagne/30 via-white to-[#FAFAFA]">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gold/40 shadow-sm text-xs font-semibold text-gold-dark tracking-wide">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Wedding Decoration Specialist Bali</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-silver-900 leading-[1.15]">
              Wujudkan Dekorasi Pernikahan Impian Bersama{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-silver-800 via-gold to-silver-900">
                Platinum Project
              </span>
            </h1>

            {/* Subheading */}
            <p className="font-sans text-base sm:text-lg text-silver-700 leading-relaxed">
              Kombinasi estetika Silver, Gold, dan Rose Gold dengan artificial flowers premium serta konsep desain 2D terencana. Setiap sudut pelaminan dirancang sempurna untuk momen sakral Anda.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto btn-primary !px-8 !py-3.5 text-base flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Booking Tanggal Acara</span>
              </Link>
              <Link
                href="/paket"
                className="w-full sm:w-auto btn-secondary !px-8 !py-3.5 text-base flex items-center justify-center gap-2"
              >
                <span>Lihat 13 Paket Dekorasi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-3 bg-white/80 rounded-xl border border-silver-200/80 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                </div>
                <div>
                  <span className="font-bold text-silver-900 text-sm block">100+ Acara</span>
                  <span className="text-xs text-silver-500">Terselenggara Sukses</span>
                </div>
              </div>

              <div className="p-3 bg-white/80 rounded-xl border border-silver-200/80 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <Palette className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <span className="font-bold text-silver-900 text-sm block">Desain 2D</span>
                  <span className="text-xs text-silver-500">Preview Sebelum Pasang</span>
                </div>
              </div>

              <div className="p-3 bg-white/80 rounded-xl border border-silver-200/80 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <span className="font-bold text-silver-900 text-sm block">Survei Lokasi</span>
                  <span className="text-xs text-silver-500">Area Bali Terjangkau</span>
                </div>
              </div>

              <div className="p-3 bg-white/80 rounded-xl border border-silver-200/80 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <span className="font-bold text-silver-900 text-sm block">Bunga Premium</span>
                  <span className="text-xs text-silver-500">Artificial Grade A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KATEGORI SECTION ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
            Kategori Dekorasi
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-silver-900">
            Pilihan Paket untuk Berbagai Skala Acara
          </h2>
          <p className="text-sm text-silver-600 mt-3">
            Tersedia 13 paket spesifik yang dirancang sesuai jenis lokasi dan preferensi anggaran Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className="group luxury-card p-6 flex flex-col justify-between hover:border-gold/60 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-silver-100 text-silver-700">
                    {cat.count}
                  </span>
                  <ArrowRight className="w-4 h-4 text-silver-400 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-heading text-xl font-bold text-silver-900 group-hover:text-gold transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-silver-600 mt-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-silver-100 text-xs font-semibold text-gold flex items-center gap-1">
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
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
              Paket Unggulan
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-silver-900">
              Paket Favorit Pilihan Mempelai
            </h2>
          </div>
          <Link
            href="/paket"
            className="text-sm font-semibold text-gold hover:text-gold-dark flex items-center gap-1.5"
          >
            <span>Lihat Semua 13 Paket</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="luxury-card overflow-hidden flex flex-col justify-between hover:shadow-gold/20"
            >
              {/* Card Top */}
              <div className="bg-gradient-to-br from-white via-silver-50 to-champagne/30 p-6 border-b border-silver-200/80">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold px-2 py-0.5 rounded bg-white/90 border border-gold/30 inline-block mb-2">
                  Paket {pkg.category.replace('_', ' ')}
                </span>
                <h3 className="font-heading text-2xl font-bold text-silver-900">
                  {pkg.name}
                </h3>
                <p className="text-xs text-silver-600 mt-2 line-clamp-2">
                  {pkg.description}
                </p>
              </div>

              {/* Card Features */}
              <div className="p-6 flex-1 space-y-3">
                <span className="text-xs font-semibold text-silver-800 block">
                  Termasuk dalam paket:
                </span>
                <ul className="space-y-2">
                  {pkg.features.slice(0, 6).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-silver-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {pkg.features.length > 6 && (
                    <li className="text-[11px] text-silver-500 pl-6 italic">
                      + {pkg.features.length - 6} item fasilitas lainnya
                    </li>
                  )}
                </ul>
              </div>

              {/* Card Bottom CTA */}
              <div className="p-6 pt-0 space-y-2">
                <Link
                  href={`/booking?package=${encodeURIComponent(pkg.name)}`}
                  className="w-full btn-primary !py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Pilih Paket Ini</span>
                </Link>
                <Link
                  href="/paket"
                  className="w-full btn-secondary !py-2 text-xs flex items-center justify-center text-silver-700"
                >
                  <span>Detail Spesifikasi</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY CHOOSE US ──────────────────────────────────────── */}
      <section className="bg-silver-100/70 border-y border-silver-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
              Keunggulan Layanan
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-silver-900">
              Mengapa Memilih Platinum Project Bali?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl border border-silver-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-silver-900">
                Visualisasi 2D Presisi
              </h3>
              <p className="text-xs text-silver-600 leading-relaxed">
                Anda mendapatkan rancangan denah layout 2D sebelum hari H, memastikan ukuran pelaminan pas dengan ruangan.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-silver-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-silver-900">
                Artificial Premium Flower
              </h3>
              <p className="text-xs text-silver-600 leading-relaxed">
                Koleksi bunga artificial berkualitas tinggi yang tetap mekar segar, rapi, dan menawan di bawah sorot tata lampu.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-silver-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-silver-900">
                Survei Lokasi & Konsultasi
              </h3>
              <p className="text-xs text-silver-600 leading-relaxed">
                Tim kami siap melakukan survei lokasi acara di wilayah Bali untuk mengukur dimensi panggung dan akses logistik.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-silver-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-silver-900">
                Transparansi & Tepat Waktu
              </h3>
              <p className="text-xs text-silver-600 leading-relaxed">
                Pemasangan selesai rapi sebelum prosesi adat dimulai. Konfirmasi booking instan terhubung langsung ke 3 nomor WhatsApp admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-silver-900 via-silver-800 to-silver-900 text-white p-8 sm:p-12 lg:p-16 border border-silver-700 shadow-2xl">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Booking Mudah & Fleksibel
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Kunci Tanggal Bahagia Anda Sekarang
            </h2>
            <p className="text-silver-300 text-sm sm:text-base leading-relaxed">
              Jadwal tanggal pernikahan di Bali sangat cepat terisi. Pilih paket dekorasi Anda hari ini dan dapatkan survei lokasi serta rancangan 2D eksklusif.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="btn-primary !px-8 !py-3 text-base flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Mulai Isi Form Booking</span>
              </Link>
              <a
                href="https://wa.me/6285700751642"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !text-white !border-silver-600 hover:!bg-white/10 !px-6 !py-3 text-sm flex items-center justify-center gap-2"
              >
                <span>Tanya Admin via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
