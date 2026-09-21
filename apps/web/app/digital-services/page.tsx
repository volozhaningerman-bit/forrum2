import Link from 'next/link';
export default function DigitalServicesPage() {
 return <section className="card"><span className="eyebrow">Сервисы 4rrum</span><h1>Цифровые сервисы</h1>
 <p>Здесь появится каталог онлайн-сервисов и полезных инструментов. Раздел готовится к открытию.</p>
 <div className="directory-shortcuts"><Link href="/projects">Посмотреть проекты участников →</Link><Link href="/create">Предложить сервис →</Link></div></section>;
}
