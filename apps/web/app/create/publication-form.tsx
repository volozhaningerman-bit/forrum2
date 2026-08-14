'use client';

import Link from 'next/link';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { BbcodeContent } from '@/components/bbcode-content';
import { BbcodeEditor } from '@/components/bbcode-editor';
import { TopicCategoryTree } from '@/components/topic-category-tree';
import { api } from '@/lib/api';

type Community = {
  slug: string;
  name: string;
  accentColor?: string;
  parent?: {
    slug: string;
    name: string;
  } | null;
};

type Format = 'POST' | 'TOPIC';

type Draft = {
  format: Format;
  community: string;
  type: string;
  title: string;
  body: string;
  tags: string;
};

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

    if (
      value.format !== 'POST' &&
      value.format !== 'TOPIC'
    ) {
      return null;
    }

    return {
      format: value.format,
      community:
        typeof value.community === 'string'
          ? value.community
          : '',
      type:
        typeof value.type === 'string'
          ? value.type
          : 'DISCUSSION',
      title:
        typeof value.title === 'string'
          ? value.title
          : '',
      body:
        typeof value.body === 'string'
          ? value.body
          : '',
      tags:
        typeof value.tags === 'string'
          ? value.tags
          : '',
    };
  } catch {
    return null;
  }
}

function timeLabel(date: Date | null) {
  if (!date) return '';

  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function readStoredDraft() {
  try {
    return {
      draft: parseDraft(
        window.localStorage.getItem(DRAFT_KEY),
      ),
      failed: false,
    };
  } catch {
    return {
      draft: null,
      failed: true,
    };
  }
}

function writeStoredDraft(draft: Draft) {
  try {
    window.localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify(draft),
    );
    return true;
  } catch {
    return false;
  }
}

function deleteStoredDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
    return true;
  } catch {
    return false;
  }
}

// FORRUM_CREATE_TOPIC_WORKSPACE_V15_7
// FORRUM_CREATE_TOPIC_WORKSPACE_V15_7_2
// FORRUM_CREATE_TOPIC_EDITOR_V15_8
export function CreatePublicationForm() {
  const params = useSearchParams();
  const router = useRouter();

  const initialFormat: Format =
    params.get('format') === 'POST' ? 'POST' : 'TOPIC';

  const initialCommunity = params.get('community') ?? '';

  const [communities, setCommunities] =
    useState<Community[]>([]);
  const [format, setFormat] =
    useState<Format>(initialFormat);
  const [community, setCommunity] =
    useState(initialCommunity);
  const [type, setType] =
    useState('DISCUSSION');
  const [title, setTitle] =
    useState('');
  const [body, setBody] =
    useState('');
  const [tags, setTags] =
    useState('');
  const [error, setError] =
    useState('');
  const [loading, setLoading] =
    useState(false);
  const [pendingDraft, setPendingDraft] =
    useState<Draft | null>(null);
  const [draftSavedAt, setDraftSavedAt] =
    useState<Date | null>(null);
  const [draftError, setDraftError] =
    useState('');
  const [previewOpen, setPreviewOpen] =
    useState(false);
  const [communityPickerOpen, setCommunityPickerOpen] =
    useState(!initialCommunity);
  const [telegramPreviewOpen, setTelegramPreviewOpen] =
    useState(false);
  const [telegramCheckedAt, setTelegramCheckedAt] =
    useState<Date | null>(null);

  useEffect(() => {
    api<Community[]>('/communities')
      .then((items) => {
        setCommunities(items);
        setError('');
      })
      .catch((cause) =>
        setError(
          cause instanceof Error
            ? cause.message
            : 'Не удалось загрузить разделы',
        ),
      );

    const storedDraft = readStoredDraft();
    const draft = storedDraft.draft;

    if (storedDraft.failed) {
      setDraftError(
        'Не удалось прочитать локальный черновик.',
      );
    }

    if (
      draft &&
      (draft.title || draft.body || draft.tags)
    ) {
      setPendingDraft(draft);
    }
  }, []);

  const hasContent = Boolean(
    title.trim() ||
      body.trim() ||
      tags.trim(),
  );

  useEffect(() => {
    if (!hasContent) return;

    const timer = window.setTimeout(() => {
      const draft: Draft = {
        format,
        community,
        type,
        title,
        body,
        tags,
      };

      if (!writeStoredDraft(draft)) {
        setDraftError(
          'Не удалось сохранить локальный черновик.',
        );
        return;
      }

      setPendingDraft(null);
      setDraftSavedAt(new Date());
      setDraftError('');
    }, 700);

    return () => window.clearTimeout(timer);
  }, [
    format,
    community,
    type,
    title,
    body,
    tags,
    hasContent,
  ]);

  useEffect(() => {
    setTelegramCheckedAt(null);
  }, [title, body, tags, community]);

  const selectedCommunity = useMemo(
    () =>
      communities.find(
        (item) => item.slug === community,
      ),
    [communities, community],
  );

  const rawTagList = tags
    .split(/[\s,]+/)
    .map((tag) =>
      tag
        .replace(/^#/, '')
        .trim()
        .toLowerCase(),
    )
    .filter(Boolean);

  const uniqueTags = [...new Set(rawTagList)];
  const tagList = uniqueTags.slice(0, 5);
  const extraTagCount = Math.max(
    0,
    uniqueTags.length - 5,
  );

  const telegramImageCount =
    body.match(
      /\[img(?:=[^\]]*)?\][\s\S]*?\[\/img\]/gi,
    )?.length ?? 0;

  const telegramUsesCustomSize =
    /\[size=\d{1,2}px\]/i.test(body);
  const telegramUsesCustomColor =
    /\[color=#[0-9a-f]{6}\]/i.test(body);

  const telegramAdaptationCount =
    Number(telegramUsesCustomSize) +
    Number(telegramUsesCustomColor);

  function restoreDraft() {
    if (!pendingDraft) return;

    setFormat(pendingDraft.format);
    setCommunity(pendingDraft.community);
    setType(pendingDraft.type);
    setTitle(pendingDraft.title);
    setBody(pendingDraft.body);
    setTags(pendingDraft.tags);
    setPendingDraft(null);
    setCommunityPickerOpen(
      !pendingDraft.community,
    );
  }

  function removeStoredDraft(
    clearFields = false,
  ) {
    if (!deleteStoredDraft()) {
      setDraftError(
        'Не удалось удалить локальный черновик.',
      );
      return;
    }

    setPendingDraft(null);
    setDraftSavedAt(null);
    setDraftError('');

    if (!clearFields) return;

    setFormat(initialFormat);
    setCommunity(initialCommunity);
    setType('DISCUSSION');
    setTitle('');
    setBody('');
    setTags('');
    setError('');
    setPreviewOpen(false);
    setCommunityPickerOpen(!initialCommunity);
    setTelegramPreviewOpen(false);
    setTelegramCheckedAt(null);
  }

  function retryDraftSave() {
    if (!hasContent) return;

    const saved = writeStoredDraft({
      format,
      community,
      type,
      title,
      body,
      tags,
    });

    if (!saved) {
      setDraftError(
        'Не удалось сохранить локальный черновик.',
      );
      return;
    }

    setPendingDraft(null);
    setDraftSavedAt(new Date());
    setDraftError('');
  }

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await api<{ slug: string }>(
        `/communities/${community}/publications`,
        {
          method: 'POST',
          body: JSON.stringify({
            format,
            type,
            title:
              format === 'TOPIC'
                ? title
                : undefined,
            body,
            tags: tagList,
          }),
        },
      );

      deleteStoredDraft();
      router.push(`/p/${result.slug}`);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось опубликовать материал',
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } finally {
      setLoading(false);
    }
  }

  if (format === 'POST') {
    return (
      <div className="create-layout">
        <main className="create-column">
          <div className="create-heading">
            <span className="eyebrow">
              Новая публикация
            </span>
            <h1>Создать пост</h1>
            <p>
              Короткая публикация для ленты.
              Для отдельной долгоживущей страницы
              используйте тему.
            </p>
          </div>

          {pendingDraft && (
            <section
              className="draft-restore-banner"
              aria-live="polite"
            >
              <div>
                <strong>
                  Найден незавершённый черновик
                </strong>
                <span>
                  {pendingDraft.title ||
                    pendingDraft.body.slice(0, 80) ||
                    'без текста'}
                </span>
              </div>

              <div className="inline-actions">
                <button
                  className="button secondary small-button"
                  type="button"
                  onClick={restoreDraft}
                >
                  Восстановить
                </button>

                <button
                  className="button ghost small-button"
                  type="button"
                  onClick={() =>
                    removeStoredDraft(false)
                  }
                >
                  Удалить
                </button>
              </div>
            </section>
          )}

          <div
            className="format-choice-grid"
            role="radiogroup"
            aria-label="Формат публикации"
          >
            <button
              className="format-choice format-choice-post active"
              type="button"
              role="radio"
              aria-checked="true"
            >
              <span className="format-choice-label">
                Пост
              </span>
              <strong>
                Быстро поделиться мыслью
              </strong>
              <p>
                Появляется в ленте и собирает
                быстрые реакции.
              </p>
            </button>

            <button
              className="format-choice format-choice-topic"
              type="button"
              role="radio"
              aria-checked="false"
              onClick={() => setFormat('TOPIC')}
            >
              <span className="format-choice-label">
                Тема
              </span>
              <strong>
                Создать отдельное обсуждение
              </strong>
              <p>
                Для материала с постоянной
                страницей и ответами.
              </p>
            </button>
          </div>

          <form
            className="publication-editor post-editor"
            onSubmit={submit}
          >
            <div className="editor-section editor-meta-grid">
              <label>
                Сообщество
                <select
                  value={community}
                  onChange={(
                    event:
                      ChangeEvent<HTMLSelectElement>,
                  ) =>
                    setCommunity(
                      event.target.value,
                    )
                  }
                  required
                >
                  <option value="" disabled>
                    Выберите сообщество
                  </option>
                  {communities.map((item) => (
                    <option
                      key={item.slug}
                      value={item.slug}
                    >
                      {item.parent
                        ? `↳ ${item.name} — внутри ${item.parent.name}`
                        : item.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Назначение
                <select
                  value={type}
                  onChange={(
                    event:
                      ChangeEvent<HTMLSelectElement>,
                  ) =>
                    setType(event.target.value)
                  }
                >
                  {types.map(
                    ([value, label]) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {label}
                      </option>
                    ),
                  )}
                </select>
              </label>
            </div>

            <div className="editor-section rich-editor-shell">
              <BbcodeEditor
                value={body}
                onChange={setBody}
                maxLength={30000}
                placeholder="Поделитесь мыслью, новостью или коротким вопросом."
              />
              <div className="field-counter">
                {body.length}/30000
              </div>
            </div>

            <div className="editor-section">
              <label>
                Хэштеги
                <input
                  value={tags}
                  onChange={(
                    event:
                      ChangeEvent<HTMLInputElement>,
                  ) =>
                    setTags(event.target.value)
                  }
                  maxLength={180}
                  placeholder="#проекты #продвижение"
                />
              </label>
            </div>

            {error && (
              <div
                className="error-box editor-error"
                role="alert"
              >
                {error}
              </div>
            )}

            {draftError && (
              <div
                className="draft-save-error"
                role="alert"
              >
                <span>{draftError}</span>
                <button
                  type="button"
                  onClick={retryDraftSave}
                >
                  Повторить
                </button>
              </div>
            )}

            <div className="editor-submit-row">
              <div className="draft-controls">
                <span className="draft-status">
                  {draftSavedAt
                    ? `Черновик сохранён · ${timeLabel(
                        draftSavedAt,
                      )}`
                    : hasContent
                      ? 'Автосохранение включено'
                      : 'Начните ввод — появится черновик'}
                </span>
              </div>

              <button
                className="button"
                disabled={
                  loading ||
                  !community ||
                  body.trim().length < 2
                }
              >
                {loading
                  ? 'Публикуем…'
                  : 'Опубликовать пост'}
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="topic-create-v15-7">
      <TopicCategoryTree
        activeSlug={community || null}
      />

      <section className="topic-create-main">
        <nav
          className="topic-create-breadcrumbs"
          aria-label="Хлебные крошки"
        >
          <Link href="/">Главная</Link>
          <span aria-hidden="true">›</span>
          <Link href="/communities">
            Сообщества
          </Link>

          {selectedCommunity?.parent && (
            <>
              <span aria-hidden="true">›</span>
              <Link
                href={`/communities/${selectedCommunity.parent.slug}`}
              >
                {selectedCommunity.parent.name}
              </Link>
            </>
          )}

          {selectedCommunity && (
            <>
              <span aria-hidden="true">›</span>
              <Link
                href={`/communities/${selectedCommunity.slug}`}
              >
                {selectedCommunity.name}
              </Link>
            </>
          )}
        </nav>

        <header className="topic-create-heading">
          <div>
            <h1>Создать тему</h1>
            <div className="topic-create-section-line">
              <span>
                {selectedCommunity?.name ??
                  'Раздел не выбран'}
              </span>

              <button
                type="button"
                className="topic-create-change-section"
                onClick={() =>
                  setCommunityPickerOpen(
                    (current) => !current,
                  )
                }
              >
                {communityPickerOpen
                  ? 'Скрыть выбор'
                  : 'Изменить раздел'}
              </button>
            </div>
          </div>

          <span
            className="topic-create-save-state"
            aria-live="polite"
          >
            {draftSavedAt
              ? `Черновик сохранён · ${timeLabel(
                  draftSavedAt,
                )}`
              : hasContent
                ? 'Автосохранение…'
                : 'Черновик сохраняется автоматически'}
          </span>
        </header>

        {communityPickerOpen && (
          <section className="topic-create-community-picker">
            <label>
              Раздел для темы
              <select
                value={community}
                onChange={(
                  event:
                    ChangeEvent<HTMLSelectElement>,
                ) => {
                  setCommunity(event.target.value);
                  setCommunityPickerOpen(false);
                }}
                required
              >
                <option value="" disabled>
                  Выберите раздел
                </option>

                {communities.map((item) => (
                  <option
                    key={item.slug}
                    value={item.slug}
                  >
                    {item.parent
                      ? `${item.parent.name} → ${item.name}`
                      : item.name}
                  </option>
                ))}
              </select>
            </label>
          </section>
        )}

        {pendingDraft && (
          <section
            className="topic-create-draft-restore"
            aria-live="polite"
          >
            <div>
              <strong>
                Найден незавершённый черновик
              </strong>
              <span>
                {pendingDraft.title ||
                  pendingDraft.body.slice(0, 80) ||
                  'без текста'}
              </span>
            </div>

            <div className="inline-actions">
              <button
                className="button secondary small-button"
                type="button"
                onClick={restoreDraft}
              >
                Восстановить
              </button>

              <button
                className="button ghost small-button"
                type="button"
                onClick={() =>
                  removeStoredDraft(false)
                }
              >
                Удалить
              </button>
            </div>
          </section>
        )}

        <form
          className="topic-create-form"
          onSubmit={submit}
        >
          <div className="topic-create-field topic-create-title-field">
            <label htmlFor="topic-create-title">
              Заголовок темы
            </label>
            <div className="topic-create-input-wrap">
              <input
                id="topic-create-title"
                value={title}
                onChange={(
                  event:
                    ChangeEvent<HTMLInputElement>,
                ) =>
                  setTitle(event.target.value)
                }
                minLength={3}
                maxLength={160}
                placeholder="Например: Как найти первых пользователей без рекламы?"
                required
              />
              <span>{title.length}/160</span>
            </div>
          </div>

          <div className="topic-create-field topic-create-tags-field">
            <label htmlFor="topic-create-tags">
              Хэштеги
            </label>

            <div className="topic-create-input-wrap">
              <input
                id="topic-create-tags"
                value={tags}
                onChange={(
                  event:
                    ChangeEvent<HTMLInputElement>,
                ) =>
                  setTags(event.target.value)
                }
                maxLength={180}
                placeholder="#стартап #первые-пользователи"
              />

              <span>
                {tagList.length}/5
              </span>
            </div>

            {tagList.length > 0 && (
              <div className="topic-create-tag-preview">
                {tagList.map((tag) => (
                  <span key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {extraTagCount > 0 && (
              <p className="topic-create-warning">
                Лишние теги не будут добавлены:
                {' '}
                {extraTagCount}.
              </p>
            )}
          </div>

          <div className="topic-create-editor-shell">
            <BbcodeEditor
              value={body}
              onChange={setBody}
              minLength={2}
              maxLength={30000}
              placeholder="Напишите текст темы…"
              mode="topic-create"
            />

            <div
              className="topic-create-editor-status"
              aria-live="polite"
            >
              <span>{body.length}/30000</span>
            </div>
          </div>

          {previewOpen && (
            <section
              className="topic-create-forrum-preview"
              aria-label="Предпросмотр FORRUM"
            >
              <div className="topic-create-preview-heading">
                <strong>
                  Предпросмотр FORRUM
                </strong>
                <button
                  type="button"
                  onClick={() =>
                    setPreviewOpen(false)
                  }
                >
                  Закрыть
                </button>
              </div>

              <article>
                <small>
                  {selectedCommunity?.name ??
                    'Раздел не выбран'}
                </small>
                <h2>
                  {title ||
                    'Заголовок будущей темы'}
                </h2>
                <BbcodeContent
                  source={
                    body ||
                    'Здесь появится содержимое темы.'
                  }
                />

                {tagList.length > 0 && (
                  <div className="topic-create-preview-tags">
                    {tagList.map((tag) => (
                      <span key={tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </section>
          )}

          {error && (
            <div
              className="error-box topic-create-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {draftError && (
            <div
              className="topic-create-draft-error"
              role="alert"
            >
              <span>{draftError}</span>
              <button
                type="button"
                onClick={retryDraftSave}
              >
                Повторить
              </button>
            </div>
          )}

          <footer className="topic-create-actions">
            <div className="topic-create-submit-actions">
              <button
                className="button ghost"
                type="button"
                aria-expanded={previewOpen}
                onClick={() =>
                  setPreviewOpen(
                    (current) => !current,
                  )
                }
              >
                Предпросмотр FORRUM
              </button>

              <button
                className="button"
                disabled={
                  loading ||
                  !community ||
                  title.trim().length < 3 ||
                  body.trim().length < 2
                }
              >
                {loading
                  ? 'Публикуем…'
                  : 'Опубликовать'}
              </button>
            </div>
          </footer>
        </form>
      </section>

      <aside
        className={`topic-create-telegram ${
          telegramPreviewOpen ? 'open' : 'collapsed'
        }`}
      >
        <button
          className="topic-create-telegram-heading"
          type="button"
          aria-expanded={telegramPreviewOpen}
          aria-controls="topic-create-telegram-content"
          onClick={() =>
            setTelegramPreviewOpen(
              (current) => !current,
            )
          }
        >
          <strong>Telegram-превью</strong>
          <span className="topic-create-telegram-heading-state">
            {telegramCheckedAt
              ? 'проверено'
              : telegramPreviewOpen
                ? 'проверка'
                : 'свёрнуто'}
          </span>
          <span
            className="topic-create-telegram-chevron"
            aria-hidden="true"
          >
            {telegramPreviewOpen ? '⌃' : '⌄'}
          </span>
        </button>

        {telegramPreviewOpen && (
          <div
            id="topic-create-telegram-content"
            className="topic-create-telegram-content"
          >
            <div
              className={`topic-create-telegram-state ${
                telegramCheckedAt
                  ? 'checked'
                  : ''
              }`}
            >
              <span
                className="topic-create-telegram-status-icon"
                aria-hidden="true"
              >
                {telegramCheckedAt ? '✓' : '•'}
              </span>

              <div>
                <strong>
                  {telegramCheckedAt
                    ? 'Готово'
                    : 'Нужна проверка'}
                </strong>
                <span>
                  {telegramCheckedAt
                    ? `Совместимость проверена · ${timeLabel(
                        telegramCheckedAt,
                      )}`
                    : 'Проверьте материал перед экспортом'}
                </span>
              </div>
            </div>

            <dl className="topic-create-telegram-rules">
              <div>
                <dt>Размер текста</dt>
                <dd>
                  {telegramUsesCustomSize
                    ? 'произвольный → стандартный'
                    : 'стандартный'}
                </dd>
              </div>

              <div>
                <dt>Цвет текста</dt>
                <dd>
                  {telegramUsesCustomColor
                    ? 'произвольный → стандартный'
                    : 'стандартный'}
                </dd>
              </div>

              <div>
                <dt>
                  {telegramAdaptationCount}
                  {' '}
                  {telegramAdaptationCount === 1
                    ? 'адаптация'
                    : 'адаптации'}
                </dt>
                <dd>
                  1 сообщение ·
                  {' '}
                  {telegramImageCount}
                  {' '}
                  {telegramImageCount === 1
                    ? 'изображение'
                    : 'изображений'}
                </dd>
              </div>
            </dl>

            <button
              className="topic-create-telegram-check"
              type="button"
              disabled={
                !title.trim() ||
                !body.trim()
              }
              onClick={() =>
                setTelegramCheckedAt(new Date())
              }
            >
              Проверить Telegram →
            </button>

            <p className="topic-create-telegram-note">
              Проверяется совместимость
              форматирования. Публикация в канал
              выполняется отдельной механикой
              подключённого Telegram-канала.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
