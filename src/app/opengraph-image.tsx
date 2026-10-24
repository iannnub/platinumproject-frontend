import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Platinum Project - Vendor Dekorasi Pernikahan';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#141414',
          padding: '60px 80px',
          position: 'relative',
          fontFamily: 'sans-serif',
          border: '12px solid #1F1F1F',
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            right: '24px',
            bottom: '24px',
            border: '2px solid rgba(212, 175, 55, 0.4)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              padding: '6px 16px',
              backgroundColor: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid #D4AF37',
              color: '#D4AF37',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '3px',
              borderRadius: '4px',
              width: 'auto',
              alignSelf: 'flex-start',
            }}
          >
            WEDDING DECORATION SPECIALIST
          </div>

          <div
            style={{
              fontSize: '62px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '2px',
              marginTop: '16px',
              display: 'flex',
              gap: '14px',
            }}
          >
            <span>PLATINUM</span>
            <span style={{ color: '#D4AF37' }}>PROJECT</span>
          </div>

          <div
            style={{
              fontSize: '22px',
              color: '#CCCCCC',
              maxWidth: '960px',
              lineHeight: 1.4,
              marginTop: '16px',
            }}
          >
            Mewujudkan Dekorasi Pernikahan Impian Anda. Pilihan 13 Paket Lengkap:
            Rumah, Tenda Layos, Gedung & Lamaran.
          </div>

          <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
            <div
              style={{
                padding: '8px 18px',
                backgroundColor: '#1F1F1F',
                border: '1px solid #333333',
                color: '#E0E0E0',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '6px',
              }}
            >
              ✨ 13 Paket Lengkap
            </div>
            <div
              style={{
                padding: '8px 18px',
                backgroundColor: '#1F1F1F',
                border: '1px solid #333333',
                color: '#E0E0E0',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '6px',
              }}
            >
              🌸 Bunga Artificial & Fresh Premium
            </div>
            <div
              style={{
                padding: '8px 18px',
                backgroundColor: '#1F1F1F',
                border: '1px solid #333333',
                color: '#E0E0E0',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '6px',
              }}
            >
              📱 Booking Resmi via WhatsApp
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #2A2A2A',
            paddingTop: '20px',
          }}
        >
          <div
            style={{
              color: '#D4AF37',
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            https://platinumproject.vercel.app
          </div>
          <div style={{ color: '#888888', fontSize: '16px' }}>
            Batang • Pekalongan • Jawa Tengah
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
