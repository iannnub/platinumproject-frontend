import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://platinumproject.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Platinum Project - Dekorasi Pernikahan & Wedding Decoration',
    template: '%s | Platinum Project',
  },
  description:
    'Layanan dekorasi pernikahan terbaik. Paket Rumah, Layos, Gedung & Lamaran dengan artificial premium flowers dan denah 2D terencana. Booking online mudah via WhatsApp.',
  keywords: [
    'dekorasi pernikahan',
    'wedding decoration',
    'platinum project',
    'dekor pelaminan',
    'vendor dekorasi',
    'paket dekorasi wedding murah',
    'dekorasi tenda layos',
  ],
  authors: [{ name: 'Platinum Project', url: baseUrl }],
  creator: 'Platinum Project',
  publisher: 'Platinum Project',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: baseUrl,
    siteName: 'Platinum Project',
    title: 'Platinum Project - Luxury Wedding Decoration',
    description:
      'Mewujudkan dekorasi pernikahan impian Anda dengan estetika Silver & Gold, Artificial Premium Flowers, dan Desain 2D terencana.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platinum Project - Luxury Wedding Decoration',
    description:
      'Layanan dekorasi pernikahan premium. Survei lokasi, bunga premium, dan paket lengkap.',
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col bg-silver-900 text-silver-100">
        <JsonLd />
        <Toaster position="top-right" richColors />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
