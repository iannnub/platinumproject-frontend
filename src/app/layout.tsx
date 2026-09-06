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
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://platinumproject.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Platinum Project - Dekorasi Pernikahan & Wedding Decoration Bali',
    template: '%s | Platinum Project Bali',
  },
  description:
    'Layanan dekorasi pernikahan terbaik di Bali. Paket Rumah, Layos, Gedung & Lamaran dengan artificial premium flowers dan denah 2D terencana. Booking online mudah via WhatsApp.',
  keywords: [
    'dekorasi pernikahan bali',
    'wedding decoration bali',
    'platinum project bali',
    'dekor pelaminan bali',
    'vendor dekorasi bali',
    'paket dekorasi wedding murah bali',
    'dekorasi tenda layos bali',
  ],
  authors: [{ name: 'Platinum Project Bali', url: baseUrl }],
  creator: 'Platinum Project Bali',
  publisher: 'Platinum Project Bali',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: baseUrl,
    siteName: 'Platinum Project Bali',
    title: 'Platinum Project - Luxury Wedding Decoration Bali',
    description:
      'Mewujudkan dekorasi pernikahan impian Anda di Bali dengan estetika Silver & Gold, Artificial Premium Flowers, dan Desain 2D terencana.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platinum Project - Luxury Wedding Decoration Bali',
    description:
      'Layanan dekorasi pernikahan premium di Bali. Survei lokasi, bunga premium, dan paket lengkap.',
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
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[#FAFAFA] text-silver-800">
        <JsonLd />
        <Toaster position="top-right" richColors />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
