'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { auth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      if (auth.isAuthenticated()) {
        router.replace('/admin/dashboard');
      } else {
        setCheckingAuth(false);
      }
      return;
    }

    if (!auth.isAuthenticated()) {
      router.replace('/admin/login');
    } else {
      setCheckingAuth(false);
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-silver-900">{children}</div>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-silver-100 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
        <span className="text-xs text-silver-500 font-medium">
          Memverifikasi sesi admin...
        </span>
      </div>
    );
  }

  const getPageTitle = () => {
    if (pathname === '/admin/bookings') return 'Manajemen Booking & Jadwal';
    if (pathname === '/admin/dashboard') return 'Dashboard Ringkasan Acara';
    return 'Admin Portal';
  };

  return (
    <div className="min-h-screen flex bg-silver-50 text-silver-800">
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={getPageTitle()}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
