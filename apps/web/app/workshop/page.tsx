'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Item = { id: string; type: string; status: string; title: string; description: string; previewUrl: string | null; thumbnailUrl: string | null; likeCount: number; likedByViewer: boolean; author: { username: string; displayName: string; forrumId: number } };
type UploadedMedia = { id: string; url: string; thumbnailUrl: string };

const typeNames: Record<string, string> = { GIFT: 'Подарок', REACTION: 'Реакция', BADGE: 'Значок', PROFILE_DECOR: 'Оформление профиля', COMMUNITY_DECOR: 'Оформление сообщества' };

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Не удалось прочитать изображение'));
    reader.readAsDataURL(file);
  });
}

export default function WorkshopPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState<UploadedMedia | null>(null);
  const [uploading, setUploading] = useState(false);
  const load = () => api<Item[]>('/workshop').then((value) => { setItems(value); setError(''); }).catch((cause) => setError(cause.message));
  useEffect(() => { void load(); }, []);

  async function like(id: string) { try { await api(`/workshop/${id}/like`, { method: 'POST' }); await load(); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось поставить отметку'); } }

  async function uploadPreview(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) { setError('Разрешены PNG, JPEG и WebP'); return; }
    if (file.size > 8 * 1024 * 1024) { setError('Изображение должно быть не больше 8 МБ'); return; }
    setUploading(true); setError('');
    try { setPreview(await api<UploadedMedia>('/media', { method: 'POST', body: JSON.stringify({ kind: 'POST_IMAGE', originalName: file.name, dataUrl: await fileToDataUrl(file) }) })); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить изображение'); }
    finally { setUploading(false); }
  }

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const payload = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
      if (preview) payload.previewMediaId = preview.id;
      await api('/workshop', { method: 'POST', body: JSON.stringify(payload) });
      setMessage('Работа отправлена на проверку'); setError(''); setPreview(null); event.currentTarget.reset(); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось отправить работу'); }
  }

  return <>
    <section className="section-hero"><span className="eyebrow">Создано пользователями</span><h1>Мастерская FORRUM</h1><p>Подарки, реакции, значки и оформление проходят обсуждение и модерацию. Реальные продажи и выплаты будут подключены только на последнем этапе.</p></section>
    <div aria-live="polite">{message && <div className="success-box rich-empty">{message}</div>}{error && <div className="error-box rich-empty">{error}</div>}</div>
    <div className="two-column rich-empty"><main className="workshop-grid">{items.map((item) => <article className="card workshop-item" key={item.id}>{item.thumbnailUrl ? <img src={item.thumbnailUrl} alt={`Превью работы «${item.title}»`}/> : <div className="workshop-placeholder" aria-hidden="true">{(typeNames[item.type] ?? item.type).slice(0, 1)}</div>}<div className="publication-topline"><span className="type-label">{typeNames[item.type] ?? item.type}</span>{item.status !== 'PUBLISHED' && <span className="promoted-label">{item.status === 'REVIEW' ? 'На проверке' : 'Отклонено'}</span>}</div><h2>{item.title}</h2><p>{item.description}</p><p className="muted small-text">Автор @{item.author.username} · FORRUM ID {item.author.forrumId}</p>{item.status === 'PUBLISHED' && <button type="button" className={`button small ${item.likedByViewer ? 'secondary' : ''}`} onClick={() => like(item.id)} aria-pressed={item.likedByViewer}>♡ {item.likeCount}</button>}</article>)}{!items.length && <div className="empty-state"><h2>В Мастерской пока нет работ</h2><p>Отправьте подарок, реакцию или оформление — после проверки работа появится здесь.</p></div>}</main>
      <aside className="card workshop-submit"><h2>Предложить работу</h2><p className="muted">Добавьте понятное превью и опишите, где элемент будет использоваться.</p><form onSubmit={create}><label>Тип<select name="type"><option value="GIFT">Подарок</option><option value="REACTION">Реакция</option><option value="BADGE">Значок</option><option value="PROFILE_DECOR">Оформление профиля</option><option value="COMMUNITY_DECOR">Оформление сообщества</option></select></label><label>Название<input name="title" minLength={3} maxLength={120} required/></label><label>Описание<textarea name="description" minLength={20} maxLength={3000} required/></label><label>Превью<input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadPreview} disabled={uploading}/><span className="muted small-text">PNG, JPEG или WebP, до 8 МБ.</span></label>{preview && <div className="workshop-preview-ready"><img src={preview.thumbnailUrl} alt="Загруженное превью"/><div><strong>Превью загружено</strong><button type="button" className="text-button" onClick={() => setPreview(null)}>Удалить</button></div></div>}<button type="submit" className="button" disabled={uploading}>{uploading ? 'Загружаем превью…' : 'Отправить на проверку'}</button></form></aside>
    </div>
  </>;
}
