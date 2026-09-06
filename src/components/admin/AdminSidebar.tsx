'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  FileSpreadsheet,
  ExternalLink,
  LogOut,
  Sparkles,
  X,
} from 'lucide-react';
import { auth } from '@/lib/auth';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

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

  const handleExport = async () => {
    try {
      toast.info('Menyiapkan file Excel...');
      await api.exportBookingsExcel();
      toast.success('File Excel berhasil diunduh');
    } catch (e: any) {
      toast.error('Gagal unduh Excel: ' + (e.message || 'Error server'));
    }
  };

  const navItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/bookings',
      label: 'Manajemen Booking',
      icon: CalendarCheck,
    },
  ];

  const content = (
    <div className="flex flex-col h-full bg-silver-900 text-white border-r border-silver-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-silver-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center bg-silver-800 text-gold shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold tracking-wider text-white block leading-tight">
              PLATINUM
            </span>
            <span className="font-sans text-[9px] tracking-[0.2em] text-gold font-semibold uppercase block">
              Admin Portal
            </span>
          </div>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-silver-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <span className="text-[10px] font-bold tracking-widest text-silver-400 uppercase px-3 block mb-2">
          Menu Utama
        </span>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gold text-white shadow-gold'
                  : 'text-silver-300 hover:bg-silver-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Quick Export Action */}
        <div className="pt-4">
          <span className="text-[10px] font-bold tracking-widest text-silver-400 uppercase px-3 block mb-2">
            Laporan
          </span>
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-silver-800/80 hover:text-emerald-300 transition-all border border-emerald-500/20"
          >
            <FileSpreadsheet className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Export Data Excel</span>
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-silver-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs text-silver-400 hover:text-silver-200 hover:bg-silver-800/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website</span>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Portal</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-64 max-w-[80vw] h-full z-10 shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
