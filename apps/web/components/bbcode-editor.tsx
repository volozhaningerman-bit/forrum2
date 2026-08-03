'use client';

import type { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import { useRef, useState } from 'react';
import { api } from '@/lib/api';
import { BbcodeContent } from '@/components/bbcode-content';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  minLength?: number;
  maxLength: number;
  compact?: boolean;
  textareaRef?: RefObject<HTMLTextAreaElement | null>;
};

type Tool = { label: string; title: string; open: string; close: string; placeholder: string };
const tools: Tool[] = [
  { label: 'B', title: 'Жирный', open: '[b]', close: '[/b]', placeholder: 'жирный текст' },
  { label: 'I', title: 'Курсив', open: '[i]', close: '[/i]', placeholder: 'курсив' },
  { label: 'U', title: 'Подчёркивание', open: '[u]', close: '[/u]', placeholder: 'подчёркнутый текст' },
  { label: '“', title: 'Цитата', open: '[quote]', close: '[/quote]', placeholder: 'цитата' },
  { label: '</>', title: 'Код', open: '[code]', close: '[/code]', placeholder: 'код' },
  { label: '▾', title: 'Спойлер', open: '[spoiler=Показать]', close: '[/spoiler]', placeholder: 'скрытый текст' },
  { label: '☷', title: 'Список', open: '[list]\n[*]', close: '\n[*]Второй пункт\n[/list]', placeholder: 'Первый пункт' },
];

const colorOptions = [
  ['gray', 'Серый'], ['blue', 'Синий'], ['cyan', 'Голубой'], ['green', 'Зелёный'], ['yellow', 'Жёлтый'],
  ['orange', 'Оранжевый'], ['red', 'Красный'], ['pink', 'Розовый'], ['purple', 'Фиолетовый'],
] as const;
const sizeOptions = [['small', 'Мелкий'], ['normal', 'Обычный'], ['large', 'Крупный'], ['xlarge', 'Очень крупный']] as const;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
    reader.readAsDataURL(file);
  });
}

export function BbcodeEditor({ value, onChange, placeholder, minLength = 2, maxLength, compact = false, textareaRef }: Props) {
  const ownRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const linkSelectionRef = useRef({ start: 0, end: 0 });
  const ref = textareaRef ?? ownRef;
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const [linkText, setLinkText] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  function insert(open: string, close: string, placeholderText: string) {
    const field = ref.current;
    if (!field) return;
    const start = field.selectionStart ?? value.length;
    const end = field.selectionEnd ?? start;
    const selection = value.slice(start, end) || placeholderText;
    const next = `${value.slice(0, start)}${open}${selection}${close}${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => {
      field.focus();
      const cursor = start + open.length + selection.length + close.length;
      field.setSelectionRange(cursor, cursor);
    });
  }

  function wrap(tool: Tool) { insert(tool.open, tool.close, tool.placeholder); }

  function beginLink() {
    const field = ref.current;
    const start = field?.selectionStart ?? 0;
    const end = field?.selectionEnd ?? start;
    linkSelectionRef.current = { start, end };
    setLinkText(value.slice(start, end));
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
    const label = linkText.trim() || value.slice(start, end) || 'текст ссылки';
    const inserted = `[url=${normalized}]${label}[/url]`;
    onChange(`${value.slice(0, start)}${inserted}${value.slice(end)}`);
    setLinkOpen(false);
    setLinkText('');
    requestAnimationFrame(() => {
      const field = ref.current;
      field?.focus();
      field?.setSelectionRange(start + inserted.length, start + inserted.length);
    });
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setUploadError('');
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) { setUploadError('Разрешены PNG, JPEG и WebP'); return; }
    if (file.size > 8 * 1024 * 1024) { setUploadError('Изображение должно быть не больше 8 МБ'); return; }
    setUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      const uploaded = await api<{ url: string }>('/media', { method: 'POST', body: JSON.stringify({ kind: 'POST_IMAGE', originalName: file.name, dataUrl }) });
      const alt = file.name.replace(/\.[^.]+$/, '').slice(0, 100) || 'Изображение';
      insert(`[img=${alt}]`, '[/img]', uploaded.url);
    } catch (cause) {
      setUploadError(cause instanceof Error ? cause.message : 'Не удалось загрузить изображение');
    } finally { setUploading(false); }
  }

  return <div className={`bb-editor ${compact ? 'bb-editor-compact' : ''}`}>
    <div className="editor-toolbar bb-toolbar" aria-label="Форматирование текста">
      {!previewOpen && <div className="bb-toolbar-tools">
        {tools.map((tool) => <button key={tool.title} type="button" title={tool.title} aria-label={tool.title} onClick={() => wrap(tool)}>{tool.label}</button>)}
        <button type="button" title="Добавить ссылку" aria-label="Добавить ссылку" aria-expanded={linkOpen} onClick={beginLink}>↗</button>
        <select aria-label="Размер текста" defaultValue="" onChange={(event) => { if (event.target.value) insert(`[size=${event.target.value}]`, '[/size]', 'текст'); event.target.value = ''; }}>
          <option value="">Размер</option>{sizeOptions.map(([valueOption, label]) => <option key={valueOption} value={valueOption}>{label}</option>)}
        </select>
        <select aria-label="Цвет текста" defaultValue="" onChange={(event) => { if (event.target.value) insert(`[color=${event.target.value}]`, '[/color]', 'текст'); event.target.value = ''; }}>
          <option value="">Цвет</option>{colorOptions.map(([valueOption, label]) => <option key={valueOption} value={valueOption}>{label}</option>)}
        </select>
        <button type="button" title="Загрузить изображение" aria-label="Загрузить изображение" disabled={uploading} onClick={() => imageInputRef.current?.click()}>{uploading ? '…' : '▧'}</button>
        <input ref={imageInputRef} className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadImage}/>
      </div>}
      <button className={`bb-preview-toggle ${previewOpen ? 'active' : ''}`} type="button" aria-pressed={previewOpen} onClick={() => { setPreviewOpen((current) => !current); setLinkOpen(false); }}>{previewOpen ? 'К редактору' : 'Предпросмотр'}</button>
    </div>

    {linkOpen && <div className="bb-link-panel">
      <label>Адрес ссылки<input value={linkUrl} onChange={(event) => setLinkUrl(event.target.value)} onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => { if (event.key === 'Enter') { event.preventDefault(); addLink(); } }} inputMode="url" autoFocus required/></label>
      <label>Текст ссылки<input value={linkText} onChange={(event) => setLinkText(event.target.value)} onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => { if (event.key === 'Enter') { event.preventDefault(); addLink(); } }} placeholder="Можно оставить пустым"/></label>
      <div className="inline-actions"><button className="button small-button" type="button" onClick={addLink}>Вставить</button><button className="button ghost small-button" type="button" onClick={() => setLinkOpen(false)}>Отмена</button></div>
    </div>}

    <div aria-live="polite">
      {uploading && <div className="bb-upload-status">Загружаем и оптимизируем изображение…</div>}
      {uploadError && <div className="bb-upload-error">{uploadError}</div>}
    </div>

    {previewOpen ? <div className="bb-inline-preview">
      {value.trim() ? <BbcodeContent source={value}/> : <p className="muted">Предпросмотр появится после ввода текста.</p>}
    </div> : <textarea
      ref={ref}
      value={value}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
      minLength={minLength}
      maxLength={maxLength}
      placeholder={placeholder}
      required
    />}
  </div>;
}
