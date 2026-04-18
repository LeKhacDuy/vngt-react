// src/components/common/JsonLd.tsx
// Inject JSON-LD structured data into <head> for rich results in Google

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- Pre-built schema helpers ---

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vngrouptourist.com';

/** TravelAgency schema for the whole site */
export const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'VNGroup Tourist',
  url: siteUrl,
  logo: `${siteUrl}/images/b86a4bce511594545df567494e2a23251eb424c7.png`,
  description:
    'Công ty du lịch uy tín tại TP.HCM. Chuyên tổ chức tour trong nước, quốc tế, MICE, visa và vé máy bay.',
  telephone: '+84-931-867-376',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hồ Chí Minh',
    addressCountry: 'VN',
  },
  sameAs: [
    'https://www.facebook.com/vngrouptourist',
  ],
  priceRange: '$$',
};

/** Tour detail schema */
export function tourSchema(tour: {
  name: string;
  description: string;
  image: string;
  slug: string;
  price: string;
  duration: number;
  destination: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.name,
    description: tour.description,
    image: tour.image,
    url: `${siteUrl}/tours/${tour.slug}`,
    touristType: 'Family, Couple, Group',
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: tour.duration,
    },
    offers: {
      '@type': 'Offer',
      price: tour.price.replace(/[^\d]/g, ''),
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/tours/${tour.slug}`,
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'VNGroup Tourist',
      url: siteUrl,
    },
  };
}
