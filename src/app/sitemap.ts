import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vngrouptourist.com';

const staticPages: MetadataRoute.Sitemap = [
  { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
  { url: `${siteUrl}/tours/international`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  { url: `${siteUrl}/tours/domestic`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  { url: `${siteUrl}/tours/luxury`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${siteUrl}/tours/group`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${siteUrl}/tours/inbound`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${siteUrl}/tours/spring`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${siteUrl}/tours/summer`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${siteUrl}/tours/autumn`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${siteUrl}/tours/winter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${siteUrl}/tours/holiday`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${siteUrl}/tours/mini-group`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${siteUrl}/tours/no-shopping`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${siteUrl}/tours/promotion`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  { url: `${siteUrl}/hot-combo`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${siteUrl}/visa-page`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${siteUrl}/guide-page`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  { url: `${siteUrl}/about-page`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${siteUrl}/contact-page`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${siteUrl}/promotions`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let tourPages: MetadataRoute.Sitemap = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://lekhacduy.io.vn/api';
    const res = await fetch(`${apiUrl}/tours?limit=1000`, { next: { revalidate: 3600 } });
    const json = await res.json();
    const tours: any[] = json.data || json || [];

    tourPages = tours
      .filter((t: any) => t.slug || t.tour_code)
      .map((t: any) => ({
        url: `${siteUrl}/tours/${encodeURIComponent(t.slug || t.tour_code)}`,
        lastModified: new Date(t.updated_at || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch {
    // Fallback: just static pages if API fails
  }

  return [...staticPages, ...tourPages];
}
