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
  address: 'Desa Cepoko RT 4 RW 2, Kec. Bandar, Bali',
  mapsUrl: 'https://maps.app.goo.gl/1SiTiWnfCFgET6Zz6',
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
