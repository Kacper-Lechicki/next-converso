import { MetadataRoute } from 'next';

import { env } from '@/config/env';
import { POPULAR_COMPANIONS } from '@/mocks/companions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_APP_URL;

  const routes = [
    '',
    '/companions',
    '/my-journey',
    '/subscription',
    '/sign-in',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const companions = POPULAR_COMPANIONS.map((companion) => ({
    url: `${baseUrl}/companions/${companion.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...companions];
}
