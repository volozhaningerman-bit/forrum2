'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Tattoo {
  id: string;
  name: string;
  part: string;
  costCigarettes: number;
  costSugar: number;
  bonusDamage: number;
  bonusMaxEnergy: number;
  minLevel: number;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  energyCost: number;
  minLevel: number;
  rewardRespect: number;
  rewardCigarettes: [number, number];
  sugarDropChance: number;
}

interface Boss {
  id: string;
  name: string;
  maxHp: number;
  minLevel: number;
  durationHours: number;
  rewardCigarettes: number;
  rewardRespect: number;
  rewardSugar: number;
}

interface Weapon {
  id: string;
  name: string;
  costCigarettes: number;
  costSugar: number;
  damageMultiplier: number;
  critChance: number;
}

interface GameState {
  id: string;
  level: number;
  respect: number;
  nextLevelRespect: number;
  energy: number;
  maxEnergy: number;
  lastEnergySync: string;
  cigarettes: number;
  sugar: number;
  baseDamage: number;
  effectiveDamage: number;
  wins: number;
  tattoos: { tattooId: string }[];
  activeBoss: {
    id: string;
    bossId: string;
    bossName: string;
    currentHp: number;
    maxHp: number;
    isDefeated: boolean;
    expiresAt: string;
  } | null;
  availableQuests: Quest[];
  allTattoos: Tattoo[];
  availableBosses: Boss[];
  weapons: Weapon[];
}

export default function TyuryagaGamePage() {
  const [state, setState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'quests' | 'bosses' | 'tattoos'>('quests');
  const [combatLogs, setCombatLogs] = useState<string[]>([]);
  const [hitShake, setHitShake] = useState(false);
  const [secondsToNextEnergy, setSecondsToNextEnergy] = useState<number>(180);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch('/api/games/tyuryaga/state');
      if (res.ok) {
        const data = await res.json();
        setState(data);
      }
    } catch (e) {
      console.error('Ошибка загрузки Тюряги', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  useEffect(() => {
    if (!state) return;
    const interval = setInterval(() => {
      const sync = new Date(state.lastEnergySync).getTime();
      const elapsed = Math.floor((Date.now() - sync) / 1000);
      const remaining = 180 - (elapsed % 180);
      setSecondsToNextEnergy(remaining);

      if (elapsed > 180 && state.energy < state.maxEnergy) {
        fetchState();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state, fetchState]);

  const addLog = (msg: string) => {
    setCombatLogs((prev) => [msg, ...prev.slice(0, 5)]);
  };

  const handleQuest = async (questId: string) => {
    if (actionLoading) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/games/tyuryaga/quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Ошибка');

      addLog(`Выполнено! +${data.rewards.respect} авторитета, +${data.rewards.cigarettes} папирос` + 
        (data.rewards.sugar > 0 ? `, +${data.rewards.sugar} сахар` : ''));
      if (data.levelUp) {
        addLog('УРОВЕНЬ ПОВЫШЕН! Энергия восстановлена до максимума!');
      }
      fetchState();
    } catch (err: any) {
      addLog(`Ошибка: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleStartBoss = async (bossId: string) => {
    if (actionLoading) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/games/tyuryaga/boss/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bossId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Ошибка');

      addLog(`Бой начался! Вы бросили вызов авторитету: ${data.bossName}`);
      fetchState();
    } catch (err: any) {
      addLog(`Ошибка: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleHitBoss = async (weaponId: string) => {
    if (actionLoading) return;
    setActionLoading(true);
    setHitShake(true);
    setTimeout(() => setHitShake(false), 300);

    try {
      const res = await fetch('/api/games/tyuryaga/boss/hit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weaponId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Ошибка');

      const critText = data.isCrit ? ' [КРИТИЧЕСКИЙ УДАР!]' : '';
      addLog(`Удар нанес ${data.damageDealt} урона!${critText}`);

      if (data.isDefeated) {
        addLog(`БОСС ПОВЕРЖЕН! Получено: +${data.rewards.cigarettes} папирос, +${data.rewards.sugar} сахара!`);
      }
      fetchState();
    } catch (err: any) {
      addLog(`Ошибка: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBuyTattoo = async (tattooId: string) => {
    if (actionLoading) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/games/tyuryaga/tattoo/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tattooId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Ошибка');

      addLog(`Наколка "${data.tattoo.name}" набита! Урон увеличен!`);
      fetchState();
    } catch (err: any) {
      addLog(`Ошибка: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0f12] text-zinc-400 flex items-center justify-center font-mono text-sm">
        Загрузка хаты...
      </div>
    );
  }

  if (!state) {
    return (
      <div className="min-h-screen bg-[#0d0f12] text-zinc-400 flex flex-col items-center justify-center gap-3">
        <p className="text-sm">Требуется авторизация на 4rrum</p>
        <Link href="/auth/login" className="text-emerald-400 underline text-xs">Войти в аккаунт</Link>
      </div>
    );
  }

  const hasTattoo = (tId: string) => state.tattoos.some((t) => t.tattooId === tId);

  return (
    <div className="min-h-screen bg-[#0d0f12] text-zinc-100 flex flex-col font-sans select-none">
      <header className="h-12 border-b border-zinc-800/80 px-4 flex items-center justify-between bg-zinc-950/70 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/applications"
            className="text-xs text-zinc-400 hover:text-emerald-400 flex items-center gap-1 transition"
          >
            ← Приложения
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Тюряга 4rrum
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
            <span className="text-amber-400">⚡</span>
            <span>{state.energy}/{state.maxEnergy}</span>
            <span className="text-[10px] text-zinc-500">({secondsToNextEnergy}с)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
            <span className="text-zinc-300">🚬</span>
            <span>{state.cigarettes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
            <span className="text-cyan-400">🍬</span>
            <span>{state.sugar}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-3 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
        <aside className="md:col-span-4 flex flex-col gap-4">
          <div className="bg-[#14171d] border border-zinc-800/80 rounded-xl p-4 flex flex-col items-center">
            <div className="w-full aspect-[4/5] bg-zinc-950 rounded-lg border border-zinc-800/90 relative overflow-hidden flex flex-col items-center justify-center p-4">
              <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Камера #4
              </div>
              <div className="text-6xl mb-2">👤</div>
              <div className="text-xs font-bold text-zinc-300 tracking-wide">
                {state.level >= 5 ? 'Смотрящий' : state.level >= 3 ? 'Бывалый' : 'Первоход'}
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                Наколок: {state.tattoos.length}
              </div>

              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {state.tattoos.map((t) => (
                  <span key={t.tattooId} className="px-1.5 py-0.5 text-[9px] bg-zinc-900 border border-emerald-500/30 text-emerald-400 rounded">
                    {t.tattooId.split('_')[0]}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full mt-4">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-zinc-200">Авторитет (Ур. {state.level})</span>
                <span className="text-zinc-400 font-mono text-[11px]">{state.respect} / {state.nextLevelRespect}</span>
              </div>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (state.respect / state.nextLevelRespect) * 100)}%` }}
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
              <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800/70">
                <span className="text-zinc-500 block text-[10px]">УРОН</span>
                <span className="font-bold text-emerald-400">⚔️ {state.effectiveDamage}</span>
              </div>
              <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800/70">
                <span className="text-zinc-500 block text-[10px]">ПОБЕД</span>
                <span className="font-bold text-zinc-200">🏆 {state.wins}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#14171d] border border-zinc-800/80 rounded-xl p-3 flex flex-col flex-1">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Малявы и сводки</h4>
            <div className="space-y-1.5 font-mono text-[11px] text-zinc-400 overflow-y-auto max-h-36">
              {combatLogs.length === 0 ? (
                <p className="text-zinc-600 text-xs italic">В хате пока тихо...</p>
              ) : (
                combatLogs.map((log, idx) => (
                  <div key={idx} className="border-l-2 border-emerald-500/50 pl-2 text-zinc-300 py-0.5">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        <section className="md:col-span-8 bg-[#14171d] border border-zinc-800/80 rounded-xl p-4 md:p-5 flex flex-col">
          <nav className="flex gap-2 border-b border-zinc-800 pb-3 mb-4">
            <button
              onClick={() => setActiveTab('quests')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition ${
                activeTab === 'quests'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              Движухи
            </button>
            <button
              onClick={() => setActiveTab('bosses')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition ${
                activeTab === 'bosses'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              Боссы {state.activeBoss && !state.activeBoss.isDefeated && '🔥'}
            </button>
            <button
              onClick={() => setActiveTab('tattoos')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition ${
                activeTab === 'tattoos'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              Салон наколок
            </button>
          </nav>

          {activeTab === 'quests' && (
            <div className="space-y-2.5 overflow-y-auto pr-1">
              {state.availableQuests.map((q) => {
                const isLocked = state.level < q.minLevel;
                const notEnoughEnergy = state.energy < q.energyCost;

                return (
                  <div
                    key={q.id}
                    className={`p-3 bg-zinc-950/60 border rounded-lg flex items-center justify-between gap-3 ${
                      isLocked ? 'border-zinc-800/40 opacity-50' : 'border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-zinc-200">{q.title}</h4>
                        {isLocked && (
                          <span className="text-[10px] text-amber-500/90 font-mono">
                            с {q.minLevel} ур.
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{q.description}</p>
                      <div className="mt-1 text-[10px] font-mono text-zinc-500 flex gap-3">
                        <span>+ {q.rewardRespect} авторитета</span>
                        <span>🚬 {q.rewardCigarettes[0]}-{q.rewardCigarettes[1]}</span>
                        {q.sugarDropChance > 0 && <span>🍬 {Math.round(q.sugarDropChance * 100)}%</span>}
                      </div>
                    </div>

                    <button
                      disabled={isLocked || notEnoughEnergy || actionLoading}
                      onClick={() => handleQuest(q.id)}
                      className={`px-3 py-1.5 rounded text-xs font-bold font-mono transition flex items-center gap-1.5 ${
                        isLocked || notEnoughEnergy
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-zinc-950 shadow-md active:scale-95'
                      }`}
                    >
                      Сделать <span className="text-[11px] font-normal opacity-80">(-{q.energyCost}⚡)</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'bosses' && (
            <div className="flex-1 flex flex-col">
              {state.activeBoss && !state.activeBoss.isDefeated ? (
                <div className={`flex flex-col items-center p-4 bg-zinc-950/70 border border-zinc-800 rounded-lg ${hitShake ? 'translate-x-1' : ''}`}>
                  <div className="w-full flex justify-between items-center mb-3">
                    <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                      ⚠️ Босс в камере
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      до {new Date(state.activeBoss.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="text-5xl my-2">👹</div>
                  <h3 className="text-sm font-bold text-zinc-100">{state.activeBoss.bossName}</h3>

                  <div className="w-full max-w-md mt-3">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-red-400">Здоровье</span>
                      <span>{state.activeBoss.currentHp} / {state.activeBoss.maxHp}</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
                      <div
                        className="bg-red-500 h-full transition-all duration-200"
                        style={{ width: `${(state.activeBoss.currentHp / state.activeBoss.maxHp) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mt-6">
                    {state.weapons.map((w) => {
                      const canAfford = state.cigarettes >= w.costCigarettes && state.sugar >= w.costSugar;
                      return (
                        <button
                          key={w.id}
                          disabled={!canAfford || actionLoading}
                          onClick={() => handleHitBoss(w.id)}
                          className={`p-2.5 rounded-lg border text-left flex flex-col justify-between transition ${
                            canAfford
                              ? 'bg-zinc-900 border-zinc-700 hover:border-emerald-500/50 active:scale-95'
                              : 'bg-zinc-950 border-zinc-900 opacity-40 cursor-not-allowed'
                          }`}
                        >
                          <span className="text-xs font-bold text-zinc-200">{w.name}</span>
                          <span className="text-[10px] text-zinc-400 mt-1 font-mono">x{w.damageMultiplier} урона</span>
                          <div className="mt-2 text-[10px] font-mono text-emerald-400">
                            {w.costCigarettes > 0 && `🚬 ${w.costCigarettes} `}
                            {w.costSugar > 0 && `🍬 ${w.costSugar}`}
                            {w.costCigarettes === 0 && w.costSugar === 0 && 'Бесплатно'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {state.availableBosses.map((b) => {
                    const isLocked = state.level < b.minLevel;
                    return (
                      <div
                        key={b.id}
                        className={`p-4 bg-zinc-950/60 border rounded-lg flex flex-col justify-between ${
                          isLocked ? 'border-zinc-800/40 opacity-50' : 'border-zinc-800/80 hover:border-zinc-700'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-zinc-200">{b.name}</h4>
                            <span className="text-[10px] font-mono text-zinc-500">HP: {b.maxHp}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-1">Время на рейд: {b.durationHours}ч</p>
                          <div className="mt-3 text-[10px] font-mono text-zinc-400 space-y-0.5">
                            <div>Награда: 🚬 {b.rewardCigarettes}</div>
                            <div>Авторитет: +{b.rewardRespect}</div>
                            <div>Сахар: 🍬 +{b.rewardSugar}</div>
                          </div>
                        </div>

                        <button
                          disabled={isLocked || actionLoading}
                          onClick={() => handleStartBoss(b.id)}
                          className={`mt-4 w-full py-1.5 rounded text-xs font-bold font-mono transition ${
                            isLocked
                              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-zinc-950'
                          }`}
                        >
                          {isLocked ? `Требуется ${b.minLevel} ур.` : 'Напасть на босса'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'tattoos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1">
              {state.allTattoos.map((t) => {
                const owned = hasTattoo(t.id);
                const isLocked = state.level < t.minLevel;
                const canAfford = state.cigarettes >= t.costCigarettes && state.sugar >= t.costSugar;

                return (
                  <div
                    key={t.id}
                    className={`p-3.5 bg-zinc-950/60 border rounded-lg flex flex-col justify-between ${
                      owned
                        ? 'border-emerald-500/40 bg-emerald-950/10'
                        : isLocked
                        ? 'border-zinc-800/40 opacity-50'
                        : 'border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-zinc-200">{t.name}</h4>
                        {owned && (
                          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            Набито
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-[11px] font-mono text-emerald-400 space-y-0.5">
                        {t.bonusDamage > 0 && <div>+ {t.bonusDamage} к постоянному урону</div>}
                        {t.bonusMaxEnergy > 0 && <div>+ {t.bonusMaxEnergy} к макс. энергии</div>}
                      </div>
                    </div>

                    {!owned && (
                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-zinc-900 pt-2.5">
                        <div className="text-[10px] font-mono text-zinc-400">
                          {t.costCigarettes > 0 && <span>🚬 {t.costCigarettes} </span>}
                          {t.costSugar > 0 && <span>🍬 {t.costSugar}</span>}
                        </div>
                        <button
                          disabled={isLocked || !canAfford || actionLoading}
                          onClick={() => handleBuyTattoo(t.id)}
                          className={`px-3 py-1 rounded text-xs font-bold font-mono transition ${
                            isLocked || !canAfford
                              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-zinc-950'
                          }`}
                        >
                          {isLocked ? `С ${t.minLevel} ур.` : 'Набить'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
