import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DynamicIsland from '@/components/layout/DynamicIsland';
import JsonLd from '@/components/seo/JsonLd';
import WebVitalsReporter from '@/components/analytics/WebVitalsReporter';
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

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://platinumproject.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Platinum Project | Vendor Dekorasi Pernikahan & Wedding Decoration',
    template: '%s | Platinum Project',
  },
  description:
    'Vendor dekorasi pernikahan profesional di Batang, Pekalongan & sekitarnya. Pilihan 13 paket lengkap: Rumah, Tenda Layos, Gedung & Lamaran dengan bunga premium dan denah 2D terencana. Booking online mudah via WhatsApp.',
  keywords: [
    'dekorasi pernikahan',
    'wedding decoration',
    'platinum project',
    'dekor pelaminan',
    'vendor dekorasi pernikahan',
    'paket dekorasi wedding murah',
    'dekorasi tenda layos',
    'dekorasi pernikahan batang',
    'dekorasi pernikahan pekalongan',
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
    siteName: 'Platinum Project - Wedding Decoration',
    title: 'Platinum Project | Vendor Dekorasi Pernikahan & Wedding Decoration',
    description:
      'Mewujudkan dekorasi pernikahan impian Anda. Pilihan 13 paket lengkap: Rumah, Tenda Layos, Gedung & Lamaran dengan bunga premium dan denah 2D terencana. Booking online mudah via WhatsApp.',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        secureUrl: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Platinum Project - Vendor Dekorasi Pernikahan',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platinum Project | Vendor Dekorasi Pernikahan & Wedding Decoration',
    description:
      'Pilihan 13 paket lengkap dekorasi pernikahan: Rumah, Tenda Layos, Gedung & Lamaran. Booking online mudah via WhatsApp.',
    images: [`${baseUrl}/og-image.png`],
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
      <head>
        {/* Open Graph & Social Media Share Meta Tags (WhatsApp, FB, Twitter, Telegram) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://platinumproject.vercel.app/" />
        <meta property="og:site_name" content="Platinum Project - Wedding Decoration" />
        <meta property="og:title" content="Platinum Project | Vendor Dekorasi Pernikahan & Wedding Decoration" />
        <meta property="og:description" content="Mewujudkan dekorasi pernikahan impian Anda. Pilihan 13 paket lengkap: Rumah, Tenda Layos, Gedung & Lamaran dengan bunga premium dan denah 2D terencana. Booking online mudah via WhatsApp." />
        <meta property="og:image" content="https://platinumproject.vercel.app/og-image.png" />
        <meta property="og:image:secure_url" content="https://platinumproject.vercel.app/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Platinum Project - Vendor Dekorasi Pernikahan" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Platinum Project | Vendor Dekorasi Pernikahan & Wedding Decoration" />
        <meta name="twitter:description" content="Pilihan 13 paket lengkap dekorasi pernikahan: Rumah, Tenda Layos, Gedung & Lamaran. Booking online mudah via WhatsApp." />
        <meta name="twitter:image" content="https://platinumproject.vercel.app/og-image.png" />

        <link rel="preconnect" href="https://tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://nominatim.openstreetmap.org" />
        <link rel="preconnect" href="http://localhost:8000" />
        <link rel="dns-prefetch" href="http://localhost:8000" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                window.addEventListener('error', function(event) {
                  if (event && event.message && (event.message.indexOf("reading 'startTime'") !== -1 || event.message.indexOf("startTime") !== -1)) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    return true;
                  }
                }, true);
                window.addEventListener('unhandledrejection', function(event) {
                  if (event && event.reason && String(event.reason).indexOf("startTime") !== -1) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  }
                }, true);
                if (window.PerformanceObserver) {
                  try {
                    var origObserve = PerformanceObserver.prototype.observe;
                    PerformanceObserver.prototype.observe = function(options) {
                      try {
                        return origObserve.call(this, options);
                      } catch(e) {
                        return;
                      }
                    };
                  } catch(_) {}
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[#0C0C0E] text-zinc-100 relative overflow-x-hidden selection:bg-white/20 selection:text-white">
        {/* Apple Luminous Ambient Morphing Liquid Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none" aria-hidden="true">
          {/* Orb 1: Apple Desert Titanium Fluid Morph */}
          <div className="absolute -top-32 -left-32 w-[620px] h-[620px] bg-[radial-gradient(circle,rgba(212,197,176,0.22)_0%,rgba(160,140,120,0.06)_50%,transparent_70%)] rounded-full blur-[80px] animate-morph" />
          {/* Orb 2: Apple Sapphire Glass Fluid Morph Drift */}
          <div className="absolute top-1/4 -right-40 w-[680px] h-[680px] bg-[radial-gradient(circle,rgba(100,135,235,0.18)_0%,rgba(60,85,170,0.05)_50%,transparent_70%)] rounded-full blur-[90px] animate-morph-drift" />
          {/* Orb 3: Apple Rose Gold Titanium Ambient Fluid */}
          <div className="absolute -bottom-40 left-1/3 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(220,185,200,0.15)_0%,rgba(150,110,130,0.04)_50%,transparent_70%)] rounded-full blur-[85px] animate-morph" />
        </div>

        <WebVitalsReporter />
        <JsonLd />
        <Toaster position="top-right" richColors />
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <DynamicIsland />
        <Footer />
      </body>
    </html>
  );
}
