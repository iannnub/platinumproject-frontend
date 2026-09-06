import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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

export const metadata: Metadata = {
  title: 'Platinum Project - Luxury Wedding Decoration Bali',
  description:
    'Layanan dekorasi pernikahan premium di Bali. Desain 2D terencana, artificial premium flowers, survei lokasi, dan paket dekorasi Rumah, Layos, Gedung, hingga Lamaran.',
  keywords: [
    'dekorasi pernikahan bali',
    'wedding decoration bali',
    'platinum project bali',
    'dekorasi pelaminan bali',
    'dekorasi tenda layos bali',
  ],
  icons: {
    icon: '/logo.svg',
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
        <Toaster position="top-right" richColors />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
