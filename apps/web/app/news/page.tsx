'use client';
import { useEffect,useState } from 'react';
import { api } from '@/lib/api';
import { PublicationCard } from '@/components/publication-card';
import type { PublicationCardData } from '@/lib/types';
export default function NewsPage(){const[items,setItems]=useState<PublicationCardData[]>([]);const[error,setError]=useState('');useEffect(()=>{api<PublicationCardData[]>('/news').then(setItems).catch(e=>setError(e.message));},[]);return <><section className="section-hero"><span className="eyebrow">FORRUM</span><h1>Новости сообществ</h1><p>Одна новость принадлежит своему сообществу и одновременно попадает сюда. Обновления не дублируются, а обсуждение остаётся единым.</p></section>{error&&<div className="error-box rich-empty">{error}</div>}<div className="publication-list spacious-list rich-empty">{items.map(item=><PublicationCard key={item.id} item={item}/>)}{!items.length&&!error&&<div className="empty-state">Новостей пока нет. Создайте публикацию типа «Новость» в нужном сообществе.</div>}</div></>}
