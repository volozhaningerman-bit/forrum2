'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';

type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC';
type Slot =
  | 'GAME_HEAD' | 'GAME_NECK' | 'GAME_SHOULDERS' | 'GAME_CLOAK' | 'GAME_CHEST'
  | 'GAME_WRISTS' | 'GAME_GLOVES' | 'GAME_BELT' | 'GAME_LEGS' | 'GAME_FEET'
  | 'GAME_RING_1' | 'GAME_RING_2' | 'GAME_RELIC_1' | 'GAME_RELIC_2'
  | 'GAME_MAIN_HAND' | 'GAME_OFF_HAND';

export type ExpeditionInventoryItem = {
  id: string;
  serialNumber: number | null;
  equipped: boolean;
  definitionId: string;
  name: string;
  rarity: string;
  type: string;
  previewKey: string | null;
  style: Record<string, unknown> | null;
};

export type ExpeditionState = {
  profile: {
    id: string;
    level: number;
    xp: number;
    energy: number;
    maxEnergy: number;
    unlockedDepth: number;
    metal: number;
    cloth: number;
    scrap: number;
    oldParts: number;
  };
  currentRun: null | {
    id: string;
    depth: number;
    status: 'ACTIVE' | 'READY' | 'CLAIMED';
    resolvesAt: string;
    rewardXp: number;
    rewardMetal: number;
    rewardCloth: number;
    rewardScrap: number;
    rewardOldParts: number;
  };
  depths: Array<{
    id: number;
    name: string;
    energyCost: number;
    durationSeconds: number;
    minPower: number;
    xp: number;
  }>;
  inventory: ExpeditionInventoryItem[];
  itemSeries: Array<{
    id: string;
    name: string;
    rarity: string;
    maxSupply: number;
    minimumDepth: number;
  }>;
};

type ClaimResponse = {
  ok: boolean;
  rewards: {
    xp: number;
    metal: number;
    cloth: number;
    scrap: number;
    oldParts: number;
    item: null | {
      id: string;
      serialNumber: number;
      definitionId: string;
    };
  };
  state: ExpeditionState;
};

const slotOrder: Array<{ id: Slot; label: string }> = [
  { id: 'GAME_HEAD', label: 'Голова' },
  { id: 'GAME_NECK', label: 'Шея' },
  { id: 'GAME_SHOULDERS', label: 'Плечи' },
  { id: 'GAME_CLOAK', label: 'Плащ' },
  { id: 'GAME_CHEST', label: 'Грудь' },
  { id: 'GAME_WRISTS', label: 'Запястья' },
  { id: 'GAME_GLOVES', label: 'Перчатки' },
  { id: 'GAME_BELT', label: 'Пояс' },
  { id: 'GAME_LEGS', label: 'Ноги' },
  { id: 'GAME_FEET', label: 'Обувь' },
  { id: 'GAME_RING_1', label: 'Кольцо I' },
  { id: 'GAME_RING_2', label: 'Кольцо II' },
  { id: 'GAME_RELIC_1', label: 'Реликвия I' },
  { id: 'GAME_RELIC_2', label: 'Реликвия II' },
  { id: 'GAME_MAIN_HAND', label: 'Основная рука' },
  { id: 'GAME_OFF_HAND', label: 'Вторая рука' },
];

const rarityLabel: Record<Rarity, string> = {
  COMMON: 'Обычный',
  UNCOMMON: 'Необычный',
  RARE: 'Редкий',
  EPIC: 'Эпический',
};

const rarityClass = (rarity: string) => 'rarity-' + rarity.toLowerCase();

const itemPower = (item: ExpeditionInventoryItem) => {
  const value = item.style?.gamePower;
  return typeof value === 'number' ? value : Number(value) || 0;
};

const visualKey = (item: ExpeditionInventoryItem) => {
  const value = item.style?.visual;
  if (typeof value === 'string' && value) return value;
  return item.previewKey ?? '';
};

function formatRemaining(resolvesAt: string, now: number) {
  const ms = Math.max(0, new Date(resolvesAt).getTime() - now);
  const seconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const tail = String(seconds % 60).padStart(2, '0');
  return minutes > 0 ? `${minutes}:${tail}` : `0:${tail}`;
}

export function ExpeditionAlphaGame({ initialState }: { initialState: ExpeditionState }) {
  const [state, setState] = useState(initialState);
  const [selectedDepth, setSelectedDepth] = useState(
    Math.min(initialState.profile.unlockedDepth, 3),
  );
  const [busy, setBusy] = useState<'start' | 'claim' | 'equip' | null>(null);
  const [error, setError] = useState('');
  const [now, setNow] = useState(Date.now());
  const [lastDropId, setLastDropId] = useState<string | null>(null);

  const equipped = useMemo(() => {
    const map = new Map<string, ExpeditionInventoryItem>();
    for (const item of state.inventory) {
      if (item.equipped) map.set(item.type, item);
    }
    return map;
  }, [state.inventory]);

  const power = useMemo(
    () => 10 + state.profile.level * 3 +
      [...equipped.values()].reduce((sum, item) => sum + itemPower(item), 0),
    [state.profile.level, equipped],
  );

  const depth = state.depths.find((entry) => entry.id === selectedDepth) ?? state.depths[0];
  const activeRun = state.currentRun;
  const runReady = activeRun?.status === 'READY' ||
    Boolean(activeRun && new Date(activeRun.resolvesAt).getTime() <= now);

  const avatarClasses = useMemo(() => {
    return [...equipped.values()]
      .map((item) => visualKey(item))
      .filter(Boolean)
      .map((key) => `has-${key}`)
      .join(' ');
  }, [equipped]);

  const lastDrop = lastDropId
    ? state.inventory.find((item) => item.id === lastDropId) ?? null
    : null;

  async function refresh() {
    const next = await api<ExpeditionState>('/games/expedition/state');
    setState(next);
    return next;
  }

  async function startExpedition() {
    if (!depth || busy || activeRun) return;
    setBusy('start');
    setError('');
    setLastDropId(null);
    try {
      await api('/games/expedition/start', {
        method: 'POST',
        body: JSON.stringify({ depth: depth.id }),
      });
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось начать экспедицию');
    } finally {
      setBusy(null);
    }
  }

  async function claim() {
    if (!activeRun || !runReady || busy) return;
    setBusy('claim');
    setError('');
    try {
      const result = await api<ClaimResponse>('/games/expedition/claim', { method: 'POST' });
      setState(result.state);
      setLastDropId(result.rewards.item?.id ?? null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось забрать добычу');
    } finally {
      setBusy(null);
    }
  }

  async function equip(item: ExpeditionInventoryItem) {
    if (busy) return;
    setBusy('equip');
    setError('');
    try {
      await api(`/inventory/items/${item.id}/equip`, { method: 'POST' });
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось надеть предмет');
    } finally {
      setBusy(null);
    }
  }

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!activeRun || activeRun.status !== 'ACTIVE') return;
    if (new Date(activeRun.resolvesAt).getTime() > now) return;
    void refresh().catch(() => undefined);
  }, [activeRun, now]);

  return (
    <main className="exp-alpha" data-testid="expedition-alpha">
      <header className="exp-topbar">
        <div>
          <span className="exp-kicker">4rrum · alpha 0.1</span>
          <h1>Экспедиция</h1>
          <p>Рабочее название · посттехнологичное средневековье</p>
        </div>
        <div className="exp-hud">
          <span><b>⚡ {state.profile.energy}/{state.profile.maxEnergy}</b><small>энергия</small></span>
          <span><b>ур. {state.profile.level}</b><small>{state.profile.xp}/100 XP</small></span>
          <span><b>{power}</b><small>сила</small></span>
          <span><b>{state.profile.oldParts}</b><small>детали прошлого</small></span>
        </div>
      </header>

      {error ? <div className="exp-error" role="alert">{error}</div> : null}

      <section className="exp-layout">
        <aside className="exp-panel exp-character">
          <div className="exp-panel-title">
            <div><span>Персонаж</span><strong>Новичок</strong></div>
            <em>{equipped.size ? `${equipped.size}/16` : 'в лохмотьях'}</em>
          </div>

          <div className={`exp-avatar ${avatarClasses}`}>
            <div className="exp-avatar-glow" />
            <div className="exp-avatar-head">●</div>
            <div className="exp-avatar-rags exp-avatar-body" />
            <div className="exp-avatar-rags exp-avatar-legs" />
            <div className="exp-avatar-weapon" />
            <div className="exp-avatar-shield" />
            <div className="exp-avatar-relic" />
            <div className="exp-avatar-label">
              <b>{power} силы</b>
              <span>{equipped.size}/16 предметов</span>
            </div>
          </div>

          <div className="exp-slots">
            {slotOrder.map((slot) => {
              const item = equipped.get(slot.id);
              return (
                <button key={slot.id} className={item ? `equipped ${rarityClass(item.rarity)}` : ''} type="button">
                  <span>{slot.label}</span>
                  <b>{item?.name ?? '—'}</b>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="exp-center">
          <article className="exp-panel exp-location">
            <div className="exp-location-art">
              <div className="exp-sun" />
              <div className="exp-ruin exp-ruin-a" />
              <div className="exp-ruin exp-ruin-b" />
              <div className="exp-reactor" />
              <div className="exp-ground" />
              <div className="exp-location-copy">
                <span>Локация 01</span>
                <h2>Ржавые окраины</h2>
                <p>Средневековый пограничный город вырос среди останков промышленной цивилизации.</p>
              </div>
            </div>

            <div className="exp-depths">
              {state.depths.map((entry) => {
                const locked = entry.id > state.profile.unlockedDepth;
                return (
                  <button
                    type="button"
                    key={entry.id}
                    disabled={locked || Boolean(activeRun)}
                    className={selectedDepth === entry.id ? 'active' : ''}
                    onClick={() => setSelectedDepth(entry.id)}
                  >
                    <small>Глубина {entry.id}</small>
                    <b>{entry.name}</b>
                    <span>{locked ? 'Закрыто' : `⚡ ${entry.energyCost} · сила ${entry.minPower}+`}</span>
                  </button>
                );
              })}
            </div>

            <div className="exp-run-card">
              <div>
                <small>{activeRun ? 'Текущая экспедиция' : 'Выбрано'}</small>
                <h3>
                  {activeRun
                    ? `Глубина ${activeRun.depth} · ${state.depths.find((d) => d.id === activeRun.depth)?.name ?? ''}`
                    : `Глубина ${depth.id} · ${depth.name}`}
                </h3>
                <p>
                  {activeRun
                    ? runReady ? 'Персонаж вернулся. Добыча готова.' : `Возвращение через ${formatRemaining(activeRun.resolvesAt, now)}`
                    : `Опыт +${depth.xp} · шанс серийного предмета`}
                </p>
              </div>

              {!activeRun ? (
                <button
                  className="exp-primary"
                  type="button"
                  disabled={busy !== null || state.profile.energy < depth.energyCost}
                  onClick={startExpedition}
                >
                  {busy === 'start' ? 'Отправляем…' : `Отправить · ⚡ ${depth.energyCost}`}
                </button>
              ) : runReady ? (
                <button className="exp-primary is-return" type="button" disabled={busy !== null} onClick={claim}>
                  {busy === 'claim' ? 'Получаем…' : 'Забрать добычу'}
                </button>
              ) : (
                <button className="exp-primary is-waiting" type="button" disabled>
                  В экспедиции · {formatRemaining(activeRun.resolvesAt, now)}
                </button>
              )}
            </div>

            {lastDrop ? (
              <div className={`exp-drop ${rarityClass(lastDrop.rarity)}`}>
                <span>Найден предмет</span>
                <div>
                  <b>{lastDrop.name}</b>
                  <small>
                    {rarityLabel[lastDrop.rarity as Rarity] ?? lastDrop.rarity}
                    {' · '}№{lastDrop.serialNumber ?? '—'}
                  </small>
                </div>
                <button type="button" disabled={busy !== null} onClick={() => equip(lastDrop)}>Надеть</button>
              </div>
            ) : null}

            <div className="exp-resources">
              <span><b>{state.profile.metal}</b><small>металл</small></span>
              <span><b>{state.profile.cloth}</b><small>ткань</small></span>
              <span><b>{state.profile.scrap}</b><small>лом</small></span>
              <span><b>{state.profile.oldParts}</b><small>старые детали</small></span>
            </div>
          </article>

          <article className="exp-panel exp-raid">
            <div className="exp-raid-art"><div className="exp-boss-shape"><span /><i /></div></div>
            <div className="exp-raid-copy">
              <small>Совместный босс · Ржавые окраины</small>
              <h2>Железный Пастырь</h2>
              <p>Рейдовая система идёт следующим слоем: участники заранее отправляют персонажей, сервер рассчитывает общий бой.</p>
              <div className="exp-raid-meta">
                <span><b>7/10</b><small>пример сбора</small></span>
                <span><b>21:00</b><small>окно рейда</small></span>
                <span><b>5</b><small>глубина</small></span>
              </div>
              <button type="button" disabled>Скоро в alpha 0.2</button>
            </div>
          </article>
        </section>

        <aside className="exp-panel exp-inventory">
          <div className="exp-panel-title">
            <div><span>Инвентарь</span><strong>{state.inventory.length} предметов</strong></div>
            <em>сервер</em>
          </div>

          <div className="exp-rarity-key">
            {(Object.keys(rarityLabel) as Rarity[]).map((rarity) => (
              <span className={rarityClass(rarity)} key={rarity}>{rarityLabel[rarity]}</span>
            ))}
          </div>

          <div className="exp-items">
            {state.inventory.length ? state.inventory.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`exp-item ${rarityClass(item.rarity)} ${item.equipped ? 'is-equipped' : ''}`}
                onClick={() => equip(item)}
                disabled={busy !== null}
              >
                <span className={`exp-item-icon visual-${visualKey(item)}`} />
                <small>{slotOrder.find((slot) => slot.id === item.type)?.label ?? item.type}</small>
                <b>{item.name}</b>
                <em>№{item.serialNumber ?? '—'}</em>
                <strong>+{itemPower(item)}</strong>
              </button>
            )) : (
              <div className="exp-empty">
                <b>Инвентарь пуст</b>
                <span>Первая экспедиция принесёт первый серийный предмет.</span>
              </div>
            )}
          </div>

          <div className="exp-series">
            <span>Тиражи стартового лута</span>
            {state.itemSeries.slice(-4).map((series) => (
              <div key={series.id} className={rarityClass(series.rarity)}>
                <b>{series.name}</b>
                <small>до {series.maxSupply.toLocaleString('ru-RU')} экз. · глубина {series.minimumDepth}+</small>
              </div>
            ))}
          </div>

          <div className="exp-social-preview">
            <span>Следующие системы</span>
            <div><b>Категория</b><small>Чемпион · общие постройки</small></div>
            <div><b>Синдикат</b><small>Реликт · склад · вклад</small></div>
            <div><b>Рынок</b><small>Серийные вещи · история владельцев</small></div>
          </div>
        </aside>
      </section>

      <footer className="exp-footer">
        <span>Source of truth: docs/game-expedition-alpha-source-of-truth.md</span>
        <span>Энергия, экспедиции и серийный лут уже server-authoritative.</span>
      </footer>
    </main>
  );
}
