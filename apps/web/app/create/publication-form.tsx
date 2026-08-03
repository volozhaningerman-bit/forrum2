'use client';

import type { CSSProperties, ChangeEvent, FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { BookmarkIcon, CommentIcon, EyeIcon, HeartIcon } from '@/components/icons';
import { BbcodeEditor } from '@/components/bbcode-editor';
import { BbcodeContent } from '@/components/bbcode-content';

type Community = { slug: string; name: string; accentColor?: string; parent?: { slug: string; name: string } | null };
type Format = 'POST' | 'TOPIC';
type Draft = { format: Format; community: string; type: string; title: string; body: string; tags: string };

const DRAFT_KEY = 'forrum-publication-draft';
const types = [
  ['DISCUSSION', 'Обсуждение'],
  ['QUESTION', 'Вопрос'],
  ['NEWS', 'Новость'],
  ['GUIDE', 'Гайд'],
  ['PROJECT', 'Проект'],
  ['SERVICE', 'Услуга'],
  ['CASE', 'Кейс'],
  ['ANNOUNCEMENT', 'Объявление'],
] as const;

function parseDraft(raw: string | null): Draft | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<Draft>;
    if (value.format !== 'POST' && value.format !== 'TOPIC') return null;
    return {
      format: value.format,
      community: typeof value.community === 'string' ? value.community : '',
      type: typeof value.type === 'string' ? value.type : 'DISCUSSION',
      title: typeof value.title === 'string' ? value.title : '',
      body: typeof value.body === 'string' ? value.body : '',
      tags: typeof value.tags === 'string' ? value.tags : '',
    };
  } catch { return null; }
}

export function CreatePublicationForm() {
  const params = useSearchParams();
  const router = useRouter();
  const initialFormat: Format = params.get('format') === 'POST' ? 'POST' : 'TOPIC';
  const [communities, setCommunities] = useState<Community[]>([]);
  const [format, setFormat] = useState<Format>(initialFormat);
  const [community, setCommunity] = useState(params.get('community') ?? '');
  const [type, setType] = useState('DISCUSSION');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<Draft | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    api<Community[]>('/communities').then(setCommunities).catch((cause) => setError(cause.message));
    const draft = parseDraft(window.localStorage.getItem(DRAFT_KEY));
    if (draft && (draft.title || draft.body || draft.tags)) setPendingDraft(draft);
  }, []);

  const hasContent = Boolean(title.trim() || body.trim() || tags.trim());
  useEffect(() => {
    if (!hasContent) return;
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ format, community, type, title, body, tags } satisfies Draft));
      setPendingDraft(null);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1200);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [format, community, type, title, body, tags, hasContent]);

  const selectedCommunity = useMemo(() => communities.find((item) => item.slug === community), [communities, community]);
  const rawTagList = tags.split(/[\s,]+/).map((tag) => tag.replace(/^#/, '').trim().toLowerCase()).filter(Boolean);
  const tagList = [...new Set(rawTagList)].slice(0, 5);
  const extraTagCount = Math.max(0, [...new Set(rawTagList)].length - 5);

  function restoreDraft() {
    if (!pendingDraft) return;
    setFormat(pendingDraft.format);
    setCommunity(pendingDraft.community);
    setType(pendingDraft.type);
    setTitle(pendingDraft.title);
    setBody(pendingDraft.body);
    setTags(pendingDraft.tags);
    setPendingDraft(null);
  }

  function removeStoredDraft(clearFields = false) {
    window.localStorage.removeItem(DRAFT_KEY);
    setPendingDraft(null);
    setSaved(false);
    if (clearFields) {
      setFormat(initialFormat);
      setCommunity(params.get('community') ?? '');
      setType('DISCUSSION');
      setTitle('');
      setBody('');
      setTags('');
      setError('');
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await api<{ slug: string }>(`/communities/${community}/publications`, {
        method: 'POST',
        body: JSON.stringify({ format, type, title: format === 'TOPIC' ? title : undefined, body, tags: tagList }),
      });
      window.localStorage.removeItem(DRAFT_KEY);
      router.push(`/p/${result.slug}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось опубликовать материал');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-layout">
      <main className="create-column">
        <div className="create-heading">
          <span className="eyebrow">Новая публикация</span>
          <h1>Что вы хотите разместить?</h1>
          <p>Пост подходит для быстрого разговора, а постоянная тема — для материала, к которому будут возвращаться.</p>
        </div>

        {pendingDraft && <section className="draft-restore-banner" aria-live="polite">
          <div><strong>Найден незавершённый черновик</strong><span>{pendingDraft.format === 'TOPIC' ? 'Постоянная тема' : 'Пост'} · {pendingDraft.title || pendingDraft.body.slice(0, 70) || 'без текста'}</span></div>
          <div className="inline-actions"><button className="button secondary small-button" type="button" onClick={restoreDraft}>Восстановить</button><button className="button ghost small-button" type="button" onClick={() => removeStoredDraft(false)}>Удалить</button></div>
        </section>}

        <div className="format-choice-grid" role="radiogroup" aria-label="Формат публикации">
          <button className={`format-choice format-choice-post ${format === 'POST' ? 'active' : ''}`} type="button" role="radio" aria-checked={format === 'POST'} onClick={() => setFormat('POST')}>
            <span className="format-choice-label">Пост</span>
            <strong>Быстро поделиться мыслью</strong>
            <p>Появляется в ленте, собирает реакции и постепенно уходит вниз.</p>
            <small>Мнение · короткий вопрос · новость · обновление</small>
          </button>
          <button className={`format-choice format-choice-topic ${format === 'TOPIC' ? 'active' : ''}`} type="button" role="radio" aria-checked={format === 'TOPIC'} onClick={() => setFormat('TOPIC')}>
            <span className="format-choice-label">Постоянная тема</span>
            <strong>Развивать проект или услугу</strong>
            <p>Ответы поднимают тему. На странице копятся обновления, отзывы и репутация.</p>
            <small>Проект · услуга · гайд · поддержка · большое обсуждение</small>
          </button>
        </div>

        <form className={`publication-editor ${format === 'TOPIC' ? 'topic-editor' : 'post-editor'}`} onSubmit={submit}>
          <div className="editor-section editor-meta-grid">
            <label>Сообщество
              <select value={community} onChange={(event: ChangeEvent<HTMLSelectElement>) => setCommunity(event.target.value)} required>
                <option value="" disabled>Выберите сообщество</option>
                {communities.map((item) => <option key={item.slug} value={item.slug}>{item.parent ? `↳ ${item.name} — внутри ${item.parent.name}` : item.name}</option>)}
              </select>
              {selectedCommunity?.parent && <span className="field-help">Материал также появится в общей ленте «{selectedCommunity.parent.name}» с пометкой подраздела.</span>}
            </label>
            <label>Назначение
              <select value={type} onChange={(event: ChangeEvent<HTMLSelectElement>) => setType(event.target.value)}>
                {types.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
              <span className="field-help">Помогает людям понять характер материала до открытия.</span>
            </label>
          </div>

          {format === 'TOPIC' && (
            <div className="editor-section">
              <label>Заголовок постоянной темы
                <input value={title} onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)} minLength={3} maxLength={160} placeholder="Например: Разработка Telegram-ботов — портфолио, цены и отзывы" required/>
              </label>
              <div className="field-counter">{title.length}/160</div>
            </div>
          )}

          <div className="editor-section rich-editor-shell">
            <BbcodeEditor
              value={body}
              onChange={setBody}
              maxLength={30000}
              placeholder={format === 'TOPIC'
                ? 'Подробно расскажите о проекте, услуге, гайде или теме обсуждения. Разбейте длинный материал на заголовки и абзацы.'
                : 'Поделитесь мыслью, новостью или коротким вопросом.'}
            />
            <div className="field-counter">{body.length}/30000</div>
          </div>

          <div className="editor-section">
            <label>Хэштеги
              <input value={tags} onChange={(event: ChangeEvent<HTMLInputElement>) => setTags(event.target.value)} maxLength={180} placeholder="#проекты #продвижение — до 5 тегов"/>
            </label>
            {tagList.length > 0 && <div className="draft-tag-preview">{tagList.map((tag) => <span key={tag}>#{tag}</span>)}</div>}
            <p className={`muted small-text ${extraTagCount ? 'warning-text' : ''}`}>{extraTagCount ? `Лишние теги не будут добавлены: ${extraTagCount}. Останутся первые пять.` : 'Хэштеги показываются в конце публикации и помогают находить связанные материалы.'}</p>
          </div>

          {error && <div className="error-box editor-error" role="alert">{error}</div>}

          <div className="editor-submit-row">
            <div className="draft-controls"><span className="draft-status">{saved ? 'Черновик сохранён на этом компьютере' : hasContent ? 'Автосохранение включено' : 'Черновик появится после ввода текста'}</span>{hasContent && <button className="text-button danger-text" type="button" onClick={() => removeStoredDraft(true)}>Очистить</button>}</div>
            <button className="button" disabled={loading || !community || body.trim().length < 2 || (format === 'TOPIC' && title.trim().length < 3)}>
              {loading ? 'Публикуем…' : format === 'TOPIC' ? 'Создать постоянную тему' : 'Опубликовать пост'}
            </button>
          </div>
        </form>
      </main>

      <aside className={`create-preview-column ${previewOpen ? 'preview-open' : ''}`}>
        <button className="preview-mobile-toggle" type="button" aria-expanded={previewOpen} onClick={() => setPreviewOpen((current) => !current)}>{previewOpen ? 'Скрыть общий предпросмотр' : 'Показать общий предпросмотр'}</button>
        <div className="preview-sticky">
          <div className="preview-heading"><span>Предпросмотр</span><small>как материал будет выглядеть в ленте</small></div>
          <article className={`publication-preview ${format === 'TOPIC' ? 'topic-preview' : 'post-preview'}`} style={{ '--community-accent': selectedCommunity?.accentColor ?? '#3157D5' } as CSSProperties}>
            <div className="publication-kind-row">
              <span className={`publication-kind ${format === 'TOPIC' ? 'publication-kind-topic' : 'publication-kind-post'}`}>{format === 'TOPIC' ? 'Постоянная тема' : 'Пост'}</span>
              <span className="type-label">{types.find(([value]) => value === type)?.[1]}</span>
            </div>
            <small className="community-link">{selectedCommunity?.name || 'Сообщество не выбрано'}</small>
            {format === 'TOPIC' && <h2>{title || 'Заголовок вашей постоянной темы'}</h2>}
            <BbcodeContent source={body || (format === 'TOPIC' ? 'Здесь появится краткий фрагмент основного текста темы.' : 'Здесь появится текст вашего поста.')} className="preview-bbcode"/>
            {tagList.length > 0 && <div className="preview-tags">{tagList.map((tag) => <span key={tag}>#{tag}</span>)}</div>}
            <div className="publication-stats"><span><CommentIcon/> 0</span><span><EyeIcon/> 0</span><span><HeartIcon/> 0</span><span><BookmarkIcon/></span></div>
          </article>

          <details className="card editor-help-card">
            <summary>{format === 'TOPIC' ? 'Когда выбирать постоянную тему' : 'Когда выбирать пост'}</summary>
            <ul>
              {format === 'TOPIC' ? <>
                <li>материал будет обновляться;</li><li>важны отзывы и долгие обсуждения;</li><li>страница должна жить месяцами или годами.</li>
              </> : <>
                <li>есть короткая мысль или мнение;</li><li>нужна быстрая реакция аудитории;</li><li>не нужна отдельная постоянная страница.</li>
              </>}
            </ul>
          </details>
        </div>
      </aside>
    </div>
  );
}
