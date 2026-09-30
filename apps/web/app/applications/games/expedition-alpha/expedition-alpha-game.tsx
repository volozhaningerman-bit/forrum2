'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  claimExpedition,
  equipExpeditionItem,
  joinExpeditionRaid,
  leaveExpeditionRaid,
  loadExpeditionState,
  startExpedition,
  unequipExpeditionItem,
  type ExpeditionServerItem,
  type ExpeditionServerRaid,
  type ExpeditionServerState,
} from './expedition-client';

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
  art: number;
};

type Depth = {
  id: number;
  name: string;
  energy: number;
  recommended: number;
  reward: string;
  flavor: string;
};

type RunState = {
  depthId: number;
  endsAt: number;
} | null;

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
  { id: 1, name: 'Вход в окраины', energy: 1, recommended: 1, reward: 'Ткань · лом · обычные вещи', flavor: 'Лагеря сборщиков у городской стены.' },
  { id: 2, name: 'Ломовые дворы', energy: 2, recommended: 4, reward: 'Старые детали · необычные вещи', flavor: 'Завалы машин, древние краны и охотники за железом.' },
  { id: 3, name: 'Старые кварталы', energy: 2, recommended: 7, reward: 'Редкие находки · фрагменты', flavor: 'Жилые башни, давно переделанные под укрепления.' },
  { id: 4, name: 'Промышленный двор', energy: 3, recommended: 10, reward: 'Технореликты · редкий лут', flavor: 'Здесь до сих пор слышно, как что-то работает под землёй.' },
  { id: 5, name: 'Реакторная зона', energy: 4, recommended: 14, reward: 'Эпический шанс · рейд', flavor: 'Запретная часть старого комплекса. Там видели Пастыря.' },
];

const allItems: Item[] = [
  { id:'hood-1843', name:'Капюшон Собирателя', slot:'head', rarity:'common', serial:1843, circulation:5000, power:2, visual:'hood', art:0 },
  { id:'helm-481', name:'Шлем Дозорного', slot:'head', rarity:'uncommon', serial:481, circulation:2400, power:4, visual:'helm', art:1 },
  { id:'seal-932', name:'Печать Путника', slot:'neck', rarity:'common', serial:932, circulation:8000, power:2, visual:'neck', art:2 },
  { id:'eye-117', name:'Око Архивариуса', slot:'neck', rarity:'rare', serial:117, circulation:500, power:7, visual:'neck', art:3 },
  { id:'shoulders-206', name:'Наплечники Рубежа', slot:'shoulders', rarity:'rare', serial:206, circulation:650, power:7, visual:'shoulders', art:4 },
  { id:'cloak-903', name:'Плащ Пепельной Дороги', slot:'cloak', rarity:'common', serial:903, circulation:7000, power:3, visual:'cloak', art:5 },
  { id:'cloak-85', name:'Плащ Синего Знамени', slot:'cloak', rarity:'rare', serial:85, circulation:500, power:8, visual:'cloak-blue', art:6 },
  { id:'jacket-1388', name:'Куртка Пограничника', slot:'chest', rarity:'common', serial:1388, circulation:10000, power:3, visual:'chest', art:7 },
  { id:'chest-317', name:'Панцирь Старой Стражи', slot:'chest', rarity:'uncommon', serial:317, circulation:2500, power:5, visual:'chest-guard', art:8 },
  { id:'consul-23', name:'Кираса Ржавого Консула', slot:'chest', rarity:'epic', serial:23, circulation:80, power:14, visual:'chest-epic', art:9 },
  { id:'wrists-761', name:'Наручи Искателя', slot:'wrists', rarity:'common', serial:761, circulation:6000, power:2, visual:'wrists', art:10 },
  { id:'gloves-1188', name:'Перчатки Сервомастера', slot:'gloves', rarity:'uncommon', serial:1188, circulation:4000, power:4, visual:'gloves', art:11 },
  { id:'belt-611', name:'Пояс Механика', slot:'belt', rarity:'uncommon', serial:611, circulation:3500, power:4, visual:'belt', art:0 },
  { id:'legs-901', name:'Штаны Пыльной Тропы', slot:'legs', rarity:'common', serial:901, circulation:9000, power:2, visual:'legs', art:1 },
  { id:'boots-741', name:'Сапоги Железного Шага', slot:'feet', rarity:'uncommon', serial:741, circulation:3000, power:4, visual:'boots', art:2 },
  { id:'ring-4321', name:'Кольцо Старого Сплава', slot:'ring1', rarity:'common', serial:4321, circulation:12000, power:2, visual:'ring', art:3 },
  { id:'ring-144', name:'Перстень Реакторщика', slot:'ring2', rarity:'rare', serial:144, circulation:800, power:6, visual:'ring-blue', art:4 },
  { id:'shard-933', name:'Осколок Реактора', slot:'relic1', rarity:'uncommon', serial:933, circulation:3000, power:5, visual:'relic', art:5 },
  { id:'relic-17', name:'Сердце Маяка', slot:'relic2', rarity:'epic', serial:17, circulation:60, power:14, visual:'relic-epic', art:6 },
  { id:'sword-2166', name:'Меч Пыльной Стражи', slot:'mainHand', rarity:'common', serial:2166, circulation:10000, power:5, visual:'sword', art:7 },
  { id:'spear-608', name:'Копьё Руинного Охотника', slot:'mainHand', rarity:'uncommon', serial:608, circulation:3000, power:7, visual:'spear', art:8 },
  { id:'blade-91', name:'Клинок Последнего Контура', slot:'mainHand', rarity:'rare', serial:91, circulation:400, power:11, visual:'sword-blue', art:9 },
  { id:'hammer-12', name:'Молот Стального Приора', slot:'mainHand', rarity:'epic', serial:12, circulation:45, power:16, visual:'hammer', art:10 },
  { id:'shield-42', name:'Щит Заслона', slot:'offHand', rarity:'rare', serial:42, circulation:300, power:9, visual:'shield', art:11 },
];

const starterInventory = allItems.filter((item) =>
  ['hood-1843','jacket-1388','belt-611','boots-741','sword-2166','seal-932'].includes(item.id),
);

const lootPools: Record<number, string[]> = {
  1: ['wrists-761','ring-4321','legs-901'],
  2: ['gloves-1188','helm-481','shard-933'],
  3: ['shoulders-206','eye-117','cloak-85'],
  4: ['blade-91','ring-144','shield-42'],
  5: ['consul-23','hammer-12','relic-17'],
};

const slotLabel = Object.fromEntries(slots.map((slot) => [slot.id, slot.label])) as Record<Slot, string>;

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

const serverRarityMap: Record<string, Rarity> = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  EPIC: 'epic',
};

const visualArtMap: Record<string, number> = {
  hood: 0,
  helm: 1,
  neck: 2,
  'consul-mask': 3,
  shoulders: 4,
  cloak: 5,
  'cloak-blue': 6,
  chest: 7,
  'chest-guard': 8,
  'chest-epic': 9,
  wrists: 10,
  gloves: 11,
  belt: 0,
  legs: 1,
  boots: 2,
  ring: 3,
  'ring-blue': 4,
  relic: 5,
  'relic-epic': 6,
  sword: 7,
  spear: 8,
  'sword-blue': 9,
  hammer: 10,
  shield: 11,
};

function mapServerItem(item: ExpeditionServerItem): Item {
  return {
    id: item.id,
    name: item.name,
    slot: serverSlotMap[item.slot] ?? 'relic1',
    rarity: serverRarityMap[item.rarity] ?? 'common',
    serial: item.serialNumber,
    circulation: item.circulation,
    power: item.power,
    visual: item.visualKey,
    art: visualArtMap[item.visualKey] ?? 0,
  };
}

function secondsLeft(endsAt: number | null, now: number) {
  if (!endsAt) return 0;
  return Math.max(0, Math.ceil((endsAt - now) / 1000));
}

export function ExpeditionAlphaGame() {
  const [energy, setEnergy] = useState(12);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [selectedDepth, setSelectedDepth] = useState(1);
  const [unlockedDepth, setUnlockedDepth] = useState(3);
  const [inventory, setInventory] = useState<Item[]>(starterInventory);
  const [equipped, setEquipped] = useState<Partial<Record<Slot, Item>>>({});
  const [run, setRun] = useState<RunState>(null);
  const [readyRun, setReadyRun] = useState<number | null>(null);
  const [lastDrops, setLastDrops] = useState<Item[]>([]);
  const [resources, setResources] = useState({ scrap: 7, cloth: 4, oldParts: 2 });
  const [runCount, setRunCount] = useState(0);
  const [raidJoined, setRaidJoined] = useState(false);
  const [serverRaid, setServerRaid] = useState<ExpeditionServerRaid | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [serverMode, setServerMode] = useState<'checking' | 'server' | 'demo'>('checking');
  const [serverRunId, setServerRunId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const applyServerState = useCallback((state: ExpeditionServerState) => {
    const mappedItems = state.inventory.map(mapServerItem);
    const mappedById = new Map(mappedItems.map((item) => [item.id, item]));
    const nextEquipped: Partial<Record<Slot, Item>> = {};

    for (const raw of state.inventory) {
      if (!raw.equipped) continue;
      const item = mappedById.get(raw.id);
      if (item) nextEquipped[item.slot] = item;
    }

    setEnergy(state.profile.energy);
    setXp(state.profile.xp);
    setLevel(state.profile.level);
    setUnlockedDepth(state.profile.unlockedDepth);
    setResources(state.profile.resources);
    setInventory(mappedItems);
    setEquipped(nextEquipped);
    setServerRaid(state.raid);

    if (state.run) {
      setServerRunId(state.run.id);
      if (state.run.status === 'READY' || state.run.secondsLeft <= 0) {
        setReadyRun(state.run.depth);
        setRun(null);
      } else {
        setRun({
          depthId: state.run.depth,
          endsAt: new Date(state.run.readyAt).getTime(),
        });
        setReadyRun(null);
      }
    } else {
      setServerRunId(null);
      setRun(null);
      setReadyRun(null);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    loadExpeditionState(controller.signal)
      .then((state) => {
        applyServerState(state);
        setServerMode('server');
        setApiError(null);
      })
      .catch((cause) => {
        if (controller.signal.aborted) return;
        setServerMode('demo');
        setApiError(cause instanceof Error ? cause.message : 'Серверная игра недоступна');
      });

    return () => controller.abort();
  }, [applyServerState]);

  useEffect(() => {
    if (serverMode === 'server') return;
    if (run && now >= run.endsAt) {
      setReadyRun(run.depthId);
      setRun(null);
    }
  }, [now, run, serverMode]);

  useEffect(() => {
    if (serverMode !== 'server' || !run || now < run.endsAt) return;
    let cancelled = false;

    loadExpeditionState()
      .then((state) => {
        if (!cancelled) applyServerState(state);
      })
      .catch((cause) => {
        if (!cancelled) {
          setApiError(cause instanceof Error ? cause.message : 'Не удалось обновить экспедицию');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [applyServerState, now, run, serverMode]);

  async function toggleRaid() {
    if (busy) return;

    if (serverMode !== 'server') {
      setRaidJoined((value) => !value);
      return;
    }

    setBusy(true);
    setApiError(null);
    try {
      const next = serverRaid?.joined
        ? await leaveExpeditionRaid()
        : await joinExpeditionRaid();
      setServerRaid(next);
    } catch (cause) {
      setApiError(cause instanceof Error ? cause.message : 'Не удалось обновить участие в рейде');
    } finally {
      setBusy(false);
    }
  }

  const depth = depths.find((entry) => entry.id === selectedDepth) ?? depths[0];
  const equippedPower = useMemo(
    () => Object.values(equipped).reduce((sum, item) => sum + (item?.power ?? 0), 0),
    [equipped],
  );
  const power = 10 + level * 3 + equippedPower;
  const remaining = secondsLeft(run?.endsAt ?? null, now);
  const displayedRaidJoined = serverMode === 'server' ? Boolean(serverRaid?.joined) : raidJoined;
  const displayedRaidCount = serverMode === 'server'
    ? (serverRaid?.participantCount ?? 0)
    : (raidJoined ? 8 : 7);
  const displayedRaidMax = serverMode === 'server' ? (serverRaid?.maxParticipants ?? 10) : 10;
  const raidStart = serverRaid
    ? new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' }).format(new Date(serverRaid.startsAt))
    : '21:00';

  const appearanceClasses = Object.values(equipped)
    .map((item) => item?.visual ? `has-${item.visual}` : '')
    .join(' ');

  async function sendExpedition() {
    if (busy || run || readyRun || energy < depth.energy || depth.id > unlockedDepth) return;

    if (serverMode === 'server') {
      setBusy(true);
      setApiError(null);
      setLastDrops([]);
      try {
        await startExpedition(depth.id);
        const state = await loadExpeditionState();
        applyServerState(state);
      } catch (cause) {
        setApiError(cause instanceof Error ? cause.message : 'Не удалось начать экспедицию');
      } finally {
        setBusy(false);
      }
      return;
    }

    setEnergy((value) => value - depth.energy);
    setLastDrops([]);
    setRun({ depthId: depth.id, endsAt: Date.now() + 3500 + depth.id * 500 });
  }

  async function collectReturn() {
    if (!readyRun || busy) return;

    if (serverMode === 'server' && serverRunId) {
      setBusy(true);
      setApiError(null);
      try {
        const claimed = await claimExpedition(serverRunId);
        const drop = mapServerItem(claimed.reward.item);
        setLastDrops([drop]);
        const state = await loadExpeditionState();
        applyServerState(state);
      } catch (cause) {
        setApiError(cause instanceof Error ? cause.message : 'Не удалось забрать добычу');
      } finally {
        setBusy(false);
      }
      return;
    }

    const pool = lootPools[readyRun] ?? lootPools[1];
    const firstId = pool[runCount % pool.length];
    const secondId = readyRun >= 3 ? pool[(runCount + 1) % pool.length] : null;
    const drops = [firstId, secondId]
      .filter(Boolean)
      .map((id) => allItems.find((item) => item.id === id))
      .filter((item): item is Item => Boolean(item));

    setInventory((items) => {
      const known = new Set(items.map((item) => item.id));
      return [...items, ...drops.filter((item) => !known.has(item.id))];
    });
    setLastDrops(drops);
    setResources((current) => ({
      scrap: current.scrap + 2 * readyRun,
      cloth: current.cloth + Math.max(1, readyRun),
      oldParts: current.oldParts + (readyRun >= 2 ? 1 : 0),
    }));
    setXp((value) => {
      const next = value + 25 + readyRun * 12;
      if (next >= 100) {
        setLevel((current) => current + 1);
        return next - 100;
      }
      return next;
    });
    setUnlockedDepth((value) => Math.min(5, Math.max(value, readyRun + 1)));
    setRunCount((value) => value + 1);
    setReadyRun(null);
  }

  async function equip(item: Item) {
    if (busy) return;

    if (serverMode === 'server') {
      setBusy(true);
      setApiError(null);
      try {
        const state = await equipExpeditionItem(item.id);
        applyServerState(state);
      } catch (cause) {
        setApiError(cause instanceof Error ? cause.message : 'Не удалось надеть предмет');
      } finally {
        setBusy(false);
      }
      return;
    }

    setEquipped((current) => ({ ...current, [item.slot]: item }));
  }

  async function unequip(slot: Slot) {
    const item = equipped[slot];
    if (!item || busy) return;

    if (serverMode === 'server') {
      setBusy(true);
      setApiError(null);
      try {
        const state = await unequipExpeditionItem(item.id);
        applyServerState(state);
      } catch (cause) {
        setApiError(cause instanceof Error ? cause.message : 'Не удалось снять предмет');
      } finally {
        setBusy(false);
      }
      return;
    }

    setEquipped((current) => {
      const copy = { ...current };
      delete copy[slot];
      return copy;
    });
  }

  return (
    <main className="exp-alpha" data-testid="expedition-alpha">
      <header className="exp-topbar">
        <div>
          <span className="exp-kicker">4rrum · hidden alpha</span>
          <div className="exp-title-row">
            <h1>Экспедиция</h1>
            <span className={`exp-mode exp-mode-${serverMode}`}>
              {serverMode === 'server' ? 'серверный прогресс' : serverMode === 'demo' ? 'демо-режим' : 'подключение…'}
            </span>
          </div>
          <p>Рабочее название · посттехнологичное средневековье</p>
        </div>
        <div className="exp-hud">
          <span><b>⚡ {energy}/12</b><small>энергия</small></span>
          <span><b>ур. {level}</b><small>{xp}/100 XP</small></span>
          <span><b>{power}</b><small>сила</small></span>
          <span><b>{resources.parts}</b><small>старые детали</small></span>
        </div>
      </header>

      {apiError && serverMode === 'server' ? (
        <div className="exp-api-error" role="status">
          <b>Связь с игровым сервером:</b> {apiError}
        </div>
      ) : null}

      <section className="exp-layout">
        <aside className="exp-panel exp-character">
          <div className="exp-panel-title">
            <div><span>Персонаж</span><strong>Новичок</strong></div>
            <em>{Object.keys(equipped).length ? 'снаряжён' : 'в лохмотьях'}</em>
          </div>

          <div className={`exp-avatar ${appearanceClasses}`}>
            <div className="exp-avatar-art" />
            <div className="exp-avatar-overlay" />
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
                  title={item ? `${item.name} — снять` : slot.label}
                  type="button"
                  disabled={busy}
                  onClick={() => item && unequip(slot.id)}
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
              <div className="exp-location-copy">
                <span>Локация 01</span>
                <h2>Ржавые окраины</h2>
                <p>Средневековый город вырос вокруг обломков давно погибшей высокотехнологичной эпохи.</p>
              </div>
            </div>

            <div className="exp-depths">
              {depths.map((entry) => {
                const locked = entry.id > unlockedDepth;
                return (
                  <button
                    type="button"
                    key={entry.id}
                    disabled={locked || Boolean(run) || Boolean(readyRun)}
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
                <p>{depth.flavor}</p>
                <em>{depth.reward}</em>
              </div>
              {!run && !readyRun ? (
                <button className="exp-primary" type="button" disabled={busy || serverMode === 'checking' || energy < depth.energy} onClick={sendExpedition}>
                  Отправить · ⚡ {depth.energy}
                </button>
              ) : run ? (
                <div className="exp-run-progress">
                  <b>Персонаж в пути</b>
                  <span>{remaining} сек.</span>
                  <i style={{ width: `${Math.max(8, 100 - remaining * 16)}%` }} />
                </div>
              ) : (
                <button className="exp-primary is-return" type="button" disabled={busy} onClick={collectReturn}>
                  Забрать добычу
                </button>
              )}
            </div>

            {lastDrops.length ? (
              <div className="exp-result">
                <span>Последняя экспедиция</span>
                <div className="exp-result-grid">
                  {lastDrops.map((item) => (
                    <button key={item.id} type="button" className={`rarity-${item.rarity}`} onClick={() => equip(item)}>
                      <span className={`exp-item-icon art-${item.art}`} />
                      <b>{item.name}</b>
                      <small>{rarityLabel[item.rarity]} · №{item.serial}/{item.circulation}</small>
                      <em>Надеть</em>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </article>

          <article className="exp-panel exp-raid">
            <div className="exp-raid-art"><div className="exp-boss-crop" /></div>
            <div className="exp-raid-copy">
              <small>Совместный босс · Ржавые окраины</small>
              <h2>Железный Пастырь</h2>
              <p>Бой рассчитывается автоматически. Главное — заранее собрать людей и отправить персонажей к назначенному времени.</p>
              <div className="exp-raid-meta">
                <span><b>{displayedRaidCount}/{displayedRaidMax}</b><small>участников</small></span>
                <span><b>{raidStart}</b><small>начало</small></span>
                <span><b>5</b><small>глубина</small></span>
              </div>
              <button
                className={displayedRaidJoined ? 'joined' : ''}
                type="button"
                disabled={busy || serverMode === 'checking'}
                onClick={toggleRaid}
              >
                {displayedRaidJoined ? 'Вы записаны' : 'Отправить персонажа'}
              </button>
            </div>
          </article>

          <article className="exp-panel exp-community">
            <div className="exp-community-card">
              <small>Категория</small>
              <h3>Чемпион сообщества</h3>
              <div className="exp-champion"><i /><span>Железный Герольд · ур. 3</span></div>
              <p>Общий прогресс: 68% до следующей формы.</p>
            </div>
            <div className="exp-community-card">
              <small>Синдикат</small>
              <h3>Ядро Ковчега</h3>
              <div className="exp-relic"><i /><span>Пробуждение · стадия 2/4</span></div>
              <p>Следующий апгрейд требует 18 старых деталей.</p>
            </div>
          </article>
        </section>

        <aside className="exp-panel exp-inventory">
          <div className="exp-panel-title">
            <div><span>Инвентарь</span><strong>{inventory.length} предметов</strong></div>
            <em>{resources.scrap} лом · {resources.oldParts} детали</em>
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
                disabled={busy}
                onClick={() => equip(item)}
              >
                <span className={`exp-item-icon art-${item.art}`} />
                <small>{slotLabel[item.slot]}</small>
                <b>{item.name}</b>
                <em>№{item.serial}/{item.circulation}</em>
                <strong>+{item.power}</strong>
              </button>
            ))}
          </div>

          <div className="exp-inventory-hint">
            <b>Каждый экземпляр уникален</b>
            <span>Номер предмета сохранится при будущей продаже или передаче другому игроку.</span>
          </div>
        </aside>
      </section>

      <footer className="exp-footer">
        <span>Source of truth: docs/game-expedition-alpha-source-of-truth.md</span>
        <span>{serverMode === 'server' ? 'Прогресс, энергия и серийные предметы подтверждаются API.' : 'Гостевой демо-режим не сохраняет экономически значимый прогресс.'}</span>
      </footer>
    </main>
  );
}
