import { z } from 'zod';

export const bookingSchema = z.object({
  bride_names: z.string().min(5, 'Nama lengkap mempelai minimal 5 karakter'),
  initials: z.string().min(1, 'Inisial wajib diisi').max(10, 'Inisial maksimal 10 karakter'),
  phone: z
    .string()
    .regex(/^(08|\+62)[0-9]{8,13}$/, 'Format nomor WhatsApp tidak valid (contoh: 08123456789 atau +628123456789)'),
  event_date: z.string().refine(
    (dateStr) => {
      if (!dateStr) return false;
      const eventDate = new Date(dateStr);
      const minDate = new Date();
      minDate.setHours(0, 0, 0, 0);
      minDate.setDate(minDate.getDate() + 7);
      return eventDate >= minDate;
    },
    { message: 'Tanggal acara minimal H+7 hari dari hari ini' }
  ),
  event_type: z.enum(['Wedding', 'Birthday', 'Corporate', 'Other'], {
    message: 'Pilih jenis acara yang valid',
  }),
  decoration_type: z.enum(['Dalam', 'Luar'], {
    message: 'Pilih jenis dekorasi akad (Dalam/Luar)',
  }),
  package_type: z.string().min(1, 'Silakan pilih paket dekorasi'),
  dp_amount: z.coerce.number().min(500000, 'DP minimal Rp 500.000'),
  lat: z.number().min(-90).max(90, 'Koordinat latitude tidak valid'),
  lng: z.number().min(-180).max(180, 'Koordinat longitude tidak valid'),
  address: z.string().min(10, 'Alamat acara terlalu pendek (minimal 10 karakter)'),
  notes: z.string().max(1000, 'Catatan maksimal 1000 karakter').optional().or(z.literal('')),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
