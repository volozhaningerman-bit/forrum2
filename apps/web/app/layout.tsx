import type { Metadata, Viewport } from 'next';
import './globals.css';
import './home.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const siteUrl = new URL('https://4rrum.ru');

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: '4rrum',
  title: {
    default: '4rrum — технологии, люди, идеи',
    template: '%s — 4rrum',
  },
  description: 'Форум о технологиях, сообществах, проектах и практическом опыте. Обсуждения, вопросы, идеи и живое общение.',
  keywords: ['форум', 'технологии', 'сообщества', 'проекты', 'разработка', '4rrum'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: '4rrum',
    title: '4rrum — технологии, люди, идеи',
    description: 'Форум о технологиях, сообществах, проектах и практическом опыте.',
    images: [{ url: '/forrum-assets/hero-planet.svg', width: 1600, height: 420, alt: '4rrum' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '4rrum — технологии, люди, идеи',
    description: 'Форум о технологиях, сообществах, проектах и практическом опыте.',
    images: ['/forrum-assets/hero-planet.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#070809',
  width: 'device-width',
  initialScale: 1,
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '4rrum',
  url: 'https://4rrum.ru/',
  inLanguage: 'ru',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://4rrum.ru/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" className="dark" data-forrum-theme="graphite" style={{colorScheme: 'dark'}}>
    <body>
      <a className="skip-link" href="#main-content">Перейти к содержимому</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <SiteHeader/>
      <div className="app-page-frame">
        <main id="main-content" className="shell main" tabIndex={-1}>{children}</main>
        <SiteFooter/>
      </div>
    </body>
  </html>;
}
