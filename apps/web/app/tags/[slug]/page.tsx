'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { PublicationCard } from '@/components/publication-card';
import { StatePanel } from '@/components/state-panel';
import type { PublicationCardData, Tag } from '@/lib/types';

type TagPage = Tag & { publicationCount: number; subscriberCount: number; isSubscribed: boolean; publications: PublicationCardData[] };

export default function TagPage() {
  const { slug } = useParams<{ slug: string }>();
  const [tag, setTag] = useState<TagPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoading(true); setError('');
    try { setTag(await api<TagPage>(`/tags/${slug}`)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить хэштег'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, [slug]);

  async function toggle() {
    if (!tag) return;
    setBusy(true); setError('');
    try { await api(`/tags/${tag.slug}/subscribe`, { method: tag.isSubscribed ? 'DELETE' : 'POST' }); await load(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Войдите в подтверждённый аккаунт, чтобы подписаться'); }
    finally { setBusy(false); }
  }

  if (loading) return <StatePanel kind="loading" title="Загружаем хэштег">Собираем публикации из разных сообществ.</StatePanel>;
  if (!tag) return <StatePanel kind="error" title="Хэштег не открыт" action={<button type="button" className="button ghost small" onClick={load}>Повторить</button>}>{error}</StatePanel>;

  return <div className="tag-page">
    <header className="card tag-page-header" style={{ '--tag-background': tag.styleEnabled ? tag.backgroundColor : undefined, '--tag-color': tag.styleEnabled ? tag.textColor : undefined, '--tag-border': tag.styleEnabled ? tag.borderColor : undefined } as CSSProperties}>
      <div><span className="auth-eyebrow">Хэштег</span><h1>#{tag.label}</h1><p className="muted">Материалы с этой меткой из всех сообществ FORRUM.</p><div className="community-meta"><span>{tag.publicationCount} публикаций</span><span>{tag.subscriberCount} подписчиков</span></div></div>
      <button type="button" className={`button ${tag.isSubscribed ? 'secondary' : ''}`} disabled={busy} onClick={toggle}>{busy ? 'Сохраняем…' : tag.isSubscribed ? 'Вы подписаны' : 'Подписаться'}</button>
    </header>
    {error && <div className="error-box">{error}</div>}
    <div className="feed-section-heading"><h2>Публикации</h2><Link href={`/search?q=${encodeURIComponent(`#${tag.slug}`)}`}>Открыть в поиске</Link></div>
    {tag.publications.length ? <div className="publication-list">{tag.publications.map((item) => <PublicationCard item={item} key={item.id}/>)}</div> : <StatePanel title="По этому хэштегу пока нет публикаций" action={<Link className="button ghost small" href="/create">Создать материал</Link>}>Добавьте метку в пост или постоянную тему.</StatePanel>}
  </div>;
}
