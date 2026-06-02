import { getAllLocations } from '@/lib/db';
import { USE_CASES } from '@/lib/useCases';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

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
    {
      url: `${base}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${base}/locations/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...locations.map((loc) => ({
      url: `${base}/${loc.slug}/`,
      lastModified: new Date(loc.updated_at || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.9,
    })),
    // Use-case hub pages
    ...USE_CASES.map((u) => ({
      url: `${base}/${u.hubSlug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    // Use-case x city combo pages
    ...USE_CASES.flatMap((u) =>
      locations.map((loc) => ({
        url: `${base}/${u.comboPrefix}-${loc.slug}/`,
        lastModified: new Date(loc.updated_at || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    ),
  ];
}
