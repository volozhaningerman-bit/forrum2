import type { MetadataRoute } from 'next';

const routes = [
  '',
  '/communities',
  '/applications',
  '/digital-services',
  '/services',
  '/events',
  '/news',
  '/projects',
  '/rules',
  '/support',
  '/search',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path, index) => ({
    url: `https://4rrum.ru${path}`,
    changeFrequency: index === 0 ? 'hourly' : 'daily',
    priority: index === 0 ? 1 : 0.7,
  }));
}
