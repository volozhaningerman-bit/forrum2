'use client';

import Link from 'next/link';
import type { CSSProperties, ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Avatar } from '@/components/avatar';
import { PublicationCard } from '@/components/publication-card';
import { MessageIcon, ShieldIcon, UsersIcon } from '@/components/icons';
import { formatRelativeTime } from '@/lib/format';
import type { PublicationCardData } from '@/lib/types';

type WallPost = {
  id: string; body: string; createdAt: string; canDelete: boolean;
  author: { username: string; displayName: string; avatarUrl?: string | null };
};

type LocalTrust = {
  level: 'NEW' | 'BASIC' | 'STABLE' | 'HIGH' | 'EXCEPTIONAL'; label: string; detail: string; evidence: string[];
  community: { id: string; slug: string; name: string };
  metrics: { publicationCount: number; commentCount: number; helpfulReactionCount: number; bookmarkCount: number; activeRole: boolean };
};

type Achievement = {
  id: string; code: string; title: string; description: string; icon: string; category: string; earnedAt: string;
  community: { slug: string; name: string } | null;
};

type RoleHistory = {
  id: string; type: 'GRANTED' | 'ENDED'; role: string; note: string | null; createdAt: string;
  community: { slug: string; name: string }; actor: { username: string; displayName: string } | null;
};

type ProfileReview = {
  id: string; verdict: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'; body: string; evidenceAttached: boolean; createdAt: string;
  author: { username: string; displayName: string; avatarUrl: string | null };
  interaction: { id: string; type: string; title: string; completedAt: string | null; community: { slug: string; name: string } | null; publication: { slug: string; title: string | null } | null };
};

type UsefulPublication = PublicationCardData & { helpfulReactionCount: number; bookmarkCount: number };
type UploadedMedia = { id: string; url: string; thumbnailUrl: string };
type WorkshopPortfolioItem = { id: string; type: string; title: string; description: string; previewMediaId: string | null; createdAt: string };
type Gift = { id: string; message: string | null; createdAt: string; sender: { username: string; displayName: string; avatarUrl: string | null }; gift: { id: string; title: string; description: string; previewMediaId: string | null } };
type WorkshopGift = { id: string; type: string; status: string; title: string; description: string; previewUrl: string | null; thumbnailUrl: string | null };

type ProfilePortfolioItem = { id: string; kind: 'PROJECT' | 'SERVICE'; status: string; title: string; summary: string; coverUrl: string | null; lookingForTeam: boolean; priceText: string | null; updatedAt: string; community: { slug: string; name: string; accentColor: string } | null; publication: { slug: string; title: string | null } | null; completedInteractionCount: number };

export type Profile = {
  id: string; forrumId: number; username: string; displayName: string; bio: string | null; avatarUrl: string | null; coverUrl: string | null;
  website: string | null; location: string | null; role: string; emailVerified: boolean; createdAt: string; isFollowing: boolean; isSelf: boolean;
  wallPrivacy: 'EVERYONE' | 'FOLLOWERS' | 'ONLY_ME'; showFavorites: boolean; showSubscriptions: boolean; wallRestricted: boolean; canWriteWall: boolean; canStartInteraction: boolean;
  counts: { followers: number; following: number; publications: number; comments: number; completedInteractions: number };
  trustSummary: { level: string; label: string; detail: string; community: { slug: string; name: string } | null };
  localTrust: LocalTrust[];
  roles: Array<{ id: string; role: string; note: string | null; startedAt: string; community: { slug: string; name: string } }>;
  roleHistory: RoleHistory[];
  communities: Array<{ slug: string; name: string }>;
  publications: PublicationCardData[]; usefulPublications: UsefulPublication[]; achievements: Achievement[];
  portfolio: ProfilePortfolioItem[]; workshopPortfolio: WorkshopPortfolioItem[]; gifts: Gift[]; reviews: ProfileReview[]; reviewSummary: { positive: number; neutral: number; negative: number }; wall: WallPost[];
};

type Tab = 'wall' | 'favorites' | 'portfolio' | 'publications' | 'achievements' | 'reviews' | 'gifts';

const roleNames: Record<string, string> = { OWNER: 'Владелец FORRUM', ADMIN: 'Администратор', USER: 'Пользователь' };
const communityRoleNames: Record<string, string> = { CURATOR: 'Куратор', ASSISTANT: 'Помощник', MODERATOR: 'Модератор' };
const verdictNames: Record<string, string> = { POSITIVE: 'Положительный', NEUTRAL: 'Нейтральный', NEGATIVE: 'Негативный' };
const interactionTypeNames: Record<string, string> = { SERVICE: 'Услуга', PROJECT: 'Совместный проект', DEAL: 'Сделка', HELP: 'Подтверждённая помощь' };
const workshopTypeNames: Record<string, string> = { GIFT: 'Подарок', REACTION: 'Реакция', BADGE: 'Значок', PROFILE_DECOR: 'Оформление профиля', COMMUNITY_DECOR: 'Оформление сообщества' };
const emojis = ['😀','😂','🔥','❤️','👍','👏','🎉','🤝','💡','🚀','👀','✨'];

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Не удалось прочитать изображение'));
    reader.readAsDataURL(file);
  });
}

function safeExternalImage(value: string) {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.toString() : null; }
  catch { return null; }
}

function WallContent({ body }: { body: string }) {
  const pattern = /\[\[(image|gif):(https:\/\/[^\]]+)\]\]/g;
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  for (const match of body.matchAll(pattern)) {
    const index = match.index ?? 0;
    const text = body.slice(cursor, index).trim();
    if (text) nodes.push(<p key={`text-${index}`}>{text}</p>);
    const url = safeExternalImage(match[2]);
    if (url) nodes.push(<img key={`media-${index}`} className={match[1] === 'gif' ? 'wall-gif' : 'wall-image'} src={url} alt="" loading="lazy"/>);
    cursor = index + match[0].length;
  }
  const tail = body.slice(cursor).trim();
  if (tail) nodes.push(<p key="text-tail">{tail}</p>);
  return <div className="content-body wall-post-body">{nodes.length ? nodes : body}</div>;
}

export function ProfileClient({
  username,
  initialData,
}: {
  username: string;
  initialData: Profile;
}) {
  const [profile, setProfile] =
    useState<Profile | null>(initialData);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [tab, setTab] = useState<Tab>('wall');
  const [wallText, setWallText] = useState('');
  const [wallImage, setWallImage] = useState<UploadedMedia | null>(null);
  const [gifUrl, setGifUrl] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [uploadingWall, setUploadingWall] = useState(false);
  const [submittingWall, setSubmittingWall] = useState(false);
  const [pendingWallDelete, setPendingWallDelete] = useState<WallPost | null>(null);
  const [interactionOpen, setInteractionOpen] = useState(false);
  const [submittingInteraction, setSubmittingInteraction] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftCatalog, setGiftCatalog] = useState<WorkshopGift[]>([]);
  const [loadingGifts, setLoadingGifts] = useState(false);
  const [sendingGift, setSendingGift] = useState(false);

  const load = async () => {
    try { setError(''); setProfile(await api<Profile>(`/users/${username}`)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить профиль'); }
  };
  useEffect(() => {
    setProfile(initialData);
    setError('');
  }, [initialData]);

  async function follow() {
    if (!profile) return;
    try {
      setError(''); await api(`/users/${username}/follow`, { method: profile.isFollowing ? 'DELETE' : 'POST' });
      setNotice(profile.isFollowing ? 'Подписка отменена' : 'Вы подписались на пользователя'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось изменить подписку'); }
  }

  function addEmoji(value: string) { setWallText((current) => `${current}${value}`); setShowEmoji(false); }

  async function uploadWallImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    if (!['image/png','image/jpeg','image/webp'].includes(file.type)) { setError('Разрешены PNG, JPEG и WebP'); return; }
    if (file.size > 8 * 1024 * 1024) { setError('Изображение должно быть не больше 8 МБ'); return; }
    setUploadingWall(true); setError('');
    try {
      setWallImage(await api<UploadedMedia>('/media', { method: 'POST', body: JSON.stringify({ kind: 'POST_IMAGE', originalName: file.name, dataUrl: await fileToDataUrl(file) }) }));
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить изображение'); }
    finally { setUploadingWall(false); }
  }

  async function publishWallPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const safeGif = gifUrl.trim() ? safeExternalImage(gifUrl.trim()) : null;
    if (gifUrl.trim() && !safeGif) { setError('GIF-ссылка должна начинаться с https://'); return; }
    const parts = [wallText.trim(), wallImage ? `[[image:${wallImage.url}]]` : '', safeGif ? `[[gif:${safeGif}]]` : ''].filter(Boolean);
    if (!parts.length) return;
    setSubmittingWall(true);
    try {
      setError(''); await api(`/users/${username}/wall`, { method: 'POST', body: JSON.stringify({ body: parts.join('\n\n') }) });
      setWallText(''); setWallImage(null); setGifUrl(''); setShowGif(false); setNotice('Запись опубликована'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось опубликовать запись'); }
    finally { setSubmittingWall(false); }
  }

  async function deleteWallPost() {
    if (!pendingWallDelete) return;
    try {
      setError(''); await api(`/users/${username}/wall/${pendingWallDelete.id}`, { method: 'DELETE' });
      setPendingWallDelete(null); setNotice('Запись удалена'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось удалить запись'); }
  }

  async function createInteraction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmittingInteraction(true); setError('');
    const form = new FormData(event.currentTarget);
    try {
      await api('/interactions', { method: 'POST', body: JSON.stringify({
        targetUsername: username, type: form.get('type'), title: form.get('title'), description: form.get('description'),
        communitySlug: form.get('communitySlug') || undefined, publicationSlug: form.get('publicationSlug') || undefined,
      }) });
      setInteractionOpen(false); setNotice('Запрос отправлен. Отзыв станет доступен только после подтверждения и завершения взаимодействия.');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось отправить запрос'); }
    finally { setSubmittingInteraction(false); }
  }

  async function openGiftPicker() {
    setGiftOpen(true); setLoadingGifts(true); setError('');
    try { const rows = await api<WorkshopGift[]>('/workshop'); setGiftCatalog(rows.filter((item) => item.type === 'GIFT' && item.status === 'PUBLISHED')); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить подарки'); }
    finally { setLoadingGifts(false); }
  }

  async function sendGift(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSendingGift(true); setError('');
    const form = new FormData(event.currentTarget);
    try {
      await api(`/users/${username}/gifts`, { method: 'POST', body: JSON.stringify({ workshopItemId: form.get('workshopItemId'), message: String(form.get('message') || '').trim() || undefined }) });
      setGiftOpen(false); setNotice('Подарок отправлен'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось отправить подарок'); }
    finally { setSendingGift(false); }
  }

  if (!profile) return <section className={error ? 'error-box' : 'profile-loading'}>{error || <><div className="skeleton wide"/><div className="skeleton medium"/><div className="skeleton tall"/></>}</section>;

  return <div className="profile-page-shell">
    <section className="profile-hero">
      <div className="profile-cover-modern" style={profile.coverUrl ? { backgroundImage: `url(${profile.coverUrl})` } : undefined}><span>FORRUM ID {profile.forrumId}</span></div>
      <div className="profile-main-card">
        <div className="profile-main-row">
          <Avatar name={profile.displayName} size={124} url={profile.avatarUrl}/>
          <div className="profile-title-block">
            <div className="profile-name-row"><h1>{profile.displayName}</h1>{profile.emailVerified && <span className="verified-account"><ShieldIcon/> Подтверждён</span>}</div>
            <p>@{profile.username} · {roleNames[profile.role] ?? profile.role}</p>
            {profile.bio ? <div className="profile-bio">{profile.bio}</div> : profile.isSelf && <p className="profile-bio-empty">Расскажите о себе, интересах и проектах — это помогает людям понять, чем вы занимаетесь.</p>}
            <div className="profile-meta-line">{profile.location && <span>{profile.location}</span>}<span>На FORRUM с {new Date(profile.createdAt).toLocaleDateString('ru-RU')}</span>{profile.website && <a href={profile.website} target="_blank" rel="noreferrer">Личный сайт ↗</a>}</div>
          </div>
          <div className="profile-actions-modern">{profile.isSelf ? <><Link className="button secondary" href="/settings">Настроить профиль</Link><Link className="button ghost" href="/interactions">Взаимодействия</Link></> : <><button type="button" className={`button ${profile.isFollowing ? 'secondary' : ''}`} onClick={follow}>{profile.isFollowing ? 'Вы подписаны' : 'Подписаться'}</button><Link className="button ghost" href={`/messages?to=${encodeURIComponent(profile.username)}`}><MessageIcon/> Написать</Link><button type="button" className="button ghost" onClick={() => void openGiftPicker()}>Подарить</button></>}</div>
        </div>
        <div className="profile-number-strip" aria-label="Статистика профиля">
          <button type="button" onClick={() => setTab('publications')}><strong>{profile.counts.publications}</strong><span>публикаций</span></button>
          <div><strong>{profile.counts.comments}</strong><span>ответов</span></div>
          <div><strong>{profile.counts.followers}</strong><span>подписчиков</span></div>
          <div><strong>{profile.achievements.length}</strong><span>достижений</span></div>
          <button type="button" onClick={() => setTab('reviews')}><strong>{profile.counts.completedInteractions}</strong><span>подтверждённых взаимодействий</span></button>
        </div>
      </div>
    </section>

    {notice && <div className="success-box" role="status">{notice}</div>}{error && <div className="error-box" role="alert">{error}</div>}

    <nav className="profile-tabs" aria-label="Разделы профиля">
      <button type="button" className={tab === 'wall' ? 'active' : ''} onClick={() => setTab('wall')}>Стена</button>
      {(profile.isSelf || profile.showFavorites) && <button type="button" className={tab === 'favorites' ? 'active' : ''} onClick={() => setTab('favorites')}>Избранное</button>}
      <button type="button" className={tab === 'portfolio' ? 'active' : ''} onClick={() => setTab('portfolio')}>Портфолио</button>
      <button type="button" className={tab === 'publications' ? 'active' : ''} onClick={() => setTab('publications')}>Публикации</button>
      <button type="button" className={tab === 'achievements' ? 'active' : ''} onClick={() => setTab('achievements')}>Достижения и роли</button>
      <button type="button" className={tab === 'reviews' ? 'active' : ''} onClick={() => setTab('reviews')}>Отзывы</button>
      <button type="button" className={tab === 'gifts' ? 'active' : ''} onClick={() => setTab('gifts')}>Подарки</button>
    </nav>

    <div className="profile-layout-modern">
      <main>
        {tab === 'wall' && <>
          {profile.canWriteWall && <section className="wall-composer-card"><div className="wall-composer-head"><Avatar name={profile.isSelf ? profile.displayName : 'Вы'} size={42} url={profile.isSelf ? profile.avatarUrl : null}/><div><strong>{profile.isSelf ? 'Новая запись на стене' : `Написать на стене ${profile.displayName}`}</strong><span>Текст, эмодзи, GIF или изображение</span></div></div><form onSubmit={publishWallPost}><textarea value={wallText} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setWallText(event.target.value)} maxLength={3000} placeholder="Что хотите рассказать?"/><div className="wall-composer-tools"><button type="button" className="composer-tool" onClick={() => setShowEmoji((value) => !value)}>☺ Эмодзи</button><button type="button" className="composer-tool" onClick={() => setShowGif((value) => !value)}>GIF</button><label className="composer-tool">{uploadingWall ? 'Загрузка…' : 'Фото'}<input className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp" disabled={uploadingWall} onChange={uploadWallImage}/></label></div>{showEmoji && <div className="emoji-picker">{emojis.map((emoji) => <button type="button" key={emoji} onClick={() => addEmoji(emoji)}>{emoji}</button>)}</div>}{showGif && <div className="gif-url-panel"><label>Ссылка на GIF<input type="url" value={gifUrl} onChange={(event) => setGifUrl(event.target.value)} placeholder="https://..."/></label><small>На первом этапе GIF добавляется безопасной HTTPS-ссылкой.</small></div>}{(wallImage || gifUrl.trim()) && <div className="wall-attachment-preview">{wallImage && <div><img src={wallImage.thumbnailUrl} alt="Загруженное изображение"/><button type="button" className="text-button" onClick={() => setWallImage(null)}>Удалить фото</button></div>}{gifUrl.trim() && <div><span>GIF будет добавлен к записи</span><button type="button" className="text-button" onClick={() => setGifUrl('')}>Удалить GIF</button></div>}</div>}<div className="composer-footer"><span>{wallText.length}/3000</span><button className="button" disabled={submittingWall || (!wallText.trim() && !wallImage && !gifUrl.trim())}>{submittingWall ? 'Публикуем…' : 'Опубликовать'}</button></div></form></section>}
          {profile.wallRestricted && <div className="empty-state"><strong>Стена закрыта</strong><span>Пользователь ограничил просмотр стены настройками приватности.</span></div>}
          <div className="profile-wall-feed">{profile.wall.map((post) => <article className="profile-wall-card" key={post.id}><Avatar name={post.author.displayName} size={44} url={post.author.avatarUrl}/><div><header><Link href={`/u/${post.author.username}`}><strong>{post.author.displayName}</strong></Link><span>@{post.author.username} · {formatRelativeTime(post.createdAt)}</span>{post.canDelete && <button type="button" className="wall-delete-action" onClick={() => setPendingWallDelete(post)}>Удалить</button>}</header><WallContent body={post.body}/>{pendingWallDelete?.id === post.id && <div className="inline-confirm"><span>Удалить эту запись?</span><button type="button" className="button small danger" onClick={deleteWallPost}>Удалить</button><button type="button" className="button ghost small" onClick={() => setPendingWallDelete(null)}>Отмена</button></div>}</div></article>)}{!profile.wallRestricted && !profile.wall.length && <div className="empty-state"><strong>Стена пока пустая</strong><span>Здесь будут появляться личные обновления и записи других пользователей.</span></div>}</div>
        </>}

        {tab === 'favorites' && <section className="profile-evidence-section"><div className="section-heading"><div><span className="eyebrow">Избранное</span><h2>Материалы, которые пользователь лайкнул или сохранил</h2><p>Реакции и закладки собраны в одном разделе. Видимость настраивается владельцем профиля.</p></div></div><div className="publication-list spacious-list">{profile.usefulPublications.map((item) => <div className="useful-publication-wrap" key={item.id}><div className="evidence-chips"><span>{item.helpfulReactionCount} полезных реакций</span><span>{item.bookmarkCount} сохранений</span></div><PublicationCard item={item}/></div>)}{!profile.usefulPublications.length && <div className="empty-state"><strong>Избранное пока пустое</strong><span>Здесь появятся материалы с реакциями и закладками.</span></div>}</div></section>}

        {tab === 'portfolio' && <section className="profile-portfolio-section"><div className="section-heading"><div><span className="eyebrow">Профиль работы</span><h2>Проекты и услуги</h2><p>Карточки связаны с профилем автора. Подтверждённые взаимодействия считаются отдельно и не заменяются красивым описанием.</p></div>{profile.isSelf && <Link className="button secondary small" href="/portfolio">Управлять</Link>}</div><div className="profile-portfolio-grid">{profile.portfolio.map((item) => <article className="profile-portfolio-card" key={item.id} style={{ '--portfolio-accent': item.community?.accentColor ?? '#3157D5' } as React.CSSProperties}>{item.coverUrl && <Link className="profile-portfolio-cover" href={`/portfolio/${item.id}`} style={{ backgroundImage: `url(${item.coverUrl})` }}/>}<div><div className="publication-topline"><span className="type-label">{item.kind === 'PROJECT' ? 'Проект' : 'Услуга'}</span>{item.lookingForTeam && <span className="portfolio-team-label">Ищет команду</span>}</div><h3><Link href={`/portfolio/${item.id}`}>{item.title}</Link></h3><p>{item.summary}</p><div className="portfolio-context">{item.community && <Link href={`/communities/${item.community.slug}`}>{item.community.name}</Link>}{item.priceText && <span>{item.priceText}</span>}{item.completedInteractionCount > 0 && <span>{item.completedInteractionCount} подтверждено</span>}</div></div></article>)}{!profile.portfolio.length && <div className="empty-state"><strong>Проектов и услуг пока нет</strong><span>{profile.isSelf ? 'Добавьте только то, что готовы показать и обсуждать.' : 'Пользователь пока не заполнил рабочее портфолио.'}</span>{profile.isSelf && <Link className="button small" href="/portfolio">Добавить карточку</Link>}</div>}</div></section>}

        {tab === 'publications' && <div className="publication-list spacious-list">{profile.publications.map((item) => <PublicationCard item={item} key={item.id}/>)}{!profile.publications.length && <div className="empty-state"><strong>Публикаций пока нет</strong><span>{profile.isSelf ? 'Создайте первый пост или постоянную тему.' : 'Пользователь ещё ничего не публиковал.'}</span>{profile.isSelf && <Link className="button small" href="/create">Создать публикацию</Link>}</div>}</div>}

        {tab === 'achievements' && <div className="profile-achievement-stack">
          <section><div className="section-heading"><div><span className="eyebrow">Достижения</span><h2>Подтверждённые события аккаунта</h2><p>Автоматические достижения выдаются только за проверяемые действия. Специальные — за зафиксированное участие в развитии платформы.</p></div></div><div className="achievement-grid">{profile.achievements.map((achievement) => <article className="achievement-card" key={achievement.id}><span>{achievement.icon}</span><div><strong>{achievement.title}</strong><p>{achievement.description}</p><small>{achievement.community ? `${achievement.community.name} · ` : ''}{new Date(achievement.earnedAt).toLocaleDateString('ru-RU')}</small></div></article>)}{!profile.achievements.length && <div className="empty-state"><strong>Достижений пока нет</strong><span>Они появятся после подтверждения аккаунта и проверяемого участия.</span></div>}</div></section>
          <section className="role-history-section"><div className="section-heading"><div><span className="eyebrow">История ответственности</span><h2>Роли в сообществах</h2><p>Назначение и завершение роли фиксируются отдельно, поэтому прошлый статус не выдаётся за действующий.</p></div></div><div className="role-history-list">{profile.roleHistory.map((event) => <article key={event.id}><span className={`role-event role-${event.type.toLowerCase()}`}>{event.type === 'GRANTED' ? 'Назначен' : 'Завершена'}</span><div><strong>{communityRoleNames[event.role] ?? event.role} · {event.community.name}</strong><p>{event.note || 'Без дополнительного комментария'}</p><small>{formatRelativeTime(event.createdAt)}{event.actor ? ` · решение: ${event.actor.displayName}` : ''}</small></div></article>)}{!profile.roleHistory.length && <div className="empty-state"><strong>Истории ролей пока нет</strong><span>Здесь будут отображаться подтверждённые назначения и завершения полномочий.</span></div>}</div></section>
        </div>}

        {tab === 'reviews' && <div className="profile-reviews-section">
          <section className="review-summary-card"><div><span className="eyebrow">Отзывы после факта</span><h2>Подтверждённые взаимодействия</h2><p>Отзыв нельзя оставить случайно: сначала оба пользователя подтверждают взаимодействие и отдельно отмечают его завершение.</p></div><div className="review-summary-numbers"><span><strong>{profile.reviewSummary.positive}</strong>положительных</span><span><strong>{profile.reviewSummary.neutral}</strong>нейтральных</span><span><strong>{profile.reviewSummary.negative}</strong>негативных</span></div></section>
          {profile.isSelf && <div className="notice"><span>Управляйте запросами, подтверждением завершения и своими отзывами в отдельном разделе.</span><Link className="button secondary small" href="/interactions">Открыть взаимодействия</Link></div>}
          {!profile.isSelf && profile.canStartInteraction && <section className="interaction-request-card">{interactionOpen ? <form onSubmit={createInteraction}><div className="compact-heading"><div><h3>Зафиксировать взаимодействие с {profile.displayName}</h3><p className="muted">Запрос ничего не доказывает сам по себе. Второй участник должен его подтвердить.</p></div><button type="button" className="text-button" onClick={() => setInteractionOpen(false)}>Закрыть</button></div><label>Тип<select name="type" defaultValue="HELP"><option value="HELP">Подтверждённая помощь</option><option value="PROJECT">Совместный проект</option><option value="SERVICE">Услуга</option><option value="DEAL">Сделка</option></select></label><label>Краткое название<input name="title" minLength={4} maxLength={140} placeholder="Например, помог настроить проект" required/></label><label>Что произошло<textarea name="description" minLength={10} maxLength={2000} placeholder="Опишите конкретный результат без личных и платёжных данных" required/></label><label>Сообщество <span className="optional-label">необязательно</span><select name="communitySlug" defaultValue=""><option value="">Без привязки</option>{profile.communities.map((community) => <option value={community.slug} key={community.slug}>{community.name}</option>)}</select></label><label>Адрес публикации <span className="optional-label">необязательно</span><input name="publicationSlug" placeholder="slug-публикации"/></label><button className="button" disabled={submittingInteraction}>{submittingInteraction ? 'Отправляем…' : 'Отправить на подтверждение'}</button></form> : <button type="button" className="button secondary" onClick={() => setInteractionOpen(true)}>Зафиксировать взаимодействие</button>}</section>}
          <div className="verified-review-list">{profile.reviews.map((review) => <article className={`verified-review verdict-${review.verdict.toLowerCase()}`} key={review.id}><header><Avatar name={review.author.displayName} size={42} url={review.author.avatarUrl}/><div><Link href={`/u/${review.author.username}`}><strong>{review.author.displayName}</strong></Link><span>@{review.author.username} · {formatRelativeTime(review.createdAt)}</span></div><span className="verified-review-badge"><ShieldIcon/> {verdictNames[review.verdict]}</span></header><p>{review.body}</p>{review.evidenceAttached && <div className="review-evidence-badge">Фото приложено как подтверждение</div>}<footer><span>{interactionTypeNames[review.interaction.type] ?? review.interaction.type}: {review.interaction.title}</span>{review.interaction.community && <Link href={`/communities/${review.interaction.community.slug}`}>{review.interaction.community.name}</Link>}{review.interaction.publication && <Link href={`/p/${review.interaction.publication.slug}`}>Связанная публикация</Link>}</footer></article>)}{!profile.reviews.length && <div className="empty-state"><strong>Подтверждённых отзывов пока нет</strong><span>Отзывы появятся только после завершённых взаимодействий, подтверждённых обеими сторонами.</span></div>}</div>
        </div>}
        {tab === 'gifts' && <section className="profile-gifts-section"><div className="section-heading"><div><span className="eyebrow">Коллекция</span><h2>Подарки пользователя</h2></div>{!profile.isSelf && <button type="button" className="button secondary small" onClick={() => void openGiftPicker()}>Подарить</button>}</div><div className="profile-gift-grid">{profile.gifts.map((gift) => <article className="profile-gift-card" key={gift.id}>{gift.gift.previewMediaId ? <img src={`/api/media/${gift.gift.previewMediaId}/content?variant=thumbnail`} alt="" loading="lazy"/> : <span className="gift-placeholder">🎁</span>}<div><strong>{gift.gift.title}</strong><p>{gift.message || gift.gift.description}</p><small>От <Link href={`/u/${gift.sender.username}`}>{gift.sender.displayName}</Link> · {formatRelativeTime(gift.createdAt)}</small></div></article>)}{!profile.gifts.length && <div className="empty-state"><strong>Подарков пока нет</strong><span>Подарки создаются авторами в Мастерской.</span></div>}</div></section>}
      </main>

      <aside className="profile-sidebar-modern">
        {profile.localTrust.length > 0 && <section className="card compact-reputation-card"><div className="compact-heading"><h3>Репутация в сообществах</h3><ShieldIcon/></div><div className="local-trust-list">{profile.localTrust.slice(0, 4).map((trust) => <Link href={`/communities/${trust.community.slug}`} key={trust.community.id}><div><strong>{trust.community.name}</strong><span>{trust.label}</span></div></Link>)}</div></section>}

        {(profile.isSelf || profile.showSubscriptions) && <section className="card"><h3>Подписки</h3><div className="profile-community-list">{profile.communities.map((community) => <Link key={community.slug} href={`/communities/${community.slug}`}><span>{community.name.slice(0, 1)}</span><strong>{community.name}</strong></Link>)}{!profile.communities.length && <p className="muted">Подписок на сообщества пока нет.</p>}</div></section>}
        {profile.roles.length > 0 && <section className="card"><h3>Действующие роли</h3>{profile.roles.map((item) => <Link className="profile-role-row" key={item.id} href={`/communities/${item.community.slug}`}><UsersIcon/><div><strong>{communityRoleNames[item.role] ?? item.role}</strong><span>{item.community.name} · с {new Date(item.startedAt).toLocaleDateString('ru-RU')}</span>{item.note && <small>{item.note}</small>}</div></Link>)}</section>}
        <section className="card gifts-card"><div className="compact-heading"><h3>Подарки</h3><button type="button" className="text-button" onClick={() => setTab('gifts')}>Смотреть все</button></div><div className="profile-gift-preview">{profile.gifts.slice(0, 5).map((gift) => <button type="button" key={gift.id} onClick={() => setTab('gifts')} title={gift.gift.title}>{gift.gift.previewMediaId ? <img src={`/api/media/${gift.gift.previewMediaId}/content?variant=thumbnail`} alt=""/> : <span>🎁</span>}</button>)}{!profile.gifts.length && <div className="compact-empty">Подарков пока нет</div>}</div></section>
      </aside>
    </div>

    {giftOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) setGiftOpen(false); }}><section className="card gift-picker-dialog" role="dialog" aria-modal="true"><div className="compact-heading"><div><span className="eyebrow">Мастерская</span><h2>Выбрать подарок</h2></div><button type="button" className="text-button" onClick={() => setGiftOpen(false)}>Закрыть</button></div>{loadingGifts ? <p>Загружаем подарки…</p> : giftCatalog.length ? <form onSubmit={sendGift}><label>Подарок<select name="workshopItemId" required>{giftCatalog.map((gift) => <option value={gift.id} key={gift.id}>{gift.title}</option>)}</select></label><label>Сообщение <span className="optional-label">необязательно</span><textarea name="message" maxLength={300}/></label><button className="button" disabled={sendingGift}>{sendingGift ? 'Отправляем…' : 'Отправить подарок'}</button></form> : <div className="empty-state"><strong>В Мастерской пока нет опубликованных подарков</strong><Link className="button secondary small" href="/workshop">Открыть Мастерскую</Link></div>}</section></div>}
  </div>;
}
