'use client';

const TOKEN_KEY = 'platinum_admin_token';
const USER_KEY = 'platinum_admin_user';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const auth = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setSession: (token: string, user: AdminUser) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): AdminUser | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(USER_KEY);
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  logout: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getAuthHeader: () => {
    const token = auth.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
