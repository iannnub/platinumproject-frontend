'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Lock, Mail, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api';
import { auth } from '@/lib/auth';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@platinumproject.my.id');
  const [password, setPassword] = useState('PlatinumAdmin@2026');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email dan password wajib diisi');
      return;
    }

    setLoading(true);
    try {
      const response = await api.adminLogin({ email, password });
      auth.setSession(response.token, response.data);
      toast.success('Login Admin Berhasil!', {
        description: `Selamat datang, ${response.data.name}`,
      });
      router.push('/admin/dashboard');
    } catch (err: any) {
      toast.error('Gagal Masuk', {
        description: err.message || 'Email atau password salah.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-silver-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial sparkle */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center bg-silver-800 text-gold shadow-gold mx-auto">
          <Sparkles className="w-7 h-7" />
        </div>
        <h2 className="font-heading text-3xl font-bold tracking-wider text-white">
          PLATINUM PROJECT
        </h2>
        <p className="text-xs tracking-widest uppercase text-gold font-semibold">
          Portal Administrasi & Operasional
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-silver-800/90 backdrop-blur-md py-8 px-6 sm:px-10 rounded-2xl border border-silver-700 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-silver-300 block">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@platinumproject.my.id"
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm bg-silver-900 border border-silver-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-silver-300 block">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm bg-silver-900 border border-silver-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary !py-3.5 text-sm flex items-center justify-center gap-2 shadow-gold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Hint */}
          <div className="p-3 bg-silver-900/60 rounded-xl border border-silver-700/60 text-[11px] text-silver-400 space-y-1">
            <span className="font-semibold text-gold block">
              Kredensial Default Terisi:
            </span>
            <div className="font-mono text-silver-300">
              admin@platinumproject.my.id / PlatinumAdmin@2026
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-silver-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Utama Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
