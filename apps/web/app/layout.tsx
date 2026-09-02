import type { Metadata } from 'next';
import './globals.css';
import './home-v20.css';
import './home-v21.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
export const metadata: Metadata = { title: '4RRUM — тестовая версия', description: 'Платформа сообществ, публикаций, проектов и живого общения.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><a className="skip-link" href="#main-content">Перейти к содержимому</a><SiteHeader/><div className="app-page-frame"><main id="main-content" className="shell main" tabIndex={-1}>{children}</main><SiteFooter/></div></body></html>;
}
