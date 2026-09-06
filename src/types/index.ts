export interface Package {
  id: number;
  name: string;
  slug: string;
  category: 'rumah' | 'layos' | 'gedung_kecil' | 'gedung_besar' | 'engagement' | string;
  description: string;
  features: string[];
  sort_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  id: number;
  booking_code: string;
  bride_names: string;
  initials: string;
  phone: string;
  event_date: string;
  event_date_formatted?: string;
  event_type: string;
  decoration_type: 'Dalam' | 'Luar' | string;
  package_type: string;
  dp_amount: number;
  total_amount?: number | null;
  payment_status?: string | null;
  status?: string | null;
  lat: number;
  lng: number;
  address: string;
  maps_url: string;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AdminWaLink {
  admin: string;
  phone: string;
  url: string;
}

export interface CreateBookingResponse {
  success: boolean;
  message: string;
  data: Booking;
  wa_links: AdminWaLink[];
}

export interface BookingFormData {
  bride_names: string;
  initials: string;
  phone: string;
  event_date: string;
  event_type: 'Wedding' | 'Birthday' | 'Corporate' | 'Other';
  decoration_type: 'Dalam' | 'Luar';
  package_type: string;
  dp_amount: number;
  lat: number;
  lng: number;
  address: string;
  notes?: string;
}
