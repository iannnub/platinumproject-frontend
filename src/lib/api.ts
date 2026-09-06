import axios from 'axios';
import { Package, CreateBookingResponse, BookingFormData } from '@/types';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.errors) {
      const errorMsg = Object.values(error.response.data.errors).flat().join(', ');
      throw new Error(errorMsg);
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Koneksi timeout. Silakan coba lagi.');
    }
    if (!error.response) {
      throw new Error('Koneksi server gagal. Pastikan API backend berjalan.');
    }
    throw error;
  }
);

export const api = {
  getPackages: async (): Promise<Package[]> => {
    const res = await apiClient.get<{ success: boolean; data: Package[] }>('/packages');
    return res.data.data;
  },
  getPackageBySlug: async (slug: string): Promise<Package> => {
    const res = await apiClient.get<{ success: boolean; data: Package }>(`/packages/${slug}`);
    return res.data.data;
  },
  createBooking: async (payload: BookingFormData): Promise<CreateBookingResponse> => {
    const res = await apiClient.post<CreateBookingResponse>('/bookings', payload);
    return res.data;
  },
};

export default apiClient;
