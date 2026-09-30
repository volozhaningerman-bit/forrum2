import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/activity/',
          '/welcome',
          '/verify-email',
          '/register',
          '/login',
          '/create',
          '/forgot-password',
          '/reset-password',
          '/communities/curators',
          '/api/',
          '/messages/',
          '/notifications/',
          '/settings/',
          '/wallet/',
          '/saved/',
          '/subscriptions/',
          '/interactions/',
        ],
      },
    ],
    sitemap: 'https://4rrum.ru/sitemap.xml',
    host: 'https://4rrum.ru',
  };
}
