import type { Metadata } from 'next';
import { PortfolioDirectory } from '@/components/portfolio-directory';
export default function ProjectsPage() { return <PortfolioDirectory kind="PROJECT"/>; }
export const metadata: Metadata = {
  title: 'Проекты',
  description: 'Проекты участников и команд 4rrum.',
  alternates: { canonical: '/projects' },
  openGraph: { url: '/projects', title: 'Проекты', description: 'Проекты участников и команд 4rrum.' },
};

