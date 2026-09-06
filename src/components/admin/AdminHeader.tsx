'use client';

import { useState, useEffect } from 'react';
import { Menu, Bell, Shield, LogOut } from 'lucide-react';
import { auth, AdminUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface AdminHeaderProps {
  onToggleMobileSidebar: () => void;
  title?: string;
}

export default function AdminHeader({
  onToggleMobileSidebar,
  title = 'Admin Dashboard',
}: AdminHeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    setUser(auth.getUser());
  }, []);

  const handleLogout = async () => {
    try {
      await api.adminLogout();
      toast.success('Logout berhasil');
      router.push('/admin/login');
    } catch {
      auth.logout();
      router.push('/admin/login');
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-silver-200 px-4 sm:px-8 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-silver-600 hover:text-silver-900 rounded-lg hover:bg-silver-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-heading text-lg sm:text-xl font-bold text-silver-900">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 pl-3 border-l border-silver-200">
          <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-xs border border-gold/30">
            <Shield className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-silver-900 block leading-tight">
              {user?.name || 'Administrator'}
            </span>
            <span className="text-[10px] text-silver-500 block">
              {user?.email || 'admin@platinumproject.my.id'}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Keluar"
          className="p-2 text-silver-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
