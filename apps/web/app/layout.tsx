import type { Metadata } from 'next';
import './globals.css';
import './home.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://4rrum.ru'),
  applicationName: '4rrum',
  title: {
    default: '4rrum — технологии, люди, идеи',
    template: '%s | 4rrum',
  },
  description: 'Форум о технологиях, проектах, сообществах и практическом опыте. Обсуждаем, делимся и развиваемся вместе.',
  alternates: {
    canonical: '/',
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
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://4rrum.ru/',
    siteName: '4rrum',
    title: '4rrum — технологии, люди, идеи',
    description: 'Форум о технологиях, проектах, сообществах и практическом опыте.',
  },
  twitter: {
    card: 'summary',
    title: '4rrum — технологии, люди, идеи',
    description: 'Форум о технологиях, проектах, сообществах и практическом опыте.',
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" className="dark" data-forrum-theme="graphite" style={{colorScheme: 'dark'}}><body><a className="skip-link" href="#main-content">Перейти к содержимому</a><SiteHeader/><div className="app-page-frame"><main id="main-content" className="shell main" tabIndex={-1}>{children}</main><SiteFooter/></div></body></html>;
}
