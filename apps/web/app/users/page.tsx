import type { Metadata } from 'next';
import { UserRanking } from './user-ranking';
export const metadata:Metadata={title:'Рейтинг пользователей',description:'Участники 4rrum: рейтинг по сообщениям и симпатиям за неделю, месяц и всё время.',alternates:{canonical:'/users'},openGraph:{url:'/users',title:'Рейтинг пользователей — 4rrum'}};
export default function Users(){return <section className="page-panel"><h1>Рейтинг пользователей</h1><p className="muted">Реальная активность участников: опубликованные темы и ответы или симпатии к темам.</p><UserRanking/></section>;}
