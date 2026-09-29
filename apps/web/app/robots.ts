import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/messages/',
        '/notifications/',
        '/settings/',
        '/wallet/',
        '/interactions/',
      ],
    },
    sitemap: 'https://4rrum.ru/sitemap.xml',
    host: 'https://4rrum.ru',
  };
}
