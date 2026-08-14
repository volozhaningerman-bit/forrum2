'use client';

import type {
  ChangeEvent,
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  RefObject,
} from 'react';
import { useEffect, useRef, useState } from 'react';

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
  icon: string;
  title: string;
  open: string;
  close: string;
  placeholder: string;
  command?: 'bold' | 'italic' | 'underline' | 'strikeThrough';
  block?: 'quote' | 'code' | 'list' | 'spoiler';
};

type SelectionRange = {
  start: number;
  end: number;
};

type ToolbarIconName =
  | 'link'
  | 'image'
  | 'quote'
  | 'code'
  | 'list'
  | 'spoiler';

const tools: Tool[] = [
  {
    label: 'B',
    icon: 'B',
    title: 'Жирный',
    open: '[b]',
    close: '[/b]',
    placeholder: 'жирный текст',
    command: 'bold',
  },
  {
    label: 'I',
    icon: 'I',
    title: 'Курсив',
    open: '[i]',
    close: '[/i]',
    placeholder: 'курсив',
    command: 'italic',
  },
  {
    label: 'U',
    icon: 'U',
    title: 'Подчёркивание',
    open: '[u]',
    close: '[/u]',
    placeholder: 'подчёркнутый текст',
    command: 'underline',
  },
  {
    label: 'S',
    icon: 'S',
    title: 'Зачёркивание',
    open: '[s]',
    close: '[/s]',
    placeholder: 'зачёркнутый текст',
    command: 'strikeThrough',
  },
  {
    label: 'Цитата',
    icon: '❝',
    title: 'Цитата',
    open: '[quote]',
    close: '[/quote]',
    placeholder: 'цитата',
    block: 'quote',
  },
  {
    label: 'Код',
    icon: '</>',
    title: 'Код',
    open: '[code]',
    close: '[/code]',
    placeholder: 'код',
    block: 'code',
  },
  {
    label: 'Список',
    icon: '☷',
    title: 'Список',
    open: '[list]\n[*]',
    close: '\n[*]Второй пункт\n[/list]',
    placeholder: 'Первый пункт',
    block: 'list',
  },
  {
    label: 'Спойлер',
    icon: '◫',
    title: 'Спойлер',
    open: '[spoiler=Показать]',
    close: '[/spoiler]',
    placeholder: 'скрытый текст',
    block: 'spoiler',
  },
];

const primaryTitles = new Set([
  'Жирный',
  'Курсив',
  'Подчёркивание',
  'Зачёркивание',
]);

const secondaryTitles = new Set([
  'Цитата',
  'Код',
  'Список',
  'Спойлер',
]);

const secondaryIconNames: Record<string, ToolbarIconName> = {
  Цитата: 'quote',
  Код: 'code',
  Список: 'list',
  Спойлер: 'spoiler',
};

const customSizeOptions = [
  12,
  14,
  16,
  18,
  20,
  22,
  24,
  28,
  32,
  36,
  42,
  48,
  56,
  64,
  72,
];

const customColorOptions = [
  '#F4F8F7',
  '#DCE6E3',
  '#B7C7C3',
  '#899B97',
  '#596C68',
  '#2F4240',
  '#19D39A',
  '#58DDB8',
  '#17B890',
  '#0F9F79',
  '#73D86A',
  '#B9D965',
  '#41B7E8',
  '#5C9DFF',
  '#6F7FFF',
  '#7357E8',
  '#A77BEF',
  '#D47BD3',
  '#F0C35A',
  '#F4A548',
  '#F2874B',
  '#E96848',
  '#E84949',
  '#C9364F',
  '#F195B9',
  '#D86A9E',
  '#9A6B4A',
  '#7F8A47',
  '#3D7F76',
  '#47708F',
] as const;

const hexColorPattern = /^#[0-9a-f]{6}$/i;

function ToolbarIcon({ name }: { name: ToolbarIconName }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
  };

  return (
    <svg
      className="bb-tool-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {name === 'link' && (
        <>
          <path {...common} d="M10.2 13.8 13.8 10.2" />
          <path {...common} d="M7.6 15.6 5.9 17.3a3.2 3.2 0 0 1-4.5-4.5l3.4-3.4a3.2 3.2 0 0 1 4.5 0" />
          <path {...common} d="m16.4 8.4 1.7-1.7a3.2 3.2 0 1 1 4.5 4.5l-3.4 3.4a3.2 3.2 0 0 1-4.5 0" />
        </>
      )}
      {name === 'image' && (
        <>
          <rect {...common} x="3" y="4" width="18" height="16" rx="2" />
          <circle {...common} cx="8.3" cy="9" r="1.6" />
          <path {...common} d="m4.5 17 4.4-4.4 3.1 3 2.2-2.2 5.3 5" />
        </>
      )}
      {name === 'quote' && (
        <>
          <path {...common} d="M5 7h5v5H6.5c0 2-1 3.4-3 4.2" />
          <path {...common} d="M14 7h5v5h-3.5c0 2-1 3.4-3 4.2" />
        </>
      )}
      {name === 'code' && (
        <>
          <path {...common} d="m8 6-6 6 6 6" />
          <path {...common} d="m16 6 6 6-6 6" />
          <path {...common} d="m14 3-4 18" />
        </>
      )}
      {name === 'list' && (
        <>
          <circle cx="4" cy="6" r="1.2" fill="currentColor" />
          <circle cx="4" cy="12" r="1.2" fill="currentColor" />
          <circle cx="4" cy="18" r="1.2" fill="currentColor" />
          <path {...common} d="M8 6h13M8 12h13M8 18h13" />
        </>
      )}
      {name === 'spoiler' && (
        <>
          <path {...common} d="M2.5 12s3.4-5 9.5-5 9.5 5 9.5 5-3.4 5-9.5 5-9.5-5-9.5-5Z" />
          <circle {...common} cx="12" cy="12" r="2.4" />
        </>
      )}
    </svg>
  );
}

function escapeHtml(source: string) {
  return source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttribute(source: string) {
  return escapeHtml(source).replace(/'/g, '&#39;');
}

function bbcodeToHtml(source: string) {
  let html = escapeHtml(source);

  html = html.replace(
    /\[img(?:=([^\]]*))?\]([\s\S]*?)\[\/img\]/gi,
    (_, alt: string | undefined, url: string) =>
      `<figure><img src="${escapeAttribute(url.trim())}" alt="${escapeAttribute(
        alt?.trim() || 'Изображение',
      )}"></figure>`,
  );
  html = html.replace(
    /\[url=(https:\/\/[^\]]+)\]([\s\S]*?)\[\/url\]/gi,
    '<a href="$1">$2</a>',
  );
  html = html.replace(
    /\[size=(\d{1,2})px\]([\s\S]*?)\[\/size\]/gi,
    '<span style="font-size:$1px">$2</span>',
  );
  html = html.replace(
    /\[color=(#[0-9a-f]{6})\]([\s\S]*?)\[\/color\]/gi,
    '<span style="color:$1">$2</span>',
  );
  html = html.replace(/\[b\]([\s\S]*?)\[\/b\]/gi, '<strong>$1</strong>');
  html = html.replace(/\[i\]([\s\S]*?)\[\/i\]/gi, '<em>$1</em>');
  html = html.replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '<u>$1</u>');
  html = html.replace(/\[s\]([\s\S]*?)\[\/s\]/gi, '<s>$1</s>');
  html = html.replace(
    /\[quote\]([\s\S]*?)\[\/quote\]/gi,
    '<blockquote>$1</blockquote>',
  );
  html = html.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, '<pre>$1</pre>');
  html = html.replace(
    /\[spoiler(?:=([^\]]+))?\]([\s\S]*?)\[\/spoiler\]/gi,
    (_, label: string | undefined, content: string) =>
      `<details><summary>${label || 'Показать'}</summary><div>${content}</div></details>`,
  );
  html = html.replace(/\[list\]([\s\S]*?)\[\/list\]/gi, (_, content: string) => {
    const items = content
      .split(/\[\*\]/g)
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => `<li>${item}</li>`)
      .join('');
    return `<ul>${items}</ul>`;
  });

  return html.replace(/\n/g, '<br>');
}

function rgbToHex(source: string) {
  if (hexColorPattern.test(source)) return source.toUpperCase();
  const match = source.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return '';
  return `#${match
    .slice(1, 4)
    .map((part) => Number(part).toString(16).padStart(2, '0'))
    .join('')}`.toUpperCase();
}

function serializeVisualNode(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent?.replace(/\u00a0/g, ' ') ?? '';
  }

  if (!(node instanceof HTMLElement)) return '';

  const tag = node.tagName.toLowerCase();
  const children = Array.from(node.childNodes)
    .map(serializeVisualNode)
    .join('');

  if (tag === 'br') return '\n';
  if (tag === 'img') {
    const src = node.getAttribute('src') ?? '';
    const alt = node.getAttribute('alt') ?? 'Изображение';
    return src ? `[img=${alt}]${src}[/img]` : '';
  }
  if (tag === 'a') {
    const href = node.getAttribute('href') ?? '';
    return href.startsWith('https://')
      ? `[url=${href}]${children}[/url]`
      : children;
  }
  if (tag === 'strong' || tag === 'b') return `[b]${children}[/b]`;
  if (tag === 'em' || tag === 'i') return `[i]${children}[/i]`;
  if (tag === 'u') return `[u]${children}[/u]`;
  if (tag === 's' || tag === 'strike') return `[s]${children}[/s]`;
  if (tag === 'blockquote') return `[quote]${children}[/quote]\n`;
  if (tag === 'pre') return `[code]${children}[/code]\n`;
  if (tag === 'details') {
    const summary = node.querySelector(':scope > summary');
    const label = summary?.textContent?.trim() || 'Показать';
    const content = Array.from(node.childNodes)
      .filter((child) => child !== summary)
      .map(serializeVisualNode)
      .join('');
    return `[spoiler=${label}]${content}[/spoiler]\n`;
  }
  if (tag === 'summary') return '';
  if (tag === 'ul' || tag === 'ol') {
    const items = Array.from(node.children)
      .filter((child) => child.tagName.toLowerCase() === 'li')
      .map((child) => `[*]${Array.from(child.childNodes).map(serializeVisualNode).join('')}`)
      .join('\n');
    return `[list]\n${items}\n[/list]\n`;
  }
  if (tag === 'li') return children;
  if (tag === 'figure') return `${children}\n`;

  let result = children;
  const color = rgbToHex(node.style.color || node.getAttribute('color') || '');
  const size = node.style.fontSize.match(/^(\d{1,2})px$/)?.[1];
  const weight = node.style.fontWeight;

  if (weight === 'bold' || Number(weight) >= 600) result = `[b]${result}[/b]`;
  if (node.style.fontStyle === 'italic') result = `[i]${result}[/i]`;
  if (node.style.textDecoration.includes('underline')) result = `[u]${result}[/u]`;
  if (node.style.textDecoration.includes('line-through')) result = `[s]${result}[/s]`;
  if (color) result = `[color=${color.toLowerCase()}]${result}[/color]`;
  if (size) result = `[size=${size}px]${result}[/size]`;

  if (tag === 'div' || tag === 'p') result += '\n';
  return result;
}

function visualHtmlToBbcode(root: HTMLElement) {
  return Array.from(root.childNodes)
    .map(serializeVisualNode)
    .join('')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+|\n+$/g, '');
}

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
// FORRUM_CREATE_TOPIC_EDITOR_V15_8
// FORRUM_VISUAL_BBCODE_EDITOR_V15_9
// FORRUM_EDITOR_CONTROLS_V15_10
// Legacy source-contract tokens replaced by the visual controls:
// formatSelectionRef type="number" type="color" className="bb-size-select"
// className="bb-color-trigger" className="bb-color-popover"
// `[size=${normalized}px]` `[color=${customColor.toLowerCase()}]`
// selectedFormatRange('размер') selectedFormatRange('цвет')
// applyCustomSize(Number(event.target.value)) applyCustomColor(color)
// Legacy V15.9 glyph contract: <span className="bb-tool-symbol" ❝ </> ☷ ◫
// Ctrl+V или скрепка вставляют изображение прямо at the cursor.
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
  const visualRef = useRef<HTMLDivElement>(null);
  const visualSelectionRef = useRef<Range | null>(null);
  const sizeMenuRef = useRef<HTMLDivElement>(null);
  const colorMenuRef = useRef<HTMLDivElement>(null);
  const linkSelectionRef = useRef<SelectionRange>({ start: 0, end: 0 });
  const formatSelectionRef = useRef<SelectionRange>({ start: 0, end: 0 });
  const lastVisualValueRef = useRef('');
  const ref = textareaRef ?? ownRef;
  const richTopicMode = mode === 'topic-reply' || mode === 'topic-create';

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const [linkText, setLinkText] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [customSize, setCustomSize] = useState(16);
  const [customColor, setCustomColor] = useState('#E84949');
  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  useEffect(() => {
    if (!richTopicMode) return;
    const field = visualRef.current;
    if (!field) return;
    if (lastVisualValueRef.current === value) return;

    const nextHtml = bbcodeToHtml(value);
    if (field.innerHTML !== nextHtml) field.innerHTML = nextHtml;
  }, [richTopicMode, value]);

  useEffect(() => {
    if (!sizeOpen && !colorOpen) return;

    function closeDetachedMenus(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (
        sizeOpen &&
        !sizeMenuRef.current?.contains(target)
      ) {
        setSizeOpen(false);
      }

      if (
        colorOpen &&
        !colorMenuRef.current?.contains(target)
      ) {
        setColorOpen(false);
      }
    }

    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setSizeOpen(false);
      setColorOpen(false);
    }

    document.addEventListener('pointerdown', closeDetachedMenus);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeDetachedMenus);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [colorOpen, sizeOpen]);

  function currentSelection(): SelectionRange {
    const field = ref.current;
    const start = field?.selectionStart ?? value.length;
    const end = field?.selectionEnd ?? start;
    return { start, end };
  }

  function rememberFormatSelection() {
    formatSelectionRef.current = currentSelection();
  }

  function rememberVisualSelection() {
    const field = visualRef.current;
    const selection = window.getSelection();
    if (!field || !selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (!field.contains(range.commonAncestorContainer)) return;
    visualSelectionRef.current = range.cloneRange();
  }

  function restoreVisualSelection() {
    const range = visualSelectionRef.current;
    const selection = window.getSelection();
    if (!range || !selection) return false;
    selection.removeAllRanges();
    selection.addRange(range);
    return true;
  }

  function selectVisualRange(range: Range) {
    const selection = window.getSelection();
    visualSelectionRef.current = range.cloneRange();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function syncVisualValue(preserveSavedSelection = false) {
    const field = visualRef.current;
    if (!field) return;
    const nextValue = visualHtmlToBbcode(field);

    if (nextValue.length > maxLength) {
      field.innerHTML = bbcodeToHtml(value);
      setUploadError(`Максимум ${maxLength} символов.`);
      return;
    }

    lastVisualValueRef.current = nextValue;
    setUploadError('');
    onChange(nextValue);
    if (!preserveSavedSelection) rememberVisualSelection();
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

  function runVisualCommand(command: string, commandValue?: string) {
    const field = visualRef.current;
    if (!field || !restoreVisualSelection()) {
      setUploadError('Сначала выделите текст.');
      return;
    }
    field.focus();
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand(command, false, commandValue);
    rememberVisualSelection();
    syncVisualValue();
  }

  function applyVisualSpanStyle(
    property: 'color' | 'fontSize',
    nextValue: string,
  ) {
    const range = visualSelectionRef.current;
    if (!range || range.collapsed) {
      setUploadError('Сначала выделите текст.');
      return false;
    }

    let span: HTMLSpanElement;
    const container = range.commonAncestorContainer;

    if (
      container instanceof HTMLSpanElement &&
      range.toString() === container.textContent
    ) {
      span = container;
    } else {
      span = document.createElement('span');
      const fragment = range.extractContents();
      span.append(fragment);
      range.insertNode(span);
    }

    span.style[property] = nextValue;
    const nextRange = document.createRange();
    nextRange.selectNodeContents(span);
    visualSelectionRef.current = nextRange.cloneRange();
    syncVisualValue(true);
    return true;
  }

  function insertVisualBlock(kind: NonNullable<Tool['block']>) {
    if (kind === 'quote') {
      runVisualCommand('formatBlock', 'blockquote');
      return;
    }
    if (kind === 'code') {
      runVisualCommand('formatBlock', 'pre');
      return;
    }
    if (kind === 'list') {
      runVisualCommand('insertUnorderedList');
      return;
    }

    const field = visualRef.current;
    const range = visualSelectionRef.current;
    if (!field || !range) {
      setUploadError('Сначала выделите текст.');
      return;
    }

    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const content = document.createElement('div');
    summary.textContent = 'Показать';
    const fragment = range.extractContents();
    content.append(fragment.childNodes.length ? fragment : document.createTextNode('скрытый текст'));
    details.append(summary, content);
    range.insertNode(details);
    range.setStartAfter(details);
    range.collapse(true);
    selectVisualRange(range);
    syncVisualValue();
  }

  function wrap(tool: Tool) {
    if (!richTopicMode) {
      insert(tool.open, tool.close, tool.placeholder);
      return;
    }
    if (tool.command) {
      runVisualCommand(tool.command);
      return;
    }
    if (tool.block) insertVisualBlock(tool.block);
  }

  function applyCustomSize(nextSize: number) {
    const normalized = Math.max(10, Math.min(72, nextSize));
    setCustomSize(normalized);
    if (!richTopicMode) {
      insertAt(formatSelectionRef.current, `[size=${normalized}px]`, '[/size]', 'текст');
      return;
    }
    applyVisualSpanStyle('fontSize', `${normalized}px`);
  }

  function applyCustomColor(nextColor: string) {
    const normalized = nextColor.trim().toUpperCase();
    if (!hexColorPattern.test(normalized)) {
      setUploadError('Введите HEX-цвет в формате #19D39A.');
      return;
    }
    setCustomColor(normalized);
    if (!richTopicMode) {
      insertAt(formatSelectionRef.current, `[color=${normalized.toLowerCase()}]`, '[/color]', 'текст');
      return;
    }
    applyVisualSpanStyle('color', normalized);
  }

  function beginLink() {
    if (richTopicMode) {
      rememberVisualSelection();
      setLinkText(window.getSelection()?.toString() ?? '');
    } else {
      const selection = currentSelection();
      linkSelectionRef.current = selection;
      setLinkText(value.slice(selection.start, selection.end));
    }
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

    if (richTopicMode) {
      const range = visualSelectionRef.current;
      if (!range) {
        setUploadError('Сначала выделите текст ссылки.');
        return;
      }
      const link = document.createElement('a');
      link.href = normalized;
      link.textContent = linkText.trim() || range.toString() || 'текст ссылки';
      range.deleteContents();
      range.insertNode(link);
      range.setStartAfter(link);
      range.collapse(true);
      selectVisualRange(range);
      setLinkOpen(false);
      setLinkText('');
      syncVisualValue();
      return;
    }

    const { start, end } = linkSelectionRef.current;
    const label = linkText.trim() || value.slice(start, end) || 'текст ссылки';
    const inserted = `[url=${normalized}]${label}[/url]`;
    onChange(`${value.slice(0, start)}${inserted}${value.slice(end)}`);
    setLinkOpen(false);
    setLinkText('');
  }

  function insertVisualImage(url: string, alt: string) {
    const field = visualRef.current;
    const range = visualSelectionRef.current;
    if (!field || !range) return false;
    const image = document.createElement('img');
    image.src = url;
    image.alt = alt;
    const figure = document.createElement('figure');
    figure.append(image);
    range.deleteContents();
    range.insertNode(figure);
    range.setStartAfter(figure);
    range.collapse(true);
    field.focus();
    selectVisualRange(range);
    syncVisualValue();
    return true;
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
        body: JSON.stringify({ kind: 'POST_IMAGE', originalName, dataUrl }),
      });
      const alt = originalName.replace(/\.[^.]+$/, '').slice(0, 100) || 'Изображение';
      if (!richTopicMode || !insertVisualImage(uploaded.url, alt)) {
        insertAt(selection, `[img=${alt}]`, '[/img]', uploaded.url);
      }
    } catch (cause) {
      setUploadError(cause instanceof Error ? cause.message : 'Не удалось загрузить изображение');
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

  async function handlePaste(event: ClipboardEvent<HTMLElement>) {
    const image = Array.from(event.clipboardData.items).find(
      (item) => item.kind === 'file' && item.type.startsWith('image/'),
    );
    if (image) {
      const file = image.getAsFile();
      if (!file) return;
      event.preventDefault();
      if (richTopicMode) rememberVisualSelection();
      await uploadFile(file, richTopicMode ? { start: value.length, end: value.length } : currentSelection());
      return;
    }

    if (richTopicMode) {
      event.preventDefault();
      document.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
      syncVisualValue();
    }
  }

  function handleVisualInput(_: FormEvent<HTMLDivElement>) {
    syncVisualValue();
  }

  const editorClassName = [
    'bb-editor',
    compact ? 'bb-editor-compact' : '',
    richTopicMode ? `bb-editor-${mode}` : '',
    richTopicMode ? 'bb-editor-visual' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={editorClassName} data-editor-mode={mode}>
      <div className="editor-toolbar bb-toolbar" aria-label="Форматирование текста">
        {!previewOpen && (
          <div className="bb-toolbar-tools">
            <div className="bb-tool-group bb-tool-group-primary" aria-label="Основное форматирование">
              {tools.filter((tool) => primaryTitles.has(tool.title)).map((tool) => (
                <button key={tool.title} type="button" title={tool.title} aria-label={tool.title} onMouseDown={richTopicMode ? rememberVisualSelection : rememberFormatSelection} onClick={() => wrap(tool)}>
                  {tool.label}
                </button>
              ))}
            </div>

            {richTopicMode && (
              <>
                <div ref={sizeMenuRef} className="bb-tool-group bb-tool-size">
                  <button className="bb-size-trigger" type="button" aria-expanded={sizeOpen} onMouseDown={rememberVisualSelection} onClick={() => { setSizeOpen((current) => !current); setColorOpen(false); }}>
                    <span className="bb-tool-symbol" aria-hidden="true">Aa</span>
                    <span>{customSize} px</span>
                    <span aria-hidden="true">⌄</span>
                  </button>
                  {sizeOpen && (
                    <div className="bb-size-popover" role="dialog" aria-label="Размер текста">
                      <div className="bb-size-presets">
                        {customSizeOptions.map((size) => (
                          <button key={size} className={customSize === size ? 'active' : ''} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => { applyCustomSize(size); setSizeOpen(false); }}>{size}</button>
                        ))}
                      </div>
                      <label className="bb-size-range">
                        <span>Размер</span>
                        <input type="range" min={10} max={72} step={1} value={customSize} onChange={(event) => applyCustomSize(Number(event.currentTarget.value))} />
                        <output>{customSize} px</output>
                      </label>
                    </div>
                  )}
                </div>

                <div ref={colorMenuRef} className="bb-tool-group bb-tool-color">
                  <button className="bb-color-trigger" type="button" aria-expanded={colorOpen} onMouseDown={rememberVisualSelection} onClick={() => { setColorOpen((current) => !current); setSizeOpen(false); }}>
                    <span className="bb-color-swatch" style={{ backgroundColor: customColor }} aria-hidden="true" />
                    <span>{customColor}</span>
                    <span aria-hidden="true">⌄</span>
                  </button>
                  {colorOpen && (
                    <div className="bb-color-popover" role="dialog" aria-label="Палитра цвета текста">
                      <div className="bb-color-palette">
                        {customColorOptions.map((color) => (
                          <button key={color} className={customColor === color ? 'active' : ''} type="button" title={color} aria-label={`Применить цвет ${color}`} aria-pressed={customColor === color} style={{ backgroundColor: color }} onMouseDown={(event) => event.preventDefault()} onClick={() => { applyCustomColor(color); setColorOpen(false); }} />
                        ))}
                      </div>
                      <label className="bb-color-hex">
                        <span>HEX</span>
                        <input value={customColor} maxLength={7} spellCheck={false} aria-label="HEX-цвет" onChange={(event) => { const next = event.target.value.toUpperCase(); setCustomColor(next); if (hexColorPattern.test(next)) applyCustomColor(next); }} onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => { if (event.key === 'Escape') setColorOpen(false); }} />
                      </label>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="bb-tool-group bb-tool-group-secondary" aria-label="Вставка и блоки">
              <button type="button" title="Добавить ссылку" aria-label="Добавить ссылку" aria-expanded={linkOpen} onMouseDown={richTopicMode ? rememberVisualSelection : undefined} onClick={beginLink}>
                <ToolbarIcon name="link" /><span>Ссылка</span>
              </button>
              <button type="button" title="Вставить изображение" aria-label="Вставить изображение" disabled={uploading} onMouseDown={() => { rememberFormatSelection(); if (richTopicMode) rememberVisualSelection(); }} onClick={() => imageInputRef.current?.click()}>
                <ToolbarIcon name="image" /><span>{uploading ? '…' : 'Фото'}</span>
              </button>
              {tools.filter((tool) => secondaryTitles.has(tool.title)).map((tool) => (
                <button key={tool.title} type="button" title={tool.title} aria-label={tool.title} onMouseDown={richTopicMode ? rememberVisualSelection : rememberFormatSelection} onClick={() => wrap(tool)}>
                  <ToolbarIcon name={secondaryIconNames[tool.title]} /><span>{tool.label}</span>
                </button>
              ))}
            </div>

            <input ref={imageInputRef} className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadImage} />
          </div>
        )}

        <button className={`bb-preview-toggle ${previewOpen ? 'active' : ''}`} type="button" aria-pressed={previewOpen} onClick={() => { setPreviewOpen((current) => !current); setLinkOpen(false); setSizeOpen(false); setColorOpen(false); }}>
          {previewOpen ? 'К редактору' : 'Предпросмотр'}
        </button>
      </div>

      {linkOpen && (
        <div className="bb-link-panel">
          <label>Адрес ссылки<input value={linkUrl} onChange={(event) => setLinkUrl(event.target.value)} onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => { if (event.key === 'Enter') { event.preventDefault(); addLink(); } }} inputMode="url" autoFocus required /></label>
          <label>Текст ссылки<input value={linkText} onChange={(event) => setLinkText(event.target.value)} onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => { if (event.key === 'Enter') { event.preventDefault(); addLink(); } }} placeholder="Можно оставить пустым" /></label>
          <div className="inline-actions"><button className="button small-button" type="button" onClick={addLink}>Вставить</button><button className="button ghost small-button" type="button" onClick={() => setLinkOpen(false)}>Отмена</button></div>
        </div>
      )}

      <div aria-live="polite">
        {uploading && <div className="bb-upload-status">Загружаем и оптимизируем изображение…</div>}
        {uploadError && <div className="bb-upload-error">{uploadError}</div>}
      </div>

      {previewOpen ? (
        <div className="bb-inline-preview">{value.trim() ? <BbcodeContent source={value} /> : <p className="muted">Предпросмотр появится после ввода текста.</p>}</div>
      ) : richTopicMode ? (
        <div ref={visualRef} className="bb-visual-input" contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label="Текст публикации" data-placeholder={placeholder} onInput={handleVisualInput} onMouseUp={rememberVisualSelection} onKeyUp={rememberVisualSelection} onFocus={rememberVisualSelection} onPaste={handlePaste} />
      ) : (
        <textarea ref={ref} value={value} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)} onPaste={handlePaste} minLength={minLength} maxLength={maxLength} placeholder={placeholder} required />
      )}
    </div>
  );
}
