'use client';

import Link from 'next/link';
import { type FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Community = { slug: string; name: string; parent: { name: string } | null };
type Mode = 'event' | 'poll';

const pad = (value: number) => String(value).padStart(2, '0');

function localParts(date: Date) {
  return {
    date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
  };
}

function roundedFuture(minutesAhead: number) {
  const date = new Date(Date.now() + minutesAhead * 60_000);
  date.setSeconds(0, 0);
  const remainder = date.getMinutes() % 15;
  if (remainder) date.setMinutes(date.getMinutes() + 15 - remainder);
  return date;
}

function combine(date: string, time: string) {
  if (!date || !time) throw new Error('Выберите дату и время');
  const value = new Date(`${date}T${time}`);
  if (Number.isNaN(value.getTime())) throw new Error('Дата или время указаны неверно');
  return value.toISOString();
}

export default function CreateEventPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [mode, setMode] = useState<Mode>('event');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [closeDate, setCloseDate] = useState('');
  const [closeTime, setCloseTime] = useState('');

  function resetDates() {
    const start = roundedFuture(60);
    const end = new Date(start.getTime() + 60 * 60_000);
    const close = roundedFuture(3 * 24 * 60 + 60);
    const startParts = localParts(start);
    const endParts = localParts(end);
    const closeParts = localParts(close);
    setStartDate(startParts.date);
    setStartTime(startParts.time);
    setEndDate(endParts.date);
    setEndTime(endParts.time);
    setCloseDate(closeParts.date);
    setCloseTime(closeParts.time);
  }

  useEffect(() => {
    resetDates();
    api<Community[]>('/communities')
      .then(setCommunities)
      .catch((cause) => setError(cause instanceof Error ? cause.message : 'Не удалось загрузить сообщества'));
  }, []);

  async function submitEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const capacity = String(form.get('capacity') || '').trim();
    setError('');
    setMessage('');

    try {
      const startsAt = combine(startDate, startTime);
      const endsAt = endDate && endTime ? combine(endDate, endTime) : undefined;
      if (endsAt && new Date(endsAt).getTime() <= new Date(startsAt).getTime()) {
        throw new Error('Окончание должно быть позже начала');
      }

      const result = await api<{ id: string }>('/events', {
        method: 'POST',
        body: JSON.stringify({
          communitySlug: form.get('communitySlug'),
          title: form.get('title'),
          description: form.get('description'),
          format: form.get('format'),
          startsAt,
          endsAt,
          location: form.get('location') || undefined,
          capacity: capacity ? Number(capacity) : undefined,
          publish: form.get('publish') === 'on',
        }),
      });

      setMessage(`Событие сохранено. Открыть: /events/${result.id}`);
      event.currentTarget.reset();
      resetDates();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось создать событие');
    }
  }

  async function submitPoll(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const quorum = String(form.get('quorum') || '').trim();
    setError('');
    setMessage('');

    try {
      await api(`/governance/communities/${form.get('communitySlug')}/polls`, {
        method: 'POST',
        body: JSON.stringify({
          title: form.get('title'),
          description: form.get('description'),
          kind: form.get('kind'),
          options: String(form.get('options')).split('\n').map((item) => item.trim()).filter(Boolean),
          closesAt: combine(closeDate, closeTime),
          quorum: quorum ? Number(quorum) : undefined,
          minAccountAgeDays: Number(form.get('minAccountAgeDays')),
          requireSubscription: form.get('requireSubscription') === 'on',
          allowAdvisory: form.get('allowAdvisory') === 'on',
        }),
      });

      setMessage('Голосование опубликовано.');
      event.currentTarget.reset();
      resetDates();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось создать голосование');
    }
  }

  return <div className="narrow-page">
    <p><Link className="muted" href="/events">← События</Link></p>
    <section className="card event-create-card">
      <span className="eyebrow">Для команды сообщества</span>
      <h1>Создать</h1>
      <p className="muted">Выберите один сценарий. Формы не смешиваются, чтобы случайно не опубликовать голосование вместо встречи.</p>

      <div className="segmented-control event-mode-switch">
        <button type="button" className={mode === 'event' ? 'active' : ''} onClick={() => setMode('event')}>Событие</button>
        <button type="button" className={mode === 'poll' ? 'active' : ''} onClick={() => setMode('poll')}>Голосование</button>
      </div>

      {message && <div className="success-box">{message}</div>}
      {error && <div className="error-box">{error}</div>}

      {mode === 'event' ? <form onSubmit={submitEvent}>
        <label>Сообщество<select name="communitySlug" required><option value="">Выберите</option>{communities.map((item) => <option key={item.slug} value={item.slug}>{item.parent ? `${item.parent.name} → ` : ''}{item.name}</option>)}</select></label>
        <label>Название<input name="title" minLength={5} maxLength={160} required/></label>
        <label>Описание<textarea name="description" minLength={20} maxLength={5000} required/></label>
        <label>Формат<select name="format" defaultValue="ONLINE"><option value="ONLINE">Онлайн</option><option value="OFFLINE">Офлайн</option><option value="HYBRID">Гибрид</option></select></label>

        <div className="event-date-section">
          <div><strong>Начало</strong><span>Дата и время выбираются отдельно</span></div>
          <div className="date-time-pair">
            <label>Дата<input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required/></label>
            <label>Время<input type="time" step="900" value={startTime} onChange={(event) => setStartTime(event.target.value)} required/></label>
          </div>
        </div>

        <div className="event-date-section optional">
          <div><strong>Окончание</strong><span>Необязательно</span></div>
          <div className="date-time-pair">
            <label>Дата<input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)}/></label>
            <label>Время<input type="time" step="900" value={endTime} onChange={(event) => setEndTime(event.target.value)}/></label>
          </div>
        </div>

        <label>Место или ссылка<input name="location" maxLength={240}/></label>
        <label>Лимит участников <span className="optional-label">необязательно</span><input name="capacity" type="number" min="2" max="100000"/></label>
        <label className="form-check"><input className="form-check-input" type="checkbox" name="publish" defaultChecked/><span className="form-check-label">Сразу опубликовать и уведомить подписчиков</span></label>
        <button className="button">Сохранить событие</button>
      </form> : <form onSubmit={submitPoll}>
        <label>Сообщество<select name="communitySlug" required><option value="">Выберите</option>{communities.map((item) => <option key={item.slug} value={item.slug}>{item.parent ? `${item.parent.name} → ` : ''}{item.name}</option>)}</select></label>
        <label>Тип решения<select name="kind" defaultValue="GENERAL"><option value="GENERAL">Общий вопрос</option><option value="TEAM_REVIEW">Оценка команды</option><option value="ELECTION">Выборы</option><option value="STRUCTURE">Структура</option><option value="BUDGET">Средства сообщества</option></select></label>
        <label>Вопрос<input name="title" minLength={5} maxLength={160} required/></label>
        <label>Контекст<textarea name="description" minLength={10} maxLength={3000} required/></label>
        <label>Варианты — каждый с новой строки<textarea name="options" minLength={3} maxLength={2000} required placeholder={'Поддержать\nДоработать\nОтклонить'}/></label>

        <div className="event-date-section">
          <div><strong>Закрыть голосование</strong><span>По умолчанию через три дня</span></div>
          <div className="date-time-pair">
            <label>Дата<input type="date" value={closeDate} onChange={(event) => setCloseDate(event.target.value)} required/></label>
            <label>Время<input type="time" step="900" value={closeTime} onChange={(event) => setCloseTime(event.target.value)} required/></label>
          </div>
        </div>

        <label>Кворум решающих голосов<input name="quorum" type="number" min="1" placeholder="Необязательно"/></label>
        <label>Минимальный возраст аккаунта<input name="minAccountAgeDays" type="number" min="0" max="365" defaultValue="14" required/></label>
        <label className="form-check"><input className="form-check-input" type="checkbox" name="requireSubscription" defaultChecked/><span className="form-check-label">Для решающего голоса нужна подписка на сообщество</span></label>
        <label className="form-check"><input className="form-check-input" type="checkbox" name="allowAdvisory" defaultChecked/><span className="form-check-label">Принимать консультативные голоса новичков</span></label>
        <button className="button">Опубликовать голосование</button>
      </form>}
    </section>
  </div>;
}
