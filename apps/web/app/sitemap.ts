import type { MetadataRoute } from 'next';

const publicRoutes = [
  '/',
  '/communities',
  '/applications',
  '/digital-services',
  '/services',
  '/news',
  '/events',
  '/rules',
  '/search',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return publicRoutes.map((route) => ({
    url: `https://4rrum.ru${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route === '/communities' ? 0.9 : 0.7,
  }));
}
