'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { PortfolioCard, type PortfolioCardData } from './portfolio-card';
import { StatePanel } from './state-panel';

export function PortfolioDirectory({ kind }: { kind: 'PROJECT' | 'SERVICE' }) {
  const [items, setItems] = useState<PortfolioCardData[]>([]); const [query, setQuery] = useState(''); const [teamOnly, setTeamOnly] = useState(false); const [error, setError] = useState(''); const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); api<PortfolioCardData[]>(`/portfolio?kind=${kind}`).then((rows) => { setItems(rows); setError(''); }).catch((cause) => setError(cause.message)).finally(() => setLoading(false)); }, [kind]);
  const filtered = useMemo(() => items.filter((item) => (!teamOnly || item.lookingForTeam) && (!query.trim() || `${item.title} ${item.summary} ${item.owner.displayName} ${item.community?.name ?? ''}`.toLowerCase().includes(query.trim().toLowerCase()))), [items, query, teamOnly]);
  return <div className="portfolio-directory"><section className="section-hero compact-hero"><div><span className="eyebrow">Проверяемый профиль работы</span><h1>{kind === 'PROJECT' ? 'Проекты' : 'Услуги'}</h1><p>{kind === 'PROJECT' ? 'Действующие проекты, дневники разработки и поиск команды.' : 'Услуги авторов с привязкой к профилю и подтверждённым взаимодействиям.'}</p></div><Link className="button" href="/portfolio">Добавить своё</Link></section><div className="directory-toolbar"><label className="search-field"><span className="visually-hidden">Поиск</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={kind === 'PROJECT' ? 'Название, автор или сообщество' : 'Услуга, специалист или сообщество'}/></label>{kind === 'PROJECT' && <label className="form-check"><input className="form-check-input" type="checkbox" checked={teamOnly} onChange={(event) => setTeamOnly(event.target.checked)}/><span className="form-check-label">Только ищущие команду</span></label>}</div>{loading ? <StatePanel kind="loading" title="Загрузка каталога"/> : error ? <StatePanel kind="error" title="Каталог недоступен"><p>{error}</p></StatePanel> : filtered.length ? <section className="portfolio-grid">{filtered.map((item) => <PortfolioCard item={item} key={item.id}/>)}</section> : <StatePanel title="Ничего не найдено"><p>Измените запрос или откройте каталог без фильтра.</p></StatePanel>}</div>;
}
