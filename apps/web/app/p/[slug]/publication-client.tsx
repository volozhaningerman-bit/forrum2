'use client';

import Link from 'next/link';
import type { CSSProperties, FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Avatar } from '@/components/avatar';
import { TagList } from '@/components/tag-list';
import { BbcodeContent } from '@/components/bbcode-content';
import { BbcodeEditor } from '@/components/bbcode-editor';
import { TopicCategoryTree } from '@/components/topic-category-tree';
import { TelegramShareButton } from '@/components/telegram-share-button';
import {
  BookmarkIcon,
  CommentIcon,
  EyeIcon,
  HeartIcon,
  MessageIcon,
  ShieldIcon,
  UsersIcon,
} from '@/components/icons';
import type { Tag } from '@/lib/types';

type Comment = {
  id: string;
  body: string;
  parentId: string | null;
  createdAt: string;
  author: {
    username: string;
    displayName: string;
    avatarUrl?: string | null;
    forrumId: number;
    emailVerified?: boolean;
  };
  reactionCount: number;
  replyCount: number;
  viewerReaction: string | null;
};

type CommentNode = Comment & { children: CommentNode[] };

export type Publication = {
  id: string;
  slug: string;
  format: 'POST' | 'TOPIC';
  type: string;
  title: string | null;
  body: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
  pinnedUntil: string | null;
  author: {
    username: string;
    displayName: string;
    avatarUrl?: string | null;
    forrumId: number;
    bio?: string | null;
    emailVerified?: boolean;
    createdAt?: string;
  };
  community: {
    slug: string;
    name: string;
    accentColor: string;
    subscriberCount?: number;
  };
  commentCount: number;
  reactionCount: number;
  bookmarkCount: number;
  viewerReaction: string | null;
  isBookmarked: boolean;
  tags: Tag[];
  comments: Comment[];
  canEdit: boolean;
  canDelete: boolean;
};

const reactions = [
  ['LIKE', 'Нравится'],
  ['USEFUL', 'Полезно'],
  ['INTERESTING', 'Интересно'],
  ['FIRE', 'Огонь'],
  ['THANKS', 'Спасибо'],
] as const;

const typeNames: Record<string, string> = {
  DISCUSSION: 'Обсуждение',
  QUESTION: 'Вопрос',
  NEWS: 'Новость',
  GUIDE: 'Гайд',
  PROJECT: 'Проект',
  SERVICE: 'Услуга',
  CASE: 'Кейс',
  ANNOUNCEMENT: 'Объявление',
};

function dateLabel(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

// FORRUM_TOPIC_PAGE_FRAME_V15_4
export function PublicationClient({
  slug,
  initialData,
}: {
  slug: string;
  initialData: Publication;
}) {
  const router = useRouter();
  const [item, setItem] =
    useState<Publication | null>(initialData);
  const [error, setError] = useState('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState('');
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editType, setEditType] = useState('DISCUSSION');
  const [editTags, setEditTags] = useState('');
  const [notice, setNotice] = useState('');
  const [reportTarget, setReportTarget] = useState<{ type: 'publication' | 'comment'; id?: string } | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [commentOrder, setCommentOrder] = useState<'oldest' | 'newest'>('oldest');
  const [topicCommunityAncestors, setTopicCommunityAncestors] =
    useState<Array<{ slug: string; name: string }>>([]);

  const replyEditorRef = useRef<HTMLTextAreaElement>(null);
  const trackedSlugRef = useRef<string | null>(null);

  const load = (trackView = false) => api<Publication>(`/publications/${slug}?trackView=${trackView ? '1' : '0'}`).then(setItem).catch((e) => setError(e.message));
  useEffect(() => { if (trackedSlugRef.current === slug) return; trackedSlugRef.current = slug; void load(true); }, [slug]);
  useEffect(() => {
    if (!item || item.format !== 'TOPIC') {
      setTopicCommunityAncestors([]);
      return;
    }

    let cancelled = false;

    api<{ ancestors?: Array<{ slug: string; name: string }> }>(
      `/communities/${encodeURIComponent(item.community.slug)}`,
    )
      .then((community) => {
        if (!cancelled) {
          setTopicCommunityAncestors(community.ancestors ?? []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTopicCommunityAncestors([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [item?.community.slug, item?.format]);


  const comments = useMemo<CommentNode[]>(() => {
    if (!item) return [];
    const nodes = new Map(item.comments.map((comment) => [comment.id, { ...comment, children: [] as CommentNode[] }]));
    const roots: CommentNode[] = [];
    nodes.forEach((node) => {
      if (node.parentId && nodes.has(node.parentId)) nodes.get(node.parentId)!.children.push(node);
      else roots.push(node);
    });
    const byTime = (left: CommentNode, right: CommentNode) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
    nodes.forEach((node) => node.children.sort(byTime));
    roots.sort(commentOrder === 'oldest' ? byTime : (left, right) => byTime(right, left));
    return roots;
  }, [item, commentOrder]);

  function chooseReply(comment: Comment) {
    setReplyTo(comment);
    requestAnimationFrame(() => {
      replyEditorRef.current?.focus();
      replyEditorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  async function sendComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    try {
      await api(`/publications/${slug}/comments`, {
        method: 'POST',
        body: JSON.stringify({ body: replyText, parentId: replyTo?.id }),
      });
      setReplyText('');
      setReplyTo(null);
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось отправить ответ');
    }
  }

  async function react(type: string) {
    try {
      await api(`/publications/${slug}/reaction`, { method: 'POST', body: JSON.stringify({ type }) });
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось поставить реакцию');
    }
  }

  async function reactComment(commentId: string, type = 'LIKE') {
    try {
      await api(`/comments/${commentId}/reaction`, { method: 'POST', body: JSON.stringify({ type }) });
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось поставить реакцию');
    }
  }

  function reportComment(commentId: string) {
    setReportReason('');
    setReportTarget({ type: 'comment', id: commentId });
  }

  async function bookmark() {
    try {
      await api(`/publications/${slug}/bookmark`, { method: 'POST' });
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось сохранить публикацию');
    }
  }

  async function sharePublication() {
    if (!item) return;
    setError('');
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: item.title || `Публикация в ${item.community.name}`, url });
        setNotice('Ссылка отправлена');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setNotice('Ссылка скопирована');
      } else {
        throw new Error('Копирование недоступно');
      }
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === 'AbortError') return;
      setError('Не удалось поделиться ссылкой. Скопируйте адрес из строки браузера.');
    }
  }

  function beginEdit() {
    if (!item) return;
    setEditTitle(item.title ?? '');
    setEditBody(item.body);
    setEditType(item.type);
    setEditTags(item.tags.map((tag) => `#${tag.slug}`).join(' '));
    setEditing(true);
  }

  async function saveEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    try {
      const tags = editTags.split(/[\s,]+/).map((tag) => tag.replace(/^#/, '').trim()).filter(Boolean).slice(0, 5);
      await api(`/publications/${slug}`, {
        method: 'PATCH',
        body: JSON.stringify({ type: editType, title: item?.format === 'TOPIC' ? editTitle : undefined, body: editBody, tags }),
      });
      setEditing(false);
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось сохранить изменения');
    }
  }

  async function removePublication() {
    if (!item) return;
    try {
      const result = await api<{ communitySlug?: string }>(`/publications/${slug}`, { method: 'DELETE' });
      setDeleteOpen(false);
      router.push(`/communities/${result.communitySlug || item.community.slug}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось удалить публикацию');
    }
  }

  function report() {
    setReportReason('');
    setReportTarget({ type: 'publication' });
  }

  async function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reportTarget || reportReason.trim().length < 5) return;
    try {
      const endpoint = reportTarget.type === 'comment' ? `/comments/${reportTarget.id}/report` : `/publications/${slug}/report`;
      await api(endpoint, { method: 'POST', body: JSON.stringify({ reason: reportReason.trim() }) });
      setNotice(reportTarget.type === 'comment' ? 'Жалоба на комментарий отправлена' : 'Жалоба отправлена команде FORRUM');
      setReportTarget(null);
      setReportReason('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось отправить жалобу');
    }
  }

  if (!item) return <div className={error ? 'error-box' : 'card'}>{error || 'Загрузка публикации…'}</div>;

  const isTopic = item.format === 'TOPIC';
  const updated = new Date(item.updatedAt).getTime() - new Date(item.createdAt).getTime() > 60_000;

  return (
    <div
      className={
        isTopic
          ? 'topic-page-frame-v15-4 section-page-v14-4'
          : 'publication-layout'
      }
      data-section-polish={isTopic ? 'v14-8' : undefined}
      data-topic-frame={isTopic ? 'v15-4' : undefined}
    >
      {isTopic && (
        <TopicCategoryTree activeSlug={item.community.slug} />
      )}
      <main className="publication-column">
        <nav
          className="publication-breadcrumbs topic-frame-breadcrumbs"
          aria-label="Хлебные крошки"
        >
          <Link href="/">Главная</Link>
          <span aria-hidden="true">›</span>

          {isTopic ? (
            <>
              <Link href="/communities">Сообщества</Link>

              {topicCommunityAncestors.map((ancestor) => (
                <span
                  className="topic-frame-breadcrumb-segment"
                  key={ancestor.slug}
                >
                  <span aria-hidden="true">›</span>
                  <Link href={`/communities/${ancestor.slug}`}>
                    {ancestor.name}
                  </Link>
                </span>
              ))}

              <span aria-hidden="true">›</span>
              <Link href={`/communities/${item.community.slug}`}>
                {item.community.name}
              </Link>
            </>
          ) : (
            <>
              <Link href={`/communities/${item.community.slug}`}>
                {item.community.name}
              </Link>
              <span aria-hidden="true">›</span>
              <span>{typeNames[item.type] ?? item.type}</span>
            </>
          )}
        </nav>

        {isTopic && (
          <section
            className="topic-frame-header"
            aria-labelledby="topic-frame-title"
          >
            <div className="topic-frame-header-copy">
              <h1 id="topic-frame-title">
                {item.title || 'Тема без заголовка'}
              </h1>

              <div className="topic-frame-header-meta">
                <Link href={`/u/${item.author.username}`}>
                  @{item.author.username}
                </Link>
                <span aria-hidden="true">·</span>
                <time dateTime={item.createdAt}>
                  {dateLabel(item.createdAt)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{item.viewCount} просмотров</span>
              </div>
            </div>

            <div className="topic-frame-header-actions">
              <button
                type="button"
                className="topic-frame-action"
                disabled
                aria-disabled="true"
                title="Подписка на отдельную тему будет подключена отдельным этапом"
              >
                Подписаться
              </button>

              <button
                type="button"
                className={`topic-frame-action ${
                  item.isBookmarked ? 'active' : ''
                }`}
                aria-pressed={item.isBookmarked}
                onClick={bookmark}
              >
                {item.isBookmarked ? 'Сохранено' : 'Сохранить'}
              </button>
            </div>
          </section>
        )}
        <article
          className={`publication-detail ${isTopic ? 'publication-detail-topic' : 'publication-detail-post'}`}
          data-community={item.community.slug}
          style={{ '--community-accent': item.community.accentColor } as CSSProperties}
        >
          <header className="publication-detail-header">
            <div className="publication-kind-row">
              <span className={`publication-kind ${isTopic ? 'publication-kind-topic' : 'publication-kind-post'}`}>
                {isTopic ? 'Постоянная тема' : 'Пост'}
              </span>
              <span className="type-label">{typeNames[item.type] ?? item.type}</span>
              {item.pinnedUntil && new Date(item.pinnedUntil).getTime() > Date.now() && <span className="promoted-label">Закреплено</span>}
            </div>
            {item.title && <h1>{item.title}</h1>}
            {!item.title && <p className="post-lead">Публикация пользователя в сообществе {item.community.name}</p>}
            <div className="publication-meta-line">
              <span>{dateLabel(item.createdAt)}</span>
              {updated && <span>обновлено {dateLabel(item.updatedAt)}</span>}
              <span><EyeIcon/> {item.viewCount}</span>
            </div>
          </header>

          <section className="publication-detail-author">
            <Avatar name={item.author.displayName} size={48} url={item.author.avatarUrl}/>
            <div>
              <Link href={`/u/${item.author.username}`}><strong>{item.author.displayName}</strong></Link>
              <span>@{item.author.username} · FORRUM ID {item.author.forrumId}</span>
            </div>
            {item.author.emailVerified && <span className="verified-account"><ShieldIcon/> Почта подтверждена</span>}
          </section>

          {editing ? <form className="inline-publication-editor" onSubmit={saveEdit}>
            {item.format === 'TOPIC' && <label>Заголовок<input value={editTitle} onChange={(event) => setEditTitle(event.target.value)} minLength={3} maxLength={160} required/></label>}
            <label>Назначение<select value={editType} onChange={(event) => setEditType(event.target.value)}>{Object.entries(typeNames).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <BbcodeEditor value={editBody} onChange={setEditBody} maxLength={30000} placeholder="Текст публикации"/>
            <label>Хэштеги<input value={editTags} onChange={(event) => setEditTags(event.target.value)} placeholder="#тег #второй"/></label>
            <div className="inline-actions"><button className="button">Сохранить</button><button className="button ghost" type="button" onClick={() => setEditing(false)}>Отменить</button></div>
          </form> : <BbcodeContent source={item.body} className="publication-rich-body"/>}

          <TagList tags={item.tags}/>

          <footer className="publication-detail-footer">
            <div className="reaction-bar publication-reactions">
              {reactions.map(([type, label]) => (
                <button type="button" key={type} className={`reaction-button ${item.viewerReaction === type ? 'active' : ''}`} onClick={() => react(type)}>
                  {label}
                </button>
              ))}
            </div>
            <div className="publication-action-row">
              <span><CommentIcon/> {item.commentCount} ответов</span>
              <span><HeartIcon/> {item.reactionCount} реакций</span>
              <button type="button" className={`plain-action ${item.isBookmarked ? 'active' : ''}`} onClick={bookmark}>
                <BookmarkIcon/> {item.isBookmarked ? 'Сохранено' : 'Сохранить'}
              </button>
              <button type="button" className="plain-action" onClick={sharePublication}>Поделиться</button>
              <TelegramShareButton slug={item.slug}/>
              {item.canEdit && <button type="button" className="plain-action" onClick={beginEdit}>Редактировать</button>}
              {item.canDelete && <button type="button" className="plain-action danger-text" onClick={() => setDeleteOpen(true)}>Удалить</button>}
            </div>
          </footer>
        </article>

        <div aria-live="polite">{notice && <div className="success-box publication-notice">{notice}</div>}{error && <div className="error-box publication-notice">{error}</div>}</div>

        <section className="discussion-section">
          <div className="discussion-heading">
            <div><span className="eyebrow">Обсуждение</span><h2>Ответы пользователей</h2></div>
            <div className="discussion-tools"><label>Порядок<select value={commentOrder} onChange={(event) => setCommentOrder(event.target.value as 'oldest' | 'newest')}><option value="oldest">Сначала ранние</option><option value="newest">Сначала новые</option></select></label><span className="discussion-count">{item.comments.length}</span></div>
          </div>

          <form className="reply-composer" onSubmit={sendComment}>
            {replyTo && (
              <div className="replying-to">
                Ответ для <strong>{replyTo.author.displayName}</strong>
                <button type="button" onClick={() => setReplyTo(null)}>Отменить</button>
              </div>
            )}
            <BbcodeEditor value={replyText} onChange={setReplyText} minLength={2} maxLength={8000} compact textareaRef={replyEditorRef} placeholder="Напишите содержательный ответ"/>
            <div className="composer-footer">
              <span>{replyText.length}/8000</span>
              <button className="button" disabled={replyText.trim().length < 2}>Отправить ответ</button>
            </div>
          </form>

          <div className="threaded-comments">
            {comments.map((comment) => <CommentThread key={comment.id} comment={comment} onReply={chooseReply} onReact={reactComment} onReport={reportComment}/>)}
            {!item.comments.length && <div className="empty-state">Здесь пока тихо. Начните содержательное обсуждение.</div>}
          </div>
        </section>
      </main>

      <aside className="publication-sidebar">
        <section className="card author-summary-card">
          <span className="eyebrow">Автор</span>
          <div className="author-summary-head"><Avatar name={item.author.displayName} size={56} url={item.author.avatarUrl}/><div><strong>{item.author.displayName}</strong><span>@{item.author.username}</span></div></div>
          <p>{item.author.bio || 'Участник FORRUM. Профиль помогает понять его интересы, вклад и репутацию.'}</p>
          <div className="inline-actions">
            <Link className="button secondary" href={`/u/${item.author.username}`}>Открыть профиль</Link>
            <Link className="button ghost" href={`/messages?to=${encodeURIComponent(item.author.username)}`}><MessageIcon/> Написать</Link>
          </div>
        </section>

        <section className="card community-summary-card" style={{ '--community-accent': item.community.accentColor } as CSSProperties}>
          <span className="eyebrow">Сообщество</span>
          <div className="community-summary-mark">{item.community.name.slice(0, 1)}</div>
          <h3>{item.community.name}</h3>
          <p className="muted">Публикация находится в общей ленте этого сообщества.</p>
          <div className="community-summary-number"><UsersIcon/><strong>{item.community.subscriberCount ?? 0}</strong><span>подписчиков</span></div>
          <Link className="button secondary" href={`/communities/${item.community.slug}`}>Перейти в сообщество</Link>
        </section>

        <section className={`card lifecycle-card ${isTopic ? 'topic-lifecycle' : 'post-lifecycle'}`}>
          <h3>{isTopic ? 'Как живёт постоянная тема' : 'Как живёт пост'}</h3>
          <p>{isTopic
            ? 'Ответы поднимают тему внутри сообщества. Она подходит для услуги, проекта, гайда, поддержки или долгого обсуждения.'
            : 'Пост появляется в ленте, собирает быструю реакцию и постепенно уступает место новым публикациям.'}</p>
          {isTopic && <Link className="button" href={`/promote/${item.slug}`}>Продвинуть тему</Link>}
        </section>

        <section className="card moderation-card">
          <h3>Порядок и безопасность</h3>
          <p className="muted">Жалоба не удаляет публикацию автоматически. Её проверит команда сообщества или администрация.</p>
          <button type="button" className="text-button danger-text" onClick={report}>Пожаловаться</button>
        </section>
      </aside>

      {reportTarget && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setReportTarget(null); }}>
        <section className="report-dialog" role="dialog" aria-modal="true" aria-labelledby="report-dialog-title">
          <div className="report-dialog-head"><div><span className="eyebrow">Порядок и безопасность</span><h2 id="report-dialog-title">{reportTarget.type === 'comment' ? 'Жалоба на комментарий' : 'Жалоба на публикацию'}</h2></div><button className="dialog-close" type="button" aria-label="Закрыть" onClick={() => setReportTarget(null)}>×</button></div>
          <p>Коротко и конкретно опишите нарушение. Жалоба не удаляет материал автоматически — её проверит команда.</p>
          <form onSubmit={submitReport}><label>Причина<textarea value={reportReason} onChange={(event) => setReportReason(event.target.value)} minLength={5} maxLength={1000} placeholder="Например: спам, оскорбление, мошенничество или нарушение правил" required/></label><div className="inline-actions"><button className="button" disabled={reportReason.trim().length < 5}>Отправить жалобу</button><button className="button ghost" type="button" onClick={() => setReportTarget(null)}>Отмена</button></div></form>
        </section>
      </div>}

      {deleteOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setDeleteOpen(false); }}>
        <section className="report-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-publication-title">
          <div className="report-dialog-head"><div><span className="eyebrow">Удаление материала</span><h2 id="delete-publication-title">Удалить публикацию?</h2></div><button className="dialog-close" type="button" aria-label="Закрыть" onClick={() => setDeleteOpen(false)}>×</button></div>
          <p>Публикация исчезнет из лент и поиска. Запись сохранится в журнале модерации, но обычные пользователи её больше не увидят.</p>
          <div className="inline-actions"><button className="button danger" type="button" onClick={removePublication}>Удалить</button><button className="button ghost" type="button" onClick={() => setDeleteOpen(false)}>Отмена</button></div>
        </section>
      </div>}
    </div>
  );
}


function CommentThread({ comment, onReply, onReact, onReport, depth = 0 }: { comment: CommentNode; onReply: (comment: Comment) => void; onReact: (id: string) => void; onReport: (id: string) => void; depth?: number }) {
  return (
    <div className={`comment-thread comment-depth-${Math.min(depth, 3)}`}>
      <CommentCard comment={comment} onReply={onReply} onReact={onReact} onReport={onReport}/>
      {comment.children.length > 0 && <div className="comment-replies">{comment.children.map((child) => <CommentThread key={child.id} comment={child} onReply={onReply} onReact={onReact} onReport={onReport} depth={depth + 1}/>)}</div>}
    </div>
  );
}

function CommentCard({ comment, onReply, onReact, onReport }: { comment: Comment; onReply: (comment: Comment) => void; onReact: (id: string) => void; onReport: (id: string) => void }) {
  return (
    <article className="discussion-comment" id={`comment-${comment.id}`}>
      <Avatar name={comment.author.displayName} size={40} url={comment.author.avatarUrl}/>
      <div className="discussion-comment-body">
        <header>
          <Link href={`/u/${comment.author.username}`}><strong>{comment.author.displayName}</strong></Link>
          {comment.author.emailVerified && <span className="comment-verified">✓</span>}
          <span>@{comment.author.username}</span>
          <time>{dateLabel(comment.createdAt)}</time>
        </header>
        <BbcodeContent source={comment.body} className="content-body"/>
        <footer>
          <button type="button" className={`plain-action ${comment.viewerReaction ? 'active' : ''}`} onClick={() => onReact(comment.id)}><HeartIcon/> {comment.reactionCount || 'Нравится'}</button>
          <button type="button" className="plain-action" onClick={() => onReply(comment)}>Ответить</button><button type="button" className="plain-action danger-text" onClick={() => onReport(comment.id)}>Пожаловаться</button>
          {comment.replyCount > 0 && <span>{comment.replyCount} ответов</span>}
        </footer>
      </div>
    </article>
  );
}
