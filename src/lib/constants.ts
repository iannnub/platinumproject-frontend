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
];

export const COMPANY_INFO = {
  name: 'Platinum Project',
  tagline: 'Wedding Decoration Bali',
  instagram: 'https://instagram.com/platinumproject.deco',
  tiktok: 'https://tiktok.com/@platinumproject.deco',
  muaPartner: 'https://instagram.com/diahtriswoto.makeup',
  address: 'Desa Cepoko RT 4 RW 2, Kec. Bandar, Bali',
  mapsUrl: 'https://maps.app.goo.gl/1SiTiWnfCFgET6Zz6',
};

export const generateWhatsAppLink = (
  phone: string,
  bookingData: {
    code: string;
    bride_names: string;
    event_date: string;
    package_name: string;
    dp_amount: number;
    address?: string;
    maps_url?: string;
  }
) => {
  const message = `*🎉 FORMAT BOOKING PLATINUM PROJECT*

Kode Booking: ${bookingData.code}
Nama Lengkap Mempelai: ${bookingData.bride_names}
Tanggal Acara: ${bookingData.event_date}
Jenis Paket: ${bookingData.package_name}
DP Minimal: Rp ${bookingData.dp_amount.toLocaleString('id-ID')}
${bookingData.address ? `Alamat: ${bookingData.address}\n` : ''}${bookingData.maps_url ? `📍 Lokasi Google Maps:\n${bookingData.maps_url}\n` : ''}
Mohon info lebih lanjut untuk pembayaran dan konfirmasi booking. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
