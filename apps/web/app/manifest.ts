import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '4rrum',
    short_name: '4rrum',
    description: 'Форум о технологиях, сообществах, проектах и практическом опыте.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070809',
    theme_color: '#070809',
    lang: 'ru',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
