import { auth } from '@/lib/auth';

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_BASE = `${rawApiUrl.replace(/\/api\/?$/, '')}/api/admin/financial`;

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return auth.getToken() || localStorage.getItem('platinum_admin_token') || localStorage.getItem('auth_token');
  }
  return null;
};

const getHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  const h: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    h['Authorization'] = `Bearer ${token}`;
  }
  return h;
};

async function handleResponse<T = any>(response: Response): Promise<T> {
  if (response.status === 401 && typeof window !== 'undefined') {
    auth.logout();
    if (!window.location.pathname.includes('/admin/login')) {
      window.location.href = '/admin/login';
    }
  }
  return response.json();
}

export const financialApi = {
  // Dashboard
  async getDashboard(period: string = 'month', startDate?: string, endDate?: string) {
    const params = new URLSearchParams({ period });
    if (startDate) params.append('start_date', startDate);
    if (endDate)   params.append('end_date', endDate);
    const response = await fetch(`${API_BASE}/dashboard?${params}`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Cash flow
  async getCashFlow(year: number) {
    const response = await fetch(`${API_BASE}/cash-flow?year=${year}`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Profit by package
  async getProfitByPackage(period: string = 'year') {
    const response = await fetch(`${API_BASE}/profit-by-package?period=${period}`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Bookings
  async getBookings(filters: Record<string, string> = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE}/bookings?${params}`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Booking detail
  async getBookingDetail(id: number) {
    const response = await fetch(`${API_BASE}/booking/${id}`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Record payment
  async recordPayment(data: {
    booking_id: number;
    payment_type: string;
    amount: number;
    payment_date: string;
    payment_method: string;
    notes?: string;
  }) {
    const response = await fetch(`${API_BASE}/payment`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Add expense
  async addExpense(data: {
    booking_id: number;
    item_name: string;
    description?: string;
    amount: number;
    expense_date: string;
    notes?: string;
  }) {
    const response = await fetch(`${API_BASE}/expense`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Update expense
  async updateExpense(id: number, data: Partial<{
    item_name: string;
    description: string;
    amount: number;
    expense_date: string;
    notes: string;
  }>) {
    const response = await fetch(`${API_BASE}/expense/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Delete expense
  async deleteExpense(id: number) {
    const response = await fetch(`${API_BASE}/expense/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },
};
