'use client';

import type {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  RefObject,
} from 'react';
import { useRef, useState } from 'react';

import { BbcodeContent } from '@/components/bbcode-content';
import { api } from '@/lib/api';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  minLength?: number;
  maxLength: number;
  compact?: boolean;
  textareaRef?: RefObject<HTMLTextAreaElement | null>;
  mode?: 'default' | 'topic-reply' | 'topic-create';
};

type Tool = {
  label: string;
  title: string;
  open: string;
  close: string;
  placeholder: string;
};

type SelectionRange = {
  start: number;
  end: number;
};

const tools: Tool[] = [
  { label: 'B', title: 'Жирный', open: '[b]', close: '[/b]', placeholder: 'жирный текст' },
  { label: 'I', title: 'Курсив', open: '[i]', close: '[/i]', placeholder: 'курсив' },
  { label: 'U', title: 'Подчёркивание', open: '[u]', close: '[/u]', placeholder: 'подчёркнутый текст' },
  { label: 'S', title: 'Зачёркивание', open: '[s]', close: '[/s]', placeholder: 'зачёркнутый текст' },
  { label: '❝', title: 'Цитата', open: '[quote]', close: '[/quote]', placeholder: 'цитата' },
  { label: '</>', title: 'Код', open: '[code]', close: '[/code]', placeholder: 'код' },
  { label: '☷', title: 'Список', open: '[list]\n[*]', close: '\n[*]Второй пункт\n[/list]', placeholder: 'Первый пункт' },
  { label: 'Спойлер', title: 'Спойлер', open: '[spoiler=Показать]', close: '[/spoiler]', placeholder: 'скрытый текст' },
];

const compactPrimaryToolTitles = new Set([
  'Жирный',
  'Курсив',
  'Подчёркивание',
  'Зачёркивание',
]);

const compactSecondaryToolTitles = new Set([
  'Цитата',
  'Код',
  'Список',
  'Спойлер',
]);

const colorOptions = [
  ['gray', 'Серый'],
  ['blue', 'Синий'],
  ['cyan', 'Голубой'],
  ['green', 'Зелёный'],
  ['yellow', 'Жёлтый'],
  ['orange', 'Оранжевый'],
  ['red', 'Красный'],
  ['pink', 'Розовый'],
  ['purple', 'Фиолетовый'],
] as const;

const sizeOptions = [
  ['small', 'Мелкий'],
  ['normal', 'Обычный'],
  ['large', 'Крупный'],
  ['xlarge', 'Очень крупный'],
] as const;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
    reader.readAsDataURL(file);
  });
}

function imageFileName(file: File) {
  const name = file.name.trim();
  if (name) return name;
  if (file.type === 'image/jpeg') return 'clipboard-image.jpg';
  if (file.type === 'image/webp') return 'clipboard-image.webp';
  return 'clipboard-image.png';
}

// FORRUM_EDITOR_ENGINE_V15_6
export function BbcodeEditor({
  value,
  onChange,
  placeholder,
  minLength = 2,
  maxLength,
  compact = false,
  textareaRef,
  mode = 'default',
}: Props) {
  const ownRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const linkSelectionRef = useRef<SelectionRange>({ start: 0, end: 0 });
  const formatSelectionRef = useRef<SelectionRange>({ start: 0, end: 0 });
  const ref = textareaRef ?? ownRef;
  const richTopicMode = mode === 'topic-reply' || mode === 'topic-create';

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const [linkText, setLinkText] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [customSize, setCustomSize] = useState(16);
  const [customColor, setCustomColor] = useState('#e84949');

  function currentSelection(): SelectionRange {
    const field = ref.current;
    const start = field?.selectionStart ?? value.length;
    const end = field?.selectionEnd ?? start;
    return { start, end };
  }

  function rememberFormatSelection() {
    formatSelectionRef.current = currentSelection();
  }

  function insertAt(
    selection: SelectionRange,
    open: string,
    close: string,
    placeholderText: string,
  ) {
    const start = Math.max(0, Math.min(selection.start, value.length));
    const end = Math.max(start, Math.min(selection.end, value.length));
    const selected = value.slice(start, end) || placeholderText;
    const inserted = `${open}${selected}${close}`;
    onChange(`${value.slice(0, start)}${inserted}${value.slice(end)}`);

    requestAnimationFrame(() => {
      const field = ref.current;
      if (!field) return;
      field.focus();
      const cursor = start + inserted.length;
      field.setSelectionRange(cursor, cursor);
    });
  }

  function insert(open: string, close: string, placeholderText: string) {
    insertAt(currentSelection(), open, close, placeholderText);
  }

  function wrap(tool: Tool) {
    insert(tool.open, tool.close, tool.placeholder);
  }

  function applyCustomSize() {
    const normalized = Math.max(10, Math.min(48, customSize));
    setCustomSize(normalized);
    insertAt(
      formatSelectionRef.current,
      `[size=${normalized}px]`,
      '[/size]',
      'текст',
    );
  }

  function applyCustomColor() {
    insertAt(
      formatSelectionRef.current,
      `[color=${customColor.toLowerCase()}]`,
      '[/color]',
      'текст',
    );
  }

  function beginLink() {
    const selection = currentSelection();
    linkSelectionRef.current = selection;
    setLinkText(value.slice(selection.start, selection.end));
    setLinkUrl('https://');
    setUploadError('');
    setLinkOpen(true);
  }

  function addLink() {
    const normalized = linkUrl.trim();
    if (!/^https:\/\//i.test(normalized)) {
      setUploadError('Ссылка должна начинаться с https://');
      return;
    }

    const { start, end } = linkSelectionRef.current;
    const label =
      linkText.trim() ||
      value.slice(start, end) ||
      'текст ссылки';
    const inserted = `[url=${normalized}]${label}[/url]`;

    onChange(`${value.slice(0, start)}${inserted}${value.slice(end)}`);
    setLinkOpen(false);
    setLinkText('');

    requestAnimationFrame(() => {
      const field = ref.current;
      field?.focus();
      field?.setSelectionRange(
        start + inserted.length,
        start + inserted.length,
      );
    });
  }

  async function uploadFile(file: File, selection: SelectionRange) {
    setUploadError('');

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setUploadError('Разрешены PNG, JPEG и WebP');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Изображение должно быть не больше 8 МБ');
      return;
    }

    setUploading(true);

    try {
      const originalName = imageFileName(file);
      const dataUrl = await fileToDataUrl(file);
      const uploaded = await api<{ url: string }>('/media', {
        method: 'POST',
        body: JSON.stringify({
          kind: 'POST_IMAGE',
          originalName,
          dataUrl,
        }),
      });

      const alt =
        originalName.replace(/\.[^.]+$/, '').slice(0, 100) ||
        'Изображение';

      insertAt(
        selection,
        `[img=${alt}]`,
        '[/img]',
        uploaded.url,
      );
    } catch (cause) {
      setUploadError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось загрузить изображение',
      );
    } finally {
      setUploading(false);
    }
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    await uploadFile(file, formatSelectionRef.current);
  }

  async function handlePaste(
    event: ClipboardEvent<HTMLTextAreaElement>,
  ) {
    const image = Array.from(event.clipboardData.items).find(
      (item) =>
        item.kind === 'file' &&
        item.type.startsWith('image/'),
    );

    if (!image) return;

    const file = image.getAsFile();
    if (!file) return;

    event.preventDefault();
    await uploadFile(file, currentSelection());
  }

  const editorClassName = [
    'bb-editor',
    compact ? 'bb-editor-compact' : '',
    richTopicMode ? `bb-editor-${mode}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={editorClassName} data-editor-mode={mode}>
      <div
        className="editor-toolbar bb-toolbar"
        aria-label="Форматирование текста"
      >
        {!previewOpen && (
          <div className="bb-toolbar-tools">
            {richTopicMode ? (
              <>
                <div
                  className="bb-tool-group bb-tool-group-primary"
                  aria-label="Основное форматирование"
                >
                  {tools
                    .filter((tool) =>
                      compactPrimaryToolTitles.has(tool.title),
                    )
                    .map((tool) => (
                      <button
                        key={tool.title}
                        type="button"
                        title={tool.title}
                        aria-label={tool.title}
                        onClick={() => wrap(tool)}
                      >
                        {tool.label}
                      </button>
                    ))}
                </div>

                <div
                  className="bb-tool-group bb-tool-size"
                  aria-label="Размер текста"
                >
                  <span className="bb-tool-caption">Размер</span>
                  <input
                    className="bb-size-input"
                    type="number"
                    min={10}
                    max={48}
                    step={1}
                    value={customSize}
                    aria-label="Размер текста в пикселях"
                    onMouseDown={rememberFormatSelection}
                    onFocus={rememberFormatSelection}
                    onChange={(event) =>
                      setCustomSize(Number(event.target.value) || 16)
                    }
                  />
                  <button
                    className="bb-unit-button"
                    type="button"
                    title="Применить размер"
                    aria-label={`Применить размер ${customSize} пикселей`}
                    onMouseDown={rememberFormatSelection}
                    onClick={applyCustomSize}
                  >
                    px
                  </button>
                </div>

                <div
                  className="bb-tool-group bb-tool-color"
                  aria-label="Цвет текста"
                >
                  <input
                    className="bb-color-native"
                    type="color"
                    value={customColor}
                    title="Выбрать произвольный цвет"
                    aria-label="Выбрать произвольный цвет"
                    onMouseDown={rememberFormatSelection}
                    onFocus={rememberFormatSelection}
                    onChange={(event) =>
                      setCustomColor(event.target.value)
                    }
                  />
                  <button
                    className="bb-color-value"
                    type="button"
                    title="Применить выбранный цвет"
                    aria-label={`Применить цвет ${customColor}`}
                    onMouseDown={rememberFormatSelection}
                    onClick={applyCustomColor}
                  >
                    {customColor.toUpperCase()}
                  </button>
                </div>

                <div
                  className="bb-tool-group bb-tool-group-secondary"
                  aria-label="Вставка и блоки"
                >
                  <button
                    type="button"
                    title="Добавить ссылку"
                    aria-label="Добавить ссылку"
                    aria-expanded={linkOpen}
                    onClick={beginLink}
                  >
                    ↗
                  </button>

                  <button
                    type="button"
                    title="Вставить изображение"
                    aria-label="Вставить изображение"
                    disabled={uploading}
                    onMouseDown={rememberFormatSelection}
                    onClick={() => imageInputRef.current?.click()}
                  >
                    {uploading ? '…' : '📎'}
                  </button>

                  {tools
                    .filter((tool) =>
                      compactSecondaryToolTitles.has(tool.title),
                    )
                    .map((tool) => (
                      <button
                        key={tool.title}
                        type="button"
                        title={tool.title}
                        aria-label={tool.title}
                        onClick={() => wrap(tool)}
                      >
                        {tool.label}
                      </button>
                    ))}
                </div>
              </>
            ) : (
              <>
                {tools.map((tool) => (
                  <button
                    key={tool.title}
                    type="button"
                    title={tool.title}
                    aria-label={tool.title}
                    onClick={() => wrap(tool)}
                  >
                    {tool.label}
                  </button>
                ))}

                <button
                  type="button"
                  title="Добавить ссылку"
                  aria-label="Добавить ссылку"
                  aria-expanded={linkOpen}
                  onClick={beginLink}
                >
                  ↗
                </button>

                <select
                  aria-label="Размер текста"
                  defaultValue=""
                  onChange={(event) => {
                    if (event.target.value) {
                      insert(
                        `[size=${event.target.value}]`,
                        '[/size]',
                        'текст',
                      );
                    }
                    event.target.value = '';
                  }}
                >
                  <option value="">Размер</option>
                  {sizeOptions.map(([valueOption, label]) => (
                    <option key={valueOption} value={valueOption}>
                      {label}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Цвет текста"
                  defaultValue=""
                  onChange={(event) => {
                    if (event.target.value) {
                      insert(
                        `[color=${event.target.value}]`,
                        '[/color]',
                        'текст',
                      );
                    }
                    event.target.value = '';
                  }}
                >
                  <option value="">Цвет</option>
                  {colorOptions.map(([valueOption, label]) => (
                    <option key={valueOption} value={valueOption}>
                      {label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  title="Загрузить изображение"
                  aria-label="Загрузить изображение"
                  disabled={uploading}
                  onMouseDown={rememberFormatSelection}
                  onClick={() => imageInputRef.current?.click()}
                >
                  {uploading ? '…' : '▧'}
                </button>
              </>
            )}

            <input
              ref={imageInputRef}
              className="visually-hidden"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={uploadImage}
            />
          </div>
        )}

        <button
          className={`bb-preview-toggle ${
            previewOpen ? 'active' : ''
          }`}
          type="button"
          aria-pressed={previewOpen}
          onClick={() => {
            setPreviewOpen((current) => !current);
            setLinkOpen(false);
          }}
        >
          {previewOpen ? 'К редактору' : 'Предпросмотр'}
        </button>
      </div>

      {linkOpen && (
        <div className="bb-link-panel">
          <label>
            Адрес ссылки
            <input
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addLink();
                }
              }}
              inputMode="url"
              autoFocus
              required
            />
          </label>

          <label>
            Текст ссылки
            <input
              value={linkText}
              onChange={(event) => setLinkText(event.target.value)}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addLink();
                }
              }}
              placeholder="Можно оставить пустым"
            />
          </label>

          <div className="inline-actions">
            <button
              className="button small-button"
              type="button"
              onClick={addLink}
            >
              Вставить
            </button>
            <button
              className="button ghost small-button"
              type="button"
              onClick={() => setLinkOpen(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <div aria-live="polite">
        {uploading && (
          <div className="bb-upload-status">
            Загружаем и оптимизируем изображение…
          </div>
        )}
        {uploadError && (
          <div className="bb-upload-error">{uploadError}</div>
        )}
      </div>

      {previewOpen ? (
        <div className="bb-inline-preview">
          {value.trim() ? (
            <BbcodeContent source={value} />
          ) : (
            <p className="muted">
              Предпросмотр появится после ввода текста.
            </p>
          )}
        </div>
      ) : (
        <textarea
          ref={ref}
          value={value}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(event.target.value)
          }
          onPaste={handlePaste}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          required
        />
      )}

      {richTopicMode && (
        <div className="bb-editor-hint">
          Ctrl+V или скрепка вставляют изображение прямо в позицию
          текстового курсора.
        </div>
      )}
    </div>
  );
}
