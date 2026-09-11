'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
type Plan={version:string;rows:{slug:string;name:string;parent:string|null;action:string}[]};
export default function TaxonomyPage(){
 const [plan,setPlan]=useState<Plan|null>(null),[busy,setBusy]=useState(false),[confirmed,setConfirmed]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('');
 async function load(){setError('');setConfirmed(false);try{setPlan(await api<Plan>('/admin/ai-taxonomy'));}catch(e){setError(e instanceof Error?e.message:'Не удалось загрузить структуру');}}
 useEffect(()=>{void load();},[]);
 async function apply(){if(!plan||!confirmed||busy)return;setBusy(true);setError('');try{await api('/admin/ai-taxonomy',{method:'POST',body:JSON.stringify({version:plan.version})});setMessage('Структура обновлена. Темы, адреса, подписки и вложенные разделы сохранены.');await load();}catch(e){setError(e instanceof Error?e.message:'Не удалось применить изменения');}finally{setBusy(false);}}
 const labels:Record<string,string>={create:'Создать',move:'Перенести',rename:'Переименовать',keep:'Сохранить'};
 return <div className="card"><Link href="/admin/home-banners">← Баннеры и главная</Link><h1>Категории AI-сообщества</h1><p>GTA RP вместе с подразделами переедет в «Видеоигры», Telegram — в «Код и автоматизация», проекты, продвижение и мастерская — в «Работа и бизнес». FORRUM Start получит название «Жизнь FORRUM».</p><p>Публикации и их адреса сохранятся. Права команды и ленты родительских сообществ будут учитывать новое дерево. Другие существующие разделы останутся на месте.</p>{error&&<p role="alert">{error}</p>}{message&&<p role="status">{message}</p>}<button type="button" disabled={busy} onClick={()=>void load()}>Обновить предварительный просмотр</button>{plan&&<><div style={{overflowX:'auto',margin:'20px 0'}}><table style={{width:'100%',textAlign:'left'}}><thead><tr><th>Раздел</th><th>Родитель</th><th>Действие</th></tr></thead><tbody>{plan.rows.map(row=><tr key={row.slug}><td style={{padding:'8px'}}>{row.name}</td><td>{plan.rows.find(n=>n.slug===row.parent)?.name??row.parent??'Верхний уровень'}</td><td>{labels[row.action]}</td></tr>)}</tbody></table></div><label><input type="checkbox" checked={confirmed} disabled={busy} onChange={e=>setConfirmed(e.target.checked)}/> Я проверил переносы и новую структуру</label><p><button type="button" className="button" disabled={!confirmed||busy} onClick={()=>void apply()}>{busy?'Применяем…':'Применить структуру'}</button></p></>}</div>;
}
