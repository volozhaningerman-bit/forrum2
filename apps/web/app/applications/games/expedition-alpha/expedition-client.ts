import { api } from '../../../../lib/api';

export type ExpeditionServerItem = {
  id: string;
  templateId: string;
  name: string;
  slot: string;
  rarity: string;
  serialNumber: number;
  circulation: number;
  power: number;
  visualKey: string;
  equipped: boolean;
  acquiredAt: string;
};

export type ExpeditionServerRun = {
  id: string;
  depth: number;
  energyCost: number;
  status: 'ACTIVE' | 'READY';
  startedAt: string;
  readyAt: string;
  secondsLeft: number;
};

export type ExpeditionServerState = {
  profile: {
    level: number;
    xp: number;
    energy: number;
    maxEnergy: number;
    unlockedDepth: number;
    power: number;
    resources: {
      scrap: number;
      cloth: number;
      oldParts: number;
    };
  };
  run: ExpeditionServerRun | null;
  inventory: ExpeditionServerItem[];
};

export type ExpeditionClaimResponse = {
  ok: true;
  reward: {
    xp: number;
    resources: {
      scrap: number;
      cloth: number;
      oldParts: number;
    };
    itemId: string;
    templateId: string;
    serialNumber: number;
    item: ExpeditionServerItem;
  };
  profile: {
    level: number;
    xp: number;
    unlockedDepth: number;
  };
};

export function loadExpeditionState(signal?: AbortSignal) {
  return api<ExpeditionServerState>('/expedition/me', { signal });
}

export function startExpedition(depth: number) {
  return api<{ ok: true; run: ExpeditionServerRun }>('/expedition/runs', {
    method: 'POST',
    body: JSON.stringify({ depth }),
  });
}

export function claimExpedition(runId: string) {
  return api<ExpeditionClaimResponse>(`/expedition/runs/${runId}/claim`, {
    method: 'POST',
  });
}

export function equipExpeditionItem(itemId: string) {
  return api<ExpeditionServerState>(`/expedition/items/${itemId}/equip`, {
    method: 'POST',
  });
}

export function unequipExpeditionItem(itemId: string) {
  return api<ExpeditionServerState>(`/expedition/items/${itemId}/unequip`, {
    method: 'POST',
  });
}
