import Link from 'next/link';
import { Avatar } from '../avatar';
import { formatCount } from './utils';
import type { HomeOverview } from './types';
import type { PublicationCardData } from '@/lib/types';
export function CommunityPanels({overview,unavailable,news}:{overview?:HomeOverview;unavailable:boolean;news:PublicationCardData[]}) {
 const topics=overview?.pulse?.activeTopics?.slice(0,5) ?? [];
 const authors=overview?.weekly?.activity?.slice(0,5) ?? [];
 return <aside className="forum-right" aria-label="Обзор сообщества">
  <section className="forum-panel forum-topics-ranking"><header><h2>Сейчас обсуждают</h2></header><p className="forum-ranking-note">Новые ответы за последние 24 часа</p>
   {unavailable ? <p className="forum-muted">Не удалось обновить рейтинг.</p> : topics.length ? <ol className="forum-topic-ranking">{topics.map(topic=><li key={topic.slug}><Link href={`/p/${topic.slug}`}><span>{topic.title || 'Обсуждение'}</span><small title="Ответы за 24 часа">{formatCount(topic.replyCount)} ответ.</small></Link></li>)}</ol> : <div className="forum-empty-action"><p>За сутки новых ответов пока нет.</p><Link href="/?tab=unanswered">Помочь с вопросом →</Link></div>}
  </section>
  <section className="forum-panel"><header><h2>Люди недели <small>за 7 дней</small></h2></header><p className="forum-ranking-note">По числу тем и ответов</p>
   {unavailable ? <p className="forum-muted">Рейтинг временно недоступен.</p> : authors.length ? <ol className="forum-author-ranking">{authors.map((person,index)=><li key={person.username}><span className="forum-rank">{index+1}</span><Link href={`/u/${person.username}`}><Avatar name={person.displayName} url={person.avatarUrl} size={30}/><strong>{person.displayName}</strong></Link><small>{person.topicCount + person.commentCount}<span> публикаций</span></small></li>)}</ol> : <div className="forum-empty-action"><p>Поделитесь первой работой или помогите с вопросом — так начинается сообщество.</p><Link href="/create?intent=result">Показать свой AI-проект →</Link></div>}
  </section>
  <section className="forum-panel forum-news"><header><h2>Объявления FORRUM</h2><Link href="/news">Все →</Link></header>{news.length ? news.slice(0,3).map(item=><Link key={item.id} href={`/p/${item.slug}`}><strong>{item.title || 'Новость FORRUM'}</strong><time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString('ru-RU',{day:'numeric',month:'long'})}</time></Link>) : <p className="forum-muted">Объявлений пока нет.</p>}</section>

 </aside>;
}
