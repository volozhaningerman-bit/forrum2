import type { MetadataRoute } from 'next';

const routes = [
  '',
  '/communities',
  '/applications',
  '/digital-services',
  '/services',
  '/events',
  '/projects',
  '/rules',
  '/support',
  '/search',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path, index) => ({
    url: `https://4rrum.ru${path}`,
    lastModified: now,
    changeFrequency: index === 0 ? 'hourly' : 'daily',
    priority: index === 0 ? 1 : 0.7,
  }));
}
