'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Heading, Help, ErrorBox } from './ui';
export type Point = { date: string; users: number; publications: number; comments: number; contributors: number };
type Metric = { value: number; previous: number; delta: number; percent: number | null };
type Data = { confirmed:{value:number;previous:number};days: number; start: string; endExclusive: string; generatedAt: string; series: Point[]; totals: Record<'users' | 'publications' | 'comments', Metric> };
const dateLabel = (date: string) => new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', timeZone: 'UTC' });
function Chart({ series, metric, title, color }: { series: Point[]; metric: keyof Omit<Point, 'date'>; title: string; color: string }) {
  const max = Math.max(1, ...series.map(row => row[metric]));
  const [selected, setSelected] = useState<number | null>(null);
  const width = 600, height = 170;
  const x = (i: number) => 40 + i * (width - 60) / Math.max(1, series.length - 1);
  const y = (value: number) => height - 20 - value / max * (height - 40);
  const points = series.map((row, i) => `${x(i)},${y(row[metric])}`).join(' ');
  const current = selected === null ? null : series[selected];
  return <section className="adm-chart adm-panel"><div className="adm-card-title"><h2>{title}</h2><Help label={title}>{metric === 'contributors' ? 'Уникальные авторы опубликованных материалов и видимых ответов за день. Один человек считается один раз, даже если оставил несколько ответов. Это не число посетителей.' : 'Количество за каждый завершённый день по UTC. Скрытые материалы и ответы не учитываются. Регистрации включают существующие тестовые аккаунты.'}</Help></div>
    <div className="adm-chart-readout" aria-live="polite">{current ? `${dateLabel(current.date)}: ${current[metric]}` : 'Выберите точку, чтобы увидеть значение'}</div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${title}. Максимум ${max}. Точные значения доступны в таблице ниже.`}>
      {[0, 0.5, 1].map(ratio => <g key={ratio}><line x1="40" x2="580" y1={y(max * ratio)} y2={y(max * ratio)} stroke="var(--adm-line)" strokeDasharray="3 5"/><text x="30" y={y(max * ratio) + 4} textAnchor="end" fill="var(--adm-muted)" fontSize="11">{Number((max * ratio).toFixed(1))}</text></g>)}
      <polyline fill="none" stroke={color} strokeWidth="3" points={points}/>
      {series.map((row, i) => <circle key={row.date} cx={x(i)} cy={y(row[metric])} r={selected === i ? 6 : series.length > 30 ? 2 : 3} fill={color} onMouseEnter={() => setSelected(i)}><title>{dateLabel(row.date)}: {row[metric]}</title></circle>)}
    </svg><div className="adm-chart-axis"><span>{dateLabel(series[0]?.date)}</span><span>{dateLabel(series.at(-1)?.date ?? '')}</span></div>
    <label className="adm-chart-slider">День на графике<input type="range" min="0" max={series.length - 1} value={selected ?? 0} onChange={e => setSelected(Number(e.target.value))}/></label>
    {!series.some(row => row[metric] > 0) && <p className="adm-muted">За выбранный период событий нет.</p>}
  </section>;
}
export default function AnalyticsView({ compact = false }: { compact?: boolean }) {
  const [from,setFrom]=useState(''),[to,setTo]=useState(''),[range,setRange]=useState('');
  const [days, setDays] = useState(30), [refresh, setRefresh] = useState(0);
  const [data, setData] = useState<Data | null>(null), [error, setError] = useState('');
  useEffect(() => { let active = true; setData(null); setError(''); api<Data>(`/admin/analytics?days=${days}${range}`).then(v => { if (active) setData(v); }).catch(e => { if (active) setError(e.message); }); return () => { active = false; }; }, [days, refresh,range]);
  const fields = [['users', 'Новые пользователи', 'Все созданные аккаунты, включая тестовые. Удалённые аккаунты в истории не сохраняются.'], ['publications', 'Публикации', 'Материалы, созданные за период и имеющие статус «Опубликовано» сейчас.'], ['comments', 'Ответы', 'Видимые ответы к опубликованным материалам.']] as const;
  return <>{!compact && <Heading title="Аналитика" description="Как растёт сообщество и что участники публикуют."/>}<div className="adm-toolbar"><div className="adm-segments" aria-label="Период аналитики">{[7, 30, 90].map(value => <button key={value} aria-pressed={!range&&days === value} onClick={() => {setRange('');setDays(value);}}>{value} дней</button>)}</div><button className="adm-secondary" onClick={() => setRefresh(v => v + 1)}>Обновить</button></div>
    {!compact&&<form className="adm-filters" onSubmit={e=>{e.preventDefault();setRange(`&from=${from}&to=${to}`);}}><label>С даты<input type="date" required value={from} onChange={e=>setFrom(e.target.value)}/></label><label>По дату<input type="date" required value={to} onChange={e=>setTo(e.target.value)}/></label><button className="adm-secondary">Применить период</button>{data&&<button type="button" className="adm-secondary" onClick={()=>{const csv='Дата;Регистрации;Публикации;Ответы;Авторы\n'+data.series.map(r=>[r.date,r.users,r.publications,r.comments,r.contributors].join(';')).join('\n');const url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='forrum-analytics.csv';a.click();URL.revokeObjectURL(url);}}>Скачать CSV</button>}</form>}<p className="adm-muted">Завершённые дни по UTC. Сегодня не включено; сравнение с предыдущими {data?.days??days} днями.</p><ErrorBox error={error} retry={() => setRefresh(v => v + 1)}/>
    {!data && !error && <div className="adm-empty" role="status">Загружаем статистику…</div>}{data && <><div className="adm-metrics">{fields.map(([key, title, help]) => { const value = data.totals[key]; return <article className="adm-panel adm-metric" key={key}><div>{title} <Help label={title}>{help}</Help></div><strong>{value.value.toLocaleString('ru-RU')}</strong><span className={value.delta > 0 ? 'adm-positive' : 'adm-muted'}>{value.delta > 0 ? '+' : ''}{value.delta} к прошлому периоду{value.percent === null ? ' · база сравнения 0' : ` · ${value.percent > 0 ? '+' : ''}${value.percent}%`}</span></article>; })}</div><section className="adm-panel"><h2>Подтверждения почты</h2><strong>{data.confirmed?.value??0}</strong><p>Аккаунтов подтвердили почту за период. За предыдущий: {data.confirmed?.previous??0}. Это события подтверждения, а не конверсия зарегистрировавшихся за тот же период.</p></section><div className="adm-charts"><Chart series={data.series} metric="users" title="Прирост пользователей" color="var(--adm-accent)"/><Chart series={data.series} metric="comments" title="Активность в обсуждениях" color="var(--adm-blue)"/>{!compact && <><Chart series={data.series} metric="publications" title="Новые публикации" color="var(--adm-blue)"/><Chart series={data.series} metric="contributors" title="Авторы за день" color="var(--adm-accent)"/></>}</div>
      {!compact && <details className="adm-panel"><summary>Точные значения по дням</summary><div className="adm-table-wrap"><table><caption>Данные за {data.days} дней, UTC</caption><thead><tr><th>Дата</th><th>Регистрации</th><th>Публикации</th><th>Ответы</th><th>Авторы</th></tr></thead><tbody>{data.series.map(row => <tr key={row.date}><td>{dateLabel(row.date)}</td><td>{row.users}</td><td>{row.publications}</td><td>{row.comments}</td><td>{row.contributors}</td></tr>)}</tbody></table></div></details>}
      <p className="adm-muted">Получено {new Date(data.generatedAt).toLocaleString('ru-RU')}. Источник — база форума; удаление и скрытие записей меняет историю показателей.</p></>}
  </>;
}
