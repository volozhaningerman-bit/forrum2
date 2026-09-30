'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';

type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC';
type Slot =
  | 'HEAD' | 'NECK' | 'SHOULDERS' | 'CLOAK' | 'CHEST' | 'WRISTS' | 'GLOVES' | 'BELT'
  | 'LEGS' | 'FEET' | 'RING_1' | 'RING_2' | 'RELIC_1' | 'RELIC_2' | 'MAIN_HAND' | 'OFF_HAND';

export type ExpeditionItem = {
  id: string;
  templateId: string;
  name: string;
  slot: Slot | string;
  rarity: Rarity | string;
  serialNumber: number;
  circulation: number;
  power: number;
  visualKey: string;
  equipped: boolean;
  acquiredAt: string;
};

export type ExpeditionState = {
  profile: {
    level: number;
    xp: number;
    energy: number;
    maxEnergy: number;
    unlockedDepth: number;
    power: number;
    resources: {
      metal: number;
      cloth: number;
      scrap: number;
      oldParts: number;
    };
  };
  run: null | {
    id: string;
    depth: number;
    energyCost: number;
    status: 'ACTIVE' | 'READY' | 'CLAIMED';
    startedAt: string;
    readyAt: string;
    secondsLeft: number;
  };
  inventory: ExpeditionItem[];
};

type ClaimResponse = {
  ok: true;
  reward: {
    xp: number;
    resources: {
      metal: number;
      cloth: number;
      scrap: number;
      oldParts: number;
    };
    item: ExpeditionItem;
  };
  state: ExpeditionState;
};

type Depth = {
  id: number;
  name: string;
  energy: number;
  recommended: number;
  reward: string;
  flavor: string;
  seconds: number;
};

const depths: Depth[] = [
  { id: 1, name: 'Вход в окраины', energy: 1, recommended: 1, reward: 'Ткань · лом · обычные вещи', flavor: 'Лагеря сборщиков у городской стены.', seconds: 5 },
  { id: 2, name: 'Ломовые дворы', energy: 2, recommended: 4, reward: 'Старые детали · необычные вещи', flavor: 'Завалы машин, древние краны и охотники за железом.', seconds: 15 },
  { id: 3, name: 'Старые кварталы', energy: 2, recommended: 7, reward: 'Редкие находки · фрагменты', flavor: 'Жилые башни, давно переделанные под укрепления.', seconds: 30 },
  { id: 4, name: 'Промышленный двор', energy: 3, recommended: 10, reward: 'Технореликты · редкий лут', flavor: 'Здесь до сих пор слышно, как что-то работает под землёй.', seconds: 60 },
  { id: 5, name: 'Реакторная зона', energy: 4, recommended: 14, reward: 'Эпический шанс · рейд', flavor: 'Запретная часть старого комплекса. Там видели Пастыря.', seconds: 90 },
];

const slotOrder: Array<{ id: Slot; label: string }> = [
  { id: 'HEAD', label: 'Голова' },
  { id: 'NECK', label: 'Шея' },
  { id: 'SHOULDERS', label: 'Плечи' },
  { id: 'CLOAK', label: 'Плащ' },
  { id: 'CHEST', label: 'Грудь' },
  { id: 'WRISTS', label: 'Запястья' },
  { id: 'GLOVES', label: 'Перчатки' },
  { id: 'BELT', label: 'Пояс' },
  { id: 'LEGS', label: 'Ноги' },
  { id: 'FEET', label: 'Обувь' },
  { id: 'RING_1', label: 'Кольцо I' },
  { id: 'RING_2', label: 'Кольцо II' },
  { id: 'RELIC_1', label: 'Реликвия I' },
  { id: 'RELIC_2', label: 'Реликвия II' },
  { id: 'MAIN_HAND', label: 'Основная рука' },
  { id: 'OFF_HAND', label: 'Вторая рука' },
];

const rarityLabel: Record<Rarity, string> = {
  COMMON: 'Обычный',
  UNCOMMON: 'Необычный',
  RARE: 'Редкий',
  EPIC: 'Эпический',
};

const artIndex: Record<string, number> = {
  hood: 0,
  'consul-mask': 3,
  shoulders: 4,
  cloak: 6,
  chest: 8,
  gloves: 11,
  boots: 2,
  sword: 9,
  shield: 7,
  relic: 6,
};

const slotLabel = Object.fromEntries(slotOrder.map((slot) => [slot.id, slot.label])) as Record<string, string>;

function rarityClass(rarity: string) {
  return 'rarity-' + rarity.toLowerCase();
}

function remainingSeconds(run: ExpeditionState['run'], now: number) {
  if (!run) return 0;
  return Math.max(0, Math.ceil((new Date(run.readyAt).getTime() - now) / 1000));
}

export function ExpeditionAlphaGame({ initialState }: { initialState: ExpeditionState }) {
  const [state, setState] = useState(initialState);
  const [selectedDepth, setSelectedDepth] = useState(
    initialState.run?.depth ?? Math.min(initialState.profile.unlockedDepth, 3),
  );
  const [lastDrops, setLastDrops] = useState<ExpeditionItem[]>([]);
  const [busy, setBusy] = useState<'start' | 'claim' | 'equip' | null>(null);
  const [error, setError] = useState('');
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(timer);
  }, []);

  const run = state.run;
  const remaining = remainingSeconds(run, now);
  const runReady = Boolean(run && (run.status === 'READY' || remaining <= 0));
  const depth = depths.find((entry) => entry.id === selectedDepth) ?? depths[0];

  const equipped = useMemo(() => {
    const map = new Map<string, ExpeditionItem>();
    for (const item of state.inventory) {
      if (item.equipped) map.set(item.slot, item);
    }
    return map;
  }, [state.inventory]);

  const appearanceClasses = [...equipped.values()]
    .map((item) => item.visualKey ? `has-${item.visualKey}` : '')
    .filter(Boolean)
    .join(' ');

  async function refresh() {
    const next = await api<ExpeditionState>('/expedition/me');
    setState(next);
    return next;
  }

  useEffect(() => {
    if (!run || run.status !== 'ACTIVE' || remaining > 0) return;
    void refresh().catch(() => undefined);
  }, [remaining, run?.id, run?.status]);

  async function startExpedition() {
    if (busy || run || depth.id > state.profile.unlockedDepth) return;
    setBusy('start');
    setError('');
    setLastDrops([]);
    try {
      await api('/expedition/runs', {
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

  async function claimRun() {
    if (!run || !runReady || busy) return;
    setBusy('claim');
    setError('');
    try {
      const result = await api<ClaimResponse>(`/expedition/runs/${run.id}/claim`, { method: 'POST' });
      setState(result.state);
      setLastDrops(result.reward.item ? [result.reward.item] : []);
      setSelectedDepth(Math.min(result.state.profile.unlockedDepth, 5));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось забрать добычу');
    } finally {
      setBusy(null);
    }
  }

  async function equip(item: ExpeditionItem) {
    if (busy || item.equipped) return;
    setBusy('equip');
    setError('');
    try {
      const next = await api<ExpeditionState>(`/expedition/items/${item.id}/equip`, { method: 'POST' });
      setState(next);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось надеть предмет');
    } finally {
      setBusy(null);
    }
  }

  const resources = state.profile.resources;

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
          <span><b>{state.profile.power}</b><small>сила</small></span>
          <span><b>{resources.oldParts}</b><small>старые детали</small></span>
        </div>
      </header>

      {error ? <div className="exp-error" role="alert">{error}</div> : null}

      <section className="exp-layout">
        <aside className="exp-panel exp-character">
          <div className="exp-panel-title">
            <div><span>Персонаж</span><strong>Новичок</strong></div>
            <em>{equipped.size ? 'снаряжён' : 'в лохмотьях'}</em>
          </div>

          <div className={`exp-avatar ${appearanceClasses}`}>
            <div className="exp-avatar-art" />
            <div className="exp-avatar-overlay" />
            <div className="exp-avatar-label">
              <b>{state.profile.power} силы</b>
              <span>{equipped.size}/16 предметов</span>
            </div>
          </div>

          <div className="exp-slots">
            {slotOrder.map((slot) => {
              const item = equipped.get(slot.id);
              return (
                <button
                  key={slot.id}
                  className={item ? `equipped ${rarityClass(item.rarity)}` : ''}
                  title={item?.name ?? slot.label}
                  type="button"
                  disabled
                >
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
              <div className="exp-location-copy">
                <span>Локация 01</span>
                <h2>Ржавые окраины</h2>
                <p>Средневековый город вырос вокруг обломков давно погибшей высокотехнологичной эпохи.</p>
              </div>
            </div>

            <div className="exp-depths">
              {depths.map((entry) => {
                const locked = entry.id > state.profile.unlockedDepth;
                return (
                  <button
                    type="button"
                    key={entry.id}
                    disabled={locked || Boolean(run)}
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
                <small>{run ? 'Текущая экспедиция' : 'Выбрано'}</small>
                <h3>
                  {run
                    ? `Глубина ${run.depth} · ${depths.find((entry) => entry.id === run.depth)?.name ?? ''}`
                    : `Глубина ${depth.id} · ${depth.name}`}
                </h3>
                <p>
                  {run
                    ? runReady ? 'Персонаж вернулся. Добыча готова.' : `Возвращение через ${remaining} сек.`
                    : depth.flavor}
                </p>
                <em>{run ? 'Награда рассчитывается на сервере' : depth.reward}</em>
              </div>

              {!run ? (
                <button
                  className="exp-primary"
                  type="button"
                  disabled={busy !== null || state.profile.energy < depth.energy}
                  onClick={startExpedition}
                >
                  {busy === 'start' ? 'Отправляем…' : `Отправить · ⚡ ${depth.energy}`}
                </button>
              ) : runReady ? (
                <button className="exp-primary is-return" type="button" disabled={busy !== null} onClick={claimRun}>
                  {busy === 'claim' ? 'Получаем…' : 'Забрать добычу'}
                </button>
              ) : (
                <div className="exp-run-progress">
                  <b>Персонаж в пути</b>
                  <span>{remaining} сек.</span>
                  <i style={{ width: `${Math.max(8, 100 - remaining / Math.max(1, depths.find((entry) => entry.id === run.depth)?.seconds ?? 30) * 100)}%` }} />
                </div>
              )}
            </div>

            {lastDrops.length ? (
              <div className="exp-result">
                <span>Последняя экспедиция</span>
                <div className="exp-result-grid">
                  {lastDrops.map((item) => (
                    <button key={item.id} type="button" className={rarityClass(item.rarity)} onClick={() => equip(item)} disabled={busy !== null}>
                      <span className={`exp-item-icon art-${artIndex[item.visualKey] ?? 0}`} />
                      <b>{item.name}</b>
                      <small>{rarityLabel[item.rarity as Rarity] ?? item.rarity} · №{item.serialNumber}/{item.circulation}</small>
                      <em>{item.equipped ? 'Надето' : 'Надеть'}</em>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="exp-resources">
              <span><b>{resources.metal}</b><small>металл</small></span>
              <span><b>{resources.cloth}</b><small>ткань</small></span>
              <span><b>{resources.scrap}</b><small>лом</small></span>
              <span><b>{resources.oldParts}</b><small>старые детали</small></span>
            </div>
          </article>

          <article className="exp-panel exp-raid">
            <div className="exp-raid-art"><div className="exp-boss-crop" /></div>
            <div className="exp-raid-copy">
              <small>Совместный босс · Ржавые окраины</small>
              <h2>Железный Пастырь</h2>
              <p>Следующий серверный слой: игроки заранее отправляют персонажей к назначенному времени, а общий бой рассчитывается автоматически.</p>
              <div className="exp-raid-meta">
                <span><b>—/10</b><small>сбор откроется</small></span>
                <span><b>21:00</b><small>окно рейда</small></span>
                <span><b>5</b><small>глубина</small></span>
              </div>
              <button type="button" disabled>Рейд · alpha 0.2</button>
            </div>
          </article>

          <article className="exp-panel exp-community">
            <div className="exp-community-card">
              <small>Категория</small>
              <h3>Чемпион сообщества</h3>
              <div className="exp-champion"><i /><span>Железный Герольд · концепт</span></div>
              <p>Общий Чемпион и постройки включаем после проверки личного цикла.</p>
            </div>
            <div className="exp-community-card">
              <small>Синдикат</small>
              <h3>Ядро Ковчега</h3>
              <div className="exp-relic"><i /><span>Реликт синдиката · концепт</span></div>
              <p>Общий склад, вклад и развитие — следующий социальный слой.</p>
            </div>
          </article>
        </section>

        <aside className="exp-panel exp-inventory">
          <div className="exp-panel-title">
            <div><span>Инвентарь</span><strong>{state.inventory.length} предметов</strong></div>
            <em>{resources.metal} металл · {resources.scrap} лом</em>
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
                disabled={busy !== null || item.equipped}
              >
                <span className={`exp-item-icon art-${artIndex[item.visualKey] ?? 0}`} />
                <small>{slotLabel[item.slot] ?? item.slot}</small>
                <b>{item.name}</b>
                <em>№{item.serialNumber}/{item.circulation}</em>
                <strong>+{item.power}</strong>
              </button>
            )) : (
              <div className="exp-empty">
                <b>Инвентарь пуст</b>
                <span>Первая экспедиция принесёт первый серийный предмет.</span>
              </div>
            )}
          </div>

          <div className="exp-inventory-hint">
            <b>Каждый экземпляр уникален</b>
            <span>Серийный номер выдаётся сервером и сохраняется при будущей продаже или передаче другому игроку.</span>
          </div>
        </aside>
      </section>

      <footer className="exp-footer">
        <span>Source of truth: docs/game-expedition-alpha-source-of-truth.md</span>
        <span>Энергия, прогресс, ресурсы, инвентарь и серийные номера уже server-authoritative.</span>
      </footer>
    </main>
  );
}
