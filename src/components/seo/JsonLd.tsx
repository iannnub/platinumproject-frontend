export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://platinumproject.my.id/#localbusiness',
        name: 'Platinum Project',
        image: 'https://platinumproject.my.id/logo.svg',
        url: 'https://platinumproject.my.id',
        telephone: '+6285700751642',
        priceRange: 'Rp 1.000.000 - Rp 30.000.000',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Desa Cepoko RT 4 RW 2, Kec. Bandar',
          addressLocality: 'Bandar',
          addressRegion: 'Indonesia',
          postalCode: '80000',
          addressCountry: 'ID',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -8.409518,
          longitude: 115.188919,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '08:00',
          closes: '21:00',
        },
        sameAs: [
          'https://instagram.com/platinumproject.deco',
          'https://tiktok.com/@platinumproject.deco',
        ],
      },
      {
        '@type': 'Service',
        '@id': 'https://platinumproject.my.id/#service',
        name: 'Dekorasi Pernikahan',
        provider: {
          '@id': 'https://platinumproject.my.id/#localbusiness',
        },
        areaServed: {
          '@type': 'State',
          name: 'Bali',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Paket Dekorasi Pernikahan',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Paket Dekor Rumah (LITE, PURE, SWEET, LUXE)',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Paket Tenda Layos VIP',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Paket Ballroom Gedung',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
