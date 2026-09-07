import axios from 'axios';
import { Package, CreateBookingResponse, BookingFormData, Booking } from '@/types';
import { auth, AdminUser } from '@/lib/auth';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

export async function getCsrfCookie(): Promise<void> {
  try {
    const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const baseUrl = rawApiUrl.replace(/\/api\/?$/, '');
    await axios.get(`${baseUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  } catch {
    // CSRF cookie endpoint is optional when Bearer token is used
  }
}

// Attach Bearer token automatically if available
apiClient.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        auth.logout();
        if (!window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
      }
    }
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

export interface AdminStatsResponse {
  stats: {
    total_bookings: number;
    pending_bookings: number;
    confirmed_bookings: number;
    total_revenue: number;
  };
  recent_bookings: Booking[];
}

export interface PaginatedBookingsResponse {
  data: Booking[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const api = {
  // Public
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

  // Admin Auth
  adminLogin: async (credentials: { email: string; password: string }) => {
    await getCsrfCookie();
    const res = await apiClient.post<{
      success: boolean;
      message: string;
      data: AdminUser;
      token: string;
    }>('/admin/login', credentials);
    return res.data;
  },
  adminLogout: async () => {
    try {
      await apiClient.post('/logout');
    } catch {
      // Ignore network or token expiration errors on logout
    } finally {
      auth.logout();
    }
  },

  // Admin Dashboard & Bookings
  getAdminStats: async (): Promise<AdminStatsResponse> => {
    const res = await apiClient.get<{ success: boolean; data: AdminStatsResponse }>(
      '/admin/dashboard/stats'
    );
    return res.data.data;
  },
  getAdminBookings: async (params?: {
    search?: string;
    status?: string;
    payment_status?: string;
    package_type?: string;
    date_from?: string;
    date_to?: string;
    page?: number;
  }): Promise<PaginatedBookingsResponse> => {
    const res = await apiClient.get<{
      success: boolean;
      data: Booking[];
      meta: PaginatedBookingsResponse['meta'];
    }>('/admin/bookings', { params });
    return { data: res.data.data, meta: res.data.meta };
  },
  getAdminBookingDetail: async (id: number) => {
    const res = await apiClient.get<{
      success: boolean;
      data: Booking;
      wa_links: { admin: string; phone: string; url: string }[];
    }>(`/admin/bookings/${id}`);
    return res.data;
  },
  updateAdminBooking: async (
    id: number,
    data: {
      status?: string;
      payment_status?: string;
      total_amount?: number;
      notes?: string;
      dp_amount?: number;
    }
  ) => {
    const res = await apiClient.patch<{
      success: boolean;
      message: string;
      data: Booking;
    }>(`/admin/bookings/${id}`, data);
    return res.data;
  },
  deleteAdminBooking: async (id: number) => {
    const res = await apiClient.delete<{ success: boolean; message: string }>(
      `/admin/bookings/${id}`
    );
    return res.data;
  },
  exportBookingsExcel: async (params?: Record<string, any>) => {
    const res = await apiClient.get('/admin/export/excel', {
      params,
      responseType: 'blob',
    });
    // Trigger browser file download
    const blob = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `bookings_export_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

export default apiClient;
