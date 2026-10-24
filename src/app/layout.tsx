import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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
      <body className="font-sans antialiased min-h-screen flex flex-col bg-silver-900 text-silver-100">
        <WebVitalsReporter />
        <JsonLd />
        <Toaster position="top-right" richColors />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
