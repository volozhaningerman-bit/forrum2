import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
export const metadata: Metadata = { title: 'FORRUM — тестовая версия', description: 'Платформа сообществ, публикаций, проектов и живого общения.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body><a className="skip-link" href="#main-content">Перейти к содержимому</a><SiteHeader/><main id="main-content" className="shell main" tabIndex={-1}>{children}</main></body></html>;
}
