import type { Metadata } from 'next';
import { PortfolioDirectory } from '@/components/portfolio-directory';
export default function ServicesPage() { return <PortfolioDirectory kind="SERVICE"/>; }
export const metadata: Metadata = {
  title: 'Услуги',
  description: 'Услуги специалистов и участников 4rrum.',
  alternates: { canonical: '/services' },
  openGraph: { url: '/services', title: 'Услуги', description: 'Услуги специалистов и участников 4rrum.' },
};

