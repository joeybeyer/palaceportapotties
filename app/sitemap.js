import { getAllLocations } from '@/lib/db';

export const runtime = 'edge';

export default async function sitemap() {
  const locations = await getAllLocations();
  const base = 'https://palaceportapotties.com';

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...locations.map((loc) => ({
      url: `${base}/${loc.slug}/`,
      lastModified: new Date(loc.updated_at || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.9,
    })),
  ];
}
