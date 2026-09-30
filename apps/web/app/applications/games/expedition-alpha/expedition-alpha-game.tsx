'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../../lib/api';

type Rarity = 'common' | 'uncommon' | 'rare' | 'epic';
type Slot =
  | 'head' | 'neck' | 'shoulders' | 'cloak' | 'chest' | 'wrists' | 'gloves' | 'belt'
  | 'legs' | 'feet' | 'ring1' | 'ring2' | 'relic1' | 'relic2' | 'mainHand' | 'offHand';

type Item = {
  id: string;
  name: string;
  slot: Slot;
  rarity: Rarity;
  serial: number;
  circulation: number;
  power: number;
  visual: string;
};


type ServerItem = {
  id: string;
  name: string;
  slot: string;
  rarity: string;
  serialNumber: number;
  circulation: number;
  power: number;
  visualKey: string;
  equipped: boolean;
};

type ServerState = {
  profile: {
    level: number;
    xp: number;
    energy: number;
    maxEnergy: number;
    unlockedDepth: number;
    power: number;
  };
  run: null | {
    id: string;
    depth: number;
    energyCost: number;
    status: string;
    startedAt: string;
    readyAt: string;
    secondsLeft: number;
  };
  inventory: ServerItem[];
};

const serverSlotMap: Record<string, Slot> = {
  HEAD: 'head',
  NECK: 'neck',
  SHOULDERS: 'shoulders',
  CLOAK: 'cloak',
  CHEST: 'chest',
  WRISTS: 'wrists',
  GLOVES: 'gloves',
  BELT: 'belt',
  LEGS: 'legs',
  FEET: 'feet',
  RING_1: 'ring1',
  RING_2: 'ring2',
  RELIC_1: 'relic1',
  RELIC_2: 'relic2',
  MAIN_HAND: 'mainHand',
  OFF_HAND: 'offHand',
};

function fromServerItem(item: ServerItem): Item {
  return {
    id: item.id,
    name: item.name,
    slot: serverSlotMap[item.slot] ?? 'relic2',
    rarity: item.rarity.toLowerCase() as Rarity,
    serial: item.serialNumber,
    circulation: item.circulation,
    power: item.power,
    visual: item.visualKey,
  };
}

type Depth = {
  id: number;
  name: string;
  energy: number;
  recommended: number;
  reward: string;
};

const rarityLabel: Record<Rarity, string> = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  epic: 'Эпический',
};

const slots: Array<{ id: Slot; label: string }> = [
  { id: 'head', label: 'Голова' },
  { id: 'neck', label: 'Шея' },
  { id: 'shoulders', label: 'Плечи' },
  { id: 'cloak', label: 'Плащ' },
  { id: 'chest', label: 'Грудь' },
  { id: 'wrists', label: 'Запястья' },
  { id: 'gloves', label: 'Перчатки' },
  { id: 'belt', label: 'Пояс' },
  { id: 'legs', label: 'Ноги' },
  { id: 'feet', label: 'Обувь' },
  { id: 'ring1', label: 'Кольцо I' },
  { id: 'ring2', label: 'Кольцо II' },
  { id: 'relic1', label: 'Реликвия I' },
  { id: 'relic2', label: 'Реликвия II' },
  { id: 'mainHand', label: 'Основная рука' },
  { id: 'offHand', label: 'Вторая рука' },
];

const depths: Depth[] = [
  { id: 1, name: 'Вход в окраины', energy: 1, recommended: 1, reward: 'Ткань · лом · обычные вещи' },
  { id: 2, name: 'Ломовые дворы', energy: 2, recommended: 4, reward: 'Старые детали · необычные вещи' },
  { id: 3, name: 'Старые кварталы', energy: 2, recommended: 7, reward: 'Редкие находки · фрагменты' },
  { id: 4, name: 'Промышленный двор', energy: 3, recommended: 10, reward: 'Технореликты · редкий лут' },
  { id: 5, name: 'Реакторная зона', energy: 4, recommended: 14, reward: 'Эпический шанс · босс' },
];

const starterInventory: Item[] = [
  { id: 'hood-1843', name: 'Капюшон Собирателя', slot: 'head', rarity: 'common', serial: 1843, circulation: 5000, power: 2, visual: 'hood' },
  { id: 'chest-317', name: 'Панцирь Старой Стражи', slot: 'chest', rarity: 'uncommon', serial: 317, circulation: 2500, power: 5, visual: 'chest' },
  { id: 'cloak-85', name: 'Плащ Синего Знамени', slot: 'cloak', rarity: 'rare', serial: 85, circulation: 500, power: 8, visual: 'cloak' },
  { id: 'sword-91', name: 'Клинок Последнего Контура', slot: 'mainHand', rarity: 'rare', serial: 91, circulation: 400, power: 11, visual: 'sword' },
  { id: 'relic-17', name: 'Сердце Маяка', slot: 'relic1', rarity: 'epic', serial: 17, circulation: 60, power: 14, visual: 'relic' },
  { id: 'boots-741', name: 'Сапоги Железного Шага', slot: 'feet', rarity: 'uncommon', serial: 741, circulation: 3000, power: 4, visual: 'boots' },
];

const expeditionDrops: Item[] = [
  { id: 'gloves-1188', name: 'Перчатки Сервомастера', slot: 'gloves', rarity: 'uncommon', serial: 1188, circulation: 4000, power: 4, visual: 'gloves' },
  { id: 'shoulders-206', name: 'Наплечники Рубежа', slot: 'shoulders', rarity: 'rare', serial: 206, circulation: 650, power: 7, visual: 'shoulders' },
  { id: 'shield-42', name: 'Щит Заслона', slot: 'offHand', rarity: 'rare', serial: 42, circulation: 300, power: 9, visual: 'shield' },
];

const slotLabel = Object.fromEntries(slots.map((slot) => [slot.id, slot.label])) as Record<Slot, string>;

export function ExpeditionAlphaGame() {
  const [energy, setEnergy] = useState(12);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [selectedDepth, setSelectedDepth] = useState(1);
  const [unlockedDepth, setUnlockedDepth] = useState(3);
  const [inventory, setInventory] = useState<Item[]>(starterInventory);
  const [equipped, setEquipped] = useState<Partial<Record<Slot, Item>>>({});
  const [run, setRun] = useState<'idle' | 'away' | 'returned'>('idle');
  const [lastDrop, setLastDrop] = useState<Item | null>(null);
  const [serverMode, setServerMode] = useState(false);
  const [runId, setRunId] = useState<string | null>(null);
  const [modeNotice, setModeNotice] = useState('Проверяем серверное состояние…');

  useEffect(() => {
    let alive = true;
    let readyTimer: ReturnType<typeof window.setTimeout> | null = null;

    async function load() {
      try {
        const state = await api<ServerState>('/expedition/me');
        if (!alive) return;
        applyServerState(state);
        setServerMode(true);
        setModeNotice('Серверный профиль');
        if (state.run) {
          setRunId(state.run.id);
          if (state.run.status === 'READY' || state.run.secondsLeft <= 0) {
            setRun('returned');
          } else {
            setRun('away');
            readyTimer = window.setTimeout(() => {
              if (alive) setRun('returned');
            }, state.run.secondsLeft * 1000);
          }
        }
      } catch {
        if (!alive) return;
        setServerMode(false);
        setModeNotice('Demo-режим без входа');
      }
    }

    void load();
    return () => {
      alive = false;
      if (readyTimer) window.clearTimeout(readyTimer);
    };
  }, []);

  function applyServerState(state: ServerState) {
    setEnergy(state.profile.energy);
    setXp(state.profile.xp);
    setLevel(state.profile.level);
    setUnlockedDepth(state.profile.unlockedDepth);

    const normalized = state.inventory.map(fromServerItem);
    setInventory(normalized);

    const nextEquipped: Partial<Record<Slot, Item>> = {};
    state.inventory.filter((item) => item.equipped).forEach((item) => {
      const normalizedItem = fromServerItem(item);
      nextEquipped[normalizedItem.slot] = normalizedItem;
    });
    setEquipped(nextEquipped);
  }

  const depth = depths.find((entry) => entry.id === selectedDepth) ?? depths[0];
  const equippedPower = useMemo(
    () => Object.values(equipped).reduce((sum, item) => sum + (item?.power ?? 0), 0),
    [equipped],
  );
  const power = 10 + level * 3 + equippedPower;

  async function sendExpedition() {
    if (run !== 'idle' || energy < depth.energy || depth.id > unlockedDepth) return;
    setLastDrop(null);

    if (serverMode) {
      try {
        const result = await api<{ ok: true; run: { id: string; readyAt: string } }>('/expedition/runs', {
          method: 'POST',
          body: JSON.stringify({ depth: depth.id }),
        });
        setEnergy((value) => value - depth.energy);
        setRunId(result.run.id);
        setRun('away');
        const ms = Math.max(0, new Date(result.run.readyAt).getTime() - Date.now());
        window.setTimeout(() => setRun('returned'), ms);
        return;
      } catch (error) {
        setModeNotice(error instanceof Error ? error.message : 'Ошибка экспедиции');
        return;
      }
    }

    setEnergy((value) => value - depth.energy);
    setRun('away');
    window.setTimeout(() => setRun('returned'), 1800);
  }

  async function collectReturn() {
    if (run !== 'returned') return;

    if (serverMode && runId) {
      try {
        const result = await api<{ reward: { item: ServerItem } }>(`/expedition/runs/${runId}/claim`, { method: 'POST' });
        const drop = fromServerItem(result.reward.item);
        setLastDrop(drop);
        const fresh = await api<ServerState>('/expedition/me');
        applyServerState(fresh);
        setRunId(null);
        setRun('idle');
        return;
      } catch (error) {
        setModeNotice(error instanceof Error ? error.message : 'Не удалось забрать добычу');
        return;
      }
    }

    const drop = expeditionDrops[(selectedDepth - 1) % expeditionDrops.length];
    setInventory((items) => items.some((item) => item.id === drop.id) ? items : [...items, drop]);
    setLastDrop(drop);
    setXp((value) => {
      const next = value + 35 + selectedDepth * 10;
      if (next >= 100) {
        setLevel((current) => current + 1);
        return next - 100;
      }
      return next;
    });
    setUnlockedDepth((value) => Math.min(5, Math.max(value, selectedDepth + 1)));
    setRun('idle');
  }

  async function equip(item: Item) {
    if (serverMode) {
      try {
        const fresh = await api<ServerState>(`/expedition/items/${item.id}/equip`, { method: 'POST' });
        applyServerState(fresh);
        return;
      } catch (error) {
        setModeNotice(error instanceof Error ? error.message : 'Не удалось надеть предмет');
        return;
      }
    }
    setEquipped((current) => ({ ...current, [item.slot]: item }));
  }

  return (
    <main className="exp-alpha" data-testid="expedition-alpha">
      <header className="exp-topbar">
        <div>
          <span className="exp-kicker">4rrum · hidden alpha</span>
          <h1>Экспедиция</h1>
          <p>Рабочее название · визуальный и игровой vertical slice · <strong className={serverMode ? 'exp-server-ok' : 'exp-server-demo'}>{modeNotice}</strong></p>
        </div>
        <div className="exp-hud">
          <span><b>⚡ {energy}/12</b><small>энергия</small></span>
          <span><b>ур. {level}</b><small>{xp}/100 XP</small></span>
          <span><b>{power}</b><small>сила</small></span>
        </div>
      </header>

      <section className="exp-layout">
        <aside className="exp-panel exp-character">
          <div className="exp-panel-title">
            <div>
              <span>Персонаж</span>
              <strong>Новичок</strong>
            </div>
            <em>в лохмотьях</em>
          </div>

          <div className={`exp-avatar ${Object.values(equipped).map((item) => item?.visual ? `has-${item.visual}` : '').join(' ')}`}>
            <div className="exp-avatar-glow" />
            <div className="exp-avatar-head">●</div>
            <div className="exp-avatar-rags exp-avatar-body" />
            <div className="exp-avatar-rags exp-avatar-legs" />
            <div className="exp-avatar-weapon" />
            <div className="exp-avatar-shield" />
            <div className="exp-avatar-relic" />
            <div className="exp-avatar-label">
              <b>{power} силы</b>
              <span>{Object.keys(equipped).length}/16 предметов</span>
            </div>
          </div>

          <div className="exp-slots">
            {slots.map((slot) => {
              const item = equipped[slot.id];
              return (
                <button
                  key={slot.id}
                  className={item ? `equipped rarity-${item.rarity}` : ''}
                  title={item ? item.name : slot.label}
                  type="button"
                >
                  <span>{slot.label}</span>
                  <b>{item ? item.name : '—'}</b>
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
                <p>Старый город, построенный вокруг руин промышленной эпохи.</p>
              </div>
            </div>

            <div className="exp-depths">
              {depths.map((entry) => {
                const locked = entry.id > unlockedDepth;
                return (
                  <button
                    type="button"
                    key={entry.id}
                    disabled={locked || run !== 'idle'}
                    className={selectedDepth === entry.id ? 'active' : ''}
                    onClick={() => setSelectedDepth(entry.id)}
                  >
                    <small>Глубина {entry.id}</small>
                    <b>{entry.name}</b>
                    <span>{locked ? 'Закрыто' : `⚡ ${entry.energy} · сила ${entry.recommended}+`}</span>
                  </button>
                );
              })}
            </div>

            <div className="exp-run-card">
              <div>
                <small>Выбрано</small>
                <h3>Глубина {depth.id} · {depth.name}</h3>
                <p>{depth.reward}</p>
              </div>
              {run === 'idle' ? (
                <button
                  className="exp-primary"
                  type="button"
                  disabled={energy < depth.energy}
                  onClick={sendExpedition}
                >
                  Отправить в экспедицию · ⚡ {depth.energy}
                </button>
              ) : run === 'away' ? (
                <button className="exp-primary is-waiting" type="button" disabled>
                  Персонаж в пути…
                </button>
              ) : (
                <button className="exp-primary is-return" type="button" onClick={collectReturn}>
                  Забрать добычу
                </button>
              )}
            </div>

            {lastDrop ? (
              <div className={`exp-drop rarity-${lastDrop.rarity}`}>
                <span>Найден предмет</span>
                <div>
                  <b>{lastDrop.name}</b>
                  <small>{rarityLabel[lastDrop.rarity]} · №{lastDrop.serial}/{lastDrop.circulation}</small>
                </div>
                <button type="button" onClick={() => equip(lastDrop)}>Надеть</button>
              </div>
            ) : null}
          </article>

          <article className="exp-panel exp-raid">
            <div className="exp-raid-art">
              <div className="exp-boss-shape">
                <span />
                <i />
              </div>
            </div>
            <div className="exp-raid-copy">
              <small>Совместный босс · Ржавые окраины</small>
              <h2>Железный Пастырь</h2>
              <p>Одному его не победить. На боевой выход персонажи отправляются заранее.</p>
              <div className="exp-raid-meta">
                <span><b>7/10</b><small>участников</small></span>
                <span><b>21:00</b><small>начало</small></span>
                <span><b>5</b><small>глубина</small></span>
              </div>
              <button type="button">Посмотреть сбор</button>
            </div>
          </article>
        </section>

        <aside className="exp-panel exp-inventory">
          <div className="exp-panel-title">
            <div>
              <span>Инвентарь</span>
              <strong>{inventory.length} предметов</strong>
            </div>
            <em>demo</em>
          </div>

          <div className="exp-rarity-key">
            {(Object.keys(rarityLabel) as Rarity[]).map((rarity) => (
              <span className={`rarity-${rarity}`} key={rarity}>{rarityLabel[rarity]}</span>
            ))}
          </div>

          <div className="exp-items">
            {inventory.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`exp-item rarity-${item.rarity}`}
                onClick={() => equip(item)}
              >
                <span className={`exp-item-icon visual-${item.visual}`} />
                <small>{slotLabel[item.slot]}</small>
                <b>{item.name}</b>
                <em>№{item.serial}/{item.circulation}</em>
                <strong>+{item.power}</strong>
              </button>
            ))}
          </div>

          <div className="exp-social-preview">
            <span>Следующие системы</span>
            <div>
              <b>Категория</b>
              <small>Чемпион · общий прогресс</small>
            </div>
            <div>
              <b>Синдикат</b>
              <small>Реликт · склад · вклад</small>
            </div>
            <div>
              <b>Рынок</b>
              <small>Серийные предметы · владельцы</small>
            </div>
          </div>
        </aside>
      </section>

      <footer className="exp-footer">
        <span>Source of truth: docs/game-expedition-alpha-source-of-truth.md</span>
        <span>Состояние здесь временное и хранится только в React state — экономика будет серверной.</span>
      </footer>
    </main>
  );
}
