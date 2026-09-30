import type { Metadata } from 'next';
import Link from 'next/link';
export default function DigitalServicesPage() {
 return <section className="card"><span className="eyebrow">Сервисы 4rrum</span><h1>Цифровые сервисы</h1>
 <p>Здесь появится каталог онлайн-сервисов и полезных инструментов. Раздел готовится к открытию.</p>
 <div className="directory-shortcuts"><Link href="/projects">Посмотреть проекты участников →</Link><Link href="/create">Предложить сервис →</Link></div></section>;
}
export const metadata: Metadata = {
  title: 'Цифровые сервисы',
  description: 'Цифровые сервисы и полезные инструменты сообщества 4rrum.',
  alternates: { canonical: '/digital-services' },
  openGraph: { url: '/digital-services', title: 'Цифровые сервисы', description: 'Цифровые сервисы и полезные инструменты сообщества 4rrum.' },
};

