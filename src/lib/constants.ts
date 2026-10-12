import { Package } from '@/types';

export const DEFAULT_PACKAGES: Package[] = [
  // ==========================================
  // PAKET RUMAH (7 PAKET)
  // ==========================================
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
      'Standing Mirror',
      '1 Set Standing Lamp',
      'Lighting (4 Spot)',
      'Stand Foto 1',
      'Tong Uang 1',
      'Artificial Premium Flower',
      'Survey Lokasi',
      'Implementasi Design 2D',
    ],
    sort_order: 1,
    is_active: true,
  },
  {
    id: 2,
    name: 'PURE',
    slug: 'pure',
    category: 'rumah',
    description: 'Paket rumah dengan panggung dekorasi dan pilihan dekor akad luar/dalam.',
    features: [
      'Panggung Dekorasi 8m x 3m',
      'Dekor Pelaminan 8m x 3m',
      '1 Set Kursi Pelaminan',
      'Dekor Akad Luar (6 Kursi Tiffani + Meja Akad) ATAU Dekor Akad Dalam (Meja Akad Lesehan + Dekor 3m)',
      'Dekor Pintu Masuk',
      'Welcome Sign',
      'Standing Mirror',
      '1 Set Standing Lamp',
      'Lighting (4 Spot)',
      'Stand Foto 2',
      'Tong Uang 2',
      'Artificial Premium Flower',
      'Survey Lokasi',
      'Implementasi Design 2D',
    ],
    sort_order: 2,
    is_active: true,
  },
  {
    id: 3,
    name: 'GRACE',
    slug: 'grace',
    category: 'rumah',
    description: 'Upgrade dari PURE dengan sentuhan bunga segar untuk keindahan lebih.',
    features: [
      'Semua fasilitas paket PURE',
      'Artificial Premium Flower Mix Fresh Flower',
      'Taman Full Fresh Flower',
    ],
    sort_order: 3,
    is_active: true,
  },
  {
    id: 4,
    name: 'RADIANCE',
    slug: 'radiance',
    category: 'rumah',
    description: 'Paket mewah dengan pergola dan karpet jalan panjang.',
    features: [
      'Semua fasilitas paket GRACE',
      'Pergola (Lorong) 3 Set',
      'Standing Flower 6',
      'Karpet Jalan Max 30m',
    ],
    sort_order: 4,
    is_active: true,
  },
  {
    id: 5,
    name: 'ELYSIAN',
    slug: 'elysian',
    category: 'rumah',
    description: 'Paket premium dengan gazebo akad dan flooring initial eksklusif.',
    features: [
      'Semua fasilitas paket RADIANCE',
      'Gazebo Akad 3m x 3m',
      'Flooring Initial 3m x 3m',
    ],
    sort_order: 5,
    is_active: true,
  },
  {
    id: 6,
    name: 'LUMINARY',
    slug: 'luminary',
    category: 'rumah',
    description: 'Paket full fresh flower dengan beam lighting dan pergola lengkap.',
    features: [
      'Panggung Dekorasi 8m x 3m',
      'Dekor Pelaminan 8m x 3m',
      '1 Set Kursi Pelaminan',
      'Dekor Akad (Luar / Dalam)',
      'Dekor Pintu Masuk',
      'Welcome Sign',
      'Standing Mirror',
      '1 Set Standing Lamp',
      'Lighting (6 Spot) + Beam Lighting (4 Spot)',
      'Stand Foto 2',
      'Tong Uang 2',
      'Full Fresh Flower',
      'Pergola (Lorong) 3 Set',
      'Standing Flower 6',
      'Karpet Jalan Max 30m',
      'Survey Lokasi',
      'Implementasi Design 2D',
    ],
    sort_order: 6,
    is_active: true,
  },
  {
    id: 7,
    name: 'PRESTIGE',
    slug: 'prestige',
    category: 'rumah',
    description: 'Paket tertinggi rumah dengan gazebo akad 4x4 dan flooring eksklusif.',
    features: [
      'Semua fasilitas paket LUMINARY',
      'Gazebo Akad 4m x 4m',
      'Flooring Initial 3m x 3m',
    ],
    sort_order: 7,
    is_active: true,
  },

  // ==========================================
  // PAKET LAYOS (2 PAKET)
  // ==========================================
  {
    id: 8,
    name: 'LAYOS 2 SET',
    slug: 'layos-2-set',
    category: 'layos',
    description: 'Dekorasi layos 2 set dengan gazebo pintu masuk.',
    features: [
      '2 Set Layos (per set 9m x 6m)',
      '1 Set Layos Modif / Hias (Atas Pelaminan)',
      '1 Set Layos Seret Biasa',
      'Gazebo Pintu Masuk 3m x 3m',
      'Tirai 10-15m',
    ],
    sort_order: 8,
    is_active: true,
  },
  {
    id: 9,
    name: 'LAYOS 3 SET',
    slug: 'layos-3-set',
    category: 'layos',
    description: 'Dekorasi layos 3 set dengan gazebo pintu masuk yang lebih luas.',
    features: [
      '3 Set Layos (per set 9m x 6m)',
      '1 Set Layos Modif / Hias (Atas Pelaminan)',
      '2 Set Layos Seret Biasa',
      'Gazebo Pintu Masuk 3m x 3m',
      'Tirai 10-15m',
    ],
    sort_order: 9,
    is_active: true,
  },

  // ==========================================
  // PAKET GEDUNG (2 PAKET)
  // ==========================================
  {
    id: 10,
    name: 'SMALL HALL',
    slug: 'small-hall',
    category: 'gedung_kecil',
    description: 'Dekorasi gedung kecil lengkap dengan photobooth dan gazebo akad.',
    features: [
      'Dekor Pelaminan 8-10m',
      '1 Set Kursi Pelaminan',
      '1 Set Kursi Akad + Meja',
      'Dekor Pintu Masuk',
      'Dekor Photobooth',
      'Welcome Sign',
      'Standing Mirror',
      'Standing Lamp 1 Set',
      'Lighting (6 Spot) + Beam Lighting (4 Spot)',
      'Stand Foto 2',
      'Tong Uang 2',
      'Artificial Premium Flower Mix Fresh Flower',
      'Taman Full Fresh Flower',
      'Pergola (Lorong) 3 Set',
      'Standing Flower 6',
      'Karpet Jalan Max 30m',
      'Gazebo Akad 3x3m',
      'Flooring (Initial) 3x3m',
      'Survey Lokasi',
      'Implementasi Design 2D',
    ],
    sort_order: 10,
    is_active: true,
  },
  {
    id: 11,
    name: 'GREAT HALL',
    slug: 'great-hall',
    category: 'gedung_besar',
    description: 'Dekorasi gedung besar premium dengan pelaminan 12-15m dan lighting maksimal.',
    features: [
      'Dekor Pelaminan 12-15m',
      '1 Set Kursi Pelaminan',
      '1 Set Kursi Akad + Meja',
      'Dekor Pintu Masuk',
      'Dekor Photobooth',
      'Welcome Sign',
      'Standing Mirror',
      'Standing Lamp 2 Set',
      'Lighting (10 Spot) + Beam Lighting (6 Spot)',
      'Stand Foto 2',
      'Tong Uang 2',
      'Artificial Premium Flower Mix Fresh Flower',
      'Taman Full Fresh Flower',
      'Pergola (Lorong) 5 Set',
      'Standing Flower 6',
      'Karpet Jalan Max 50m',
      'Gazebo Akad 4x4m',
      'Flooring (Initial) 3x3m',
      'Survey Lokasi',
      'Implementasi Design 2D',
    ],
    sort_order: 11,
    is_active: true,
  },

  // ==========================================
  // PAKET ENGAGEMENT (2 PAKET)
  // ==========================================
  {
    id: 12,
    name: 'ENGAGEMENT LITE',
    slug: 'engagement-lite',
    category: 'engagement',
    description: 'Dekorasi engagement simpel dan elegan untuk lamaran.',
    features: [
      'Dekorasi 3M',
      'Artificial Premium Flower',
      'Inisial Nama',
      'Lighting (2 Spot)',
      'Standing Lamp 1 Set',
      'Kursi Tiffani 2',
      'Permadani',
    ],
    sort_order: 12,
    is_active: true,
  },
  {
    id: 13,
    name: 'ENGAGEMENT PREMIUM',
    slug: 'engagement-premium',
    category: 'engagement',
    description: 'Dekorasi engagement mewah dengan welcome gate dan bunga segar.',
    features: [
      'Dekorasi 3-5M',
      'Welcome Gate',
      'Artificial Premium Flower + Mix Fresh Flower',
      'Inisial Nama',
      'Lighting (4 Spot)',
      'Standing Lamp 1 Set',
      'Kursi Tiffani 2',
      'Standing Mirror',
      'Permadani',
    ],
    sort_order: 13,
    is_active: true,
  },
];

export const ADMIN_WHATSAPP = [
  {
    id: 1,
    name: 'Admin 1',
    phone: '6285700751642',
    label: '0857-0075-1642',
  },
  {
    id: 2,
    name: 'Admin 2',
    phone: '6282325617934',
    label: '0823-2561-7934',
  },
  {
    id: 3,
    name: 'Admin 3',
    phone: '6285707752030',
    label: '0857-0775-2030',
  },
  {
    id: 4,
    name: 'Admin 4 (Testing)',
    phone: '6282132167400',
    label: '0821-3216-7400',
  },
];

export const COMPANY_INFO = {
  name: 'Platinum Project',
  tagline: 'Wedding Decoration',
  instagram: 'https://www.instagram.com/platinumproject.deco',
  instagramCatalogue: 'https://www.instagram.com/platinumproject.catalogue',
  instagramHouseOfPlatinum: 'https://www.instagram.com/houseof_platinum',
  tiktok: 'https://www.tiktok.com/@platinumproject.deco',
  muaPartner: 'https://www.instagram.com/diahtriswoto.makeup',
  address: 'Harjosari Bandar Desa Bandar Kec. Bandar Kab. Batang, Jawa Tengah, Indonesia 512354',
  mapsUrl: 'https://maps.app.goo.gl/1SiTiWnfCFgET6Zz6',
};

export const GOOGLE_DRIVE_RESOURCES = {
  katalogDesainReality: {
    title: 'Katalog Desain Reality',
    description: 'Showcase visual desain dekorasi pelaminan, tenda layos VIP, dan backdrop lamaran.',
    viewUrl: 'https://drive.google.com/file/d/1ael_qcmKiT2BSyRp1iHSYaE2MZEsD623/view',
    previewUrl: 'https://drive.google.com/file/d/1ael_qcmKiT2BSyRp1iHSYaE2MZEsD623/preview',
  },
  detailPaket: {
    title: 'Buku Detail Paket & Fasilitas',
    description: 'Spesifikasi lengkap rincian 13 paket dekorasi pernikahan Platinum Project.',
    viewUrl: 'https://drive.google.com/file/d/1sAz4dHVnSAZEJp7DS3C_5frIOwgwM4oJ/view',
    previewUrl: 'https://drive.google.com/file/d/1sAz4dHVnSAZEJp7DS3C_5frIOwgwM4oJ/preview',
  },
  projectUpdates: {
    title: 'Arsip Project Updates Pelanggan',
    description: 'Folder Google Drive dokumentasi hasil riil dekorasi wedding customer (terorganisir per tahun/bulan/nama mempelai).',
    viewUrl: 'https://drive.google.com/drive/folders/1HS9atGh1AMWf26c-vaGRx5YAEk3V_1_s',
    folderUrl: 'https://drive.google.com/drive/folders/1HS9atGh1AMWf26c-vaGRx5YAEk3V_1_s',
  },
};

export const generateWhatsAppLink = (
  phone: string,
  bookingData: {
    code: string;
    bride_names: string;
    initials?: string;
    phone_number?: string;
    event_date: string;
    event_type?: string;
    decoration_type?: string;
    package_name: string;
    dp_amount?: number;
    address?: string;
    maps_url?: string;
    notes?: string;
  }
) => {
  const notesText = bookingData.notes?.trim() ? bookingData.notes.trim() : '-';
  const dpFormatted = (bookingData.dp_amount || 1000000).toLocaleString('id-ID');

  const message = `*FORMAT BOOKING PLATINUM PROJECT*
───────────────────────────
*INFORMASI MEMPELAI*
• *Kode Booking :* ${bookingData.code}
• *Nama Mempelai :* ${bookingData.bride_names}
• *Inisial Nama :* ${bookingData.initials || '-'}
• *No. WhatsApp :* ${bookingData.phone_number || '-'}

*DETAIL ACARA & PAKET*
• *Tanggal Acara :* ${bookingData.event_date}
• *Jenis Acara :* ${bookingData.event_type || 'Wedding'}
• *Dekor Akad :* ${bookingData.decoration_type || 'Dalam'}
• *Pilihan Paket :* ${bookingData.package_name}
• *DP Terkunci :* Rp ${dpFormatted} (Fix)

*LOKASI & ALAMAT ACARA*
• *Alamat Lengkap :* ${bookingData.address || '-'}
• *Google Maps :* ${bookingData.maps_url || '-'}

*CATATAN TAMBAHAN*
${notesText}

───────────────────────────
*KETENTUAN PELUNASAN:*
Pelunasan maksimal H-1 sebelum Hari H (dekorasi tidak dipasang jika belum melakukan pelunasan).
───────────────────────────
Halo Admin Platinum Project, saya ingin konfirmasi pemesanan dekorasi di atas. Mohon info nomor rekening untuk transfer DP Rp 1.000.000. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
